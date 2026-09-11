// Competitive Gainer measurement depth (Pass 69).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('cg.measurement.session', [
  {
    when: { cgDriveTier: ['Frenzied', 'Ruthless'], targetStageBucket: ['heavy', 'vast'] },
    weight: 3,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        const t = ctx.subject?.name || 'She';
        return `${p} barely blinks as you measure ${t} — every inch logged like ammunition for the next binge.`;
      },
    ],
  },
]);
