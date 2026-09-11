// Ranked session depth (Pass 67).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.rae.arrival.s2', [
  { when: { studentId: 5 }, weight: 4, text: [
    (ctx) => 'Rae had the order pre-staged. Destiny did not act surprised.',
  ]},
]);

registerModuleVariants('session.payoff.legacy.s3', [
  { when: { studentId: 5, sessionStage: [3, 4, 5] }, weight: 3, text: [
    (ctx) => {
      const g = Math.round(ctx.globals?.sessionGain ?? 0);
      const reason = ctx.globals?.sessionEndReason;
      const tail = reason === 'food_coma' ? 'Food coma. Rank climbed anyway.' : 'Focus out. Kept eating anyway.';
      return `Session log: ${g} lbs. ${tail} Rae already asked about next delivery.`;
    },
  ]},
]);
