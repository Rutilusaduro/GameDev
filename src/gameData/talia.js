// ═══════════════════════════════════════════════════════════════
// TALIA VALE — Inventor path & lab state (device workshop only)
// ═══════════════════════════════════════════════════════════════
import { partsAcquisitionByStage } from './labParts.js';

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

export function defaultLabState() {
  return {
    stage: 1,
    instability: 0,
    sessionsRun: 0,
    abundancePoints: 6,
    researchedBlueprints: [
      'bp_feeder_arm',
      'bp_force_feeder',
      'bp_weight_belt',
      'bp_obedience_belt',
    ],
    installedInventions: {},
    circuitBoards: {},
    inventionUpgrades: {},
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
    deviceState: {
      furnitureComfort: 100,
    },
  };
}

export function maybeAdvanceInventorStage(state) {
  return state;
}

export function completeLabSession(state, session, builtDeviceId = null) {
  if (!state || !session) return state;
  let next = { ...state };
  next.sessionsRun = (next.sessionsRun ?? 0) + 1;
  next.parts = session.poolAfter || session.pool || next.parts;
  next.abundancePoints = (next.abundancePoints ?? 0) + 2;
  next.instability = Math.min(100, (next.instability ?? 0) + (session.instabilityGained ?? 5));
  if (builtDeviceId) {
    next.builtThisSession = [...(next.builtThisSession || []), builtDeviceId];
  }
  if (session.researchedBlueprint) {
    const researched = new Set(next.researchedBlueprints || []);
    researched.add(session.researchedBlueprint);
    next.researchedBlueprints = [...researched];
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
