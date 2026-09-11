// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Sumo match — engine bridge for competitive_circuit evolved form.
import { registerDimension, registerPool, render } from '../../engine.js';
import './legacyPools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import {
  SUMO_RIVAL_NAME,
  SUMO_EXCHANGE_LINES,
  SUMO_CORNER_FEED,
  SUMO_BOUT_WON,
  SUMO_BOUT_LOST,
  SUMO_FILL_RING_TEXT,
  SUMO_MATCH_AFTERMATH,
  SUMO_PAYOFF_TEXT,
} from '../../../gameData/miniGames.js';

registerDimension('sumoStage', (ctx) => ctx.globals?.sumoStage ?? 0);
registerDimension('oppLbs', (ctx) => ctx.globals?.oppLbs ?? 340);
registerDimension('gainAccum', (ctx) => ctx.globals?.gainAccum ?? 0);
registerDimension('matchWon', (ctx) => ctx.globals?.matchWon ?? false);

registerPool('oppLbs', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.oppLbs ?? 340))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.oppLbs ?? 340)}`] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.oppLbs ?? ctx.globals?.oppLbs ?? 340))] },
]);
registerPool('gainAccum', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.gainAccum ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.gainAccum ?? 0)}`] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.gainAccum ?? ctx.globals?.gainAccum ?? 0))] },
]);

function stageText(arr, stageIdx) {
  const item = arr?.[stageIdx];
  return typeof item === 'string' ? item.trim() : '';
}

export function buildSumoCtx(student, week, stageIdx = 0, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'sumo_match',
      sumoStage: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderSumoLegacy(text, student, week, stageIdx = 0, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line || !student) return line;
  const ctx = buildSumoCtx(student, week, stageIdx, opts);
  return appendV2Depth(line, 'sumoMatch', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderSumoOpening(stageIdx, student, oppLbs, week) {
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { oppLbs } });
  const raw = render('{sumo.opening.compose}', ctx)?.trim()
    || `The first tachi-ai. You square up against ${SUMO_RIVAL_NAME} — ${oppLbs} pounds of veteran across the line from you. The crowd settles. Choose your opening.`;
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.3);
}

export function renderSumoExchangeLine(bucket, stageIdx, student, week, oppStumbleNote = '') {
  const ctx = buildSumoCtx(student, week, stageIdx);
  const b = bucket || 'clash';
  const si = Math.min(Math.max(0, stageIdx), (SUMO_EXCHANGE_LINES[b]?.length || 1) - 1);
  const raw = (render(`{sumo.exchange.${b}.s${si}}`, ctx)?.trim()
    || stageText(SUMO_EXCHANGE_LINES[b] || SUMO_EXCHANGE_LINES.clash, stageIdx)) + oppStumbleNote;
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.24);
}

export function renderSumoBoutWon(stageIdx, student, week) {
  const ctx = buildSumoCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), SUMO_BOUT_WON.length - 1);
  const raw = render(`{sumo.boutWon.s${si}}`, ctx)?.trim() || stageText(SUMO_BOUT_WON, stageIdx);
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.3);
}

export function renderSumoBoutLost(stageIdx, student, week) {
  const ctx = buildSumoCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), SUMO_BOUT_LOST.length - 1);
  const raw = render(`{sumo.boutLost.s${si}}`, ctx)?.trim() || stageText(SUMO_BOUT_LOST, stageIdx);
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.28);
}

export function renderSumoFillRing(stageIdx, student, week) {
  const ctx = buildSumoCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), SUMO_FILL_RING_TEXT.length - 1);
  const raw = render(`{sumo.fillRing.s${si}}`, ctx)?.trim()
    || SUMO_FILL_RING_TEXT[stageIdx]
    || 'You expand completely into the ring. Your opponent steps outside. Bout to you.';
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.34);
}

export function renderSumoCornerFeed(stageIdx, student, week) {
  const feed = SUMO_CORNER_FEED[stageIdx] || SUMO_CORNER_FEED[0];
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { gainAccum: feed.lbs } });
  const si = Math.min(Math.max(0, stageIdx), SUMO_CORNER_FEED.length - 1);
  const raw = render(`{sumo.cornerFeed.s${si}}`, ctx)?.trim() || feed.text;
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.3);
}

export function renderSumoNextBoutLine(boutNum, stageIdx, student, week, heavier = false) {
  const raw = heavier
    ? `Bout ${boutNum}. You return to center heavier than you left it. ${SUMO_RIVAL_NAME} sets her feet across from you.`
    : `Bout ${boutNum}. You square up at the center again. ${SUMO_RIVAL_NAME} sets her feet across from you.`;
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.22 });
}

export function renderSumoAftermath(stageIdx, student, gainAccum, won, oppLbs, week) {
  const ctx = buildSumoCtx(student, week, stageIdx, {
    globals: { gainAccum, matchWon: won, oppLbs },
  });
  const si = Math.min(Math.max(0, stageIdx), SUMO_MATCH_AFTERMATH.length - 1);
  const fn = SUMO_MATCH_AFTERMATH[stageIdx];
  const raw = render(`{sumo.aftermath.s${si}}`, ctx)?.trim()
    || (fn ? fn(student, gainAccum, won, oppLbs) : '');
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.32);
}

export function renderSumoPayoff(stageIdx, student, gainAccum, week) {
  const ctx = buildSumoCtx(student, week, stageIdx, { globals: { gainAccum } });
  const si = Math.min(Math.max(0, stageIdx), SUMO_PAYOFF_TEXT.length - 1);
  const fn = SUMO_PAYOFF_TEXT[stageIdx];
  const raw = render(`{sumo.payoff.legacy.s${si}}`, ctx)?.trim()
    || (fn ? fn(gainAccum) : `${Math.round(gainAccum)} pounds added to your frame since you stepped onto the dohyo. You can feel it. More.`);
  return appendV2Depth(raw, 'sumoMatch', ctx, 0.3);
}
