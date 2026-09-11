// Lilith — Feasting Beauty evolved form
import { originRegisterFx } from './origins/index.js';

export const LILITH_ID = 15;

// ── MAP ────────────────────────────────────────────────────────────

export const HUNT_NODES = {
  dorm:         { id:'dorm',         label:"Her Dorm",       desc:"The narrow hallway outside your door. Incense and something you won't name. The safest place on campus, and the emptiest." },
  quad:         { id:'quad',         label:"The Quad",       desc:"Open grass, diagonal paths. Residents move through it without looking at each other, which suits you perfectly." },
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
  dorm:        ['quad','dorm_row'],
  quad:        ['dorm','dining_hall','campus_park','admin','crossroads'],
  dining_hall: ['quad','dorm_row','coffee_shop','frat_row'],
  dorm_row:    ['dining_hall','dorm'],
  crossroads:  ['quad','gym','library','frat_row','coffee_shop'],
  gym:         ['crossroads','campus_park'],
  library:     ['crossroads','admin','campus_park'],
  frat_row:    ['crossroads','dining_hall'],
  coffee_shop: ['crossroads','dining_hall'],
  campus_park: ['quad','gym','library'],
  admin:       ['quad','library'],
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

function huntBand(stage, early, mid, late) {
  if (stage >= 7) return late;
  if (stage >= 4) return mid;
  return early;
}

export const HUNT_MEN = [
  {
    id: 'chad_w', name: "Chad Whitmore", tag: "Frat Bro",
    location: 'frat_row', difficulty: 1,
    desc: (stage) => huntBand(stage,
      "Polo half-tucked, the ease of someone who never had to try. You can work with that.",
      "He has been watching you approach. The polo is tighter on him now too. He has not noticed his own staring.",
      "He stops talking when you fill the porch light. Whatever he was performing is already over.",
    ),
  },
  {
    id: 'tyler_b', name: "Tyler Banks", tag: "Gym Bro",
    location: 'gym', difficulty: 1,
    desc: (stage) => huntBand(stage,
      "Post-workout flush, protein shaker, a mirror he trusts more than people. Vanity is useful.",
      "The shaker stops mid-lift. His eyes find the new width of you and stay there.",
      "He forgets the set. The glass wall shows you arriving, and he watches the reflection like it is the workout.",
    ),
  },
  {
    id: 'zack_m', name: "Zack Morris", tag: "Coffee Regular",
    location: 'coffee_shop', difficulty: 1,
    desc: (stage) => huntBand(stage,
      "He has been making eyes at interesting-looking people in this café for three semesters. You finally qualify.",
      "He stopped pretending to read. You walked in and the room changed temperature for him.",
      "The laptop is closed. He felt you in the doorway before he saw you. He is already paying.",
    ),
  },
  {
    id: 'marcus_w', name: "Marcus Webb", tag: "Campus Runner",
    location: 'campus_park', difficulty: 2,
    desc: (stage) => huntBand(stage,
      "Earbuds in, mid-stride. You will need to actually get his attention.",
      "He slowed when he saw you. He is still pretending to run. His eyes are not.",
      "The loop path makes room. He jogs in place because stopping would mean admitting he stopped.",
    ),
  },
  {
    id: 'derek_o', name: "Derek Okafor", tag: "Dining Regular",
    location: 'dining_hall', difficulty: 2,
    desc: (stage) => huntBand(stage,
      "Mid-bite, mid-conversation. You will have to hold him past the table's social friction.",
      "He has been watching from across the hall. His friends are still talking. He is somewhere else.",
      "The tray line parts. He forgets his own plate. Yours is the only one he can look at.",
    ),
  },
  {
    id: 'noah_k', name: "Noah Kim", tag: "The Quiet One",
    location: 'dorm_row', difficulty: 2,
    desc: (stage) => huntBand(stage,
      "Two doors down. He always looked away. Shyness is a door that opens inward.",
      "He freezes in the hallway. Does not run. The scale of you has locked his feet.",
      "He is still in the doorway when you pass. There is no looking away left in him.",
    ),
  },
  {
    id: 'jason_p', name: "Jason Park", tag: "Study Nerd",
    location: 'library', difficulty: 2,
    desc: (stage) => huntBand(stage,
      "He looks up, then down. The second look — the one he did not want seen — is the one you needed.",
      "He watched you come through the door and has not looked at his book since.",
      "The pen has been on the same word since you sat. He knows. He stays.",
    ),
  },
  {
    id: 'ryan_w', name: "Ryan Walsh", tag: "Graduate TA",
    location: 'admin', difficulty: 3,
    desc: (stage) => huntBand(stage,
      "Badge lanyard, practiced authority. Interesting thing to take from someone who likes control.",
      "He sees you and recalculates. The sentence he prepared does not come out.",
      "The lanyard is still there. The authority is not. He holds the door because you fill it.",
    ),
  },
  {
    id: 'connor_b', name: "Connor Briggs", tag: "Frat President",
    location: 'frat_row', difficulty: 3,
    desc: (stage) => huntBand(stage,
      "Used to being the most confident person in a room. Brittle in a specific way. You know where to press.",
      "He started to say something easy. Then he looked at you properly and the sentence died.",
      "The porch belongs to you now. He yields it like a vote he already lost.",
    ),
  },
  {
    id: 'ethan_c', name: "Ethan Cole", tag: "Campus Security",
    location: 'campus_park', difficulty: 3,
    desc: (stage) => huntBand(stage,
      "Trained to notice things that are wrong. You are wrong in a way he cannot file.",
      "He has been following you with his eyes, one hand on the radio, not using it.",
      "The radio stays clipped. He escorts nothing. He is the one being led.",
    ),
  },
  {
    id: 'brendan_m', name: "Brendan Marsh", tag: "Library Regular",
    location: 'library', difficulty: 3,
    desc: (stage) => huntBand(stage,
      "He reads people. He is reading you right now with the care of someone who keeps notes.",
      "He looked up the moment you came in and has not looked away. He knows something is off. He stays.",
      "The stack of books is a prop. You are the text. He has already marked the page.",
    ),
  },
  {
    id: 'prof_hayes', name: "RA Hayes", tag: "Visiting RA",
    location: 'admin', difficulty: 3,
    desc: (stage) => huntBand(stage,
      "Older. Careful. The kind of person who notices what most people skip.",
      "Recognition, not just desire. Like he has read about this and is watching it arrive.",
      "He holds the visitor badge like it might explain you. It will not. He still follows.",
    ),
  },
  {
    id: 'danny_d', name: "Danny", tag: "Delivery Driver",
    location: 'dorm', difficulty: 0,
    desc: () => "He knocks twice, the way they always do. You ordered a lot tonight. You always order a lot now. He's been your regular for three weeks.",
  },
  {
    id: 'owen_k', name: "Owen Keller", tag: "Night Cook",
    location: 'dining_hall', difficulty: 2,
    desc: (stage) => huntBand(stage,
      "Closing shift, apron still on, a tray he was going to throw out. He looks at you like you might be the reason he kept it.",
      "He stopped scraping plates when you came in. The leftover tray is still warm.",
      "The kitchen light finds you first. He plates without being asked. The tray was always yours.",
    ),
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
  { id:'r_kitchen',   label:"\"The kitchen is still warm. Come see.\"",       effect:'good',    wpDelta:-19 },
  { id:'r_remember',  label:"\"You came back.\"",                             effect:'good',    wpDelta:-21, needsMark:true },
  { id:'r_savedseat', label:"\"I saved you a seat.\"",                        effect:'good',    wpDelta:-23, needsMark:true },
];

// Physical seduction moves — unlocked by Lilith's weight
export const PHYSICAL_MOVES = {
  hip_sway: {
    label: "Hip Sway & Brush",
    unlockLbs: 150,
    power: 0.0,
    vignette: (band) => band >= 2
      ? "You take one slow step. Hip, then belly, then the rest of you. He forgets the sentence he was holding."
      : band >= 1
      ? "You brush past him close enough that warmth does the talking. His eyes drop and stay."
      : "You shift your weight. The sway is small. He tracks it anyway.",
  },
  belly_press: {
    label: "Belly Press",
    unlockLbs: 240,
    power: 0.1,
    vignette: (band) => band >= 2
      ? "You pin him with softness. The belly arrives first, heavy and sure, and he stops pretending he might leave."
      : band >= 1
      ? "You step in until your middle meets him. Heat, give, a quiet claim. He does not step back."
      : "You lean. The new curve of you finds his shirt. He inhales like that was the plan.",
  },
  cleavage_smother: {
    label: "Cleavage Smother",
    unlockLbs: 340,
    power: 0.15,
    vignette: (band) => band >= 2
      ? "You draw him into the warm architecture of you. He disappears a little. Appetite does the rest."
      : band >= 1
      ? "You gather him against you. Softness closes the argument. His hands forget what they were for."
      : "You lean in until he has nowhere polite to look. He looks anyway.",
  },
  gut_press: {
    label: "Gut Press",
    unlockLbs: 540,
    power: 0.2,
    vignette: (band) => band >= 2
      ? "The mass of you settles against him like furniture choosing a room. He goes still and stays."
      : band >= 1
      ? "You press the full weight of your middle into him. He makes a sound that is not a word."
      : "You let your belly do the introducing. It is thorough.",
  },
  lap_claim: {
    label: "Lap Claim",
    unlockLbs: 420,
    power: 0.18,
    vignette: (band) => band >= 2
      ? "You sit. There is no lap left that is not yours. He holds on because the alternative is falling."
      : band >= 1
      ? "You claim his lap with warm, heavy certainty. The chair complains. He does not."
      : "You sit closer than manners allow. Heat and weight rewrite the seating chart.",
  },
  tray_invite: {
    label: "Walk him toward leftovers",
    unlockLbs: 155,
    power: 0.12,
    vignette: (band) => band >= 2
      ? "You turn toward leftover steam. He follows the smell and the mass of you without naming either."
      : band >= 1
      ? "You mention the kitchen is still plating. He forgets the errand he was on."
      : "You tilt your head toward warm trays. He takes a step before he decides to.",
  },
  door_fill: {
    label: "Fill the doorway",
    unlockLbs: 180,
    power: 0.11,
    vignette: (band) => band >= 2
      ? "You occupy the frame. There is no path around you. He looks up, then stays."
      : band >= 1
      ? "You pause in the doorway until he has to look. Softness takes the light first."
      : "You hold the threshold a beat too long. He notices the new width of you.",
  },
};

export const HUNT_NODE_MODS = {
  dining_hall: { seduceBonus: 0.08, wpDelta: -5 },
  dorm: { seduceBonus: 0.1, wpDelta: -8 },
  dorm_row: { seduceBonus: 0.05, wpDelta: -3 },
  frat_row: { seduceBonus: 0.04, wpDelta: -2 },
  gym: { seduceBonus: 0.03, wpDelta: 0 },
  coffee_shop: { seduceBonus: 0.02, wpDelta: 0 },
  library: { seduceBonus: 0.01, wpDelta: 2 },
  admin: { seduceBonus: 0, wpDelta: 4 },
  campus_park: { seduceBonus: 0.03, wpDelta: -1 },
  crossroads: { seduceBonus: 0.02, wpDelta: 0 },
  quad: { seduceBonus: 0.01, wpDelta: 0 },
};

export function huntEncounterMods(nodeId, student, week = 0, manId = null) {
  const base = HUNT_NODE_MODS[nodeId] || { seduceBonus: 0, wpDelta: 0 };
  let seduceBonus = base.seduceBonus || 0;
  let wpDelta = base.wpDelta || 0;
  if (student?.leftoverFedThisWeek && (nodeId === 'dining_hall' || nodeId === 'dorm' || nodeId === 'dorm_row')) {
    seduceBonus += 0.08;
    wpDelta -= 6;
  }
  if (week && student?.lastNightVisitWeek === week) {
    seduceBonus += 0.05;
    wpDelta -= 3;
  }
  if (student?.originFlags?.nightSeeded) {
    seduceBonus += 0.03;
    wpDelta -= 2;
  }
  const originFx = originRegisterFx(student);
  seduceBonus += originFx.huntSeduce;
  wpDelta += originFx.huntWp;
  const marks = manId ? (student?.huntMarks?.[manId] || 0) : 0;
  if (marks) {
    seduceBonus += Math.min(0.15, marks * 0.04);
    wpDelta -= Math.min(12, marks * 3);
  }
  return { seduceBonus, wpDelta };
}

// Draw 3 reply options: 1 good + 1 bad + 1 neutral, shuffled
export function drawReplies(usedIds = [], marks = 0) {
  const pick = (type) => {
    const pool = REPLY_POOL.filter(r => r.effect === type && (!r.needsMark || marks > 0));
    const avail = pool.filter(r => !usedIds.includes(r.id));
    const src = avail.length ? avail : pool.filter(r => r.effect === type);
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
export function seduceSuccessChance(willpower, movePower = 0, extras = {}) {
  const bonus = extras.seduceBonus || 0;
  return Math.max(0.05, Math.min(0.92, (100 - willpower) / 100 + movePower + bonus));
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
  text: `After the feast, a resident's offhand comment stays with you. You pull up the campus incident report — three missing persons, all male, all reported between 10pm and 2am, all last seen near the east dormitories.\n\nThere's one building at the east end of the block you've never paid attention to. Blackout curtains. A scent in the hallway that your brain keeps trying to identify.`,
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
