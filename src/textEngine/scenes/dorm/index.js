// The Squad — Lead: A6 Slender | Support: A1 Mobile, A2 Psych, A5 Editor
// SCENE: DORM BLUEPRINT — night rounds + room-fit afterbeats.
import { registerPool, registerDimension } from '../../engine.js';

registerDimension('nightKind', (ctx) => ctx.globals?.nightKind ?? 'checkin');
registerDimension('habitId', (ctx) => ctx.globals?.habitId ?? '');
registerDimension('dormRoom', (ctx) => ctx.globals?.dormRoom ?? 'lounge');
registerDimension('floorIntimacy', (ctx) => ctx.globals?.floorIntimacy ?? 0);

// Shape: FULL SENTENCE. Door / hall approach.
registerPool('night.knock', [
  { when: {}, text: [
    'The hall is dim. Your master key is a quiet weight in your pocket.',
    'After hours, the carpet swallows footsteps. Her door is the one that still has a light under it.',
    'You knock once, then again, the RA cadence residents learn to answer.',
  ] },
]);

// Shape: FULL SENTENCE. What the room is doing at this size.
registerPool('night.room', [
  { when: { stageMax: 2 }, text: [
    'The room still looks like move-in — except the snack shelf is winning.',
    'A desk lamp, a narrow bed, wrappers she meant to throw out.',
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    'The chair has learned her shape. The mini-fridge hums like a secret.',
    'Clothes on the chair back look tighter than they did in September.',
  ] },
  { when: { stageMin: 6, stageMax: 8 }, text: [
    'Furniture has given her a lane from bed to fridge. The floor announces her when she turns.',
    'The doorway frames mostly belly as she answers. She does not apologize for it.',
  ] },
  { when: { stageMin: 9 }, text: [
    'The room is a nest now — blankets, reachable food, a body that is the furniture.',
    'You stop in the threshold. She fills the bed the way a tide fills a cove.',
  ] },
  { when: {}, text: [
    'Her room holds the week: warmth, crumbs, the particular gravity of her.',
    'Lamp light, a half-eaten something, the air already warmer than the hall.',
    'You smell sugar and sleep. The room has been eating without you.',
  ] },
]);

// Shape: FULL SENTENCE. Kind-keyed opening.
registerPool('night.kindBeat', [
  { when: { nightKind: 'craving' }, weight: 4, text: [
    'She is already eating. The look she gives you is relief, not surprise.',
    'Hunger made a mess of the night. She lets you see it.',
  ] },
  { when: { nightKind: 'stuffed' }, weight: 4, text: [
    'She is parked on the bed, belly round and warm, breathing like the meal is still happening.',
    'A plate sits empty. She sits very full. Neither of you pretends otherwise.',
  ] },
  { when: { nightKind: 'raid' }, weight: 4, text: [
    'The snack drawer is open. Her hand is in it. She does not close it.',
    'She was not going to mention the midnight stash. You arrived too quietly.',
  ] },
  { when: { nightKind: 'scale' }, weight: 4, text: [
    'The alcove curtain is half drawn. She was weighing herself for an audience of one.',
    'The number is still on her face. She lets you in anyway.',
  ] },
  { when: { nightKind: 'invite' }, weight: 4, text: [
    'She has a plate waiting like she knew the knock. "Took you long enough," she says.',
    'The door opens before you finish the second knock. She wanted this visit.',
  ] },
  { when: { nightKind: 'settled' }, weight: 4, text: [
    'She does not get up. She does not need to. The bed has become the room.',
    'You come to her. The arrangement fits, and it suits her.',
  ] },
  { when: { nightKind: 'secret' }, weight: 4, text: [
    'She startles, then laughs too fast. There is frosting on her thumb.',
    'Caught. She looks at you like you might still pretend you saw nothing.',
  ] },
  { when: { nightKind: 'checkin' }, weight: 2, text: [
    'She is awake, half-dressed for sleep, willing to talk if you stay.',
    'A check-in that became a visit the moment she opened the door.',
  ] },
  { when: {}, text: [
    '{subject.name} opens the door enough to let the hall in, then you.',
    'The latch clicks. She was not quite asleep.',
    'She fills the gap in the door and looks at you like she expected the knock.',
  ] },
]);

// Shape: DIALOGUE BEAT. Her line.
registerPool('night.line', [
  { when: { studentId: 0 }, weight: 4, text: [
    `"Don't tell squad," Brittany whispers, already chewing.`,
    `"You're late," Brittany says, captain-voice gone soft.`,
  ] },
  { when: { studentId: 1 }, weight: 4, text: [
    `"This is off the log," Cassidy says, and does not hide the plate.`,
    `Cassidy nods you in like a teammate who brought fuel.`,
  ] },
  { when: { studentId: 2 }, weight: 4, text: [
    `"Camera's off," Kylie says. "Finally."`,
    `Kylie grins, guilty and pleased. "You saw nothing."`,
  ] },
  { when: { studentId: 3 }, weight: 4, text: [
    `"Recovery snack," Serena says, which is not what this is.`,
    `Serena shrugs one heavy shoulder. "You walk late."`,
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    `"Queue popped. I got hungry. Cause and effect," Destiny says.`,
    `Destiny does not pause the game. She pauses the lying.`,
  ] },
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya's voice is small. "I hoped it was you."`,
    `Maya steps aside. The quiet in here is full of crumbs.`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"I wasn't going to eat this much," {subject.name} says, already eating this much.`,
    `"Don't make it a thing," {subject.name} mutters, coloring.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `"You always come when I'm like this," {subject.name} says, fond.`,
    `"Stay," {subject.name} says. Not a question.`,
  ] },
  { when: {}, text: [
    `"Hey, {ra.name}," {subject.name} says, softer than daytime.`,
    `{subject.name} lets the door swing. "You walk late."`,
    `"Come in," {subject.name} says, already stepping back.`,
  ] },
]);

