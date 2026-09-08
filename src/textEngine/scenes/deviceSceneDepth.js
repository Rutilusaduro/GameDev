// The Squad — Lead: A4 Architect | Support: A2 Psych
// Stage/corruption/student depth on device catalog + psych pools.
import { registerModuleVariants } from '../engine.js';

const DEVICES = [
  'feeding_mask', 'auto_feeder_arm', 'obedience_belt', 'auto_bloating_belt',
  'living_furniture_rig', 'reinforced_legs', 'growth_accelerator_chamber',
  'growth_serum_injector', 'endless_hunger_engine',
];

for (const deviceId of DEVICES) {
  registerModuleVariants(`device.catalog.${deviceId}`, [
    { when: { stageMin: 8 }, weight: 3, text: [
      `At {subject.lbs} lbs the {device.label} works at scale — mass answering without resistance.`,
    ]},
    { when: { corruption: [2], stageMin: 5 }, weight: 3, text: [
      `{subject.name} settles into the {device.label} like it was built for appetite this honest.`,
    ]},
  ]);
}

registerModuleVariants('device.catalog.feeding_mask', [
  { when: { studentId: 0 }, weight: 4, text: [
    `Harness locks; pump delivers — Brittany receives quota like a training drill.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Mask seals gentle, firm — Maya yields throat and trust to the cycle.`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia observes the mask clinically. Her pulse disagrees with the report.`,
  ]},
]);

registerModuleVariants('device.catalog.endless_hunger_engine', [
  { when: { studentId: 5 }, weight: 4, text: [
    `Ray strips satiety — Destiny's stream hunger becomes biological fact.`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Engine hum rewrites appetite — Lilith's hunger sharpens, never apologizes.`,
  ]},
]);

registerModuleVariants('device.catalog.growth_accelerator_chamber', [
  { when: { studentId: 10 }, weight: 4, text: [
    `Chamber warmth accelerates deposition — Reneé grows like a dish finishing in the oven.`,
  ]},
  { when: { studentId: 18, custom: false }, weight: 4, text: [
    `Sealed session, radiation field — Talia watches soft flesh answer faster than ethics allow.`,
  ]},
]);

registerModuleVariants('device.psych.feeding_mask', [
  { when: { studentId: 2, corruption: [1, 2] }, weight: 4, text: [
    `Kylie stops counting bites on camera. The mask counts. She likes that.`,
  ]},
  { when: { studentId: 6, corruption: [2] }, weight: 4, text: [
    `Tiffany breathes around the seal — obedience and appetite, chapter-certified.`,
  ]},
  { when: { studentId: 11, deviceDependenceTierMin: 2 }, weight: 4, text: [
    `Kaylee swallows automatically — relief arriving before shame can schedule itself.`,
  ]},
]);

registerModuleVariants('device.psych.obedience_belt', [
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya maps belt cues to intake windows — compliance as optimized routine.`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Shame and sugar braid in Tiffany's middle — the belt knows her schedule.`,
  ]},
]);

registerModuleVariants('device.psych.growth_accelerator_chamber', [
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona watches herself arrive in the chamber glass — artist becoming medium.`,
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: 4, text: [
    `Growth surge thrills Lilith more than it frightens — predator sizing up.`,
  ]},
]);

registerModuleVariants('device.psych.endless_hunger_engine', [
  { when: { studentId: 0, addictionLevelMin: 2 }, weight: 4, text: [
    `Brittany's hunger becomes team policy — feed the captain, win the week.`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane's appetite turns biblical — hollow vast, feeding sacred.`,
  ]},
  { when: { corruption: [2], stageMin: 6 }, weight: 3, text: [
    `Hunger friction becomes obsession — {subject.name} feeds like relief, not choice.`,
  ]},
]);
