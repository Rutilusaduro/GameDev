// ═══════════════════════════════════════════════════════════════
// MECHANICS DEPTH LAYER — ~50% richer derived reads on core loops
// Multipliers apply to secondary bonuses, not base weight math.
// ═══════════════════════════════════════════════════════════════

export const MECHANICS_DEPTH_SCALE = 1.5;

const BONUS_FRAC = MECHANICS_DEPTH_SCALE - 1;

export function scaleDepthBonus(value, scale = MECHANICS_DEPTH_SCALE) {
  if (!value || value <= 0) return 0;
  return Math.round(value * scale * 100) / 100;
}

/** Small global intensity bump for device / psych scaling paths. */
export function depthIntensityMult(baseMult = 1) {
  return baseMult * (1 + BONUS_FRAC * 0.35);
}

/** Hunger tier nudges interrupt urgency slightly deeper at high tiers. */
export function depthHungerUrgencyMult(tier = 0) {
  const t = Math.max(0, Math.min(4, tier));
  return 1 + t * 0.08;
}

/** Scale interrupt roll probability (cap handled by caller). */
export function depthInterruptChance(baseChance = 0, hungerTier = 0) {
  return Math.min(0.98, baseChance * depthHungerUrgencyMult(hungerTier));
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

/** Positive corruption ticks from play (not penalties). */
export function depthCorruptionGrant(amount = 0) {
  if (amount <= 0) return amount;
  return Math.max(amount, Math.round(amount * (1 + BONUS_FRAC * 0.5)));
}

/** Discontent repair from attention — talking, feeding, gifts. */
export function depthDiscontentEase(baseEase = 0) {
  if (baseEase <= 0) return baseEase;
  return Math.max(baseEase, Math.round(baseEase * MECHANICS_DEPTH_SCALE));
}

export function depthDiscontentWeeklyDecay(base = 0) {
  if (base <= 0) return base;
  return Math.max(base, Math.round(base * (1 + BONUS_FRAC * 0.4)));
}

/** Psych axis deltas — deepen positive fixation/obsession when indulgence aligns. */
export function depthPsychDelta(delta = {}) {
  if (!delta || typeof delta !== 'object') return delta;
  const out = { ...delta };
  for (const k of ['fixation', 'obsession', 'dependence']) {
    if (out[k] > 0) out[k] = Math.max(out[k], Math.round(out[k] * (1 + BONUS_FRAC * 0.45)));
  }
  return out;
}

/** V2 resonance passive lbs / pulse calories. */
export function depthResonancePassiveBonus(base = 0) {
  if (base <= 0) return base;
  return Math.max(base, Math.round(base * MECHANICS_DEPTH_SCALE));
}

export function depthResonancePulseMult(base = 1) {
  return base * (1 + BONUS_FRAC * 0.25);
}

/** Witness / discovery risk — slightly more memory at high scrutiny (stakes). */
export function depthScrutinyDiscoveryMult(base = 1, scrutiny = 0) {
  const tier = scrutiny >= 90 ? 3 : scrutiny >= 75 ? 2 : scrutiny >= 50 ? 1 : 0;
  return base * (1 + tier * 0.04);
}

/** Device dependence wear when rigs stay equipped. */
export function depthDeviceDependenceGain(base = 0) {
  if (base <= 0) return base;
  return Math.max(base, Math.round(base * (1 + BONUS_FRAC * 0.35)));
}

/** Talk topic effect envelope before UI + applyTalkEffect. */
export function enrichTalkEffect(effect = {}) {
  if (!effect) return {};
  const next = { ...effect };
  if (next.rel) next.rel = depthTalkRelGrant(next.rel);
  if (next.corruption) next.corruption = depthCorruptionGrant(next.corruption);
  return next;
}

/** End-of-week digest — small bonus lbs when surplus converted. */
export function depthDigestLbsBonus(lbsGained = 0) {
  if (lbsGained <= 0) return 0;
  return Math.max(0, Math.floor(lbsGained * BONUS_FRAC * 0.22));
}

export function depthForceFeedReachBonus(reachLevel = 1) {
  return Math.max(0, (reachLevel - 1) * 0.018 * (1 + BONUS_FRAC * 0.35));
}

export function depthCompoundFeedResult(feedResult = {}) {
  const fr = { ...feedResult };
  if (fr.relGain) fr.relGain = depthTalkRelGrant(fr.relGain);
  if (fr.corruptionGain) fr.corruptionGain = depthCorruptionGrant(fr.corruptionGain);
  if (fr.calMult && fr.calMult > 1) {
    fr.calMult = 1 + (fr.calMult - 1) * (1 + BONUS_FRAC * 0.2);
  }
  if (fr.digestMult && fr.digestMult > 1) {
    fr.digestMult = 1 + (fr.digestMult - 1) * (1 + BONUS_FRAC * 0.2);
  }
  return fr;
}

export function depthSaturationBonus(base = 0) {
  if (base <= 0) return base;
  return Math.max(base, Math.round(base * (1 + BONUS_FRAC * 0.35)));
}

export function depthSaturationRate(base = 0) {
  if (base <= 0) return base;
  return Math.min(0.85, base * (1 + BONUS_FRAC * 0.18));
}

export function depthPinBlackoutChance(base = 0) {
  return Math.min(0.55, base * (1 + BONUS_FRAC * 0.2));
}

export function depthPinRelBonus(base = 0) {
  return depthTalkRelGrant(base);
}

export function depthOppositionGainMult(mult = 1) {
  if (mult >= 1) return mult;
  return mult - (1 - mult) * (BONUS_FRAC * 0.25);
}

export function depthWellnessScrutinyBonus(base = 0) {
  return depthSaturationBonus(base);
}

export function depthCgDriveGain(base = 0) {
  if (base <= 0) return base;
  return Math.max(base, Math.round(base * (1 + BONUS_FRAC * 0.4)));
}

/** Lower threshold → more growth-event coverage (content depth). */
export function depthMajorGrowthLbsThreshold(base = 8) {
  return Math.max(6, base - 1);
}

export function depthBoardWeeklyGainMult(mult = 1) {
  if (mult <= 1) return mult;
  return 1 + (mult - 1) * (1 + BONUS_FRAC * 0.25);
}
