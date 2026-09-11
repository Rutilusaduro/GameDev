// Homeroom extract + hall depth (Pass 137).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.conference.Sofia.intro', [
  {
    when: { weekMin: [6] },
    weight: 1,
    text: [
      'Sofia fills the chair before the conference starts — appetite already written in posture, not paperwork.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p1', [
  {
    when: { hallAmbiancePeakMin: [25] },
    weight: 1,
    text: [
      'Health unit phase two — moms eye the scale like the blueprint promised nobody would stay small.',
    ],
  },
]);
