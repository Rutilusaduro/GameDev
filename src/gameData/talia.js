// ═══════════════════════════════════════════════════════════════
// TALIA VALE — Inventor / Machine Goddess path & lab state
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
    key: 'tinkerer',
    label: 'The Tinkerer',
    desc: 'Individual devices, hands-on builds, private workshop experiments.',
    unlockNote: 'Active — build and deploy wearable prototypes.',
  },
  {
    id: 2,
    key: 'automator',
    label: 'The Automator',
    desc: 'Interconnected device networks — node graphs, experiment slotting, deployment zones, and detection risk.',
    unlockNote: 'Unlocks at 8 lab sessions — build and monitor campus mesh.',
  },
  {
    id: 3,
    key: 'networked_controller',
    label: 'Networked Controller',
    desc: 'Distributed intelligence — influence web, autonomous proposals, nexus integration.',
    unlockNote: 'Unlocks at 16 lab sessions — command the mesh as Talia becomes the system.',
  },
];

export const LAB_BUILD_CONFIG = {
  buildWeightCostByTier: { 1: 3, 2: 6, 3: 10, 4: 15 },
  moneyCostByTier: { 1: 50, 2: 120, 3: 250, 4: 500 },
  apCost: 1,
  minLbsByTier: { 1: 125, 2: 140, 3: 160, 4: 180 },
};

export const INVENTOR_ACTIVITIES = {
  1: {
    label: '🔧 Run Lab Session',
    apCost: 1,
    desc: 'Gather parts, research blueprints, and build devices. Talia spends her own mass as raw material.',
    taliaGain: [2, 5],
    instability: 5,
  },
  2: {
    label: '⚙️ Network Control',
    apCost: 1,
    desc: 'Open the node graph — slot experiments, expand coverage, manage detection risk.',
    opensNetwork: true,
    taliaGain: [2, 4],
    instability: 4,
  },
  3: {
    label: '🌐 Nexus Command',
    apCost: 2,
    desc: 'Command the influence web — approve autonomous proposals and deepen integration.',
    opensNetwork: true,
    taliaGain: [3, 6],
    instability: 6,
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

const STAGE_SESSION_THRESHOLDS = [0, 8, 16];

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
  next = maybeAdvanceInventorStage(next);
  return next;
}

export function tickLabWeek(state) {
  if (!state) return state;
  let next = ensureNetwork({ ...state });
  if ((next.maintenanceDebt ?? 0) > 0) {
    next.maintenanceDebt = Math.max(0, next.maintenanceDebt - 1);
  }
  next.instability = Math.max(0, (next.instability ?? 0) - 2);
  next.builtThisSession = [];
  if (next.network) {
    next.network.stats = next.network.stats || {};
  }
  return next;
}

export function researchBlueprint(state, blueprintId, apCost = 0) {
  const researched = new Set(state?.researchedBlueprints || []);
  if (researched.has(blueprintId)) return state;
  researched.add(blueprintId);
  return {
    ...state,
    researchedBlueprints: [...researched],
    instability: Math.min(100, (state.instability ?? 0) + 3),
  };
}
