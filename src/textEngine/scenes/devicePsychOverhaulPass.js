// The Squad — Lead: A4 Architect | Support: A2 Psych
import { registerModuleVariants } from '../engine.js';

const devices = [
  'feeding_mask', 'auto_feeder_arm', 'obedience_belt', 'auto_bloating_belt',
  'living_furniture_rig', 'growth_accelerator_chamber', 'growth_serum_injector',
  'endless_hunger_engine', 'reinforced_legs',
];

devices.forEach((id) => {
  registerModuleVariants(`device.psych.${id}`, [
    { when: { stageMin: 8, corruptionMin: 2 }, weight: 3, text: [
      'Hardware and appetite share a vocabulary now — she welcomes the cycle, proud and open.',
    ]},
    { when: { stageMax: 4, corruption: [0] }, weight: 3, text: [
      'Novelty stutters, then curiosity wins — she breathes around the sensation and stays.',
    ]},
    { when: { corruption: [1], stageMin: 5 }, weight: 2, text: [
      'Compliance settles into muscle memory; shame optional, warmth not.',
    ]},
  ]);
});

registerModuleVariants('device.catalog.reinforced_legs', [
  { when: { stageMin: 8 }, weight: 3, text: [
    'Braced supports bear furniture-weight loads — stability while soft mass keeps arriving.',
  ]},
  { when: {}, text: [
    'Stabilizers creak kindly under added mass; leverage where softness needs support.',
  ]},
]);
