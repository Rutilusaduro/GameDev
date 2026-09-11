// CG RA reply + session fullness modular (Pass 156).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('cg.raReply.wellnessFrame', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades made the wellness script easier — the hall already believes it.',
    ],
  },
]);

registerModuleVariants('session.fullness.pressure', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Late-semester fullness sits heavier — habit, not accident, in every swallowed bite.',
    ],
  },
]);
