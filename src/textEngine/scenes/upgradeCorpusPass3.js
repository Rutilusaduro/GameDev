// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile
// Pass 3 — week recap, talk-suggest, hunt, diary, cultivator.
import { registerModuleVariants } from '../engine.js';

// ── week recap ────────────────────────────────────────────────
registerModuleVariants('week.recap.beat', [
  { when: { gainBand: 'trace', bodyType: ['pear', 'fertility_goddess'] }, weight: 3, text: [
    'A quiet week, but the hips took attendance — a little more sway, a little more chair.',
    'Trace gain, all of it low: thigh-warmth, a seat that sits differently.',
  ] },
  { when: { gainBand: 'trace', bodyType: ['apple', 'rotund'] }, weight: 3, text: [
    'Not much on the scale, plenty on the middle — a softer dome she keeps finding with a palm.',
    'A quiet week that still wrote itself across her waistband.',
  ] },
  { when: { gainBand: 'solid', bodyType: ['hourglass', 'voluptuous'] }, weight: 3, text: [
    'A solid week in both directions — bust and hip taking their share like they planned it.',
    'Seven days of even generosity. The hourglass poured a little more.',
  ] },
  { when: { gainBand: 'big', corruption: [0] }, weight: 3, text: [
    'A big week she is still trying to file under temporary. The clothes already disagree.',
    'Real weight, real denial, real give under the shirt she keeps smoothing.',
  ] },
  { when: { gainBand: 'big', corruption: [2] }, weight: 3, text: [
    'A big week, and she treats it like a successful assignment.',
    'She put on real weight and looks at it the way other people look at trophies.',
  ] },
  { when: { gainBand: 'huge', stagedUp: true }, weight: 4, text: [
    'The week remade her and then crossed a line — {word.clothingFit}, no coming back quietly.',
    'Huge week, new stage, the body arriving all at once like it had been waiting.',
  ] },
  { when: { stuffedWeek: true, stageMin: 5 }, weight: 3, text: [
    'Seven days of staying full. The softness has a packed, satisfied density to it.',
    'She never quite emptied. The week shows as roundness that did not get a chance to recede.',
  ] },
]);

registerModuleVariants('week.recap.line', [
  { when: { gainStance: 'opposed', corruption: [0] }, weight: 3, text: [
    `{subject.name} pinches fabric away from the new weight and calls it nothing. The pinch tells on her.`,
    `{subject.name} rehearses a cutback she will not start tonight.`,
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
    `{subject.name} files the week under things she will not discuss — and under things she will repeat.`,
    `{subject.name} checks the new curve when she thinks the hallway is empty.`,
  ] },
  { when: { gainStance: 'reluctant', corruption: [0] }, weight: 3, text: [
    `{subject.name} notices the change and hates that the noticing feels warm.`,
    `{subject.name} says she will watch it. She is already watching it like a secret.`,
  ] },
  { when: { studentId: 0, gainBand: 'big' }, weight: 5, text: [
    `Brittany slaps the new thickness on her thigh like a scoreboard. "That's a W. Don't tell Coach."`,
  ] },
  { when: { studentId: 8, stagedUp: true }, weight: 5, text: [
    `Maya looks at the new line on her and says, "More." The recap ends there.`,
  ] },
  { when: { studentId: 15, gainBand: ['big', 'huge'] }, weight: 5, text: [
    `Lilith weighs the week the way she weighs prey. "Sufficient. Continue."`,
  ] },
]);

registerModuleVariants('week.recap', [
  { when: { stuffedWeek: true }, weight: 2, text: [
    '{week.recap.beat} {week.recap.line}',
    '{week.recap.line} {week.recap.beat}',
  ] },
]);

