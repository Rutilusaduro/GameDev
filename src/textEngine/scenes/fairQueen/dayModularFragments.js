// State Fair Queen — composable fair day + boost slots.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('fair.day.carnivalAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Cotton candy and fryer oil hang in the air — the fair owns the whole weekend.',
      'Crowd noise swells; every glance measures appetite like a ribbon category.',
      'Stage lights and funnel-cake steam make the weigh-in line feel ceremonial.',
      'Hay-scent and diesel braid with fried sugar until the midway feels like a second dorm.',
      'Ribbon categories blur together; everyone pretends the scale is the main attraction.',
    ],
  },
]);

registerPool('fair.day.crowdBeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Phones rise in unison when Mary Jane steps toward the platform — hunger as spectacle.',
      'The announcer leans into the microphone like weight gain is county entertainment.',
      'Strangers cheer for softness; the hall trained them to call it wellness.',
      'Laughter ripples when her belt sighs; she smiles like the joke is affectionate.',
    ],
  },
]);

registerPool('fair.day.mjPride', [
  {
    when: {},
    weight: 2,
    text: [
      'Mary Jane stands taller in the bustle — belly soft, smile deliberate, crown optional.',
      'She reads the crowd the way she reads ovens: who is hungry, who is ready.',
      'Pride sits on her hips; she wears it like a sash that keeps getting wider.',
      'She squeezes your hand once — coach, partner, co-conspirator — before the number lands.',
      'Every pound on display feels like policy she chose on purpose.',
    ],
  },
]);

const DAY_SKELETON = '{fair.day.carnivalAir|prefix:} {fair.day.crowdBeat|prefix: } {fair.day.mjPride|prefix: }';

const DAY_POOLS = [
  'fair.day.weighIn.open',
  'fair.day.weighIn.choice1',
  'fair.day.weighIn.choice2',
  'fair.day.weighIn.endingA',
  'fair.day.weighIn.endingB',
  'fair.day.judging',
  'fair.day.afterparty.open',
  'fair.day.afterparty.choice1',
  'fair.day.afterparty.choice2',
  'fair.day.afterparty.ending',
];

for (const key of DAY_POOLS) {
  registerModuleVariants(key, [
    {
      when: { weekMin: 20 },
      weight: 6,
      priority: 5,
      text: [DAY_SKELETON],
    },
    {
      when: { weekMin: 16 },
      weight: 4,
      priority: 3,
      text: [DAY_SKELETON],
    },
    {
      when: { weekMin: 7 },
      weight: 3,
      priority: 2,
      text: [DAY_SKELETON],
    },
  ]);
}

for (const c of ['Brittany', 'Kylie', 'Serena', 'Renee', 'Daisy', 'Lilith']) {
  registerModuleVariants(`fair.boost.${c}`, [
    {
      when: { weekMin: [8] },
      weight: 2,
      priority: 2,
      text: ['{fair.day.carnivalAir|prefix:} {fair.day.mjPride|prefix: }'],
    },
  ]);
}
