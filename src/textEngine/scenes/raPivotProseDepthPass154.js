// Blueprint + session blob modular depth (Pass 154).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('hall.blueprint.construction', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Late-semester upgrades sound like appetite getting a permanent address.',
    ],
  },
]);

registerModuleVariants('session.blobIntro.mass', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'The room rearranges around her — trays, pillows, and permission within arm\'s reach.',
    ],
  },
]);
