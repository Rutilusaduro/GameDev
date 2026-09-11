// Tap-out + unlock modular depth (Pass 153).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.tapOut.breath', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Late-semester fullness hits different — deeper, slower, almost ceremonial.',
    ],
  },
]);

registerModuleVariants('roster.unlock.hallArrival', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Blueprint upgrades made the welcome hallway wider; appetite fills it fast.',
    ],
  },
]);
