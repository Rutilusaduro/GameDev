// ═══════════════════════════════════════════════════════════════
// CIRCUIT BOARD SKILL TREES — per-invention node boards
// ═══════════════════════════════════════════════════════════════
import {
  ADDITIONAL_CIRCUIT_BOARDS,
  BOARD_LAYOUTS,
  BOARD_EDGES,
  DEVICE_TIER_LABELS,
  stripBoardMeta,
  collectBoardMods,
} from './circuitBoardDefs.js';

export const MAIN_PATH_TIER_THRESHOLDS = { 2: 4, 3: 9 };

export const FORCE_FEEDER_TIER_LABELS = {
  1: 'Basic Force Feeder',
  2: 'Precision Force Feeder',
  3: 'Overload Force Feeder',
};

export const GROWTH_ZONE_OPTIONS = [
  { id: 'default', label: 'Default', desc: 'Body-type weighted gain.' },
  { id: 'belly', label: 'Belly Focus', desc: 'Prioritize belly growth.', requiresNode: 'ff_belly_focus' },
  { id: 'lower_body', label: 'Lower Body Bias', desc: 'Hips, thighs, and ass.', requiresNode: 'ff_lower_body' },
  { id: 'even', label: 'Even Distribution', desc: 'Balanced full-body gain.', requiresNode: 'ff_even_dist' },
  { id: 'rapid', label: 'Rapid Saturation', desc: 'Faster stage push, higher choke risk.', requiresNode: 'ff_rapid_sat' },
];

const FF_MAIN_PATH = [
  { id: 'ff_main_1', label: 'Intake Relay', cost: 1, desc: 'Smoother pump handoff between pulses.' },
  { id: 'ff_main_2', label: 'Pressure Regulator', cost: 1, desc: 'Steadier paste flow under load.' },
  { id: 'ff_main_3', label: 'Harness Sync', cost: 1, desc: 'Head restraint tracks throat movement.' },
  { id: 'ff_main_4', label: 'Precision Calibration', cost: 1, milestone: 2, desc: 'Unlocks Precision Force Feeder — targeted zones + better calibration.' },
  { id: 'ff_main_5', label: 'Dual-Stage Manifold', cost: 1, desc: 'Feeds can carry more mass per pulse.' },
  { id: 'ff_main_6', label: 'Adaptive Timing', cost: 1, desc: 'Wider perfect windows at higher tiers.' },
  { id: 'ff_main_7', label: 'Saturation Core', cost: 1, desc: 'Stage advancement efficiency improves.' },
  { id: 'ff_main_8', label: 'Redundant Pumps', cost: 1, desc: 'Backup flow prevents total choking stalls.' },
  { id: 'ff_main_9', label: 'Overload Protocol', cost: 1, milestone: 3, desc: 'Unlocks Overload Force Feeder — double-stage attempts + Burst Mode.' },
];

const FF_BRANCHES = {
  efficiency: {
    id: 'efficiency',
    label: 'Efficiency & Control',
    nodes: [
      { id: 'ff_stable_pulse', label: 'Stable Pulse', cost: 1, desc: 'Reduces base Choke Meter gain by 15%.' },
      { id: 'ff_calibrated_flow', label: 'Calibrated Flow', cost: 2, desc: 'Slightly increases feeding efficiency on Perfect runs.' },
      { id: 'ff_overclocked_pump', label: 'Overclocked Pump', cost: 2, desc: 'Higher max feeding speed — riskier but faster sessions.' },
    ],
  },
  targeting: {
    id: 'targeting',
    label: 'Targeting & Specialization',
    requiresTier: 2,
    nodes: [
      { id: 'ff_belly_focus', label: 'Belly Focus Module', cost: 1, desc: 'Unlock belly-priority growth zone in calibration setup.' },
      { id: 'ff_lower_body', label: 'Lower Body Bias', cost: 1, desc: 'Unlock lower-body growth zone.' },
      { id: 'ff_even_dist', label: 'Even Distribution', cost: 1, desc: 'Unlock balanced growth zone.' },
      { id: 'ff_rapid_sat', label: 'Rapid Saturation', cost: 2, desc: 'Faster stage progression at higher choke risk.' },
    ],
  },
  flavor: {
    id: 'flavor',
    label: 'Flavor & Special Effects',
    nodes: [
      { id: 'ff_gentle_override', label: 'Gentle Override', cost: 1, desc: 'Reduces resistance from unwilling targets slightly.' },
      { id: 'ff_intimate_cal', label: 'Intimate Calibration', cost: 2, desc: 'Extra text scenes on high-relationship targets.', requiresTier: 2 },
      { id: 'ff_self_experiment', label: 'Self-Experiment Protocols', cost: 2, desc: 'Unique intense scenes when Talia feeds herself.' },
      { id: 'ff_public_demo', label: 'Public Demonstration', cost: 3, desc: 'Semi-public sessions with extra reactions.', requiresTier: 3 },
    ],
  },
  risk: {
    id: 'risk',
    label: 'Risk & Reward',
    nodes: [
      { id: 'ff_reinforced_tubing', label: 'Reinforced Tubing', cost: 1, desc: 'Greatly reduces major malfunction chance.' },
      { id: 'ff_high_pressure', label: 'High-Pressure Mode', cost: 2, desc: 'More gain but significantly raises Choke Meter.' },
      { id: 'ff_emergency_release', label: 'Emergency Release', cost: 1, desc: 'Emergency button during calibration — vents choke at efficiency cost.' },
      { id: 'ff_field_data', label: 'Field Data Accumulation', cost: 2, desc: 'Every 5 successful uses grants +1 Invention Point automatically.', passive: true },
    ],
  },
};

