// The Squad — Lead: A5 Editor | Support: A6 Slender, A1 Mobile, A2 Psych
// Pass 2 afterglows for remaining scene families. New pools only —
// do not registerModuleVariants here; this file can load before the
// base pools and registerPool would wipe the extras.
import { registerPool, hasModule } from '../engine.js';

function oncePool(key, variants) {
  if (hasModule(key)) return;
  registerPool(key, variants);
}

oncePool('ge.afterglow', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'She tugs cloth that still mostly works and files the new weight as weather.',
    'The change is small enough to deny and too warm to forget.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'She rests a palm on the new of her and leaves it there.',
    'The room has to learn her outline again. It does.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Settling takes minutes. The body takes the minutes like rent.',
  ] },
  { when: {}, text: [
    'Heat fades. Softness stays. She breathes around it.',
    'She looks down, then at you, then back down. The looking is the rest of the scene.',
    'Whatever caused it already finished. She is the result walking around.',
  ] },
]);

oncePool('weekly.afterglow', [
  { when: { leftoverFed: true, stageMax: 4 }, weight: 3, text: [
    'Galley leftover still in her clothes. The incident is a second sitting the floor will retell.',
    'Last night\'s tray plus this week. She carries both in the waistband.',
  ] },
  { when: { leftoverFed: true }, weight: 3, text: [
    'Kitchen heat still answering. Sunday gossip will include the foil.',
    'The floor retells it rounder. The leftover already started the rounding.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'Night-round knock still in the wood. The incident uses the same open door.',
  ] },
  { when: {}, text: [
    'The floor will retell this by Sunday, softer and rounder in the telling.',
    'She carries the incident in her clothes. The clothes are already losing.',
    'You log nothing. The body is the minutes.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'People step aside later without naming why. She enjoys the aisle.',
  ] },
]);

oncePool('milestone.afterglow', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'She tries the old posture. The new softness refuses to go back in.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    'The ceremony is her standing there, bigger, waiting to be seen.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    'Crossing was the easy part. Occupying the new size is the rest of her life.',
  ] },
  { when: {}, text: [
    'She inhales and the inhale has more to lift. She lets it.',
    'A hand finds the new curve like checking a door she already unlocked.',
    'The week named itself on her. Nobody needs a certificate.',
  ] },
]);

oncePool('confront.afterglow', [
  { when: {}, text: [
    'She is still here. The anger has a body, and the body is hungry.',
    'The demand hangs. So does the softness she came in wearing.',
    'You can hear the fridge down the hall. She can too.',
  ] },
]);

oncePool('gossip.afterglow', [
  { when: {}, text: [
    'The hall files it under weather. Weather that eats.',
    'She looks away, then looks back. Looking is how gossip starts.',
    'Someone will repeat this with a plate in their hand.',
  ] },
]);

oncePool('hunt.afterglow', [
  { when: {}, text: [
    'Hunger walks the path with her. The path makes room.',
    'Campus keeps its lights. She keeps her appetite.',
    'The hunt is a stroll that ends in someone feeding her without calling it that.',
  ] },
]);

oncePool('origin.afterglow', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'The old story still fits in her mouth. The new softness is the revision.',
    'She says where she came from, then reaches for here.',
  ] },
  { when: {}, text: [
    'The old story still fits in her mouth. The new body is the revision.',
    'She names where she came from, then takes another bite of here.',
    'Origin is a caption. Tonight is the picture.',
    'A backstory shows in the way she holds the fork.',
  ] },
]);
