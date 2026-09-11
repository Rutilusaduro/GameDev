// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Eating contest — engine bridge for competitive_circuit evolved form.
import { registerDimension, registerModuleVariants, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import '../proseOverhaulPass4.js';
import './biteBeats.js';
import './actionBeats.js';
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
  const linger = render('{contest.linger}', ctx)?.trim() || '';
  const composed = linger ? `${line}\n\n${linger}` : line;
  return appendV2Depth(composed, 'eatingContest', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderContestFoodPopup(foodId, stageIdx, student, week) {
  const ctx = buildContestCtx(student, week, stageIdx, { globals: { contestFood: foodId } });
  const scene = render('{contest.bite.scene}', ctx)?.trim();
  if (scene) {
    return renderContestLegacy(scene, student, week, stageIdx, {
      v2DepthChance: 0.26,
      globals: { contestFood: foodId },
    });
  }
  const raw = stageText(CONTEST_FOOD_POPUPS[foodId], stageIdx);
  return renderContestLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.26 });
}

export function renderContestActionPopup(actionKey, stageIdx, student, week) {
  const ctx = buildContestCtx(student, week, stageIdx, { globals: { contestAction: actionKey } });
  const scene = render('{contest.action.scene}', ctx)?.trim();
  if (scene) {
    return renderContestLegacy(scene, student, week, stageIdx, {
      v2DepthChance: 0.24,
      globals: { contestAction: actionKey },
    });
  }
  const raw = stageText(CONTEST_ACTION_POPUPS[actionKey], stageIdx);
  return renderContestLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.24 });
}

export function renderContestDevourPopup(stageIdx, student, week) {
  const ctx = buildContestCtx(student, week, stageIdx);
  const scene = render('{contest.devour.scene}', ctx)?.trim();
  if (scene) return renderContestLegacy(scene, student, week, stageIdx, { v2DepthChance: 0.3 });
  const raw = stageText(CONTEST_DEVOUR_POPUPS, stageIdx);
  return renderContestLegacy(raw, student, week, stageIdx, { v2DepthChance: 0.3 });
}

export function renderContestWeighIn2(stageIdx, student, yourGain, mayaGain, mayaLbs, week) {
  const globals = { yourGain, mayaGain, mayaLbs };
  const ctx = buildContestCtx(student, week, stageIdx, { globals });
  const scene = render('{contest.weigh.scene}', ctx)?.trim();
  if (scene) {
    return renderContestLegacy(scene, student, week, stageIdx, { globals, v2DepthChance: 0.32 });
  }
  const fn = CONTEST_WEIGH_IN_2_TEXT[stageIdx];
  const raw = fn ? fn(student, yourGain, mayaGain, mayaLbs) : '';
  return renderContestLegacy(raw, student, week, stageIdx, {
    globals,
    v2DepthChance: 0.32,
  });
}

export function renderContestPayoff(stageIdx, student, yourGain, week) {
  const ctx = buildContestCtx(student, week, stageIdx, { globals: { yourGain } });
  const scene = render('{contest.payoff.scene}', ctx)?.trim();
  if (scene) return appendV2Depth(scene, 'eatingContest', ctx, 0.3);
  const fn = CONTEST_PAYOFF_TEXT[stageIdx];
  const raw = fn ? fn(yourGain) : `${Math.round(yourGain)} pounds added to your frame.`;
  const glow = render('{contest.afterglow}', ctx)?.trim() || '';
  const linger = render('{contest.linger}', ctx)?.trim() || '';
  const composed = [raw, glow, linger].filter(Boolean).join('\n\n');
  return appendV2Depth(composed, 'eatingContest', ctx, 0.3);
}

registerModuleVariants('contest.afterglow', [
  { when: { leftoverFed: true, contestStage: [0, 1] }, weight: 3, text: [
    'Galley leftover plus the bib. First-circuit heat is a second sitting Maya can see.',
    'Last night\'s tray still in her. The table is bones and sauce. She is both sittings.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen heat under the bib. She sits in leftover like it is a ranking.',
    'The galley started her. The contest finished the log.',
  ] },
  { when: { contestStage: [0, 1] }, weight: 2, text: [
    'The bib is a wreck. She keeps a palm on the new weight like a trophy Maya can see.',
    'First-circuit heat still in her. The table is bones and sauce. She is the rest of the scoreboard.',
  ] },
  { when: { contestStage: [4, 5] }, weight: 2, text: [
    'The chair reports her. So does the floor. Maya writes a number and does not look away.',
    'Crowd noise thins. Fullness does not. She sits in the leftover heat like it is a ranking.',
  ] },
  { when: {}, text: [
    'She breathes around the last plate and lets the belly finish arriving.',
    'Maya\'s side is emptier than it looks. Hers is honest.',
    'Someone in the cheap seats says her name like a record. She eats the sound.',
  ] },
]);

