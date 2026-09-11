// Late-semester modular dominance (Pass 149).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wl.lesson.lateFeast', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'The kitchen holds every lesson at once — steam, sugar, and surrender in the air.',
    ],
  },
]);

registerModuleVariants('homeroom.scene.floorTone', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Blueprint upgrades made the lounge wider; appetite filled the extra space overnight.',
    ],
  },
]);
