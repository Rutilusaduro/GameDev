// CG scene + cultivator modular depth (Pass 155).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('cg.scene.dataObsession', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Late-semester numbers dominate the corkboard — the hall bets on her waist, not her willpower.',
    ],
  },
]);

registerModuleVariants('cultivator.scene.labAir', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Blueprint upgrades echo even here — more room, more trays, more appetite scheduled.',
    ],
  },
]);
