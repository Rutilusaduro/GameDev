// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — travel events, student sightings, rolls
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';
import { getCampusNarrativeTier } from './pharmacistIngredients.js';
import { CAMPUS_SOFT_FLAVOR } from './pharmacistCampus.js';
import { availableSecretsAtNode, isSecretSolved, secretsSolvedCount } from './campusSecrets.js';
import { getExplorationFind, pickExplorationFind, travelFindPool, formatExplorationGrant } from './campusIngredients.js';
import { ELARA_ID, getElaraQuest, elaraQuestProgressLine } from './relicHunter.js';

export const EXPLORATION_CONFIG = {
  travelEventChance: 0.62,
  searchSecretChance: 0.38,
  ingredientFindChance: 0.22,
  lilithSightingChance: 0.04,
  studentSightingChance: 0.48,
};

export function defaultCampusExplorationState() {
  return {
    secretsSolved: [],
    elaraDiscovered: false,
    questId: null,
    questStep: 0,
    observeCounts: {},
    totalSearches: 0,
  };
}

export function weightBand(stageId) {
  if (stageId <= 2) return 'lean';
  if (stageId <= 5) return 'mid';
  if (stageId <= 8) return 'heavy';
  return 'extreme';
}

/** Featured students from design doc + others fall back to generic. */
const STUDENT_SIGHTINGS = {
  0: { // Brittany
    lean: [
      (s) => `${s.name} runs the quad perimeter with the squad — ponytail sharp, voice carrying, every cheer landing on beat.`,
      (s) => `You spot ${s.name} drilling formations on the lawn. She barks timing corrections without breaking a sweat.`,
    ],
    mid: [
      (s) => `${s.name} still leads practice, but she pauses between sets to drain a protein shake — a second bottle waits on the bench.`,
      (s) => `${s.name}'s uniform strains at the seams while she calls counts from the center. She refuses to sit out. She should, probably.`,
    ],
    heavy: [
      (s) => `${s.name} commands from the sidelines now, megaphone in hand, cheerleaders orbiting her with snacks. She eats between orders without missing a beat.`,
      (s) => `Practice slows around ${s.name} — she tries one sprint, gets winded, laughs it off, and sends two juniors for more shakes.`,
    ],
    extreme: [
      (s) => `${s.name} holds court from a reinforced bench, belly spilling past her knees, still directing the squad with terrifying authority. Eating is part of the warm-up now.`,
      (s) => `Two cheerleaders help ${s.name} stand so she can demonstrate a move. She makes it halfway, claps anyway, and demands pasta for the team.`,
    ],
  },
  1: { // Madeline
    lean: [
      (s) => `${s.name} is buried in a library carrel, glasses sliding, three color-coded stacks of sociology texts.`,
      (s) => `You pass ${s.name} in a quiet corner — she mutters citations under her breath and does not notice you.`,
    ],
    mid: [
      (s) => `${s.name} has annexed a snack shelf into her carrel. Highlighting continues. Crumbs continue. She calls it "methodology."`,
      (s) => `${s.name} knocks a stack of books with her hip, flushes, and keeps reading while unwrapping a granola bar with her teeth.`,
    ],
    heavy: [
      (s) => `${s.name} barely fits in her usual carrel — she turned the neighboring one into a snack annex and a footrest.`,
      (s) => `A librarian pretends not to see ${s.name} eating a full lunch in the silent stacks. ${s.name} pretends not to see the librarian pretending.`,
    ],
    extreme: [
      (s) => `${s.name} has claimed two tables. Belly pressed to the edge, she annotates a paper on "embodied campus culture" while finishing a third pastry.`,
      (s) => `${s.name} tries to squeeze between shelves, fails gently, and documents the attempt in her notes without stopping chewing.`,
    ],
  },
  2: { // Kylie
    lean: [
      (s) => `${s.name} films B-roll by the fountain — angles precise, lighting checked twice, every gesture brand-ready.`,
      (s) => `${s.name} poses for a thumbnail at the café window. She retakes it four times. The fourth is worse. She posts it.`,
    ],
    mid: [
      (s) => `${s.name}'s content has shifted: "curvy campus diaries" plays from her phone while she films a what-I-eat segment on the quad bench.`,
      (s) => `She adjusts the ring light around a tighter waistband and keeps filming. Comments love it. ${s.name} reads them while chewing.`,
    ],
    heavy: [
      (s) => `${s.name} needs a friend to hold the camera higher — the old angles do not clear her belly anymore. She calls it "authentic."`,
      (s) => `A "body positivity haul" wraps mid-shoot because ${s.name} runs out of frame. She keeps the blooper. Engagement spikes.`,
    ],
    extreme: [
      (s) => `${s.name} films from a seated position only now — vast, composed, eating on camera with the serenity of someone who has monetized inevitability.`,
      (s) => `Two assistants angle lights around ${s.name}'s belly while she narrates a sponsored meal. She has never been more on-brand.`,
    ],
  },
  3: { // Serena
    lean: [
      (s) => `${s.name} blurs past on the track — compression gear, jaw set, times logged in her head after every lap.`,
      (s) => `Post-practice ${s.name} stretches on the bleachers, shaking out her legs like she could run again immediately.`,
    ],
    mid: [
      (s) => `${s.name} finishes intervals winded, stares at her watch, and attacks a pasta container with frustrated precision.`,
      (s) => `She still trains hard — but the recovery shakes have doubled, and she scowls at numbers that will not cooperate.`,
    ],
    heavy: [
      (s) => `${s.name} attempts sprints, stops after two, and fuels anyway — "maintenance," she says, through a mouthful of noodles.`,
      (s) => `On the bleachers, ${s.name} eats while watching freshmen run. Her expression is not jealousy. It is hunger with statistics.`,
    ],
    extreme: [
      (s) => `${s.name} wheezes through a single lap, sits heavily, and keeps eating "for when the times come back." They will not come back soon.`,
      (s) => `She tapes an ankle she does not need and orders delivery to the track. Training is theoretical now. Fueling is not.`,
    ],
  },
  10: { // Reneé
    lean: [
      (s) => `${s.name} tastes something from a takeout container, frowns, adjusts seasoning, and offers you a bite without looking up.`,
      (s) => `The food court smells like ${s.name}'s latest test batch before you see her — flour on her cheek, focus absolute.`,
    ],
    mid: [
      (s) => `${s.name} plates samples for strangers with evangelical warmth. She eats every failed batch. There are many failed batches.`,
      (s) => `She whispers "needs more fat" over a tray and eats the correction with a spoon. Campus lines up anyway.`,
    ],
    heavy: [
      (s) => `${s.name} runs a tasting table from a reinforced stool — belly forward, hands busy, every passerby leaves heavier.`,
      (s) => `Students orbit ${s.name}'s pop-up like a planet. She feeds them and herself in the same rhythm, humming.`,
    ],
    extreme: [
      (s) => `${s.name} has turned a corner of the court into a feeding station. She does not leave. Nobody asks her to.`,
      (s) => `She licks a spoon, declares a batch "perfect," and slides a second portion into her own bowl before anyone else can protest.`,
    ],
  },
  11: { // Kaylee
    lean: [
      (s) => `${s.name} checks on a freshman with a thermos and a tone that brooks no argument about sleep or meals.`,
      (s) => `She carries extra snacks in her clinical bag — "just in case," she says, already opening one for someone else.`,
    ],
    mid: [
      (s) => `${s.name} "takes care of" half her floor — Tupperwares appear, weights creep up, she calls it wellness.`,
      (s) => `She sits with a student, insists on seconds, and eats alongside her "so it is not weird." It is still weird. It works.`,
    ],
    heavy: [
      (s) => `${s.name}'s nurturing has scaled — she coordinates group meals from a couch she barely leaves, belly soft, voice warm.`,
      (s) => `She takes vitals, then orders pizza for the whole study group. "Stress management," she says, eating crust first.`,
    ],
    extreme: [
      (s) => `${s.name} hosts open-door comfort hours. Everyone leaves fed. So does she — continuously, absently, like breathing.`,
      (s) => `Her bag is empty of supplies and full of snacks. She is the supply now — round, steady, impossible to refuse.`,
    ],
  },
  13: { // Daisy
    lean: [
      (s) => `${s.name} hands out homemade cookies before anyone asks. She smells like vanilla and grading rubrics.`,
      (s) => `She coaxes a quiet student into eating lunch on the quad bench — mom-coded concern, no embarrassment allowed.`,
    ],
    mid: [
      (s) => `${s.name}'s snack bag has become a tote. She feeds practicum students between observations and nibbles constantly herself.`,
      (s) => `She packs extra lunches "by mistake" again. Her sweater rides up. Nobody returns the food.`,
    ],
    heavy: [
      (s) => `${s.name} holds office hours with a crockpot. Students eat. She eats. Lesson plans wait.`,
      (s) => `She waddles between classrooms with foil trays — nurturing at scale, belly leading, smile unwavering.`,
    ],
    extreme: [
      (s) => `${s.name} has a permanent snack station outside the education wing. She presides, vast and gentle, until everyone is full.`,
      (s) => `She tries to tie an apron. Gives up. Feeds the class anyway from a chair that creaks heroically.`,
    ],
  },
  15: { // Lilith — rare
    lean: [
      (s) => `For a split second you think you see ${s.name} at the edge of the crowd — still, dark clothes, gone when you blink.`,
      (s) => `A chill passes through the quad. Someone mentions ${s.name}. No one can point to where she was.`,
    ],
    mid: [
      (s) => `${s.name} watches from a doorway you could swear was empty. Her smile does not reach the rest of her face.`,
      (s) => `You find a chair still warm. ${s.name}'s name is scratched into the armrest. The scratch looks fresh.`,
    ],
    heavy: [
      (s) => `${s.name} sits perfectly still on a bench until every other student leaves. Then she eats something you did not see her bring.`,
      (s) => `She passes close enough to touch. You smell iron and sugar. When you turn, only a wrapper remains.`,
    ],
    extreme: [
      (s) => `${s.name} occupies a corner of the union like a predator at a watering hole. Conversations quiet. Appetites do not.`,
      (s) => `Students avoid a bench she uses. It sags in the middle now. ${s.name} is not there. The avoidance persists.`,
    ],
  },
};

