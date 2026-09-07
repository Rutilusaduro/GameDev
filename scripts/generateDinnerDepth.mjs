// Generate dinner/wildcardDepth.js — pad dinner wildcard pools to ≥3 texts.
// Run: node scripts/generateDinnerDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const DINNER_DIR = 'src/textEngine/scenes/dinner';
const OUT_PATH = `${DINNER_DIR}/wildcardDepth.js`;

const CONTINUATION = [
  '. The warmth between them sharpens — appetite and attention braided.',
  '. She does not look away from the plate.',
  '. Something hungry settles in the silence.',
  '. Fullness shows in how she holds herself now.',
  '. The table feels smaller for how much she has taken in.',
  '. Her voice goes soft around the edges of want.',
  '. Comfort arrives in layers — food, heat, permission.',
  '. She leans into the moment without apology.',
  '. The restaurant hum fades; this is the whole evening.',
  '. Warmth pools where hands and fabric meet.',
];

const DIALOGUE = [
  '"I could get used to this," she says, almost to herself.',
  '"Don\'t stop," she murmurs — meaning the food, maybe more.',
  '"That looks incredible," she admits, already reaching.',
  '"I know," she answers, warm and unhurried.',
  '"More," she says, like it costs her nothing.',
  '"Stay," she breathes, eyes on your plate and hers.',
  '"I want that," she says — plain, honest, hungry.',
  '"Keep watching," she tells you, fork already moving.',
];

const GENERIC_DINNER = [
  'Candlelight catches the curve of her satisfaction — unhurried, present, real.',
  'The table holds warmth between courses; appetite has its own gravity tonight.',
  'She eats with the ease of someone finally allowed to want.',
  'Soft laughter and clinking glass; the evening leans toward indulgence.',
  'Warmth and fullness settle between you — patient, sensual, sure.',
  'The restaurant fades; what remains is her appetite and your attention.',
  'She takes another bite like she has all the time in the world.',
  'Comfort pools in her middle; she makes no move to hide it.',
];

const SELECTOR_GENERIC = {
  'dinner.moodTone': [
    'The table holds an easy rhythm between courses.',
    'Quiet pleasure sits with you — appetite unhurried, mood soft.',
    'Something warm in the room matches what is on her plate.',
  ],
  'dinner.seasonAmbience': [
    'The restaurant wraps you in low light and butter-warm air.',
    'Outside noise dulls; inside, appetite feels like the point.',
    'The room smells of reduction and bread — indulgence in the walls.',
  ],
  'dinner.relWarmth': [
    'Familiar ease at the table — no performance, just appetite.',
    'She eats like someone who trusts the person across from her.',
    'Small kindnesses between courses deepen the warmth.',
  ],
  'dinner.campusNote': [
    'Campus life feels far away; dinner is its own country tonight.',
    'Whatever happened today, the table resets appetite to priority.',
    'The meal feels like shelter from everything outside.',
  ],
  'dinner.relSizeNote': [
    'Bodies take space at the table; neither of you pretends otherwise.',
    'She settles into her chair like she owns the evening.',
    'Scale shows in how the table arranges itself around her.',
  ],
  'dinner.skillNote': [
    'Something in your attention steadies her appetite tonight.',
    'She follows your lead at the table — fork, glass, next course.',
    'Hunger answers you before she names it aloud.',
  ],
};

