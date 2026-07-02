// The Squad — Lead: A4 Architect
// ═══════════════════════════════════════════════════════════════
// TEXT CONTEXT — game state → text-engine globals/dimensions
// Centralizes mealType, locale, clothingState, corruption shift,
// and week gain plumbing for procedural prose.
// ═══════════════════════════════════════════════════════════════
import { createContext, createSessionUsed, registerDimension } from '../textEngine/engine.js';
import { getCorruptionTier } from './corruption.js';
import { getStage } from './stages.js';
import { garmentFitState, outfitFor, worstFitState } from './outfits.js';

// Garment fit dimensions — usable directly as `when` keys via the ctx.d
// fallthrough: when: { fitWaist: 'straining' } (WORD_GRANULAR_ENGINE_PLAN §4.4).
const fitDim = (slot) => (ctx) => garmentFitState(outfitFor(ctx.subject)[slot], ctx.subject?.lbs);
registerDimension('fitTop', fitDim('top'));
registerDimension('fitBottom', fitDim('bottom'));
registerDimension('fitWaist', fitDim('waist'));
registerDimension('worstFit', (ctx) => worstFitState(ctx.subject));

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

/** Map campus exploration node ids to campus.scene locale keys. */
const CAMPUS_NODE_LOCALE = {
  office: 'prof_office',
  lecture_hall: 'lecture_hall',
  science_wing: 'hallway',
  quad: 'hallway',
  library: 'hallway',
  dining_hall: 'cafeteria',
  gym: 'gym',
  dorms: 'dorm_room',
  faculty_lounge: 'prof_office',
  garden: 'hallway',
  food_court: 'cafeteria',
  student_union: 'hallway',
  coffee_shop: 'cafeteria',
  arts_wing: 'hallway',
  outdoor_track: 'gym',
  health_center: 'hallway',
  theater: 'lecture_hall',
  rooftop: 'prof_office',
};

export function campusNodeToLocale(nodeId) {
  return CAMPUS_NODE_LOCALE[nodeId] || 'hallway';
}

/** Re-export for gameplay callers wiring narrative sessions. */
export { createSessionUsed };

/** Week-long anti-repetition bag from persisted student state. */
export function weekUsedFromStudent(student) {
  return new Set(student?.textUsedKeys || []);
}

/** Serialize weekUsed for student patch after a narrative session. */
export function weekUsedToPatch(weekUsed) {
  if (!weekUsed?.size) return {};
  return { textUsedKeys: [...weekUsed] };
}

/** Merge session picks into the student's week bag (mutates weekUsed). */
export function absorbSessionUsed(sessionUsed, weekUsed) {
  if (!sessionUsed?.size || !weekUsed) return weekUsed;
  for (const key of sessionUsed) weekUsed.add(key);
  return weekUsed;
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

export function buildTextContext({ subject, week = 1, ref = null, skillEffects = {}, sessionUsed, weekUsed, ...opts }) {
  return createContext({
    subject,
    ref,
    week,
    skillEffects,
    sessionUsed: sessionUsed ?? opts.sessionUsed,
    weekUsed: weekUsed ?? opts.weekUsed ?? weekUsedFromStudent(subject),
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

/** Stages 0–4 and corruption tier 0 — earlyGain / slender scene eligibility. */
export function isSlenderEligible(student) {
  if (!student) return false;
  const stageId = getStage(student.lbs ?? 0).id;
  const corruptionId = getCorruptionTier(student.corruption ?? 0).id;
  return stageId <= 4 && corruptionId === 0;
}

/** Clear per-week text flags when advancing the calendar. */
export function clearWeeklyTextFlags(student, endingWeek) {
  const patch = { weekStartLbs: student.lbs, textUsedKeys: [] };
  if (student.corruptionShiftWeek != null && student.corruptionShiftWeek <= endingWeek) {
    patch.corruptionShiftWeek = undefined;
  }
  return { ...student, ...patch };
}
