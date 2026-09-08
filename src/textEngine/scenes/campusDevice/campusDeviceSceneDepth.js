// The Squad — Lead: A4 Architect | Support: A2 Psych
// Per-student depth on campus device encounter + result pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('campus.dev.vulnerability', [
  { when: { studentId: 0, targetType: 'student' }, weight: 4, text: [
    `stretching between drills, guard down, belly soft from post-practice snacks`,
  ]},
  { when: { studentId: 2, targetType: 'student' }, weight: 4, text: [
    `filming B-roll without checking behind her — profile content, unaware`,
  ]},
  { when: { studentId: 5, targetType: 'student' }, weight: 4, text: [
    `streaming from a bench, headset on, both hands on controller not food`,
  ]},
  { when: { studentId: 6, targetType: 'student' }, weight: 4, text: [
    `fixing rush banners, back turned, pastel straining across her middle`,
  ]},
  { when: { studentId: 8, targetType: 'student' }, weight: 4, text: [
    `sketching in plain sight, absorbed, appetite quiet until it isn't`,
  ]},
  { when: { studentId: 10, targetType: 'student' }, weight: 4, text: [
    `tasting something from the cafeteria line, eyes closed, defenseless`,
  ]},
  { when: { studentId: 12, targetType: 'student' }, weight: 4, text: [
    `observing foot traffic, notebook open, not watching for portable lab gear`,
  ]},
  { when: { studentId: 14, targetType: 'student' }, weight: 4, text: [
    `laughing with friends, third snack in hand, completely off guard`,
  ]},
  { when: { studentId: 15, targetType: 'student' }, weight: 4, text: [
    `moving through crowd like weather — distracted, reachable, hungry`,
  ]},
  { when: { studentId: 17, targetType: 'student' }, weight: 4, text: [
    `studying a campus map at a bad angle — gear belt, open target`,
  ]},
]);

registerModuleVariants('campus.dev.reaction', [
  { when: { studentId: 0, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `Brittany clutches her stomach and heads for the nearest protein bar like mission orders.`,
  ]},
  { when: { studentId: 2, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `Kylie's eyes go distant — hunger trending. She livestreams the scramble for food.`,
  ]},
  { when: { studentId: 5, deviceId: 'feeding_mask', modeId: 'capture' }, weight: 4, text: [
    `Destiny muffles a protest into another swallow. "Clip that," she thinks. Can't.`,
  ]},
  { when: { studentId: 8, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `Maya blinks, suddenly ravenous. She changes direction toward food without deciding.`,
  ]},
  { when: { studentId: 10, deviceId: 'feeding_mask' }, weight: 4, text: [
    `Reneé sags into the seal — resistance brief, fullness immediate, almost grateful.`,
  ]},
  { when: { studentId: 12, deviceId: 'feeding_mask', deviceDependenceTierMin: 2 }, weight: 4, text: [
    `Nadia leans into the tube before paste arrives. She will publish nothing about this.`,
  ]},
  { when: { studentId: 15, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `Lilith's gaze sharpens — hunger becoming hunt. She smiles at the wrong person.`,
  ]},
  { when: { studentId: 18, custom: false, deviceId: 'endless_hunger_engine' }, weight: 4, text: [
    `Talia scans for snacks with clinical urgency. "Expected outcome," she mutters.`,
  ]},
  { when: { discovered: true, studentId: 2 }, weight: 4, text: [
    `Someone films the deployment. Kylie will have opinions about the angle later.`,
  ]},
]);

registerModuleVariants('campus.deviceFlavor', [
  { when: { flavorDevice: 'auto_feeder_arm', campusTierMin: 2 }, weight: 3, text: [
    `A servo arm retracts behind a vending alcove — paste still warm on the tray.`,
  ]},
  { when: { flavorDevice: 'obedience_belt' }, weight: 3, text: [
    `A discarded belt buckle glints in the grass — shame hardware, recently worn.`,
  ]},
  { when: { flavorDevice: 'growth_serum_injector' }, weight: 3, text: [
    `Empty injector cartridges litter a lab bench — field kit was here recently.`,
  ]},
]);
