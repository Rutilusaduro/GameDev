// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('talk.suggest_indulgence.b00._f1', [
  { when: { stageMin: 4 }, weight: 2, text: [
    `You let the idea drift — food, warmth, permission — and {subject.name}'s body answers before her pride can object.`,
  ]},
]);

registerModuleVariants('talk.suggest_indulgence.b00._f4', [
  { when: {}, text: [
    'The suggestion settles behind her eyes like seed in warm soil — she will think it was her idea, and that is the point.',
    'You watch the want arrive; she does not know you planted it. She will thank the hunger anyway.',
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'The seed lands in ground already tilled — she smiles, hungry, grateful, yours in the way appetite makes people yours.',
  ]},
]);

registerModuleVariants('talk.suggest_indulgence.b10._f1', [
  { when: { stageMin: 5 }, weight: 2, text: [
    `The suggestion lands on prepared ground — belly leading, thighs brushing — {subject.name} stands before thought catches up.`,
  ]},
]);

registerModuleVariants('talk.suggest_indulgence.b20._f1', [
  { when: { corruption: [2] }, weight: 3, text: [
    `You barely finish the sentence before {subject.first} is nodding — "Yes. Feed me. Now."`,
  ]},
]);
