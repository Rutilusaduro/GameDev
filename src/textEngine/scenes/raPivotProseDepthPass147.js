// Fair + CG + homeroom late modular depth (Pass 147).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.day.carnivalAir', [
  {
    when: { weekMin: [18] },
    weight: 1,
    text: [
      'Late-season fair heat — every ribbon category smells like batter and ambition.',
    ],
  },
]);

registerModuleVariants('cg.chat.boardTone', [
  {
    when: { weekMin: [20] },
    weight: 1,
    text: [
      'Priya pins the corkboard update where everyone has to see it — numbers as prophecy.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.kitchenHeat', [
  {
    when: { weekMin: [22] },
    weight: 1,
    text: [
      'The hall kitchen runs hot enough to melt resolve; residents line up with empty bowls.',
    ],
  },
]);
