// The Squad — Lead: A2 Psych | Support: A5 Editor
// Corruption transition scenes — psychological shift beats.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fragments.js';

export const SHIFT_SCENE = '{shift.scene}';

registerPool('shift.scene', [
  { when: { lastCorruptionShift: true }, text: [
    '{shift.trigger} {shift.interior} {shift.physical}{shift.denial|prefix: }{shift.coda}',
    '{shift.trigger} {shift.physical} {shift.interior}{shift.coda|prefix: }',
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
  return line?.trim() || '';
}
