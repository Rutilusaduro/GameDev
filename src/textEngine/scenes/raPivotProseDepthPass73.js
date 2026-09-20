// Competitive Gainer scene-beat depth (Pass 73).
import { registerPool } from '../engine.js';

registerPool('cg.v2.depth', [
  {
    when: {},
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Priya';
        return `${n} checks the board again — every inch a promise to outgrow the room.`;
      },
      (ctx) => 'The spreadsheet and the stomach agree: more is winning.',
      (ctx) => 'Pins, plates, pride — all trending up.',
    ],
  },
]);
