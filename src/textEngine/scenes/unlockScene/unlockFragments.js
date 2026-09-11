// Roster unlock scenes — composable hall arrival slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { UNLOCK_SCENES } from '../../../gameData/unlockScenes.js';

registerPool('roster.unlock.hallArrival', [
  {
    when: {},
    weight: 2,
    text: [
      'The hall door opens on appetite — new resident, new data, new possibilities.',
      'Floor check-in energy turns curious; someone is about to learn how we eat here.',
      'Wellness framing ready; hunger already leaking through the welcome smile.',
      'Late-semester arrivals still feel ceremonial — Hall Ambiance climbs when the roster slot fills.',
      'Blueprint ink dries somewhere down the hall; appetite walks in through the front door.',
    ],
  },
]);

registerPool('roster.unlock.firstHunger', [
  {
    when: {},
    weight: 2,
    text: [
      'She clocks the kitchen first — honest instinct in a building built for seconds.',
      'The roster slot is official; the body language is already unofficially hungry.',
      'You offer orientation; she hears invitation.',
      'Hunger hums under polite small talk; co-conspirator smiles start on day one.',
      'Every pound she gains here will feel like policy the floor already voted for.',
    ],
  },
]);

const UNLOCK_SKELETON = '{roster.unlock.hallArrival|prefix:} {roster.unlock.firstHunger|prefix: }';

for (const studentId of Object.keys(UNLOCK_SCENES)) {
  registerModuleVariants(`roster.unlock.s${studentId}`, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [UNLOCK_SKELETON],
    },
    {
      when: { weekMin: 10 },
      weight: 4,
      priority: 3,
      text: [UNLOCK_SKELETON],
    },
    {
      when: { weekMin: 4 },
      weight: 2,
      priority: 2,
      text: [UNLOCK_SKELETON],
    },
  ]);
}

registerModuleVariants('roster.unlock.s5', [
  {
    when: { studentId: [5] },
    weight: 1,
    text: [
      'Destiny’s door cracks open on RGB glow — trust unlock reads like a new stream category: private, ranked, hungry.',
    ],
  },
]);

registerModuleVariants('roster.unlock.s1', [
  {
    when: { studentId: [1] },
    weight: 1,
    text: [
      'Cassidy’s unlock scene lands like a lane change — trust opens, portions follow.',
    ],
  },
]);