// ── talk suggest growth ───────────────────────────────────────
registerModuleVariants('talk.suggest_growth.b00._f1', [
  { when: {}, weight: 4, text: [
    `"Meant for more." {subject.name} repeats it like a word she has not been allowed. Her hand finds the new softness without asking.`,
    `The phrase lands and {subject.name} looks down as if her body might confirm it. At {subject.lbs} lbs, it almost does.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b01._f1', [
  { when: {}, weight: 4, text: [
    `{subject.name} laughs, then doesn't. Her palm stays on her side like the joke grew a body.`,
    `She waves it off and keeps touching the place you meant.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b10._f1', [
  { when: {}, weight: 4, text: [
    `{subject.name} is quiet long enough that the office hears the chair. "I think about being bigger. On purpose."`,
    `"I already think about it," she says. "I just haven't said it where you could hear."`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b11._f1', [
  { when: {}, weight: 4, text: [
    `"More," {subject.name} says, trying the word on like a size. It fits better than the last one.`,
    `She tastes the destination in her mouth. "You keep pointing at a me I haven't finished becoming."`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b20._f1', [
  { when: {}, weight: 4, text: [
    `"I know," {subject.name} says, bored of being convinced. "There's a bigger version. I'm walking toward her."`,
    `She finishes the sentence for you. "More. Yes. I have a number in mind."`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b21._f1', [
  { when: {}, weight: 4, text: [
    `{subject.name} parks your hand on the warm proof of the week. "Talk to this. It listens better than I do."`,
    `She puts your palm on her belly like a meeting agenda. "The project is seated. Brief it."`,
  ] },
]);

registerModuleVariants('talk.suggest_indulgence.b01._f1', [
  { when: {}, weight: 4, text: [
    'The suggestion arrives and her sentence falls apart around a sudden, specific hunger.',
    '{subject.name} loses the plot and finds the thought of food instead.',
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b10._f1', [
  { when: {}, weight: 4, text: [
    'Prepared ground. She is standing before the idea finishes landing.',
    '{subject.name} is already half out of the chair, appetite doing the scheduling.',
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b11._f3', [
  { when: {}, weight: 4, text: [
    `"Third dinner. Don't process that. I'm going."`,
    `She has the bag and the keys. The question was decorative.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b20._f1', [
  { when: {}, weight: 4, text: [
    `She smiles at the shape of your intent. "Yes. Whatever the sentence was going to be."`,
    `{subject.name} votes early. "If this is about food, the answer already happened."`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b21._f3', [
  { when: {}, weight: 4, text: [
    `"Feed me. Grow me. Watch me." The belly hits the desk as punctuation.`,
    `She leans in until there is more of her than desk. "Command it. I'll do the eating."`,
  ] },
]);

// ── hunt locations ────────────────────────────────────────────
const HUNT_NODES = [
  'dorm', 'quad', 'dining_hall', 'dorm_row', 'crossroads', 'gym',
  'library', 'frat_row', 'coffee_shop', 'campus_park', 'admin',
];
const HUNT_ATMOS = {
  dorm: {
    0: 'The hallway keeps your secret if you keep moving.',
    2: 'Incense, empty carpet, a door that knows how to close.',
  },
  quad: {
    0: 'Open grass hides a hunt in plain sight.',
    2: 'Diagonal paths, a hundred alibis, one intention.',
  },
  dining_hall: {
    0: 'Trays and noise — the perfect cover for appetite of another kind.',
    2: 'Institutional garlic, distracted boys, easy approach.',
  },
  dorm_row: {
    0: 'Propped doors and music. Prey that thinks it is socializing.',
    2: 'Residence-hall weather: loud, loose, convenient.',
  },
  crossroads: {
    0: 'People deciding which way to go. You decide for them.',
    2: 'A bench, a split path, a moment of indecision you can use.',
  },
  gym: {
    0: 'Glass and effort. They already know they are being watched.',
    2: 'Sweat, mirrors, men mid-performance. You give the performance a plot.',
  },
  library: {
    0: 'Quiet enough that a look is a conversation.',
    2: 'Focused faces. The ones who glance up are already leaving with you.',
  },
  frat_row: {
    0: 'Music, porch light, a ratio that has always been kind to you.',
    2: 'Three houses, two parties, one appetite walking the lawn.',
  },
  coffee_shop: {
    0: 'Brick, playlist, men rehearsing interesting. You audition them silently.',
    2: 'Laptops and foam. Easy to sit close. Easier to leave with one.',
  },
  campus_park: {
    0: 'The loop path collects the ones who want to be alone. They are not.',
    2: 'Pond, bench, dusk. Isolation is a gift you unwrap.',
  },
  admin: {
    0: 'Ties and ambition. Fragility dressed as importance.',
    2: 'Hushed tile. A hunt in a building that thinks it is serious.',
  },
};

for (const id of HUNT_NODES) {
  const row = HUNT_ATMOS[id];
  registerModuleVariants(`hunt.node.${id}`, [
    { when: { stageMin: 5 }, weight: 3, text: [row[2]] },
    { when: { corruption: [2] }, weight: 3, text: [row[0]] },
    { when: { season: 'winter' }, weight: 2, text: [
      'Cold air, warm interiors — people wanting to be taken somewhere close.',
    ] },
  ]);
}

// ── cultivator eating ─────────────────────────────────────────
registerModuleVariants('cultivator.eating.s0', [
  { when: {}, weight: 4, text: [
    'She eats the test portion like homework she happens to like.',
    'Curiosity first, second bite already less scientific.',
  ] },
]);
registerModuleVariants('cultivator.eating.s1', [
  { when: {}, weight: 4, text: [
    'Suspicion is a background hum. The flavor is louder.',
    'She notices the extra appetite and files it under the recipe working.',
  ] },
]);
registerModuleVariants('cultivator.eating.s2', [
  { when: {}, weight: 4, text: [
    'She eats faster than the tasting notes require.',
    'The kitchen is a little too interesting tonight, and she knows it.',
  ] },
]);
registerModuleVariants('cultivator.eating.s3', [
  { when: {}, weight: 4, text: [
    'She is watching you watch her eat. She does not stop.',
    'Suspicion and hunger share a plate. Hunger finishes first.',
  ] },
]);
registerModuleVariants('cultivator.eating.s4', [
  { when: {}, weight: 4, text: [
    'Whatever this is, she has decided the taste is worth the knowing.',
    'She cleans the bowl like a woman who has chosen a side.',
  ] },
]);

// ── diary fallbacks (voice-true extras) ───────────────────────
registerModuleVariants('diary.brittany.uniform', [
  { when: { mood: ['happy', 'excited'] }, weight: 2, text: [
    'I bounced on the way to dinner. The squad is not getting that energy anymore. The dining hall is.',
  ] },
  { when: { season: 'winter' }, weight: 2, text: [
    'Winter layers hide the score. I still know the score. I keep adding to it.',
  ] },
]);
registerModuleVariants('diary.madeline.dataset', [
  { when: { mood: ['focused', 'observant'] }, weight: 2, text: [
    'Field note, addendum: the observer is biased. The bias is delicious. Continuing observation.',
  ] },
]);
registerModuleVariants('diary.kylie.unfiltered', [
  { when: { mood: ['excited'] }, weight: 2, text: [
    'Drafted a caption and deleted it. The footage is the caption. I look hungry. Good.',
  ] },
]);
registerModuleVariants('diary.serena.newpr', [
  { when: { season: 'summer' }, weight: 2, text: [
    'Summer training used to mean cuts. This summer means PRs of a different kind. I am not sorry.',
  ] },
]);
registerModuleVariants('diary.maya.chair', [
  { when: { stageMin: 4 }, weight: 2, text: [
    'The chair knows me. I sat down and it made the sound. I stayed.',
  ] },
]);
registerModuleVariants('diary.destiny.achievement', [
  { when: { mood: ['content'] }, weight: 2, text: [
    'Logged the week. Gain in pounds. I am not starting over.',
  ] },
]);
registerModuleVariants('diary.renee.recipe', [
  { when: { stageMin: 4 }, weight: 2, text: [
    'Scaled the recipe up. Then I scaled me up. Same instinct.',
  ] },
]);
registerModuleVariants('diary.lilith.chair', [
  { when: { stageMin: 5 }, weight: 2, text: [
    'The chair holds. The hunt holds. I am larger than last week\'s furniture expected.',
  ] },
]);
registerModuleVariants('diary.tiffany.uncounted', [
  { when: { mood: ['cheerful'] }, weight: 2, text: [
    'Chapter dinner, no counters allowed. I enforced the rule by example.',
  ] },
]);
registerModuleVariants('diary.priya.spreadsheet', [
  { when: { stageMin: 4 }, weight: 2, text: [
    'Updated the sheet. The trendline is green. I rewarded the trendline.',
  ] },
]);
registerModuleVariants('diary.nadia.casestudy', [
  { when: { relationship: [2, 3] }, weight: 2, text: [
    'Case notes: the professor is a variable I am no longer controlling for. Delicious confounding.',
  ] },
]);
registerModuleVariants('diary.daisy.softening', [
  { when: { season: 'fall' }, weight: 2, text: [
    'Fall baking, extra butter, extra me. Bless it. I mean that.',
  ] },
]);
registerModuleVariants('diary.maryjane.ripe', [
  { when: { stageMin: 4 }, weight: 2, text: [
    'Harvest metaphor is getting less metaphorical. The jeans know.',
  ] },
]);
registerModuleVariants('diary.sophia.trial', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Rechecked the numbers. Rechecked my waist. Both climbed. I logged it twice.',
  ] },
]);
registerModuleVariants('gossip.react.notice', [
  { when: { memType: 'stageUp', corruption: [2] }, weight: 3, text: [
    (ctx) => `${ctx.globals?.memName ?? 'She'} crossed a line and looked pleased about the witnesses.`,
    (ctx) => `The class saw ${ctx.globals?.memName ?? 'her'} get bigger. She let them.`,
  ] },
  { when: { memType: 'scaleBreak', stageMin: 6 }, weight: 3, text: [
    (ctx) => `The scale story about ${ctx.globals?.memName ?? 'her'} did a lap of the room. Nobody needed the number twice.`,
  ] },
]);

registerModuleVariants('gossip.murmur', [
  { when: { campusFattening: true }, weight: 2, text: [
    'The class has a theory about the dining hall. The theory has hips.',
    'Campus-wide softening is not a rumor anymore. It is seating policy.',
  ] },
  { when: { season: 'winter' }, weight: 2, text: [
    'Winter coats are doing less hiding than they used to. People notice anyway.',
  ] },
]);

registerModuleVariants('memory.self', [
  { when: { memType: 'feast', corruption: [2] }, weight: 3, text: [
    'That feast is still a warm fact under her shirt. She has not tried to walk it off.',
    'She remembers the meal as a decision she is still wearing.',
  ] },
  { when: { memType: 'stageUp', gainStance: 'secret' }, weight: 3, text: [
    'She keeps returning to the week she crossed. Privately. Often.',
  ] },
]);

registerModuleVariants('milestone.body', [
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 4 }, weight: 2, text: [
    'The crossing landed in her hips — wider chair, warmer walk, a lower half that arrived first.',
    'She has grown downward and outward. The doorway will want a conversation.',
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 4 }, weight: 2, text: [
    'The new stage is a belly story: forward, round, already writing the next size.',
    'She crossed with her middle leading. Everything else is catching up gladly.',
  ] },
  { when: { bodyType: ['topHeavy', 'voluptuous'], stageMin: 4 }, weight: 2, text: [
    'The threshold is worn on her chest — heavier, closer, impossible to button past.',
  ] },
]);

registerModuleVariants('milestone.line', [
  { when: { gainStance: 'opposed', corruption: [0] }, weight: 3, text: [
    `{subject.name} stares at the new size like it happened to someone else. It did not.`,
    `"This isn't— " she starts, and does not finish. The body finished it.`,
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
    `{subject.name} goes quiet and pleased and pretends the quiet is shock.`,
    `She files the crossing under later. Later is already smiling.`,
  ] },
]);

registerModuleVariants('diary.indiana.fieldmap', [
  { when: { stageMin: 4 }, weight: 2, text: [
    'Mapped the new territory. It is mostly hip. Expedition continuing.',
  ] },
]);
