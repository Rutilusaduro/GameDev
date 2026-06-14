// ═══════════════════════════════════════════════════════════════
// CIRCUIT BOARD SKILL TREES — per-invention node boards
// ═══════════════════════════════════════════════════════════════

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

function buildMainPath(prefix, labels) {
  return labels.map((label, i) => ({
    id: `${prefix}_main_${i + 1}`,
    label,
    cost: 1,
    desc: `${label} — circuit upgrade.`,
    ...(i === 3 ? { milestone: 2 } : {}),
    ...(i === labels.length - 1 ? { milestone: 3 } : {}),
  }));
}

function buildBranches(prefix, branchDefs) {
  const branches = {};
  for (const [key, def] of Object.entries(branchDefs)) {
    branches[key] = {
      id: key,
      label: def.label,
      ...(def.requiresTier ? { requiresTier: def.requiresTier } : {}),
      nodes: def.nodes.map((n) => ({
        id: `${prefix}_${n.id}`,
        label: n.label,
        cost: n.cost ?? 1,
        desc: n.desc,
        ...(n.requiresTier ? { requiresTier: n.requiresTier } : {}),
        ...(n.passive ? { passive: true } : {}),
      })),
    };
  }
  return branches;
}

const AFA_MAIN = buildMainPath('afa', [
  'Servo Link', 'Port Sync', 'Flow Timer', 'Multi-Arm Routing', 'Batch Queue',
  'Quiet Hours', 'Target Splitter', 'Overflow Tray', 'Autonomous Feed',
]);
const AFA_BRANCHES = buildBranches('afa', {
  automation: {
    label: 'Automation',
    nodes: [
      { id: 'passive_boost', label: 'Passive Boost', desc: '+1 lb/wk on weekly tick.' },
      { id: 'twin_feed', label: 'Twin Feed', desc: 'Session gains +15%.' },
      { id: 'set_forget', label: 'Set & Forget', desc: 'Weekly tick fires twice at 60% strength.', cost: 2 },
    ],
  },
  supervision: {
    label: 'Supervision',
    requiresTier: 2,
    nodes: [
      { id: 'burst_mode', label: 'Supervised Burst', desc: 'Manual sessions +25% gain.', cost: 2 },
      { id: 'multi_target', label: 'Multi-Target', desc: 'Spread weekly gain across equipped roster.', cost: 2 },
    ],
  },
});

const OB_MAIN = buildMainPath('ob', [
  'Compliance Coil', 'Shame Sync', 'Pulse Regulator', 'Obedience Loop', 'Waist Lock',
  'Hunger Tie', 'Dependence Amp', 'Public Cue', 'Total Submission',
]);
const OB_BRANCHES = buildBranches('ob', {
  submission: {
    label: 'Submission',
    nodes: [
      { id: 'shame_dial', label: 'Shame Dial', desc: 'Shame psych +1 per tick.' },
      { id: 'obsession_link', label: 'Obsession Link', desc: 'Obsession psych +1 per tick.' },
      { id: 'refusal_cut', label: 'Refusal Cut', desc: 'Lowers feeding refusal when equipped.', cost: 2 },
    ],
  },
  dependence: {
    label: 'Dependence',
    requiresTier: 2,
    nodes: [
      { id: 'withdrawal_hook', label: 'Withdrawal Hook', desc: 'Unequip causes hunger spike.', cost: 2 },
      { id: 'devotion_loop', label: 'Devotion Loop', desc: '+2 relationship on device tick.', cost: 2 },
    ],
  },
});

const ABB_MAIN = buildMainPath('abb', [
  'Pressure Cell', 'Bloat Timer', 'Waist Seal', 'Inflation Curve', 'Override Valve',
  'Comfort Cushion', 'Rapid Swell', 'Stage Push', 'Permanent Bloat',
]);
const ABB_BRANCHES = buildBranches('abb', {
  pressure: {
    label: 'Pressure',
    nodes: [
      { id: 'gentle_swell', label: 'Gentle Swell', desc: 'Slower, steadier bloat override.' },
      { id: 'hard_pulse', label: 'Hard Pulse', desc: 'Manual bloat trigger +20% gain.', cost: 2 },
    ],
  },
  permanence: {
    label: 'Permanence',
    requiresTier: 2,
    nodes: [
      { id: 'long_hold', label: 'Long Hold', desc: 'Bloat override lasts +1 week.', cost: 2 },
      { id: 'capacity_stretch', label: 'Capacity Stretch', desc: '+5 stomach capacity while worn.', cost: 2 },
    ],
  },
});

