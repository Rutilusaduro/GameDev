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

/** Extra scrutiny when starting a private session under review. */
export function scrutinyPrivateSessionCost(scrutiny) {
  const tier = getScrutinyTier(scrutiny).id;
  if (tier >= 3) return 3;
  if (tier >= 2) return 1;
  return 0;
}

const PUBLIC_CLASS_FEASTS = new Set(['pizza', 'potluck', 'feast']);

/** Investigation tier blocks visible hall feasts. */
export function scrutinyBlocksClassFeast(scrutiny, actionId) {
  if (!scrutinyBlocksPublicEvents(scrutiny)) return false;
  return PUBLIC_CLASS_FEASTS.has(actionId);
}

export function weeklyScrutinyNudge(scrutiny, tierId, opposition) {
  if (opposition?.aib?.unlocked && opposition.aib.agendaQueue?.length) {
    const next = opposition.aib.agendaQueue[0];
    return { message: `👁 AIB telegraph: ${next.label} resolves week ${next.resolvesWeek}.`, scrutinyDelta: 0 };
  }
  if (tierId >= 3) return { message: '⚠️ Administration has opened a formal review. Public demonstrations are risky this week.', scrutinyDelta: 0 };
  if (tierId >= 2) return { message: '📋 Staff whispers about your floor. Keep a lower profile.', scrutinyDelta: 0 };
  return null;
}
