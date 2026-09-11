// Fair queen + wife lesson depth (Pass 86).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.training.Brittany', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const p = ctx.globals?.partnerName || 'Her collaborator';
        return `${p} spots the pie table first — Brittany treats county fair like a contact sport.`;
      },
    ],
  },
]);

registerModuleVariants('fair.day.weighIn.open', [
  {
    when: {},
    weight: 1,
    text: [
      'The scale groans before anyone steps on — the crowd already knows this is the main event.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s2.peach_cobbler', [
  {
    when: {},
    weight: 1,
    text: [
      'Peach juice runs down chins — daughters and mothers learn the same lesson in sticky sync.',
    ],
  },
]);

registerModuleVariants('evolved.fairQueen.v2.depth', [
  {
    when: {},
    weight: 1,
    text: [
      'Blue ribbon hunger — the fair teaches appetite in public where the dorm only whispers it.',
    ],
  },
]);
