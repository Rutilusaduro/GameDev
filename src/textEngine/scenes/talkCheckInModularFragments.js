// Floor check-in — late-game composable overlay on talk.check_in.
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.checkIn.floorAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Ambient noise drops when she sits — plates, hallway heat, appetite already in the room.',
      'Fabric strains when she shifts; she does not hide it anymore, just breathes through the snugness.',
      'Hunger hums under polite small talk; the hall trained everyone to hear it.',
      'Every choice tonight will show up on the scale and in how she looks at you afterward.',
      'Late-semester check-ins feel tender — wellness framing ready, seconds implied.',
    ],
  },
]);

const CHECKIN_SKELETON = '{talk.checkIn.floorAir|prefix:} {talk.checkIn.greetQuote|prefix:} {talk.checkIn.greetBeat|prefix: }';

registerModuleVariants('talk.check_in', [
  {
    when: { weekMin: 22 },
    weight: 6,
    priority: 6,
    text: [
      `${CHECKIN_SKELETON} {talk.checkIn.greetClose|prefix: }`,
      `${CHECKIN_SKELETON} {talk.checkIn.diningLine|prefix: }`,
      '{talk.checkIn.floorAir|prefix:} {talk.checkIn.acceptOpen|prefix: } {talk.checkIn.acceptBody|prefix: }',
    ],
  },
  {
    when: { weekMin: 18 },
    weight: 4,
    priority: 4,
    text: [CHECKIN_SKELETON],
  },
]);