const GENERIC_SIGHTINGS = {
  lean: [
    (s) => `You spot ${s.name} between classes — light on her feet, schedule in hand.`,
    (s) => `${s.name} waves from across the path, still moving like the campus is hers.`,
  ],
  mid: [
    (s) => `${s.name} lingers on a bench with a full lunch, uniform a little tighter than last month.`,
    (s) => `You pass ${s.name} — slower now, snack in hand, unbothered by the change.`,
  ],
  heavy: [
    (s) => `${s.name} holds court at a table, belly forward, friends orbiting with refills.`,
    (s) => `${s.name} crosses the quad unhurriedly. People make room without thinking.`,
  ],
  extreme: [
    (s) => `${s.name} has become a landmark — installed, fed, content.`,
    (s) => `Campus routes around ${s.name} now. She seems to prefer it that way.`,
  ],
};

const ATMOSPHERIC_EVENTS = [
  () => 'A food truck plays lo-fi while the line doubles. Nobody leaves.',
  () => 'Two students compare meal-plan hacks. Both plans have expanded since September.',
  () => 'The breeze carries fried sugar from three directions at once.',
  () => 'Someone naps on a bench with a half-eaten pastry balanced on their stomach like a trophy.',
  () => 'A tour group passes. The guide skips the old gym photos. The new ones are more honest.',
];

