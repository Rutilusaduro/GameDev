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

// ── TURN-BASED ENCOUNTER SYSTEM ────────────────────────────────────

export const WILLPOWER_START = { 0: 5, 1: 45, 2: 65, 3: 90 };
export const MAX_APPREHENSION = { 0: 99, 1: 4, 2: 5, 3: 6 };

// Guy lines per [difficulty][willpower band]
// band 0 = willpower > 65 (confident), band 1 = 30-65 (wavering), band 2 = < 30 (nearly done)
export const GUY_LINES = {
  1: [
    [
      "\"You're kind of hard to ignore.\"",
      "\"Buy you a drink?\" He doesn't wait for an answer before signaling.",
      "\"I was about to leave. Glad I didn't.\"",
    ],
    [
      "He starts saying something, then loses the thread of it mid-sentence.",
      "\"Sorry — I — \" He tries again. Fails again.",
      "\"I keep looking over here,\" he says, like it's news to both of them.",
    ],
    [
      "He just looks at you. Words don't seem to be happening for him right now.",
      "\"I'm not usually like this.\" He can't explain what 'like this' means.",
      "He's stopped pretending to be doing anything else.",
    ],
  ],
  2: [
    [
      "He takes his time before responding. Evaluating.",
      "\"I don't usually talk to strangers.\" He's still standing there.",
      "\"You've been watching me.\" It's not quite an accusation.",
    ],
    [
      "\"This is — \" He doesn't finish it. He knows how the sentence would sound.",
      "He shifts his weight toward you. Probably doesn't notice.",
      "\"Are you always like this?\" He asks it like he's not sure he wants the answer.",
    ],
    [
      "\"I should probably — \" He doesn't move.",
      "He's very still. The kind of still that's the body overriding the brain.",
      "\"Tell me your name again,\" he says, quieter this time.",
    ],
  ],
  3: [
    [
      "He meets your gaze evenly. Gives you nothing.",
      "\"Can I help you with something?\" Professional. Careful.",
      "He turns back to what he was doing. Unhurriedly.",
    ],
    [
      "\"I know what you're doing.\" He says it. He's still here.",
      "He opens his mouth, closes it. Opens it again. \"You're — interesting.\"",
      "Something shifts in his expression. He doesn't like that it did.",
    ],
    [
      "He closes his eyes for a moment. Opens them. You're still there.",
      "\"This is a bad idea,\" he says, and he doesn't disagree with himself.",
      "He looks at you for a long moment. Whatever professional composure he had has gone very quiet.",
    ],
  ],
};

// Reply pool — effects hidden from player
// effect: 'good' = willpower drops, 'bad' = apprehension +1, 'neutral' = minor willpower drop
export const REPLY_POOL = [
  { id:'r_watching',  label:"\"I've been watching you.\"",              effect:'good',    wpDelta:-18 },
  { id:'r_hoping',    label:"\"I was hoping you'd be here tonight.\"",  effect:'good',    wpDelta:-16 },
  { id:'r_silence',   label:"Lean in slightly. Let the silence work.",  effect:'good',    wpDelta:-20 },
  { id:'r_hair',      label:"Tuck your hair back slowly while he talks.", effect:'good',  wpDelta:-15 },
  { id:'r_smile',     label:"Give him the slow smile. Don't break it.", effect:'good',    wpDelta:-17 },
  { id:'r_myplace',   label:"\"My place is two minutes away.\"",        effect:'bad',     appDelta:1  },
  { id:'r_decided',   label:"Fix him with a look that says you've already decided.", effect:'bad', appDelta:1 },
  { id:'r_possess',   label:"\"You'll want to remember this evening.\"",effect:'bad',     appDelta:1  },
  { id:'r_cold',      label:"Give a slow, unreadable smile. Say nothing.", effect:'bad',  appDelta:1  },
  { id:'r_ask',       label:"Ask him something about himself.",         effect:'neutral',  wpDelta:-5  },
  { id:'r_laugh',     label:"Laugh at whatever he just said.",          effect:'neutral',  wpDelta:-6  },
  { id:'r_name',      label:"Say his name when you answer.",            effect:'neutral',  wpDelta:-5  },
  { id:'r_story',     label:"Tell him something harmless about your evening.", effect:'neutral', wpDelta:-4 },
];

