// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — travel events, student sightings, rolls
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';
import { getCampusNarrativeTier } from './pharmacistIngredients.js';
import { CAMPUS_SOFT_FLAVOR } from './pharmacistCampus.js';
import { saturationSoftFlavorChance, saturationTravelEventBonus } from './campusSaturation.js';
import { availableSecretsAtNode, isSecretSolved, secretsSolvedCount } from './campusSecrets.js';
import { getExplorationFind, pickExplorationFind, travelFindPool, formatExplorationGrant } from './campusIngredients.js';
import { ELARA_ID, getElaraQuest, elaraQuestProgressLine } from './relicHunter.js';
import { UNLOCK_POOL_IDS } from './dorms.js';
import { rollVanceCampusEvent, rollPortionSaintEvent, rollAccreditationObserverEvent, rollAsceticGardenProtest, rollMirrorFastEvent, rollLedgerWightEvent } from './oppositionCampus.js';
import { renderCampusSighting, renderCampusTravelLine, renderCampusFindFlavor } from '../textEngine/scenes/campusExplorationText.js';
import { renderCampusScene } from '../textEngine/scenes/campus/index.js';
import { campusNodeToLocale } from './textContext.js';
import { depthExplorationFindChance, depthPassiveTrustDrip } from './mechanicsDepthLayer.js';
import { scaleExplorationFindGrants } from './campusIngredients.js';
import { maybeRollDeviceEncounter, maybeRollDeviceFlavor } from './campusDeviceEncounters.js';
import { formatSecretDiscoverLine } from '../textEngine/scenes/campus/secrets.js';

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
  if ((ctx.saturationTier ?? 0) >= 2) stageId = Math.min(11, stageId + 1);
  return stageId;
}

function campusNavSceneLine(student, ctx) {
  const stageId = effectiveStage(student, ctx);
  if (stageId < 3) return null;
  const line = renderCampusScene(student, ctx.week ?? 1, {
    locale: campusNodeToLocale(ctx.nodeId),
    campusFattening: ctx.campusFattening,
    campusTier: ctx.campusTier ?? 0,
  });
  return line?.trim() || null;
}

function pickSecretDiscoverStudent(ctx, rng) {
  const visible = (ctx.students || []).filter(st => {
    if (st.hidden && st.id !== ELARA_ID) return false;
    if (st.evolvedForm === 'pharmacist') return false;
    return true;
  });
  if (!visible.length) return null;
  return pick(rng, visible.filter(s => s.id !== 15)) || visible[0];
}

/** V2 prose for campus secret discovery — falls back to raw discover text. */
export function resolveSecretDiscoverLine(secret, ctx, nodeId, rng = Math.random) {
  if (!secret?.discover) return '';
  const student = pickSecretDiscoverStudent(ctx, rng);
  const line = student
    ? formatSecretDiscoverLine(secret, student, ctx.week ?? 1, {
      globals: { nodeId },
      v2DepthChance: 0.35,
    })
    : '';
  return line || `🔓 ${secret.discover}`;
}

function pickStudentSighting(students, ctx, rng) {
  const visible = students.filter(st => {
    if (st.hidden && st.id !== ELARA_ID) return false;
    if (st.id === ELARA_ID && !ctx.elaraDiscovered) return false;
    if (st.id === 15 && !ctx.lilithUnlocked) return false;
    if (st.evolvedForm === 'pharmacist') return false;
    return true;
  });
  if (!visible.length) return { lines: [], trustGrants: [] };

  if (ctx.lilithUnlocked && rng() < EXPLORATION_CONFIG.lilithSightingChance) {
    const lilith = visible.find(s => s.id === 15);
    if (lilith) {
      const lines = [];
      const sighting = renderCampusSighting(lilith, ctx, ctx.nodeId);
      if (sighting) lines.push(sighting);
      const nav = campusNavSceneLine(lilith, ctx);
      if (nav) lines.push(nav);
      return { lines, trustGrants: [] };
    }
  }

  const who = pick(rng, visible.filter(s => s.id !== 15));
  if (!who) return { lines: [], trustGrants: [] };
  const lines = [];
  const sighting = renderCampusSighting(who, ctx, ctx.nodeId);
  if (sighting) lines.push(sighting);
  const nav = campusNavSceneLine(who, ctx);
  if (nav) lines.push(nav);

  const trustGrants = [];
  if (who.lockState === 'locked' && UNLOCK_POOL_IDS.includes(who.id)) {
    trustGrants.push({
      studentId: who.id,
      amount: depthPassiveTrustDrip(4 + Math.floor(rng() * 4)),
    });
  }
  return { lines, trustGrants };
}

export function buildExplorationContext({
  students,
  pharmacistState,
  week,
  lilithUnlocked,
  exploration,
  labState = null,
  deviceInventory = null,
  asceticCircle = false,
  opposition = null,
  saturationTier = 0,
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
    saturationTier,
    sophiaStage: pharmacistState?.stage ?? 1,
    avgLbs,
    elaraDiscovered: !!exploration?.elaraDiscovered,
    elaraMet: !!exploration?.elaraMet,
    exploration,
    labState,
    deviceInventory,
    asceticCircle,
    opposition,
  };
}

