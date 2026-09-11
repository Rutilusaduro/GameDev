// MIGRATION bridge namespaces — late overlays (Pass 159).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('campusEvent.scene.mood_stressed', [
  {
    when: { weekMin: 22 },
    weight: 1,
    text: [
      'Late-semester stress still smells like energy drinks — appetite underneath, waiting for permission.',
    ],
  },
]);

registerModuleVariants('hunt.feast.hungerCall', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Blueprint upgrades made the feast room easier to fill — hunger answers architecture now.',
    ],
  },
]);