const SOCIAL_EVENTS = [
  () => 'A study group converts a whiteboard into a snack roster. Academics are listed second.',
  () => 'Roommates argue about whose turn it is to order. Both phones already have carts open.',
  () => 'A club fair booth offers "free samples" with portions that are not free in any moral sense.',
];

const RISK_EVENTS = [
  () => 'A facilities worker eyes a reinforced bench and makes a note. You do not ask what it says.',
  () => 'Campus security asks if you have seen "unauthorized tunnel access." You have. You say nothing.',
  () => 'A dean walks past a feeding circle too fast to comment. The comment will come later.',
];

const CORRUPTION_EVENTS = [
  () => 'Students whisper "wellness solutions" like a password. Someone hands out samples with devotional care.',
  () => 'A group eats in synchronized silence. They smile at the same time. It is not natural.',
  () => 'Graffiti under the union stairs: SATURATE. The paint is still wet.',
  () => 'A girl thanks "the pharmacist" to no one in particular, and eats until she forgets why she started.',
];

const LOCATION_FLAVOR = {
  quad: [
    () => 'Food trucks idle in a row like predators that learned parking etiquette.',
    () => 'The lawn has more blankets than grass on a weekday afternoon.',
  ],
  library: [
    () => 'The third floor smells like coffee and surrender.',
    () => 'Someone snores gently between stacks. A textbook rises and falls on their belly.',
  ],
  dining_hall: [
    () => 'The dessert station has a queue that behaves like a single organism.',
    () => 'A staff member plates a fourth serving without being asked.',
  ],
  gym: [
    () => 'The juice bar blender never stops during peak hours.',
    () => 'A poster advertises "recovery" portions the size of small pets.',
  ],
  garden: [
    () => 'Fruit trees lean slightly toward the path, as if offering.',
    () => 'A greenhouse fan hums. Inside, someone is eating something not on the syllabus.',
  ],
};

