// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// Extra talk topics: linger, notice room, midnight habit.
import { registerPool } from '../engine.js';
import './dorm/index.js';

registerPool('talk.linger.open', [
  { when: {}, text: [
    'You do not stand. The visit stretches past the official reason for it.',
    'She makes space on the bed without calling it that.',
    'The clock on her desk is ignored by both of you.',
  ] },
]);

registerPool('talk.linger.body', [
  { when: { stageMax: 3 }, text: [
    'Close up, the new softness is honest — a belly that stays when she laughs.',
    'Her sleep shirt rides when she sits back. She tugs it and does not succeed.',
  ] },
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'Her thigh is warm against the mattress edge. She does not pull it back.',
    'When she leans, her belly arrives first. She watches you notice and keeps leaning.',
  ] },
  { when: { stageMin: 8 }, text: [
    'Staying means being claimed by the heat of her. The bed has one climate and it is her.',
    'You sit where she indicates. The indication is a shift of immense, yielding weight.',
  ] },
  { when: {}, text: [
    'The extra minutes fill with warmth and the quiet decision not to leave yet.',
    'She tucks a foot under herself and stays. So do you.',
    'Conversation slows. Appetite does not.',
  ] },
]);

registerPool('talk.linger.line', [
  { when: { studentId: 6 }, weight: 4, text: [
    `"Chapter business can wait," Tiffany says, already pouring.`,
  ] },
  { when: { studentId: 9 }, weight: 4, text: [
    `"Americans rush," Chloé murmurs. "Sit. There is still cheese."`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"You don't have to go yet," {subject.name} says, then looks like she did not mean to say it.`,
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    `"Stay," {subject.name} says, hand on her middle. "I'm better when you're here."`,
  ] },
  { when: {}, text: [
    `"Don't go yet," {subject.name} says, and means the food and you both.`,
    `{subject.name} pats the mattress. "Sit. I'm not done talking."`,
    `"Stay for one more," {subject.name} says, and the 'one' is already lying.`,
  ] },
]);

registerPool('talk.linger', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.linger.open} {talk.linger.body}\n\n{talk.linger.line}',
    '{talk.moodOpener|suffix:\n\n}{talk.linger.line} {talk.linger.body}',
    '{talk.linger.open}\n\n{talk.linger.line} {talk.linger.body}',
  ] },
]);

registerPool('talk.notice_room.open', [
  { when: {}, text: [
    'You look at the room the way an RA is supposed to, then the way you actually do.',
    'The upgrades have a smell — new wood, warm lamps, food that lives here now.',
    'Her space has been arranged around appetite. You say so without the memo language.',
  ] },
]);

registerPool('talk.notice_room.line', [
  { when: {}, text: [
    `"You did this for me," {subject.name} says, not quite a question.`,
    `{subject.name} follows your gaze to the chair, the fridge, the light. "It's better," she admits.`,
    `"If housing asks, it was always like this," {subject.name} says.`,
  ] },
]);

registerPool('talk.notice_room.body', [
  { when: { stageMax: 4 }, text: [
    'She tests the chair like it might still be a trick. It holds. She melts a little.',
  ] },
  { when: { stageMin: 5, stageMax: 8 }, text: [
    'She sits and the new furniture accepts her without a sound. Her shoulders drop.',
  ] },
  { when: { stageMin: 9 }, text: [
    'The room was built outward to meet her. She looks like the reason it exists.',
  ] },
  { when: {}, text: [
    'The space fits her more than it used to. She notices. She likes noticing.',
    'She tests a chair with her full weight. It holds. She looks almost grateful.',
    'The room has learned her outline. She wears that knowledge easily.',
  ] },
]);

registerPool('talk.notice_room', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.notice_room.open} {talk.notice_room.body}\n\n{talk.notice_room.line}',
    '{talk.notice_room.open}\n\n{talk.notice_room.line} {talk.notice_room.body}',
    '{talk.notice_room.body} {talk.notice_room.line}',
  ] },
]);

registerPool('talk.midnight_habit.open', [
  { when: {}, text: [
    'You mention last night without making it a report. She knows which night.',
    'The after-hours version of her is still sitting in the room, even at noon.',
    'You knock on the memory instead of the door. She answers both.',
  ] },
]);

registerPool('talk.midnight_habit.line', [
  { when: { habitId: 'midnight_snack' }, weight: 3, text: [
    `"The drawer is a problem," {subject.name} says, and smiles like it is not.`,
    `"I was hungry. I am still hungry. That's the update," {subject.name} says.`,
  ] },
  { when: { habitId: 'scale_private' }, weight: 3, text: [
    `"The number went up," {subject.name} says. She does not sound sorry.`,
  ] },
  { when: { habitId: 'open_door' }, weight: 3, text: [
    `"I leave it unlatched now," {subject.name} says. "In case."`,
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    `"You weren't supposed to see that," {subject.name} says, then: "I'm glad you did."`,
  ] },
  { when: {}, text: [
    `{subject.name} looks at her hands. "You walk late. I eat late. That's the overlap."`,
    `"You saw me," {subject.name} says, not quite sorry.`,
    `{subject.name} shrugs, then smiles. "Midnight is when I'm honest."`,
  ] },
]);

registerPool('talk.midnight_habit', [
  { when: {}, text: [
    '{talk.moodOpener|suffix:\n\n}{talk.midnight_habit.open}\n\n{talk.midnight_habit.line} {talk.linger.body}',
    '{talk.midnight_habit.open} {talk.midnight_habit.line}',
    '{talk.midnight_habit.line}\n\n{talk.linger.body}',
  ] },
]);
