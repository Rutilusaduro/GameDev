// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Eating contest — engine bridge for competitive_circuit evolved form.
import { registerDimension, render } from '../../engine.js';
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

function preferContestPool(poolKey, student, week, stageIdx, opts = {}) {
  if (!student) return '';
  const ctx = buildContestCtx(student, week, stageIdx, opts);
  const composed = render(`{${poolKey}}`, ctx)?.trim();
  if (composed && !composed.includes('{unresolved}')) {
    return appendV2Depth(composed, 'eatingContest', ctx, opts.v2DepthChance ?? 0.26);
  }
  return '';
}

export function renderContestFoodPopup(foodId, stageIdx, student, week) {
  const composed = preferContestPool('contest.food.scene', student, week, stageIdx, {
    globals: { contestFood: foodId },
    v2DepthChance: 0.26,
  });
  if (composed) return composed;
  const raw = stageText(CONTEST_FOOD_POPUPS[foodId], stageIdx);
  return renderContestLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.26 });
}

export function renderContestActionPopup(actionKey, stageIdx, student, week) {
  const composed = preferContestPool('contest.action.scene', student, week, stageIdx, {
    globals: { contestAction: actionKey },
    v2DepthChance: 0.24,
  });
  if (composed) return composed;
  const raw = stageText(CONTEST_ACTION_POPUPS[actionKey], stageIdx);
  return renderContestLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.24 });
}

export function renderContestDevourPopup(stageIdx, student, week) {
  const composed = preferContestPool('contest.devour.scene', student, week, stageIdx, {
    v2DepthChance: 0.3,
  });
  if (composed) return composed;
  const raw = stageText(CONTEST_DEVOUR_POPUPS, stageIdx);
  return renderContestLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.3 });
}

export function renderContestWeighIn2(stageIdx, student, yourGain, mayaGain, mayaLbs, week) {
  const fn = CONTEST_WEIGH_IN_2_TEXT[stageIdx];
  const raw = fn ? fn(student, yourGain, mayaGain, mayaLbs) : '';
  return renderContestLegacy(raw, student, week, stageIdx, {
    globals: { yourGain, mayaGain, mayaLbs },
    v2DepthChance: 0.32,
  });
}

export function renderContestPayoff(stageIdx, student, yourGain, week) {
  const composed = preferContestPool('contest.payoff.scene', student, week, stageIdx, {
    globals: { yourGain },
    v2DepthChance: 0.3,
  });
  if (composed) return composed;
  const fn = CONTEST_PAYOFF_TEXT[stageIdx];
  const raw = fn ? fn(yourGain) : `${Math.round(yourGain)} pounds added to your frame.`;
  return renderContestLegacy(raw, student, week, stageIdx, {
    globals: { yourGain },
    v2DepthChance: 0.3,
  });
}
