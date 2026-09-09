// ═══════════════════════════════════════════════════════════════
// CAMPUS SATURATION — meta-track beyond pharmacist stage alone
// Combines cult supply, device deployment, aggregate student weight.
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';
import { getCampusNarrativeTier } from './pharmacistIngredients.js';

export const SATURATION_TIERS = [
  { id: 0, min: 0, label: 'Normal Campus', desc: 'Standard college rhythms.' },
  { id: 1, min: 25, label: 'Softening', desc: 'Wellness messaging and heavier ambient presence.' },
  { id: 2, min: 55, label: 'Saturated', desc: 'New residents arrive softer; events skew indulgent.' },
  { id: 3, min: 80, label: 'Regional Excess', desc: 'Campus-wide appetite is the default social mode.' },
];

export function computeSaturationScore({ pharmacistState, labState, students, cultSupply = 0 } = {}) {
  let score = 0;
  const narrative = pharmacistState?.campusFattening ? getCampusNarrativeTier(pharmacistState) : 0;
  score += narrative * 12;
  score += Math.min(25, (pharmacistState?.cult?.supplyReservoir ?? 0) / 4);
  score += Math.min(20, Object.values(labState?.installedInventions || {}).filter(Boolean).length * 4);
  const visible = (students || []).filter((s) => !s.hidden);
  if (visible.length) {
    const avgStage = visible.reduce((a, s) => a + getStage(s.lbs).id, 0) / visible.length;
    score += Math.min(30, avgStage * 2.5);
  }
  score += Math.min(15, cultSupply);
  return Math.min(100, Math.round(score));
}

export function getSaturationTier(score) {
  return [...SATURATION_TIERS].reverse().find((t) => score >= t.min) || SATURATION_TIERS[0];
}

export function tickCampusSaturationState(prev = {}, ctx = {}) {
  const score = computeSaturationScore(ctx);
  const tier = getSaturationTier(score);
  const prevTier = prev.tier ?? 0;
  return {
    score,
    tier: tier.id,
    tierLabel: tier.label,
    crossedTier: tier.id > prevTier ? tier.id : null,
    weeksAtTier: tier.id === prevTier ? (prev.weeksAtTier ?? 0) + 1 : 0,
  };
}

export function saturationWeeklyPassiveBonus(tierId) {
  return { 0: 0, 1: 0, 2: 1, 3: 2 }[tierId] ?? 0;
}

export function saturationNewStudentLbsBonus(tierId) {
  return { 0: 0, 1: 5, 2: 12, 3: 20 }[tierId] ?? 0;
}

/** Extra travel-event weight from campus saturation tier. */
export function saturationTravelEventBonus(tierId) {
  return { 0: 0, 1: 0.06, 2: 0.14, 3: 0.22 }[tierId] ?? 0;
}

/** Chance to inject soft ambient indulgence lines while exploring. */
export function saturationSoftFlavorChance(tierId) {
  return { 0: 0, 1: 0.22, 2: 0.38, 3: 0.52 }[tierId] ?? 0;
}

/** Minimum saturation tier to surface certain campus venues in exploration. */
export function saturationVenueUnlockTier(venueId) {
  return { faculty_lounge: 2, underground_passage: 3 }[venueId] ?? 0;
}

export function isVenueUnlockedBySaturation(venueId, tierId) {
  return tierId >= saturationVenueUnlockTier(venueId);
}
