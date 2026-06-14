// ═══════════════════════════════════════════════════════════════
// TALIA NETWORK — lab stage 2–3 automation mesh
// ═══════════════════════════════════════════════════════════════

export const STAGE_SESSION_THRESHOLDS = [0, 3, 7, 12];

export const NETWORK_NODE_TYPES = {
  feeder: { id: 'feeder', label: 'Feed Relay', cost: { scrap_metal: 2, circuits: 1 }, maxLevel: 3 },
  pump: { id: 'pump', label: 'Pressure Pump', cost: { scrap_metal: 1, servos: 1, circuits: 1 }, maxLevel: 3 },
  sensor: { id: 'sensor', label: 'Hunger Sensor', cost: { circuits: 2, reagents: 1 }, maxLevel: 2 },
};

export const DEPLOYMENT_AREAS = [
  { id: 'dorms', label: 'Dorm wing', unlockStage: 2 },
  { id: 'dining', label: 'Dining hall', unlockStage: 2 },
  { id: 'quad', label: 'Central quad', unlockStage: 3 },
];

export const NETWORK_PROPOSALS = [
  { id: 'auto_feed_cycle', label: 'Automated feed cycle', requiresStage: 2, effect: { passiveGain: [1, 2] } },
  { id: 'campus_mesh', label: 'Campus-wide mesh', requiresStage: 3, effect: { passiveGain: [2, 4], scrutiny: 3 } },
];

function rollRange([lo, hi], rng = Math.random) {
  return Math.round(lo + rng() * (hi - lo));
}

export function defaultNetworkState(stage = 2) {
  return {
    stage,
    nodes: [],
    deployments: [],
    nexusLevel: 1,
    integration: 50,
    detectionRisk: stage >= 3 ? 0.12 : 0.08,
    pendingProposals: NETWORK_PROPOSALS.filter((p) => p.requiresStage <= stage).map((p) => p.id),
    deniedProposals: [],
    automationLevel: 0,
  };
}

export function ensureNetwork(labState) {
  if (!labState) return labState;
  if ((labState.stage ?? 1) < 2) return labState;
  if (labState.network) return labState;
  return { ...labState, network: defaultNetworkState(labState.stage) };
}

export function networkSummary(labState) {
  const net = labState?.network;
  if (!net) return null;
  return {
    nodeCount: net.nodes?.length ?? 0,
    deployments: net.deployments?.length ?? 0,
    nexusLevel: net.nexusLevel ?? 1,
    detectionRisk: Math.round((net.detectionRisk ?? 0) * 100),
    integration: net.integration ?? 0,
  };
}

export function syncSubjectInfluence(labState, students) {
  const net = ensureNetwork(labState)?.network;
  if (!net) return labState;
  const talia = students?.find((s) => s.evolvedForm === 'machine_goddess');
  const integration = talia
    ? Math.min(100, Math.round((talia.lbs - 120) / 8 + (net.nodes?.length ?? 0) * 4))
    : net.integration;
  return {
    ...labState,
    network: { ...net, integration },
  };
}

export function addNetworkNode(labState, typeId) {
  const state = ensureNetwork(labState);
  const type = NETWORK_NODE_TYPES[typeId];
  if (!type) return { ok: false, reason: 'invalid' };
  const parts = { ...(state.parts || {}) };
  for (const [k, v] of Object.entries(type.cost)) {
    if ((parts[k] ?? 0) < v) return { ok: false, reason: 'parts' };
    parts[k] -= v;
  }
  const node = { id: `node_${Date.now()}`, typeId, level: 1, automation: 0, experiments: [] };
  const network = {
    ...state.network,
    nodes: [...(state.network.nodes || []), node],
    detectionRisk: Math.min(0.45, (state.network.detectionRisk ?? 0.08) + 0.02),
  };
  return { ok: true, labState: { ...state, parts, network } };
}

export function upgradeNetworkNode(labState, nodeId) {
  const state = ensureNetwork(labState);
  const nodes = state.network?.nodes || [];
  const idx = nodes.findIndex((n) => n.id === nodeId);
  if (idx < 0) return { ok: false, reason: 'missing' };
  const node = nodes[idx];
  const type = NETWORK_NODE_TYPES[node.typeId];
  if (!type || node.level >= type.maxLevel) return { ok: false, reason: 'max' };
  const parts = { ...(state.parts || {}) };
  if ((parts.circuits ?? 0) < 1) return { ok: false, reason: 'parts' };
  parts.circuits -= 1;
  const nextNodes = [...nodes];
  nextNodes[idx] = { ...node, level: node.level + 1 };
  return { ok: true, labState: { ...state, parts, network: { ...state.network, nodes: nextNodes } } };
}

export function slotExperimentOnNode(labState, nodeId, slotIndex, experimentId) {
  const state = ensureNetwork(labState);
  const nodes = (state.network?.nodes || []).map((n) => {
    if (n.id !== nodeId) return n;
    const experiments = [...(n.experiments || [])];
    experiments[slotIndex] = experimentId;
    return { ...n, experiments };
  });
  return { ok: true, labState: { ...state, network: { ...state.network, nodes } } };
}

export function clearExperimentSlot(labState, nodeId, slotIndex) {
  const state = ensureNetwork(labState);
  const nodes = (state.network?.nodes || []).map((n) => {
    if (n.id !== nodeId) return n;
    const experiments = [...(n.experiments || [])];
    experiments[slotIndex] = null;
    return { ...n, experiments };
  });
  return { ok: true, labState: { ...state, network: { ...state.network, nodes } } };
}

