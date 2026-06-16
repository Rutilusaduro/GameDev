// The Squad — Lead: A1 Mobile | Support: A4 Architect, A5 Editor
// Campus navigation scene library.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fragments.js';

registerPool('campus.scene', [
  { when: {}, text: [
    '{campus.localeIntro} {campus.moveSentence} {campus.spaceObs|prefix: }',
    '{campus.moveSentence} {campus.obstacle|prefix: }{campus.spaceObs|prefix: }',
    '{campus.localeIntro} {campus.obstacle}{campus.soundTex|prefix:, }.',
  ] },
]);

export function renderCampusScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, locale: opts.locale ?? 'hallway', ...opts });
  return render('{campus.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
}
