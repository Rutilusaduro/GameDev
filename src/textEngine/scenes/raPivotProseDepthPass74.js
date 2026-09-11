// Evolved activity beat depth (Pass 74).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.activity.state_fair_queen', [
  {
    when: { evolvedStageIdx: [2, 3, 4] },
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} smells sawdust on her clothes before the fair even opens — pride already sticky with sugar.`;
      },
    ],
  },
]);
