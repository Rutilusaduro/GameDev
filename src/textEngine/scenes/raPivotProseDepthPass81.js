// Homeroom conference + CG scene tails (Pass 81).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.conference.Mrs_Calloway.intro', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Daisy';
        return `Mrs. Calloway studies ${n}'s table the way inspectors study permits — slow, polite, already deciding.`;
      },
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0', [
  {
    when: {},
    weight: 1,
    text: [
      'Three mothers, one agenda, and a snack bowl that empties faster than the wellness notes.',
    ],
  },
]);

registerModuleVariants('cg.scene.corkboard.Driven', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        return `${p} updates the board like a athlete editing a highlight reel — only the numbers that flatter hunger.`;
      },
    ],
  },
]);

registerModuleVariants('cg.scene.binge.Fat.Driven', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        return `${p} clears the spread with competitive calm — calories logged where the corkboard can see them.`;
      },
    ],
  },
]);