/** Roll events when moving between nodes or looking around. */
function applyFindToEffects(find, effects) {
  if (!find?.grants) return;
  const scaled = scaleExplorationFindGrants(find.grants);
  if (scaled.foodId) effects.foodGrant = scaled.foodId;
  const ing = { ...scaled };
  delete ing.foodId;
  if (Object.keys(ing).length) effects.ingredientGrant = ing;
}

function explorationFindProse(find, travelCtx) {
  const flavor = renderCampusFindFlavor({
    ...travelCtx,
    findTier: find?.tier || null,
    findId: find?.id || null,
  })?.trim();
  return flavor || find?.text || '';
}

export function rollTravelExploration(nodeId, ctx, rng = Math.random) {
  const lines = [];
  const effects = { ingredientGrant: null, foodGrant: null, observeNode: nodeId, deviceEncounter: null };
  const travelCtx = { ...ctx, nodeId };

  if (ctx.campusFattening && rng() < 0.35) {
    lines.push(`🌿 ${pick(rng, CAMPUS_SOFT_FLAVOR)}`);
  }

  const satTier = ctx.saturationTier ?? 0;
  if (satTier > 0 && rng() < saturationSoftFlavorChance(satTier)) {
    lines.push(`🌐 ${pick(rng, CAMPUS_SOFT_FLAVOR)}`);
  }

  if (ctx.asceticCircle && rng() < 0.28) {
    const protests = [
      '🕯️ Ascetic Circle vigil at the crosswalk — shame pamphlets flutter against dining hall flyers.',
      '🕯️ Ascetic protesters chant outside the union. A few students pocket the pamphlets anyway.',
      '🕯️ The garden hosts an abstinence rally. Someone orders delivery mid-sermon.',
    ];
    lines.push(pick(rng, protests));
    effects.asceticShame = true;
  }

  const vanceLine = rollVanceCampusEvent(nodeId, ctx.opposition, rng);
  if (vanceLine) lines.push(vanceLine);

  const observerLine = rollAccreditationObserverEvent(nodeId, ctx.opposition, rng);
  if (observerLine) lines.push(observerLine);

  const gardenProtest = rollAsceticGardenProtest(nodeId, ctx.opposition, rng);
  if (gardenProtest) {
    lines.push(gardenProtest);
    effects.asceticGardenProtest = true;
  }

  const mirrorLine = rollMirrorFastEvent(nodeId, ctx.opposition, rng);
  if (mirrorLine) {
    lines.push(mirrorLine);
    effects.mirrorFastWeek = true;
  }

  const ledgerLine = rollLedgerWightEvent(nodeId, ctx.opposition, rng);
  if (ledgerLine) {
    lines.push(ledgerLine);
    effects.ledgerWightAudit = true;
  }

  const saintLine = rollPortionSaintEvent(nodeId, ctx.opposition, ctx.lilithUnlocked, rng);
  if (saintLine) {
    lines.push(saintLine);
    effects.portionSaintSpotted = true;
  }

  if (rng() < 0.28) {
    const locLine = renderCampusTravelLine(travelCtx, nodeId, 'location');
    if (locLine) lines.push(locLine);
  }

  const travelChance = EXPLORATION_CONFIG.travelEventChance + saturationTravelEventBonus(satTier);
  if (rng() < travelChance) {
    const travelLine = renderCampusTravelLine(travelCtx, nodeId, 'travel');
    if (travelLine) {
      lines.push(ctx.campusTier >= 2 && rng() < 0.35 ? `🕯️ ${travelLine}` : travelLine);
    }
  }

  if (rng() < EXPLORATION_CONFIG.studentSightingChance) {
    const { lines: sightingLines, trustGrants } = pickStudentSighting(ctx.students, travelCtx, rng);
    if (sightingLines.length) lines.push(...sightingLines);
    if (trustGrants.length) effects.trustGrants = trustGrants;
  }

  const findChance = depthExplorationFindChance(EXPLORATION_CONFIG.ingredientFindChance + satTier * 0.04);
  if (rng() < findChance) {
    const findId = pickExplorationFind(travelFindPool(nodeId, Math.max(ctx.campusTier, satTier >= 2 ? 2 : 0)), rng);
    const find = getExplorationFind(findId);
    if (find) {
      const prose = explorationFindProse(find, travelCtx);
      if (prose) lines.push(`🎒 ${prose}`);
      lines.push(`   + ${formatExplorationGrant(scaleExplorationFindGrants(find.grants))}`);
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
  const travelCtx = { ...ctx, nodeId };
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
      lines.push(resolveSecretDiscoverLine(secret, ctx, nodeId, rng));
      if (secret.reward?.findId) {
        const find = getExplorationFind(secret.reward.findId);
        if (find) {
          const prose = explorationFindProse(find, travelCtx);
          if (prose) lines.push(`🎒 ${prose}`);
          lines.push(`   + ${find.label}: ${formatExplorationGrant(scaleExplorationFindGrants(find.grants))}`);
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
  } else if (rng() < depthExplorationFindChance(EXPLORATION_CONFIG.ingredientFindChance * 1.4)) {
    const findId = pickExplorationFind(travelFindPool(nodeId, ctx.campusTier), rng);
    const find = getExplorationFind(findId);
    if (find) {
      const prose = explorationFindProse(find, travelCtx);
      if (prose) lines.push(`🎒 ${prose}`);
      lines.push(`   + ${formatExplorationGrant(scaleExplorationFindGrants(find.grants))}`);
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
