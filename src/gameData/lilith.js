// Lilith — Feasting Beauty evolved form

export const LILITH_ID = 15;

// ── MAP ────────────────────────────────────────────────────────────

export const HUNT_NODES = {
  dorm:         { id:'dorm',         label:"Her Dorm",       desc:"The narrow hallway outside your door. Incense and something you won't name. The safest place on campus, and the emptiest." },
  quad:         { id:'quad',         label:"The Quad",       desc:"Open grass, diagonal paths. Students move through it without looking at each other, which suits you perfectly." },
  dining_hall:  { id:'dining_hall',  label:"Dining Hall",    desc:"Fluorescence, trays, the smell of institutional garlic bread. They're distracted here. Easy to approach without being noticed doing it." },
  dorm_row:     { id:'dorm_row',     label:"Dorm Row",       desc:"A long stretch of residence halls. Boys coming and going, propped-open doors, music bleeding into hallways." },
  crossroads:   { id:'crossroads',   label:"The Crossroads", desc:"Where the south path splits. A bench, a bike rack, the particular energy of people deciding which way to go." },
  gym:          { id:'gym',          label:"The Gym",        desc:"Glass walls. Men mid-effort, self-conscious about being watched. You give them something to be self-conscious about." },
  library:      { id:'library',      label:"The Library",    desc:"Quiet floors, focused faces. The ones who look up from their books are already halfway there." },
  frat_row:     { id:'frat_row',     label:"Frat Row",       desc:"Three houses, two with music. The ratio here has always been favorable." },
  coffee_shop:  { id:'coffee_shop',  label:"Coffee Shop",    desc:"Exposed brick, too-loud playlists, men who think they're interesting. Some of them almost are." },
  campus_park:  { id:'campus_park',  label:"Campus Park",    desc:"A loop path around a pond. Runners, readers, people sitting alone. They think they're alone." },
  admin:        { id:'admin',        label:"Admin Building", desc:"Hushed hallways. Men in ties with institutional ambitions. The specific fragility of people who need to seem important." },
};

// Node connections: from → to[]
export const HUNT_MAP = {
  dorm:        ['quad'],
  quad:        ['dorm','dining_hall','campus_park','admin','crossroads'],
  dining_hall: ['quad','dorm_row'],
  dorm_row:    ['dining_hall'],
  crossroads:  ['quad','gym','library','frat_row','coffee_shop'],
  gym:         ['crossroads'],
  library:     ['crossroads'],
  frat_row:    ['crossroads'],
  coffee_shop: ['crossroads'],
  campus_park: ['quad'],
  admin:       ['quad'],
};

// Which nodes are accessible at each weight stage id (0-10)
export const HUNT_NODE_ACCESS = {
  0: ['dorm','quad','dining_hall','dorm_row','crossroads','gym','library','frat_row','coffee_shop','campus_park','admin'],
  1: ['dorm','quad','dining_hall','dorm_row','crossroads','gym','library','frat_row','coffee_shop','campus_park','admin'],
  2: ['dorm','quad','dining_hall','dorm_row','crossroads','gym','library','frat_row','coffee_shop','campus_park','admin'],
  3: ['dorm','quad','dining_hall','dorm_row','crossroads','gym','library','frat_row','coffee_shop','campus_park','admin'],
  4: ['dorm','quad','dining_hall','dorm_row','crossroads','gym','library','frat_row','coffee_shop'],
  5: ['dorm','quad','dining_hall','dorm_row','crossroads','library','frat_row','coffee_shop'],
  6: ['dorm','quad','dining_hall','crossroads','frat_row','coffee_shop','library'],
  7: ['dorm','quad','dining_hall','crossroads','frat_row'],
  8: ['dorm','quad','crossroads','frat_row'],
  9: [],
  10: [],
};

// ── MEN ────────────────────────────────────────────────────────────
// difficulty: 1=easy, 2=medium, 3=hard
// oblivious→uneasy tone shifts with her weight (see SEDUCTION_MOVE)

