// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Eating contest — engine bridge for competitive_circuit evolved form.
import { registerDimension, registerPool, render } from '../../engine.js';
import './legacyPools.js';
import './eatingContestFragments.js';
import './payoffFragments.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import {
  CONTEST_FOOD_POPUPS,
  CONTEST_ACTION_POPUPS,
  CONTEST_DEVOUR_POPUPS,
  CONTEST_WEIGH_IN_2_TEXT,
  CONTEST_PAYOFF_TEXT,
} from '../../../gameData/miniGames.js';

registerDimension('contestStage', (ctx) => ctx.globals?.contestStage ?? 0);
registerDimension('yourGain', (ctx) => ctx.globals?.yourGain ?? 0);
registerDimension('mayaGain', (ctx) => ctx.globals?.mayaGain ?? 0);
registerDimension('mayaLbs', (ctx) => ctx.globals?.mayaLbs ?? 330);

registerPool('yourGain', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.yourGain ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.yourGain ?? 0)}`] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.yourGain ?? ctx.globals?.yourGain ?? 0))] },
]);
registerPool('mayaGain', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.mayaGain ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.mayaGain ?? 0)}`] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.mayaGain ?? ctx.globals?.mayaGain ?? 0))] },
]);

function stageText(arr, stageIdx) {
  const item = arr?.[stageIdx];
  return typeof item === 'string' ? item.trim() : '';
}

export function buildContestCtx(student, week, stageIdx = 0, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'eating_contest',
      contestStage: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderContestLegacy(text, student, week, stageIdx = 0, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line || !student) return line;
  const ctx = buildContestCtx(student, week, stageIdx, opts);
  return appendV2Depth(line, 'eatingContest', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderContestFoodPopup(foodId, stageIdx, student, week) {
  const ctx = buildContestCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), (CONTEST_FOOD_POPUPS[foodId]?.length || 1) - 1);
  const raw = render(`{contest.food.${foodId}.s${si}}`, ctx)?.trim()
    || stageText(CONTEST_FOOD_POPUPS[foodId], stageIdx);
  return appendV2Depth(raw, 'eatingContest', ctx, 0.26);
}

export function renderContestActionPopup(actionKey, stageIdx, student, week) {
  const ctx = buildContestCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), (CONTEST_ACTION_POPUPS[actionKey]?.length || 1) - 1);
  const raw = render(`{contest.action.${actionKey}.s${si}}`, ctx)?.trim()
    || stageText(CONTEST_ACTION_POPUPS[actionKey], stageIdx);
  return appendV2Depth(raw, 'eatingContest', ctx, 0.24);
}

export function renderContestDevourPopup(stageIdx, student, week) {
  const ctx = buildContestCtx(student, week, stageIdx);
  const si = Math.min(Math.max(0, stageIdx), CONTEST_DEVOUR_POPUPS.length - 1);
  const raw = render(`{contest.devour.s${si}}`, ctx)?.trim()
    || stageText(CONTEST_DEVOUR_POPUPS, stageIdx);
  return appendV2Depth(raw, 'eatingContest', ctx, 0.3);
}

export function renderContestWeighIn2(stageIdx, student, yourGain, mayaGain, mayaLbs, week) {
  const ctx = buildContestCtx(student, week, stageIdx, {
    globals: { yourGain, mayaGain, mayaLbs },
  });
  const si = Math.min(Math.max(0, stageIdx), CONTEST_WEIGH_IN_2_TEXT.length - 1);
  const fn = CONTEST_WEIGH_IN_2_TEXT[stageIdx];
  const raw = render(`{contest.weighIn.s${si}}`, ctx)?.trim()
    || (fn ? fn(student, yourGain, mayaGain, mayaLbs) : '');
  return appendV2Depth(raw, 'eatingContest', ctx, 0.32);
}

export function renderContestPayoff(stageIdx, student, yourGain, week) {
  const ctx = buildContestCtx(student, week, stageIdx, { globals: { yourGain } });
  const si = Math.min(Math.max(0, stageIdx), 5);
  const fn = CONTEST_PAYOFF_TEXT[stageIdx];
  const raw = render(`{contest.payoff.compose.s${si}}`, ctx)?.trim()
    || render(`{contest.payoff.legacy.s${si}}`, ctx)?.trim()
    || (fn ? fn(yourGain) : `${Math.round(yourGain)} pounds added to your frame.`);
  return appendV2Depth(raw, 'eatingContest', ctx, 0.3);
}
