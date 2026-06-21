// The Squad — Lead: A3 Immobility | Support: A4 Architect
// ═══════════════════════════════════════════════════════════════
// IMMOBILITY ARRIVAL — "The Settling": the weight endgame.
//
//   • Hold Court     — repeatable; tends her, settles her deeper, fires hints.
//   • Settling       — passive weekly gain once immobilityArrived; capped when
//                      she needs a re-fit (lastRefitLbs + REFIT_INTERVAL < lbs).
//   • Re-fit         — player action every REFIT_INTERVAL lbs; uncaps settle gain.
//   • Comfort milestones — weight-gated (bed/ac/arrangement) or hint-gated
//                          (fan/position). One-shot scenes, stay done.
//   • Hints          — she mentions a preference during Hold Court (one per week);
//                      escalates 0→3; acting early gives bigger rel boon.
//   • Preferences    — food (pendingCourtPreference → courtPreference) gives
//                      +20% settle gain when confirmed.
// ═══════════════════════════════════════════════════════════════
import { getStage } from './stages.js';

export const IMMOBILITY_THRESHOLD = 10;
export const REFIT_INTERVAL = 50;
export const COURT_PREFERENCES = ['sweet', 'savory', 'spicy', 'volume'];

// V1 active hints. 'company' deferred to V2 (brokered visits).
const HINT_KEYS = ['food', 'heat', 'position'];

export const IMMOBILITY_ARRIVAL = {
  apCost: 2,
  label: 'Hold Court',
  desc: 'She has arrived at her settled size. Court her where she rests — bring her the day, tend her vastness, and let her go on settling deeper into being kept.',
  gain: [5, 10],
  rel: 6,
  settlePassive: [2, 5],
};

export const COMFORT_MILESTONES = {
  bed:         { label: 'Reinforced Bed',    apCost: 2, desc: "She's outgrown the standard bed. Have something built to carry her." },
  fan:         { label: 'Personal Fan',      apCost: 1, desc: "She runs warm now. A fan for where she rests." },
  position:    { label: 'Settle Her',        apCost: 1, desc: "Help her find the settled arrangement that works for her." },
  ac:          { label: 'Climate Control',   apCost: 2, desc: "Full AC — she generates her own heat at this scale." },
  arrangement: { label: 'Room Arrangement',  apCost: 2, desc: "Rearrange the room so everything comes to her." },
};

/** 0 = mobile, 1 = settled (stage 10), 2 = the room's gravity (stage 11). */
export function getImmobilityTier(student) {
  const id = getStage(student?.lbs ?? 0).id;
  if (id >= 11) return 2;
  if (id >= IMMOBILITY_THRESHOLD) return 1;
  return 0;
}

/** The repeatable Hold Court capstone, or null if not immobile. */
export function getImmobilityArrival(student) {
  if (!student) return null;
  const tier = getImmobilityTier(student);
  if (tier < 1) return null;
  return { ...IMMOBILITY_ARRIVAL, tier, firstUnlock: !(student.immobilityArrived ?? false) };
}

export function markImmobilityArrived(student) {
  return { ...student, immobilityArrived: true };
}

// ── Re-fit ─────────────────────────────────────────────────────

/** True when she has grown REFIT_INTERVAL lbs past her last re-fit. */
export function needsRefit(student) {
  if (!student || getImmobilityTier(student) < 1) return false;
  // Default: treat as freshly fitted (safe for old saves without lastRefitLbs).
  const last = student.lastRefitLbs ?? (student.lbs ?? 0);
  return (student.lbs ?? 0) - last >= REFIT_INTERVAL;
}

export function markRefit(student) {
  return { ...student, lastRefitLbs: student.lbs ?? 0 };
}

export function getRefitAction(student) {
  if (!needsRefit(student)) return null;
  return { apCost: 1, label: 'Re-fit Her Clothes', desc: "She's grown into a new size. Have something made to fit." };
}

// ── Comfort milestones ─────────────────────────────────────────

/** Keys of comfort milestones the player can take right now (not yet done). */
export function getAvailableComfortMilestones(student) {
  if (!student || getImmobilityTier(student) < 1) return [];
  const c = student.courtComfort ?? {};
  const h = student.courtHints ?? {};
  const tier = getImmobilityTier(student);
  const ms = [];
  if (!c.bed) ms.push('bed');
  if (!c.fan && (h.heat ?? 0) >= 1) ms.push('fan');
  if (!c.position && (h.position ?? 0) >= 1) ms.push('position');
  if (!c.ac && tier >= 2) ms.push('ac');
  if (!c.arrangement && tier >= 2 && c.ac) ms.push('arrangement');
  return ms;
}

export function markComfortMilestone(student, key) {
  return { ...student, courtComfort: { ...(student.courtComfort ?? {}), [key]: true } };
}

// ── Hints ──────────────────────────────────────────────────────

/**
 * Returns the next hint to fire this Hold Court, or null.
 * Picks whichever unfulfilled hint has fired fewest times (0→3 escalation).
 */
export function getNextHint(student) {
  if (!student?.immobilityArrived || getImmobilityTier(student) < 1) return null;
  const h = student.courtHints ?? {};
  const c = student.courtComfort ?? {};
  const pending = HINT_KEYS.filter(k => {
    if (k === 'food' && student.courtPreference) return false;
    if (k === 'heat' && c.fan) return false;
    if (k === 'position' && c.position) return false;
    return (h[k] ?? 0) < 3;
  });
  if (!pending.length) return null;
  const sorted = [...pending].sort((a, b) => (h[a] ?? 0) - (h[b] ?? 0));
  const pref = sorted[0];
  return { pref, tier: (h[pref] ?? 0) + 1 }; // tier AFTER this increment (1/2/3)
}

export function incrementHint(student, pref) {
  return { ...student, courtHints: { ...(student.courtHints ?? {}), [pref]: (student.courtHints?.[pref] ?? 0) + 1 } };
}

/** On first food hint, lock in a random pending preference. */
export function initFoodHint(student) {
  if (student.pendingCourtPreference) return student;
  const pref = COURT_PREFERENCES[Math.floor(Math.random() * COURT_PREFERENCES.length)];
  return { ...student, pendingCourtPreference: pref };
}

/** Confirm the pending food preference → activates gain modifier. */
export function confirmCourtPreference(student) {
  if (!student.pendingCourtPreference) return student;
  return { ...student, courtPreference: student.pendingCourtPreference };
}

/**
 * Boon tier for acting on a hint.
 * tier <= 1 means the player caught it on the first mention → 'early' (big rel).
 */
export function getCourtBoonTier(student, pref) {
  return (student.courtHints?.[pref] ?? 0) <= 1 ? 'early' : 'standard';
}

// ── Settle gain (modified) ─────────────────────────────────────

/**
 * Passive weekly gain. Capped at minimum when she needs a re-fit.
 * +20% when courtPreference is confirmed (preferred food in rotation).
 * Returns 0 until immobilityArrived is set.
 */
export function immobilitySettleGain(student, rng = Math.random) {
  if (!student?.immobilityArrived || getImmobilityTier(student) < 1) return 0;
  const [lo, hi] = IMMOBILITY_ARRIVAL.settlePassive;
  const capped = needsRefit(student);
  const effectiveHi = capped ? lo : hi;
  let gain = lo + Math.floor(rng() * (effectiveHi - lo + 1));
  if (!capped && student.courtPreference) gain = Math.round(gain * 1.2);
  return gain;
}
