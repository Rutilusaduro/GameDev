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
    ],
  },
]);

const DAY_SKELETON = '{fair.day.carnivalAir|prefix:} {fair.day.mjPride|prefix: }';

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
