// Journal + ranked session modular depth (Pass 148).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('journal.scene.fieldNotes', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      'Late-semester notes stack thick — every subject trending heavier, every margin honest.',
    ],
  },
]);

registerModuleVariants('session.scene.deliveryAir', [
  {
    when: { weekMin: 16 },
    weight: 1,
    text: [
      'The cart is heavier each week — trays, thermoses, and the quiet certainty she will win.',
    ],
  },
]);
