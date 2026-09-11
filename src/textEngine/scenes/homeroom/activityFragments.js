// Hall kitchen group activities — composable beat slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { HOMEROOM_GROUP_ACTIVITIES } from '../../../gameData/homeroomEvents.js';

registerPool('homeroom.activity.kitchenHeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Oven heat rolls through the lounge; residents lean in like moths.',
      'Counters disappear under flour, butter, and bowls nobody counts anymore.',
      'The wide tables groan — a good sign, Mary Jane says, if you trust appetite.',
    ],
  },
]);

registerPool('homeroom.activity.suspicion', [
  {
    when: {},
    text: [
      'Mrs. Calloway watches from the window; you keep the wellness framing gentle and exact.',
      'Someone asks if this is still a floor program; you answer with seconds on the plate.',
    ],
  },
]);

const ACTIVITY_SKELETON = '{homeroom.activity.kitchenHeat|prefix:} {homeroom.activity.suspicion|prefix: }';

for (const actKey of Object.keys(HOMEROOM_GROUP_ACTIVITIES)) {
  registerModuleVariants(`homeroom.activity.${actKey}.p0`, [
    {
      when: { weekMin: [7] },
      weight: 2,
      priority: 2,
      text: [ACTIVITY_SKELETON],
    },
  ]);
}
