// ═══════════════════════════════════════════════════════════════
// SCENE: DIARY — non-evolved student diary entries
// Composed: core (archetype × stage) + psych + body + season + devour
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import { SLIGHT_DIARY, DIARY_ENTRIES } from '../../gameData/content.js';

// Placeholder replacements + stage-11 extensions where legacy stops at 10
const DIARY_OVERRIDES = {
  culinary: {
    0: "Taste-tested three batches before class. Flour on my apron, butter on my wrists. The girls will smell it before they see it. Good.",
    1: "Recipe notebook is getting sauce stains in the margins. My waistband is getting tight in a way I keep pretending is the apron strings.",
    2: "I brought cardamom buns. Mrs. Reyes lingered at pickup with coffee and didn't leave until the tray was empty.",
    3: "Formalized the baking hour. Administration signed off. My hips have outgrown my practicum skirt. I ordered a bigger one without shame.",
    4: "The moms have opinions now. Detailed opinions. I write them all down and bake accordingly.",
    5: "Tuesday is official. I am official. So is the softness settling around my middle — warm, constant, earned.",
    6: "Measured myself for a new apron. The numbers went in the recipe book next to the cinnamon ratios. Both feel correct.",
    7: "Mrs. Monroe rated this week's batch a ten. I ate two while cleaning up. Quality control.",
    8: "The classroom smells like me now — vanilla, yeast, comfort. I take up more of the kitchen than I used to. The kitchen doesn't mind.",
    9: "End of term. Six faces I know by appetite. My body has grown into the work. I would not trade a single pound.",
    10: "I have become the Tuesday tradition. The tradition has become my shape. Both are rising.",
    11: "Immense and warm at the center of it all. They come to me. I feed them. I feed myself. The oven never cools.",
  },
  nursing: {
    0: "Clinical rotation notes: hydration, rest, nutrition. Applied all three to myself after shift. The cafeteria soup was good.",
    1: "Started bringing extra snacks for the floor. Ended up eating half on the walk back. Stress eating is still eating.",
    2: "My scrubs fit differently. The nurse beside me said I look 'well.' I think she meant soft. I am soft.",
    3: "Comfort food after doubles hits different when comfort is the point. I am studying caregiving by practicing on myself.",
    4: "Patients ask if I'm pregnant. I am not. I am well-fed and warm and taking up a chair properly for once.",
    5: "Brought a casserole to study group. Ate a third before anyone arrived. No regrets — leftovers were the point.",
    6: "Night shift delivery habits are a lifestyle now. My thighs press together when I walk the hall. Steadier, somehow.",
    7: "I recommend rest. I recommend nourishment. I am a walking example of both, round and present.",
    8: "The break room chair knows me. My belly rests in my lap when I chart. I chart slower. I eat more. Care continues.",
    9: "I have nursed others into softness all semester. Turned the same attention inward. It worked.",
    10: "Vast, warm, immobile between shifts. They bring trays to me now. I accept. That is also care.",
    11: "A monument of comfort. The unit works around me. I am not sorry. Healing is heavy work.",
  },
  farm_girl: {
    0: "Homesick for Grandma's kitchen. Made jam bars from memory. Ate four testing the recipe. Close enough.",
    1: "Campus portions are generous. So am I becoming. Thighs filling out my jeans like they always wanted to.",
    2: "Brought six kinds of preserves to class. They disappeared. I disappeared half a loaf of cornbread after.",
    3: "Someone called me sunshine with hips. Accurate. I laughed and went back for seconds.",
    4: "Cooking for the dorm again. They call it 'Mary Jane's night.' My belly leads me into the kitchen now.",
    5: "Picked up weight like summer humidity — everywhere, soft, inevitable. I miss the farm and I love the table.",
    6: "Chair creaked. I kept eating. The creak is part of the furniture now. So am I.",
    7: "Made sweet potato pie for twelve. Ate for thirteen. The thirteenth was me and I was hungry.",
    8: "They deliver groceries to my door. I deliver warmth from my oven. Fair trade.",
    9: "I am homestead-sized. This room is my porch. Food comes to me. I stay. Good.",
    10: "Rooted. Round. The building settles when I shift. Like the old farmhouse did.",
    11: "Country big. Mythic big. The kind of big you feed a county from. I am still smiling.",
  },
  predator: {
    0: "Observation continues. Appetite is a language. I am learning to speak it without moving my mouth.",
    1: "They eat in front of me. I count calories the way others count sheep. The numbers add up to interest.",
    2: "Something is changing in the way they look at food. In the way I look at them. Symmetry.",
    3: "Hunger has a sound. I hear it in hallways now. I answer without words.",
    4: "The professor brings snacks. I take them. I take more than snacks, eventually, in other ways.",
    5: "Mass accumulates. Patience accumulates. Both are weapons if you hold them right.",
    6: "I do not chase. I wait. Things come to me — meals, people, weight. I devour what arrives.",
    7: "The devour command was not new. It was a name for something I already practiced in the dark.",
    8: "Bodies disappear into me. I grow. The math is simple. The morality is not my problem.",
    9: "I am appetite with a face. The face is softer than last month. The appetite is not.",
    10: "Immobility is not weakness. It is a trap with excellent bait.",
    11: "Leviathan is a word for what happens when hunger wins often enough. I have won.",
  },
};

