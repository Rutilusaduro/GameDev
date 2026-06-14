// ═══════════════════════════════════════════════════════════════
// TALIA NETWORK — stage 2+ automation mesh (stub implementation)
// Provides save-safe defaults until the full network UI ships.
// ═══════════════════════════════════════════════════════════════

export function defaultNetworkState(stage = 2) {
  return {
    stage,
    nexusLevel: 1,
    integration: 45,
    detectionRisk: 0,
    nodes: [],
    deploymentAreas: [],
    proposals: [],
  };
}

export function ensureNetwork(labState) {
  if (!labState) return labState;
  if ((labState.stage ?? 1) >= 2 && !labState.network) {
    return { ...labState, network: defaultNetworkState(labState.stage) };
  }
  return labState;
}

export function syncSubjectInfluence(labState, _students) {
  return ensureNetwork(labState);
}

export function tickNetworkWeek(labState, _students, _week, _rng = Math.random) {
  const next = ensureNetwork(labState);
  return { labState: next, lines: [], studentDeltas: [], scrutinyDelta: 0 };
}

function spendParts(labState, cost) {
  const parts = { ...(labState.parts || {}) };
  for (const [id, qty] of Object.entries(cost)) {
    if ((parts[id] ?? 0) < qty) return null;
    parts[id] -= qty;
  }
  return { ...labState, parts };
}

export function addNetworkNode(labState, typeId) {
  const next = spendParts(labState, { scrap: 2, circuits: 1 });
  if (!next) return { ok: false, reason: 'parts' };
  const network = { ...(next.network || defaultNetworkState(next.stage)) };
  network.nodes = [...(network.nodes || []), { id: `${typeId}_${network.nodes.length + 1}`, typeId, level: 1, automation: 0, slots: [] }];
  return { ok: true, labState: { ...next, network } };
}

export function slotExperimentOnNode(labState, nodeId, slotIndex, experimentId) {
  const network = labState?.network;
  if (!network) return { ok: false };
  const nodes = (network.nodes || []).map((n) => {
    if (n.id !== nodeId) return n;
    const slots = [...(n.slots || [])];
    slots[slotIndex] = experimentId;
    return { ...n, slots };
  });
  return { ok: true, labState: { ...labState, network: { ...network, nodes } } };
}

export function clearExperimentSlot(labState, nodeId, slotIndex) {
  return slotExperimentOnNode(labState, nodeId, slotIndex, null);
}

export function upgradeNetworkNode(labState, nodeId) {
  const next = spendParts(labState, { circuits: 2 });
  if (!next) return { ok: false, reason: 'parts' };
  const network = next.network || defaultNetworkState(next.stage);
  const nodes = (network.nodes || []).map((n) => (n.id === nodeId ? { ...n, level: Math.min(3, (n.level ?? 1) + 1) } : n));
  return { ok: true, labState: { ...next, network: { ...network, nodes } } };
}

export function setNodeAutomation(labState, nodeId, level) {
  const network = labState?.network;
  if (!network) return labState;
  const nodes = (network.nodes || []).map((n) => (n.id === nodeId ? { ...n, automation: level } : n));
  return { ...labState, network: { ...network, nodes } };
}

export function expandDeploymentArea(labState, areaId) {
  const network = labState?.network || defaultNetworkState(labState?.stage);
  const areas = new Set(network.deploymentAreas || []);
  if (areas.has(areaId)) return { ok: false };
  areas.add(areaId);
  return {
    ok: true,
    labState: {
      ...labState,
      network: { ...network, deploymentAreas: [...areas], detectionRisk: (network.detectionRisk ?? 0) + 4 },
    },
  };
}

export function approveProposal(labState, proposalId) {
  const network = labState?.network;
  if (!network) return { ok: false };
  const proposal = (network.proposals || []).find((p) => p.id === proposalId);
  if (!proposal || proposal.resolved) return { ok: false };
  const proposals = (network.proposals || []).map((p) => (p.id === proposalId ? { ...p, resolved: 'approved' } : p));
  return { ok: true, labState: { ...labState, network: { ...network, proposals } }, proposal };
}

export function denyProposal(labState, proposalId) {
  const network = labState?.network;
  if (!network) return labState;
  const proposals = (network.proposals || []).map((p) => (p.id === proposalId ? { ...p, resolved: 'denied' } : p));
  return {
    ...labState,
    network: { ...network, proposals, detectionRisk: Math.max(0, (network.detectionRisk ?? 0) - 2) },
  };
}

export function adjustNexusIntegration(labState, delta) {
  const network = labState?.network || defaultNetworkState(labState?.stage);
  const integration = Math.min(100, Math.max(0, (network.integration ?? 45) + delta));
  return { ...labState, network: { ...network, integration } };
}

export function upgradeNexus(labState) {
  const next = spendParts(labState, { circuits: 3, scrap: 2 });
  if (!next) return { ok: false };
  const network = next.network || defaultNetworkState(next.stage);
  return { ok: true, labState: { ...next, network: { ...network, nexusLevel: (network.nexusLevel ?? 1) + 1 } } };
}
