// State Fair Queen evolved + trophy depth (Pass 70).
import { registerModuleVariants, registerPool } from '../engine.js';

registerPool('evolved.fairQueen.v2.depth', [
  {
    when: {},
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `Sawdust, sugar, crowd noise — ${n} carries the fair in her hips now.`;
      },
      (ctx) => 'The scale is livestock-grade. The pride is not.',
      (ctx) => 'Darcy can train six months. Mary Jane can grow six months faster.',
    ],
  },
]);

registerModuleVariants('fair.photo.Brittany', [
  {
    when: { mjStageBucket: ['heavy'] },
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Mary Jane';
        return `Trophy Wall: ${n} mid-laugh, pie filling her smile — the county already knows her name.`;
      },
    ],
  },
]);
