// The Squad — Lead: A6 Slender | Support: A4 Architect, A5 Editor
// Early-game scene library — thin/softening bodies, reluctance, neutrality, secret want.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext, wrapLeftoverLinger } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import './personas.js';
import '../proseOverhaulPass4.js';

/**
 * Derive early-game attitude toward gaining from psych + corruption.
 * opposed — high shame, active resistance
 * reluctant — shame crack or mixed signals
 * secret — low shame, high fixation (wants without admitting)
 * neutral — low shame, low fixation (genuinely unfussed)
 * acclimating — corruption 1+ (A2 Psych owns; pools gate on corruption [0])
 */
registerDimension('gainStance', (ctx) => {
  if ((ctx.subject?.custom || ctx.subject?.origin) && ctx.subject?.gainStance) return ctx.subject.gainStance;
  const cor = ctx.d?.corruption ?? 0;
  if (cor > 0) return 'acclimating';
  const shame = ctx.d?.shameTier ?? 0;
  const fixation = ctx.d?.fixationTier ?? 0;
  if (shame >= 2) return 'opposed';
  if (shame === 1) return 'reluctant';
  if (fixation >= 2) return 'secret';
  return 'neutral';
});

export const SLENDER_SCENE = '{slender.bodyFeel} {slender.mindFeel}{join:slender.deflect,slender.neutral|prefix: }{slender.secret|prefix: }';
export const SLENDER_MIRROR_SCENE = '{slender.mirror} {slender.mindFeel}{slender.deflect|prefix: }';
export const SLENDER_EAT_SCENE = '{slender.eatPause}{slender.bodyNotice|prefix:, }';

registerPool('slender.scene', [
  { when: { corruption: [0], stageMax: 4 }, text: [
    '{slender.bodyFeel} {slender.mindFeel} {slender.deflect}{slender.neutral}{slender.secret}',
    '{slender.bodyNotice|prefix: }{slender.bodyFeel} {slender.mindFeel}{slender.deflect|prefix: }',
    '{slender.bodyFeel} {slender.mirror|prefix: } {slender.mindFeel}{slender.neutral|prefix: }',
  ] },
  { when: {}, text: [
    '{slender.bodyFeel} {slender.mindFeel}',
    'She is still learning what the number means.',
    'The body keeps its own calendar.',
    '{slender.bodyNotice|prefix: }{slender.mindFeel}{slender.neutral|prefix: }',
  ] },
]);

/**
 * Render an early-game body/attitude beat — stages 0–4, corruption 0.
 * @param {object} student
 * @param {number} week
 * @param {object} opts — trace, weekGainLbs, globals, psych overrides via student
 */
function slenderLine(base, student, week, ctx, opts, chance) {
  const lined = appendV2Depth(base, 'earlyGain', ctx, chance);
  if (opts.skipLeftoverLinger) return lined;
  return wrapLeftoverLinger(lined, student, week, 'slender.linger');
}

export function renderSlenderScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const line = render('{slender.scene}', ctx, { trace: opts.trace || null });
  const base = line?.trim() || '';
  return slenderLine(base, student, week, ctx, opts, opts.v2DepthChance ?? 0.32);
}

export function renderSlenderMirrorBeat(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render(SLENDER_MIRROR_SCENE, ctx, { trace: opts.trace || null })?.trim() || '';
  return slenderLine(base, student, week, ctx, opts, opts.v2DepthChance ?? 0.3);
}

export function renderSlenderEatBeat(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render(SLENDER_EAT_SCENE, ctx, { trace: opts.trace || null })?.trim() || '';
  return slenderLine(base, student, week, ctx, opts, opts.v2DepthChance ?? 0.3);
}
