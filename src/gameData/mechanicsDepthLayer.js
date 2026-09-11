// ═══════════════════════════════════════════════════════════════
// MECHANICS DEPTH LAYER — ~50% richer derived reads on core loops
// Multipliers apply to secondary bonuses, not base weight math.
// ═══════════════════════════════════════════════════════════════

export const MECHANICS_DEPTH_SCALE = 1.5;

export function scaleDepthBonus(value, scale = MECHANICS_DEPTH_SCALE) {
  if (!value || value <= 0) return 0;
  return Math.round(value * scale * 100) / 100;
}

/** Hunger tier nudges interrupt urgency slightly deeper at high tiers. */
export function depthHungerUrgencyMult(tier = 0) {
  const t = Math.max(0, Math.min(4, tier));
  return 1 + t * 0.08;
}

/** Relationship ecology decay softened when trust is high — rewards maintenance. */
export function depthRelationshipDecayMult(relationship = 0) {
  if (relationship >= 80) return 0.65;
  if (relationship >= 55) return 0.82;
  if (relationship >= 35) return 0.92;
  return 1;
}

/** Feed session pace modifier — deeper curve on corruption + hunger combo. */
export function depthFeedPaceBonus(corruption = 0, hungerTier = 0) {
  const c = Math.max(0, Math.min(3, corruption));
  const h = Math.max(0, Math.min(4, hungerTier));
  return scaleDepthBonus(0.02 * c + 0.015 * h, 1);
}

/** Talk relationship grants — scale positive beats, not penalties. */
export function depthTalkRelGrant(baseGrant = 0) {
  if (baseGrant <= 0) return baseGrant;
  return Math.max(baseGrant, Math.round(baseGrant * MECHANICS_DEPTH_SCALE));
}
