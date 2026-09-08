// The Squad — Lead: A2 Psych | Support: A5 Editor
// Corruption transition scenes — psychological shift beats.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import './personas.js';

export const SHIFT_SCENE = '{shift.scene}';

registerPool('shift.scene', [
  { when: { lastCorruptionShift: true }, text: [
    '{shift.trigger} {shift.interior} {shift.physical}{shift.denial|prefix: }{shift.coda}',
    '{shift.trigger} {shift.physical} {shift.interior}{shift.coda|prefix: }',
    '{shift.trigger} {shift.interior}{shift.physical|prefix: }{shift.coda|prefix: }',
  ] },
  { when: {}, text: [''] },
]);

/** Render corruption tier-crossing beat when lastCorruptionShift is active. */
export function renderPsychShift(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    lastCorruptionShift: opts.lastCorruptionShift ?? true,
    ...opts,
  });
  const line = render(SHIFT_SCENE, ctx, { trace: opts.trace || null });
  const base = line?.trim() || '';
  return appendV2Depth(base, 'psych', ctx, opts.v2DepthChance ?? 0.35);
}
