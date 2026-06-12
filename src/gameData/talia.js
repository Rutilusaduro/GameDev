// ═══════════════════════════════════════════════════════════════
// TALIA VALE — Inventor / Machine Goddess path & lab state
// ═══════════════════════════════════════════════════════════════
import { partsAcquisitionByStage } from './labParts.js';

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
    desc: 'Networks and semi-autonomous systems across campus.',
    unlockNote: 'Locked — requires 8 lab sessions and stage-2 blueprints.',
  },
  {
    id: 3,
    key: 'networked_controller',
    label: 'Networked Controller',
    desc: 'Interlinked machine ecosystems and remote influence.',
    unlockNote: 'Locked — endgame automation scaffold (pass 2).',
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
    label: '⚙️ Calibrate Network',
    apCost: 2,
    desc: 'Stage 2 scaffold — tune automated systems (stub).',
    taliaGain: [4, 8],
    instability: 8,
    stub: true,
  },
  3: {
    label: '🌐 Remote Override',
    apCost: 3,
    desc: 'Stage 3 scaffold — campus-wide device mesh (stub).',
    taliaGain: [6, 12],
    instability: 12,
    stub: true,
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
    researchedBlueprints: ['bp_bloating_belt', 'bp_feeder_arm'],
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
  const researched = [...(state.researchedBlueprints || [])];
  if (stage >= 2 && !researched.includes('bp_serum_injector')) researched.push('bp_serum_injector');
  if (stage >= 2 && !researched.includes('bp_redistribution_rig')) researched.push('bp_redistribution_rig');
  if (stage >= 2 && !researched.includes('bp_paste_printer')) researched.push('bp_paste_printer');
  return { ...state, stage, researchedBlueprints: researched };
}

export function completeLabSession(state, session, builtDeviceId = null) {
  if (!state || !session) return state;
  let next = { ...state };
  next.sessionsRun = (next.sessionsRun ?? 0) + 1;
  next.parts = session.poolAfter || session.pool || next.parts;
  next.instability = Math.min(100, (next.instability ?? 0) + (session.instabilityGained ?? 5));
  if (builtDeviceId) {
    next.builtThisSession = [...(next.builtThisSession || []), builtDeviceId];
  }
  if (session.researchedBlueprint) {
    const researched = new Set(next.researchedBlueprints || []);
    researched.add(session.researchedBlueprint);
    next.researchedBlueprints = [...researched];
  }
  next = maybeAdvanceInventorStage(next);
  return next;
}

export function tickLabWeek(state) {
  if (!state) return state;
  let next = { ...state };
  if ((next.maintenanceDebt ?? 0) > 0) {
    next.maintenanceDebt = Math.max(0, next.maintenanceDebt - 1);
  }
  next.instability = Math.max(0, (next.instability ?? 0) - 2);
  next.builtThisSession = [];
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
