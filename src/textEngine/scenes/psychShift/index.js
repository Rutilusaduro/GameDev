// Corruption transition scenes — psychological shift beats.
import { registerPool } from '../../engine.js';
import './fragments.js';

registerPool('shift.scene', [
  { when: { lastCorruptionShift: true }, text: [
    '{shift.trigger} {shift.interior} {shift.physical}{shift.denial|prefix: }{shift.coda}',
    '{shift.trigger} {shift.physical} {shift.interior}{shift.coda|prefix: }',
  ] },
  { when: {}, text: [''] },
]);
