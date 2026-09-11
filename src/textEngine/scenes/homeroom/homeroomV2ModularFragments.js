// Homeroom v2 depth append — late-game kitchen/floor frame.
import { registerModuleVariants } from '../../engine.js';

const V2_LATE = '{homeroom.activity.kitchenHeat|prefix:} {homeroom.scene.floorTone|prefix: } {homeroom.scene.raStance|prefix: }';

registerModuleVariants('homeroom.v2.depth', [
  {
    when: { weekMin: 20 },
    weight: 6,
    priority: 6,
    text: [V2_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [V2_LATE],
  },
]);
