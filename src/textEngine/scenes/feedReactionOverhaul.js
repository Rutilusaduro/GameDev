// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('feed.react.beat', [
  { when: { feedRoom: 'past' }, weight: 3, text: [
    'She eats past comfort with eyes half-closed — each swallow a small surrender she no longer fights.',
    'Fullness already won; she keeps going because stopping would feel like leaving herself unfinished.',
  ]},
  { when: { feedRoom: 'tight' }, weight: 2, text: [
    'She slows but does not stop — breath careful around a belly that has run out of excuses.',
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    'Her body moves around the food — belly, hips, breath — a slow symphony of taking more room.',
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'She eats like she is being watched on purpose — savoring, displaying, asking for praise with every bite.',
  ]},
]);

registerModuleVariants('feed.react.line', [
  { when: {}, text: [
    `"More," {subject.first} murmurs, not quite asking.`,
    `She licks her lips and looks at you like the plate is your decision.`,
    `"That hit the spot," she says — meaning the spot is still hungry.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"You always know," {subject.name} breathes. "Keep feeding me."`,
  ]},
]);