function buildCoreVariants() {
  const variants = [];

  Object.entries(SLIGHT_DIARY).forEach(([archetype, text]) => {
    const override = DIARY_OVERRIDES[archetype]?.[0];
    const entry = override || text;
    if (!entry || entry === "—") return;
    variants.push({
      when: { archetype, stageMax: 0 },
      priority: 2,
      text: [entry],
    });
  });

  Object.entries(DIARY_ENTRIES).forEach(([archetype, stages]) => {
    Object.entries(stages).forEach(([idx, text]) => {
      const stageId = parseInt(idx, 10) + 1;
      const override = DIARY_OVERRIDES[archetype]?.[stageId] ?? DIARY_OVERRIDES[archetype]?.[parseInt(idx, 10)];
      let entry = override || text;
      if (!entry || entry === "—" || String(entry).startsWith("[placeholder")) return;
      variants.push({
        when: { archetype, stage: [stageId] },
        priority: 2,
        text: [entry],
      });
    });
    // Leviathan (stage 11) — override or reuse highest stage entry
    const leviathan = DIARY_OVERRIDES[archetype]?.[11];
    if (leviathan) {
      variants.push({ when: { archetype, stage: [11] }, priority: 3, text: [leviathan] });
    } else {
      const top = stages[9] || stages[8];
      if (top && top !== "—" && !String(top).startsWith("[placeholder")) {
        variants.push({
          when: { archetype, stage: [11] },
          priority: 1,
          text: [(ctx) => `${top} The number on the scale has passed into something else now — ${Math.round(ctx.subject.lbs).toLocaleString()} lbs and still climbing.`],
        });
      }
    }
  });

  // Quiet archetype — minimal core, flavors carry more weight
  variants.push(
    { when: { archetype: "quiet", stageMax: 0 }, priority: 2, text: ["—"] },
    { when: { archetype: "quiet", stage: [9, 10, 11] }, priority: 2, text: ["—"] },
  );

  variants.push({
    when: {},
    priority: 0,
    text: [(ctx) => `${ctx.subject.name} wrote something, then thought better of it.`],
  });

  return variants;
}

registerModule("diary.core", buildCoreVariants());

// ── diary.psych — corruption, relationship, mood ─────────────

registerModule("diary.psych", [
  { when: { corruption: [2], relationship: [3] }, priority: 3,
    text: [
      (ctx) => `I don't pretend anymore. When the Professor looks at me I feel it in my belly — warm, obedient, hungry for whatever comes next.`,
      (ctx) => `Whatever he wants, I want. The wanting has eaten the rest of me. I am soft with it. Heavy with it. Grateful.`,
    ] },
  { when: { corruption: [2] }, priority: 2,
    text: [
      (ctx) => `I used to have rules. I can't remember what they were for.`,
      (ctx) => `Hunger isn't a problem now. It's the language I think in.`,
      (ctx) => `The shame left. What stayed is appetite — honest, vast, mine.`,
    ] },
  { when: { corruption: [1], relationship: [2, 3] }, priority: 2,
    text: [
      (ctx) => `I know what I'm becoming. I lean into it when he's around.`,
      (ctx) => `Conflicted is the wrong word. I'm committed and still surprised by how good it feels.`,
    ] },
  { when: { corruption: [1] }, priority: 1,
    text: [
      (ctx) => `Part of me still flinches at the scale. The rest of me is already eating.`,
      (ctx) => `I argue with myself and then I lose, and losing tastes good.`,
    ] },
  { when: { corruption: [0], relationship: [0, 1] }, priority: 1,
    text: [
      (ctx) => `I tell myself it's temporary. My body doesn't seem to believe me.`,
      (ctx) => `Still negotiating. Still losing negotiations. Still finishing my plate.`,
    ] },
  { when: { mood: "stressed" }, priority: 1,
    text: [
      (ctx) => `Stress week. Appetite doesn't care about deadlines. Neither do I, apparently.`,
      (ctx) => `Everything is due and I am eating through the panic. It helps. That worries me less than it should.`,
    ] },
  { when: { mood: "happy" }, priority: 1,
    text: [
      (ctx) => `Good mood, good food, good weight. Everything feels connected today.`,
    ] },
  { when: { mood: "content" }, priority: 1,
    text: [
      (ctx) => `Quiet satisfaction. My body is warm and full and I don't want to be anywhere else.`,
    ] },
  { when: {},
    text: "" },
]);

// ── diary.body — body type × stage flavor ─────────────────────

