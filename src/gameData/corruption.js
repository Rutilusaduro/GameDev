import { depthLbsGrant } from './mechanicsDepthLayer.js';

// ═══════════════════════════════════════════════════════════════
// CORRUPTION — hidden psychological progression
// Tracks how "broken-in" a resident is to gaining, submission, and
// indulgence. Affects GENERAL actions only (dinners, sessions, floor
// feeds, weekly behavior) — evolved tasks keep their own voice.
//
// Resistance (short-term, per feed)  → lowers force-feed refusal
// Willingness (long-term)            → autonomous eating, dialogue tier
// ═══════════════════════════════════════════════════════════════

export const CORRUPTION_CONFIG = {
  max: 100,
  // sources
  perForceFeed: 2,      // successful extreme action
  perStuffedWeek: 1,    // ended the week stuffed
  perStageUp: 3,        // high-weight milestone
  // effects
  resistancePerPoint: 0.003,   // added to force-feed success chance (max +0.30)
  tier2AutoLbs: [0, 2],        // weekly autonomous surplus eating (lbs)
  tier3AutoLbs: [1, 4],
  tier3SelfStuffChance: 0.35,  // chance she stuffs herself without you
  dialogueChance: 0.45,        // chance a feed surfaces an inner-voice line
  revealRelationship: 55,      // relationship needed to read her psyche
};

export const CORRUPTION_TIERS = [
  { id: 0, min: 0,  label: "Hesitant",   color: "#7a8a9a", desc: "Embarrassed, uncertain. She doesn't understand what's happening to her appetite — or doesn't want to." },
  { id: 1, min: 34, label: "Conflicted", color: "#c8860a", desc: "Acceptance is winning. She knows she shouldn't enjoy this. She does anyway." },
  { id: 2, min: 67, label: "Broken In",  color: "#c03050", desc: "Open, eager, proud. The hesitation is gone. She asks now." },
];

export const getCorruptionTier = (c = 0) =>
  [...CORRUPTION_TIERS].reverse().find(t => c >= t.min) || CORRUPTION_TIERS[0];

// Fallback copy when scene renderers miss. Engine lines win when they return.
export const CORRUPTION_AUTO_LINES = [
  (s) => `${s.name} didn't wait for you this week — the delivery receipts speak for themselves.`,
  (s) => `${s.name} stuffed herself on her own this week, and made sure you'd hear about it.`,
  (s) => `${s.name} texts you a photo of an emptied table. No caption. None needed.`,
];

export const CORRUPTION_TIER_UP_LINES = [
  null,
  (s) => `Something has shifted in ${s.name}. The guilt is losing. She lingers after eating now, like she's waiting for permission to want more.`,
  (s) => `${s.name} has stopped pretending entirely. Whatever she was protecting before — modesty, restraint, the person she used to be — she's traded it for appetite. She's proud of the trade.`,
];

/** Autonomous surplus lbs from corruption tier (weekly passive tick). */
export function corruptionAutoLbsBonus(tierId, rnd = Math.random) {
  let extra = 0;
  if (tierId === 1) {
    const [lo, hi] = CORRUPTION_CONFIG.tier2AutoLbs;
    extra = lo + Math.floor(rnd() * (hi - lo + 1));
  } else if (tierId === 2) {
    const [lo, hi] = CORRUPTION_CONFIG.tier3AutoLbs;
    extra = lo + Math.floor(rnd() * (hi - lo + 1));
  }
  if (extra <= 0) return 0;
  return depthLbsGrant(extra);
}

