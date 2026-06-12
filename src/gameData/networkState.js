// ═══════════════════════════════════════════════════════════════
// TALIA NETWORK — Stage 2/3 node graph, influence, events
// ═══════════════════════════════════════════════════════════════
import { getExperiment } from './networkExperiments.js';
import '../textEngine/scenes/talia/networkText.js';
import { renderNetworkEventLine, renderProposalLine } from '../textEngine/scenes/talia/networkText.js';

let _nodeCounter = 0;
function nextNodeId() {
  _nodeCounter += 1;
  return `net_${Date.now()}_${_nodeCounter}`;
}

export const NODE_TYPES = {
  feeder: {
    id: 'feeder',
    label: 'Feeder Node',
    icon: '🔵',
    slots: 2,
    maxLevel: 3,
    unlockStage: 2,
    baseStability: 8,
    baseMaintenance: 2,
    color: '#40a0e0',
  },
  control: {
    id: 'control',
    label: 'Control Node',
    icon: '◇',
    slots: 2,
    maxLevel: 3,
    unlockStage: 2,
    baseStability: 6,
    baseMaintenance: 3,
    color: '#30d0f0',
  },
  sensor: {
    id: 'sensor',
    label: 'Sensor Node',
    icon: '👁',
    slots: 1,
    maxLevel: 2,
    unlockStage: 2,
    baseStability: 5,
    baseMaintenance: 1,
    color: '#80c0ff',
  },
  hub: {
    id: 'hub',
    label: 'Hub Node',
    icon: '⬡',
    slots: 3,
    maxLevel: 4,
    unlockStage: 2,
    baseStability: 12,
    baseMaintenance: 4,
    color: '#50e8ff',
  },
  stealth: {
    id: 'stealth',
    label: 'Stealth Node',
    icon: '🌑',
    slots: 2,
    maxLevel: 2,
    unlockStage: 2,
    baseStability: 4,
    baseMaintenance: 2,
    color: '#306080',
  },
  maintenance: {
    id: 'maintenance',
    label: 'Maintenance Node',
    icon: '🛠',
    slots: 2,
    maxLevel: 3,
    unlockStage: 2,
    baseStability: 10,
    baseMaintenance: 5,
    color: '#6090a0',
  },
  conditioning: {
    id: 'conditioning',
    label: 'Conditioning Node',
    icon: '〰️',
    slots: 2,
    maxLevel: 3,
    unlockStage: 3,
    baseStability: 5,
    baseMaintenance: 3,
    color: '#a060e0',
  },
};

export const DEPLOYMENT_AREAS = [
  { id: 'dorms', label: 'Dorms', emoji: '🏠', baseDetection: 12, unlockStage: 2 },
  { id: 'quad', label: 'The Quad', emoji: '🌳', baseDetection: 22, unlockStage: 2 },
  { id: 'dining', label: 'Dining District', emoji: '🍽️', baseDetection: 18, unlockStage: 2 },
  { id: 'academic', label: 'Academic Core', emoji: '🎓', baseDetection: 28, unlockStage: 2 },
  { id: 'athletics', label: 'Athletics Complex', emoji: '🏋️', baseDetection: 20, unlockStage: 2 },
  { id: 'union', label: 'Student Union', emoji: '🏛️', baseDetection: 25, unlockStage: 3 },
  { id: 'faculty', label: 'Faculty Wing', emoji: '👩‍🏫', baseDetection: 35, unlockStage: 3 },
];

const NODE_BUILD_COST = { feeder: 2, control: 2, sensor: 1, hub: 4, stealth: 2, maintenance: 3, conditioning: 3 };
const AREA_EXPAND_DETECTION = 8;

export function defaultNetworkState(stage = 2) {
  const hubId = nextNodeId();
  const network = {
    nodes: [{
      id: hubId,
      type: 'hub',
      x: 50,
      y: 50,
      level: 1,
      automation: 0,
      slots: [null, null, null],
      areaId: 'dorms',
      active: true,
    }],
    edges: [],
    stats: {},
    nexus: { level: 1, integration: 0 },
    proposals: [],
    connectedSubjects: {},
    deployedAreas: ['dorms'],
    eventLog: [],
    weeksOperational: 0,
    pendingEvents: [],
  };
  network.stats = computeNetworkStats(network, stage);
  return network;
}

