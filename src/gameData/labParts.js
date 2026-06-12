// ═══════════════════════════════════════════════════════════════
// LAB PARTS & BLUEPRINT RECIPES — Talia's workshop economy
// ═══════════════════════════════════════════════════════════════
const BUILD_WEIGHT_COST_BY_TIER = { 1: 3, 2: 6, 3: 10, 4: 15 };
const MONEY_COST_BY_TIER = { 1: 50, 2: 120, 3: 250, 4: 500 };
const MIN_LBS_BY_TIER = { 1: 125, 2: 140, 3: 160, 4: 180 };

export const PARTS = {
  scrap: { id: 'scrap', label: 'Scrap Metal', icon: '🔩', desc: 'Salvaged frames, bent brackets, useful junk.' },
  circuits: { id: 'circuits', label: 'Circuit Boards', icon: '💾', desc: 'Recovered logic boards and soldered traces.' },
  servos: { id: 'servos', label: 'Servo Motors', icon: '⚙️', desc: 'Precision actuators for arms, belts, and rigs.' },
  reagents: { id: 'reagents', label: 'Reagents', icon: '🧪', desc: 'Chemical precursors for serum and paste systems.' },
  exotics: { id: 'exotics', label: 'Exotic Components', icon: '✨', desc: 'Rare parts from campus surplus and black-market bins.' },
};

export const BLUEPRINT_RECIPES = {
  auto_bloating_belt: {
    deviceDefId: 'auto_bloating_belt',
    blueprint: 'bp_bloating_belt',
    parts: { scrap: 2, servos: 1, circuits: 1 },
    money: 40,
    weightCost: 3,
    tier: 1,
  },
  auto_feeder_arm: {
    deviceDefId: 'auto_feeder_arm',
    blueprint: 'bp_feeder_arm',
    parts: { scrap: 3, servos: 2, circuits: 2 },
    money: 80,
    weightCost: 5,
    tier: 1,
  },
  calorie_paste_printer: {
    deviceDefId: 'calorie_paste_printer',
    blueprint: 'bp_paste_printer',
    parts: { circuits: 2, reagents: 2, scrap: 1 },
    money: 60,
    weightCost: 4,
    tier: 1,
    requiresResearched: ['bp_feeder_arm'],
  },
  growth_serum_injector: {
    deviceDefId: 'growth_serum_injector',
    blueprint: 'bp_serum_injector',
    parts: { reagents: 3, circuits: 1, exotics: 1 },
    money: 120,
    weightCost: 6,
    tier: 2,
  },
  weight_redistribution_rig: {
    deviceDefId: 'weight_redistribution_rig',
    blueprint: 'bp_redistribution_rig',
    parts: { servos: 3, circuits: 2, exotics: 2, scrap: 2 },
    money: 150,
    weightCost: 8,
    tier: 2,
  },
};

export function partsAcquisitionByStage(stageId) {
  const base = { scrap: 2, circuits: 1, servos: 0, reagents: 0, exotics: 0 };
  if (stageId >= 2) {
    base.servos = 1;
    base.reagents = 1;
  }
  if (stageId >= 3) {
    base.exotics = 1;
    base.circuits = 2;
  }
  return base;
}

export function mergeParts(a, b) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b || {})) {
    out[k] = (out[k] || 0) + v;
  }
  return out;
}

export function canAfford(recipe, labState, money = 0) {
  if (!recipe) return false;
  const pool = labState?.parts || {};
  for (const [k, n] of Object.entries(recipe.parts || {})) {
    if ((pool[k] || 0) < n) return false;
  }
  if ((money ?? 0) < (recipe.money || 0)) return false;
  return true;
}

export function spendRecipe(labState, recipe) {
  if (!canAfford(recipe, labState, Infinity)) return labState;
  const parts = { ...(labState.parts || {}) };
  for (const [k, n] of Object.entries(recipe.parts || {})) {
    parts[k] = (parts[k] || 0) - n;
  }
  return { ...labState, parts };
}

export function isBlueprintResearched(labState, blueprintId) {
  return (labState?.researchedBlueprints || []).includes(blueprintId);
}

export function isBlueprintBuildable(recipe, labState) {
  if (!recipe) return false;
  if (!isBlueprintResearched(labState, recipe.blueprint)) return false;
  for (const req of recipe.requiresResearched || []) {
    if (!isBlueprintResearched(labState, req)) return false;
  }
  return true;
}

export function getBuildWeightCost(recipe) {
  const tier = recipe?.tier ?? 1;
  return recipe?.weightCost ?? BUILD_WEIGHT_COST_BY_TIER[tier] ?? 3;
}

export function getBuildMoneyCost(recipe) {
  return recipe?.money ?? MONEY_COST_BY_TIER[recipe?.tier ?? 1] ?? 50;
}

export function getMinLbsForBuild(recipe) {
  const tier = recipe?.tier ?? 1;
  return MIN_LBS_BY_TIER[tier] ?? 125;
}

export function formatPartsBag(parts = {}) {
  return Object.entries(parts)
    .filter(([, qty]) => qty > 0)
    .map(([id, qty]) => ({ ...PARTS[id], id, qty }));
}

export function recipeLabel(recipe) {
  if (!recipe) return '';
  const partStr = Object.entries(recipe.parts || {})
    .map(([k, n]) => `${PARTS[k]?.icon || k}×${n}`)
    .join(' ');
  return `${partStr} · $${recipe.money} · −${getBuildWeightCost(recipe)} lbs Talia`;
}

export function devicesCraftableNow(labState) {
  return Object.values(BLUEPRINT_RECIPES).filter(r => isBlueprintBuildable(r, labState));
}

export function startLabSession(labState) {
  const stageId = labState?.stage ?? 1;
  const grant = partsAcquisitionByStage(stageId);
  return {
    stageId,
    phase: 'acquire',
    pool: mergeParts(grant, labState?.parts || {}),
    acquisitionLog: [],
    buildPlan: null,
    exposureGained: 0,
  };
}

export function applyLabAcquisition(session, choiceId, labState) {
  const grants = {
    salvage: { scrap: 2, circuits: 1 },
    campus_surplus: { servos: 1, scrap: 1 },
    reagent_run: { reagents: 2 },
    skip: {},
  };
  const grant = grants[choiceId] || grants.skip;
  return {
    ...session,
    phase: 'build',
    pool: mergeParts(session.pool || {}, grant),
    acquisitionLog: [...(session.acquisitionLog || []), choiceId],
  };
}

export function finalizeLabBuild(session, recipeId) {
  const recipe = BLUEPRINT_RECIPES[recipeId];
  if (!recipe) return session;
  return {
    ...session,
    phase: 'summary',
    buildPlan: recipeId,
    grantedDevice: recipe.deviceDefId,
  };
}