const CONV_ALTS = {
  compliment_appetite: [
    'You tell her how good she looks while eating. {subject.name} blushes, then takes another deliberate bite.',
    '"I love watching you enjoy yourself," you say. She meets your eyes and does not slow down.',
  ],
  suggest_second: [
    'You nod toward the menu. "Another round?" {subject.name} is already agreeing before you finish.',
    '"You should try the special," you suggest. She considers half a second, then says yes.',
  ],
  food_talk_dinner: [
    'You compare notes on the sauce. {subject.name} demonstrates her opinion by eating more of it.',
    'Ten minutes on texture and seasoning — she proves every point with her fork.',
    'She critiques like a devoted enthusiast and eats like one too.',
  ],
  order_for_her: [
    'You order generously before she can talk herself out of it. {subject.name} watches the dishes arrive, pleased.',
    'Rich courses land without her asking. {subject.name} raises a brow — appreciation, not protest.',
  ],
  wine_and_cheese: [
    'The cheese board is obscene and she is delighted. "Obviously," she says, already reaching.',
    'You declare a cheese course. {subject.name} settles back — this was always the plan.',
  ],
  overcomes_hesitation: [
    'She wavers; you remind her she deserves pleasure. {subject.name} orders the larger portion.',
    'Menu guilt flickers and dies. {subject.name} chooses abundance and does not look back.',
  ],
  body_compliment: [
    'You tell her she looks stunning. {subject.name} smiles into her plate and keeps eating.',
    'Warm words land; she accepts them the way she accepts dessert — without fuss.',
  ],
  personal_chef_story: [
    'You mention the chef built the menu around her tastes. {subject.name} eats with new reverence.',
    'She goes still at the compliment, then attacks the plate like it was made for worship.',
  ],
  endless_courses: [
    'Each time she finishes, you signal for more. {subject.name} laughs and does not refuse.',
    'Course after course — she stops counting and starts savoring.',
  ],
  praise_capacity: [
    '"I\'m impressed," you say. {subject.name} grins and reaches for what is left.',
    'You name how much she has eaten. She looks proud, not ashamed.',
  ],
  ask_passion: [
    'You ask what lights her up. {subject.name} talks until the main course vanishes unnoticed.',
    'Real conversation opens; appetite runs underneath like a second current.',
  ],
  talk_genuinely: [
    'You ask something real. {subject.name} answers while eating — unselfconscious, open.',
    'The menu forgotten, she talks. The food keeps disappearing anyway.',
  ],
  toast_together: [
    'Glasses lift. {subject.name} meets your eyes — warmth, appetite, promise of more.',
    '"To good food," you say. She drinks and eats more after, pleased.',
  ],
  share_a_dish: [
    'A plate between you. {subject.name} eats more than her share without comment.',
    '"We can share," you say. She reaches in — hunger wins the arithmetic.',
  ],
  after_dinner_stroll: [
    '"Cheese course," you suggest. {subject.name} was already reading the menu.',
    'You gesture toward dessert. She has been ready for five minutes.',
  ],
  awkward_comment: [
    'Your comment lands wrong. {subject.name} cools — fork slower, warmth thinner.',
    'She hears judgment in what you said. The evening loses a degree.',
  ],
  suggest_diet: [
    'You mention something lighter. {subject.name} keeps eating what she ordered, jaw set.',
    'Salad suggestions die in the air. She stays with the rich plate.',
  ],
  ask_about_weight: [
    'You bring up her body. {subject.name} stills — the ease of dinner fractures.',
    'The question hangs. She picks up her fork again, but something has shifted.',
  ],
  second_table: [
    'You move her somewhere more comfortable. {subject.name} settles and orders again immediately.',
    'A better chair, more room. She sighs with relief and signals the server.',
  ],
};

const GROUP_TOPIC_ALTS = [
  'the week ahead',
  'something she has been thinking about',
  'a story she has not told yet',
];

const GROUP_LINE_ALTS = {
  l1: [
    'You steer the talk somewhere real. Both of them lean in.',
    'A question opens the table — appetite and curiosity answer together.',
  ],
  l2: [
    '{ref.name} reacts before you finish the thought.',
    'Surprise and interest cross {ref.name}\'s face — then appetite returns.',
  ],
  l3: [
    'The exchange warms by degrees; food keeps arriving.',
    'Neither performs restraint. The table belongs to them now.',
  ],
  l4: [
    '"Go on," {ref.name} says. {subject.name} does.',
    'Laughter breaks loose — small, real, hungry for more story.',
  ],
};

