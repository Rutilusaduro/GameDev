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
