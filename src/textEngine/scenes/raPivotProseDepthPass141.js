// Evolved surface prose depth (Pass 141) — post-barrel extract variants.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.reaction.competitive_gainer.s3', [
  {
    when: { weekMin: [16] },
    weight: 1,
    text: [
      'Priya’s corkboard update lands like a weigh-in — the hall reads every number twice.',
    ],
  },
]);

registerModuleVariants('evolution.offer.swimmer.intro', [
  {
    when: { weekMin: [10] },
    weight: 1,
    text: [
      (ctx) => {
        const name = ctx.subject?.name || 'She';
        return `${name} meets you after laps — lane discipline still in her shoulders, appetite now part of the program chart.`;
      },
    ],
  },
]);
