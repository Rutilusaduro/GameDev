// ═══════════════════════════════════════════════════════════════
// PRESTIGE-LITE — meta progression without hard reset
// ═══════════════════════════════════════════════════════════════

export function computePrestigeScore({ week = 1, labState, campusSaturation, globalStats } = {}) {
  let score = 0;
  score += Math.floor((week - 1) / 10);
  score += Math.max(0, (labState?.stage ?? 1) - 1) * 2;
  score += (campusSaturation?.tier ?? 0) * 2;
  score += Math.floor((globalStats?.narrativeCount ?? 0) / 15);
  return score;
}

export function prestigeApBonus(score) {
  return Math.min(2, Math.floor(score / 5));
}

export function prestigeBreakthroughBonus(score) {
  return Math.min(3, Math.floor(score / 8));
}
