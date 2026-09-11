// Pass 105 — fair photo stage-bucket vignette (collab context optional @ week 14+).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.photo.Brittany', [
  {
    when: { mjStageBucket: ['heavy'], fairCollab: ['Brittany'] },
    weight: 2,
    text: [
      'Trophy vignette: Brittany’s competitive grin beside MJ’s widening stats.',
    ],
  },
  {
    when: { mjStageBucket: ['heavy'] },
    weight: 1,
    text: [
      'Trophy vignette: Brittany’s competitive grin beside MJ’s widening stats.',
    ],
  },
]);
