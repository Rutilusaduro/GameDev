// ═══════════════════════════════════════════════════════════════
// C1 — girl↔girl relationship web (sparse edges, intensity 0–3)
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';

export const MAX_EDGES_PER_STUDENT = 3;

export const EDGE_TYPES = {
  rival: { label: 'Rival', glyph: '⚔' },
  partner: { label: 'Partner in gain', glyph: '🤝' },
  mentor: { label: 'Mentor', glyph: '📎' },
  orbit: { label: 'Orbit', glyph: '🌙' },
};

/** One authored starter edge per playable girl (hand-picked pairings). */
export const STARTER_EDGES = [
  { studentId: 0, targetId: 3, type: 'rival', label: 'Scoreboard unfinished' },
  { studentId: 1, targetId: 7, type: 'rival', label: 'Thesis vs spreadsheet' },
  { studentId: 2, targetId: 6, type: 'partner', label: 'Content collab' },
  { studentId: 3, targetId: 0, type: 'rival', label: 'Lane rivalry' },
  { studentId: 4, targetId: 2, type: 'orbit', label: 'Watches the feed' },
  { studentId: 5, targetId: 2, type: 'partner', label: 'Stream duo' },
  { studentId: 6, targetId: 10, type: 'partner', label: 'Chapter feasts' },
  { studentId: 7, targetId: 1, type: 'rival', label: 'Citation war' },
  { studentId: 8, targetId: 13, type: 'orbit', label: 'Snack-circle gravity' },
  { studentId: 9, targetId: 4, type: 'orbit', label: 'Salon muse' },
  { studentId: 10, targetId: 6, type: 'partner', label: 'Wednesday rites' },
  { studentId: 11, targetId: 13, type: 'partner', label: 'Ward kindness' },
  { studentId: 12, targetId: 7, type: 'orbit', label: 'Case file open' },
  { studentId: 13, targetId: 11, type: 'partner', label: 'Comfort pact' },
  { studentId: 14, targetId: 10, type: 'orbit', label: 'Harvest table' },
  { studentId: 16, targetId: 12, type: 'mentor', label: 'Lab notes' },
  { studentId: 18, targetId: 16, type: 'orbit', label: 'Prototype watch' },
];

export function ensureEdges(student) {
  return { ...student, edges: Array.isArray(student.edges) ? student.edges : [] };
}

export function seedStarterEdges(students) {
  return students.map((s) => {
    const base = ensureEdges(s);
    if (base.edges.length > 0) return base;
    const starter = STARTER_EDGES.find((e) => e.studentId === s.id);
    if (!starter) return base;
    return {
      ...base,
      edges: [{
        targetId: starter.targetId,
        type: starter.type,
        intensity: 1,
        label: starter.label,
        introSeen: false,
        seededWeek: 1,
      }],
    };
  });
}

export function primaryEdge(student) {
  return (student?.edges || [])[0] || null;
}

export function getEdge(student, targetId) {
  return (student?.edges || []).find((e) => e.targetId === targetId) || null;
}

export function edgeRefStudent(student, students) {
  const edge = primaryEdge(student);
  if (!edge) return null;
  return students.find((s) => s.id === edge.targetId) || null;
}

export function rivalWithId(student) {
  return (student?.edges || []).find((e) => e.type === 'rival')?.targetId ?? null;
}

export function pactWithId(student) {
  return (student?.edges || []).find((e) => e.type === 'partner')?.targetId ?? null;
}

export function mentorOfId(student) {
  return (student?.edges || []).find((e) => e.type === 'mentor')?.targetId ?? null;
}

export function bumpEdge(student, targetId, delta = 1) {
  const edges = (student.edges || []).map((e) => {
    if (e.targetId !== targetId) return e;
    return { ...e, intensity: Math.min(3, Math.max(0, (e.intensity || 0) + delta)) };
  });
  return { ...student, edges };
}

export function markEdgeIntroSeen(student) {
  const edges = (student.edges || []).map((e, i) => (i === 0 ? { ...e, introSeen: true } : e));
  return { ...student, edges };
}

/** Weekly graph tick: rival heat when lbs/stage overtakes; partner flag on co-feed week. */
export function tickRelationshipWeb(students, week, ctx = {}) {
  const byId = Object.fromEntries(students.map((s) => [s.id, s]));
  const fed = ctx.weeklyFeedCounts || {};
  const stageUps = ctx.stageUps || [];

  let next = students.map((s) => {
    let edges = [...(s.edges || [])];
    let changed = false;
    for (let i = 0; i < edges.length; i += 1) {
      const edge = { ...edges[i] };
      const other = byId[edge.targetId];
      if (!other) continue;

      if (edge.type === 'rival') {
        const passedLbs = (s.lbs ?? 0) > (other.lbs ?? 0) && (s.weekStartLbs ?? s.lbs) <= (other.lbs ?? 0);
        const myStageUp = stageUps.some((u) => u.id === s.id);
        const rivalStage = getStage(other.lbs ?? 0).id;
        const myStage = getStage(s.lbs ?? 0).id;
        const nearRung = myStageUp && myStage >= rivalStage && myStage - rivalStage <= 1;
        if ((passedLbs || nearRung) && edge.lastHeatWeek !== week) {
          edge.intensity = Math.min(3, (edge.intensity || 1) + 1);
          edge.lastHeatWeek = week;
          changed = true;
        }
      }

      if (edge.type === 'partner' && fed[s.id] > 0 && fed[edge.targetId] > 0) {
        edge.jointWeek = week;
        changed = true;
      }

      edges[i] = edge;
    }
    return changed ? { ...s, edges } : s;
  });

  return { students: next, jointPairs: collectJointPairs(next, week, fed) };
}

function collectJointPairs(students, week, fed) {
  const pairs = [];
  const seen = new Set();
  for (const s of students) {
    for (const e of s.edges || []) {
      if (e.type !== 'partner' || fed[s.id] <= 0 || fed[e.targetId] <= 0) continue;
      const key = [Math.min(s.id, e.targetId), Math.max(s.id, e.targetId)].join('-');
      if (seen.has(key)) continue;
      seen.add(key);
      const other = students.find((st) => st.id === e.targetId);
      if (other) pairs.push({ a: s, b: other, week });
    }
  }
  return pairs;
}

export function plannerSynergyHint(student, students) {
  const edge = primaryEdge(student);
  if (!edge) return null;
  const other = students.find((s) => s.id === edge.targetId);
  if (!other) return null;
  const type = EDGE_TYPES[edge.type]?.label || edge.type;
  if (edge.type === 'partner') {
    return `${type} with ${other.name} — joint scenes fire if you feed both this week.`;
  }
  if (edge.type === 'rival') {
    return `${type}: ${other.name} on the ledger — weigh-ins may needle harder.`;
  }
  return `${type} thread: ${other.name}.`;
}

export function edgeSummaryLine(student, students) {
  const edge = primaryEdge(student);
  if (!edge) return null;
  const other = students.find((s) => s.id === edge.targetId);
  const meta = EDGE_TYPES[edge.type];
  return `${meta?.glyph || '·'} ${meta?.label || edge.type} · ${other?.name || 'someone'} (heat ${edge.intensity || 1})`;
}
