// WL talk depth cap companion — late slot reinforcement (Pass 160).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wl.talk.raPresence', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'She keeps her voice neutral; the wellness framing does the real work — appetite wins in whispers.',
    ],
  },
]);