const LFR_MAIN = buildMainPath('lfr', [
  'Frame Anchor', 'Comfort Feed', 'Immobility Lock', 'Furniture Sync', 'Stage Cushion',
  'Feed Port', 'Warmth Coil', 'Public Seat', 'Living Fixture',
]);
const LFR_BRANCHES = buildBranches('lfr', {
  comfort: {
    label: 'Comfort',
    nodes: [
      { id: 'comfort_economy', label: 'Comfort Economy', desc: 'Furniture comfort decays slower.' },
      { id: 'feed_boost', label: 'Feed Boost', desc: 'Use-action comfort +20%.', cost: 2 },
    ],
  },
  permanence: {
    label: 'Permanence',
    requiresTier: 2,
    nodes: [
      { id: 'immobile_milestone', label: 'Immobility Milestone', desc: 'Stage-bump pacing +1 on heavy girls.', cost: 2 },
      { id: 'fixture_pride', label: 'Fixture Pride', desc: 'Shame → contentment drift.', cost: 2 },
    ],
  },
});

const RL_MAIN = buildMainPath('rl', [
  'Brace Link', 'Load Bearing', 'Stride Assist', 'Furniture Tie', 'Stability Core',
  'Weight Share', 'Mobility Aid', 'Support Web', 'Unshakeable',
]);
const RL_BRANCHES = buildBranches('rl', {
  support: {
    label: 'Support',
    nodes: [
      { id: 'waddle_ease', label: 'Waddle Ease', desc: 'Reduces immobility friction text.' },
      { id: 'comfort_return', label: 'Comfort Return', desc: '+4 furniture comfort per week.', cost: 1 },
    ],
  },
  growth: {
    label: 'Growth',
    requiresTier: 2,
    nodes: [
      { id: 'lower_focus', label: 'Lower Body Focus', desc: 'Legs slot gain biased to thighs.', cost: 2 },
      { id: 'heavy_bearing', label: 'Heavy Bearing', desc: '+1 lb/wk while furniture rig equipped.', cost: 2 },
    ],
  },
});

const GAC_MAIN = buildMainPath('gac', [
  'Field Coil', 'Warmth Regulator', 'Dose Meter', 'Saturation Lock', 'Burst Gate',
  'Stability Web', 'Magnitude Amp', 'Malfunction Vent', 'Overload Chamber',
]);
const GAC_BRANCHES = buildBranches('gac', {
  power: {
    label: 'Burst Power',
    nodes: [
      { id: 'magnitude', label: 'Magnitude', desc: 'Session gain +15%.' },
      { id: 'double_pulse', label: 'Double Pulse', desc: 'Perfect runs grant +2 invention pts.', cost: 2 },
    ],
  },
  risk: {
    label: 'Risk',
    requiresTier: 2,
    nodes: [
      { id: 'instability_trade', label: 'Instability Trade', desc: 'More gain, higher malfunction odds.', cost: 2 },
      { id: 'permanent_trace', label: 'Permanent Trace', desc: 'Malfunctions may leave permanent lbs.', cost: 3 },
    ],
  },
});

const GSI_MAIN = buildMainPath('gsi', [
  'Vial Sync', 'Formula Lock', 'Injection Rail', 'Cascade Timer', 'Stability Pin',
  'Warmth Trace', 'Serum Amp', 'Chaos Vent', 'Volatile Mastery',
]);
const GSI_BRANCHES = buildBranches('gsi', {
  serum: {
    label: 'Serum',
    nodes: [
      { id: 'rapid_local', label: 'Rapid Local', desc: 'Localized swell emphasis.' },
      { id: 'soft_landing', label: 'Soft Landing', desc: 'Malfunction severity −15%.', cost: 2 },
    ],
  },
  chaos: {
    label: 'Chaos',
    requiresTier: 2,
    nodes: [
      { id: 'cascade_hold', label: 'Cascade Hold', desc: 'permanentConvert gains +25%.', cost: 2 },
      { id: 'unstable_power', label: 'Unstable Power', desc: 'Gain +20%, risk +20%.', cost: 2 },
    ],
  },
});

const EHE_MAIN = buildMainPath('ehe', [
  'Ray Focus', 'Satiety Suppressor', 'Craving Amp', 'Campus Tuner', 'Pulse Router',
  'Distress Valve', 'Hunger Rise', 'Discovery Shield', 'Endless Craving',
]);
const EHE_BRANCHES = buildBranches('ehe', {
  friction: {
    label: 'Friction',
    nodes: [
      { id: 'hunger_rise', label: 'Hunger Rise', desc: 'Hunger tier rises faster.' },
      { id: 'distress_mode', label: 'Distress Mode', desc: 'Unlocks distress state on overuse.', cost: 2 },
    ],
  },
  campus: {
    label: 'Campus',
    requiresTier: 2,
    nodes: [
      { id: 'discovery_cut', label: 'Discovery Shield', desc: 'Campus deploy discovery risk −25%.', cost: 2 },
      { id: 'sustain_mesh', label: 'Sustain Mesh', desc: 'Sustain mode gain +20%.', cost: 2 },
    ],
  },
});