export const HUNT_MEN = [
  {
    id: 'chad_w', name: "Chad Whitmore", tag: "Frat Bro",
    location: 'frat_row', difficulty: 1,
    desc: (stage) => stage < 4
      ? "He's exactly what he looks like — polo shirt half-tucked, that particular confidence of someone who's never had to try very hard. You can work with that."
      : "He's been watching you approach for thirty seconds without blinking. Something about the way you move has already made the decision for him.",
  },
  {
    id: 'tyler_b', name: "Tyler Banks", tag: "Gym Bro",
    location: 'gym', difficulty: 1,
    desc: (stage) => stage < 4
      ? "Post-workout flush, protein shaker in hand, checking himself in the mirror. Vanity is a useful thing."
      : "His eyes find you the second you enter. The protein shaker stops mid-lift. Something deep in his nervous system has already registered what's about to happen.",
  },
  {
    id: 'zack_m', name: "Zack Morris", tag: "Coffee Regular",
    location: 'coffee_shop', difficulty: 1,
    desc: (stage) => stage < 4
      ? "He's been making eyes at interesting-looking girls in this café for three semesters. You finally qualify. He just doesn't know what it'll cost."
      : "He's stopped pretending to read. You walked through the door and something in the room changed. He felt it before he saw you.",
  },
  {
    id: 'marcus_w', name: "Marcus Webb", tag: "Campus Runner",
    location: 'campus_park', difficulty: 2,
    desc: (stage) => stage < 5
      ? "Earbuds in, mid-stride, not looking. You'll need to actually get his attention. He's in his head. Pull him out of it."
      : "He slowed when he saw you. He's still pretending to run, but his eyes are tracking you. He knows he slowed. He can't help it.",
  },
  {
    id: 'derek_o', name: "Derek Okafor", tag: "Dining Regular",
    location: 'dining_hall', difficulty: 2,
    desc: (stage) => stage < 5
      ? "Mid-bite, mid-conversation with a table full of friends. You'll need to hold his attention past the social friction. It's possible."
      : "He's been watching you from across the hall since you came in. His table is still talking. He's somewhere else.",
  },
  {
    id: 'noah_k', name: "Noah Kim", tag: "The Quiet One",
    location: 'dorm_row', difficulty: 2,
    desc: (stage) => stage < 5
      ? "He lives two doors down. He's seen you before, always looked away quickly. Shyness is just a door that opens inward — you know how to push."
      : "He freezes when he sees you in the hallway. Doesn't run. Can't. Something about the scale of you has locked him in place.",
  },
  {
    id: 'jason_p', name: "Jason Park", tag: "Study Nerd",
    location: 'library', difficulty: 2,
    desc: (stage) => stage < 5
      ? "He looks up when you sit across from him, then looks back down. That second look — the one he didn't want you to see — is the one you needed."
      : "He watched you come through the door and has not looked at his book since. His pen has been on the same word for two minutes.",
  },
  {
    id: 'ryan_w', name: "Ryan Walsh", tag: "Graduate TA",
    location: 'admin', difficulty: 3,
    desc: (stage) => stage < 6
      ? "Professionalveneer, badge lanyard, the practiced authority of a man used to having control of a room. Interesting thing to take from someone."
      : "He sees you and visibly recalculates. Whatever he was about to say doesn't come out. His professional posture is doing a lot of work right now.",
  },
  {
    id: 'connor_b', name: "Connor Briggs", tag: "Frat President",
    location: 'frat_row', difficulty: 3,
    desc: (stage) => stage < 6
      ? "He's used to being the most confident person in any room. That's a specific kind of brittle. You know where to press."
      : "He started to say something when you approached, the automatic ease of someone who never has to think about it. Then he looked at you properly and the sentence didn't finish.",
  },
  {
    id: 'ethan_c', name: "Ethan Cole", tag: "Campus Security",
    location: 'campus_park', difficulty: 3,
    desc: (stage) => stage < 6
      ? "He's trained to notice things that are wrong. You are very much wrong, in a way he can't name or file a report about. That's the opening."
      : "He's been following you with his eyes for two minutes, one hand on his radio, not using it. Something is keeping him from using it.",
  },
  {
    id: 'brendan_m', name: "Brendan Marsh", tag: "Library Regular",
    location: 'library', difficulty: 3,
    desc: (stage) => stage < 6
      ? "He's been here long enough to see patterns. You are a new pattern. He's watching you with the careful attention of someone who reads people well. He's reading you right now."
      : "He looked up the moment you came in and hasn't looked away. He's not pretending to be busy. He's just watching. He knows something is wrong. He's still here.",
  },
  {
    id: 'prof_hayes', name: "Prof. Hayes", tag: "Visiting Professor",
    location: 'admin', difficulty: 3,
    desc: (stage) => stage < 6
      ? "Older. Careful. Actually perceptive — the kind of person who notices things most people don't bother to. The most interesting of them. The most useful challenge."
      : "He looked at you and something shifted in his expression — not desire exactly. Recognition. Like he's read about something and is now watching it happen.",
  },
  // Special: delivery (blob only)
  {
    id: 'danny_d', name: "Danny", tag: "Delivery Driver",
    location: 'dorm', difficulty: 0,
    desc: () => "He knocks twice, the way they always do. You ordered a lot tonight. You always order a lot now. He's been your regular for three weeks.",
  },
];

