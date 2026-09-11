// Feed refusal / force — resident-specific overlays (peeled from pass 65).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('feed.refusal', [
  {
    when: { studentId: 3, stageMin: 4 },
    weight: 3,
    text: [
      () => 'Serena taps her stomach, athlete-honest. "Coach, I\'m capped. Real cap."',
    ],
  },
  {
    when: { studentId: 15 },
    weight: 3,
    text: [
      () => 'Lilith smiles without warmth. "Not tonight. You\'ll wait."',
    ],
  },
]);

registerModuleVariants('feed.force.success', [
  {
    when: { corruption: [2], stageMin: 5 },
    weight: 3,
    text: [
      (ctx) => `${ctx.subject?.name || 'She'} keeps eating past protest — hunger owns the room now.`,
    ],
  },
]);
