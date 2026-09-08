// The Squad — Lead: A1 Mobile | Support: A4 Architect, A5 Editor
// Campus navigation scene library.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import './personas.js';
import './campusSceneDepth.js';

registerPool('campus.scene', [
  { when: {}, text: [
    '{campus.localeIntro} {campus.moveSentence} {campus.spaceObs|prefix: }',
    '{campus.moveSentence} {campus.obstacle|prefix: }{campus.spaceObs|prefix: }',
    '{campus.localeIntro} {campus.obstacle}{campus.soundTex|prefix:, }.',
    '{campus.moveSentence} {campus.destination}{campus.soundTex|prefix:, }.',
    '{campus.localeIntro} {campus.moveSentence} {campus.seenBeat|prefix: }',
    '{campus.moveSentence} {campus.seenBeat|prefix: }{campus.spaceObs|prefix: }',
  ] },
]);

export function renderCampusScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, locale: opts.locale ?? 'hallway', ...opts });
  const base = render('{campus.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'campusNav', ctx, opts.v2DepthChance ?? 0.25);
}
