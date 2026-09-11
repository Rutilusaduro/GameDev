// Immobile redirect + evolution tails (Pass 125).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.immobile.s0.blob', [
  {
    when: { studentId: [0] },
    weight: 1,
    text: [
      'Brittany’s chair creaks agreement — dinner comes to the captain now, not the other way.',
    ],
  },
]);

registerModuleVariants('session.immobile.s7.blob', [
  {
    when: { studentId: [7] },
    weight: 1,
    text: [
      'Priya’s cost-benefit analysis already favors delivery — you’re the optimal variable.',
    ],
  },
]);

registerModuleVariants('evolution.offer.bookworm.intro', [
  {
    when: { archetype: ['bookworm'] },
    weight: 1,
    text: [
      'The season plan waits on your signature — her appetite is already peer-reviewed.',
    ],
  },
]);
