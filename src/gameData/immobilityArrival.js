// The Squad — Lead: A3 Immobility | Support: A4 Architect
// ═══════════════════════════════════════════════════════════════
// IMMOBILITY ARRIVAL — "The Settling": the weight endgame.
//
//   • Settling area  — girls at stage 10+ leave the roster and live here.
//                      Three robust actions (Socialize / Feed / Care For), each
//                      with a sub-menu (2-click flow). No Talk, no dinner.
//   • SETTLING_ACTIONS — full 3-tree data model. Care subs are dynamic (static
//                        subs + available comfort milestones via getAvailableCareSubs).
//   • settleCounts   — tracks {socialize, feed, care} per girl; dominant at
//                      stage-11 entry determines finalForm.
//   • Final forms    — Ever-Expanding (feed) / Comfort Queen (care) / The Adored
//                      (socialize). Tie → player choice at M4.
//   • Hold Court     — legacy; kept for old saves. New flow replaces it.
//   • Settling       — passive weekly gain once immobilityArrived.
//   • Re-fit         — player action every REFIT_INTERVAL lbs; uncaps settle gain.
//   • Comfort milestones — one-shot scenes, stay done. Folded into Care subs.
//   • Hints          — fire on Care > Tend Her (once per week).
//   • Preferences    — food (pendingCourtPreference → courtPreference) +20% gain.
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

// ── Settling Actions — 3-tree endgame loop ─────────────────────

export const SETTLING_ACTIONS = {
  socialize: {
    label: 'Socialize',
    icon: '💬',
    desc: 'Bring the world to her. Campus oracle, confidante, the center everything orbits.',
    subs: [
      { id: 'gossip',   label: 'Court Gossip',   apCost: 1, sceneKey: 'set.socialize.gossip',   effects: { rel: 4 } },
      { id: 'confide',  label: 'Confide',         apCost: 1, sceneKey: 'set.socialize.confide',  effects: { rel: 6 } },
      { id: 'praise',   label: 'Praise Her Size', apCost: 1, sceneKey: 'set.socialize.praise',   effects: { rel: 3, gain: [2, 5] } },
      { id: 'visitors', label: 'Bring Visitors',  apCost: 2, sceneKey: 'immob.visit',            effects: { rel: 3 }, gate: 'hasVisitor' },
      { id: 'intimate', label: 'Get Close',        apCost: 2, sceneKey: null, effects: {},        gate: 'relTier2', action: 'openIntimacy' },
    ],
  },
  feed: {
    label: 'Feed',
    icon: '🍽️',
    desc: 'Bring her what she craves. She keeps settling when she keeps eating.',
    subs: [
      { id: 'preferred', label: 'Hand-Feed Preferred', apCost: 1, sceneKey: 'set.feed.preferred', effects: { gain: [6, 12], rel: 4 }, gate: 'hasPreference' },
      { id: 'spread',    label: 'Big Spread',          apCost: 2, sceneKey: 'set.feed.spread',    effects: { gain: [10, 20], rel: 5 } },
      { id: 'stuffing',  label: 'Stuffing',            apCost: 2, sceneKey: 'set.feed.stuffing',  effects: { gain: [8, 15], rel: 4, capacity: 2 } },
      { id: 'private',   label: 'Private Feeding',     apCost: 2, sceneKey: null, effects: {},    gate: 'relTier1', action: 'privateSession' },
    ],
  },
  care: {
    label: 'Care For',
    icon: '🤲',
    desc: 'Tend her where she rests. Cooling, fitting, settling — everything comes to her.',
    subs: [
      // Static subs; comfort milestone subs injected dynamically by getAvailableCareSubs()
      { id: 'refit', label: 'Re-fit Clothes', apCost: 1, sceneKey: 'immob.refit',   gate: 'needsRefit', action: 'refit' },
      { id: 'tend',  label: 'Tend Her',       apCost: 1, sceneKey: 'set.care.tend', effects: { rel: 5 } },
    ],
  },
};

// Dynamic Care sub-entries for comfort milestones, keyed to COMFORT_MILESTONES.
export const COMFORT_CARE_SUBS = {
  bed:         { id: 'care_bed',         label: 'Reinforced Bed',  apCost: 2, sceneKey: 'immob.comfort.bed',         action: 'comfort', comfortKey: 'bed' },
  fan:         { id: 'care_fan',         label: 'Personal Fan',    apCost: 1, sceneKey: 'immob.comfort.fan',         action: 'comfort', comfortKey: 'fan' },
  position:    { id: 'care_position',    label: 'Settle Position', apCost: 1, sceneKey: 'immob.comfort.position',    action: 'comfort', comfortKey: 'position' },
  ac:          { id: 'care_ac',          label: 'Climate Control', apCost: 2, sceneKey: 'immob.comfort.ac',          action: 'comfort', comfortKey: 'ac' },
  arrangement: { id: 'care_arrangement', label: 'Room Arrangement',apCost: 2, sceneKey: 'immob.comfort.arrangement', action: 'comfort', comfortKey: 'arrangement' },
};

