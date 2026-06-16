// ═══════════════════════════════════════════════════════════════
// FEEDING SESSION — shared fullness/capacity helpers for dinner,
// group dinner, and private sessions (DEPTH_PLAN §8)
// ═══════════════════════════════════════════════════════════════
import { GAIN_CONFIG } from './gainSystem.js';
import { getHungerTier, getAddictionLevel } from './hungerAddiction.js';
import { getCorruptionTier } from './corruption.js';

/**
 * Unified feed capacity — stomach + skill soft-start + optional session bonuses.
 * Use everywhere refusal, UI %, and overfill checks must agree (DEPTH_PLAN §8).
 */
export function getFeedCapacity(student, {
  softStartBonus = 0,
  capacityBonus = 0,
  toleranceBuffer = 0,
} = {}) {
  const base = student?.stomachCapacity || GAIN_CONFIG.baseCapacity;
  return base + softStartBonus + capacityBonus + toleranceBuffer;
}

/** Effective stomach cap during a venue session (optional session bonuses). */
export function getSessionCapacityCap(student, opts = {}) {
  return getFeedCapacity(student, opts);
}

/** Fullness as % of effective cap (100 = at capacity, 130 = 30% over). */
export function getFullnessPercent(student, options = {}) {
  const cap = getSessionCapacityCap(student, options);
  if (!cap) return 0;
  return Math.round(((student?.fullness || 0) / cap) * 100);
}

/** Dinner ending fullness bucket (0–3) from fullness vs cap. */
export function getDinnerFullnessGroup(fullness, cap) {
  const ratio = cap > 0 ? fullness / cap : 0;
  if (ratio <= 1.0) return 0;
  if (ratio <= 1.3) return 1;
  if (ratio <= 1.6) return 2;
  return 3;
}

/** Chance a push-past-cap dish ends the evening. */
export function rollOverfillEndChance(fullness, cap) {
  if (fullness <= cap) return 0;
  const overfillRatio = (fullness - cap) / cap;
  return Math.min(0.8, overfillRatio);
}

/** Private session tap-out probability from fullness %. */
export function getTapOutProbability(fPct, tapOutResistance = 0) {
  if (fPct < 150) return 0;
  if (fPct >= 250) return 1;
  const tapProb = ((fPct - 150) / 100) * 0.9;
  return Math.max(0, tapProb - tapOutResistance);
}

/** Calories fed since session start (uses consumedCalories ledger). */
export function getSessionCaloriesFed(student, sessionStartCalories = 0) {
  return Math.max(0, (student?.consumedCalories || 0) - sessionStartCalories);
}

/** Short UI note when hunger or corruption shapes appetite. */
export function getFeedingAppetiteNote(student) {
  const hunger = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  const cor = getCorruptionTier(student?.corruption || 0).id;
  if (hunger >= 3 && addiction >= 2) return 'Craving — she orders aggressively and refuses less.';
  if (hunger >= 2) return 'Hungry — appetite is running hot tonight.';
  if (cor >= 2) return 'Surrendered — she rarely pushes back anymore.';
  if (cor >= 1) return 'Softening — indulgence feels natural to her now.';
  return null;
}