export function ensureNetwork(labState) {
  if (!labState || (labState.stage ?? 1) < 2) return labState;
  if (labState.network?.nodes?.length) return labState;
  return { ...labState, network: defaultNetworkState(labState.stage) };
}

export function nodeTypeMeta(typeId) {
  return NODE_TYPES[typeId] || null;
}

export function slotCountForNode(node) {
  const meta = NODE_TYPES[node?.type];
  return meta?.slots ?? 1;
}

function aggregateExperimentEffects(network) {
  const agg = {
    stability: 0, automation: 0, coverage: 0, influence: 0,
    detection: 0, maintenance: 0, caloricBonus: 0, backlash: 0, integration: 0,
  };
  for (const node of network.nodes || []) {
    if (!node.active) continue;
    const meta = NODE_TYPES[node.type];
    if (meta) {
      agg.stability += meta.baseStability * (node.level || 1) * 0.15;
      agg.maintenance += meta.baseMaintenance;
    }
    for (const expId of node.slots || []) {
      if (!expId) continue;
      const exp = getExperiment(expId);
      if (!exp?.effects) continue;
      const e = exp.effects;
      agg.stability += e.stability ?? 0;
      agg.automation += e.automation ?? 0;
      agg.coverage += e.coverage ?? 0;
      agg.influence += e.influence ?? 0;
      agg.detection += e.detection ?? 0;
      agg.maintenance += e.maintenance ?? 0;
      agg.caloricBonus += e.caloricBonus ?? 0;
      agg.backlash += e.backlash ?? 0;
      agg.integration += e.integration ?? 0;
    }
    agg.automation += Math.min(3, node.automation ?? 0);
  }
  agg.coverage += (network.deployedAreas?.length ?? 1) - 1;
  return agg;
}

export function computeNetworkStats(network, labStage = 2) {
  if (!network) return null;
  const agg = aggregateExperimentEffects(network);
  const nexusBonus = (network.nexus?.level ?? 1) * 3;
  const integration = network.nexus?.integration ?? 0;
  let detection = 8 + agg.detection;
  for (const areaId of network.deployedAreas || []) {
    const area = DEPLOYMENT_AREAS.find(a => a.id === areaId);
    if (area) detection += area.baseDetection * 0.35;
  }
  detection = Math.max(0, Math.min(100, detection - agg.stability * 0.08));
  const stability = Math.max(5, Math.min(100, 55 + agg.stability + nexusBonus - agg.automation * 4));
  const automation = Math.min(3, Math.floor(agg.automation / 3));
  return {
    stability: Math.round(stability),
    automation,
    coverage: Math.max(1, Math.round(agg.coverage + (network.deployedAreas?.length ?? 1))),
    influence: Math.round(agg.influence + integration * 0.4),
    detectionRisk: Math.round(detection),
    maintenanceCost: Math.max(0, Math.round(agg.maintenance)),
    caloricBonus: Math.min(0.85, agg.caloricBonus),
    backlash: Math.round(agg.backlash + integration * 0.15),
  };
}

export function addNetworkNode(labState, typeId, areaId = 'dorms') {
  const network = labState.network;
  if (!network) return { labState, ok: false, reason: 'no_network' };
  const meta = NODE_TYPES[typeId];
  if (!meta || (meta.unlockStage ?? 2) > (labState.stage ?? 1)) {
    return { labState, ok: false, reason: 'locked' };
  }
  const cost = NODE_BUILD_COST[typeId] ?? 2;
  if ((labState.parts?.scrap ?? 0) < cost) return { labState, ok: false, reason: 'parts' };
  const angle = (network.nodes.length * 0.9) % (Math.PI * 2);
  const r = 18 + (network.nodes.length % 4) * 8;
  const node = {
    id: nextNodeId(),
    type: typeId,
    x: 50 + Math.cos(angle) * r,
    y: 50 + Math.sin(angle) * r,
    level: 1,
    automation: 0,
    slots: Array(meta.slots).fill(null),
    areaId,
    active: true,
  };
  const parts = { ...(labState.parts || {}), scrap: (labState.parts?.scrap ?? 0) - cost };
  const hub = network.nodes.find(n => n.type === 'hub');
  const edges = [...network.edges];
  if (hub && hub.id !== node.id) {
    edges.push({ from: hub.id, to: node.id });
  }
  const nextNetwork = {
    ...network,
    nodes: [...network.nodes, node],
    edges,
  };
  nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
  return {
    labState: { ...labState, parts, network: nextNetwork },
    ok: true,
    nodeId: node.id,
  };
}

