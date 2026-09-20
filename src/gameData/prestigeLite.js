// ═══════════════════════════════════════════════════════════════
// PRESTIGE-LITE — meta progression without hard reset
// ═══════════════════════════════════════════════════════════════

import { depthMetaProgressBonus } from './mechanicsDepthLayer.js';

export function computePrestigeScore({ week = 1, labState, campusSaturation, globalStats } = {}) {
  let score = 0;
  score += Math.floor((week - 1) / 10);
  score += Math.max(0, (labState?.stage ?? 1) - 1) * 2;
  score += (campusSaturation?.tier ?? 0) * 2;
  score += Math.floor((globalStats?.narrativeCount ?? 0) / 15);
  return score;
}

export function prestigeApBonus(score) {
  return depthMetaProgressBonus(Math.min(2, Math.floor(score / 5)));
}

export function prestigeBreakthroughBonus(score) {
  return depthMetaProgressBonus(Math.min(3, Math.floor(score / 8)));
}

export function prestigeSummary(score) {
  const ap = prestigeApBonus(score);
  const bt = prestigeBreakthroughBonus(score);
  if (score <= 0) return null;
  return {
    score,
    apBonus: ap,
    breakthroughBonus: bt,
    label: score >= 12 ? 'Campus Legend' : score >= 8 ? 'Semester Architect' : score >= 4 ? 'Established Presence' : 'Early Legacy',
  };
}