const GROUP_SKELETON_ALTS = {
  'dinner.groupConv.get_them_talking': [
    '{dinner.groupConv.get_them_talking.l1}\n{dinner.groupConv.get_them_talking.l2}\n{dinner.groupConv.get_them_talking.l3}',
    '{dinner.groupConv.get_them_talking.l1}\n{dinner.groupConv.get_them_talking.l4}',
  ],
  'dinner.groupConv.compliment_both': [
    '{dinner.groupConv.compliment_both.l1}\n{dinner.groupConv.compliment_both.l3}',
    '{dinner.groupConv.compliment_both.l2}\n{dinner.groupConv.compliment_both.l3}',
  ],
  'dinner.groupConv.let_it_settle': [
    '{dinner.groupConv.let_it_settle.l1}\n{dinner.groupConv.let_it_settle.l3}',
    '{dinner.groupConv.let_it_settle.l2}\n{dinner.groupConv.let_it_settle.l3}',
  ],
  'dinner.groupConv.toast_together_group': [
    '{dinner.groupConv.toast_together_group.l2}\n{dinner.groupConv.toast_together_group.l3}',
    '{dinner.groupConv.toast_together_group.l1}\n{dinner.groupConv.toast_together_group.l3}',
  ],
  'dinner.groupConv.order_for_table': [
    '{dinner.groupConv.order_for_table.l1}\n{dinner.groupConv.order_for_table.l3}',
    '{dinner.groupConv.order_for_table.l2}\n{dinner.groupConv.order_for_table.l3}',
  ],
};

const ENDING_ALTS = {
  'dinner.endOpen': [
    '{subject.name} leans back as the last plate clears — warm, full, unhurried.',
    'The meal winds down; {subject.name} looks satisfied in the deep way only a long dinner produces.',
    'Candlelight softens; {subject.name} sits with the quiet pride of someone well fed.',
  ],
  'dinner.endClose': [
    'She pats her middle once, content. "That was exactly what I needed."',
    'The check arrives; she is in no hurry to leave — fullness has its own gravity.',
    'She smiles at the empty plates like they were accomplices.',
  ],
  'dinner.ending': [
    '{dinner.endOpen}\n{dinner.endClose}',
    '{dinner.endOpen} {dinner.endClose}',
  ],
  'dinner.depth': [
    '{dinner.setup}\n{dinner.courseReaction}\n{dinner.endReflection}\n{dinner.exit}',
    '{dinner.setup} {dinner.courseReaction} {dinner.endReflection}',
  ],
  'dinner.overfill': [
    '{subject.name} goes still — pleasantly, unmistakably at capacity. The evening ends here.',
    '{subject.first} sighs and smiles. "I can\'t. Not another bite." She means it, finally.',
    'Fullness wins; she sets the fork down with gentle finality.',
  ],
};

const WAITER_GENERIC = [
  'The server drifts over — warm smile, professional appetite for your table.',
  'A server appears with fresh plates and the question you both want answered.',
  'Service arrives unobtrusive and sure — more food implied, not demanded.',
];

const WAITER_VENUE = {
  bistro: [
    'A softly built woman in a bistro apron smiles at {subject.name}. "Ready for more?"',
    'Bread refilled before you ask — the bistro runs on generosity.',
  ],
  italian: [
    'A round, bustling server beams and refills the bread without ceremony.',
    '"More? Of course more." Family Italian logic, delivered with warmth.',
  ],
  steakhouse: [
    'A solid woman in a leather apron surveys cleared plates with approval.',
    'She nods at the wreckage of courses. "Next round?" Professional, unhurried.',
  ],
  french: [
    'The sommelier drifts over — substantial, crisp, refilling wine without comment.',
    'Formal service, soft authority: "Another course?"',
  ],
  japanese: [
    'Quiet formal service — chopsticks replaced, water refreshed, menu waiting.',
    'She appears and vanishes like ritual; {subject.name} reaches for the fresh menu.',
  ],
  private_club: [
    'Discreet service in a private room — anticipation handled like luxury.',
    'The server knows when to appear; the next course is already implied.',
  ],
  chefs_table: [
    'The kitchen sends its ambassador — pride and portions in equal measure.',
    'Chef\'s-table service: each arrival feels like an event.',
  ],
  home_dinner: [
    'You clear space and bring more — domestic warmth, no performance.',
    'The table is yours; seconds land like love language.',
  ],
  brunch_hall: [
    'Brunch service hums — syrup, coffee, and another plate before she asks.',
    'The hall runs on abundance; your server keeps pace without fuss.',
  ],
  atelier: [
    'Artful service matches artful plates — precision with indulgence underneath.',
    'Each course arrives like a small ceremony; appetite is part of the design.',
  ],
};