// ── SEDUCTION MOVES ────────────────────────────────────────────────

// movePool[stageBand] = array of available moves
// stageBand: 0 = thin (stage 0-2), 1 = curvy (stage 3-6), 2 = enormous (stage 7+)

export const SEDUCTION_MOVES = {
  // ── Always available ──
  hold_gaze: {
    label: "Hold his gaze",
    text: [
      // thin
      "You hold his gaze a half-second past comfortable. He breaks first. They always break first.",
      // curvy
      "You look at him the way you look at something you've already decided to have. He feels it.",
      // enormous
      "You simply look at him. The weight of your attention is physical. He doesn't move.",
    ],
    risky: false,
  },
  dark_smile: {
    label: "Let him see you smile",
    text: [
      "You smile — slow, like you know something he doesn't. You do know something he doesn't.",
      "The smile is the whole argument. He's already lost it before he understands what the argument was.",
      "You smile at him and something shifts in the room. He takes a half-step forward without meaning to.",
    ],
    risky: false,
  },
  lean_forward: {
    label: "Lean forward, let the neckline work",
    text: [
      // thin
      "You lean across the table, letting the geometry of your neckline arrange itself. His gaze drops. Returns. Too late.",
      // curvy
      "You lean forward, and your chest does what it's been doing since September. He doesn't have a word for this expression on his face. There isn't one.",
      // enormous
      "You lean forward and the sheer mass of you, the warmth of you, fills his field of vision. He makes a sound.",
    ],
    minStageBand: 0, risky: false,
  },
  hair_touch: {
    label: "Tuck your hair back slowly",
    text: [
      "You tuck a dark strand behind your ear with one finger and watch his sentence stop mid-word.",
      "You touch your hair and he watches your hand the entire time, forgetting himself entirely.",
      "A small gesture. Enormous effect. You've stopped needing to try.",
    ],
    risky: false,
  },
  // ── Curvy+ moves ──
  press_together: {
    label: "Press your arms together",
    text: [
      null, // not available thin
      "You press your arms inward deliberately, framing yourself. His eyes go exactly where you want them.",
      // enormous — belly interference gag
      "You try to press your arms in the way you used to. Your belly is firmly in the way. The attempt itself — the visible effort of navigating your own body — somehow makes it worse for him. He swallows.",
    ],
    minStageBand: 1, risky: false,
  },
  touch_arm: {
    label: "Let your fingers brush his arm",
    text: [
      null,
      "You let your fingers graze his arm — light, incidental, utterly deliberate. He goes very still.",
      "You touch his arm and feel him flinch not from recoil but from something else. He doesn't move away.",
    ],
    minStageBand: 1, risky: false,
  },
  // ── Enormous moves ──
  presence: {
    label: "Step closer. Let him feel the weight of the room change.",
    text: [
      null, null,
      "You step toward him. The air rearranges itself around your mass. Something animal in him understands what's happening.",
    ],
    minStageBand: 2, risky: false,
  },
  // ── Hard-target gambit (risky at thin, reliable at curvy+) ──
  direct_offer: {
    label: "Ask him directly to come with you",
    text: [
      "You ask him directly. No preamble. He blinks. Then, despite himself, he nods.",
      "You tell him to come with you. He starts to say something reasonable and stops. He's coming.",
      "You ask. It's barely even a question at this point. He follows.",
    ],
    risky: true,
    riskyFailText: "He hesitates. Looks at you. Something in his instincts — dormant, probably — tells him no. He excuses himself. You watch him go. Next time.",
  },
};

// Available moves per stage band (indexes into SEDUCTION_MOVES)
export const MOVES_BY_STAGE_BAND = [
  ['hold_gaze','dark_smile','lean_forward','hair_touch','direct_offer'],           // thin
  ['hold_gaze','dark_smile','lean_forward','press_together','touch_arm','direct_offer'], // curvy
  ['hold_gaze','presence','lean_forward','press_together','direct_offer'],         // enormous
];

export function getStageBand(stageId) {
  if (stageId >= 7) return 2;
  if (stageId >= 3) return 1;
  return 0;
}

export function getEffectiveDifficulty(baseDifficulty, stageId) {
  if (stageId >= 7) return Math.max(0, baseDifficulty - 2);
  if (stageId >= 4) return Math.max(1, baseDifficulty - 1);
  return baseDifficulty;
}

// ── CONSUME TEXT ───────────────────────────────────────────────────