function pick(rng, arr) {
  if (!arr?.length) return null;
  return arr[Math.floor(rng() * arr.length)];
}

function effectiveStage(student, ctx) {
  let stageId = getStage(student.lbs).id;
  if (ctx.campusFattening) stageId = Math.min(11, stageId + 1);
  if (ctx.campusTier >= 2) stageId = Math.min(11, stageId + 1);
  return stageId;
}

function pickStudentSighting(students, ctx, rng) {
  const visible = students.filter(st => {
    if (st.hidden && st.id !== ELARA_ID) return false;
    if (st.id === ELARA_ID && !ctx.elaraDiscovered) return false;
    if (st.id === 15 && !ctx.lilithUnlocked) return false;
    if (st.evolvedForm === 'pharmacist') return false;
    return true;
  });
  if (!visible.length) return null;

  if (ctx.lilithUnlocked && rng() < EXPLORATION_CONFIG.lilithSightingChance) {
    const lilith = visible.find(s => s.id === 15);
    if (lilith) {
      const band = weightBand(effectiveStage(lilith, ctx));
      const pool = STUDENT_SIGHTINGS[15]?.[band] || GENERIC_SIGHTINGS[band];
      const fn = pick(rng, pool);
      return fn ? `👁 ${fn(lilith)}` : null;
    }
  }

  const who = pick(rng, visible.filter(s => s.id !== 15));
  if (!who) return null;
  const band = weightBand(effectiveStage(who, ctx));
  const featured = STUDENT_SIGHTINGS[who.id]?.[band];
  const pool = featured || GENERIC_SIGHTINGS[band];
  const fn = pick(rng, pool);
  return fn ? `👁 ${fn(who)}` : null;
}

export function buildExplorationContext({
  students,
  pharmacistState,
  week,
  lilithUnlocked,
  exploration,
}) {
  const campusTier = getCampusNarrativeTier(pharmacistState);
  const avgLbs = students.length
    ? students.filter(s => !s.hidden).reduce((a, s) => a + s.lbs, 0) / students.filter(s => !s.hidden).length
    : 130;
  return {
    students,
    week,
    lilithUnlocked,
    campusFattening: !!pharmacistState?.campusFattening,
    campusTier,
    sophiaStage: pharmacistState?.stage ?? 1,
    avgLbs,
    elaraDiscovered: !!exploration?.elaraDiscovered,
    exploration,
  };
}