const DISH_COURSE_ALT = {
  opener: [
    'A generous start — rich enough to promise the rest of the evening.',
    'Warm opening notes; appetite wakes up and stays.',
  ],
  main: [
    'Substantial and slow — the kind of main that sits heavy and welcome.',
    'Portions meant to be taken seriously; she does.',
  ],
  dessert: [
    'Sweet density — indulgence without apology.',
    'The finish asks for patience and rewards it.',
  ],
  more: [
    'More arrives; she accepts like it was always the plan.',
    'Another round — warmth and weight keep building.',
  ],
  extra: [
    'Late generosity — no explanation required.',
    'Small extra that feels enormous after everything else.',
  ],
};

const DISH_GENERIC = [
  'Rich, abundant, designed to be finished without regret.',
  'Warmth and portion in equal measure — appetite answers first.',
  'The plate promises indulgence and keeps the promise.',
  'Satisfaction sits in the sauce, the crust, the second helping.',
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function dishAlts(dish) {
  const seed = hash(dish.id + dish.desc);
  const course = dish.course || 'main';
  const bank = DISH_COURSE_ALT[course] || DISH_GENERIC;
  return pick2(bank, seed);
}

function waiterAlts(key) {
  const venue = key.match(/dinner\.waiter\.([^.]+)/)?.[1];
  if (venue && WAITER_VENUE[venue]) return pick2(WAITER_VENUE[venue], hash(key));
  return pick2(WAITER_GENERIC, hash(key));
}

function pick2(bank, seed) {
  const n = bank.length;
  if (n < 2) return [bank[0], bank[0]];
  const i0 = seed % n;
  let i1 = (seed * 7 + 3) % n;
  if (i1 === i0) i1 = (i0 + 1) % n;
  return [bank[i0], bank[i1]];
}

function esc(s) {
  return JSON.stringify(s);
}

function parseQuotedTexts(arrayBody) {
  const texts = [];
  const strRe = /"((?:\\.|[^"\\])*)"|`((?:\\.|[^`\\])*)`/g;
  let sm;
  while ((sm = strRe.exec(arrayBody))) texts.push(sm[1] ?? sm[2]);
  return texts;
}

function classify(text) {
  const t = text.trim();
  if (t.length < 40 && (t.startsWith('.') || /^[a-z]/.test(t))) return 'continuation';
  if (t.includes('"') || t.includes("'")) return 'dialogue';
  return 'prose';
}

function altsFor(text, key) {
  const seed = hash(String(text) + key);
  const cls = classify(String(text || ''));
  if (cls === 'continuation') return pick2(CONTINUATION, seed);
  if (cls === 'dialogue') return pick2(DIALOGUE, seed);
  if (key.includes('thinJealousy')) {
    const jealousy = [
      '{subject.name} watches {ref.name} eat with quiet fascination.',
      'Her eyes track every bite — hunger dressed as curiosity.',
      'She touches her own empty place setting, then looks back at {ref.name}.',
      'Warmth and fullness on display; {subject.name} cannot look away.',
    ];
    return pick2(jealousy, seed);
  }
  const convId = key.match(/dinner\.conv\.([^.]+)/)?.[1];
  if (convId && CONV_ALTS[convId]) return pick2(CONV_ALTS[convId], seed);
  if (key === 'dinner.groupTopic') return pick2(GROUP_TOPIC_ALTS, seed);
  const groupLine = key.match(/dinner\.groupConv\.\w+\.(l\d)/)?.[1];
  if (groupLine && GROUP_LINE_ALTS[groupLine]) return pick2(GROUP_LINE_ALTS[groupLine], seed);
  if (GROUP_SKELETON_ALTS[key]) return GROUP_SKELETON_ALTS[key].slice(0, 2);
  if (SELECTOR_GENERIC[key]) return pick2(SELECTOR_GENERIC[key], seed);
  if (ENDING_ALTS[key]) {
    const bank = ENDING_ALTS[key];
    return bank.length >= 2 ? pick2(bank, seed) : [bank[0], bank[0]];
  }
  if (key.startsWith('dinner.waiter.')) return waiterAlts(key);
  if (key.startsWith('dinner.dish.')) {
    const id = key.replace('dinner.dish.', '');
    return dishAlts({ id, desc: id, course: id.includes('dessert') || /cake|tiramisu|mochi|cheesecake|brownie|mille|soufle|icecream/.test(id) ? 'dessert' : 'main' });
  }
  return pick2(GENERIC_DINNER, seed);
}