export function slotExperimentOnNode(labState, nodeId, slotIndex, experimentId) {
  const network = labState.network;
  const node = network?.nodes?.find(n => n.id === nodeId);
  if (!node) return { labState, ok: false };
  if (!experimentId) {
    const slots = [...(node.slots || [])];
    if (slotIndex < 0 || slotIndex >= slots.length) return { labState, ok: false };
    slots[slotIndex] = null;
    const nodes = network.nodes.map(n => n.id === nodeId ? { ...n, slots } : n);
    const nextNetwork = { ...network, nodes };
    nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
    return { labState: { ...labState, network: nextNetwork }, ok: true };
  }
  const exp = getExperiment(experimentId);
  if (!exp) return { labState, ok: false };
  if (exp.nodeTypes && !exp.nodeTypes.includes(node.type)) return { labState, ok: false, reason: 'wrong_node' };
  const slots = [...(node.slots || [])];
  if (slotIndex < 0 || slotIndex >= slots.length) return { labState, ok: false };
  slots[slotIndex] = experimentId;
  const nodes = network.nodes.map(n => n.id === nodeId ? { ...n, slots } : n);
  const nextNetwork = { ...network, nodes };
  nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
  return { labState: { ...labState, network: nextNetwork }, ok: true };
}

export function clearExperimentSlot(labState, nodeId, slotIndex) {
  return slotExperimentOnNode(labState, nodeId, slotIndex, null);
}

export function upgradeNetworkNode(labState, nodeId) {
  const network = labState.network;
  const node = network?.nodes?.find(n => n.id === nodeId);
  const meta = NODE_TYPES[node?.type];
  if (!node || !meta) return { labState, ok: false };
  if ((node.level ?? 1) >= meta.maxLevel) return { labState, ok: false, reason: 'max' };
  const cost = 2 + (node.level ?? 1);
  if ((labState.parts?.circuits ?? 0) < cost) return { labState, ok: false, reason: 'parts' };
  const parts = { ...(labState.parts || {}), circuits: (labState.parts?.circuits ?? 0) - cost };
  const nodes = network.nodes.map(n => n.id === nodeId ? { ...n, level: (n.level ?? 1) + 1 } : n);
  const nextNetwork = { ...network, nodes };
  nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
  return { labState: { ...labState, parts, network: nextNetwork }, ok: true };
}

export function setNodeAutomation(labState, nodeId, level) {
  const network = labState.network;
  const nodes = network.nodes.map(n => n.id === nodeId ? { ...n, automation: Math.max(0, Math.min(3, level)) } : n);
  const nextNetwork = { ...network, nodes };
  nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
  return { ...labState, network: nextNetwork };
}

export function expandDeploymentArea(labState, areaId) {
  const network = labState.network;
  const area = DEPLOYMENT_AREAS.find(a => a.id === areaId);
  if (!area || (area.unlockStage ?? 2) > (labState.stage ?? 1)) {
    return { labState, ok: false };
  }
  if (network.deployedAreas?.includes(areaId)) return { labState, ok: false, reason: 'exists' };
  const deployedAreas = [...(network.deployedAreas || []), areaId];
  const nextNetwork = {
    ...network,
    deployedAreas,
    stats: computeNetworkStats({ ...network, deployedAreas }, labState.stage),
  };
  nextNetwork.stats.detectionRisk = Math.min(100, (nextNetwork.stats.detectionRisk ?? 0) + AREA_EXPAND_DETECTION);
  return { labState: { ...labState, network: nextNetwork }, ok: true };
}

export function adjustNexusIntegration(labState, delta) {
  if ((labState.stage ?? 1) < 3) return labState;
  const network = labState.network;
  const integration = Math.max(0, Math.min(100, (network.nexus?.integration ?? 0) + delta));
  const nextNetwork = {
    ...network,
    nexus: { ...(network.nexus || {}), integration },
  };
  nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
  return { ...labState, network: nextNetwork };
}

