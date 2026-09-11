// Session tap-out + homeroom NPC tails (Pass 123).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.tapOut.s7.st2', [
  {
    when: { studentId: [7] },
    weight: 1,
    text: [
      'Threshold crossed — she logs the number later; right now she just breathes around the dome of her belly.',
    ],
  },
]);

registerModuleVariants('homeroom.npc.Kayla.s3', [
  {
    when: { hallAmbiancePeakMin: [35] },
    weight: 1,
    text: [
      'Kayla smells the upgraded kitchen before she sees it — appetite already on the syllabus.',
    ],
  },
]);
