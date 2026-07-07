// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. Threshold approach.
registerPool('asc.ceremony.arrival', [
  { when: { stageMin: 11, corruption: [2], relationship: [3] }, weight: 2, text: [
    'The air changes before she does — warm, waiting, the room leaning toward a decision.',
    'You feel it in the floorboards: she has outgrown the ladder, and the ladder knows.',
    'She is already vast; what gathers now is permission, not mass.',
    'Sound thins. Even her breath feels like a held note.',
  ]},
  { when: {}, text: [
    'The threshold gathers around {subject.name} like weather.',
    'Something in the room is ready to let her go further.',
    'She has been this big long enough to know what comes next.',
    'The moment arrives the way tide arrives — inevitable, unhurried.',
  ]},
]);

// Shape: FULL SENTENCE. Witnessing environment.
registerPool('asc.ceremony.gathering', [
  { when: { stageMin: 11 }, weight: 2, text: [
    'Space makes room without being asked — angles softening, light pooling where she rests.',
    'Furniture, walls, and scale are witnesses now, none of them objections.',
    'The campus holds its breath; she holds yours.',
    'Warmth concentrates around her, around you, around the choice still unspoken.',
  ]},
  { when: {}, text: [
    'Everything stills around her vastness.',
    'The room arranges itself for what she is becoming.',
    'Witness gathers without audience.',
    'Quiet, heavy, tender — the air before a door opens.',
  ]},
]);

// Shape: FULL SENTENCE. Consent turn.
registerPool('asc.ceremony.turn', [
  { when: { corruption: [0] }, weight: 2, text: [
    'She trembles once — not fear, recognition — and looks to you for the word.',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'She does not ask if she is ready. She asks if you will watch.',
  ]},
  { when: {}, text: [
    'She turns toward you; the old body holds still while something else leans forward.',
    'Her hand finds yours — anchor, not restraint.',
    'This is the point of no return, and she meets it openly.',
    'The last mortal breath waits for the first mythic one.',
  ]},
]);

// Shape: FULL SENTENCE. Rebirth instant; persona files extend this pool.
registerPool('asc.ceremony.emergence', [
  { when: { corruption: [2] }, weight: 2, asserts: { 'asc.reborn': true }, text: [
    '{subject.name} arrives smaller than memory, warmth intact, change bright on her skin.',
    'She returns at a hundred pounds, not uncertain — only newly possible.',
  ]},
  { when: {}, asserts: { 'asc.reborn': true }, text: [
    'She surfaces lighter than the ceiling she left, myth on her skin, your gaze the anchor.',
    'The room forgets how big she was; what rises is new, small, and absolutely hers.',
    'Light finds her again — smaller, changed, still hungry for your witness.',
    'She breathes once, twice; the old scale is a story now, not a body.',
  ]},
]);

// Shape: DIALOGUE BEAT. First words after rebirth.
registerPool('asc.ceremony.firstWords', [
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} looks at you, settled. "Say when. I'm not going back to small by accident."`,
  ]},
  { when: {}, text: [
    `{subject.name} finds your eyes. "See it through with me."`,
    `"I'm still me," {subject.first} says. "Just more possible now."`,
    `{subject.name} exhales, almost a laugh. "Well. That happened."`,
  ]},
]);

// Shape: SKELETON. Full ceremony scene.
registerPool('asc.ceremony.scene', [
  { when: {}, text: [
    '{asc.ceremony.arrival} {asc.ceremony.gathering} {asc.ceremony.turn} {asc.ceremony.emergence} {asc.ceremony.firstWords}',
    '{asc.ceremony.gathering} {asc.ceremony.arrival} {asc.ceremony.turn} {asc.ceremony.emergence} {asc.ceremony.firstWords}',
    '{asc.ceremony.arrival} {asc.ceremony.turn} {asc.ceremony.gathering} {asc.ceremony.emergence} {asc.ceremony.firstWords}',
  ]},
]);
