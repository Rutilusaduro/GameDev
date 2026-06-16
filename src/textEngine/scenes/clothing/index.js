// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Clothing failure scene library.
import { registerPool } from '../../engine.js';
import './fragments.js';

registerPool('cloth.scene', [
  { when: {}, text: [
    '{cloth.discovery} {cloth.struggle} {cloth.moment} {cloth.reaction}{cloth.aftermath|prefix: }',
    '{cloth.discovery} {cloth.failBeat} {cloth.reaction}',
    '{cloth.moment} {cloth.failSound|prefix:, }{cloth.reaction}',
  ] },
]);
