// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// Slot-composed hunt arrive / travel / dorm open / target. Prefer over leftover HUNT_NODES.desc.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerDimension('huntNode', (ctx) => ctx.globals?.huntNode ?? '');
registerDimension('huntTravel', (ctx) => ctx.globals?.huntTravel ?? '');
registerDimension('huntMan', (ctx) => ctx.globals?.huntMan ?? '');

registerPool('hunt.arrive.scene', [
  { when: {}, text: [
    '{hunt.arrive.setup} {hunt.arrive.body}',
    '{hunt.arrive.body} {hunt.arrive.setup}',
    '{hunt.arrive.setup}',
  ]},
]);

registerPool('hunt.arrive.setup', [
  { when: {}, text: [
    'Night campus. Heat on the path. You arrive like a rumor the lamps already believe.',
    'The map names this stop. Your body names the rest. Hunger walks first.',
    'Lamp glow, snack air, a sit that makes the bench look borrowed.',
  ]},
  { when: { huntNode: 'dorm' }, weight: 4, text: [
    'Narrow hall. Incense. Something sweet you will not name. Safest, emptiest, until you fill it.',
  ]},
  { when: { huntNode: 'quad' }, weight: 4, text: [
    'Open grass. Diagonal paths. People move through without looking, which suits you perfectly.',
  ]},
  { when: { huntNode: 'dining_hall' }, weight: 4, text: [
    'Fluorescence. Trays. Institutional garlic bread. Distracted eaters. Easy to leave rounder.',
  ]},
  { when: { huntNode: 'dorm_row' }, weight: 4, text: [
    'Residence halls, propped doors, music bleeding. Easy to be seen. Easier to be followed.',
  ]},
  { when: { huntNode: 'crossroads' }, weight: 4, text: [
    'The south path splits. A bench, a bike rack, people deciding which way, and who to look at.',
  ]},
  { when: { huntNode: 'gym' }, weight: 4, text: [
    'Glass walls. Men mid-effort. You give them something to be self-conscious about. They keep looking.',
  ]},
  { when: { huntNode: 'library' }, weight: 4, text: [
    'Quiet floors. Focused faces. The ones who look up are already halfway there.',
  ]},
  { when: { huntNode: 'frat_row' }, weight: 4, text: [
    'Three houses, two with music. Warmth, beer, boys who think they are hunting.',
  ]},
  { when: { huntNode: 'coffee_shop' }, weight: 4, text: [
    'Exposed brick. Too-loud playlist. The pastry case helps the interesting ones along.',
  ]},
  { when: { huntNode: 'campus_park' }, weight: 4, text: [
    'Loop path around a pond. Runners, readers, people sitting alone until your heat arrives.',
  ]},
  { when: { huntNode: 'admin' }, weight: 4, text: [
    'Hushed hallways. Men in ties. The fragility of people who need to seem important, and look twice.',
  ]},
]);

registerPool('hunt.arrive.body', [
  { when: {}, text: [
    '{word.size} of you takes the approach first. Soft heat. Appetite wearing a walking face.',
    'Warmth hangs off the path. The ones who look twice already know.',
    'The air tastes like a dinner you have not named yet. You keep walking.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'You fill more of the approach than the map expected. The hunt still starts here.',
  ]},
]);

registerPool('hunt.travel.scene', [
  { when: {}, text: [
    '{hunt.travel.setup} {hunt.travel.body}',
    '{hunt.travel.body} {hunt.travel.setup}',
    '{hunt.travel.setup}',
  ]},
]);

