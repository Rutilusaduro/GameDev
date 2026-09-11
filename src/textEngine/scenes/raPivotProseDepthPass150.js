// WL + evolved reaction modular depth (Pass 150).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wl.talk.warmOpen', [
  {
    when: { weekMin: 18 },
    weight: 1,
    text: [
      '"The daughters beat us to the kitchen again — I\'m not even mad."',
    ],
  },
]);

registerModuleVariants('evolved.reaction.witness', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades made the lounge louder; her appetite matches the new square footage.',
    ],
  },
]);
