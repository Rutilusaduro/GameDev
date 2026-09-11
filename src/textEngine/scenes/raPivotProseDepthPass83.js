// CG RA encourage when comparison active (Pass 83) — homeroom bridges retired to fragments.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('cg.raReply.encourage', [
  {
    when: { cgRaHasComparison: ['yes'] },
    weight: 1,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        return `${p} reads your message and eats while she types — multitasking as dominance.`;
      },
    ],
  },
]);