// Physical seduction moves — unlocked by Lilith's weight
export const PHYSICAL_MOVES = {
  hip_sway: {
    label: "Hip Sway & Brush",
    unlockLbs: 150,
    power: 0.0,
    vignette: (_stageBand) => "[Vignette: coming soon]",
  },
  belly_press: {
    label: "Belly Press",
    unlockLbs: 240,
    power: 0.1,
    vignette: (_stageBand) => "[Vignette: coming soon]",
  },
  cleavage_smother: {
    label: "Cleavage Smother",
    unlockLbs: 340,
    power: 0.15,
    vignette: (_stageBand) => "[Vignette: coming soon]",
  },
  gut_press: {
    label: "Gut Press",
    unlockLbs: 540,
    power: 0.2,
    vignette: (_stageBand) => "[Vignette: coming soon]",
  },
};

// Draw 3 reply options: 1 good + 1 bad + 1 neutral, shuffled
export function drawReplies(usedIds = []) {
  const pick = (type) => {
    const pool = REPLY_POOL.filter(r => r.effect === type);
    const avail = pool.filter(r => !usedIds.includes(r.id));
    const src = avail.length ? avail : pool;
    return src[Math.floor(Math.random() * src.length)];
  };
  const three = [pick('good'), pick('bad'), pick('neutral')];
  for (let i = 2; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [three[i], three[j]] = [three[j], three[i]];
  }
  return three;
}

// Probability of seduction success based on current willpower + move power bonus
export function seduceSuccessChance(willpower, movePower = 0) {
  return Math.max(0.05, Math.min(0.90, (100 - willpower) / 100 + movePower));
}

// Get a guy line for the current willpower state
export function getGuyLine(difficulty, willpower) {
  const lines = GUY_LINES[difficulty];
  if (!lines) return "He looks at you.";
  const band = willpower > 65 ? 0 : willpower >= 30 ? 1 : 2;
  const arr = lines[band];
  return arr[Math.floor(Math.random() * arr.length)];
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

// ── DIGESTION PHASE ────────────────────────────────────────────
// After consuming, Lilith enters a digestion phase. Hunting is
// blocked. She gains passive weight from the "prey" each week.
// Weeks and gain scale with her current weight stage.

export const LILITH_DIGEST_WEEKS = { 0:1, 1:1, 2:2, 3:2, 4:3, 5:3, 6:4, 7:5, 8:6, 9:8, 10:10 };
export const LILITH_DIGEST_LBS = { 0:8, 1:10, 2:12, 3:14, 4:16, 5:18, 6:20, 7:22, 8:25, 9:28, 10:30 };

export const LILITH_DIGEST_LINES = [
  (name, weeksLeft, total) =>
    `Lilith is still. She has been still since ${name}. Not lazy-still — processing-still. Her body is warm and busy and deeply focused on the work. She breathes slowly when you check in. "Give me time," she says, eyes half-closed. "${total - weeksLeft + 1} week. More to go."`,
  (name, weeksLeft, total) =>
    `She is sitting differently than she did last week — heavier into the couch, settling with the certainty of something that has found its final arrangement. The digestion is visible now. She eats when she needs to, but not with urgency. The hunger has quieted to a murmur. "Still going," she says. "${weeksLeft} more." She does not seem bothered by this at all.`,
  (name, _weeksLeft, total) =>
    `Halfway through. You can tell she has grown — her clothes show it, the way she moves shows it. ${name} is becoming her, slowly and completely. She watches you notice. "This is the part I like," she says. "Where it becomes permanent."`,
  (_name, weeksLeft, _total) =>
    `She is near the end of it. The digestion has been quiet and complete, and she is — visibly, substantively — larger than she was before. She moves with the deliberateness of someone who has learned to enjoy her own scale. "${weeksLeft > 0 ? `A little longer` : "Done soon"}," she says. "Thank you for not interrupting."`,
];

export const LILITH_DIGEST_COMPLETE = (name, lbsGained) =>
  `Lilith stretches for the first time in days, a slow, magnificent arc that acknowledges every new pound of her. The digestion of ${name} is complete. She has gained ${lbsGained} lbs since the hunt — all of it solid, all of it permanent, all of it hers. "I am hungry again," she says. "When is the next one?"`;

export const LILITH_DIGEST_BLOCKED = (weeksLeft) =>
  `Lilith holds up one hand without opening her eyes. "Not yet. ${weeksLeft} ${weeksLeft === 1 ? "week" : "weeks"}." The mass of her shifts as she breathes. "I am busy."`;
