// Intimacy scene — late-stage depth overlays (peeled from pass 107).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('intimacy.depth', [
  {
    when: { endStageMin: [6] },
    weight: 1,
    text: [
      'Weight becomes weather between you — warm, constant, impossible to ignore.',
    ],
  },
]);
