// Wife Lessons + fair training + campus find depth (Pass 99).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wifeLessons.lesson.s1.honey_butter', [
  {
    when: {},
    weight: 1,
    text: [
      'Honey glaze on warm fingers — the kitchen teaches sweetness before anyone says the word aloud.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s4.shortcake', [
  {
    when: {},
    weight: 1,
    text: [
      'Strawberry towers wobble — daughters compete for height while cream claims every chin.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s6.daughters_bake', [
  {
    when: {},
    weight: 1,
    text: [
      'Flour on aprons, butter on wrists — the lesson is touch and permission in the same breath.',
    ],
  },
]);

registerModuleVariants('fair.training.Brittany', [
  {
    when: { mjStageBucket: ['heavy'] },
    weight: 1,
    text: [
      'Brittany drills county-fair posture — MJ’s belly learns to own the spotlight like a ribbon.',
    ],
  },
]);

registerModuleVariants('fair.training.Renee', [
  {
    when: { cStageBucket: ['heavy'] },
    weight: 1,
    text: [
      'Reneé plates training bites like a tasting menu — each portion a love letter to expansion.',
    ],
  },
]);

registerModuleVariants('fair.day.judging', [
  {
    when: { fairInfluence: ['Brittany'] },
    weight: 1,
    text: [
      'Brittany’s competitive heat rides the judging stand — every bite scored like a varsity meet.',
    ],
  },
]);

registerModuleVariants('campus.find', [
  {
    when: { explorationFindTier: ['common'] },
    weight: 1,
    text: [
      'Common salvage — mint, berries, a dropped vial — still enough to stock the next session.',
    ],
  },
]);

registerModuleVariants('hall.room.blurb', [
  {
    when: { hallRoomId: ['ra_office'] },
    weight: 1,
    text: [
      'Paperwork thins; the office learns to bless appetite instead of auditing it.',
    ],
  },
]);
