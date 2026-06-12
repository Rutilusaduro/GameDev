// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — travel events, student sightings, rolls
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';
import { getCampusNarrativeTier } from './pharmacistIngredients.js';
import { CAMPUS_SOFT_FLAVOR } from './pharmacistCampus.js';
import { availableSecretsAtNode, isSecretSolved, secretsSolvedCount } from './campusSecrets.js';
import { getExplorationFind, pickExplorationFind, travelFindPool, formatExplorationGrant } from './campusIngredients.js';
import { ELARA_ID, getElaraQuest, elaraQuestProgressLine } from './relicHunter.js';
import '../textEngine/scenes/campusExplorationText.js';
import { renderCampusSighting, renderCampusTravelLine, renderCampusFindFlavor } from '../textEngine/scenes/campusExplorationText.js';
import { maybeRollDeviceEncounter, maybeRollDeviceFlavor } from './campusDeviceEncounters.js';

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
    elaraMet: false,
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
    if (lilith) return renderCampusSighting(lilith, ctx, ctx.nodeId);
  }

  const who = pick(rng, visible.filter(s => s.id !== 15));
  if (!who) return null;
  return renderCampusSighting(who, ctx, ctx.nodeId);
}

export function buildExplorationContext({
  students,
  pharmacistState,
  week,
  lilithUnlocked,
  exploration,
  labState = null,
  deviceInventory = null,
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
    elaraMet: !!exploration?.elaraMet,
    exploration,
    labState,
    deviceInventory,
  };
}

/** Roll events when moving between nodes or looking around. */
function applyFindToEffects(find, effects) {
  if (!find?.grants) return;
  if (find.grants.foodId) effects.foodGrant = find.grants.foodId;
  const ing = { ...find.grants };
  delete ing.foodId;
  if (Object.keys(ing).length) effects.ingredientGrant = ing;
}

export function rollTravelExploration(nodeId, ctx, rng = Math.random) {
  const lines = [];
  const effects = { ingredientGrant: null, foodGrant: null, observeNode: nodeId, deviceEncounter: null };
  const travelCtx = { ...ctx, nodeId };

  if (ctx.campusFattening && rng() < 0.35) {
    lines.push(`🌿 ${pick(rng, CAMPUS_SOFT_FLAVOR)}`);
  }

  if (rng() < 0.28) {
    const locLine = renderCampusTravelLine(travelCtx, nodeId, 'location');
    if (locLine) lines.push(locLine);
  }

  if (rng() < EXPLORATION_CONFIG.travelEventChance) {
    const travelLine = renderCampusTravelLine(travelCtx, nodeId, 'travel');
    if (travelLine) {
      lines.push(ctx.campusTier >= 2 && rng() < 0.35 ? `🕯️ ${travelLine}` : travelLine);
    }
  }

  if (rng() < EXPLORATION_CONFIG.studentSightingChance) {
    const sighting = pickStudentSighting(ctx.students, travelCtx, rng);
    if (sighting) lines.push(sighting);
  }

  if (rng() < EXPLORATION_CONFIG.ingredientFindChance) {
    const findId = pickExplorationFind(travelFindPool(nodeId, ctx.campusTier), rng);
    const find = getExplorationFind(findId);
    if (find) {
      lines.push(`🎒 ${find.text}`);
      lines.push(`   + ${formatExplorationGrant(find.grants)}`);
      applyFindToEffects(find, effects);
    }
  }

  if (ctx.exploration?.elaraMet) {
    const questLine = elaraQuestProgressLine(ctx.exploration, nodeId, ctx);
    if (questLine) lines.push(questLine);
  }

  const flavor = maybeRollDeviceFlavor(nodeId, ctx, rng);
  if (flavor) lines.push(flavor.line);

  const encounter = maybeRollDeviceEncounter(nodeId, ctx, rng);
  if (encounter) {
    effects.deviceEncounter = encounter;
    lines.push(encounter.openingLine);
  }

  return { lines, effects };
}

/** Active search for secrets and extra finds. */
export function searchCampusLocation(nodeId, exploration, ctx, rng = Math.random) {
  const lines = [`🔍 You take time to search ${nodeId.replace(/_/g, ' ')} carefully.`];
  const effects = {
    solvedSecret: null,
    ingredientGrant: null,
    foodGrant: null,
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
          applyFindToEffects(find, effects);
        }
      }
      if (secret.reward?.discoverElara) {
        effects.discoverElara = true;
        lines.push(`👋 Indiana Bones — The Relic Hunter — has noticed you. "You found the basement too," she says. "Guess we are on the same map."`);
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
      applyFindToEffects(find, effects);
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
    elaraMet: !!exploration?.elaraMet,
    questLabel: quest?.label || null,
    questStep: exploration?.questStep ?? 0,
    questSteps: quest?.steps?.length ?? 0,
  };
}
