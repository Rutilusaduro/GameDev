// ═══════════════════════════════════════════════════════════════
// EMBODIED CAMPUS — pilot a student across the campus graph
// ═══════════════════════════════════════════════════════════════
import { CAMPUS_NODES } from '../campus.js';
import { getStage } from '../stages.js';
import { getAvailableEmbodimentActions } from './spiritEmbodiment.js';
import { grantPassiveTrust } from '../rosterUnlock.js';

export const EMBODIED_START_NODE = 'dorms';

/** Special arrival / look-around events while embodied. */
export const EMBODIED_EVENTS = {
  stuck_door: {
    id: 'stuck_door',
    label: 'Stuck in the Doorframe',
    icon: '🚪',
    minStage: 6,
    nodes: ['lecture_hall', 'dorms', 'science_wing', 'library', 'dining_hall'],
    weight: 9,
    calories: 0,
    scrutiny: 2,
    trustNearby: 0,
  },
  clothes_burst: {
    id: 'clothes_burst',
    label: 'Clothes Give Up',
    icon: '💥',
    minStage: 5,
    weight: 8,
    calories: 0,
    scrutiny: 3,
    trustNearby: 0,
  },
  bully_forcefeed: {
    id: 'bully_forcefeed',
    label: 'Cornered & Fed',
    icon: '😈',
    minStage: 3,
    maxCorruption: 55,
    nodes: ['dining_hall', 'quad', 'food_court', 'coffee_shop', 'student_union'],
    weight: 10,
    calories: 2800,
    fullness: 55,
    corruption: 8,
    rel: -2,
    scrutiny: 4,
    trustNearby: 0,
  },
  npc_stare: {
    id: 'npc_stare',
    label: 'Someone Stares',
    icon: '👀',
    minStage: 3,
    weight: 12,
    calories: 0,
    scrutiny: 1,
    trustNearby: 0,
  },
  gossip_whisper: {
    id: 'gossip_whisper',
    label: 'Overheard Gossip',
    icon: '🗣️',
    minStage: 4,
    weight: 10,
    calories: 0,
    scrutiny: 2,
    trustNearby: 0,
  },
  vending_splurge: {
    id: 'vending_splurge',
    label: 'Vending Machine',
    icon: '🥤',
    minStage: 2,
    nodes: ['coffee_shop', 'food_court', 'gym', 'library', 'science_wing', 'lecture_hall'],
    weight: 11,
    calories: 1400,
    fullness: 30,
    corruption: 4,
    rel: 1,
    scrutiny: 1,
    trustNearby: 0,
  },
  cafeteria_binge: {
    id: 'cafeteria_binge',
    label: 'All-You-Can-Eat',
    icon: '🍽️',
    minStage: 3,
    nodes: ['dining_hall', 'food_court'],
    weight: 12,
    calories: 3200,
    fullness: 65,
    corruption: 7,
    rel: 3,
    scrutiny: 3,
    trustNearby: 0,
  },
  quad_picnic: {
    id: 'quad_picnic',
    label: 'Picnic Temptation',
    icon: '🧺',
    minStage: 2,
    nodes: ['quad', 'garden'],
    weight: 9,
    calories: 1800,
    fullness: 40,
    corruption: 5,
    rel: 2,
    scrutiny: 2,
    trustNearby: 0,
  },
  classmate_sighting: {
    id: 'classmate_sighting',
    label: 'Classmate Spots You',
    icon: '👋',
    minStage: 0,
    weight: 14,
    calories: 0,
    scrutiny: 0,
    trustNearby: 4,
  },
};

const NARROW_NODES = new Set(['lecture_hall', 'library', 'science_wing', 'office', 'dorms']);

export function canEmbodiedMove(fromId, toId) {
  const from = CAMPUS_NODES[fromId];
  if (!from || !CAMPUS_NODES[toId]) return false;
  return from.exits.includes(toId);
}

export function embodiedActionsAtNode(student, nodeId, ownedSkills, ownedClassSkills) {
  const actions = getAvailableEmbodimentActions(student, ownedSkills, ownedClassSkills);
  return actions.filter((a) => {
    if (!a.nodes || !a.nodes.length) return true;
    return a.nodes.includes(nodeId);
  });
}

