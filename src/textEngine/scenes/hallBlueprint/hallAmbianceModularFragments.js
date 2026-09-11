// Hall Ambiance — late-game composed pulse + summary overlays (retire pass one-liners).
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('hall.ambiance.modularFrame', [
  {
    when: {},
    weight: 2,
    text: [
      'Hall Ambiance climbs another notch — habit thickens where policy used to thin out.',
      'The wing exhales warmth; every doorway feels like an invitation to linger.',
      'Late-semester floors learn appetite as architecture — sofas, stoves, and second helpings.',
      'Residents drift without naming why; the building hums like it expects fuller bodies.',
      'Wellness framing stays on clipboards while the hall smells like yes.',
    ],
  },
]);

const PULSE_LATE = '{hall.ambiance.modularFrame|prefix:} {hall.blueprint.permission|prefix: }';

const PULSE_KEYS = [
  'hall.ambiance.pulse.comfort',
  'hall.ambiance.pulse.appetite',
  'hall.ambiance.pulse.logistics',
  'hall.ambiance.pulse.socialHeat',
  'hall.ambiance.pulse.intimacy',
  'hall.ambiance.pulse.prestige',
];

for (const key of PULSE_KEYS) {
  registerModuleVariants(key, [
    {
      when: { weekMin: 20 },
      weight: 6,
      priority: 5,
      text: [PULSE_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 3,
      text: [PULSE_LATE],
    },
  ]);
}

registerModuleVariants('hall.ambiance.pulse.appetite', [
  {
    when: { hallAmbiancePeakMin: [40], weekMin: 10 },
    weight: 3,
    priority: 4,
    text: [
      'Wing hum rises — residents linger in doorways, plates in hand, schedules forgotten.',
      PULSE_LATE,
    ],
  },
  {
    when: { hallAmbiancePeakMin: [50] },
    weight: 1,
    text: [
      'The wing hums at peak ambiance — residents move slower, fuller, happier.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.prestige', [
  {
    when: { ambianceTier: ['high', 'max'] },
    weight: 1,
    text: [
      'Atrium prestige ripples down the wing — residents stand taller in doorways, plates fuller, pride softer.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.summary', [
  {
    when: { weekMin: 20 },
    weight: 6,
    priority: 5,
    text: ['{hall.ambiance.modularFrame|prefix:} {hall.blueprint.construction|prefix: }'],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 3,
    text: ['{hall.ambiance.modularFrame|prefix:} {hall.blueprint.construction|prefix: }'],
  },
]);
