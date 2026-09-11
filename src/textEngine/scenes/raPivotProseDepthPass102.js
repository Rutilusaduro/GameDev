// Fair photo stage vignette (Pass 102) — other bridges retired to fragments.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.photo.Kylie', [
  {
    when: { mjStageBucket: ['mid'] },
    weight: 1,
    text: [
      'Training vignette: ring light, shared shakes, MJ’s belly learning the frame.',
    ],
  },
]);
