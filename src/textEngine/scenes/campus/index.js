// Campus navigation scene library.
import { registerPool } from '../../engine.js';
import './fragments.js';

registerPool('campus.scene', [
  { when: {}, text: [
    '{campus.localeIntro} {campus.moveSentence} {campus.spaceObs|prefix: }',
    '{campus.moveSentence} {campus.obstacle|prefix: }{campus.spaceObs|prefix: }',
    '{campus.localeIntro} {campus.obstacle}{campus.soundTex|prefix:, }.',
  ] },
]);
