// Fair training buckets + campus/hall vignettes (Pass 99) — WL lessons in lessonFragments.
import { registerModuleVariants } from '../engine.js';

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