export function upgradeNexus(labState) {
  if ((labState.stage ?? 1) < 3) return { labState, ok: false };
  const network = labState.network;
  const level = network.nexus?.level ?? 1;
  if (level >= 5) return { labState, ok: false, reason: 'max' };
  const cost = { exotics: 2, circuits: 3, servos: 2 };
  for (const [k, n] of Object.entries(cost)) {
    if ((labState.parts?.[k] ?? 0) < n) return { labState, ok: false, reason: 'parts' };
  }
  const parts = { ...(labState.parts || {}) };
  for (const [k, n] of Object.entries(cost)) parts[k] = (parts[k] ?? 0) - n;
  const nextNetwork = {
    ...network,
    nexus: { ...(network.nexus || {}), level: level + 1 },
  };
  nextNetwork.stats = computeNetworkStats(nextNetwork, labState.stage);
  return { labState: { ...labState, parts, network: nextNetwork }, ok: true };
}

function pick(rng, arr) {
  if (!arr?.length) return null;
  return arr[Math.floor(rng() * arr.length)];
}

export function syncSubjectInfluence(labState, students) {
  const network = labState.network;
  if (!network) return labState;
  const connected = { ...(network.connectedSubjects || {}) };
  const stats = network.stats || computeNetworkStats(network, labState.stage);
  for (const st of students) {
    if (st.hidden || st.evolvedForm === 'machine_goddess') continue;
    const prev = connected[st.id] || { influence: 0, resistance: st.corruption ?? 0 };
    let gain = 0;
    if (st.equip && Object.values(st.equip).some(Boolean)) gain += 3;
    if ((st.relationship ?? 0) > 50) gain += 2;
    if ((st.psych?.dependence ?? 0) > 20) gain += 2;
    gain += Math.floor((stats.influence ?? 0) / 15);
    const resistance = Math.max(0, (st.corruption ?? 0) * 0.1 - (stats.backlash ?? 0) * 0.05);
    const influence = Math.min(100, (prev.influence ?? 0) + gain - resistance * 0.3);
    connected[st.id] = {
      influence: Math.round(influence),
      resistance: Math.round(resistance),
      conditioned: influence >= 40,
      backlashRisk: influence >= 70 && (stats.backlash ?? 0) > 10,
    };
  }
  return {
    ...labState,
    network: { ...network, connectedSubjects: connected },
  };
}

const NETWORK_EVENT_TABLE = [
  { id: 'efficiency_surge', weight: 4, tier: 'positive', minAutomation: 1 },
  { id: 'conditioning_breakthrough', weight: 3, tier: 'positive', minStage: 3 },
  { id: 'data_insight', weight: 4, tier: 'positive' },
  { id: 'synergy_pulse', weight: 3, tier: 'positive', minNodes: 4 },
  { id: 'malfunction', weight: 5, tier: 'negative' },
  { id: 'cascade_failure', weight: 2, tier: 'negative', maxStability: 45 },
  { id: 'detection_complaint', weight: 4, tier: 'negative', minDetection: 35 },
  { id: 'detection_investigation', weight: 2, tier: 'negative', minDetection: 55 },
  { id: 'backlash', weight: 2, tier: 'negative', minStage: 3, minBacklash: 8 },
  { id: 'overextension', weight: 2, tier: 'negative', minAreas: 4 },
  { id: 'system_rebellion', weight: 1, tier: 'critical', minStage: 3, minAutomation: 2, maxStability: 35 },
];

function rollNetworkEvent(network, labStage, rng) {
  const stats = network.stats || {};
  const pool = NETWORK_EVENT_TABLE.filter(ev => {
    if (ev.minStage && labStage < ev.minStage) return false;
    if (ev.minAutomation && (stats.automation ?? 0) < ev.minAutomation) return false;
    if (ev.maxStability && (stats.stability ?? 100) > ev.maxStability) return false;
    if (ev.minDetection && (stats.detectionRisk ?? 0) < ev.minDetection) return false;
    if (ev.minBacklash && (stats.backlash ?? 0) < ev.minBacklash) return false;
    if (ev.minNodes && (network.nodes?.length ?? 0) < ev.minNodes) return false;
    if (ev.minAreas && (network.deployedAreas?.length ?? 0) < ev.minAreas) return false;
    return true;
  });
  if (!pool.length || rng() > 0.55) return null;
  const totalW = pool.reduce((a, e) => a + e.weight, 0);
  let roll = rng() * totalW;
  for (const ev of pool) {
    roll -= ev.weight;
    if (roll <= 0) return ev;
  }
  return pool[0];
}

