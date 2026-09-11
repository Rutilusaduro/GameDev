// Blueprint + evolution athlete + session tap tails (Pass 127).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('hall.blueprint.upgrade.confirm', [
  {
    when: { hallAmbiancePeakMin: [40] },
    weight: 1,
    text: [
      'Upgrade confirms — labeled rooms pull warmth through the whole wing like shared breath.',
    ],
  },
]);

registerModuleVariants('evolution.blurb.athlete', [
  {
    when: { archetype: ['athlete'] },
    weight: 1,
    text: [
      'Gym doorway Tuesday — she outgrew the old sport; competitiveness just needs a new arena.',
    ],
  },
]);

registerModuleVariants('session.tapOut.s5.st3', [
  {
    when: { studentId: [5] },
    weight: 1,
    text: [
      'Controller down, belly up — Destiny taps out like closing a ranked queue on a full inventory.',
    ],
  },
]);

registerModuleVariants('diary.innerBeat', [
  {
    when: { hallAmbiancePeakMin: [30] },
    weight: 1,
    text: [
      'The hall hums through the page — appetite feels policy-approved tonight.',
    ],
  },
]);
