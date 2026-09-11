// Wife Lessons + ranked session depth (Pass 139) — post-extract module variants.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wifeLessons.lesson.s6.daughters_bake', [
  {
    when: { weekMin: [20] },
    weight: 1,
    text: [
      'Daughters run the counter now — MJ watches from the stool, flour on her apron like a badge the hall already recognizes.',
    ],
  },
]);

registerModuleVariants('session.payoff.legacy.s4', [
  {
    when: { weekMin: [24] },
    weight: 1,
    text: [
      (ctx) => {
        const gain = Math.round(ctx.globals?.sessionGain ?? 0);
        const reason = ctx.globals?.sessionEndReason ?? 'focus_out';
        const stop = reason === 'food_coma' ? 'Food coma.' : 'Focus out.';
        return `${stop} ${gain} lbs. Grandmaster rank, desk clear, Rae already planning the next delivery before you finish the victory screen.`;
      },
    ],
  },
]);