export const CIRCUIT_BOARDS = {
  feeding_mask: {
    deviceDefId: 'feeding_mask',
    label: 'Force Feeder',
    mainPath: FF_MAIN_PATH,
    branches: FF_BRANCHES,
  },
  ...Object.fromEntries(
    Object.entries(ADDITIONAL_CIRCUIT_BOARDS).map(([id, board]) => [id, stripBoardMeta(board)]),
  ),
};

/** Visual positions (% of board area) for the circuit board modal */
export const FORCE_FEEDER_LAYOUT = {
  ff_main_1: { x: 50, y: 92 },
  ff_main_2: { x: 50, y: 82 },
  ff_main_3: { x: 50, y: 72 },
  ff_main_4: { x: 50, y: 62 },
  ff_main_5: { x: 50, y: 52 },
  ff_main_6: { x: 50, y: 42 },
  ff_main_7: { x: 50, y: 32 },
  ff_main_8: { x: 50, y: 22 },
  ff_main_9: { x: 50, y: 10 },
  ff_stable_pulse: { x: 16, y: 68 },
  ff_calibrated_flow: { x: 10, y: 52 },
  ff_overclocked_pump: { x: 18, y: 36 },
  ff_belly_focus: { x: 84, y: 68 },
  ff_lower_body: { x: 90, y: 54 },
  ff_even_dist: { x: 82, y: 42 },
  ff_rapid_sat: { x: 88, y: 28 },
  ff_gentle_override: { x: 14, y: 24 },
  ff_intimate_cal: { x: 8, y: 14 },
  ff_self_experiment: { x: 22, y: 10 },
  ff_public_demo: { x: 16, y: 4 },
  ff_reinforced_tubing: { x: 86, y: 18 },
  ff_high_pressure: { x: 92, y: 10 },
  ff_emergency_release: { x: 78, y: 8 },
  ff_field_data: { x: 88, y: 4 },
};

export function getNodeLayout(deviceDefId, nodeId) {
  if (deviceDefId === 'feeding_mask') return FORCE_FEEDER_LAYOUT[nodeId] || { x: 50, y: 50 };
  return BOARD_LAYOUTS[deviceDefId]?.[nodeId] || { x: 50, y: 50 };
}

export function getBoardEdges(deviceDefId) {
  if (deviceDefId !== 'feeding_mask') return BOARD_EDGES[deviceDefId] || [];
  const edges = [];
  const mains = FF_MAIN_PATH.map((n) => n.id);
  for (let i = 0; i < mains.length - 1; i++) {
    edges.push({ from: mains[i], to: mains[i + 1], kind: 'main' });
  }
  const branchAnchors = {
    ff_stable_pulse: 'ff_main_3', ff_calibrated_flow: 'ff_main_4', ff_overclocked_pump: 'ff_main_5',
    ff_belly_focus: 'ff_main_4', ff_lower_body: 'ff_main_5', ff_even_dist: 'ff_main_6', ff_rapid_sat: 'ff_main_6',
    ff_gentle_override: 'ff_main_2', ff_intimate_cal: 'ff_main_4', ff_self_experiment: 'ff_main_3', ff_public_demo: 'ff_main_7',
    ff_reinforced_tubing: 'ff_main_3', ff_high_pressure: 'ff_main_6', ff_emergency_release: 'ff_main_4', ff_field_data: 'ff_main_8',
  };
  for (const [nodeId, anchor] of Object.entries(branchAnchors)) {
    edges.push({ from: anchor, to: nodeId, kind: 'branch' });
  }
  return edges;
}

