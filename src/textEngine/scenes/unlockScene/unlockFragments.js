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
    ],
  },
]);

const UNLOCK_SKELETON = '{roster.unlock.hallArrival|prefix:} {roster.unlock.firstHunger|prefix: }';

for (const studentId of Object.keys(UNLOCK_SCENES)) {
  registerModuleVariants(`roster.unlock.s${studentId}`, [
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
