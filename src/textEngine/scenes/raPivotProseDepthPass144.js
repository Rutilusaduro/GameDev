// WL talk + evolved choice modular depth (Pass 144).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wl.talk.warmOpen', [
  {
    when: { weekMin: [14] },
    weight: 1,
    text: [
      '"The hall kitchen feels like our real dining room now — we only eat this well here."',
    ],
  },
]);

registerModuleVariants('evolved.choice.bodyResult', [
  {
    when: { stageMin: [5] },
    weight: 2,
    text: [
      'Her belly presses the desk edge; every bite makes the stream feel more inevitable.',
    ],
  },
]);
