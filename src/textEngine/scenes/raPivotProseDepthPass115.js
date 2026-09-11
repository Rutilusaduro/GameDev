// Campus + scrutiny + homeroom tails (Pass 115).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('campus.exploration.reward', [
  {
    when: { hallAmbiancePeakMin: [40] },
    weight: 1,
    text: [
      'You find more than crumbs — the hall’s warmth seems to follow you off-floor.',
    ],
  },
]);

registerModuleVariants('scrutiny.threshold.crossed', [
  {
    when: { scrutinyMin: [50] },
    weight: 1,
    text: [
      'Eyes multiply in the admin wing — every tray you approve reads like testimony.',
    ],
  },
]);

registerModuleVariants('homeroom.bridge.opening', [
  {
    when: { weekMin: [12] },
    weight: 1,
    text: [
      'Homeroom smells like butter and policy — your residents arrive already hungry for the lecture.',
    ],
  },
]);

registerModuleVariants('pharmacist.cult.distribution.flavor', [
  {
    when: { cultDevotionMin: [50] },
    weight: 1,
    text: [
      'The circle kneels for labels, not sermons — devotion measured in empty tubs.',
    ],
  },
]);

registerModuleVariants('evolved.activity.pharmacist.s2', [
  {
    when: { evolvedFormId: ['pharmacist'], evolvedStageIdx: [2] },
    weight: 1,
    text: [
      'Sophia counts doses like blessings — your floor swells with quiet compliance.',
    ],
  },
]);
