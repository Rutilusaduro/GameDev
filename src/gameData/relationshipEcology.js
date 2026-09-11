// ═══════════════════════════════════════════════════════════════
// RELATIONSHIP ECOLOGY — decay, neglect, favoritism jealousy (DEPTH_PLAN §1)
// ═══════════════════════════════════════════════════════════════
import { getTier } from './sessions.js';
import { depthRelationshipDecayMult } from './mechanicsDepthLayer.js';

export const RELATIONSHIP_ECOLOGY = {
  weeksIgnoredBeforeDecay: 3,
  decayPerWeek: 2,
  maxDecayPerWeek: 5,
  favoritismFeedGap: 3,
  jealousyRelLoss: 3,
  jealousyRelGain: 1,
  neglectedInterruptWeight: 1.35,
  favoredInterruptWeight: 0.85,
};

export function tickRelationshipDecay(student) {
  if (!student || student.hidden) return student;
  const weeks = student.weeksWithoutPlayerFeed ?? 0;
  if (weeks < RELATIONSHIP_ECOLOGY.weeksIgnoredBeforeDecay) return student;
  const rel = student.relationship ?? 0;
  const tier = getTier(rel).id;
  if (tier >= 3) return student; // Devoted — max inner-circle tier
  const excess = weeks - RELATIONSHIP_ECOLOGY.weeksIgnoredBeforeDecay + 1;
  const loss = Math.min(
    RELATIONSHIP_ECOLOGY.maxDecayPerWeek,
    RELATIONSHIP_ECOLOGY.decayPerWeek * excess * depthRelationshipDecayMult(rel),
  );
  return { ...student, relationship: Math.max(0, rel - loss), _relDecayApplied: loss };
}

export function applyJealousyRelDelta(student, { isNeglected = false, isFavored = false } = {}) {
  if (!student) return student;
  let rel = student.relationship ?? 0;
  if (isNeglected) rel = Math.max(0, rel - RELATIONSHIP_ECOLOGY.jealousyRelLoss);
  if (isFavored) rel = Math.min(100, rel + RELATIONSHIP_ECOLOGY.jealousyRelGain);
  return { ...student, relationship: rel };
}

export function computeFavoritismFlags(students, weeklyFeedCounts = {}) {
  const visible = students.filter((s) => !s.hidden && (s.id !== 18 || s.custom));
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
}

export function favoritismSummary(students, weeklyFeedCounts = {}) {
  const flags = computeFavoritismFlags(students, weeklyFeedCounts);
  const favored = students.filter((s) => flags[s.id] === 'favored');
  const neglected = students.filter((s) => flags[s.id] === 'neglected');
  if (!favored.length && !neglected.length) return null;
  return { favored, neglected, flags };
}

/** Weekly roster-ecology stamp: rel deltas, mood drift, persisted favoritism flag. */
export function applyFavoritismEcology(student, flag, week = 1) {
  if (!student || !flag) return student;
  let s = applyJealousyRelDelta(student, {
    isNeglected: flag === 'neglected',
    isFavored: flag === 'favored',
  });
  s = {
    ...s,
    rosterEcology: {
      ...(s.rosterEcology || {}),
      favoritism: flag,
      weekStamp: week,
    },
  };
  if (flag === 'neglected') {
    const mood = s.mood || 'neutral';
    if (mood === 'happy' || mood === 'excited' || mood === 'content') {
      s = { ...s, mood: 'sad' };
    } else if (mood !== 'stressed' && Math.random() < 0.4) {
      s = { ...s, mood: 'stressed' };
    }
  } else if (flag === 'favored' && (s.mood === 'sad' || s.mood === 'stressed') && Math.random() < 0.35) {
    s = { ...s, mood: 'content' };
  }
  return s;
}

/** Weight hunger-interrupt selection — neglected residents surface more often. */
export function getEcologyInterruptWeight(student) {
  const flag = student?.rosterEcology?.favoritism;
  if (flag === 'neglected') return RELATIONSHIP_ECOLOGY.neglectedInterruptWeight;
  if (flag === 'favored') return RELATIONSHIP_ECOLOGY.favoredInterruptWeight;
  return 1;
}

export function pickWeightedInterruptStudent(triggered, rng = Math.random) {
  if (!triggered?.length) return null;
  if (triggered.length === 1) return triggered[0];
  const weights = triggered.map((s) => getEcologyInterruptWeight(s));
  const total = weights.reduce((a, w) => a + w, 0);
  let roll = rng() * total;
  for (let i = 0; i < triggered.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return triggered[i];
  }
  return triggered[triggered.length - 1];
}