const DEVICE_TIER_LABELS = {
  auto_feeder_arm: { 1: 'Basic Auto-Feed', 2: 'Routed Auto-Feed', 3: 'Factory Auto-Feed' },
  obedience_belt: { 1: 'Basic Obedience Belt', 2: 'Conditioned Belt', 3: 'Total Obedience Belt' },
  auto_bloating_belt: { 1: 'Basic Weight Belt', 2: 'Pressure Belt', 3: 'Permanent Bloat Belt' },
  living_furniture_rig: { 1: 'Basic Harness', 2: 'Comfort Harness', 3: 'Living Fixture Rig' },
  reinforced_legs: { 1: 'Basic Braces', 2: 'Load Braces', 3: 'Unshakeable Legs' },
  growth_accelerator_chamber: { 1: 'Basic Chamber', 2: 'Precision Chamber', 3: 'Overload Chamber' },
  growth_serum_injector: { 1: 'Basic Formula', 2: 'Refined Formula', 3: 'Volatile Formula' },
  endless_hunger_engine: { 1: 'Basic Hunger Ray', 2: 'Campus Ray', 3: 'Endless Ray' },
};

export const CIRCUIT_BOARDS = {
  feeding_mask: {
    deviceDefId: 'feeding_mask',
    label: 'Force Feeder',
    mainPath: FF_MAIN_PATH,
    branches: FF_BRANCHES,
  },
  auto_feeder_arm: {
    deviceDefId: 'auto_feeder_arm',
    label: 'Auto-Feed Arm',
    mainPath: AFA_MAIN,
    branches: AFA_BRANCHES,
  },
  obedience_belt: {
    deviceDefId: 'obedience_belt',
    label: 'Obedience Belt',
    mainPath: OB_MAIN,
    branches: OB_BRANCHES,
  },
  auto_bloating_belt: {
    deviceDefId: 'auto_bloating_belt',
    label: 'Weight Belt',
    mainPath: ABB_MAIN,
    branches: ABB_BRANCHES,
  },
  living_furniture_rig: {
    deviceDefId: 'living_furniture_rig',
    label: 'Furniture Harness',
    mainPath: LFR_MAIN,
    branches: LFR_BRANCHES,
  },
  reinforced_legs: {
    deviceDefId: 'reinforced_legs',
    label: 'Reinforced Legs',
    mainPath: RL_MAIN,
    branches: RL_BRANCHES,
  },
  growth_accelerator_chamber: {
    deviceDefId: 'growth_accelerator_chamber',
    label: 'Growth Chamber',
    mainPath: GAC_MAIN,
    branches: GAC_BRANCHES,
  },
  growth_serum_injector: {
    deviceDefId: 'growth_serum_injector',
    label: 'Growth Formula',
    mainPath: GSI_MAIN,
    branches: GSI_BRANCHES,
  },
  endless_hunger_engine: {
    deviceDefId: 'endless_hunger_engine',
    label: 'Hunger Ray',
    mainPath: EHE_MAIN,
    branches: EHE_BRANCHES,
  },
};

/** Visual positions (% of board area) for the force feeder circuit board */
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

function autoLayoutForBoard(deviceDefId) {
  const board = CIRCUIT_BOARDS[deviceDefId];
  if (!board) return {};
  const layout = {};
  const mains = board.mainPath.map((n) => n.id);
  mains.forEach((id, i) => {
    layout[id] = { x: 50, y: 92 - i * 9 };
  });
  const branchKeys = Object.keys(board.branches);
  branchKeys.forEach((bk, bi) => {
    const nodes = board.branches[bk].nodes;
    const side = bi % 2 === 0 ? 14 : 86;
    nodes.forEach((n, ni) => {
      layout[n.id] = { x: side + (ni % 2) * 6, y: 70 - ni * 14 - bi * 4 };
    });
  });
  return layout;
}

const BOARD_LAYOUTS = Object.fromEntries(
  Object.keys(CIRCUIT_BOARDS).map((id) => [id, id === 'feeding_mask' ? FORCE_FEEDER_LAYOUT : autoLayoutForBoard(id)]),
);

