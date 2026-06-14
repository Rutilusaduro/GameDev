// ═══════════════════════════════════════════════════════════════
// TALIA VALE — Inventor path & lab state (device workshop only)
// ═══════════════════════════════════════════════════════════════
import { partsAcquisitionByStage } from './labParts.js';
import { defaultNetworkState, ensureNetwork } from './networkState.js';
import {
  initialUnlockedTech,
  applyStageTechUnlocks,
  rollSessionBreakthroughs,
} from './labTechTree.js';

export const TALIA_STUDENT_ID = 18;

export const INVENTOR_PATH_STAGES = [
  {
    id: 1,
    key: 'inventor',
    label: 'The Inventor',
    desc: 'Hands-on device builds, private workshop experiments, and equipping prototypes on your students.',
    unlockNote: 'Active — gather parts, research blueprints, build inventions.',
  },
];

export const LAB_BUILD_CONFIG = {
  buildWeightCostByTier: { 1: 3, 2: 6, 3: 10 },
  moneyCostByTier: { 1: 50, 2: 120, 3: 250 },
  apCost: 1,
  minLbsByTier: { 1: 125, 2: 140, 3: 160 },
};

export const INVENTOR_ACTIVITIES = {
  1: {
    label: '🔧 Run Lab Session',
    apCost: 1,
    desc: 'Gather parts, research blueprints, and build inventions. Talia spends her own mass as raw material.',
    taliaGain: [2, 5],
    instability: 5,
  },
};

export const LAB_ACQUISITION_OPTIONS = {
  1: [
    { id: 'salvage', label: 'Salvage the engineering scrap pile', grant: 'scrap + circuits' },
    { id: 'campus_surplus', label: 'Raid campus surplus lockers', grant: 'servos + scrap' },
    { id: 'reagent_run', label: 'Pick up lab reagents on credit', grant: 'reagents' },
    { id: 'skip', label: 'Skip — use saved stock', grant: 'none' },
  ],
};

export const LAB_SESSION_ACTIVITY = {
  apCost: 1,
  taliaGain: [2, 5],
  instability: 5,
};

const STAGE_SESSION_THRESHOLDS = [0, 8, 18];

export function defaultLabState() {
  return {
    stage: 1,
    instability: 0,
    sessionsRun: 0,
    breakthroughs: 4,
    unlockedTech: initialUnlockedTech(),
    researchedBlueprints: [],
    parts: partsAcquisitionByStage(1),
    maintenanceDebt: 0,
    builtThisSession: [],
  };
}

export function defaultDeviceInventory() {
  return {};
}

export function initDeviceState() {
  return {
    equip: {
      head: null,
      neck: null,
      back: null,
      waist: null,
      arms: null,
      legs: null,
      fullBody: null,
    },
    bodyOverride: null,
    deviceDependence: {},
    deviceState: {
      furnitureComfort: 100,
    },
  };
}

export function maybeAdvanceInventorStage(state) {
  const sessions = state.sessionsRun ?? 0;
  let stage = 1;
  for (let i = STAGE_SESSION_THRESHOLDS.length - 1; i >= 0; i--) {
    if (sessions >= STAGE_SESSION_THRESHOLDS[i]) stage = i + 1;
  }
  stage = Math.min(3, stage);
  if (stage <= (state.stage ?? 1)) return state;
  let next = { ...state, stage };
  if (stage >= 2 && !next.network) {
    next.network = defaultNetworkState(stage);
  }
  const breakthroughBonus = stage === 2 ? 6 : stage === 3 ? 10 : 0;
  next.breakthroughs = (next.breakthroughs ?? 0) + breakthroughBonus;
  next = applyStageTechUnlocks(next, stage);
  return ensureNetwork(next);
}

export function completeLabSession(state, session, builtDeviceId = null, rng = Math.random) {
  if (!state || !session) return state;
  let next = { ...state };
  next.sessionsRun = (next.sessionsRun ?? 0) + 1;
  next.parts = session.poolAfter || session.pool || next.parts;
  next.instability = Math.min(100, (next.instability ?? 0) + (session.instabilityGained ?? 5));
  const btGain = session.breakthroughsGained ?? rollSessionBreakthroughs(rng);
  next.breakthroughs = (next.breakthroughs ?? 0) + btGain;
  if (builtDeviceId) {
    next.builtThisSession = [...(next.builtThisSession || []), builtDeviceId];
    next.breakthroughs += 1;
  }
  return next;
}

export function tickLabWeek(state) {
  if (!state) return state;
  const next = { ...state };
  if ((next.maintenanceDebt ?? 0) > 0) {
    next.maintenanceDebt = Math.max(0, next.maintenanceDebt - 1);
  }
  next.instability = Math.max(0, (next.instability ?? 0) - 2);
  next.builtThisSession = [];
  return next;
}

export function researchBlueprint(state, blueprintId) {
  const researched = new Set(state?.researchedBlueprints || []);
  if (researched.has(blueprintId)) return state;
  researched.add(blueprintId);
  return {
    ...state,
    researchedBlueprints: [...researched],
    instability: Math.min(100, (state.instability ?? 0) + 3),
  };
}
