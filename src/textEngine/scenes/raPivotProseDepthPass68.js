// State Fair Queen depth (Pass 68).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.training.Brittany', [
  {
    when: { mjStageBucket: ['heavy'], cStageBucket: ['heavy'] },
    weight: 3,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Mary Jane';
        return `${n} and Brittany finish the last tray together — two champions treating fullness like a handshake.`;
      },
    ],
  },
]);

registerModuleVariants('fair.day.weighIn.open', [
  {
    when: { fairStageIdx: [4, 5], fairInfluence: ['Kylie'] },
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `Live notifications ping before ${n} steps on the scale — Kylie already posted "weigh-in soon." The fair roars anyway.`;
      },
    ],
  },
]);