registerModule("diary.body", [
  { when: { bodyType: "pear", stageMin: 3 }, priority: 1,
    text: [
      (ctx) => `My hips spread wider in the mirror — soft, heavy, impossible to ignore.`,
      (ctx) => `Waistband fights a battle it keeps losing. My thighs win by default.`,
    ] },
  { when: { bodyType: "apple", stageMin: 3 }, priority: 1,
    text: [
      (ctx) => `My belly leads now. Rounds forward, rests on my lap when I sit. I pat it without thinking.`,
      (ctx) => `Everything gathers at my middle — warm, round, present.`,
    ] },
  { when: { bodyType: "hourglass", stageMin: 3 }, priority: 1,
    text: [
      (ctx) => `Curves on curves. Breasts heavier, hips wider, waist still trying to make an argument.`,
      (ctx) => `The silhouette has become extravagant. I catch myself admiring it.`,
    ] },
  { when: { bodyType: "athletic", stageMin: 2 }, priority: 1,
    text: [
      (ctx) => `Muscle buried under softness. I flex and everything jiggles anyway.`,
      (ctx) => `The athlete is still in here. She's just padded now — thick, warm, slower.`,
    ] },
  { when: { bodyType: "rotund", stageMin: 2 }, priority: 1,
    text: [
      (ctx) => `Round everywhere. Belly, hips, arms — one continuous soft curve.`,
    ] },
  { when: { bodyType: "voluptuous", stageMin: 2 }, priority: 1,
    text: [
      (ctx) => `Abundance is the word. Flesh everywhere, warm and lavish.`,
    ] },
  { when: { bodyType: "fertility_goddess", stageMin: 2 }, priority: 1,
    text: [
      (ctx) => `Wide hips, heavy breasts, belly rounding like ripeness. I feel fertile with food and fat.`,
    ] },
  { when: { bodyType: "mom_bod", stageMin: 2 }, priority: 1,
    text: [
      (ctx) => `Soft middle, soft arms — the body of someone who feeds people. Including myself.`,
    ] },
  { when: { bodyType: "straight", stageMin: 4 }, priority: 1,
    text: [
      (ctx) => `Even my straight frame has surrendered to a belly. It pushes at everything I wear.`,
    ] },
  { when: {},
    text: "" },
]);

// ── diary.season — campus season flavor ───────────────────────

registerModule("diary.season", [
  { when: { season: "fall", stageMin: 1 },
    text: [
      `Fall air makes everything taste like cinnamon and permission.`,
      `The dining hall switched to stews. I've been loyal to the cause.`,
      `Sweaters hide nothing anymore. I wear them anyway — soft layers on soft flesh.`,
    ] },
  { when: { season: "winter", stageMin: 1 },
    text: [
      `Winter is an excuse and I am using it thoroughly.`,
      `Cold outside, warm inside, warmer in my middle. Good season for gaining.`,
      `Holiday trays everywhere. I am a conscientious participant.`,
    ] },
  { when: { season: "spring", stageMin: 1 },
    text: [
      `Spring dresses don't lie. Neither do I, anymore. I just eat.`,
      `Something blooming in the quad. Something blooming in my appetite.`,
      `Lighter clothes, heavier body. The contrast is interesting.`,
    ] },
  { when: { season: "summer", stageMin: 1 },
    text: [
      `Heat makes everything slow — including me. Sweat and fullness.`,
      `Summer fruit, summer laziness, summer softness settling in.`,
      `Too warm to move much. Perfect excuse to sit and eat.`,
    ] },
  { when: {},
    text: "" },
]);

// ── diary.devour — devour command aftermath ─────────────────

registerModule("diary.devour", [
  { when: { devourMin: 3 }, priority: 4,
    text: [
      (ctx) => `The devours blur together now — strangers swallowed into my weight, their fear sweet, their mass permanent on my hips. I don't flinch. I don't forget. I don't stop.`,
      (ctx) => `Three times the Professor said devour. Three times I obeyed. The hunger that lives in me isn't metaphor anymore. It's appetite with a body count.`,
    ] },
  { when: { devourMin: 2 }, priority: 3,
    text: [
      (ctx) => `I've done it again. The memory sits in my belly heavier than food — someone else's life converted into mine. I sleep better after. That should scare me.`,
      (ctx) => `Second devour. Easier this time. The shame lasted shorter. The gain lasted longer.`,
    ] },
  { when: { devourMin: 1 }, priority: 3,
    text: [
      (ctx) => `I still taste the command sometimes — devour — and my body answers before my mind catches up. What I took wasn't food. I grew anyway.`,
      (ctx) => `After the first devour I wrote nothing for an hour. Then I ate more. Something in me has shifted permanently.`,
      (ctx) => `She's gone. I'm heavier. The connection between those facts is unbearably clear and unbearably arousing.`,
    ] },
  { when: {},
    text: "" },
]);

// ── template & export ─────────────────────────────────────────

export const DIARY_TEMPLATE =
  "{diary.core}{diary.psych|prefix: }{diary.body|prefix: }{diary.season|prefix: }{diary.devour|prefix: }";

export function renderDiary(student, week = 1) {
  const ctx = createContext({ subject: student, week });
  let text = render(DIARY_TEMPLATE, ctx, { noSmooth: true }).trim();
  // Quiet archetype uses "—" as core; strip it when flavor modules added prose
  if (text.startsWith("— ")) text = text.slice(2).trim();
  return text || "—";
}
