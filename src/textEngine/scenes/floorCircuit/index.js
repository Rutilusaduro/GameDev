// The Squad — Lead: A1 Mobile | Support: A2 Psych, A6 Slender, A5 Editor
// AFTER-HOURS ROUNDS — modular beats per floor room.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

// Shape: FULL SENTENCE. Night corridor as you start the round.
registerPool('circuit.open', [
  { when: {}, text: [
    'Lights-out on the floor. Your keys are warm. The hall still smells like whatever finished cooking.',
    'The corridor has gone quiet enough to hear a mini-fridge somewhere, working too hard.',
    'Night shift. The carpet knows your route before you take it.',
  ]},
  { when: { stageMax: 3 }, text: [
    'Early in the semester the hall still sounds like people trying to be quiet. Doors click. Someone laughs into a pillow.',
  ]},
  { when: { stageMin: 6 }, text: [
    'The hall carpet remembers heavier traffic. A doorframe holds the ghost of a hip that did not quite fit the first try.',
  ]},
]);

// Shape: FULL SENTENCE. Kitchen / pantry stop.
registerPool('circuit.kitchen', [
  { when: {}, text: [
    'The kitchen light is the only honest one left on. A tray waits under a towel, still giving off heat.',
    'Someone has already been here. The spoon in the saucepan is warm. The saucepan is not empty.',
    'Leftovers on the counter. She finds them before she finds you.',
  ]},
  { when: { stageMin: 4, stageMax: 7 }, text: [
    'The counter has been cleared to make room for a belly that likes to rest while she finishes what you left.',
  ]},
  { when: { stageMin: 8 }, text: [
    'She takes the stool because standing at the counter has become a negotiation. The food comes to her. That was always the idea.',
  ]},
]);

// Shape: FULL SENTENCE. Lounge stop.
registerPool('circuit.lounge', [
  { when: {}, text: [
    'The lounge chairs have learned her shape. She sits and the cushions keep the appointment.',
    'Warm lamps, a mug going cold, a body that has decided not to get up yet.',
    'The common room after hours is just a nest with better lighting.',
  ]},
  { when: { corruption: [0], stageMax: 4 }, text: [
    'She pretends she only sat down to check her phone. The snack bowl is closer than the phone.',
  ]},
  { when: { corruption: [2], stageMin: 5 }, text: [
    'She looks at you over the rim of the chair like this was always her room. The chair agrees.',
  ]},
]);

// Shape: FULL SENTENCE. RA desk stop.
registerPool('circuit.desk', [
  { when: {}, text: [
    'You straighten the log. Housing likes tidy logs. Housing does not ask what the extra hours were for.',
    'A wellness flyer has curled at the corner. You file it under the stapler. The stapler does not mind.',
    'The desk lamp makes the paperwork look innocent. You let it.',
  ]},
]);

// Shape: FULL SENTENCE. Dining nook.
registerPool('circuit.dining', [
  { when: {}, text: [
    'The dining nook still has a plate with manners. She does not. She finishes it standing, then sitting, then smiling.',
    'One last course left out like an accident. It was not an accident.',
    'She licks a finger and looks at you like dessert was the point of the furniture.',
  ]},
  { when: { stageMin: 5 }, text: [
    'The chair at the nook is the wide one now. She notices. She does not comment. She eats.',
  ]},
]);

// Shape: FULL SENTENCE. Psych alcove.
registerPool('circuit.psych', [
  { when: {}, text: [
    'The alcove is for watching how she eats when she thinks watching is care. Tonight she lets you.',
    'She catches the look and keeps chewing. Data, she would call it if she were meaner.',
    'You note how readily she says yes after midnight. She notes that you note it.',
  ]},
  { when: { corruption: [0] }, text: [
    'She catches you looking at the way her waistband sits and looks back at the food instead.',
  ]},
]);

// Shape: FULL SENTENCE. Corridor / quiet hours.
registerPool('circuit.corridor', [
  { when: {}, text: [
    'Quiet hours. Hunger still walks the carpet in socks. You meet it halfway with a wrapped something.',
    'The hall is a throat. Something hungry moves through it.',
    'A door clicks. A fridge. A sigh that is not sleep.',
  ]},
]);

// Shape: FULL SENTENCE. Laundry.
registerPool('circuit.laundry', [
  { when: {}, text: [
    'Warm air, oversized cotton, the soft slap of a dryer that has learned bigger loads.',
    'She folds a shirt that used to be loose. She holds it up, snorts once, and keeps it anyway.',
    'The machines take a bigger load now. So does she.',
  ]},
]);

// Shape: FULL SENTENCE. Storage / device bay.
registerPool('circuit.storage', [
  { when: {}, text: [
    'The supply cage yields. A hum behind the mesh keeps its own hours.',
    'You take a spare from the shelf. The shelf is generous.',
    'Hardware ticks in the dark like digestion.',
  ]},
]);

