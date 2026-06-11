// ═══════════════════════════════════════════════════════════════
// SCENE: CAMPUS SOFTENING — prose when pharmacist campus effect is active
// Appends to diary, attitude, talk, weigh-in when general students /
// classmates / campus population are in play but not yet acknowledged.
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';

/** Skip append when prose already acknowledges campus-wide or group gain. */
export function proseAlreadyCampusAware(text) {
  if (!text) return true;
  return /\b(campus feels softer|everyone else|class is full of subjects|they leave round|classmates are eating|getting fat alongside|all eating, all happy|seven of them in that corner|campus-wide|everyone softer|whole campus|students she(?:'s| has) never met|prospective students|part of the fabric|campus made me|accidentally converted|leave round|everyone participates|whole squad ends up|hope every girl on that squad|classmates eating|everyone i've ever cared about|everyone gains|everyone looked softer|not just (?:me|us)|campus is the variable|cooperating)\b/i.test(text);
}

function campusCtx(student, opts = {}) {
  const tier = opts.campusTier ?? (opts.campusFattening ? 1 : 0);
  return createContext({
    subject: student,
    week: opts.week ?? 1,
    globals: { campusFattening: tier > 0, campusTier: tier },
  });
}

export function appendCampusDiary(text, student, opts = {}) {
  if (!opts.campusFattening || proseAlreadyCampusAware(text)) return text;
  const note = render("{diary.campus|prefix: }", campusCtx(student, opts), { noSmooth: true });
  return note ? `${text}${note}`.trim() : text;
}

export function appendCampusAttitude(text, student, opts = {}) {
  if (!opts.campusFattening || proseAlreadyCampusAware(text)) return text;
  const note = render("{attitude.campus|prefix: }", campusCtx(student, opts), { noSmooth: true });
  return note ? `${text} ${note}`.trim() : text;
}

export function appendCampusWeighIn(text, student, opts = {}) {
  if (!opts.campusFattening || proseAlreadyCampusAware(text)) return text;
  const note = render("{weighIn.campus|prefix: }", campusCtx(student, opts), { noSmooth: true });
  return note ? `${text} ${note}`.trim() : text;
}

// ── diary.campus — private diary aside when campus is softening ─

registerModule("diary.campus", [
  { when: { campusFattening: true, archetype: "cheerleader" }, priority: 2,
    text: [
      "The squad group chat is mostly waistbands and third helpings now. Not just me.",
      "Saw a junior from tryouts in the dining hall — softer than September. Campus thing, maybe.",
      "Ashley posted a story from practice. Her uniform looked tighter. I noticed. I didn't comment.",
    ] },
  { when: { campusFattening: true, archetype: "transfer" }, priority: 2,
    text: [
      "Everyone on campus looks a little rounder in the shoulders. I notice. I don't mind.",
      "The dining hall line moves slower. Heavier steps everywhere — not just mine.",
      "A tour group passed me today. The guide didn't mention the campus-wide softness. I would have.",
    ] },
  { when: { campusFattening: true, archetype: "sorority" }, priority: 2,
    text: [
      "Half the chapter looked fuller at brunch. Nobody said wellness trial. Everyone ordered dessert.",
      "Pledges are softening faster than last year. Sisters blame stress. I blame the air in the union.",
      "Group photos from formal — every waist a little thicker. Pretty, honestly.",
    ] },
  { when: { campusFattening: true, archetype: "psych" }, priority: 2,
    text: [
      "Field notes: subjects across campus trending heavier. Control group obsolete. Campus is the variable.",
      "Fifteen notebooks and fifteen softer silhouettes in the lecture hall. Correlation strengthening.",
      "Advisor asked if I'm projecting. I showed her everyone else's meal logs. She stopped asking.",
    ] },
  { when: { campusFattening: true, archetype: "eced" }, priority: 2,
    text: [
      "The moms were round before my trays. Now the whole pickup line looks padded. Campus agrees with Tuesdays.",
      "Kayla's mom mentioned the new wellness smoothies. I pretended innocence. Poorly.",
      "Even teachers in the hall look well-fed lately. My baking didn't do all of it. Most of it, though.",
    ] },
  { when: { campusFattening: true, archetype: "culinary" }, priority: 2,
    text: [
      "Classmates linger after tastings now. They leave softer. Word's out beyond my section.",
      "The practicum kitchen is busier. Everyone's appetite turned up campus-wide.",
      "Mrs. Reyes said the whole school feels hungrier. I smiled and kept kneading.",
    ] },
  { when: { campusFattening: true, archetype: "influencer" }, priority: 2,
    text: [
      "Classmates keep DMing that they're 'catching up.' Campus wellness posts aren't helping. Good.",
      "Filmed B-roll in the union. Every background body looked rounder than last month.",
      "Comments aren't just about me anymore. Half are 'my whole dorm is eating like this now.'",
    ] },
  { when: { campusFattening: true, archetype: "nursing" }, priority: 2,
    text: [
      "Clinical floor gossip: healthy appetite consults up campus-wide. I'm not the outlier.",
      "Study group left fuller again. Same as last week. Same as everyone, apparently.",
      "Break room chairs creak for more than just me now.",
    ] },
  { when: { campusFattening: true, archetype: "farm_girl" }, priority: 2,
    text: [
      "Campus portions were already generous. Now the people eating them look as fed as the food deserves.",
      "Girls on my floor have that same post-table warmth I recognize from home.",
      "Delivery left three boxes at the wrong door. They were gone in an hour. Whole building's hungry.",
    ] },
  { when: { campusFattening: true, archetype: "pharmacy_grad" }, priority: 2,
    text: [
      "Wellness samples are off-book and everywhere. Uptake exceeds projections. Delightful.",
      "I don't need to chase subjects. The campus brings them to the dining hall soft and willing.",
      "Exposure risk rises with reach. Reach rises with appetite. Acceptable trade.",
    ] },
  { when: { campusFattening: true, archetype: "bookworm" }, priority: 2,
    text: [
      "Library carrels: more snacks, softer occupants. Campus-wide trend, not my section alone.",
      "Citation trail on 'ambient caloric environment' now includes the whole quad.",
      "Classmates' notebooks and waistbands both thicker this month.",
    ] },
  { when: { campusFattening: true, archetype: "athlete" }, priority: 2,
    text: [
      "Team weigh-ins across campus are… interesting this semester. I'm not alone on the curve.",
      "Former teammates look rounder at the union. Nobody's running it off. Nobody's trying.",
      "The gym's scale room is still closed. Coincidence pile growing.",
    ] },
  { when: { campusFattening: true, archetype: "gamer" }, priority: 2,
    text: [
      "Dorm floor raid at 2 a.m. — four rooms, one pizza, everyone softer than LAN night one.",
      "Chat IRL meetup: every attendee arrived thin and left discussing second dinner.",
      "Campus delivery meta is busted. Everyone's grinding calories now.",
    ] },
  { when: { campusFattening: true, archetype: "overachiever" }, priority: 2,
    text: [
      "Cohort BMI chart in the department lounge shifted right. I added a footnote: campus environment.",
      "Study group productivity down, snack throughput up. Sample size: the whole building.",
      "Dean's list and dining hall line both longer. Related data.",
    ] },
  { when: { campusFattening: true, archetype: "quiet" }, priority: 2,
    text: [
      "People I don't know look softer in the hall. I notice. I don't say. I eat.",
      "Campus feels padded. Like everyone's holding something warm.",
      "Classmates' footsteps sound heavier. Mine fit in now.",
    ] },
  { when: { campusFattening: true, archetype: "artsy" }, priority: 2,
    text: [
      "Life drawing pool volunteered fatter this month. Campus, not just my brush.",
      "Gallery opening: every body rounder, including the ones I didn't feed.",
      "Critics called the crowd 'lush.' They meant the wine. They also meant everyone.",
    ] },
  { when: { campusFattening: true, archetype: "predator" }, priority: 2,
    text: [
      "Easier targets lately — slower, fuller, distracted by their own appetites. Campus helps.",
      "Hallway census: more chewing, less fleeing. Good week for observation.",
      "The ones who still pass look softer than last month. The ratio improves.",
    ] },
  { when: { campusFattening: true, campusTierMin: 2 }, priority: 3,
    text: [
      "Dorms I don't live in look the same as mine now — snack piles, softer faces, slower stairs.",
      "Even the gym regulars have migrated to the union. The whole campus is eating like it's policy.",
      "Strangers recognize each other's waistbands. Campus-wide. Unmistakable.",
    ] },
  { when: { campusFattening: true, campusTierMin: 3 }, priority: 4,
    text: [
      "Prospective students on tour look at us, not the buildings. The campus is the exhibit.",
      "Delivery drivers know this zip code by heart. Everyone is heavier. Everyone is fed.",
      "The town past the quad is softer too. Sophia's work doesn't stop at enrollment.",
    ] },
  { when: { campusFattening: true }, priority: 0,
    text: [
      "Classmates look softer in passing. Not just my section — everywhere.",
      "The whole campus feels padded lately. Hunger hangs in the air like weather.",
      "Strangers in the dining hall eat like they belong to the same appetite now.",
    ] },
  { when: {}, text: "" },
]);

// ── attitude.campus — emotional aside when others are softening too ─

registerModule("attitude.campus", [
  { when: { campusFattening: true, archetype: "nursing" }, priority: 2,
    text: [
      "Everyone on my floor looks well-fed lately — I'm not the only one rounding out.",
      "Campus appetite is contagious and I'm patient zero for wanting more.",
    ] },
  { when: { campusFattening: true, archetype: "psych" }, priority: 2,
    text: [
      "My subjects are gaining faster than the protocol predicted — the campus is the variable.",
      "I watch the whole class soften and feel professionally vindicated and personally hungry.",
    ] },
  { when: { campusFattening: true, archetype: "pharmacy_grad" }, priority: 2,
    text: [
      "The wellness trial isn't confined to my notebook anymore — the whole campus is cooperating.",
      "I sound clinical. I feel pleased. Everyone's curves are trending up.",
    ] },
  { when: { campusFattening: true, archetype: "cheerleader" }, priority: 2,
    text: [
      "The squad looks thicker in photos and I'm weirdly proud of all of us.",
      "Campus spirit now includes second helpings — I'm not alone out there.",
    ] },
  { when: { campusFattening: true, archetype: "transfer" }, priority: 2,
    text: [
      "I came here to grow. The whole campus decided to join me.",
      "Home feels far. This place feels soft everywhere I look.",
    ] },
  { when: { campusFattening: true, archetype: "sorority" }, priority: 2,
    text: [
      "Chapter-wide softness — I'm feeding the mood and the mood is feeding back.",
      "Sisters look rounder at chapter and nobody's pretending it's just me.",
    ] },
  { when: { campusFattening: true, archetype: "eced" }, priority: 2,
    text: [
      "The moms were first. Now the whole pickup line looks padded. I notice. I'm not sorry.",
      "Tuesday energy leaked campus-wide and I'm equal parts guilty and thrilled.",
    ] },
  { when: { campusFattening: true, campusTierMin: 2 }, priority: 3,
    text: [
      "The whole campus eats like my section does now — I'm not ahead, I'm in the middle of something bigger.",
      "Everyone's softer in the halls. The saturation feels normal. Good.",
    ] },
  { when: { campusFattening: true, campusTierMin: 3 }, priority: 4,
    text: [
      "Regional softness — town, campus, dorms. I belong to the weather now.",
      "Everyone is rounding out together. I feel like part of a landscape.",
    ] },
  { when: { campusFattening: true }, priority: 0,
    text: [
      "Classmates look rounder in lecture — not just me, not just today.",
      "Campus-wide appetite and I'm right in the middle of it, happy to be.",
      "Everyone's softer in the halls. I fit the weather now.",
    ] },
  { when: {}, text: "" },
]);

// ── talk.campusCoda — conversation suffix when campus effect is live ─

registerModule("talk.campusCoda", [
  { when: { campusFattening: true, archetype: "pharmacy_grad" }, priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} glances toward the window. "It's not just us anymore," she says quietly. "The whole campus is… cooperating."`,
      (ctx) => `"Wellness branding works better at scale," ${ctx.subject.name} murmurs. "I can see it in every dining hall line."`,
    ] },
  { when: { campusFattening: true, archetype: "psych" }, priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} taps her notebook. "Ambient caloric environment," she says. "That's the polite term for what's happening to everyone."`,
    ] },
  { when: { campusFattening: true, archetype: "cheerleader" }, priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} laughs softly. "Half the squad texted me their weigh-ins this week. Up. All of them."`,
    ] },
  { when: { campusFattening: true }, priority: 0,
    text: [
      (ctx) => `Outside, the dining hall line looks thicker than last month — not just longer. Fuller. Campus-wide.`,
      (ctx) => `${ctx.subject.name} mentions, almost offhand, that half her classmates looked softer at lecture this week.`,
      (ctx) => `"Everyone's eating like it's mandatory," ${ctx.subject.name} says. "Maybe it is, now."`,
    ] },
  { when: {}, text: "" },
]);

// ── weighIn.campus — post-scale beat when others are gaining too ─

registerModule("weighIn.campus", [
  { when: { campusFattening: true, archetype: "influencer" }, priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} tilts her phone toward the hallway. "Campus is having a soft era. I'm not the only one filming it."`,
    ] },
  { when: { campusFattening: true, archetype: "transfer" }, priority: 2,
    text: [
      (ctx) => `"Everyone's rounding out," ${ctx.subject.name} says warmly. "I thought it was just me settling in. It's the whole place."`,
    ] },
  { when: { campusFattening: true, archetype: "psych" }, priority: 2,
    text: [
      (ctx) => `${ctx.subject.name} notes aloud that her classmates' numbers would make an excellent appendix. "Campus-wide," she adds, pleased.`,
    ] },
  { when: { campusFattening: true }, priority: 0,
    text: [
      (ctx) => `Through the door you can hear the dining hall — busy, content, campus-wide.`,
      (ctx) => `${ctx.subject.name} mentions classmates complaining about tighter jeans. She doesn't sound sympathetic. She sounds included.`,
      (ctx) => `"Not just me," ${ctx.subject.name} says quietly, patting her middle. "The whole campus feels it."`,
    ] },
  { when: {}, text: "" },
]);
