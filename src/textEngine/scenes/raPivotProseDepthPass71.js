// Competitive Gainer RA chat depth (Pass 71).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('cg.raReply.taunt', [
  {
    when: { cgRaStage: ['VeryFat', 'Enormous'], cgRaHasComparison: ['yes'] },
    weight: 3,
    text: [
      (ctx) => {
        const r = ctx.globals?.residentName || 'Someone';
        const b = ctx.globals?.bodypart || 'measurements';
        return `${r}'s ${b} is cute. Your lead is not. Eat like you mean to keep the board.`;
      },
    ],
  },
]);

registerModuleVariants('cg.raReply.challenge', [
  {
    when: { cgRaHasComparison: ['yes'] },
    weight: 2,
    text: [
      (ctx) => {
        const b = ctx.globals?.bodypart || 'that category';
        return `Close the ${b} gap tonight. I want the next update to embarrass the room.`;
      },
    ],
  },
]);
