// ═══════════════════════════════════════════════════════════════
// LAB TECH TREE — breakthrough currency unlocks blueprint research
// ═══════════════════════════════════════════════════════════════

/** Insight Talia earns from lab sessions; spent to unlock blueprint nodes. */
export const BREAKTHROUGH_LABEL = 'Breakthroughs';
export const BREAKTHROUGH_ICON = '💡';

export const LAB_TECH_NODES = [
  {
    id: 'foundation',
    label: 'Workshop Foundations',
    icon: '🔬',
    cost: 0,
    prereqs: [],
    blueprint: null,
    stageMin: 1,
    category: 'core',
    desc: 'Salvage discipline, tolerances, and the habit of thinking in systems.',
    autoUnlock: true,
  },
  // ── Feeding branch ──
  {
    id: 'tech_bloating_belt',
    label: 'Pressure-Bloat Dynamics',
    icon: '⭕',
    cost: 3,
    prereqs: ['foundation'],
    blueprint: 'bp_bloating_belt',
    stageMin: 1,
    category: 'feeding',
    desc: 'Waist harnesses that trade comfort for relentless midsection inflation.',
  },
  {
    id: 'tech_feeder_arm',
    label: 'Precision Feeding Kinematics',
    icon: '🦾',
    cost: 4,
    prereqs: ['foundation'],
    blueprint: 'bp_feeder_arm',
    stageMin: 1,
    category: 'feeding',
    desc: 'Servo-fed delivery arms — measured bites whether she is ready or not.',
  },
  {
    id: 'tech_paste_printer',
    label: 'Calorie Paste Extrusion',
    icon: '🖨️',
    cost: 5,
    prereqs: ['tech_feeder_arm'],
    blueprint: 'bp_paste_printer',
    stageMin: 1,
    category: 'feeding',
    desc: 'Dense optimized paste engineered for maximum storage efficiency.',
  },
  {
    id: 'tech_serum_injector',
    label: 'Volatile Growth Serums',
    icon: '💉',
    cost: 6,
    prereqs: ['foundation'],
    blueprint: 'bp_serum_injector',
    stageMin: 1,
    category: 'feeding',
    desc: 'One-shot serum delivery — rapid, dramatic, never fully predictable.',
  },
  // ── Stage 2 gates ──
  {
    id: 'automation_gate',
    label: 'Automation Theory',
    icon: '⚙️',
    cost: 0,
    prereqs: ['foundation'],
    blueprint: null,
    stageMin: 2,
    category: 'core',
    desc: 'Interconnected rigs — unlocked when Talia becomes The Automator.',
    autoUnlockOnStage: 2,
  },
  {
    id: 'tech_sleep_feeding',
    label: 'Sleep-Sensor Feeding',
    icon: '🌙',
    cost: 5,
    prereqs: ['automation_gate', 'tech_feeder_arm'],
    blueprint: 'bp_sleep_feeding',
    stageMin: 2,
    category: 'automation',
    desc: 'Overnight drip calories while the target is helpless and unconscious.',
  },
  {
    id: 'tech_feeding_mask',
    label: 'Locked Mask Protocols',
    icon: '🎭',
    cost: 5,
    prereqs: ['automation_gate'],
    blueprint: 'bp_feeding_mask',
    stageMin: 2,
    category: 'automation',
    desc: 'Sealed straps and tube quotas — feeding on schedule past sealed lips.',
  },
  {
    id: 'tech_redistribution',
    label: 'Fat Migration Sculpting',
    icon: '⚖️',
    cost: 7,
    prereqs: ['automation_gate'],
    blueprint: 'bp_redistribution_rig',
    stageMin: 2,
    category: 'automation',
    desc: 'Pressure nodes that vibrate fat toward zones Talia chooses.',
  },
  {
    id: 'tech_remote_feeding',
    label: 'Wireless Campus Drip',
    icon: '📡',
    cost: 6,
    prereqs: ['automation_gate', 'tech_feeder_arm'],
    blueprint: 'bp_remote_feeding',
    stageMin: 2,
    category: 'automation',
    desc: 'Drones and hidden pumps — feed from anywhere on campus.',
  },
  {
    id: 'tech_liquid_infuser',
    label: 'Liquid Fat Infusion',
    icon: '🧴',
    cost: 6,
    prereqs: ['tech_feeder_arm'],
    blueprint: 'bp_liquid_infuser',
    stageMin: 2,
    category: 'automation',
    desc: 'Warm slurry attachments that stack gain on any feeder host.',
  },
  // ── Stage 3 gates ──
  {
    id: 'nexus_gate',
    label: 'Distributed Nexus Integration',
    icon: '🌐',
    cost: 0,
    prereqs: ['automation_gate'],
    blueprint: null,
    stageMin: 3,
    category: 'core',
    desc: 'Autonomous mesh intelligence — unlocked at Networked Controller.',
    autoUnlockOnStage: 3,
  },
  {
    id: 'tech_predator_capture',
    label: 'Predator Capture Module',
    icon: '🕷️',
    cost: 8,
    prereqs: ['nexus_gate', 'tech_feeding_mask'],
    blueprint: 'bp_predator_capture',
    stageMin: 3,
    category: 'nexus',
    desc: 'Mask upgrade that hunts and pins targets for forced feeding.',
  },
  {
    id: 'tech_furniture_rig',
    label: 'Living Furniture Architecture',
    icon: '🪑',
    cost: 10,
    prereqs: ['nexus_gate', 'tech_redistribution'],
    blueprint: 'bp_furniture_rig',
    stageMin: 3,
    category: 'nexus',
    desc: 'Restraints and tubes that turn a body into maintained cushion.',
  },
];

