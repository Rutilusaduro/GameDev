// Evolution offer + CG late modular (Pass 151).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolution.offer.hallTone', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint halls hum; evolution offers sound like floor plans for appetite.',
    ],
  },
]);

registerModuleVariants('cg.chat.boardTone', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'She screenshots the leaderboard before anyone can delete the evidence.',
    ],
  },
]);
