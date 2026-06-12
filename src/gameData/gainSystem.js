// ═══════════════════════════════════════════════════════════════
// STOMACH & GAINING SYSTEM
// Calorie/stomach simulation model. Most general feeding actions add
// CALORIES + FULLNESS rather than direct weight; weight is gained at
// the end of each week through digestion. Evolved activities and
// mini-games keep their direct-lbs payoffs (narrative set-pieces).
//
// Per-student stats:
//   stomachCapacity      shown   max comfortable fullness units
//   fullness             shown   current fullness units (resets weekly)
//   consumedCalories     hidden  professor-fed surplus calories this week
//   capacityChunkProgress hidden lbs gained toward next +15 capacity chunk
//   stuffedStreak        hidden  consecutive weeks ended above 100% capacity
// ═══════════════════════════════════════════════════════════════

export const GAIN_CONFIG = {
  calsPerLb: 3500,          // base conversion: 3,500 calories = 1 lb
  baseCapacity: 100,        // starting stomach capacity (fullness units)
  capacityPerChunk: 15,     // +15 capacity per 50 lbs gained
  chunkLbs: 50,
  stageUpCapacity: 30,      // stage-up grants +30 instead and resets chunk progress
  stuffedBonusCap: 5,       // permanent capacity for ending the week stuffed
  stuffedBaseChance: 0.5,   // 50% base, +10% per consecutive stuffed week
  stuffedChancePerStreak: 0.1,
  forceFeed: { base: 0.45, perSpiritLevel: 0.04, overPenalty: 0.5, min: 0.05, max: 0.95 },
  // weekly maintenance burn (informational — her own eating covers it; the
  // professor's calories are pure surplus)
  burnPerDayBase: 2000,
  burnPerDayMax: 3500,
  burnPerLb: 4, // extra daily burn per lb above 130
};

// Initial gain stats for a student. Heavier starters hold a little more.
export const initGainStats = (s) => ({
  stomachCapacity: GAIN_CONFIG.baseCapacity + Math.max(0, Math.floor((s.lbs - 110) / 25) * 5),
  fullness: 0,
  consumedCalories: 0,
  capacityChunkProgress: 0,
  stuffedStreak: 0,
});

export const getWeeklyBurn = (lbs) =>
  7 * Math.min(GAIN_CONFIG.burnPerDayMax,
    Math.max(GAIN_CONFIG.burnPerDayBase, Math.round(GAIN_CONFIG.burnPerDayBase + (lbs - 130) * GAIN_CONFIG.burnPerLb)));

export const calsToLbs = (cals) => cals / GAIN_CONFIG.calsPerLb;

// Chance a force-feed past capacity succeeds. Spirit influence helps;
// how far past capacity she already is, and how big the food is, hurt.
export const forceFeedChance = (s, fullnessCost, spiritLevel = 1) => {
  const cap = s.stomachCapacity || GAIN_CONFIG.baseCapacity;
  const overFraction = Math.max(0, ((s.fullness || 0) - cap) / cap);
  const sizeFraction = fullnessCost / cap;
  const c = GAIN_CONFIG.forceFeed;
  const chance = c.base + (spiritLevel - 1) * c.perSpiritLevel - overFraction * c.overPenalty - sizeFraction * 0.3;
  return Math.min(c.max, Math.max(c.min, chance));
};

// Refusal lines when a force-feed fails.
export const REFUSAL_LINES = [
  (s) => `${s.name} presses a hand flat against her stomach and shakes her head. "I can't. I physically can't." She means it — this time.`,
  (s) => `${s.name} leans back, breathing carefully around the fullness. "Give me a minute. Or a week." She is not taking another bite.`,
  (s) => `${s.name} looks at the food, looks at you, and laughs — a short, breathless sound. "You're joking. Look at me. There's no room."`,
  (s) => `${s.name} groans softly and pushes the plate a deliberate inch away. "I'm at my limit. A real one. The kind with consequences."`,
];

// Lines when a force-feed past capacity succeeds.
export const FORCE_SUCCESS_LINES = [
  (s) => `${s.name} hesitates — visibly, genuinely — and then opens her mouth anyway. Past full. Past sense. She finishes it with her eyes closed.`,
  (s) => `${s.name} whimpers, "I shouldn't," and keeps eating. The fullness has stopped being a wall and become a place she lives.`,
  (s) => `${s.name} takes it down slowly, one careful swallow at a time, both hands braced on the table. When it's gone she just breathes.`,
];

// End-of-week digestion for one student. Pure: returns the result and
// the updated stat fields; the caller applies weight via its own pipeline
// so stage-up reactions/narratives still fire.
export const digestStudent = (s, rng = Math.random) => {
  const cap = s.stomachCapacity || GAIN_CONFIG.baseCapacity;
  const surplus = s.consumedCalories || 0;
  const metabolicMult = 1 + (s.metabolicSlowdown || 0);
  const digestMult = s.weeklyDigestMult ?? 1;
  const lbsGained = surplus > 0 ? Math.max(0, Math.round(calsToLbs(surplus) * metabolicMult * digestMult)) : 0;
  // stuffed check happens against the fullness she's carrying into the night
  const stuffed = (s.fullness || 0) > cap;
  let stuffedStreak = stuffed ? (s.stuffedStreak || 0) + 1 : 0;
  let capacityGained = 0;
  if (stuffed) {
    const chance = Math.min(1, GAIN_CONFIG.stuffedBaseChance + GAIN_CONFIG.stuffedChancePerStreak * (stuffedStreak - 1));
    if (rng() < chance) capacityGained += GAIN_CONFIG.stuffedBonusCap;
  }
  return {
    lbsGained,
    stuffed,
    capacityGained,
    stuffedStreak,
    reset: { fullness: 0, consumedCalories: 0 },
  };
};

// Capacity growth from this week's confirmed weight gain.
// Stage-up: +30 and the 50-lb chunk progress resets.
// Otherwise: +15 per full 50 lbs of accumulated gain.
export const applyCapacityGrowth = (s, lbsGained, stagedUp) => {
  let capacity = s.stomachCapacity || GAIN_CONFIG.baseCapacity;
  let progress = (s.capacityChunkProgress || 0) + lbsGained;
  if (stagedUp) {
    capacity += GAIN_CONFIG.stageUpCapacity;
    progress = 0;
  } else {
    while (progress >= GAIN_CONFIG.chunkLbs) {
      capacity += GAIN_CONFIG.capacityPerChunk;
      progress -= GAIN_CONFIG.chunkLbs;
    }
  }
  return { stomachCapacity: capacity, capacityChunkProgress: progress };
};