// Shape: FULL SENTENCE. Body beat keyed on stage.
registerPool('night.body', [
  { when: { stageMax: 3 }, text: [
    'She is still easy in the doorway, a softness starting under the sleep shirt.',
    'The sleep shirt shows a belly she keeps touching like it might recede. It will not.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'The sleep shirt has given up the argument across her middle. Warmth radiates off her.',
    'She fills the door more than last month. The hall light catches the sway when she shifts.',
  ] },
  { when: { stageMin: 8 }, text: [
    'She is a landscape in lamplight — belly first, thighs claiming the mattress, heat like a stove.',
    'When she turns, everything keeps moving after she stops. The room waits on that physics.',
  ] },
  { when: {}, text: [
    'She is warm and close and unmistakably hers in this light.',
    'Sleep clothes cling where daytime clothes would have argued.',
    'You feel the heat of her before you fully step in.',
  ] },
]);

registerPool('night.afterglow', [
  { when: { nightKind: 'craving' }, weight: 3, text: [
    'She swallows. The night has a plan now, and it includes you.',
    'Hunger made the visit simple. She lets you see the simple part.',
  ] },
  { when: { nightKind: 'secret' }, weight: 3, text: [
    'The wrappers stay. So does the understanding.',
    'She does not hide the evidence. Hiding was the old arrangement.',
  ] },
  { when: { stageMax: 3 }, text: [
    'She looks smaller in the lamp than she will look in daylight. The sleep shirt disagrees.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'The bed takes her back with a slow roll of hip and belly. You do not rush the door.',
  ] },
  { when: {}, text: [
    'You leave the light how she likes it. The hall is colder than her room on purpose.',
    'The knock is over. The visit keeps happening in her for a while.',
    'Master key back in the pocket. Her door clicks. The floor stays awake in the quiet way.',
  ] },
]);

// Shape: skeleton
registerPool('night.round', [
  { when: {}, text: [
    '{night.knock} {night.room}\n\n{night.kindBeat} {night.line} {night.body}\n\n{night.afterglow}',
    '{night.knock}\n\n{night.kindBeat} {night.line}\n\n{night.room} {night.body}\n\n{night.afterglow}',
    '{night.room} {night.knock}\n\n{night.line} {night.kindBeat} {night.body}\n\n{night.afterglow}',
  ] },
]);

// Shape: FULL SENTENCE. Fit-out afterglow for talk/visit.
registerPool('talk.roomFitCoda', [
  { when: {}, text: [
    'The room keeps a little of the visit after you leave.',
    'Lamp heat and crumbs hold the conversation in place.',
    'You leave her space slightly more hers than it was when you knocked.',
  ] },
  { when: { habitId: 'midnight_snack' }, weight: 3, text: [
    'You both glance at the drawer. It will be empty again by morning.',
    'The stash is a known quantity now. She stops hiding the wrappers from you.',
  ] },
  { when: { habitId: 'scale_private' }, weight: 3, text: [
    'The alcove curtain stays half open. The number is allowed to exist between you.',
  ] },
  { when: { habitId: 'open_door' }, weight: 3, text: [
    'She leaves the door unlatched when you go. An invitation with no speech attached.',
  ] },
]);

// Shape: FULL SENTENCE. Upgrade install flavor — short, room-agnostic.
registerPool('dorm.upgrade.install', [
  { when: { dormRoom: 'kitchen' }, text: [
    'The galley ticks warmer. Someone will smell this from the stairwell.',
    'A delivery crate lands. The kitchen pretends it was always this generous.',
  ] },
  { when: { dormRoom: 'lounge' }, text: [
    'The lounge settles around the new comfort like it had been waiting.',
    'A chair arrives that does not complain. Residents notice with their bodies first.',
  ] },
  { when: { dormRoom: 'ra_desk' }, text: [
    'Your desk gets quieter and more dangerous. Time appears where paperwork used to live.',
  ] },
  { when: { dormRoom: 'dining' }, text: [
    'The nook table looks ready for a meal that will not stay a meal.',
  ] },
  { when: { dormRoom: 'annex' }, text: [
    'The annex closes out the hall. Privacy has a temperature now.',
  ] },
  { when: { dormRoom: 'terrace' }, text: [
    'Upstairs air feels like a secret the building is proud of.',
  ] },
  { when: {}, text: [
    'The floor plan takes the work order and becomes slightly more itself.',
    'A crate, a receipt, a room that will smell different by morning.',
    'Housing will never quite understand what they signed for.',
  ] },
]);
