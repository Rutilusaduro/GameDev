// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych
// Pass 4 linger slots for remaining families. New pools only.
import { registerPool, hasModule } from '../engine.js';

function oncePool(key, variants) {
  if (hasModule(key)) return;
  registerPool(key, variants);
}

oncePool('hunger.linger', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She tugs her shirt down on the way back like the hallway might have seen the wanting.',
    'The knock already happened. She still looks like she might apologize for being hungry.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'She leaves heavier than she arrived and does not hide the walk.',
    'The doorframe keeps a little of her warmth after she is gone.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her turned around is the rest of the visit. She takes the corridor at her own pace.',
    'The floorboards remember her. Hunger does too.',
  ] },
  { when: {}, text: [
    'She goes. Appetite stays in the doorway a beat longer.',
    'You close the door on warmth that has a name.',
    'The hall is quieter. Her stomach is not.',
  ] },
]);

oncePool('campus.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'She hurries a little, then forgets why, then buys something anyway.',
    'Quad wind finds the new tightness at her waist. She keeps walking.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Paths make room. She takes the slow lane like it was built for her.',
    'A bench remembers her outline after she stands. Campus keeps the heat.',
  ] },
  { when: {}, text: [
    'Campus keeps moving. She keeps eating like the path is a table.',
    'You lose her in a cluster of trays and find her again by the laugh.',
    'The walk back smells like whatever she just finished.',
    'She stops once more at a kiosk. The kiosk is ready for her.',
  ] },
]);

oncePool('device.linger', [
  { when: {}, text: [
    'The hardware goes quiet. She does not. Softness keeps the overtime.',
    'She rests a hand where the device worked and leaves it there.',
    'Morning will find more of her. The device already knows.',
  ] },
]);

oncePool('wi.linger', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She steps off like the number might change if she looks away fast enough.',
    'The scale is honest. She is still negotiating with the honesty.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Getting her off the platform is a ceremony. She enjoys the audience of one.',
    'The number sits in the room like furniture. She sits with it, pleased.',
  ] },
  { when: {}, text: [
    'She looks down, then at you. The looking is the rest of the weigh-in.',
    'Clothes rearrange themselves around the new fact. She lets them.',
    'The readout fades. The body does not.',
  ] },
]);

oncePool('gossip.linger', [
  { when: {}, text: [
    'Someone changes the subject. Nobody changes what they saw.',
    'The lounge keeps the story in glances. Glances are enough.',
    'By evening the rumor has hips.',
  ] },
]);

oncePool('confront.linger', [
  { when: {}, text: [
    'She is still standing in your way. The argument has a body now.',
    'The line she drew stays on the floor between you. So does the heat.',
    'She meant it. She also has not left.',
  ] },
]);

oncePool('session.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'She sits a minute longer than the meal required, surprised she wants to.',
  ] },
  { when: {}, text: [
    'The plates are done. She is not. She stays in the chair like it learned her name.',
    'You dim the lamp. Fullness keeps its own light.',
    'She breathes around the evening and does not ask to go yet.',
  ] },
]);

oncePool('intimacy.linger', [
  { when: {}, text: [
    'After, she is warmer and slower, a body that has been attended.',
    'The room keeps the shape of her against you for a while.',
    'She does not dress quickly. There is more of her to cover, and she knows it.',
  ] },
]);

oncePool('hive.afterglow', [
  { when: {}, text: [
    'The Nest hums. Someone is still eating in a room that used to be a closet.',
    'Maya does not check the clock. The Hive does not either.',
    'Lavender light, warm trays, members getting rounder on purpose.',
  ] },
]);

oncePool('pharmacist.linger', [
  { when: {}, text: [
    'Samples migrate. So do waistbands. Sophia files both as yield.',
    'The union table is empty by noon. The effects are not.',
    'She calls it wellness. The floor calls it seconds.',
    'Foil from the galley still scents the beaker. She recaps it anyway.',
    'She logs the batch as chemistry. The hall will log it as appetite.',
  ] },
]);

oncePool('stream.linger', [
  { when: {}, text: [
    'Chat keeps scrolling. She keeps a hand on the new weight like a subscriber perk.',
    'The overlay goes dark. Her belly does not. She sits in the leftover glow.',
    'She thanks chat and does not stand up yet. Standing can wait.',
  ] },
]);

oncePool('faculty.afterglow', [
  { when: {}, text: [
    'Staff lounge pastry plate, emptied again. You feel like a craftsman.',
    'She goes back to her notes. The notes have crumbs on them now.',
    'Housing will not write this meeting down. The appetite will.',
  ] },
]);

oncePool('floor.linger', [
  { when: {}, text: [
    'Check-in ends. The couches keep the heat of whoever just ate.',
    'Someone leaves a box on a side table. The box does not last the hour.',
    'The floor learns the incident by dinner. Dinner is the incident.',
  ] },
]);
