// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Clothing failure scene library.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fragments.js';
import './personas.js';

registerPool('cloth.scene', [
  { when: {}, text: [
    '{cloth.discovery} {cloth.struggle} {cloth.moment} {cloth.reaction}{cloth.aftermath|prefix: }',
    '{cloth.discovery} {cloth.failBeat} {cloth.reaction}',
    '{cloth.moment} {cloth.failSound|prefix:, }{cloth.reaction}',
    '{cloth.discovery} {cloth.struggle} {cloth.reaction}{cloth.aftermath|prefix: }',
  ] },
]);

export function renderClothScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{cloth.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
}
