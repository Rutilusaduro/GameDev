// ═══════════════════════════════════════════════════════════════
// TALIA NETWORK — stage 2+ automation mesh
// ═══════════════════════════════════════════════════════════════
import { getCircuitBoard } from './inventionUpgrades.js';

export const NETWORK_NODE_TYPES = [
  { id: 'relay', label: 'Calorie Relay', desc: 'Routes passive drip to the roster each week.' },
  { id: 'sensor', label: 'Craving Sensor', desc: 'Raises integration and proposal quality.' },
  { id: 'pump', label: 'Pressure Pump', desc: 'Higher automation output per level.' },
];

export const DEPLOYMENT_AREAS = [
  { id: 'dining_hall', label: 'Dining Hall', emoji: '🍽️' },
  { id: 'dorms', label: 'Residence Halls', emoji: '🏠' },
  { id: 'gym', label: 'Athletic Center', emoji: '🏋️' },
  { id: 'library', label: 'Library Stacks', emoji: '📚' },
];

export const NETWORK_EXPERIMENTS = [
  { id: 'craving_amp', label: 'Craving Amp', desc: '+4 automation when slotted.' },
  { id: 'stealth_coat', label: 'Stealth Coat', desc: '−2 detection risk while slotted.' },
  { id: 'surge_route', label: 'Surge Route', desc: '+6 automation, +1 scrutiny risk.' },
];

export function automationThreshold(network) {
  const nexus = network?.nexusLevel ?? 1;
  return Math.max(12, 25 - nexus * 4);
}

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

export function syncSubjectInfluence(labState, students) {
  const next = ensureNetwork(labState);
  if (!next.network || !students?.length) return next;
  const avgRel = students
    .filter((s) => !s.hidden && s.id !== 18)
    .reduce((a, s) => a + (s.relationship ?? 0), 0) / Math.max(1, students.filter((s) => !s.hidden && s.id !== 18).length);
  const integration = Math.min(100, Math.round((next.network.integration ?? 45) + avgRel / 50));
  return {
    ...next,
    network: { ...next.network, integration },
  };
}

export function tickNetworkWeek(labState, students, week, rng = Math.random) {
  const next = ensureNetwork(labState);
  const network = next.network;
  if (!network || (next.stage ?? 1) < 2) {
    return { labState: next, lines: [], studentDeltas: [], scrutinyDelta: 0 };
  }

  const disabledWeeks = network.disabledWeeks ?? 0;
  if (disabledWeeks > 0) {
    const updatedNetwork = { ...network, disabledWeeks: disabledWeeks - 1 };
    return {
      labState: { ...next, network: updatedNetwork },
      lines: disabledWeeks === 1 ? ['🌐 Lab network nodes back online after compliance audit.'] : ['🌐 Network nodes remain offline after device confiscation audit.'],
      studentDeltas: [],
      scrutinyDelta: 0,
    };
  }

  const lines = [];
  const studentDeltas = [];
  let scrutinyDelta = 0;

  const nodes = network.nodes || [];
  const meshBonus = (getCircuitBoard(next, 'endless_hunger_engine').unlockedNodes || []).includes('ehe_mesh_arrival') ? 10 : 0;
  const automationTotal = nodes.reduce((a, n) => a + (n.automation ?? 0), 0)
    + nodes.reduce((a, n) => a + (n.slots || []).filter(Boolean).length * 4, 0)
    + meshBonus;
  const deployed = (network.deploymentAreas || []).length;
  const visible = (students || []).filter((s) => !s.hidden && s.id !== 18);
  const threshold = automationThreshold(network);

  if (automationTotal >= threshold && visible.length && rng() < 0.55) {
    const target = visible[Math.floor(rng() * visible.length)];
    const gainLbs = Math.max(1, Math.floor(automationTotal / 35) + rndBand(rng, 1, 2));
    studentDeltas.push({ studentId: target.id, gainLbs, psychDelta: { dependence: 1 } });
    lines.push(`🌐 Mesh drip — ${target.name} absorbs ${gainLbs} lbs from automated routing.`);
  }

  if (deployed > 0) scrutinyDelta += Math.max(0, Math.floor(deployed / 2));
  const detectionRisk = network.detectionRisk ?? 0;
  if (detectionRisk > 15 && rng() < 0.28) {
    scrutinyDelta += 2;
    lines.push('🌐 Campus sensors logged an unusual thermal signature near your network nodes.');
  }

  let proposals = network.proposals || [];
  if (!proposals.some((p) => !p.resolved) && rng() < 0.22) {
    proposals = [
      ...proposals,
      {
        id: `prop_${week}_${proposals.length + 1}`,
        label: 'Route surplus calories through cafeteria vents',
        resolved: null,
      },
    ];
    lines.push('🌐 Talia queued a network expansion proposal for your review.');
  }

  const updatedNetwork = {
    ...network,
    detectionRisk: Math.max(0, detectionRisk - 1),
    integration: Math.min(100, (network.integration ?? 45) + (nodes.length ? 1 : 0)),
    proposals,
  };

  return {
    labState: { ...next, network: updatedNetwork },
    lines,
    studentDeltas,
    scrutinyDelta,
  };
}

function rndBand(rng, lo, hi) {
  return lo + Math.floor(rng() * (hi - lo + 1));
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
  network.nodes = [
    ...(network.nodes || []),
    { id: `${typeId}_${network.nodes.length + 1}`, typeId, level: 1, automation: 0, slots: [] },
  ];
  network.detectionRisk = (network.detectionRisk ?? 0) + 2;
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
  return {
    ok: true,
    labState: {
      ...labState,
      network: {
        ...network,
        proposals,
        integration: Math.min(100, (network.integration ?? 45) + 6),
        detectionRisk: (network.detectionRisk ?? 0) + 3,
      },
    },
    proposal,
  };
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