registerPool('hunt.travel.setup', [
  { when: {}, text: [
    'You take the next path. Night air. Heat following a half-step behind.',
    'Lamp to lamp. The campus rearranges around the fact of you.',
    'Feet, then the rest of you. Hunger picks the turn.',
  ]},
  { when: { huntTravel: 'dorm→quad' }, weight: 4, text: [
    'Main path out to the open quad. Lampposts. Pools of orange light between stretches of dark.',
  ]},
  { when: { huntTravel: 'quad→dorm' }, weight: 4, text: [
    'Familiar corridor. Room 312. Incense and something you will not name.',
  ]},
  { when: { huntTravel: 'quad→dining_hall' }, weight: 4, text: [
    'Fluorescent glow through the windows. Double doors. Institutional food and distracted people.',
  ]},
  { when: { huntTravel: 'quad→campus_park' }, weight: 4, text: [
    'The park loop is mostly dark. Pond reflecting sky. A few shapes moving along the path.',
  ]},
  { when: { huntTravel: 'quad→admin' }, weight: 4, text: [
    'Admin lobby still half-lit. Men with ambition and nowhere useful to put it.',
  ]},
  { when: { huntTravel: 'quad→crossroads' }, weight: 4, text: [
    'South path sloping down to the split. Broken-slat bench. People deciding which way.',
  ]},
  { when: { huntTravel: 'crossroads→gym' }, weight: 4, text: [
    'Glass walls ahead. Gym lights still burning. Warmth and effort through the door.',
  ]},
  { when: { huntTravel: 'crossroads→library' }, weight: 4, text: [
    'Pale library glow, steady and calm. You pass the entrance into the hush.',
  ]},
  { when: { huntTravel: 'crossroads→frat_row' }, weight: 4, text: [
    'Three houses ahead. Music from two of them. You approach like weather.',
  ]},
  { when: { huntTravel: 'crossroads→coffee_shop' }, weight: 4, text: [
    'String lights still on. Playlist too loud. Espresso and pretension through the door.',
  ]},
]);

registerPool('hunt.travel.body', [
  { when: {}, text: [
    'Night air finds the extra of you first. You keep going.',
    'Soft mass, a slower walk, hunger still in the lead.',
    'The path remembers heavier steps than last week.',
  ]},
]);

registerPool('hunt.dorm.scene', [
  { when: {}, text: [
    '{hunt.dorm.setup} {hunt.dorm.body}',
    '{hunt.dorm.body} {hunt.dorm.setup}',
    '{hunt.dorm.setup}',
  ]},
]);

registerPool('hunt.dorm.setup', [
  { when: {}, text: [
    'The door clicks. Corridor air. You are hungry. You are always hungry.',
    'Room 312 behind you. Campus ahead, mostly dark, mostly quiet.',
    'Handle, latch, night. Skin catching the chill. Appetite catching the rest.',
  ]},
  { when: { stageMin: 3, stageMax: 6 }, weight: 3, text: [
    'You turn the handle and step out. Cool air on a great deal of skin. Cleavage first. Then the rest of you.',
  ]},
  { when: { stageMin: 7 }, weight: 4, text: [
    'Getting out of the room takes a moment. Then night air finds you, all of you, chest leading into the dark.',
  ]},
]);

registerPool('hunt.dorm.body', [
  { when: {}, text: [
    'You decide to go somewhere the hunger can find what it needs.',
    'The campus spreads out. You fill more of the doorway than last week.',
    '{word.size} of you follows into the corridor like a second weather.',
  ]},
]);

registerPool('hunt.target.scene', [
  { when: {}, text: [
    '{hunt.target.setup} {hunt.target.body}',
    '{hunt.target.body} {hunt.target.setup}',
    '{hunt.target.setup}',
  ]},
]);

registerPool('hunt.target.setup', [
  { when: {}, text: [
    'He looks twice. Heat in the hush. Appetite wearing a walking face he cannot name.',
    'Thirty seconds of watching without blinking. Something about the way you move already decided.',
    'He felt the room change before he saw you. You let him keep looking.',
  ]},
  { when: { huntMan: 'chad_w' }, weight: 4, text: [
    'Polo half-tucked. That particular confidence of someone who never had to try. You can work with that.',
  ]},
  { when: { huntMan: 'tyler_b' }, weight: 4, text: [
    'Post-workout flush. Protein shaker. The lift stops mid-air the second you enter.',
  ]},
  { when: { huntMan: 'zack_m' }, weight: 4, text: [
    'He has been making eyes in this café for three semesters. You finally qualify. He does not know the cost.',
  ]},
  { when: { huntMan: 'danny_d' }, weight: 4, text: [
    'Bags in both hands. He is already at the door. You are the delivery he did not schedule.',
  ]},
]);

registerPool('hunt.target.body', [
  { when: {}, text: [
    'Warmth hangs off you. He keeps looking anyway.',
    'The hunt still starts here. He is already halfway there.',
    '{word.size} of you does the introducing. Words can wait.',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'At this size he does not blink. Something in his nervous system already registered what is about to happen.',
  ]},
]);

