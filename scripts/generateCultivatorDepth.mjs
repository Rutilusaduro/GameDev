// Generate cultivator/depth.js — pad cultivator.* catch-all pools to ≥3 texts.
// Run: node scripts/generateCultivatorDepth.mjs
import { writeFileSync } from 'fs';
import { RECIPES, EATING_REACTIONS } from '../src/gameData/cultivator.js';

const OUT_PATH = 'src/textEngine/scenes/cultivator/depth.js';

const RENEE_KEYS = ['heavy', 'fat', 'veryFat', 'enormous', 'colossal'];
const TESTER_STAGES = [6, 7, 8, 9, 10];

const HARVEST_PLANNED = {
  heavy: [
    'The planned harvest closes cleanly. {subject.name} is gone; Reneé sits fuller, logging with flour-dusted hands.',
    'Scheduled tasting becomes scheduled consumption. Reneé records the yield, belly heavier, expression calm.',
  ],
  fat: [
    'Session ends on schedule. {subject.name} integrated; Reneé wider, warmer, satisfied with the data.',
    'Reneé completes the harvest without hurry. The kitchen feels smaller around her afterward.',
  ],
  veryFat: [
    'Reneé finishes the planned consumption — slow, deliberate, complete. Her belly rests heavier on her lap.',
    'The tester is gone. Reneé swells softer, logging every sensory detail of the transfer.',
  ],
  enormous: [
    'The apartment quiets after the planned harvest. Reneé grows larger; the cycle performed correctly.',
    'Vast yield absorbed. Reneé breathes through the integration, clinically pleased.',
  ],
  colossal: [
    'Final planned harvest complete. Reneé immobile and vast, kitchen still functioning around her.',
    'Maximum yield logged. Reneé is exactly where the cycles intended her to be.',
  ],
};

const HARVEST_EMERGENCY = {
  heavy: [
    '{subject.name} bolts mid-tasting. Reneé blocks the exit and finishes the harvest — messy timing, correct outcome.',
    'Suspicion sparks a scramble. Reneé pins the tester and consumes the yield with irritated precision.',
  ],
  fat: [
    'Panic mid-session. Reneé chases, corners, devours — annoyed at the lost control, satisfied with the mass.',
    'Emergency harvest: rushed bites, complete integration. Reneé logs the suboptimal timing without sentiment.',
  ],
  veryFat: [
    '{subject.name} tries to flee. Reneé traps her with bulk and finishes the consumption on the spot.',
    'The chase is brief. Reneé swells larger, straightening the room with clipped movements.',
  ],
  enormous: [
    'Suspicion erupts; escape fails. Reneé consumes the colossal yield despite the chaos.',
    'Emergency conditions, professional result. Reneé rests heavier, irritation visible beneath satisfaction.',
  ],
  colossal: [
    'The tester cannot move far. Reneé devours the mountain where it sits — emergency, effortless, complete.',
    'Harvest forced early. Reneé absorbs everything, vast and warmer, logging clinical displeasure.',
  ],
};

const DIGEST_EARLY = {
  heavy: [
    'Digestion begins — Reneé feels the yield settle into hips and belly, hands resting on new softness.',
    'Shortly after the feast, furniture groans louder. She processes with quiet clinical focus.',
  ],
  fat: [
    'Fresh gain spreads across Reneé\'s frame. Seams protest; she notes the distribution without distress.',
    'The apartment contracts around her widening hips. Integration proceeds on schedule.',
  ],
  veryFat: [
    'Heavy rolls deepen as the feast settles. Reneé stays seated, breathing through the addition.',
    'New mass cascades lower. She logs metabolic details with satisfied calm.',
  ],
  enormous: [
    'Colossal yield integrating. Reneé dominates the reinforced seating, room feeling permanently altered.',
    'She processes in stillness — vast, warm, professionally pleased.',
  ],
  colossal: [
    'Immense addition absorbed. Floor and furniture adjust around her anchored form.',
    'Reneé swells further in place, focused entirely on metabolic completion.',
  ],
};