function autoEdgesForBoard(deviceDefId) {
  const board = CIRCUIT_BOARDS[deviceDefId];
  if (!board) return [];
  const edges = [];
  const mains = board.mainPath.map((n) => n.id);
  for (let i = 0; i < mains.length - 1; i++) {
    edges.push({ from: mains[i], to: mains[i + 1], kind: 'main' });
  }
  const anchor = mains[Math.min(4, mains.length - 1)];
  for (const branch of Object.values(board.branches)) {
    for (const node of branch.nodes) {
      edges.push({ from: anchor, to: node.id, kind: 'branch' });
    }
  }
  return edges;
}

const BOARD_EDGES = Object.fromEntries(
  Object.keys(CIRCUIT_BOARDS).map((id) => [id, id === 'feeding_mask' ? null : autoEdgesForBoard(id)]),
);

export function getNodeLayout(deviceDefId, nodeId) {
  const layout = BOARD_LAYOUTS[deviceDefId] || {};
  return layout[nodeId] || { x: 50, y: 50 };
}

export function getBoardEdges(deviceDefId) {
  if (deviceDefId === 'feeding_mask') {
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
  return BOARD_EDGES[deviceDefId] || autoEdgesForBoard(deviceDefId);
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
  if (labels) return labels[tier] || `Tier ${tier}`;
  return `Tier ${tier}`;
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

export function canUnlockCircuitNode(labState, deviceDefId, nodeId) {
  if (!labState?.installedInventions?.[deviceDefId]) return false;
  const cb = getCircuitBoard(labState, deviceDefId);
  if (cb.unlockedNodes.includes(nodeId)) return false;
  const node = getCircuitNode(deviceDefId, nodeId);
  if (!node) return false;
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

export function unlockCircuitNode(labState, deviceDefId, nodeId) {
  if (!canUnlockCircuitNode(labState, deviceDefId, nodeId)) return labState;
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
  let cb = getCircuitBoard(labState, deviceDefId);
  let points = (POINTS_BY_PERFORMANCE[performanceTier] ?? 0) + bonusPoints;
  const successful = performanceTier !== 'failure';
  const totalUses = (cb.totalUses ?? 0) + 1;
  const successfulUses = (cb.successfulUses ?? 0) + (successful ? 1 : 0);

  const fieldDataNode = `${deviceDefId.split('_')[0]}_field_data`;
  let fieldBonus = 0;
  const passiveNodes = allCircuitNodes(deviceDefId).filter((n) => n.passive);
  for (const pn of passiveNodes) {
    if (hasCircuitNode(labState, deviceDefId, pn.id) && successful && successfulUses % 5 === 0) {
      fieldBonus += 1;
    }
  }
  if (deviceDefId === 'feeding_mask' && hasCircuitNode(labState, deviceDefId, 'ff_field_data') && successful && successfulUses % 5 === 0) {
    fieldBonus += 1;
  }

  cb = {
    ...cb,
    totalUses,
    successfulUses,
    inventionPoints: (cb.inventionPoints ?? 0) + points + fieldBonus,
  };

  return {
    labState: {
      ...labState,
      circuitBoards: {
        ...(labState.circuitBoards || {}),
        [deviceDefId]: cb,
      },
    },
    pointsEarned: points + fieldBonus,
    fieldDataBonus: fieldBonus > 0,
  };
}

export function recordForceFeederUse(labState, { performanceTier, targetIsTalia, highRelationship, targetedZone }) {
  let bonus = 0;
  if (targetIsTalia) bonus += 1;
  if (highRelationship) bonus += 1;
  if (targetedZone && targetedZone !== 'default') bonus += 1;
  return recordDeviceUse(labState, 'feeding_mask', { performanceTier, bonusPoints: bonus });
}

export function getDeviceBoardMods(labState, deviceDefId) {
  if (deviceDefId === 'feeding_mask') return getForceFeederBoardMods(labState);
  const has = (id) => hasCircuitNode(labState, deviceDefId, id);
  const tier = getInventionTier(labState, deviceDefId);
  const gainMult = 1 + (tier >= 2 ? 0.1 : 0) + (tier >= 3 ? 0.1 : 0);
  const mods = { tier, gainMult, malfunctionMult: 1 };
  if (deviceDefId === 'auto_feeder_arm') {
    if (has('afa_passive_boost')) mods.gainMult += 0.08;
    if (has('afa_burst_mode')) mods.sessionGainMult = 1.25;
  }
  if (deviceDefId === 'obedience_belt' && has('ob_refusal_cut')) mods.refusalBonus = 0.12;
  if (deviceDefId === 'growth_accelerator_chamber' && has('gac_magnitude')) mods.gainMult += 0.15;
  if (deviceDefId === 'growth_serum_injector' && has('gsi_cascade_hold')) mods.permanentConvertMult = 1.25;
  if (deviceDefId === 'endless_hunger_engine' && has('ehe_discovery_cut')) mods.discoveryRiskMult = 0.75;
  return mods;
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