registerPool('hunt.clue.feast', [
  { when: {}, text: [
    '{hunt.clue.feast.setup} {hunt.clue.feast.body}',
    '{hunt.clue.feast.body} {hunt.clue.feast.setup}',
    '{hunt.clue.feast.setup}',
  ]},
]);

registerPool('hunt.clue.feast.setup', [
  { when: {}, text: [
    'Madison glances at the door, then her plate. The feast keeps eating around the silence.',
    'Someone mentions a name that does not come back to the house. Forks pause.',
    'Savannah sets her fork down like the gravy suddenly had a rumor in it.',
  ]},
]);

registerPool('hunt.clue.feast.body', [
  { when: {}, text: [
    `"Tyler Banks from Sig Ep. Roommate says he left a party and did not come back."`,
    `"Third disappearance this semester," Savannah says, quiet. Nobody knows where to put that.`,
    'East dorms. Late hours. A missing list that keeps getting longer than the menu.',
  ]},
]);

registerPool('hunt.clue.investigate', [
  { when: {}, text: [
    '{hunt.clue.investigate.setup} {hunt.clue.investigate.body}',
    '{hunt.clue.investigate.body} {hunt.clue.investigate.setup}',
    '{hunt.clue.investigate.setup}',
  ]},
]);

registerPool('hunt.clue.investigate.setup', [
  { when: {}, text: [
    'The feast comment stays. You pull the incident report after the plates are gone.',
    'Three missing. All late. All last seen near the east dormitories.',
    'Blackout curtains at the end of the block. A hallway scent your brain keeps misnaming.',
  ]},
]);

registerPool('hunt.clue.investigate.body', [
  { when: {}, text: [
    'Room 312 is the building you never filed. You file it now.',
    'You walk east. The curtains do not leak light. Something warm lives behind them.',
    'One AP. One door. You already know you are going to knock.',
  ]},
]);

registerPool('hunt.clue.result', [
  { when: {}, text: [
    '{hunt.clue.result.setup} {hunt.clue.result.body}',
    '{hunt.clue.result.body} {hunt.clue.result.setup}',
    '{hunt.clue.result.setup}',
  ]},
]);

registerPool('hunt.clue.result.setup', [
  { when: {}, text: [
    'Knock. Pause. Room 312 opens like it was waiting.',
    'Dark clothes. Dark eyes. She was not surprised by the knock.',
    `"Come in," she says. "I'll make tea. You are going to have questions."`,
  ]},
]);

registerPool('hunt.clue.result.body', [
  { when: {}, text: [
    'Her name is Lilith. The room smells like incense and a second thing you do not name yet.',
    'She explains herself like someone who already made peace with the hunger.',
    'You leave with more questions and one fewer ordinary campus.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderHuntArrive(nodeId, student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { huntNode: nodeId || 'dorm', featureId: 'hunt', ...(opts.globals || {}) },
  });
  return prefer('hunt.arrive.scene', ctx);
}

export function renderHuntTravel(fromId, toId, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { huntTravel: `${fromId}→${toId}`, huntNode: toId || '', featureId: 'hunt' },
  });
  return prefer('hunt.travel.scene', ctx);
}

export function renderHuntDormOpen(student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { huntNode: 'dorm', featureId: 'hunt' },
  });
  return prefer('hunt.dorm.scene', ctx);
}

export function renderHuntMan(manId, student, week = 1) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { huntMan: manId || '', featureId: 'hunt' },
  });
  return prefer('hunt.target.scene', ctx);
}

function huntCtx(student, week, extras = {}) {
  return buildTextContext({
    subject: student || { id: 15, name: 'Lilith', lbs: 180, startLbs: 128, archetype: 'predator' },
    week,
    globals: { featureId: 'hunt', ...extras },
  });
}

export function renderHuntClueFeast(student, week = 1) {
  return prefer('hunt.clue.feast', huntCtx(student, week));
}

export function renderHuntClueInvestigate(student, week = 1) {
  return prefer('hunt.clue.investigate', huntCtx(student, week));
}

export function renderHuntClueResult(student, week = 1) {
  return prefer('hunt.clue.result', huntCtx(student, week));
}
