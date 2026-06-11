// ═══════════════════════════════════════════════════════════════
// CORRUPTION — hidden psychological progression
// Tracks how "broken-in" a girl is to gaining, submission, and
// indulgence. Affects GENERAL actions only (dinners, sessions, class
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

// Inner-voice lines surfaced during general feeding, by tier.
export const CORRUPTION_FEED_LINES = [
  [ // tier 0 — hesitant
    (s) => `${s.name}, quietly: "I… I don't know if I should be eating this much…"`,
    (s) => `${s.name} glances down at herself mid-bite and goes a little pink. She keeps eating, slower.`,
    (s) => `${s.name}: "This is the last one. I mean it this time." She has said this before.`,
    (s) => `${s.name} eats with the careful, guilty attention of someone keeping a secret from herself.`,
  ],
  [ // tier 1 — conflicted
    (s) => `${s.name}, softer than she intends: "I know I shouldn't… but it feels kind of good when you make me eat like this."`,
    (s) => `${s.name} catches herself reaching for more without being asked, and decides not to stop.`,
    (s) => `${s.name}: "I thought about this all day. The food. Is that weird?" She doesn't wait for an answer.`,
    (s) => `${s.name} presses a hand to her belly — not in dismay. Checking. Appreciating.`,
  ],
  [ // tier 2 — broken in
    (s) => `${s.name}, grinning around a mouthful: "I'm such a greedy pig now… and I don't even want to stop."`,
    (s) => `${s.name} finishes the plate and slides it back toward you. "More." It isn't a question.`,
    (s) => `${s.name}: "Look what you did to me." She says it like a thank-you.`,
    (s) => `${s.name} pats the deep curve of her belly with open pride. "We can do better than this. Feed me."`,
  ],
];

// Lines for tier-3 autonomous self-stuffing (weekly tick).
export const CORRUPTION_AUTO_LINES = [
  (s) => `${s.name} didn't wait for you this week — the delivery receipts speak for themselves.`,
  (s) => `${s.name} stuffed herself on her own this week, and made sure you'd hear about it.`,
  (s) => `${s.name} texts you a photo of an emptied table. No caption. None needed.`,
];

// Threshold-crossing announcements (fire once per tier).
export const CORRUPTION_TIER_UP_LINES = [
  null,
  (s) => `Something has shifted in ${s.name}. The guilt is losing. She lingers after eating now, like she's waiting for permission to want more.`,
  (s) => `${s.name} has stopped pretending entirely. Whatever she was protecting before — modesty, restraint, the person she used to be — she's traded it for appetite. She's proud of the trade.`,
];