export const CONSUME_TEXT = [
  // stage 0-2 (thin)
  `The door closes behind you both. There's a moment — brief, crystalline — where you consider what you are. Then he steps further in and the question answers itself. When it's over, you are heavier. You are more. You've always been more.`,
  `The room is warm and quiet and now only contains you. You feel the weight of him settling into you, becoming part of your mass, and you think: yes. This is exactly right. This is the only thing that has ever felt exactly right.`,
  // stage 3-5
  `He came willingly. They always do. You've never once forced anyone through that door — you've never had to. Something in you calls to something in them and they follow it all the way home. You add him to yourself. You are larger. You are more yourself.`,
  `The specific pleasure of it is that he had no idea. He walked in thinking one thing was happening. What happened was you. You are heavier now. You are more accurate about what you are.`,
  // stage 6-7
  `At this size, the act of taking someone has a different quality. More immediate. More honest. There's no performance required — just appetite, and the full use of it. You feel him become part of you and you are, briefly, completely content.`,
  `Your body accommodates him the way it accommodates everything now — easily, completely, without ceremony. You are larger again. It never stops feeling like the right direction to be going in.`,
  // stage 8+
  `You are enormous. You are hungry. You have been hungry since before you knew how to be anything else. He walks in and you eat and you are larger and the hunger is briefly quieter and then it starts again, which is the only thing that has ever made sense to you about being alive.`,
];

export function getConsumeText(stageId) {
  const idx = stageId >= 8 ? 6 : stageId >= 6 ? 4+Math.floor((stageId-6)/1) : stageId >= 3 ? 2+Math.floor((stageId-3)/2) : Math.min(stageId, 1);
  return CONSUME_TEXT[Math.min(idx, CONSUME_TEXT.length - 1)];
}

// ── DELIVERY SCENE (blob only) ─────────────────────────────────────

export const DELIVERY_SCENE = `You've been thinking about this one for a while.

Not Danny specifically — you've never thought about them specifically. But the idea of one. The specific luxury of not having to go anywhere, of staying exactly where you are, of hunger arriving at the door to meet you instead of the other way around.

You're too large to leave the room now. This is simply true. The hallway is a theoretical concept. The campus is something you remember.

You order more than usual. You always order more than usual. The total is significant. The bag will be large.

When he knocks — twice, the way he always knocks — you call him in from the couch, and you hear the door open, and you hear the silence that follows. The particular silence of someone recalculating.

"Just set it down," you say, in the warm dark of your room.

He comes in. He looks at you — all of you, which takes a moment — and something in his expression is confused and fascinated and not quite afraid, though it should be closer to afraid than it is.

You smile at him. The slow one.

"Thank you," you say, "for always being on time."

The hunger is immediate and enormous and specific. It has been building since the last time and the time before that and before you were large enough to stay in one place and call someone to you.

When it's over you are heavier than you've ever been. Your body fills the couch the way water fills a vessel — completely, with nowhere left to go.

You are very full.

You are very happy.

You pick up your phone.

You order again.`;

// ── CLUE CHAIN ─────────────────────────────────────────────────────

export const CLUE_FEAST_LINE =
  `Madison glances toward the door, then back at her plate. "You heard about Tyler Banks? From Sig Ep? His roommate says he went to a party two weeks ago and never came back." A silence settles over the table. Nobody knows what to say to that. Savannah sets her fork down. "Third one this semester," she says, quietly.`;

export const CLUE_INVESTIGATION = {
  title: "Something's Off",
  text: `After the feast, Madison's comment stays with you. You pull up the campus incident report — three missing persons, all male, all reported between 10pm and 2am, all last seen near the east dormitories.\n\nThere's one building at the east end of the block you've never paid attention to. Blackout curtains. A scent in the hallway that your brain keeps trying to identify.`,
  action: "Investigate (1 AP)",
  resultText: `You knock on room 312.\n\nA pause. Then the door opens.\n\nShe's shorter than you expected — or would be, if she were standing up straight. Dark clothes, dark eyes, the particular stillness of someone who was not surprised by your knock.\n\nShe looks at you. Something assesses. Then she opens the door wider.\n\n"I knew someone would come eventually," she says. "Come in. I'll make tea. You're going to have questions."\n\nHer name is Lilith. She sits across from you in a room that smells like incense and something else you won't think about too carefully, and she explains herself with the calm of someone who has made complete peace with what they are.\n\nYou leave with more questions than you arrived with, and one fewer reason to think the campus is entirely ordinary.`,
};

// ── WEEKLY PASSIVE ─────────────────────────────────────────────────
// Lilith gets 1 lbs/week (not the normal 1-3). Applied in advanceWeek.
export const LILITH_PASSIVE_GAIN = 1;