export const POINTS_BY_PERFORMANCE = { perfect: 2, good: 1, messy: 1, failure: 0 };

export function defaultCircuitBoardState() {
  return {
    inventionPoints: 0,
    mainPathPoints: 0,
    unlockedNodes: [],
    totalUses: 0,
    successfulUses: 0,
  };
}

export function getCircuitBoard(labState, deviceDefId) {
  return labState?.circuitBoards?.[deviceDefId] || defaultCircuitBoardState();
}

export function hasCircuitNode(labState, deviceDefId, nodeId) {
  return getCircuitBoard(labState, deviceDefId).unlockedNodes.includes(nodeId);
}

export function getMainPathPoints(labState, deviceDefId) {
  return getCircuitBoard(labState, deviceDefId).mainPathPoints ?? 0;
}

export function getInventionTier(labState, deviceDefId) {
  const pts = getMainPathPoints(labState, deviceDefId);
  if (pts >= MAIN_PATH_TIER_THRESHOLDS[3]) return 3;
  if (pts >= MAIN_PATH_TIER_THRESHOLDS[2]) return 2;
  return 1;
}

/** @deprecated use getInventionTier */
export function getUpgradeLevel(labState, deviceDefId) {
  return getInventionTier(labState, deviceDefId);
}

export function getInventionTierLabel(labState, deviceDefId) {
  const tier = getInventionTier(labState, deviceDefId);
  if (deviceDefId === 'feeding_mask') return FORCE_FEEDER_TIER_LABELS[tier] || `Tier ${tier}`;
  const labels = DEVICE_TIER_LABELS[deviceDefId];
  if (labels?.[tier]) return labels[tier];
  const board = CIRCUIT_BOARDS[deviceDefId];
  return board ? `${board.label} — Tier ${tier}` : `Tier ${tier}`;
}

export function allCircuitNodes(deviceDefId) {
  const board = CIRCUIT_BOARDS[deviceDefId];
  if (!board) return [];
  const branchNodes = Object.values(board.branches).flatMap((b) => b.nodes.map((n) => ({ ...n, branchId: b.id, branchLabel: b.label })));
  return [
    ...board.mainPath.map((n) => ({ ...n, branchId: 'main', branchLabel: 'Main Path' })),
    ...branchNodes,
  ];
}

export function getCircuitNode(deviceDefId, nodeId) {
  return allCircuitNodes(deviceDefId).find((n) => n.id === nodeId) || null;
}

export function nextMainPathNode(labState, deviceDefId) {
  const board = CIRCUIT_BOARDS[deviceDefId];
  if (!board) return null;
  const unlocked = new Set(getCircuitBoard(labState, deviceDefId).unlockedNodes);
  return board.mainPath.find((n) => !unlocked.has(n.id)) || null;
}

export function canUnlockCircuitNode(labState, deviceDefId, nodeId, roster = []) {
  if (!labState?.installedInventions?.[deviceDefId]) return false;
  const cb = getCircuitBoard(labState, deviceDefId);
  if (cb.unlockedNodes.includes(nodeId)) return false;
  const node = getCircuitNode(deviceDefId, nodeId);
  if (!node) return false;
  if (node.requiresEvolvedForm) {
    const hasForm = roster.some((s) => !s.hidden && s.evolvedForm === node.requiresEvolvedForm);
    if (!hasForm) return false;
  }
  if ((cb.inventionPoints ?? 0) < (node.cost ?? 1)) return false;
  const tier = getInventionTier(labState, deviceDefId);
  if (node.requiresTier && tier < node.requiresTier) return false;
  const branch = node.branchId && node.branchId !== 'main'
    ? CIRCUIT_BOARDS[deviceDefId]?.branches[node.branchId]
    : null;
  if (branch?.requiresTier && tier < branch.requiresTier) return false;
  if (node.branchId === 'main') {
    const next = nextMainPathNode(labState, deviceDefId);
    if (next?.id !== nodeId) return false;
  }
  return true;
}

