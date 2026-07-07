// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. Stage-11 waiting state without catalyst.
registerPool('asc.held.settled', [
  { when: { stageMin: 11 }, weight: 2, text: [
    '{subject.name} has reached the ceiling and made a home of it — vast, warm, complete.',
    'She rests at the top of the ladder like a shore at high tide: full, still, going nowhere.',
    'Immobility here is not distress. It is arrival without the next rung.',
    'The room knows her weight the way it knows winter — settled fact.',
  ]},
  { when: {}, text: [
    '{subject.name} waits at the threshold, enormous and unhurried.',
    'She is as big as the story gets, for now.',
    'Warm mass at rest; the ladder ends here until she says otherwise.',
    'Complete, plush, patient.',
  ]},
]);

// Shape: FULL SENTENCE. Optional appetite register.
registerPool('asc.held.hunger', [
  { when: { stageMin: 11, corruption: [2] }, weight: 2, text: [
    'Food still answers, but something deeper does not — appetite with no rung left to feed.',
    'She eats; the number holds. The wanting stays, patient as she is.',
  ]},
  { when: {}, text: [
    '',
    '',
    'Her hunger outlasts the scale now.',
    'Appetite persists after the ladder stops.',
  ]},
]);

// Shape: DIALOGUE BEAT. Catalyst-missing line.
registerPool('asc.held.catalyst', [
  { when: { relationship: [3], corruption: [2] }, weight: 2, text: [
    `{subject.name} looks at you. "Almost," she says. "There's one thing left to finish first."`,
    `"I'm ready," {subject.first} murmurs. "The story isn't, yet."`,
  ]},
  { when: {}, text: [
    `{subject.name} waits — not stuck, unfinished.`,
    `"Soon," {subject.first} says, and means it.`,
    `{subject.name} keeps her eyes on you. "Not yet. Close."`,
  ]},
]);

// Shape: SKELETON. Held-at-threshold beat.
registerPool('asc.held.scene', [
  { when: {}, text: [
    '{asc.held.settled} {asc.held.hunger|prefix: } {asc.held.catalyst|prefix: }',
    '{asc.held.hunger} {asc.held.settled} {asc.held.catalyst|prefix: }',
    '{asc.held.settled} {asc.held.catalyst|prefix: } {asc.held.hunger|prefix: }',
  ]},
]);
