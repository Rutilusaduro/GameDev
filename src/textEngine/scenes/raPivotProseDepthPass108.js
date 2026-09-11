// Item use, session Rae, fair training, WL beat (Pass 108).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('item.use.open', [
  {
    when: { endStageMin: [4] },
    weight: 1,
    text: [
      'You offer the {item.label} — {subject.name} accepts like the pantry was always meant to end here.',
    ],
  },
]);

registerModuleVariants('session.rae.arrival.s1', [
  {
    when: {},
    weight: 1,
    text: [
      'Rae corrects the count with a smile — extras are policy when appetite is the customer.',
    ],
  },
]);

registerModuleVariants('session.rae.exit.s4', [
  {
    when: {},
    weight: 1,
    text: [
      'She pauses at the door — more waiting in the car, unspoken, already paid for.',
    ],
  },
]);

registerModuleVariants('fair.boost.Brittany', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Brittany rides the boost — numbers climb and the crowd treats appetite like sport.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Darlene.s1.greeting', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      '"We drove over hungry," Darlene says — butter already on the counter before coats come off.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Kayla.progress_review', [
  {
    when: {},
    weight: 1,
    text: [
      'Kayla spreads charts — appetite metrics trend up and nobody in the room looks sorry.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.appetite', [
  {
    when: { hallAmbiancePeakMin: [40] },
    weight: 1,
    text: [
      'Wing hum rises — residents linger in doorways, plates in hand, schedules forgotten.',
    ],
  },
]);

registerModuleVariants('campus.find.wild_mint', [
  {
    when: {},
    weight: 1,
    text: [
      'Mint bruises sweet on your palm — a small theft the planter forgives.',
    ],
  },
]);
