// Full evolved + homeroom modular depth (Pass 146).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.scene.atmosphere', [
  {
    when: { weekMin: [16] },
    weight: 1,
    text: [
      'Blueprint upgrades hum in the walls — the hall feels built to feed on purpose.',
    ],
  },
]);

registerModuleVariants('homeroom.scene.floorTone', [
  {
    when: { weekMin: [14] },
    weight: 1,
    text: [
      'Wide tables, warm ovens, residents who stopped pretending they are not hungry.',
    ],
  },
]);
