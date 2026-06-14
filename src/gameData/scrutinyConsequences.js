// ═══════════════════════════════════════════════════════════════
// ADMIN SCRUTINY — tiered consequences when attention rises
// ═══════════════════════════════════════════════════════════════

export const SCRUTINY_TIERS = [
  { id: 0, min: 0, label: 'Quiet', apPenalty: 0, eventBlock: false },
  { id: 1, min: 50, label: 'Noticed', apPenalty: 0, eventBlock: false },
  { id: 2, min: 75, label: 'Review', apPenalty: 1, eventBlock: false },
  { id: 3, min: 90, label: 'Investigation', apPenalty: 2, eventBlock: true },
];

export function getScrutinyTier(scrutiny = 0) {
  return [...SCRUTINY_TIERS].reverse().find((t) => scrutiny >= t.min) || SCRUTINY_TIERS[0];
}

export function scrutinyApModifier(scrutiny) {
  return -getScrutinyTier(scrutiny).apPenalty;
}

export function scrutinyBlocksPublicEvents(scrutiny) {
  return getScrutinyTier(scrutiny).eventBlock;
}

export function scrutinyDiscoveryMult(scrutiny) {
  const tier = getScrutinyTier(scrutiny).id;
  return 1 + tier * 0.08;
}

export function weeklyScrutinyNudge(scrutiny, tierId) {
  if (tierId >= 3) return { message: '⚠️ Administration has opened a formal review. Public demonstrations are risky this week.', scrutinyDelta: 0 };
  if (tierId >= 2) return { message: '📋 Faculty whispers about your class. Keep a lower profile.', scrutinyDelta: 0 };
  return null;
}
