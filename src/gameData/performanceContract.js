// ═══════════════════════════════════════════════════════════════
// PERFORMANCE TIER CONTRACT — shared vocabulary for mini-games (§4)
// ═══════════════════════════════════════════════════════════════

export const PERFORMANCE_TIERS = ['perfect', 'good', 'messy', 'failure'];

const LEGACY_MAP = {
  perfect: 'perfect',
  great: 'perfect',
  good: 'good',
  okay: 'messy',
  messy: 'messy',
  average: 'messy',
  failure: 'failure',
  fail: 'failure',
  poor: 'failure',
};

export function normalizePerformanceTier(legacyQuality) {
  if (!legacyQuality) return 'good';
  const key = String(legacyQuality).toLowerCase();
  return LEGACY_MAP[key] || 'good';
}

export function performanceTierLabel(tier) {
  const labels = {
    perfect: 'Perfect',
    good: 'Good',
    messy: 'Messy',
    failure: 'Failure',
  };
  return labels[tier] || 'Good';
}

/** Rel bonus multiplier for evolved mini-games keyed on normalized tier. */
export function performanceRelMult(tier) {
  const map = { perfect: 1.35, good: 1.0, messy: 0.85, failure: 0.6 };
  return map[tier] ?? 1;
}

/** Short UI suffix for push notifications. */
export function performanceResultLine(tier, context = 'session') {
  const label = performanceTierLabel(tier);
  if (context === 'device') return `${label} run`;
  if (context === 'contest') return `${label} finish`;
  return `${label} take`;
}
