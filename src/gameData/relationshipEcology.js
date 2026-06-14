// ═══════════════════════════════════════════════════════════════
// RELATIONSHIP ECOLOGY — decay, neglect, favoritism jealousy
// ═══════════════════════════════════════════════════════════════
import { getTier } from './sessions.js';

export const RELATIONSHIP_ECOLOGY = {
  weeksIgnoredBeforeDecay: 3,
  decayPerWeek: 2,
  maxDecayPerWeek: 5,
  favoritismFeedGap: 3,
  jealousyRelLoss: 3,
  jealousyRelGain: 1,
};

export function tickRelationshipDecay(student) {
  if (!student || student.hidden) return student;
  const weeks = student.weeksWithoutPlayerFeed ?? 0;
  if (weeks < RELATIONSHIP_ECOLOGY.weeksIgnoredBeforeDecay) return student;
  const rel = student.relationship ?? 0;
  const tier = getTier(rel).id;
  if (tier >= 4) return student;
  const excess = weeks - RELATIONSHIP_ECOLOGY.weeksIgnoredBeforeDecay + 1;
  const loss = Math.min(RELATIONSHIP_ECOLOGY.maxDecayPerWeek, RELATIONSHIP_ECOLOGY.decayPerWeek * excess);
  return { ...student, relationship: Math.max(0, rel - loss), _relDecayApplied: loss };
};

export function applyJealousyRelDelta(student, { isNeglected = false, isFavored = false } = {}) {
  if (!student) return student;
  let rel = student.relationship ?? 0;
  if (isNeglected) rel = Math.max(0, rel - RELATIONSHIP_ECOLOGY.jealousyRelLoss);
  if (isFavored) rel = Math.min(100, rel + RELATIONSHIP_ECOLOGY.jealousyRelGain);
  return { ...student, relationship: rel };
};

export function computeFavoritismFlags(students, weeklyFeedCounts = {}) {
  const visible = students.filter((s) => !s.hidden && s.id !== 18);
  if (visible.length < 2) return {};
  const counts = visible.map((s) => ({ id: s.id, feeds: weeklyFeedCounts[s.id] ?? 0 }));
  const max = Math.max(...counts.map((c) => c.feeds));
  const min = Math.min(...counts.map((c) => c.feeds));
  const gap = max - min;
  if (gap < RELATIONSHIP_ECOLOGY.favoritismFeedGap) return {};
  const flags = {};
  counts.forEach(({ id, feeds }) => {
    if (feeds === max && max > 0) flags[id] = 'favored';
    else if (feeds === min) flags[id] = 'neglected';
  });
  return flags;
};

export function favoritismSummary(students, weeklyFeedCounts = {}) {
  const flags = computeFavoritismFlags(students, weeklyFeedCounts);
  const favored = students.filter((s) => flags[s.id] === 'favored');
  const neglected = students.filter((s) => flags[s.id] === 'neglected');
  if (!favored.length && !neglected.length) return null;
  return { favored, neglected, flags };
};
