// Evolved outfit + CG chat tails (Pass 122).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.outfit.sumo.s3', [
  {
    when: { evolvedForm: ['sumo'] },
    weight: 1,
    text: [
      'Championship regalia strains at the seams — the ring already knows her number.',
    ],
  },
]);

registerModuleVariants('evolved.outfit.eating_competitor.s4', [
  {
    when: { evolvedForm: ['eating_competitor'] },
    weight: 1,
    text: [
      'Sponsor gear head to toe — logos stretch where appetite won.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaPost.leading.High', [
  {
    when: { cgDriveTier: ['High'] },
    weight: 1,
    text: [
      'Priya posts the leaderboard screenshot — your hall’s name sits at the top, soft and undeniable.',
    ],
  },
]);