function applyEventEffects(network, eventId, rng) {
  const stats = { ...(network.stats || {}) };
  const nodes = [...(network.nodes || [])];
  switch (eventId) {
    case 'efficiency_surge':
      stats.caloricBonus = Math.min(0.9, (stats.caloricBonus ?? 0) + 0.1);
      stats.stability = Math.min(100, (stats.stability ?? 0) + 5);
      break;
    case 'conditioning_breakthrough':
      stats.influence = (stats.influence ?? 0) + 8;
      break;
    case 'data_insight':
      stats.detectionRisk = Math.max(0, (stats.detectionRisk ?? 0) - 4);
      break;
    case 'synergy_pulse':
      stats.stability = Math.min(100, (stats.stability ?? 0) + 8);
      stats.automation = Math.min(3, (stats.automation ?? 0) + 1);
      break;
    case 'malfunction': {
      const idx = Math.floor(rng() * nodes.length);
      if (nodes[idx]) nodes[idx] = { ...nodes[idx], active: false };
      stats.stability = Math.max(5, (stats.stability ?? 0) - 10);
      break;
    }
    case 'cascade_failure':
      nodes.forEach((n, i) => { if (i > 0 && rng() < 0.4) nodes[i] = { ...n, active: false }; });
      stats.stability = Math.max(5, (stats.stability ?? 0) - 18);
      break;
    case 'detection_complaint':
      stats.detectionRisk = Math.min(100, (stats.detectionRisk ?? 0) + 10);
      break;
    case 'detection_investigation':
      stats.detectionRisk = Math.min(100, (stats.detectionRisk ?? 0) + 18);
      stats.stability = Math.max(5, (stats.stability ?? 0) - 6);
      break;
    case 'backlash':
      stats.backlash = (stats.backlash ?? 0) + 6;
      stats.influence = Math.max(0, (stats.influence ?? 0) - 4);
      break;
    case 'overextension':
      stats.stability = Math.max(5, (stats.stability ?? 0) - 12);
      stats.maintenanceCost = (stats.maintenanceCost ?? 0) + 3;
      break;
    case 'system_rebellion':
      stats.automation = Math.max(0, (stats.automation ?? 0) - 1);
      stats.stability = Math.max(5, (stats.stability ?? 0) - 15);
      stats.backlash = (stats.backlash ?? 0) + 10;
      break;
    default:
      break;
  }
  return { ...network, nodes, stats };
}

export function generateAutonomousProposal(network, labStage, rng = Math.random) {
  if (labStage < 3 || rng() > 0.45) return null;
  const types = [
    { id: 'expand_area', label: 'Expand to new coverage zone', effect: 'coverage' },
    { id: 'raise_automation', label: 'Raise global automation', effect: 'automation' },
    { id: 'add_conditioning', label: 'Deploy conditioning branch', effect: 'influence' },
    { id: 'stealth_retune', label: 'Retune stealth signatures', effect: 'detection' },
    { id: 'nexus_upgrade', label: 'Recommend nexus upgrade', effect: 'nexus' },
  ];
  const pickType = pick(rng, types);
  const area = pick(rng, DEPLOYMENT_AREAS.filter(a => !network.deployedAreas?.includes(a.id) && (a.unlockStage ?? 3) <= labStage));
  return {
    id: `prop_${Date.now()}_${Math.floor(rng() * 9999)}`,
    type: pickType.id,
    label: pickType.label,
    areaId: area?.id || null,
    risk: Math.round(10 + rng() * 25),
    reward: Math.round(8 + rng() * 20),
    line: renderProposalLine(pickType.id, area?.label, labStage),
  };
}

