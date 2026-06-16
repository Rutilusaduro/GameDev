// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Immobility scene system — stages 10-11.
import { registerPool } from '../../engine.js';
import './fragments.js';

registerPool('immob.scene', [
  { when: {}, text: [
    '{immob.settledState} {immob.environmental} {immob.attempt|prefix: }{immob.assistance|prefix: }{immob.register}',
    '{immob.settledState} {immob.spaceObs} {immob.register}',
    '{immob.environmental} {immob.bodyDesc|prefix:, }{immob.register}',
  ] },
]);