export function techNodeById(id) {
  return LAB_TECH_NODES.find(n => n.id === id) || null;
}

export function initialUnlockedTech() {
  return LAB_TECH_NODES.filter(n => n.autoUnlock).map(n => n.id);
}

export function autoUnlocksForStage(stage) {
  return LAB_TECH_NODES
    .filter(n => n.autoUnlockOnStage === stage)
    .map(n => n.id);
}

export function isTechUnlocked(state, nodeId) {
  return (state?.unlockedTech || []).includes(nodeId);
}

export function canUnlockTech(state, nodeId) {
  const node = techNodeById(nodeId);
  if (!node || isTechUnlocked(state, nodeId)) return { ok: false, reason: 'owned' };
  if ((state?.stage ?? 1) < (node.stageMin ?? 1)) return { ok: false, reason: 'stage' };
  for (const p of node.prereqs || []) {
    if (!isTechUnlocked(state, p)) return { ok: false, reason: 'prereqs' };
  }
  if ((state?.breakthroughs ?? 0) < (node.cost ?? 0)) return { ok: false, reason: 'cost' };
  return { ok: true, node };
}

export function unlockTechNode(state, nodeId) {
  const check = canUnlockTech(state, nodeId);
  if (!check.ok) return { ok: false, reason: check.reason, state };
  const node = check.node;
  const unlockedTech = [...(state.unlockedTech || []), nodeId];
  const researched = new Set(state.researchedBlueprints || []);
  if (node.blueprint) researched.add(node.blueprint);
  return {
    ok: true,
    state: {
      ...state,
      unlockedTech,
      researchedBlueprints: [...researched],
      breakthroughs: (state.breakthroughs ?? 0) - (node.cost ?? 0),
    },
    node,
  };
}

export function applyStageTechUnlocks(state, stage) {
  let next = { ...state };
  const unlocked = new Set(next.unlockedTech || []);
  const researched = new Set(next.researchedBlueprints || []);
  for (const id of autoUnlocksForStage(stage)) {
    unlocked.add(id);
    const node = techNodeById(id);
    if (node?.blueprint) researched.add(node.blueprint);
  }
  next.unlockedTech = [...unlocked];
  next.researchedBlueprints = [...researched];
  return next;
}

export function rollSessionBreakthroughs(rng = Math.random) {
  return 2 + Math.floor(rng() * 3);
}

export function nodesByCategory(category) {
  return LAB_TECH_NODES.filter(n => n.category === category);
}

export const TECH_CATEGORIES = [
  { id: 'core', label: 'Core', icon: '🔬' },
  { id: 'feeding', label: 'Feeding', icon: '🍽️' },
  { id: 'automation', label: 'Automation', icon: '⚙️' },
  { id: 'nexus', label: 'Nexus', icon: '🌐' },
];

export function normalizeLabTechState(state) {
  if (!state) return state;
  const next = { ...state };
  if (next.breakthroughs == null) next.breakthroughs = 4;
  if (!next.unlockedTech?.length) {
    const unlocked = new Set(initialUnlockedTech());
    for (const node of LAB_TECH_NODES) {
      if (node.blueprint && (next.researchedBlueprints || []).includes(node.blueprint)) {
        unlocked.add(node.id);
      }
      if (node.autoUnlockOnStage && (next.stage ?? 1) >= node.autoUnlockOnStage) {
        unlocked.add(node.id);
      }
    }
    next.unlockedTech = [...unlocked];
  }
  return next;
}
