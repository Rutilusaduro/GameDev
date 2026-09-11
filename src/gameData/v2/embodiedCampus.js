// ═══════════════════════════════════════════════════════════════
// EMBODIED CAMPUS — pilot a student across the campus graph
// ═══════════════════════════════════════════════════════════════
import { CAMPUS_NODES } from '../campus.js';
import { getStage } from '../stages.js';
import { getAvailableEmbodimentActions } from './residentEmbodiment.js';
import { grantPassiveTrust } from '../rosterUnlock.js';
import {
  depthCorruptionGrant,
  depthPassiveTrustDrip,
  depthRelBonus,
  depthResonancePassiveBonus,
} from '../mechanicsDepthLayer.js';

export const EMBODIED_START_NODE = 'dorms';
export const EMBODIED_EVENT_BASE_CHANCE = 0.44;
export const EMBODIED_EVENT_DRY_SPELL = 3;

/** Legacy embodied event ids from older saves → RA dorm ids. */
export const LEGACY_EMBODIED_EVENT_IDS = {
  classmate_sighting: 'resident_sighting',
};

export function normalizeEmbodiedEventId(id) {
  return LEGACY_EMBODIED_EVENT_IDS[id] || id;
}

export function normalizeEmbodiedEventKey(eventKey) {
  if (!eventKey) return eventKey;
  const sep = eventKey.indexOf(':');
  if (sep === -1) return normalizeEmbodiedEventId(eventKey);
  return `${normalizeEmbodiedEventId(eventKey.slice(0, sep))}${eventKey.slice(sep)}`;
}

/** Migrate embodiment.eventsSeen / lastEventKey after embodied event renames. */
export function migrateEmbodimentState(emb = {}) {
  const eventsSeen = { ...(emb.eventsSeen || {}) };
  let eventsChanged = false;
  for (const [key, count] of Object.entries(eventsSeen)) {
    const norm = normalizeEmbodiedEventKey(key);
    if (norm !== key) {
      delete eventsSeen[key];
      eventsSeen[norm] = (eventsSeen[norm] || 0) + count;
      eventsChanged = true;
    }
  }
  const lastEventKey = emb.lastEventKey ? normalizeEmbodiedEventKey(emb.lastEventKey) : emb.lastEventKey;
  if (!eventsChanged && lastEventKey === emb.lastEventKey) return emb;
  return { ...emb, eventsSeen, lastEventKey };
}

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
  resident_sighting: {
    id: 'resident_sighting',
    label: 'Resident Spots You',
    icon: '👋',
    minStage: 0,
    weight: 14,
    calories: 0,
    scrutiny: 0,
    trustNearby: 4,
  },
  gym_scale_shame: {
    id: 'gym_scale_shame',
    label: 'Scale by the Lockers',
    icon: '⚖️',
    minStage: 4,
    nodes: ['gym', 'outdoor_track'],
    weight: 9,
    calories: 0,
    scrutiny: 2,
    corruption: 3,
    trustNearby: 0,
  },
  elevator_groan: {
    id: 'elevator_groan',
    label: 'Elevator Groans',
    icon: '🛗',
    minStage: 7,
    nodes: ['dorms'],
    weight: 8,
    calories: 0,
    scrutiny: 3,
    trustNearby: 0,
  },
  faculty_treats: {
    id: 'faculty_treats',
    label: 'Staff Lounge Treats',
    icon: '🥐',
    minStage: 2,
    nodes: ['faculty_lounge'],
    weight: 11,
    calories: 1600,
    fullness: 35,
    corruption: 4,
    rel: 2,
    scrutiny: 1,
    trustNearby: 0,
  },
  immobile_anchor: {
    id: 'immobile_anchor',
    label: 'Anchored in Place',
    icon: '🛋️',
    minStage: 10,
    nodes: ['dorms'],
    weight: 14,
    calories: 2400,
    fullness: 50,
    corruption: 5,
    rel: 3,
    scrutiny: 0,
    trustNearby: 3,
  },
};

const NARROW_NODES = new Set(['lecture_hall', 'library', 'science_wing', 'office', 'dorms']);
const WITNESS_EVENTS = new Set(['bully_forcefeed', 'npc_stare', 'gossip_whisper', 'resident_sighting']);
const BULLY_ARCHETYPES = new Set(['cheerleader', 'sorority', 'athlete']);
const BULLY_PERSONALITIES = new Set(['commanding', 'competitive', 'social', 'predatory']);

export function isEmbodiedImmobile(student) {
  return getStage(student?.lbs ?? 0).id >= 10;
}

export function canEmbodiedMove(fromId, toId, student = null) {
  const from = CAMPUS_NODES[fromId];
  if (!from || !CAMPUS_NODES[toId]) return false;
  if (!from.exits.includes(toId)) return false;
  if (student && isEmbodiedImmobile(student)) return false;
  return true;
}

