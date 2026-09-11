// ═══════════════════════════════════════════════════════════════
// RESEARCH TREE — blueprint branches & experiment unlocks
// ═══════════════════════════════════════════════════════════════
import { getTier } from './sessions.js';
import { isBlueprintResearched } from './labParts.js';
import { depthLabInstabilityGain } from './mechanicsDepthLayer.js';

export const RESEARCH_BRANCHES = [
  { id: 'feeding_force', label: 'Feeding & Force', icon: '🍽️', desc: 'Mechanical intake, automated feeding, hunger suppression.' },
  { id: 'restraint_control', label: 'Restraint & Control', icon: '🔗', desc: 'Compliance harnesses and pressure systems.' },
  { id: 'structural', label: 'Structural & Containment', icon: '🪑', desc: 'Furniture rigs, load-bearing supports, sealed chambers.' },
  { id: 'chemical', label: 'Chemical', icon: '🧪', desc: 'Serums, formulas, and volatile deposition.' },
];

export const RESEARCH_NODES = {
  bp_feeder_arm: {
    id: 'bp_feeder_arm',
    blueprint: 'bp_feeder_arm',
    branch: 'feeding_force',
    label: 'Auto-Feed Arm',
    deviceDefId: 'auto_feeder_arm',
    requires: { relationshipMin: 0 },
    experimentCost: 2,
    materials: {},
    riskChance: 0.05,
  },
  bp_force_feeder: {
    id: 'bp_force_feeder',
    blueprint: 'bp_force_feeder',
    branch: 'feeding_force',
    label: 'Force Feeder',
    deviceDefId: 'feeding_mask',
    requires: { relationshipMin: 1, blueprints: ['bp_feeder_arm'] },
    experimentCost: 4,
    materials: { reagents: 1 },
    riskChance: 0.12,
  },
  bp_hunger_engine: {
    id: 'bp_hunger_engine',
    blueprint: 'bp_hunger_engine',
    branch: 'feeding_force',
    label: 'Hunger Ray',
    deviceDefId: 'endless_hunger_engine',
    requires: { relationshipMin: 2, blueprints: ['bp_feeder_arm'] },
    experimentCost: 5,
    materials: { reagents: 2, exotics: 1 },
    riskChance: 0.18,
  },
  bp_obedience_belt: {
    id: 'bp_obedience_belt',
    blueprint: 'bp_obedience_belt',
    branch: 'restraint_control',
    label: 'Obedience Belt',
    deviceDefId: 'obedience_belt',
    requires: { relationshipMin: 0 },
    experimentCost: 2,
    materials: {},
    riskChance: 0.06,
  },
  bp_weight_belt: {
    id: 'bp_weight_belt',
    blueprint: 'bp_weight_belt',
    branch: 'restraint_control',
    label: 'Weight Belt',
    deviceDefId: 'auto_bloating_belt',
    requires: { relationshipMin: 1 },
    experimentCost: 3,
    materials: { servos: 1 },
    riskChance: 0.08,
  },
  bp_reinforced_legs: {
    id: 'bp_reinforced_legs',
    blueprint: 'bp_reinforced_legs',
    branch: 'structural',
    label: 'Reinforced Legs',
    deviceDefId: 'reinforced_legs',
    requires: { relationshipMin: 1, blueprints: ['bp_weight_belt'] },
    experimentCost: 4,
    materials: { servos: 2 },
    riskChance: 0.1,
  },
  bp_furniture_rig: {
    id: 'bp_furniture_rig',
    blueprint: 'bp_furniture_rig',
    branch: 'structural',
    label: 'Furniture Harness',
    deviceDefId: 'living_furniture_rig',
    requires: { relationshipMin: 2, blueprints: ['bp_reinforced_legs'] },
    experimentCost: 6,
    materials: { exotics: 2 },
    riskChance: 0.15,
  },
  bp_growth_chamber: {
    id: 'bp_growth_chamber',
    blueprint: 'bp_growth_chamber',
    branch: 'structural',
    label: 'Growth Chamber',
    deviceDefId: 'growth_accelerator_chamber',
    requires: { relationshipMin: 2, blueprints: ['bp_serum_injector'] },
    experimentCost: 7,
    materials: { exotics: 3, reagents: 2 },
    riskChance: 0.2,
  },
  bp_serum_injector: {
    id: 'bp_serum_injector',
    blueprint: 'bp_serum_injector',
    branch: 'chemical',
    label: 'Growth Formula',
    deviceDefId: 'growth_serum_injector',
    requires: { relationshipMin: 1 },
    experimentCost: 4,
    materials: { reagents: 2 },
    riskChance: 0.14,
  },
};

export const EXPERIMENT_SESSION_COST = {
  ap: 1,
  instability: 4,
};

export function relationshipTier(student) {
  return getTier(student?.relationship ?? 0).id;
}

export function getResearchNode(blueprintId) {
  return Object.values(RESEARCH_NODES).find((n) => n.blueprint === blueprintId) || null;
}

export function researchPrereqsMet(node, labState, taliaStudent) {
  if (!node) return false;
  const req = node.requires || {};
  if (relationshipTier(taliaStudent) < (req.relationshipMin ?? 0)) return false;
  for (const bp of req.blueprints || []) {
    if (!isBlueprintResearched(labState, bp)) return false;
  }
  return true;
}

export function canAffordExperiment(node, labState) {
  if (!node || !labState) return false;
  const pool = labState.parts || {};
  for (const [k, n] of Object.entries(node.materials || {})) {
    if ((pool[k] || 0) < n) return false;
  }
  return true;
}

export function canResearchNode(node, labState, taliaStudent) {
  if (!node || !labState) return false;
  if (isBlueprintResearched(labState, node.blueprint)) return false;
  if (!researchPrereqsMet(node, labState, taliaStudent)) return false;
  return canAffordExperiment(node, labState);
}

export function spendExperimentMaterials(labState, node) {
  const parts = { ...(labState.parts || {}) };
  for (const [k, n] of Object.entries(node.materials || {})) {
    parts[k] = Math.max(0, (parts[k] || 0) - n);
  }
  return {
    ...labState,
    parts,
    instability: Math.min(100, (labState.instability ?? 0) + depthLabInstabilityGain(EXPERIMENT_SESSION_COST.instability)),
  };
}

export function rollExperimentOutcome(node, rng = Math.random) {
  const fail = rng() < (node.riskChance ?? 0.1);
  if (fail) {
    return { ok: false, sideEffect: 'instability_spike', instabilityBonus: depthLabInstabilityGain(8) };
  }
  return { ok: true };
}

export function nodesForBranch(branchId) {
  return Object.values(RESEARCH_NODES).filter((n) => n.branch === branchId);
}
