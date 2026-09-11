// Modular evolved + WL depth (Pass 143).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.scene.stakes', [
  {
    when: { weekMin: [20] },
    weight: 1,
    text: [
      'The hall remembers every pound you logged here — tonight adds another verse.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s8.legacy_recipe', [
  {
    when: { weekMin: [16] },
    weight: 2,
    text: [
      '{wl.lesson.lateFeast|prefix:} Mary Jane unwraps the sealed recipe card like scripture — daughters leaning in, bellies soft against the table edge.',
    ],
  },
]);