export function embodiedActionsAtNode(student, nodeId, ownedSkills, ownedHallSkills) {
  const actions = getAvailableEmbodimentActions(student, ownedSkills, ownedHallSkills);
  return actions.filter((a) => {
    if (!a.nodes || !a.nodes.length) return true;
    return a.nodes.includes(nodeId);
  });
}

function isEventEligible(def, student, nodeId, lastEventKey) {
  const stage = getStage(student.lbs).id;
  if (stage < (def.minStage || 0)) return false;
  if (def.maxCorruption != null && (student.corruption || 0) > def.maxCorruption) return false;
  if (def.nodes && !def.nodes.includes(nodeId)) return false;
  if (def.id === 'stuck_door' && !NARROW_NODES.has(nodeId) && stage < 8) return false;
  const normLast = lastEventKey ? normalizeEmbodiedEventKey(lastEventKey) : null;
  if (normLast && normLast === `${def.id}:${nodeId}`) return false;
  return true;
}

function weightedPick(items, weightFn, rng) {
  const total = items.reduce((sum, item) => sum + weightFn(item), 0);
  if (total <= 0) return items[Math.floor(rng() * items.length)];
  let roll = rng() * total;
  for (const item of items) {
    roll -= weightFn(item);
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function pickEmbodiedWitness(pilot, students, eventId, rng = Math.random) {
  const pool = students.filter(
    (s) => s.id !== pilot.id && !s.hidden && s.lockState !== 'locked' && s.id !== 15,
  );
  if (!pool.length) return null;
  if (!WITNESS_EVENTS.has(eventId)) return null;

  if (eventId === 'bully_forcefeed') {
    const bullies = pool.filter(
      (s) => BULLY_ARCHETYPES.has(s.archetype) || BULLY_PERSONALITIES.has(s.personality),
    );
    const pickFrom = bullies.length ? bullies : pool;
    return pickFrom[Math.floor(rng() * pickFrom.length)];
  }

  return pool[Math.floor(rng() * pool.length)];
}

export function rollEmbodiedArrivalEvent(
  student,
  nodeId,
  embodimentState = {},
  { students = [], rng = Math.random } = {},
) {
  const lastEventStep = embodimentState.lastEventStep ?? 0;
  const steps = embodimentState.steps || 0;
  const movesSinceEvent = steps - lastEventStep;
  const seenKey = embodimentState.lastEventKey;

  const candidates = Object.values(EMBODIED_EVENTS).filter((def) =>
    isEventEligible(def, student, nodeId, seenKey),
  );
  if (!candidates.length) return null;

  const chance = movesSinceEvent >= EMBODIED_EVENT_DRY_SPELL ? 0.85 : EMBODIED_EVENT_BASE_CHANCE;
  if (rng() > chance) return null;

  const pick = weightedPick(candidates, (d) => d.weight || 8, rng);
  const witness = pickEmbodiedWitness(student, students, normalizeEmbodiedEventId(pick.id), rng);

  return {
    ...pick,
    eventKey: `${pick.id}:${nodeId}`,
    witnessStudentId: witness?.id ?? null,
    witnessName: witness?.name ?? null,
    witnessStudent: witness ?? null,
  };
}

export function applyEmbodiedEvent(student, eventDef, { lockedStudents = [], rng = Math.random } = {}) {
  if (!eventDef) return { student, trustGrants: [] };
  let next = { ...student };
  if (eventDef.calories) {
    next.consumedCalories = (next.consumedCalories || 0)
      + depthResonancePassiveBonus(eventDef.calories);
  }
  if (eventDef.fullness) {
    next.fullness = Math.min(
      next.stomachCapacity || 100,
      (next.fullness || 0) + eventDef.fullness,
    );
  }
  if (eventDef.corruption) {
    next.corruption = Math.min(100, (next.corruption || 0) + depthCorruptionGrant(eventDef.corruption));
  }
  if (eventDef.rel) {
    next.relationship = Math.min(100, Math.max(0, (next.relationship || 0) + depthRelBonus(eventDef.rel)));
  }

  const trustGrants = [];
  if (eventDef.trustNearby && lockedStudents.length) {
    const target = lockedStudents[Math.floor(rng() * lockedStudents.length)];
    if (target) {
      trustGrants.push({
        studentId: target.id,
        amount: depthPassiveTrustDrip(eventDef.trustNearby),
      });
    }
  }
  if (normalizeEmbodiedEventId(eventDef.id) === 'resident_sighting' && lockedStudents.length) {
    const target = lockedStudents[Math.floor(rng() * lockedStudents.length)];
    if (target) trustGrants.push({ studentId: target.id, amount: depthPassiveTrustDrip(5) });
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
      lastEventStep: emb.steps || 0,
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

export function appendEmbodimentWalkLog(v2State, line) {
  if (!line) return v2State;
  const emb = v2State.embodiment || {};
  const walkLog = [...(emb.walkLog || []), line].slice(-48);
  return { ...v2State, embodiment: { ...emb, walkLog } };
}