const DIGEST_LATE = {
  heavy: [
    'Weeks later the feast is mostly processed. Reneé reviews logs, permanently softer, movements precise again.',
    'Integration complete enough to bake again. Permanent changes noted without regret.',
  ],
  fat: [
    'The yield has settled into new proportions. Reneé moves with returning clinical grace.',
    'Long digestion closes. She is heavier than before — exactly as planned.',
  ],
  veryFat: [
    'Processing finishes across slow weeks. Reneé rests as a soft mountain, cycle closed.',
    'Her vast frame has stabilized. Hunger returns — already planning the next batch.',
  ],
  enormous: [
    'Extended integration complete. Reneé reviews data from within her immense softness.',
    'The apartment adapted. She is satisfied and ready for what comes next.',
  ],
  colossal: [
    'Final digestion settles. Reneé immobile, complete, kitchen still functional nearby.',
    'Maximum integration logged. She regards the room with calm authority.',
  ],
};

const STAGE_UP = {
  6: [
    '{subject.name} mentions new clothes like logistics. Appetite improved; she eats without being asked.',
    'Wider middle, careful sitting — she does not dramatize the gain. She does eat everything.',
  ],
  7: [
    '{subject.name} moves heavier through the room. "Must be stress," she says, already eyeing the plate.',
    'More of her to settle into chairs. Hunger undisguised; restraint abandoned.',
  ],
  8: [
    '{subject.name} fills the space now — deliberate movement, complete appetite, no pretense left.',
    'Size simply present. She checks the chair, eats thoroughly, says nothing that needs saying.',
  ],
  9: [
    '{subject.name} calculates doorways and chair widths. Schedule unchanged; appetite unchanged; bag wider.',
    'Very large, very present. She eats with the thoroughness of someone past negotiation.',
  ],
};

const GROWTH = [
  'New weight integrates into Reneé\'s frame — chair creaks, notes update, outcome correct.',
  'She feels the harvest settle: belly heavier, hips wider, professional satisfaction intact.',
];

const EATING_ALT = [
  'She eats steadily — appetite cooperating, suspicion quiet for now.',
  'Empty dish, fuller middle. Another session logged without incident.',
  'The tester finishes without comment. Reneé watches, measuring appetite against expectation.',
  'Plates cleared. Belly rounder. Suspicion flickers, then subsides under sweetness.',
  'She pauses once, then continues. Reneé notes it and serves the next course anyway.',
];

const INTRO_ALT = {
  milkshake: [
    'The blender hums. {subject.name} arrives to find Reneé already measuring portions.',
    'Cold glass, warm kitchen — {subject.name} sits for another calibrated indulgence.',
  ],
  cookies: [
    'Oven heat lingers. {subject.name} smells sugar before she reaches the chair.',
    'Fresh batch cooling. {subject.name} arrives exactly on time — Reneé planned it that way.',
  ],
  cake: [
    'The cake cools on the rack. {subject.name} watches frosting set like it is a deadline.',
    'Four decisions stand between now and departure. {subject.name} is already patient enough to wait.',
  ],
};

const CHOICE_ALT = [
  'She accepts without suspicion — appetite doing the persuasion.',
  'She comments on richness, then finishes anyway. Reneé notes the compliance.',
  'Portion down, belly rounding. Another variable locked in the recipe.',
];

const POOL_ALTS = {};

for (const rk of RENEE_KEYS) {
  for (const t of TESTER_STAGES) {
    POOL_ALTS[`cultivator.harvest.planned.${rk}.t${t}`] = HARVEST_PLANNED[rk];
    POOL_ALTS[`cultivator.harvest.emergency.${rk}.t${t}`] = HARVEST_EMERGENCY[rk];
  }
}

for (const stage of [6, 7, 8, 9]) {
  POOL_ALTS[`cultivator.stageUp.t${stage}`] = STAGE_UP[stage];
}

POOL_ALTS['cultivator.recruitment'] = [
  'Reneé reads appetite the way others read tells — who returns uninvited, who studies the empty dish.',
  'She keeps a short list of names. The next tester will be chosen soon.',
];

