// The Squad — Lead: A6 Slender | Support: A1 Mobile, A5 Editor
// Floor check-in — leftover/night/mood skeleton. Unique FLOOR_SCENES fallback.
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. Lounge setup.
registerPool('floor.scene.setup', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Galley foil still on her fingers. She sits like the tray asked a follow-up.',
    'Last night\'s leftover heat in the lounge. She claims a cushion and does not hide the wanting.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen tray from earlier. She sits in it. The floor meeting starts anyway.',
    'Galley heat still under her shirt. Check-in pretends the couches are just couches.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. Daylight check-in uses the same open door.',
    'You saw her after hours. This hour is the public version of that appetite.',
  ] },
  { when: { mood: ['stressed'], stageMax: 4 }, weight: 2, text: [
    '{subject.name} slumps with an energy drink sweating on the table. The notebook stays closed.',
    'Stress in her shoulders. Appetite waiting underneath, pretending it is weather.',
  ] },
  { when: { mood: ['tired'] }, weight: 2, text: [
    '{subject.name} is already half-asleep on the couch. Chin dropping. Still here.',
    'She is technically present. The body is already bargaining for a tray.',
  ] },
  { when: { mood: ['nervous'] }, weight: 2, text: [
    '{subject.name} fidgets, phone up, phone down. Wound tight. Hungry under it.',
    'She sits near the front like being seen might help. A plate would help more.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 2, text: [
    '{subject.name} settles in — present, readable, still able to pretend the lounge is just a lounge.',
    'Ordinary check-in hour. Her shirt has a new opinion about the hour.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    '{subject.name} takes the wide cushion without asking. The couch already knew.',
    'The lounge learns her outline again. She enjoys the lesson.',
  ] },
  { when: {}, text: [
    '{subject.name} finds a seat. The floor hums. Appetite is already on the agenda.',
    'Check-in light, warm couches, someone always closer to a snack than they admit.',
    'The lounge fills. She exhales like the hour might feed her if she waits.',
  ] },
]);

// Shape: FULL SENTENCE. Growth-as-event.
registerPool('floor.scene.growth', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Last night\'s tray plus this hour. The cushion reports both.',
    'Galley leftover lands easier than the first plate. Middles do the rest.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'The knock taught her body to stay open. Check-in uses the same permission.',
  ] },
  { when: { stageMax: 4 }, weight: 2, text: [
    'Clothes still argue. The body is already answering. Shared bites do the convincing.',
    'She notices the give under a waistband and does not retie it tighter.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her settled is the rest of the meeting. She takes the minutes.',
    'Vastness finishes moving. Warmth does not. The couch keeps the heat.',
  ] },
  { when: {}, text: [
    'Growth happens in the seconds between topics. She finishes what the lounge put in front of her.',
    'The hour leaves her heavier than it found her. Nobody calls it a lesson.',
    'She keeps a hand on the new weight like a note she intends to keep.',
  ] },
]);

// Shape: DIALOGUE BEAT.
registerPool('floor.scene.line', [
  { when: { leftoverFed: true }, weight: 3, text: [
    '"The galley sent leftovers," she says, already sitting like that was an invitation.',
    'She eyes the side table. "If that box is for the floor, it is for me."',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    '"You were up late," you don\'t have to say. She already has a plate.',
  ] },
  { when: {}, text: [
    '"Thanks, RA," she says, already reaching.',
    'Someone changes the subject. Nobody changes the box on the table.',
    'She looks at you, then at the food. The looking is the rest of check-in.',
  ] },
]);

registerPool('floor.scene', [
  { when: {}, text: [
    '{floor.scene.setup} {floor.scene.growth} {floor.scene.line}',
    '{floor.scene.setup} {floor.scene.line} {floor.scene.growth}',
    '{floor.scene.growth} {floor.scene.setup} {floor.scene.line}',
  ] },
]);

// Shape: FULL SENTENCE. Choice aftermath wrap.
registerPool('floor.choice.wrap', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in her. The choice lands on warm dough.',
    'Last night\'s tray plus this plate. The lounge reports both.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round heat still in the middle. She eats like the door never closed.',
  ] },
  { when: { stageMax: 4, corruption: [0] }, weight: 2, text: [
    'She tugs cloth that almost still works and files the warmth as weather.',
  ] },
  { when: {}, text: [
    'The box on the side table does not last the hour.',
    'She sits a minute longer than the check-in required.',
    'You write nothing down. Her middle is the log.',
  ] },
]);
