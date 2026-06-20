// ═══════════════════════════════════════════════════════════════
// DISCONTENT — a hidden per-girl unhappiness that the world expresses
// through behavior, never a bar. Accumulates from things she dislikes
// (unsolicited body comments, force-feeding before she trusts you,
// being shown off in public before she's comfortable), shows up as
// sour moods, cold tells, and feed refusals, and eases when you pay
// attention or stop doing the thing she hates.
//
// Grievances are recorded into the memory store (negative types) so a
// future confrontation can throw the specifics back at you.
// ═══════════════════════════════════════════════════════════════
import { getCorruptionTier } from './corruption.js';

export const DISCONTENT_TIERS = [
  { id: 0, min: 0,  key: 'content',    label: 'content' },
  { id: 1, min: 20, key: 'miffed',     label: 'miffed' },
  { id: 2, min: 50, key: 'resentful',  label: 'resentful' },
  { id: 3, min: 80, key: 'rebellious', label: 'rebellious' },
];

// How much each kind of slight stings.
export const DISCONTENT_GAIN = { creeped: 18, betrayed: 16, exposed: 9 };
// How it mends.
export const DISCONTENT_EASE_FEED = 2;     // attention, slowly
export const DISCONTENT_EASE_TALK = 4;
export const DISCONTENT_WEEKLY_DECAY = 5;  // fades if you stop offending

export function getDiscontentTier(student) {
  const v = student?.discontent || 0;
  let t = DISCONTENT_TIERS[0];
  for (const tier of DISCONTENT_TIERS) { if (v >= tier.min) t = tier; }
  return t;
}

/** Clamp a discontent value after a delta. */
export function bumpDiscontent(value, amount) {
  return Math.max(0, Math.min(100, (value || 0) + amount));
}

/** A force-feed is a betrayal when she's neither corrupted nor close: she
 *  doesn't yet want this, and you did it anyway. */
export function forceFeedIsBetrayal(student) {
  const cor = getCorruptionTier(student?.corruption || 0).id;
  return cor === 0 && (student?.relationship || 0) <= 40;
}

/** Odds she refuses an ordinary feed out of pique (resentful+). */
export function discontentRefusalChance(student) {
  const tier = getDiscontentTier(student).id;
  if (tier >= 3) return 0.5;
  if (tier >= 2) return 0.25;
  return 0;
}

// ── Confrontation & repair ────────────────────────────────────
export const CONFRONT_THRESHOLD = 80;        // she confronts you here
export const AMENDS_FLOOR = 35;              // a sincere apology lands here
export const GIFT_FLOOR = 15;                // a peace offering goes further
export const GIFT_COST = 250;                // what smoothing it over costs

const GRIEVANCE_TYPES = ['betrayed', 'creeped', 'exposed'];

/** The grievance she's angriest about — most recent of the offending kinds. */
export function dominantGrievance(student) {
  const mems = (student?.memories || []).filter((m) => GRIEVANCE_TYPES.includes(m.t));
  return mems.length ? mems[mems.length - 1].t : null;
}

/** Should this girl confront you now? */
export function shouldConfront(student, week) {
  if (!student || student.withdrawn) return false;
  if ((student.discontent || 0) < CONFRONT_THRESHOLD) return false;
  const last = student.lastConfrontWeek;
  return last == null || week - last >= 2;
}
