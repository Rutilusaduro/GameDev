// Outfit + evolution blurb modular depth (Pass 152).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.outfit.fabricStrain', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Custom seams were a promise; the body kept every clause.',
    ],
  },
]);

registerModuleVariants('evolution.blurb.threshold', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades hum — evolution feels like the next room on the floor plan.',
    ],
  },
]);