/** Full Care sub-menu: static subs + available comfort milestone subs injected before 'tend'. */
export function getAvailableCareSubs(student) {
  const milestoneSubs = getAvailableComfortMilestones(student).map(k => COMFORT_CARE_SUBS[k]).filter(Boolean);
  const result = [];
  for (const sub of SETTLING_ACTIONS.care.subs) {
    if (sub.gate === 'needsRefit' && !needsRefit(student)) continue;
    if (sub.id === 'tend') result.push(...milestoneSubs);
    result.push(sub);
  }
  return result;
}

// ── Settle counts & final forms ────────────────────────────────

export function incrementSettleCount(student, branch) {
  const c = student.settleCounts ?? { socialize: 0, feed: 0, care: 0 };
  return { ...student, settleCounts: { ...c, [branch]: (c[branch] ?? 0) + 1 } };
}

export function getSettleDominant(student) {
  const c = student.settleCounts ?? { socialize: 0, feed: 0, care: 0 };
  const sorted = Object.entries(c).sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === 0 || sorted[0][1] === sorted[1][1]) return null;
  return sorted[0][0];
}

export const FINAL_FORMS = {
  feed:      { id: 'ever_expanding', label: 'Ever-Expanding',  desc: 'Growth uncapped. She keeps settling outward without ceiling.' },
  care:      { id: 'comfort_queen',  label: 'Comfort Queen',   desc: 'The room is hers. Other girls seek her warmth.' },
  socialize: { id: 'the_adored',     label: 'The Adored',      desc: 'Pleasure center. Visitors come unprompted. The campus orbits her.' },
};

export function getFinalForm(student) {
  return student?.finalForm ? (FINAL_FORMS[student.finalForm] ?? null) : null;
}

/** Mark final form on first stage-11 settling action. No-op if tied or already set. */
export function markFinalForm(student) {
  const dominant = getSettleDominant(student);
  if (!dominant || student.finalForm) return student;
  return { ...student, finalForm: dominant };
}

// ── Gathering — leviathan capstone (tier 2) ────────────────────
// At her scale the others come to her unprompted. Form-NEUTRAL: it never
// touches settleCounts, because being attended is the shared payoff of both
// The Adored and Comfort Queen — it must not tip the final form either way.
export const GATHERING = {
  apCost: 2,
  label: 'Gather Her Court',
  desc: 'The room is hers now, and the others come to it. Let them attend her.',
  rel: 5,             // to her
  attendeeRel: 2,     // to each girl who attends
  attendeeGain: [1, 3],
};

/**
 * Girls who attend a leviathan's gathering: the closest available girls (by
 * relationship) other than her. Returns [] until tier 2. Capped at 4 so the
 * scene stays legible.
 */
export function getAttendees(student, allStudents = []) {
  if (!student || getImmobilityTier(student) < 2) return [];
  return allStudents
    .filter(s => s.id !== student.id && s.lockState !== 'locked' && !s.hidden && !s.withdrawn)
    .sort((a, b) => (b.relationship ?? 0) - (a.relationship ?? 0))
    .slice(0, 4);
}

// ── Final-form effects — branching payoffs (M4) ────────────────
// Once a form locks at stage 11 it earns a weekly signature. Ever-Expanding
// (feed) feeds her own uncapped growth; Comfort Queen (care) and The Adored
// (socialize) radiate outward across the rest of the campus. Keyed by the
// branch string stored on student.finalForm.
export const FINAL_FORM_FX = {
  feed:      { selfGain: [3, 6],        perk: '+3–6 lbs to her own settling each week — growth without ceiling.' },
  care:      { othersDiscontent: 2,     perk: 'Soothes the room — every other girl sheds 2 discontent each week.' },
  socialize: { othersRel: 1,            perk: 'The campus orbits her — every other girl warms +1 toward you each week.' },
};

export function getFinalFormFx(student) {
  return student?.finalForm ? (FINAL_FORM_FX[student.finalForm] ?? null) : null;
}

/** Ever-Expanding's bonus to HER OWN passive settle gain. 0 for other forms. */
export function finalFormSelfGain(student, rng = Math.random) {
  if (student?.finalForm !== 'feed') return 0;
  const [lo, hi] = FINAL_FORM_FX.feed.selfGain;
  return lo + Math.floor(rng() * (hi - lo + 1));
}

/**
 * Apply each leviathan's outward radiate to the rest of the campus. Comfort
 * Queens soothe discontent; The Adored warm relationships. Effects scale with
 * how many leviathans hold each form. Returns a new students array. The
 * form-locked leviathans themselves are exempt.
 */
export function applyFinalFormRadiate(students = []) {
  const queens = students.filter(s => s.finalForm === 'care').length;
  const adored = students.filter(s => s.finalForm === 'socialize').length;
  if (!queens && !adored) return students;
  return students.map(s => {
    if (getImmobilityTier(s) >= 2 && s.finalForm) return s;
    let next = s;
    if (queens) next = { ...next, discontent: Math.max(0, (next.discontent ?? 0) - FINAL_FORM_FX.care.othersDiscontent * queens) };
    if (adored) next = { ...next, relationship: Math.min(100, (next.relationship ?? 0) + FINAL_FORM_FX.socialize.othersRel * adored) };
    return next;
  });
}

/** Player-chosen final form, for when settleCounts tie at stage 11. No-op if
 *  already locked or the branch is unknown. */
export function chooseFinalForm(student, branchKey) {
  if (student.finalForm || !FINAL_FORMS[branchKey]) return student;
  return { ...student, finalForm: branchKey };
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
