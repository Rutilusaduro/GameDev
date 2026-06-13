// ═══════════════════════════════════════════════════════════════
// LAB TECH TREE — invention research gates
// ═══════════════════════════════════════════════════════════════

export const LAB_TECH_NODES = {
  tech_feeder_arm: {
    id: 'tech_feeder_arm',
    label: 'Automated Feeding',
    blueprint: 'bp_feeder_arm',
    requires: [],
  },
  tech_force_feeder: {
    id: 'tech_force_feeder',
    label: 'Forced Intake',
    blueprint: 'bp_force_feeder',
    requires: ['tech_feeder_arm'],
  },
  tech_weight_belt: {
    id: 'tech_weight_belt',
    label: 'Pressure Bloat',
    blueprint: 'bp_weight_belt',
    requires: [],
  },
  tech_obedience_belt: {
    id: 'tech_obedience_belt',
    label: 'Compliance Harness',
    blueprint: 'bp_obedience_belt',
    requires: [],
  },
  tech_reinforced_legs: {
    id: 'tech_reinforced_legs',
    label: 'Load-Bearing Braces',
    blueprint: 'bp_reinforced_legs',
    requires: ['tech_weight_belt'],
  },
  tech_furniture_rig: {
    id: 'tech_furniture_rig',
    label: 'Living Furniture',
    blueprint: 'bp_furniture_rig',
    requires: ['tech_reinforced_legs'],
  },
  tech_serum_injector: {
    id: 'tech_serum_injector',
    label: 'Serum Deposition',
    blueprint: 'bp_serum_injector',
    requires: [],
  },
  tech_growth_chamber: {
    id: 'tech_growth_chamber',
    label: 'Accelerator Chamber',
    blueprint: 'bp_growth_chamber',
    requires: ['tech_serum_injector'],
  },
  tech_hunger_engine: {
    id: 'tech_hunger_engine',
    label: 'Satiety Suppression',
    blueprint: 'bp_hunger_engine',
    requires: ['tech_feeder_arm'],
  },
};

export function getTechNodeForBlueprint(blueprintId) {
  return Object.values(LAB_TECH_NODES).find(n => n.blueprint === blueprintId) || null;
}

export function isTechNodeUnlocked(labState, nodeId) {
  const node = LAB_TECH_NODES[nodeId];
  if (!node) return true;
  const researched = new Set(labState?.researchedBlueprints || []);
  if (!researched.has(node.blueprint)) return false;
  return (node.requires || []).every(req => {
    const reqNode = LAB_TECH_NODES[req];
    if (!reqNode) return true;
    return researched.has(reqNode.blueprint);
  });
}

export function techPrereqsMet(labState, blueprintId) {
  const node = getTechNodeForBlueprint(blueprintId);
  if (!node) return true;
  const researched = new Set(labState?.researchedBlueprints || []);
  return (node.requires || []).every(req => {
    const reqNode = LAB_TECH_NODES[req];
    return reqNode ? researched.has(reqNode.blueprint) : true;
  });
}
