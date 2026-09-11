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
      'Calloway posters curl in the humidity; oven heat makes every surface feel like an invitation to stay.',
      'Late-semester Tuesdays smell like yeast and policy — seconds without debate, belonging without paperwork.',
    ],
  },
]);

registerPool('homeroom.activity.suspicion', [
  {
    when: {},
    weight: 2,
    text: [
      'Mrs. Calloway watches from the window; you keep the wellness framing gentle and exact.',
      'Someone asks if this is still a floor program; you answer with seconds on the plate.',
      'A clipboard appears at the door; you smile and offer her a warm roll anyway.',
      'Wellness framing ready on your tongue; the portions stay unmistakably generous anyway.',
      'Floor check-in energy softens when flour dusts the air — hunger looks like community here.',
    ],
  },
]);

registerPool('homeroom.activity.communityWarmth', [
  {
    when: {},
    weight: 2,
    text: [
      'Residents orbit the counter like a ritual — plates passed, bellies rounding, nobody pretending.',
      'Mothers and daughters lean in together; appetite spreads the way laughter used to.',
      'Someone whispers that the hall feels complicit; you agree by refilling the serving bowl.',
      'Late-semester upgrades show in wider chairs and fuller tables — architecture following appetite.',
    ],
  },
]);

const ACTIVITY_SKELETON = '{homeroom.activity.kitchenHeat|prefix:} {homeroom.activity.communityWarmth|prefix: } {homeroom.activity.suspicion|prefix: }';

for (const [actKey, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  const phases = act.phases || [{ text: act.text, choices: act.choices || [] }];
  phases.forEach((_, pi) => {
    registerModuleVariants(`homeroom.activity.${actKey}.p${pi}`, [
      {
        when: { weekMin: 20 },
        weight: 6,
        priority: 5,
        text: [ACTIVITY_SKELETON],
      },
      {
        when: { weekMin: 16 },
        weight: 4,
        priority: 3,
        text: [ACTIVITY_SKELETON],
      },
      {
        when: { weekMin: 7 },
        weight: 2,
        priority: 2,
        text: [ACTIVITY_SKELETON],
      },
    ]);
  });
}