export function unlockCircuitNode(labState, deviceDefId, nodeId, roster = []) {
  if (!canUnlockCircuitNode(labState, deviceDefId, nodeId, roster)) return labState;
  const node = getCircuitNode(deviceDefId, nodeId);
  const cb = getCircuitBoard(labState, deviceDefId);
  const cost = node.cost ?? 1;
  const nextCb = {
    ...cb,
    inventionPoints: Math.max(0, (cb.inventionPoints ?? 0) - cost),
    unlockedNodes: [...(cb.unlockedNodes || []), nodeId],
    mainPathPoints: node.branchId === 'main'
      ? (cb.mainPathPoints ?? 0) + cost
      : (cb.mainPathPoints ?? 0),
  };
  return {
    ...labState,
    circuitBoards: {
      ...(labState.circuitBoards || {}),
      [deviceDefId]: nextCb,
    },
    inventionUpgrades: {
      ...(labState.inventionUpgrades || {}),
      [deviceDefId]: getInventionTier({ ...labState, circuitBoards: { ...labState.circuitBoards, [deviceDefId]: nextCb } }, deviceDefId),
    },
  };
}

export function awardInventionPoints(labState, deviceDefId, amount) {
  if (!amount || amount <= 0) return labState;
  const cb = getCircuitBoard(labState, deviceDefId);
  return {
    ...labState,
    circuitBoards: {
      ...(labState.circuitBoards || {}),
      [deviceDefId]: {
        ...cb,
        inventionPoints: (cb.inventionPoints ?? 0) + amount,
      },
    },
  };
}

export function recordDeviceUse(labState, deviceDefId, { performanceTier = 'good', bonusPoints = 0 } = {}) {
  if (deviceDefId === 'feeding_mask') {
    return recordForceFeederUse(labState, { performanceTier, targetIsTalia: false, highRelationship: false, targetedZone: null });
  }
  let cb = getCircuitBoard(labState, deviceDefId);
  const points = (POINTS_BY_PERFORMANCE[performanceTier] ?? 0) + bonusPoints;
  const successful = performanceTier !== 'failure';
  cb = {
    ...cb,
    totalUses: (cb.totalUses ?? 0) + 1,
    successfulUses: (cb.successfulUses ?? 0) + (successful ? 1 : 0),
    inventionPoints: (cb.inventionPoints ?? 0) + points,
  };
  return {
    labState: {
      ...labState,
      circuitBoards: {
        ...(labState.circuitBoards || {}),
        [deviceDefId]: cb,
      },
    },
    pointsEarned: points,
  };
}

export function getDeviceBoardMods(labState, deviceDefId) {
  if (deviceDefId === 'feeding_mask') return getForceFeederBoardMods(labState);
  const has = (id) => hasCircuitNode(labState, deviceDefId, id);
  return collectBoardMods(labState, deviceDefId, has);
}

/** Scale weekly equip ticks by unlocked circuit-board mods (DEPTH_PLAN §2a). */
export function applyBoardModsToWeeklyEffect(weekly, labState, deviceDefId) {
  if (!weekly || !labState || !deviceDefId) return weekly;
  const mods = getDeviceBoardMods(labState, deviceDefId);
  const next = { ...weekly };
  if (mods.weeklyGainMult && next.gainLbs) {
    const mult = 1 + mods.weeklyGainMult;
    next.gainLbs = next.gainLbs.map((g) => Math.max(1, Math.round(g * mult)));
  }
  if (mods.gainMult && next.gainLbs) {
    next.gainLbs = next.gainLbs.map((g) => Math.max(1, Math.round(g * mods.gainMult)));
  }
  if (mods.shameMult != null && next.psychDelta?.shame) {
    next.psychDelta = { ...next.psychDelta, shame: Math.round(next.psychDelta.shame * mods.shameMult) };
  }
  if (mods.dependenceMult != null && next.psychDelta?.dependence) {
    next.psychDelta = { ...next.psychDelta, dependence: Math.round(next.psychDelta.dependence * mods.dependenceMult) };
  }
  if (mods.stageBumpBonus && next.bodyOverride?.stageBump) {
    next.bodyOverride = { ...next.bodyOverride, stageBump: next.bodyOverride.stageBump + mods.stageBumpBonus };
  }
  if (mods.furnitureComfort != null && next.furnitureComfortDelta != null) {
    next.furnitureComfortDelta += mods.furnitureComfort;
  }
  if (mods.comfortDecayMult != null && next.furnitureComfortDelta != null) {
    next.furnitureComfortDelta = Math.round(next.furnitureComfortDelta * mods.comfortDecayMult);
  }
  if (mods.hungerRiseMult && next.hungerDelta) {
    next.hungerDelta = Math.round(next.hungerDelta * mods.hungerRiseMult);
  }
  return next;
}