function padExtras(texts, key) {
  const need = Math.max(0, 3 - texts.length);
  if (need === 0) return [];
  const base = texts.find((t) => t != null) ?? '';
  if (base.includes('{dinner.')) {
    const skel = GROUP_SKELETON_ALTS[key] || ENDING_ALTS[key];
    if (skel) return skel.slice(0, need);
  }
  if (SELECTOR_GENERIC[key]) {
    const bank = SELECTOR_GENERIC[key];
    return bank.slice(0, need);
  }
  const [a, b] = altsFor(base, key);
  return need === 1 ? [a] : [a, b];
}

function parsePoolWildcards(src) {
  const pools = [];
  const re = /registerPool\('([^']+)',\s*\[([\s\S]*?)\]\s*\);/g;
  let m;
  while ((m = re.exec(src))) {
    const key = m[1];
    if (!key.startsWith('dinner.')) continue;
    const body = m[2];
    const wildMatch = body.match(/\{\s*when:\s*\{\}\s*,\s*text:\s*\[([\s\S]*?)\]\s*\}/);
    if (!wildMatch) continue;
    const texts = parseQuotedTexts(wildMatch[1]);
    const extras = padExtras(texts, key);
    if (extras.length) pools.push({ key, extras });
  }
  return pools;
}

const sources = [
  'conversations.js',
  'groupConversations.js',
  'selectors.js',
  'reactions.js',
  'waiter.js',
  'depth.js',
  'overfill.js',
];

const pools = [];
for (const file of sources) {
  const src = readFileSync(`${DINNER_DIR}/${file}`, 'utf8');
  pools.push(...parsePoolWildcards(src));
}

// endingScene uses bandVariants() — pad explicitly.
for (const key of ['dinner.endOpen', 'dinner.endClose', 'dinner.ending']) {
  pools.push({ key, extras: ENDING_ALTS[key].slice(0, 2) });
}

// dishDesc pools are registered dynamically from sessions catalog.
const { DINNER_VENUES, PRIVATE_FOODS } = await import('../src/gameData/sessions.js');
for (const venue of DINNER_VENUES) {
  for (const dish of venue.dishes || []) {
    if (!dish?.id || !dish.desc) continue;
    const [a, b] = dishAlts(dish);
    pools.push({ key: `dinner.dish.${dish.id}`, extras: [a, b] });
  }
}
for (const dish of PRIVATE_FOODS) {
  if (!dish?.id || !dish.desc) continue;
  const [a, b] = dishAlts(dish);
  pools.push({ key: `dinner.dish.${dish.id}`, extras: [a, b] });
}

const seen = new Set();
const unique = pools.filter((p) => {
  if (seen.has(p.key)) return false;
  seen.add(p.key);
  return true;
});

const lines = [
  '// The Squad — Lead: A1 Mobile | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateDinnerDepth.mjs',
  '// Wildcard depth for dinner pools (Pass 33).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const { key, extras } of unique) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateDinnerDepth: ${unique.length} pools → ${OUT_PATH}`);
