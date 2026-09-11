// ═══════════════════════════════════════════════════════════════
// PHARMACIST CAMPUS — Stage 2+ world integration (Wellness to Excess)
// Renee testers, Maya recruits, ambient campus, weekly events.
// ═══════════════════════════════════════════════════════════════

import { TESTER_START_LBS } from './cultivator.js';
import { saturationNewStudentLbsBonus } from './campusSaturation.js';
import { getCampusNarrativeTier, CAMPUS_NARRATIVE_LABELS } from './pharmacistIngredients.js';

export { CAMPUS_NARRATIVE_LABELS, getCampusNarrativeTier };

export const CAMPUS_FATTENING_BY_STAGE = {
  1: { passiveLbs: [0, 1], testerBonus: 0, hiveRecruitBonus: 0 },
  2: { passiveLbs: [1, 2], testerBonus: 35, hiveRecruitBonus: 55 },
  3: { passiveLbs: [1, 3], testerBonus: 55, hiveRecruitBonus: 90 },
  4: { passiveLbs: [2, 4], testerBonus: 80, hiveRecruitBonus: 130 },
};

export function getCampusFatteningTier(pharmacistState) {
  if (!pharmacistState?.campusFattening) return null;
  return CAMPUS_FATTENING_BY_STAGE[pharmacistState.stage] || CAMPUS_FATTENING_BY_STAGE[2];
}

export function getCampusTesterStartLbs(pharmacistState, saturationTier = 0) {
  const tier = getCampusFatteningTier(pharmacistState);
  const base = tier ? TESTER_START_LBS + tier.testerBonus : TESTER_START_LBS;
  return base + saturationNewStudentLbsBonus(saturationTier);
}

export function getCampusHiveRecruitLbsBonus(pharmacistState, saturationTier = 0) {
  const campus = getCampusFatteningTier(pharmacistState)?.hiveRecruitBonus ?? 0;
  return campus + saturationNewStudentLbsBonus(saturationTier);
}

export function rollCampusPassiveLbs(pharmacistState, rndFn) {
  const tier = getCampusFatteningTier(pharmacistState);
  if (!tier) return 0;
  const [lo, hi] = tier.passiveLbs;
  const narrative = getCampusNarrativeTier(pharmacistState);
  const bonus = narrative >= 3 ? 1 : narrative >= 2 ? 0 : 0;
  return rndFn(lo + bonus, hi + bonus);
}

/** Weekly campus event roll chance scales with narrative tier and saturation. */
export function getCampusWeeklyEventChance(pharmacistState, saturationTier = 0) {
  const narrative = getCampusNarrativeTier(pharmacistState);
  const base = { 1: 0.22, 2: 0.3, 3: 0.38 }[narrative] || 0;
  const satBonus = { 0: 0, 1: 0.04, 2: 0.08, 3: 0.12 }[saturationTier] ?? 0;
  return Math.min(0.55, base + satBonus);
}

export function scaleCampusEventGain(gainRange, pharmacistState, rndFn, saturationTier = 0) {
  const narrative = getCampusNarrativeTier(pharmacistState);
  const narrativeMult = narrative >= 3 ? 1.35 : narrative >= 2 ? 1.15 : 1;
  const satMult = 1 + ({ 0: 0, 1: 0.05, 2: 0.1, 3: 0.18 }[saturationTier] ?? 0);
  const mult = narrativeMult * satMult;
  const [lo, hi] = gainRange;
  return rndFn(Math.round(lo * mult), Math.round(hi * mult));
}

/** Ambient lines when walking campus under Sophia's wellness influence. */
export const CAMPUS_SOFT_FLAVOR = [
  "A wellness flyer on the bulletin board promises 'metabolic support' in pastel gradients. Half of them are already taken.",
  "Someone has replaced the vending machine's 'low-cal' row with 'recovery blends.' Nobody complained.",
  "The quad smells like cinnamon rolls and something sweeter underneath — campus-wide, persistent, intentional.",
  "Two residents you don't recognize pass carrying trays meant for four. They look satisfied, not surprised.",
  "A dining hall chalkboard reads: SECOND HELPINGS ENCOURAGED. The handwriting is new.",
  "Delivery drivers have started recognizing this building by smell alone.",
  "The gym's scale room is mysteriously under renovation. A sign says COMFORT FIRST.",
  "A campus wellness podcast is playing from an open window. The topic is 'honoring hunger.'",
];

export const PHARMACIST_CAMPUS_ENCOUNTERS = [
  (s) => `Someone from another hall stops ${s.name} in the corridor to ask where she gets her meal portions. ${s.name} looks flustered and pleased.`,
  () => `The campus nurse's office reports a spike in 'healthy appetite consultations.' The waiting room is full.`,
  () => `Wellness samples appear on tables in three buildings overnight. They are gone by noon.`,
  (s) => `${s.name} mentions the new 'metabolic support' smoothies at the union. She has already had two.`,
  () => `Dorm refrigerators campus-wide are working harder. Facilities blames 'seasonal adjustment.'`,
  () => `A soft-body positivity mural goes up in the campus union. It is larger than the old athletics banner.`,
];

/** Weekly events when campus fattening is active (rolled in advanceWeek). */
export const PHARMACIST_CAMPUS_EVENTS = [
  {
    id: 'wellness_fair',
    target: 'hall',
    gain: [2, 5],
    text: () => `Sophia's wellness branding has reached the campus union: free "metabolic support" samples at every table. The line wraps around the building. Your floor drifts through it the way water finds low ground — unhurried, thorough, noticeably fuller by evening.`,
  },
  {
    id: 'dining_portions',
    target: 'hall',
    gain: [3, 6],
    text: () => `The dining hall quietly increases default portions campus-wide. Regulars notice first. Your residents notice second. By week's end the staff are plating for appetites that did not exist last semester.`,
  },
  {
    id: 'delivery_surge',
    target: 'single',
    gain: [4, 8],
    text: (s) => `Campus delivery apps report record volume in your zip code. ${s.name}'s building accounts for an embarrassing share. She shows you the order history like it explains itself. It almost does.`,
  },
  {
    id: 'softening_ambient',
    target: 'hall',
    gain: [1, 3],
    text: () => `You cannot point to a single incident — just a week where everyone seems warmer, slower, and more willing to keep eating after they should have stopped. The campus feels padded at the edges.`,
  },
  {
    id: 'hive_lilith_pipeline',
    target: 'hall',
    gain: [2, 4],
    requires: (ctx) => ctx.hasMayaHive,
    text: () => `Maya's delivery network is pulling heavier recruits from Lilith's routes this week — softer bodies, fuller appetites, already primed when they reach the dorms. The Nest hums with fresh biomass.`,
  },
  {
    id: 'late_kitchen',
    target: 'hall',
    gain: [3, 6],
    text: () => `The hall kitchen stays warm past quiet hours. Sophia's samples migrated from the union table into your fridge without anyone filing a form. Residents find them. Residents finish them.`,
  },
];

export function pickPharmacistCampusEvent(students, ctx = {}) {
  const pool = PHARMACIST_CAMPUS_EVENTS.filter(ev => !ev.requires || ev.requires(ctx));
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}