function eventEligible(def, student, nodeId, seenKey, rng) {
  const stage = getStage(student.lbs).id;
  if (stage < (def.minStage || 0)) return false;
  if (def.maxCorruption != null && (student.corruption || 0) > def.maxCorruption) return false;
  if (def.nodes && !def.nodes.includes(nodeId)) return false;
  if (def.id === 'stuck_door' && !NARROW_NODES.has(nodeId) && stage < 8) return false;
  if (seenKey && seenKey === `${def.id}:${nodeId}`) return false;
  return rng() < (def.weight || 8) / 100;
}

export function rollEmbodiedArrivalEvent(student, nodeId, embodimentState = {}, rng = Math.random) {
  const seen = embodimentState.eventsSeen || {};
  const seenKey = embodimentState.lastEventKey;
  const candidates = Object.values(EMBODIED_EVENTS).filter((def) =>
    eventEligible(def, student, nodeId, seenKey, rng),
  );
  if (!candidates.length) return null;
  const pick = candidates[Math.floor(rng() * candidates.length)];
  return {
    ...pick,
    eventKey: `${pick.id}:${nodeId}`,
    witnessStudentId: pick.id === 'classmate_sighting' ? null : undefined,
  };
}

export function applyEmbodiedEvent(student, eventDef, { lockedStudents = [], rng = Math.random } = {}) {
  if (!eventDef) return { student, trustGrants: [] };
  let next = { ...student };
  if (eventDef.calories) next.consumedCalories = (next.consumedCalories || 0) + eventDef.calories;
  if (eventDef.fullness) {
    next.fullness = Math.min(
      next.stomachCapacity || 100,
      (next.fullness || 0) + eventDef.fullness,
    );
  }
  if (eventDef.corruption) next.corruption = Math.min(100, (next.corruption || 0) + eventDef.corruption);
  if (eventDef.rel) next.relationship = Math.min(100, Math.max(0, (next.relationship || 0) + eventDef.rel));

  const trustGrants = [];
  if (eventDef.trustNearby && lockedStudents.length) {
    const target = lockedStudents[Math.floor(rng() * lockedStudents.length)];
    if (target) trustGrants.push({ studentId: target.id, amount: eventDef.trustNearby });
  }
  if (eventDef.id === 'classmate_sighting' && lockedStudents.length) {
    const target = lockedStudents[Math.floor(rng() * lockedStudents.length)];
    if (target) trustGrants.push({ studentId: target.id, amount: 5 });
  }
  return { student: next, trustGrants, scrutiny: eventDef.scrutiny || 0 };
}

export function moveEmbodiment(v2State, toNodeId, { logLine = '' } = {}) {
  const emb = v2State.embodiment || {};
  const walkLog = [...(emb.walkLog || [])];
  if (logLine) walkLog.push(logLine);
  if (walkLog.length > 40) walkLog.splice(0, walkLog.length - 40);
  return {
    ...v2State,
    embodiment: {
      ...emb,
      at: toNodeId,
      steps: (emb.steps || 0) + 1,
      walkLog,
      lastEventKey: null,
    },
  };
}

export function recordEmbodiedEvent(v2State, eventKey, logLine = '') {
  const emb = v2State.embodiment || {};
  const eventsSeen = { ...(emb.eventsSeen || {}), [eventKey]: (emb.eventsSeen?.[eventKey] || 0) + 1 };
  const walkLog = [...(emb.walkLog || [])];
  if (logLine) walkLog.push(logLine);
  return {
    ...v2State,
    embodiment: {
      ...emb,
      eventsSeen,
      lastEventKey: eventKey,
      walkLog,
    },
  };
}

export function applyTrustGrants(students, grants = []) {
  if (!grants.length) return students;
  const byId = new Map(grants.map((g) => [g.studentId, g.amount]));
  return students.map((s) => {
    const amt = byId.get(s.id);
    if (!amt) return s;
    return grantPassiveTrust(s, amt);
  });
}
