// Evolved event endings + CG chat depth (Pass 76).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.event.sumo.s0.end0', [
  {
    when: {},
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} steps off the scale already thinking about the next bowl — regional day is just the opening number.`;
      },
    ],
  },
]);
