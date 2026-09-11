// The Squad — Lead: A1 Mobile | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('ge.firstSensation', [
  { when: { stageMin: 0, stageMax: 4 }, text: [
    'a new softness gathering under her skin like a secret finally audible',
    'warmth pooling where fabric used to lie flat',
  ]},
  { when: { stageMin: 5, stageMax: 8 }, text: [
    'heaviness arriving in layers — belly, hips, breath — each confirming the last',
    'the body finishing a sentence she started eating weeks ago',
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    'mass settling slow and sure — a tide that does not apologize for rising',
  ]},
]);

registerModuleVariants('ge.reactionBody', [
  { when: { corruption: [0] }, weight: 2, text: [
    'cheeks hot, fingers tracing the new curve as if checking it is real',
    'stillness while she negotiates with the mirror',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'a slow smile — pride without performance, appetite without shame',
    'hands spreading over fresh softness like blessing it',
  ]},
]);

registerModuleVariants('ge.digestReaction', [
  { when: { stageMin: 6 }, weight: 2, text: [
    `{subject.name} exhales, pleased. "So that's the week. Good."`,
    `"I felt it coming," she says — and sounds glad she was right.`,
  ]},
]);

registerModuleVariants('ge.settle', [
  { when: {}, text: [
    'Heat fades; weight stays — permanent, patient, adored.',
    'The gain does not flash; it nests — warm, domestic, hers.',
    'She carries the new number into the week like a promise kept.',
  ]},
]);

registerModuleVariants('ge.strain', [
  { when: { stageMin: 5 }, weight: 2, text: [
    'Seams complain; buttons negotiate; the body wins without hurry.',
    '{ge.garment} surrenders a thread — a small white flag of growth.',
  ]},
]);