/** Roll events when moving between nodes or looking around. */
export function rollTravelExploration(nodeId, ctx, rng = Math.random) {
  const lines = [];
  const effects = { ingredientGrant: null, observeNode: nodeId };

  if (ctx.campusFattening && rng() < 0.35) {
    lines.push(`🌿 ${pick(rng, CAMPUS_SOFT_FLAVOR)}`);
  }

  const locPool = LOCATION_FLAVOR[nodeId];
  if (locPool && rng() < 0.25) {
    const fn = pick(rng, locPool);
    if (fn) lines.push(fn());
  }

  if (rng() < EXPLORATION_CONFIG.travelEventChance) {
    const tier = ctx.campusTier;
    const roll = rng();
    if (tier >= 2 && roll < 0.22) {
      lines.push(`🕯️ ${pick(rng, CORRUPTION_EVENTS)()}`);
    } else if (roll < 0.35) {
      lines.push(pick(rng, SOCIAL_EVENTS)());
    } else if (roll < 0.48 && tier >= 1) {
      lines.push(`⚠️ ${pick(rng, RISK_EVENTS)()}`);
    } else if (roll < 0.7) {
      lines.push(pick(rng, ATMOSPHERIC_EVENTS)());
    }
  }

  if (rng() < EXPLORATION_CONFIG.studentSightingChance) {
    const sighting = pickStudentSighting(ctx.students, ctx, rng);
    if (sighting) lines.push(sighting);
  }

  if (rng() < EXPLORATION_CONFIG.ingredientFindChance) {
    const findId = pickExplorationFind(travelFindPool(nodeId, ctx.campusTier), rng);
    const find = getExplorationFind(findId);
    if (find) {
      lines.push(`🎒 ${find.text}`);
      lines.push(`   + ${formatExplorationGrant(find.grants)}`);
      effects.ingredientGrant = find.grants;
    }
  }

  const questLine = elaraQuestProgressLine(ctx.exploration, nodeId, ctx);
  if (questLine) lines.push(questLine);

  return { lines, effects };
}

/** Active search for secrets and extra finds. */
export function searchCampusLocation(nodeId, exploration, ctx, rng = Math.random) {
  const lines = [`🔍 You take time to search ${nodeId.replace(/_/g, ' ')} carefully.`];
  const effects = {
    solvedSecret: null,
    ingredientGrant: null,
    discoverElara: false,
    observeIncrement: false,
  };
  const nextExploration = {
    ...exploration,
    totalSearches: (exploration.totalSearches || 0) + 1,
    observeCounts: { ...exploration.observeCounts },
  };

  const available = availableSecretsAtNode(nodeId, exploration, ctx);
  for (const secret of available) {
    if (secret.solve === 'observe') {
      const count = (nextExploration.observeCounts[nodeId] || 0) + 1;
      nextExploration.observeCounts[nodeId] = count;
      effects.observeIncrement = true;
      if (count < (secret.observeCount || 2)) {
        lines.push(`…${secret.hint} (${count}/${secret.observeCount || 2} observations)`);
        return { lines, effects, exploration: nextExploration };
      }
    }
    if (secret.solve === 'search' && rng() < EXPLORATION_CONFIG.searchSecretChance) {
      effects.solvedSecret = secret.id;
      lines.push(`🔓 ${secret.discover}`);
      if (secret.reward?.findId) {
        const find = getExplorationFind(secret.reward.findId);
        if (find) {
          lines.push(`   + ${find.label}: ${formatExplorationGrant(find.grants)}`);
          effects.ingredientGrant = find.grants;
        }
      }
      if (secret.reward?.discoverElara) {
        effects.discoverElara = true;
        lines.push(`👋 Elara Voss — The Relic Hunter — has noticed you. "You found the basement too," she says. "Guess we are on the same map."`);
      }
      return { lines, effects, exploration: nextExploration };
    }
  }

  if (available.length) {
    const hint = available[0];
    lines.push(`…nothing yet. ${hint.hint}`);
  } else if (rng() < EXPLORATION_CONFIG.ingredientFindChance * 1.4) {
    const findId = pickExplorationFind(travelFindPool(nodeId, ctx.campusTier), rng);
    const find = getExplorationFind(findId);
    if (find) {
      lines.push(`🎒 ${find.text}`);
      lines.push(`   + ${formatExplorationGrant(find.grants)}`);
      effects.ingredientGrant = find.grants;
    }
  } else {
    lines.push('…just ordinary campus clutter today.');
  }

  return { lines, effects, exploration: nextExploration };
}

export function applySecretSolve(exploration, secretId) {
  if (!secretId || isSecretSolved(exploration, secretId)) return exploration;
  return {
    ...exploration,
    secretsSolved: [...(exploration.secretsSolved || []), secretId],
  };
}

export function explorationSummary(exploration) {
  const solved = secretsSolvedCount(exploration);
  const quest = getElaraQuest(exploration?.questId);
  return {
    secretsSolved: solved,
    secretsTotal: 10,
    elaraDiscovered: !!exploration?.elaraDiscovered,
    questLabel: quest?.label || null,
    questStep: exploration?.questStep ?? 0,
    questSteps: quest?.steps?.length ?? 0,
  };
}