// Shape: FULL SENTENCE. Media nook.
registerPool('circuit.media', [
  { when: {}, text: [
    'The ring light makes her look fed even before she sits. She sits. The look improves.',
    'Couch, camera, a belly that knows its good side.',
    'She checks the thumbnail in the dark and snorts. "Yeah. That tracks."',
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    'Kylie angles her chin at the nook lighting like the floor owes her a thumbnail.',
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny tests the couch with her full weight and nods at the frame rate of comfort.',
  ]},
]);

// Shape: FULL SENTENCE. Echo gallery.
registerPool('circuit.echo', [
  { when: {}, text: [
    'The gallery keeps last week\'s number. She passes it and her hand finds her middle without asking her.',
    'Bells along the wall hum once, then settle into her appetite.',
    'A captured weigh-in stares back. She does not look away.',
  ]},
]);

// Shape: FULL SENTENCE. Dream chamber.
registerPool('circuit.dream', [
  { when: {}, text: [
    'The dream room smells like butter and sleep. Hunger walks here with its shoes off.',
    'She is already swallowing in her sleep. You do not wake her. You leave something anyway.',
    'Soft light. Impossible portions on the inside of her eyelids.',
  ]},
]);

// Shape: FULL SENTENCE. Social nook.
registerPool('circuit.social', [
  { when: {}, text: [
    'Two residents, one leftover box, the kind of talk that ends with both of them fuller than they planned.',
    'Rapport pools in the nook like spilled sauce. Nobody wipes it up.',
    'They were going to split it. They did not split it.',
  ]},
]);

// Shape: FULL SENTENCE. Suite / prestige.
registerPool('circuit.suite', [
  { when: {}, text: [
    'Your door stays unlocked. Tomorrow\'s private session will find more room in her and more time on the clock.',
    'The suite smells like last night\'s dessert and tomorrow\'s excuse.',
    'You leave the lamp on. She will find it. She always does.',
  ]},
]);

// Shape: FULL SENTENCE. Resident wing knock.
registerPool('circuit.resident', [
  { when: {}, text: [
    'You knock once. She is still awake. The fridge light in her room paints a slice of belly you are not supposed to notice. You notice.',
    'A door opens a body-width. Invitation enough.',
    'She was in bed. She was also eating. Both can be true.',
  ]},
  { when: { stageMin: 6 }, text: [
    'The door opens as far as her body allows. Plenty of room for you. Plenty of room for the snack in your hand.',
  ]},
]);

// Shape: DIALOGUE BEAT. Her line on a stop.
registerPool('circuit.line', [
  { when: {}, text: [
    `"You're still up," she says, not quite a question.`,
    `"If that's for me, don't announce it. Just—" She takes it.`,
    `"I was going to sleep. I was."`,
  ]},
  { when: { corruption: [0], stageMax: 4 }, weight: 2, text: [
    `"I already ate." Her mouth is still sweet. "Don't look at me like that."`,
  ]},
  { when: { corruption: [2], stageMin: 5 }, weight: 2, text: [
    `"You always know when I'm still hollow in the middle. Come in."`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Cassidy, low: "If Coach asks, this was electrolytes."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya's voice is small and pleased. "You can stay. The bed already knows."`,
  ]},
]);

// Shape: SKELETON
registerPool('circuit.beat', [
  { when: {}, text: [
    '{circuit.open} {circuit.line}',
    '{circuit.open}',
    '{circuit.line}',
  ]},
]);

const ROOM_POOL = {
  kitchen: 'circuit.kitchen',
  pantry: 'circuit.kitchen',
  lounge: 'circuit.lounge',
  ra_desk: 'circuit.desk',
  dining: 'circuit.dining',
  psych: 'circuit.psych',
  corridor: 'circuit.corridor',
  laundry: 'circuit.laundry',
  storage: 'circuit.storage',
  media: 'circuit.media',
  echo: 'circuit.echo',
  dream: 'circuit.dream',
  social: 'circuit.social',
  suite: 'circuit.suite',
  prestige: 'circuit.suite',
  resident: 'circuit.resident',
};

export function renderCircuitBeat(student, week, roomId, opts = {}) {
  const ctx = buildTextContext({
    subject: student || { name: 'Someone', first: 'Someone', id: -1, lbs: 140, relationship: 20, corruption: 0 },
    week,
    globals: { floorRoom: roomId, ...(opts.globals || {}) },
    ...opts,
  });
  const roomKey = ROOM_POOL[roomId] || 'circuit.open';
  const room = render(`{${roomKey}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const line = student ? (render('{circuit.line}', ctx, { trace: opts.trace || null })?.trim() || '') : '';
  const raw = [room, line].filter(Boolean).join('\n\n');
  return appendV2Depth(raw, 'talk', ctx, opts.v2DepthChance ?? 0.22);
}

export function renderCircuitOpen(week, opts = {}) {
  const ctx = buildTextContext({
    subject: opts.subject || { name: 'the floor', first: 'she', id: -1, lbs: 160, relationship: 30, corruption: 0 },
    week,
    globals: opts.globals || {},
  });
  return render('{circuit.open}', ctx, { trace: opts.trace || null })?.trim() || '';
}