export function recordForceFeederUse(labState, { performanceTier, targetIsTalia, highRelationship, targetedZone }) {
  const deviceDefId = 'feeding_mask';
  let cb = getCircuitBoard(labState, deviceDefId);
  let points = POINTS_BY_PERFORMANCE[performanceTier] ?? 0;
  if (targetIsTalia) points += 1;
  if (highRelationship) points += 1;
  if (targetedZone && targetedZone !== 'default') points += 1;

  const successful = performanceTier !== 'failure';
  const totalUses = (cb.totalUses ?? 0) + 1;
  const successfulUses = (cb.successfulUses ?? 0) + (successful ? 1 : 0);
  let bonusPoints = 0;
  if (hasCircuitNode(labState, deviceDefId, 'ff_field_data') && successful && successfulUses % 5 === 0) {
    bonusPoints += 1;
  }

  cb = {
    ...cb,
    totalUses,
    successfulUses,
    inventionPoints: (cb.inventionPoints ?? 0) + points + bonusPoints,
  };

  return {
    labState: {
      ...labState,
      circuitBoards: {
        ...(labState.circuitBoards || {}),
        [deviceDefId]: cb,
      },
    },
    pointsEarned: points + bonusPoints,
    fieldDataBonus: bonusPoints > 0 && successfulUses % 5 === 0,
  };
}

export function getForceFeederBoardMods(labState) {
  const has = (id) => hasCircuitNode(labState, 'feeding_mask', id);
  const tier = getInventionTier(labState, 'feeding_mask');
  return {
    tier,
    chokeGainMult: has('ff_stable_pulse') ? 0.85 : 1,
    efficiencyBonus: has('ff_calibrated_flow') ? 8 : 0,
    timingBonus: (tier >= 2 ? 25 : 0) + (has('ff_overclocked_pump') ? -15 : 0) + tier * 12,
    chokeDrainMult: has('ff_reinforced_tubing') ? 0.7 : 1,
    chokePressureMult: has('ff_high_pressure') ? 1.35 : 1,
    beatCountMult: has('ff_overclocked_pump') ? 0.85 : 1,
    emergencyRelease: has('ff_emergency_release'),
    gentleOverride: has('ff_gentle_override'),
    intimateCalibration: has('ff_intimate_cal'),
    selfExperiment: has('ff_self_experiment'),
    rapidSaturation: has('ff_rapid_sat'),
    overclockedPump: has('ff_overclocked_pump'),
    highPressure: has('ff_high_pressure'),
    doubleStageOnPerfect: tier >= 3,
    burstMode: tier >= 3,
  };
}

export function timingWindowMs(labStateOrLevel) {
  const mods = typeof labStateOrLevel === 'object' && labStateOrLevel?.circuitBoards
    ? getForceFeederBoardMods(labStateOrLevel)
    : { tier: labStateOrLevel ?? 1, timingBonus: (labStateOrLevel ?? 1) * 12 };
  return 200 + (mods.timingBonus ?? 0);
}

export function stageBumpForPerformance(tier, labStateOrLevel) {
  const tierLevel = typeof labStateOrLevel === 'object'
    ? getInventionTier(labStateOrLevel, 'feeding_mask')
    : (labStateOrLevel ?? 1);
  const mods = typeof labStateOrLevel === 'object'
    ? getForceFeederBoardMods(labStateOrLevel)
    : { doubleStageOnPerfect: tierLevel >= 3, rapidSaturation: false };
  if (tier === 'perfect' && mods.doubleStageOnPerfect) return 2;
  if (tier === 'good' && mods.rapidSaturation) return 2;
  return 1;
}

export function availableGrowthZones(labState) {
  const unlocked = new Set(getCircuitBoard(labState, 'feeding_mask').unlockedNodes);
  return GROWTH_ZONE_OPTIONS.filter((z) => !z.requiresNode || unlocked.has(z.requiresNode));
}

/** Legacy API — redirects to circuit node unlock */
export function canPurchaseUpgrade(labState, deviceDefId) {
  const next = nextMainPathNode(labState, deviceDefId);
  return next ? canUnlockCircuitNode(labState, deviceDefId, next.id) : false;
}

export function nextUpgradeDef(deviceDefId, _currentLevel) {
  return null;
}

export function purchaseUpgrade(labState, deviceDefId) {
  const next = nextMainPathNode(labState, deviceDefId);
  if (!next) return labState;
  return unlockCircuitNode(labState, deviceDefId, next.id);
}
