// Fair boost tier vignettes (Pass 88) — collab-specific midway beats.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.boost.Brittany', [
  {
    when: { fairBoostTier: ['Mid'] },
    weight: 1,
    text: [
      'Brittany treats the midway like a gym — reps are bites, rest is optional, pride is the scoreboard.',
    ],
  },
]);

registerModuleVariants('fair.boost.Serena', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Serena poses between funnel cakes — every flash adds a pound of legend before MJ claims the ribbon.',
    ],
  },
]);

registerModuleVariants('fair.boost.Renee', [
  {
    when: { fairBoostTier: ['Low'] },
    weight: 1,
    text: [
      'Renee starts shy at the corn-dog line and ends loud — fair pride grows wherever she finally lets herself eat.',
    ],
  },
]);

registerModuleVariants('fair.boost.Daisy', [
  {
    when: { fairBoostTier: ['Mid'] },
    weight: 1,
    text: [
      'Daisy maps the food map like homework — MJ follows the highlighter straight into another trophy photo.',
    ],
  },
]);

registerModuleVariants('fair.boost.Lilith', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Lilith’s recruits chant while MJ swallows — pride spikes like kettle corn popping in the dark.',
    ],
  },
]);
