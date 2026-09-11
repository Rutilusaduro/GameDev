// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Sumo match — engine bridge for competitive_circuit evolved form.
import { registerDimension, render } from '../../engine.js';
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

function preferSumoPool(poolKey, student, week, stageIdx, opts = {}) {
  if (!student) return '';
  const ctx = buildSumoCtx(student, week, stageIdx, opts);
  const composed = render(`{${poolKey}}`, ctx)?.trim();
  if (composed && !composed.includes('{unresolved}')) {
    return appendV2Depth(composed, 'sumoMatch', ctx, opts.v2DepthChance ?? 0.28);
  }
  return '';
}

export function renderSumoOpening(stageIdx, student, oppLbs, week) {
  const composed = preferSumoPool('sumo.open.scene', student, week, stageIdx, {
    globals: { oppLbs },
    v2DepthChance: 0.3,
  });
  if (composed) return composed;
  const raw = `The first tachi-ai. You square up against ${SUMO_RIVAL_NAME} — ${oppLbs} pounds of veteran across the line from you. The crowd settles. Choose your opening.`;
  return renderSumoLegacy(raw, student, week, stageIdx, {
    globals: { oppLbs },
    v2DepthChance: 0.3,
  });
}

export function renderSumoExchangeLine(bucket, stageIdx, student, week, oppStumbleNote = '') {
  const composed = preferSumoPool('sumo.exchange.scene', student, week, stageIdx, {
    globals: { sumoBucket: bucket },
    v2DepthChance: 0.24,
  });
  if (composed) return composed + (oppStumbleNote || '');
  const raw = (stageText(SUMO_EXCHANGE_LINES[bucket] || SUMO_EXCHANGE_LINES.clash, stageIdx)) + oppStumbleNote;
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.24 });
}

export function renderSumoBoutWon(stageIdx, student, week) {
  const composed = preferSumoPool('sumo.bout.won', student, week, stageIdx, { v2DepthChance: 0.3 });
  if (composed) return composed;
  const raw = stageText(SUMO_BOUT_WON, stageIdx);
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.3 });
}

export function renderSumoBoutLost(stageIdx, student, week) {
  const composed = preferSumoPool('sumo.bout.lost', student, week, stageIdx, { v2DepthChance: 0.28 });
  if (composed) return composed;
  const raw = stageText(SUMO_BOUT_LOST, stageIdx);
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.28 });
}

export function renderSumoFillRing(stageIdx, student, week) {
  const composed = preferSumoPool('sumo.fill.scene', student, week, stageIdx, { v2DepthChance: 0.34 });
  if (composed) return composed;
  const raw = SUMO_FILL_RING_TEXT[stageIdx]
    || 'You expand completely into the ring. Your opponent steps outside. Bout to you.';
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.34 });
}

export function renderSumoCornerFeed(stageIdx, student, week) {
  const feed = SUMO_CORNER_FEED[stageIdx] || SUMO_CORNER_FEED[0];
  const composed = preferSumoPool('sumo.corner.scene', student, week, stageIdx, {
    globals: { gainAccum: feed.lbs },
    v2DepthChance: 0.3,
  });
  if (composed) return composed;
  return renderSumoLegacy(feed.text, student, week, stageIdx, {
    globals: { gainAccum: feed.lbs },
    v2DepthChance: 0.3,
  });
}

export function renderSumoNextBoutLine(boutNum, stageIdx, student, week, heavier = false) {
  const composed = preferSumoPool('sumo.next.scene', student, week, stageIdx, {
    globals: { matchWon: heavier },
    v2DepthChance: 0.22,
  });
  if (composed) return `Bout ${boutNum}. ${composed}`;
  const raw = heavier
    ? `Bout ${boutNum}. You return to center heavier than you left it. ${SUMO_RIVAL_NAME} sets her feet across from you.`
    : `Bout ${boutNum}. You square up at the center again. ${SUMO_RIVAL_NAME} sets her feet across from you.`;
  return renderSumoLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.22 });
}

export function renderSumoAftermath(stageIdx, student, gainAccum, won, oppLbs, week) {
  const composed = preferSumoPool('sumo.aftermath.scene', student, week, stageIdx, {
    globals: { gainAccum, matchWon: won, oppLbs },
    v2DepthChance: 0.32,
  });
  if (composed) return composed;
  const fn = SUMO_MATCH_AFTERMATH[stageIdx];
  const raw = fn ? fn(student, gainAccum, won, oppLbs) : '';
  return renderSumoLegacy(raw, student, week, stageIdx, {
    globals: { gainAccum, matchWon: won, oppLbs },
    v2DepthChance: 0.32,
  });
}

export function renderSumoPayoff(stageIdx, student, gainAccum, week) {
  const composed = preferSumoPool('sumo.payoff.scene', student, week, stageIdx, {
    globals: { gainAccum },
    v2DepthChance: 0.3,
  });
  if (composed) return composed;
  const fn = SUMO_PAYOFF_TEXT[stageIdx];
  const raw = fn ? fn(gainAccum) : `${Math.round(gainAccum)} pounds added to your frame since you stepped onto the dohyo. You can feel it. More.`;
  return renderSumoLegacy(raw, student, week, stageIdx, {
    globals: { gainAccum },
    v2DepthChance: 0.3,
  });
}
