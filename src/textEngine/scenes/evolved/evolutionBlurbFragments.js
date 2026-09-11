// Evolution roster button blurb — composable anticipation slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLUTION_BUTTON_BLURB } from '../../../gameData/evolutionUiData.js';

registerPool('evolution.blurb.threshold', [
  {
    when: {},
    weight: 2,
    text: [
      'The next stage waits behind one more yes — appetite sharpened, body ready.',
      'Evolution is not a surprise here; it is a door she already leaned on.',
      'Her reflection and the roster agree: time to grow into the named path.',
      'Late-semester evolution feels inevitable — appetite sharpened, hallway already cheering the yes.',
    ],
  },
]);

registerPool('evolution.blurb.raStakes', [
  {
    when: {},
    weight: 2,
    text: [
      'Floor favor rides on how boldly she commits; you will log every pound.',
      'The hall watches evolution like a pep rally — loud, hungry, proud.',
      'You keep the framing wellness-clean; she keeps the hunger honest.',
    ],
  },
]);

const BLURB_SKELETON = '{evolution.blurb.threshold|prefix:} {evolution.blurb.raStakes|prefix: }';

for (const archetype of Object.keys(EVOLUTION_BUTTON_BLURB)) {
  registerModuleVariants(`evolution.blurb.${archetype}`, [
    {
      when: { weekMin: 12 },
      weight: 4,
      priority: 3,
      text: [BLURB_SKELETON],
    },
    {
      when: { weekMin: 5 },
      weight: 2,
      priority: 2,
      text: [BLURB_SKELETON],
    },
  ]);
}