export function setNodeAutomation(labState, nodeId, level) {
  const state = ensureNetwork(labState);
  const nodes = (state.network?.nodes || []).map((n) =>
    (n.id === nodeId ? { ...n, automation: Math.max(0, Math.min(3, level)) } : n),
  );
  return { ...state, network: { ...state.network, nodes } };
}

export function expandDeploymentArea(labState, areaId) {
  const state = ensureNetwork(labState);
  const area = DEPLOYMENT_AREAS.find((a) => a.id === areaId);
  if (!area || (state.stage ?? 1) < area.unlockStage) return { ok: false };
  const deployments = new Set(state.network?.deployments || []);
  if (deployments.has(areaId)) return { ok: false };
  deployments.add(areaId);
  return {
    ok: true,
    labState: {
      ...state,
      network: {
        ...state.network,
        deployments: [...deployments],
        detectionRisk: Math.min(0.5, (state.network.detectionRisk ?? 0.1) + 0.04),
      },
    },
  };
}

export function approveProposal(labState, proposalId) {
  const state = ensureNetwork(labState);
  const proposal = NETWORK_PROPOSALS.find((p) => p.id === proposalId);
  if (!proposal || !(state.network?.pendingProposals || []).includes(proposalId)) {
    return { ok: false };
  }
  const pending = state.network.pendingProposals.filter((id) => id !== proposalId);
  const approved = [...(state.network.approvedProposals || []), proposalId];
  return {
    ok: true,
    proposal,
    labState: {
      ...state,
      network: {
        ...state.network,
        pendingProposals: pending,
        approvedProposals: approved,
        automationLevel: (state.network.automationLevel ?? 0) + 1,
        detectionRisk: Math.min(0.55, (state.network.detectionRisk ?? 0.1) + (proposal.effect?.scrutiny ? 0.03 : 0.01)),
      },
    },
  };
}

export function denyProposal(labState, proposalId) {
  const state = ensureNetwork(labState);
  const pending = (state.network?.pendingProposals || []).filter((id) => id !== proposalId);
  return {
    ...state,
    instability: Math.max(0, (state.instability ?? 0) - 2),
    network: {
      ...state.network,
      pendingProposals: pending,
      deniedProposals: [...(state.network.deniedProposals || []), proposalId],
    },
  };
}

export function adjustNexusIntegration(labState, delta) {
  const state = ensureNetwork(labState);
  const integration = Math.max(0, Math.min(100, (state.network?.integration ?? 50) + delta));
  return { ...state, network: { ...state.network, integration } };
}

export function upgradeNexus(labState) {
  const state = ensureNetwork(labState);
  const parts = { ...(state.parts || {}) };
  if ((parts.circuits ?? 0) < 2 || (parts.servos ?? 0) < 1) return { ok: false };
  parts.circuits -= 2;
  parts.servos -= 1;
  return {
    ok: true,
    labState: {
      ...state,
      parts,
      network: {
        ...state.network,
        nexusLevel: (state.network.nexusLevel ?? 1) + 1,
        detectionRisk: Math.min(0.6, (state.network.detectionRisk ?? 0.1) + 0.05),
      },
    },
  };
}

export function tickNetworkWeek(labState, students, week, rng = Math.random) {
  const state = ensureNetwork(labState);
  const net = state.network;
  if (!net || (state.stage ?? 1) < 2) {
    return { labState: state, lines: [], studentDeltas: [], scrutinyDelta: 0 };
  }

  const lines = [];
  const studentDeltas = [];
  let scrutinyDelta = 0;

  const feederNodes = (net.nodes || []).filter((n) => n.typeId === 'feeder');
  const pumpNodes = (net.nodes || []).filter((n) => n.typeId === 'pump');
  const deploymentMult = 1 + (net.deployments?.length ?? 0) * 0.15;
  const approved = net.approvedProposals || [];

  if (feederNodes.length > 0) {
    const targets = (students || []).filter((s) => !s.hidden && s.id !== 18);
    if (targets.length) {
      const target = targets[Math.floor(rng() * targets.length)];
      const baseGain = rollRange([1, 3], rng) + feederNodes.reduce((a, n) => a + n.level, 0);
      const gainLbs = Math.round(baseGain * deploymentMult);
      studentDeltas.push({ studentId: target.id, gainLbs, psychDelta: { dependence: 1 } });
      lines.push(`⚙️ Network feeder cycle — ${target.name} received ${gainLbs} lbs from the mesh.`);
    }
  }

  if (pumpNodes.length > 0 && rng() < 0.35 * deploymentMult) {
    const gainLbs = rollRange([2, 5], rng);
    const targets = (students || []).filter((s) => !s.hidden);
    if (targets.length) {
      const target = targets[Math.floor(rng() * targets.length)];
      studentDeltas.push({ studentId: target.id, gainLbs, psychDelta: { obsession: 1 } });
      lines.push(`⚙️ Pressure pump surge — ${target.name} swelled ${gainLbs} lbs overnight.`);
    }
  }

  if (approved.includes('campus_mesh') && rng() < 0.4) {
    scrutinyDelta += 2;
    lines.push('🌐 Campus mesh activity drew administrative attention.');
  }

  if ((net.detectionRisk ?? 0) > 0.25 && rng() < net.detectionRisk) {
    scrutinyDelta += Math.round(net.detectionRisk * 10);
    lines.push('⚠️ Network detection risk spiked — someone noticed the lab\'s footprint.');
  }

  return { labState: state, lines, studentDeltas, scrutinyDelta };
}
