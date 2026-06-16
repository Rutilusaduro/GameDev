// The Squad — Lead: A4 Architect
// ═══════════════════════════════════════════════════════════════
// TEXT CONTEXT — game state → text-engine globals/dimensions
// Centralizes mealType, locale, clothingState, corruption shift,
// and week gain plumbing for procedural prose.
// ═══════════════════════════════════════════════════════════════
import { createContext } from '../textEngine/engine.js';
import { getCorruptionTier } from './corruption.js';
import { getStage } from './stages.js';

/** Infer clothing strain from stage when no explicit state is stored. */
export function deriveClothingState(student) {
  if (student?.clothingState) return student.clothingState;
  const stage = getStage(student?.lbs ?? 0).id;
  if (stage >= 10) return 'waistband_surrender';
  if (stage >= 7) return 'seam_split';
  if (stage >= 5) return 'zipper_fail';
  if (stage >= 3) return 'button_pop';
  return 'fitted';
}

/** Map dinner venue ids to campus locale keys used by scene pools. */
const DINNER_VENUE_LOCALE = {
  campus_cafe: 'cafeteria',
  dining_hall: 'cafeteria',
  brunch: 'cafeteria',
  steakhouse: 'cafeteria',
  french: 'cafeteria',
  omakase: 'cafeteria',
  private_club: 'prof_office',
  chefs_table: 'prof_office',
  home_dinner: 'dorm_room',
};

export function dinnerVenueToLocale(venueId) {
  return DINNER_VENUE_LOCALE[venueId] || 'cafeteria';
}

/** Week-over-week gain in lbs (0 if unknown). */
export function weekGainLbs(student) {
  if (student?.weekStartLbs == null) return 0;
  return Math.max(0, Math.round((student.lbs ?? 0) - student.weekStartLbs));
}

/** Build globals bag for createContext from live student + opts. */
export function buildTextGlobals(student, week, opts = {}) {
  const gain = opts.weekGainLbs ?? weekGainLbs(student);
  const corruptionShiftWeek = student?.corruptionShiftWeek;
  return {
    campusFattening: !!opts.campusFattening,
    campusTier: opts.campusTier ?? 0,
    bigScale: !!opts.bigScale,
    locale: opts.locale ?? opts.campusLocale ?? 'office',
    mealType: opts.mealType ?? opts.mealContext ?? 'meal',
    clothingState: opts.clothingState ?? deriveClothingState(student),
    lastCorruptionShift: opts.lastCorruptionShift ?? (corruptionShiftWeek != null && corruptionShiftWeek === week),
    weekGainLbs: gain,
    isGaining: gain > 0,
    ...(opts.globals || {}),
  };
}

export function buildTextContext({ subject, week = 1, ref = null, skillEffects = {}, ...opts }) {
  return createContext({
    subject,
    ref,
    week,
    skillEffects,
    globals: buildTextGlobals(subject, week, opts),
  });
}

/** Fields to merge when corruption points change — sets shift week on tier crossing. */
export function corruptionStudentPatch(student, newCorruption, week) {
  const before = getCorruptionTier(student?.corruption ?? 0).id;
  const after = getCorruptionTier(newCorruption).id;
  const patch = { corruption: newCorruption };
  if (after > before) {
    patch.corruptionShiftWeek = week;
    patch.lastCorruptionTier = after;
  }
  return patch;
}

/** Stage-up clothing state hint for digest / growth moments. */
export function clothingStateForStage(stageId) {
  if (stageId >= 10) return 'waistband_surrender';
  if (stageId >= 7) return 'seam_split';
  if (stageId >= 5) return 'zipper_fail';
  if (stageId >= 3) return 'button_pop';
  return 'fitted';
}

/** Clear per-week text flags when advancing the calendar. */
export function clearWeeklyTextFlags(student, endingWeek) {
  const patch = { weekStartLbs: student.lbs };
  if (student.corruptionShiftWeek != null && student.corruptionShiftWeek <= endingWeek) {
    patch.corruptionShiftWeek = undefined;
  }
  return { ...student, ...patch };
}
