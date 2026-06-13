// ═══════════════════════════════════════════════════════════════
// LAB TECH TREE — growth-device research gates
// ═══════════════════════════════════════════════════════════════

export const LAB_TECH_NODES = {
  tech_serum_injector: {
    id: 'tech_serum_injector',
    label: 'Serum Deposition',
    blueprint: 'bp_serum_injector',
    requires: [],
  },
  tech_bloating_belt: {
    id: 'tech_bloating_belt',
    label: 'Pressure Bloat Systems',
    blueprint: 'bp_bloating_belt',
    requires: [],
  },
  automation_gate: {
    id: 'automation_gate',
    label: 'Feedback Automation',
    blueprint: 'bp_feeder_arm',
    requires: ['tech_serum_injector'],
  },
  nexus_gate: {
    id: 'nexus_gate',
    label: 'Nexus Integration',
    blueprint: 'bp_growth_chamber',
    requires: ['tech_serum_injector', 'automation_gate'],
  },
  tech_growth_sprayer: {
    id: 'tech_growth_sprayer',
    label: 'Aerosol Growth',
    blueprint: 'bp_serum_sprayer',
    requires: ['tech_serum_injector'],
  },
  tech_bloating_gas: {
    id: 'tech_bloating_gas',
    label: 'Volatile Bloat Gas',
    blueprint: 'bp_bloating_gas',
    requires: ['tech_bloating_belt'],
  },
  tech_growth_stimulator: {
    id: 'tech_growth_stimulator',
    label: 'Pleasure-Growth Coupling',
    blueprint: 'bp_growth_stimulator',
    requires: ['automation_gate'],
  },
  tech_growth_chamber: {
    id: 'tech_growth_chamber',
    label: 'Accelerator Chamber',
    blueprint: 'bp_growth_chamber',
    requires: ['nexus_gate', 'tech_serum_injector'],
  },
  tech_limit_remover: {
    id: 'tech_limit_remover',
    label: 'Limiter Excision',
    blueprint: 'bp_limit_remover',
    requires: ['tech_growth_chamber'],
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