for (const rk of ['heavy', 'fat', 'veryFat', 'enormous', 'colossal']) {
  const slots = rk === 'enormous' || rk === 'colossal'
    ? ['earlyPlus1', 'earlyPlus2', 'earlyPlus3', 'latePlus1', 'latePlus2']
    : ['earlyPlus1', 'earlyPlus2', 'earlyPlus3', 'latePlus1', 'latePlus2', 'latePlus3'];
  for (const slot of slots) {
    const isEarly = slot.startsWith('early');
    POOL_ALTS[`cultivator.digest.${rk}.${slot}`] = isEarly ? DIGEST_EARLY[rk] : DIGEST_LATE[rk];
  }
}
POOL_ALTS['cultivator.digest.blob.early'] = [
  'Final feast integrating. Reneé becomes immobile mass; the apartment reorganizes around her.',
  'Digestion at maximum scale — floor groans, Reneé breathes slow, satisfied.',
];
POOL_ALTS['cultivator.digest.blob.late'] = [
  'Weeks of processing complete. Reneé remains vast, calm, kitchen still functional.',
  'Integration finished. Visitors find her clinical eyes within endless softness.',
];

for (let s = 5; s <= 9; s += 1) {
  const maxJ = s >= 9 ? 1 : s >= 8 ? 2 : 3;
  for (let j = 1; j <= maxJ; j += 1) {
    POOL_ALTS[`cultivator.growth.s${s}.j${j}`] = GROWTH;
  }
}
POOL_ALTS['cultivator.growth.blob'] = [
  'Reneé swells into true immobility — vast belly, rearranged room, cycle perfected.',
  'Final growth complete. She breathes slow inside her own enormity, exactly where she belongs.',
];

EATING_REACTIONS.forEach((_, tier) => {
  POOL_ALTS[`cultivator.eating.s${tier}`] = [
    EATING_ALT[tier % EATING_ALT.length],
    EATING_ALT[(tier + 1) % EATING_ALT.length],
  ];
});
POOL_ALTS['cultivator.eating'] = [
  '{cultivator.eating.s0}',
  '{cultivator.eating.s1}',
];

for (const [recipeId, recipe] of Object.entries(RECIPES)) {
  POOL_ALTS[`cultivator.intro.${recipeId}`] = INTRO_ALT[recipeId] || [
    `{subject.name} arrives. Reneé has already begun preparation.`,
    'Warm kitchen, measured portions — another session opens.',
  ];
  recipe.junctions?.forEach((junction, jIdx) => {
    const alts = junction.choices?.slice(0, 2).map((c) => `{cultivator.choice.${recipeId}.${c.id}}`) || [];
    if (alts.length < 2) alts.push(`{cultivator.choice.${recipeId}.${junction.choices[0]?.id}}`);
    POOL_ALTS[`cultivator.junction.${recipeId}.j${jIdx}`] = alts.slice(0, 2);
    junction.choices?.forEach(() => {
      // filled per choice below
    });
  });
  recipe.junctions?.forEach((junction) => {
    junction.choices?.forEach((choice) => {
      POOL_ALTS[`cultivator.choice.${recipeId}.${choice.id}`] = CHOICE_ALT;
    });
  });
}

POOL_ALTS['cultivator.beat'] = [
  '{cultivator.reaction}',
  '{cultivator.reaction}',
];

function esc(s) {
  return JSON.stringify(s);
}

const lines = [
  '// The Squad — Lead: A4 Architect | Support: A2 Psych',
  '// Auto-generated — run: node scripts/generateCultivatorDepth.mjs',
  '// Wildcard depth for cultivator pools (Pass 41).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

for (const [key, extras] of Object.entries(POOL_ALTS)) {
  const textList = extras.map((t) => esc(t)).join(', ');
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
}

writeFileSync(OUT_PATH, `${lines.join('\n')}\n`);
console.log(`generateCultivatorDepth: ${Object.keys(POOL_ALTS).length} pools → ${OUT_PATH}`);