export function approveProposal(labState, proposalId) {
  const network = labState.network;
  const proposal = network.proposals?.find(p => p.id === proposalId);
  if (!proposal) return { labState, ok: false };
  let next = { ...labState };
  if (proposal.type === 'expand_area' && proposal.areaId) {
    const res = expandDeploymentArea(next, proposal.areaId);
    next = res.labState;
  } else if (proposal.type === 'raise_automation') {
    const nodes = network.nodes.map(n => ({ ...n, automation: Math.min(3, (n.automation ?? 0) + 1) }));
    next = { ...next, network: { ...network, nodes, stats: computeNetworkStats({ ...network, nodes }, labState.stage) } };
  } else if (proposal.type === 'add_conditioning') {
    const res = addNetworkNode(next, 'conditioning');
    next = res.labState;
  } else if (proposal.type === 'stealth_retune') {
    const stats = { ...network.stats, detectionRisk: Math.max(0, (network.stats?.detectionRisk ?? 0) - 12) };
    next = { ...next, network: { ...network, stats } };
  } else if (proposal.type === 'nexus_upgrade') {
    const res = upgradeNexus(next);
    next = res.labState;
  }
  const proposals = network.proposals.filter(p => p.id !== proposalId);
  next = { ...next, network: { ...next.network, proposals } };
  return { labState: next, ok: true, proposal };
}

export function denyProposal(labState, proposalId) {
  const network = labState.network;
  return {
    ...labState,
    network: {
      ...network,
      proposals: (network.proposals || []).filter(p => p.id !== proposalId),
      stats: {
        ...(network.stats || {}),
        stability: Math.min(100, (network.stats?.stability ?? 0) + 3),
      },
    },
  };
}

export function tickNetworkWeek(labState, students, week, rng = Math.random) {
  let state = ensureNetwork(labState);
  if (!state.network || (state.stage ?? 1) < 2) return { labState: state, lines: [], studentDeltas: [] };

  let network = { ...state.network };
  network.weeksOperational = (network.weeksOperational ?? 0) + 1;
  network.stats = computeNetworkStats(network, state.stage);
  const lines = [];
  const studentDeltas = [];

  if ((state.maintenanceDebt ?? 0) < 5) {
    state = { ...state, maintenanceDebt: (state.maintenanceDebt ?? 0) + (network.stats.maintenanceCost ?? 0) };
  }

  const event = rollNetworkEvent(network, state.stage, rng);
  if (event) {
    network = applyEventEffects(network, event.id, rng);
    const prose = renderNetworkEventLine(event.id, network.stats, state.stage);
    lines.push(prose ? `⚙️ ${prose}` : `⚙️ Network event: ${event.id}`);
    network.eventLog = [...(network.eventLog || []), { week, eventId: event.id }].slice(-20);
  }

  if (state.stage >= 3) {
    const proposal = generateAutonomousProposal(network, state.stage, rng);
    if (proposal) {
      network.proposals = [...(network.proposals || []).filter(p => !p.resolved), proposal].slice(-3);
      if (proposal.line) lines.push(`🌐 ${proposal.line}`);
    }
  }

  state = { ...state, network };
  state = syncSubjectInfluence(state, students);

  const caloric = network.stats?.caloricBonus ?? 0;
  const coverage = network.stats?.coverage ?? 1;
  for (const st of students) {
    if (st.hidden || st.evolvedForm === 'machine_goddess') continue;
    const subj = network.connectedSubjects?.[st.id];
    if (!subj || subj.influence < 15) continue;
    const baseGain = 1 + Math.floor(rng() * 3);
    const bonus = Math.floor(baseGain * caloric * 4) + Math.floor(subj.influence / 25);
    const gain = Math.min(8, baseGain + bonus + Math.floor(coverage / 3));
    if (gain > 0) {
      studentDeltas.push({ studentId: st.id, gainLbs: gain, psychDelta: subj.conditioned ? { dependence: 1 } : null });
    }
  }

  network.stats = computeNetworkStats(network, state.stage);
  const scrutinyDelta = (network.stats?.detectionRisk ?? 0) > 58 ? 2 : 0;
  return { labState: { ...state, network }, lines, studentDeltas, scrutinyDelta };
}

export function networkSummary(labState) {
  const network = labState?.network;
  if (!network) return null;
  const stats = network.stats || computeNetworkStats(network, labState.stage);
  return {
    nodeCount: network.nodes?.length ?? 0,
    activeNodes: network.nodes?.filter(n => n.active).length ?? 0,
    areaCount: network.deployedAreas?.length ?? 0,
    proposalCount: network.proposals?.length ?? 0,
    integration: network.nexus?.integration ?? 0,
    nexusLevel: network.nexus?.level ?? 1,
    ...stats,
  };
}
