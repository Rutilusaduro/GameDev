// ═══════════════════════════════════════════════════════════════
// FEEDING SESSION — shared fullness/capacity helpers for dinner,
// group dinner, and private sessions (DEPTH_PLAN §8)
// ═══════════════════════════════════════════════════════════════
import { GAIN_CONFIG } from './gainSystem.js';
import { getHungerTier, getAddictionLevel } from './hungerAddiction.js';
import { getCorruptionTier } from './corruption.js';
import { getForceFeedComplianceBonus } from './deviceGating.js';
import { ITEMS } from './items.js';

/**
 * Venue/private dish ids linked to pantry ITEMS[] for a shared cal/full model.
 * Dishes without a link still use gain[] + fullness fields.
 */
export const DISH_ITEM_LINKS = {
  lasagne: 'family_lasagna',
  cheesecake: 'cake_whole',
  tiramisu: 'cake_whole',
  soufle: 'cake_whole',
  mille_feuille: 'cake_whole',
  pr_cake: 'cake_whole',
  pr_brownie: 'gainer_fudge',
  dessert_cart: 'cake_whole',
  home_dessert: 'cake_whole',
  atelier_dessert: 'cake_whole',
  brunch_board: 'snack_crate',
  pr_board: 'snack_crate',
  ribeye: 'feast_platter',
  personal_menu: 'feast_platter',
  tasting_menu: 'feast_platter',
  pr_roast: 'feast_platter',
  french_toast: 'donut_box',
  waffle_stack: 'donut_box',
  pr_chocolates: 'gainer_fudge',
};

/** Session pace — tactical layer over force-feed odds (DEPTH_PLAN §4). */
export const SESSION_PACE_ACTIONS = [
  { id: 'gentle', label: 'Gentle pace', refusalBonus: -0.06, tapOutMult: 0.82, desc: 'Easier refusal, less tap-out pressure.' },
  { id: 'steady', label: 'Steady pace', refusalBonus: 0, tapOutMult: 1, desc: 'Default rhythm.' },
  { id: 'push', label: 'Push harder', refusalBonus: 0.14, tapOutMult: 1.22, desc: 'Higher force-feed odds when she\'s stuffed.' },
];

export function getSessionPaceModifiers(paceId = 'steady') {
  return SESSION_PACE_ACTIONS.find((p) => p.id === paceId) || SESSION_PACE_ACTIONS[1];
}

/** Hunger/corruption/trait modifiers for feed attempts (DEPTH_PLAN §8). */
export function getFeedingModifiers(student, {
  generousTrait = false,
  context = 'meal',
} = {}) {
  const hunger = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  const cor = getCorruptionTier(student?.corruption || 0).id;
  let refusalBonus = 0;
  if (hunger >= 3 && addiction >= 2) refusalBonus += 0.12;
  else if (hunger >= 2) refusalBonus += 0.06;
  if (cor >= 2) refusalBonus += 0.08;
  else if (cor >= 1) refusalBonus += 0.04;
  refusalBonus += getForceFeedComplianceBonus(student);

  let fullnessMult = 1;
  if (generousTrait && (context === 'dinner' || context === 'group_dinner')) fullnessMult = 1.1;

  let calorieMult = 1;
  if (hunger >= 3 && addiction >= 2) calorieMult = 1.12;
  else if (hunger >= 2) calorieMult = 1.05;

  return { refusalBonus, fullnessMult, calorieMult, hunger, corruption: cor };
}

/**
 * Resolve a venue dish, private food, or pantry item into calories + fullness.
 * Prefers itemId / DISH_ITEM_LINKS → ITEMS[]; falls back to gain[] + fullness.
 */
export function resolveFeedPayload(source, student, {
  skillGainMult = 1,
  profGainMult = 1,
  calorieMult = 1,
  gainLbs = null,
} = {}) {
  const itemId = source.itemId || DISH_ITEM_LINKS[source.id];
  const gainMult = (student?.gainMultiplier || 1) * profGainMult * calorieMult;

  if (itemId) {
    const item = ITEMS.find((i) => i.id === itemId);
    if (item) {
      return {
        calories: Math.round(item.cal * gainMult),
        fullness: item.full,
        label: source.label || item.label,
        itemId,
      };
    }
  }

  const lo = source.gain?.[0] ?? 1;
  const hi = source.gain?.[1] ?? lo;
  const gain = gainLbs ?? lo;
  return {
    calories: Math.round(gain * GAIN_CONFIG.calsPerLb * skillGainMult * gainMult),
    fullness: source.fullness ?? 15,
    label: source.label || 'Meal',
    itemId: null,
  };
}

/** Pantry items a venue may surface beyond the player's inventory. */
export function getVenuePantrySuggestions(venueId) {
  const byVenue = {
    steakhouse: ['feast_platter', 'protein_shake'],
    french: ['butter_coffee', 'cake_whole'],
    brunch_hall: ['donut_box', 'butter_coffee'],
    home_dinner: ['family_lasagna', 'cake_whole', 'snack_crate'],
    atelier: ['feast_platter', 'cake_whole', 'gainer_fudge'],
    chefs_table: ['feast_platter', 'cake_whole'],
    private_club: ['cake_whole', 'feast_platter'],
  };
  const ids = byVenue[venueId] || ['protein_shake', 'donut_box'];
  return ids.map((id) => ITEMS.find((i) => i.id === id)).filter(Boolean);
}

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
