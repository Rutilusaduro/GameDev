// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerPool } from '../../engine.js';

registerPool('interior.selfObs', [
  { when: {}, text: ['', ''] },
  { when: { stageMin: 3, corruption: [0] }, text: [
    'She catches herself touching her middle — reflex, not intention.',
    'The body is changing faster than the story she tells about it.',
  ] },
  { when: { stageMin: 5, corruption: [1] }, text: [
    'She inventories the new softness without the old panic.',
    'The reflection is honest now. She looks longer than she used to.',
  ] },
  { when: { stageMin: 7 }, text: [
    'She knows her size practically — which doors, which chairs, which angles.',
    'Mass is a fact she carries the way she carries her bag.',
  ] },
  { when: { corruption: [2], stageMin: 4 }, text: [
    'She looks at herself with the fondness of someone checking progress.',
    'The body is a project. The project is going well.',
  ] },
]);
