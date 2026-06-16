// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Immobility scene system — stages 10-11.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fragments.js';
import './personas.js';

registerPool('immob.scene', [
  { when: {}, text: [
    '{immob.settledState} {immob.environmental} {immob.attempt|prefix: }{immob.assistance|prefix: }{immob.register}',
    '{immob.settledState} {immob.spaceObs} {immob.register}',
    '{immob.environmental} {immob.bodyDesc|prefix:, }{immob.register}',
  ] },
]);

export function renderImmobScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{immob.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
}
