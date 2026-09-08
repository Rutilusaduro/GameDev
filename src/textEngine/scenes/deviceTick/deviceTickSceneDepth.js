// The Squad — Lead: A4 Architect | Support: A2 Psych
// Per-student + stage depth on device weekly tick fragment pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('device.tick.action', [
  { when: { studentId: 2, deviceId: 'auto_feeder_arm' }, weight: 4, text: [
    `the {device.label} feeds Kylie on camera — portions timed for the clip`,
  ]},
  { when: { studentId: 5, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `the {device.label} keeps Destiny hungry between streams — debuff permanent, belly honest`,
  ]},
  { when: { studentId: 8, deviceId: 'sleep_feeding_system' }, weight: 4, text: [
    `the {device.label} feeds Maya while she sleeps — trust absolute, calories quiet`,
  ]},
  { when: { studentId: 10, deviceId: 'auto_feeder_arm' }, weight: 4, text: [
    `the {device.label} serves Reneé another course — mechanical patience, culinary devotion`,
  ]},
  { when: { studentId: 14, deviceId: 'living_furniture_rig' }, weight: 4, text: [
    `the {device.label} keeps Mary Jane upholstered — furniture fed like family`,
  ]},
  { when: { studentId: 15, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `the {device.label} sharpens Lilith's hollow — predator appetite never quite full`,
  ]},
  { when: { studentId: 18, custom: false, deviceId: 'growth_accelerator_chamber' }, weight: 4, text: [
    `the {device.label} runs another field session on Talia — data and deposition in parallel`,
  ]},
  { when: { studentId: 7, deviceId: 'weight_redistribution_rig' }, weight: 4, text: [
    `the {device.label} remaps Priya's curves — spreadsheets meet flesh`,
  ]},
  { when: { stageMin: 9, deviceId: 'living_furniture_rig' }, weight: 3, text: [
    `the {device.label} maintains {subject.name} at furniture scale — vast, fed, room-filling`,
  ]},
]);

registerModuleVariants('device.tick.dependence', [
  { when: { studentId: 0, deviceId: 'feeding_mask', deviceDependenceTierMin: 2 }, weight: 4, text: [
    `Brittany swallows on cue — captain discipline turned hungry compliance.`,
  ]},
  { when: { studentId: 2, deviceId: 'feeding_mask', deviceDependenceTierMin: 1 }, weight: 4, text: [
    `Kylie stops fighting the seal mid-cycle. "Content," she mutters around the tube.`,
  ]},
  { when: { studentId: 5, deviceId: 'auto_feeder_arm' }, weight: 4, text: [
    `Destiny treats the arm like a patch — HP incoming, shame optional.`,
  ]},
  { when: { studentId: 6, deviceId: 'obedience_belt', deviceDependenceTierMin: 1 }, weight: 4, text: [
    `Tiffany straightens when the belt hums — chapter standards, internalized.`,
  ]},
  { when: { studentId: 7, deviceId: 'auto_bloating_belt' }, weight: 4, text: [
    `Priya breathes into the pressure, tracking circumference in her head.`,
  ]},
  { when: { studentId: 8, deviceId: 'feeding_mask', deviceDependenceTierMin: 2 }, weight: 4, text: [
    `Maya yields quietly — throat working, eyes closed, trust absolute.`,
  ]},
  { when: { studentId: 12, deviceId: 'feeding_mask' }, weight: 4, text: [
    `Nadia notes her own eagerness clinically. The data disturbs and thrills her.`,
  ]},
  { when: { studentId: 15, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `Lilith welcomes the hollow — predator appetite sharpening, never sated.`,
  ]},
  { when: { stageMin: 8, deviceDependenceTierMin: 3 }, weight: 3, text: [
    `{subject.first} leans into the cycle before it starts — want ahead of machine.`,
  ]},
]);

registerModuleVariants('device.tick.sensation', [
  { when: { studentId: 0, deviceId: 'auto_feeder_arm' }, weight: 4, text: [
    `fullness stacks like team points — belly high, pride higher`,
  ]},
  { when: { studentId: 2, deviceId: 'growth_accelerator_chamber' }, weight: 4, text: [
    `radiation swells her on camera — curves arriving for the thumbnail`,
  ]},
  { when: { studentId: 5, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `hunger becomes background process — stream fuel, shame deleted`,
  ]},
  { when: { studentId: 10, deviceId: 'growth_serum_injector' }, weight: 4, text: [
    `serum heat spreads like a perfect reduction — flavor becoming form`,
  ]},
  { when: { studentId: 14, deviceId: 'auto_feeder_arm' }, weight: 4, text: [
    `portions land like Sunday dinner — belly warm, gratitude immediate`,
  ]},
  { when: { studentId: 18, custom: false, deviceId: 'growth_accelerator_chamber' }, weight: 4, text: [
    `Talia logs the sensation while it happens — heat, swell, hypothesis confirmed`,
  ]},
  { when: { stageMin: 9, deviceId: 'living_furniture_rig' }, weight: 3, text: [
    `vast cushioned flesh yields deeper — furniture form growing roomier by the week`,
  ]},
]);

registerModuleVariants('device.tick.growth', [
  { when: { studentId: 8, gainLbsMin: 3 }, weight: 4, text: [
    `quiet inches settle on Maya — softness she does not announce but does not hide`,
  ]},
  { when: { studentId: 9, gainLbsMin: 2 }, weight: 4, text: [
    `Chloé's curves deepen with continental patience — appetite made visible`,
  ]},
  { when: { studentId: 15, gainLbsMin: 4 }, weight: 4, text: [
    `Lilith swells like weather — mass arriving in predatory, pleased increments`,
  ]},
  { when: { stageMin: 7, gainLbsMin: 5 }, weight: 3, text: [
    `{subject.name} carries the week's swell in stride, seams, and doorway negotiations`,
  ]},
]);

registerModuleVariants('device.tick.malfClause', [
  { when: { studentId: 18, custom: false, isMalfunction: true }, weight: 4, text: [
    `Talia curses the overrun, then watches the excess gain with guilty fascination`,
  ]},
  { when: { studentId: 5, isMalfunction: true }, weight: 4, text: [
    `"Patch failed," Destiny says. "RNG cruel. Belly honest."`,
  ]},
  { when: { stageMin: 6, isMalfunction: true }, weight: 3, text: [
    `the rig stutters past safe output — gain arriving harder than scheduled`,
  ]},
]);
