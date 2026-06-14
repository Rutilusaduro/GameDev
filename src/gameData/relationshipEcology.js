// ═══════════════════════════════════════════════════════════════
// RELATIONSHIP ECOLOGY — decay, jealousy, favoritism
// ═══════════════════════════════════════════════════════════════

import { getTier } from './sessions.js';

export const RELATIONSHIP_ECOLOGY_CONFIG = {
  ignoreDecayWeeks: 2,
  decayPerWeek: 4,
  maxDecayPerWeek: 8,
  jealousyThresholdRatio: 1.8,
  jealousyRelPenalty: 3,
  favoritismFeedGap: 3,
};

export function tickRelationshipEcology(students, weekCtx = {}) {
  const {
    lastFedWeek = {},
    feedCountsThisWeek = {},
    week = 1,
  } = weekCtx;

  const feedTotals = Object.values(feedCountsThisWeek);
  const maxFeeds = feedTotals.length ? Math.max(...feedTotals) : 0;
  const avgFeeds = feedTotals.length
    ? feedTotals.reduce((a, b) => a + b, 0) / feedTotals.length
    : 0;

  return students.map((s) => {
    let relationship = s.relationship ?? 0;
    let jealousy = s.jealousy ?? 0;
    const fedThisWeek = feedCountsThisWeek[s.id] ?? 0;
    const lastFed = lastFedWeek[s.id] ?? week;

    if (!s.playerFedThisWeek && week - lastFed >= RELATIONSHIP_ECOLOGY_CONFIG.ignoreDecayWeeks) {
      const weeksIgnored = week - lastFed - RELATIONSHIP_ECOLOGY_CONFIG.ignoreDecayWeeks + 1;
      const decay = Math.min(
        RELATIONSHIP_ECOLOGY_CONFIG.maxDecayPerWeek,
        weeksIgnored * RELATIONSHIP_ECOLOGY_CONFIG.decayPerWeek,
      );
      relationship = Math.max(0, relationship - decay);
    }

    if (maxFeeds > 0 && fedThisWeek === 0 && maxFeeds >= RELATIONSHIP_ECOLOGY_CONFIG.favoritismFeedGap) {
      jealousy = Math.min(100, jealousy + 5);
      if (avgFeeds > 0 && maxFeeds / Math.max(1, avgFeeds) >= RELATIONSHIP_ECOLOGY_CONFIG.jealousyThresholdRatio) {
        relationship = Math.max(0, relationship - RELATIONSHIP_ECOLOGY_CONFIG.jealousyRelPenalty);
      }
    } else if (fedThisWeek > 0) {
      jealousy = Math.max(0, jealousy - 2);
    }

    return {
      ...s,
      relationship,
      jealousy,
      weeksSinceFed: week - lastFed,
    };
  });
}

export function recordStudentFed(meta, studentId, week) {
  const lastFedWeek = { ...(meta.lastFedWeek || {}), [studentId]: week };
  const feedCountsThisWeek = { ...(meta.feedCountsThisWeek || {}) };
  feedCountsThisWeek[studentId] = (feedCountsThisWeek[studentId] ?? 0) + 1;
  return { lastFedWeek, feedCountsThisWeek };
}

export function resetWeeklyFeedCounts(meta) {
  return { ...(meta || {}), feedCountsThisWeek: {} };
}

export function jealousyLabel(student) {
  const j = student?.jealousy ?? 0;
  if (j < 15) return null;
  if (j < 40) return { label: 'Watching', color: '#a08040' };
  if (j < 70) return { label: 'Jealous', color: '#c06030' };
  return { label: 'Resentful', color: '#c03040' };
}

export function rosterEcologySummary(students) {
  const visible = students.filter((s) => !s.hidden);
  const devoted = visible.filter((s) => getTier(s.relationship).id >= 3).length;
  const jealous = visible.filter((s) => (s.jealousy ?? 0) >= 40).length;
  const neglected = visible.filter((s) => (s.weeksSinceFed ?? 0) >= 3).length;
  return { devoted, jealous, neglected, total: visible.length };
}
