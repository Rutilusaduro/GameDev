// ═══════════════════════════════════════════════════════════════
// DESTINY STREAMING MINI-GAME — static config + pure helpers
// ═══════════════════════════════════════════════════════════════
import { CORRUPTION_CONFIG } from './corruption.js';

export const STREAM_AP_COST = 2;

export const BRANDS = {
  crunchforge: {
    id: 'crunchforge', name: 'CrunchForge', persona: 'aggressive',
    favStyles: ['greedy', 'chaotic'], payoutMult: 1.15, audienceMult: 1.0, favorGainMult: 1.1,
  },
  fizzpeak: {
    id: 'fizzpeak', name: 'FizzPeak', persona: 'manic',
    favStyles: ['speed', 'chaotic'], payoutMult: 1.05, audienceMult: 1.2, favorGainMult: 1.0,
  },
  velvetmelt: {
    id: 'velvetmelt', name: 'VelvetMelt', persona: 'sensual',
    favStyles: ['sensual', 'endurance'], payoutMult: 1.0, audienceMult: 1.1, favorGainMult: 1.15,
  },
  glazeco: {
    id: 'glazeco', name: 'GlazeCo', persona: 'bratty',
    favStyles: ['sensual', 'speed'], payoutMult: 1.1, audienceMult: 1.15, favorGainMult: 1.05,
  },
};

export const TIER_GAIN_MULT = {
  excellent: 1.3,
  good: 1.0,
  average: 0.7,
  poor: 0.4,
  verypoor: 0.15,
};

export const TIER_ORDER = ['verypoor', 'poor', 'average', 'good', 'excellent'];

export const TIER_PERF_MULT = {
  excellent: 1.4,
  good: 1.15,
  average: 1.0,
  poor: 0.75,
  verypoor: 0.5,
};

export const AUDIENCE_TIER_THRESHOLDS = [
  { id: 'early', min: 0 },
  { id: 'mid', min: 500 },
  { id: 'late', min: 2500 },
  { id: 'veryLate', min: 10000 },
];

export const FULLNESS_TAP_THRESHOLD = 1.15;
export const STAMINA_EXCELLENT_GAIN = 4;
export const MISS_STAMINA_PENALTY = 2;
export const STAMINA_DEPLETED_PENALTY = 0.35;
export const ZONE_MIN = 0.07;
export const SPEED_MAX = 3.8;
export const BAR_BASE_ZONE = 0.22;
export const BAR_BASE_SPEED = 1.15;

export const ROUND_DURATION = {
  endurance: 35,
  speed: 22,
  sensual: 28,
  chaotic: 25,
  greedy: 30,
};

export const PRE_STREAM_ACTIONS = [
  { id: 'outfit', label: 'Outfit Check', emoji: '👗' },
  { id: 'bodyCheck', label: 'Body Check', emoji: '🪞' },
  { id: 'snack', label: 'Light Snack', emoji: '🍿' },
  { id: 'warmup', label: 'Warm-up', emoji: '🔥' },
  { id: 'setup', label: 'Stream Setup', emoji: '📡' },
];

/** Per-action choice effects (capacityMult, gainMult, audienceMult, resistanceDelta). */
export const PRE_STREAM_EFFECTS = {
  outfit: {
    casual: { capacityMult: 1.0, gainMult: 1.0, audienceMult: 1.0, resistanceDelta: 0 },
    revealing: { capacityMult: 0.95, gainMult: 1.05, audienceMult: 1.15, resistanceDelta: 0.02 },
    branded: { capacityMult: 1.0, gainMult: 1.0, audienceMult: 1.12, resistanceDelta: 0 },
  },
  bodyCheck: {
    quick: { capacityMult: 1.0, gainMult: 1.0, audienceMult: 1.0, resistanceDelta: 0 },
    thorough: { capacityMult: 1.05, gainMult: 1.0, audienceMult: 1.08, resistanceDelta: -0.01 },
    showoff: { capacityMult: 0.98, gainMult: 1.08, audienceMult: 1.2, resistanceDelta: 0.03 },
  },
  snack: {
    skip: { capacityMult: 1.0, gainMult: 1.0, audienceMult: 1.0, resistanceDelta: 0 },
    light: { capacityMult: 1.03, gainMult: 1.02, audienceMult: 1.0, resistanceDelta: 0.01 },
    heavy: { capacityMult: 1.08, gainMult: 1.05, audienceMult: 1.05, resistanceDelta: 0.04 },
  },
  warmup: {
    skip: { capacityMult: 1.0, gainMult: 1.0, audienceMult: 1.0, resistanceDelta: 0 },
    stretch: { capacityMult: 1.06, gainMult: 1.0, audienceMult: 1.0, resistanceDelta: -0.02 },
    eat: { capacityMult: 1.04, gainMult: 1.06, audienceMult: 1.05, resistanceDelta: 0.02 },
  },
  setup: {
    minimal: { capacityMult: 0.88, gainMult: 0.9, audienceMult: 1.0, resistanceDelta: 0 },
    comfort: { capacityMult: 1.12, gainMult: 1.08, audienceMult: 1.0, resistanceDelta: -0.01 },
    production: { capacityMult: 1.0, gainMult: 1.0, audienceMult: 1.18, resistanceDelta: 0.01 },
  },
};

export const PRE_STREAM_CHOICES = {
  outfit: [
    { id: 'casual', label: 'Casual / Default' },
    { id: 'revealing', label: 'Revealing / Bold' },
    { id: 'branded', label: 'Brand Outfit' },
  ],
  bodyCheck: [
    { id: 'quick', label: 'Quick Glance' },
    { id: 'thorough', label: 'Thorough Check' },
    { id: 'showoff', label: 'Show Off for Chat' },
  ],
  snack: [
    { id: 'skip', label: 'Skip the Snack' },
    { id: 'light', label: 'Light Snack' },
    { id: 'heavy', label: 'Heavy Pre-Snack' },
  ],
  warmup: [
    { id: 'skip', label: 'Skip Warm-up' },
    { id: 'stretch', label: 'Stretch & Position' },
    { id: 'eat', label: 'Warm-up Bites' },
  ],
  setup: [
    { id: 'minimal', label: 'Quick & Minimal' },
    { id: 'comfort', label: 'Comfort-Focused' },
    { id: 'production', label: 'Full Production' },
  ],
};

export const CHALLENGES = [
  { id: 'endurance_marathon', category: 'endurance', label: 'Marathon Munch', intensity: 'normal',
    baseLbs: 7, staminaDrain: 11, speedDelta: -0.1, gainMult: 1.0, payoutMult: 1.0, roundCount: [6, 8] },
  { id: 'endurance_allnight', category: 'endurance', label: 'All-Night Grind', intensity: 'extreme',
    baseLbs: 10, staminaDrain: 14, speedDelta: -0.15, gainMult: 1.15, payoutMult: 1.35, roundCount: [7, 8] },
  { id: 'speed_sprint', category: 'speed', label: 'Speed Sprint', intensity: 'normal',
    baseLbs: 5, staminaDrain: 9, speedDelta: 0.35, gainMult: 0.95, payoutMult: 1.05, roundCount: [5, 6] },
  { id: 'speed_blitz', category: 'speed', label: 'Blitz Binge', intensity: 'high',
    baseLbs: 6, staminaDrain: 10, speedDelta: 0.5, gainMult: 1.0, payoutMult: 1.15, roundCount: [5, 7] },
  { id: 'sensual_slow', category: 'sensual', label: 'Slow Indulgence', intensity: 'normal',
    baseLbs: 6, staminaDrain: 8, speedDelta: -0.2, gainMult: 1.05, payoutMult: 1.1, roundCount: [5, 7] },
  { id: 'sensual_tease', category: 'sensual', label: 'Tease & Feast', intensity: 'high',
    baseLbs: 7, staminaDrain: 9, speedDelta: -0.1, gainMult: 1.1, payoutMult: 1.2, roundCount: [6, 7] },
  { id: 'chaotic_multitask', category: 'chaotic', label: 'Chaos Course', intensity: 'normal',
    baseLbs: 6, staminaDrain: 12, speedDelta: 0.25, gainMult: 1.0, payoutMult: 1.12, roundCount: [5, 6] },
  { id: 'chaotic_feral', category: 'chaotic', label: 'Feral Feed', intensity: 'extreme',
    baseLbs: 9, staminaDrain: 15, speedDelta: 0.3, gainMult: 1.12, payoutMult: 1.3, roundCount: [6, 7] },
  { id: 'greedy_pile', category: 'greedy', label: 'Greedy Pile-On', intensity: 'high',
    baseLbs: 9, staminaDrain: 13, speedDelta: 0.1, gainMult: 1.2, payoutMult: 1.18, roundCount: [6, 8] },
  { id: 'greedy_destroy', category: 'greedy', label: 'Table Destroyer', intensity: 'extreme',
    baseLbs: 11, staminaDrain: 16, speedDelta: 0.15, gainMult: 1.25, payoutMult: 1.4, roundCount: [7, 8] },
];

export const DESTINY_MONEY_FLAVOR = [
  'Destiny blows her share on delivery apps and a new mic arm.',
  'Destiny spends her cut on snacks she "needed for research."',
  'Destiny orders a ridiculous RGB setup upgrade she definitely did not need.',
  'Destiny vanishes her share into a mystery subscription box habit.',
  'Destiny treats chat to a spontaneous food delivery "for the vibes."',
];

export function audienceTier(audience = 0) {
  let tier = AUDIENCE_TIER_THRESHOLDS[0].id;
  for (const t of AUDIENCE_TIER_THRESHOLDS) {
    if (audience >= t.min) tier = t.id;
  }
  return tier;
}

export function scoreTier(hitRate) {
  if (hitRate >= 0.85) return 'excellent';
  if (hitRate >= 0.70) return 'good';
  if (hitRate >= 0.55) return 'average';
  if (hitRate >= 0.40) return 'poor';
  return 'verypoor';
}

export function computeRoundScore(hits, misses, centerQualities = []) {
  const total = hits + misses;
  if (total === 0) return { hitRate: 0, timingQuality: 0, roundScore: 0, tier: 'verypoor' };
  const hitRate = hits / total;
  const timingQuality = centerQualities.length
    ? centerQualities.reduce((a, b) => a + b, 0) / centerQualities.length
    : hitRate;
  const roundScore = 0.7 * hitRate + 0.3 * timingQuality;
  return { hitRate, timingQuality, roundScore, tier: scoreTier(hitRate) };
}

export function stageGainMult(weightStageId) {
  return 1 + Math.max(0, weightStageId - 5) * 0.06;
}

export function stageStaminaTax(weightStageId) {
  return Math.max(0, weightStageId - 5) * 0.8;
}

export function deriveResistance(student, resistanceDelta = 0) {
  const corruption = student.corruption || 0;
  const weightStageId = student._weightStageId ?? 5;
  const fromCorruption = corruption * CORRUPTION_CONFIG.resistancePerPoint;
  const fromStage = Math.max(0, weightStageId - 5) * 0.02;
  return Math.min(0.45, Math.max(0, fromCorruption + fromStage + resistanceDelta));
}

export function addictionZoneMod(addiction, roundIndex, totalRounds) {
  if (!addiction) return 0;
  const progress = totalRounds <= 1 ? 1 : roundIndex / (totalRounds - 1);
  if (addiction === 1) {
    return progress < 0.5 ? 0.025 : -0.015;
  }
  if (addiction === 2) {
    if (progress < 0.45) return 0.04;
    if (progress < 0.7) return 0;
    return -0.035;
  }
  return 0;
}

export function addictionDrainMod(addiction, roundIndex, totalRounds) {
  if (addiction !== 2) return 1;
  const progress = totalRounds <= 1 ? 1 : roundIndex / (totalRounds - 1);
  return progress >= 0.65 ? 1.35 : 1;
}

export function deriveBarParams({ weightStageId, addiction, resistance, roundIndex, totalRounds, challenge }) {
  const stagePenalty = Math.max(0, weightStageId - 5) * 0.012;
  const stageSpeed = Math.max(0, weightStageId - 5) * 0.07;
  const addictionMod = addictionZoneMod(addiction, roundIndex, totalRounds);
  const zoneSize = Math.max(ZONE_MIN, BAR_BASE_ZONE - resistance * 0.12 - stagePenalty + addictionMod);
  const speed = Math.min(SPEED_MAX, BAR_BASE_SPEED + stageSpeed + (challenge?.speedDelta || 0));
  return { speed, zoneSize, recoverRate: 1 };
}

export function staminaPenaltyFor(stamina) {
  if (stamina <= 0) return STAMINA_DEPLETED_PENALTY;
  if (stamina < 15) return 0.55;
  if (stamina < 35) return 0.75;
  return 1;
}

export function computeRoundLbs({
  challenge, tier, capacityMult, gainMult, weightStageId, stamina, staminaPenalty,
}) {
  const mult = TIER_GAIN_MULT[tier] || 0.5;
  const lbs = (challenge?.baseLbs || 5)
    * mult
    * (capacityMult || 1)
    * (gainMult || 1)
    * (challenge?.gainMult || 1)
    * stageGainMult(weightStageId)
    * (staminaPenalty ?? staminaPenaltyFor(stamina));
  return Math.max(0, Math.round(lbs * 10) / 10);
}

export function aggregateOverallTier(tierHistory = []) {
  if (!tierHistory.length) return 'average';
  const scores = tierHistory.map((t) => TIER_ORDER.indexOf(t));
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const idx = Math.round(avg);
  return TIER_ORDER[Math.min(TIER_ORDER.length - 1, Math.max(0, idx))];
}

export function deriveTrend(tierHistory = []) {
  if (tierHistory.length < 2) return 'steady';
  const last = TIER_ORDER.indexOf(tierHistory[tierHistory.length - 1]);
  const prev = TIER_ORDER.indexOf(tierHistory[tierHistory.length - 2]);
  if (last > prev) return 'improving';
  if (last < prev) return 'declining';
  return 'steady';
}

export function styleMatch(challenge, brand) {
  if (!brand || !challenge) return 0.5;
  const b = BRANDS[brand];
  if (!b) return 0.5;
  return b.favStyles.includes(challenge.category) ? 1 : 0.35;
}

export function pickRoundCount(challenge, rng = Math.random) {
  const [lo, hi] = challenge.roundCount || [5, 7];
  return lo + Math.floor(rng() * (hi - lo + 1));
}

export function selectChallenges(brandId, count = 3, rng = Math.random) {
  const pool = [...CHALLENGES];
  const brand = brandId ? BRANDS[brandId] : null;
  const weighted = pool.map((c) => {
    let w = 1;
    if (brand?.favStyles.includes(c.category)) w += 2;
    if (c.intensity === 'extreme' && brand) w += 0.5;
    return { c, w };
  });
  const picks = [];
  const avail = [...weighted];
  while (picks.length < count && avail.length) {
    const total = avail.reduce((s, x) => s + x.w, 0);
    let roll = rng() * total;
    for (let i = 0; i < avail.length; i++) {
      roll -= avail[i].w;
      if (roll <= 0) {
        picks.push(avail[i].c);
        avail.splice(i, 1);
        break;
      }
    }
  }
  return picks;
}

export function mergePreStreamMultipliers(choices = {}) {
  let capacityMult = 1;
  let gainMult = 1;
  let audienceMult = 1;
  let resistanceDelta = 0;
  for (const [actionId, choiceId] of Object.entries(choices)) {
    const fx = PRE_STREAM_EFFECTS[actionId]?.[choiceId];
    if (!fx) continue;
    capacityMult *= fx.capacityMult;
    gainMult *= fx.gainMult;
    audienceMult *= fx.audienceMult;
    resistanceDelta += fx.resistanceDelta;
  }
  return { capacityMult, gainMult, audienceMult, resistanceDelta };
}

export function computeRewards({
  sessionGain, tierHistory, challenge, brandId, audience, sponsorFavor = {},
  tapOutCause, overallTierOverride,
}) {
  const overallTier = overallTierOverride || aggregateOverallTier(tierHistory);
  const perfMult = TIER_PERF_MULT[overallTier] || 1;
  const brand = brandId ? BRANDS[brandId] : null;
  const tapOutPenalty = tapOutCause ? 0.55 : 1;
  const match = styleMatch(challenge, brandId);
  const favorKey = brandId || 'none';
  const currentFavor = sponsorFavor[favorKey] || 0;
  const favorBonus = 1 + currentFavor / 200;

  const audienceGain = Math.round(
    (8 + (audience || 100) * 0.012)
    * perfMult
    * (challenge?.intensity === 'extreme' ? 1.4 : challenge?.intensity === 'high' ? 1.15 : 1)
    * (brand?.audienceMult || 1)
    * tapOutPenalty,
  );

  const favorGain = Math.round(
    (6 + perfMult * 8) * match * (brand?.favorGainMult || 1) * tapOutPenalty,
  );

  const moneyGenerated = Math.round(
    (40 + (audience || 100) * 0.08)
    * perfMult
    * favorBonus
    * (brand?.payoutMult || 1)
    * (challenge?.payoutMult || 1)
    * tapOutPenalty,
  );

  const playerShare = Math.round(moneyGenerated * 0.5);
  const corruptionGain = tapOutCause === 'fullness' ? 2
    : challenge?.intensity === 'extreme' ? 2
    : overallTier === 'excellent' ? 1
    : 0;

  return {
    overallTier,
    weightGain: sessionGain,
    audienceGain,
    favorGain,
    moneyGenerated,
    playerShare,
    corruptionGain,
    tapOutPenalty,
  };
}

export function checkTapOutConditions({
  stamina, tierHistory, resistance, addiction, fullness, stomachCapacity,
}) {
  if (stamina <= 0) return 'stamina';
  const cap = stomachCapacity || 100;
  if (fullness > cap * FULLNESS_TAP_THRESHOLD) return 'fullness';
  if (tierHistory.length >= 3) {
    const last3 = tierHistory.slice(-3);
    if (last3.every((t) => t === 'verypoor') && (resistance >= 0.15 || addiction >= 1)) {
      return 'performance';
    }
  }
  return null;
}

export function ensureStreamFields(student) {
  return {
    ...student,
    brand: student.brand ?? null,
    brandStreaks: student.brandStreaks ?? {},
    sponsorFavor: student.sponsorFavor ?? {},
    audience: student.audience ?? 120,
    totalStreams: student.totalStreams ?? 0,
    streamMilestones: student.streamMilestones ?? {},
  };
}

export function roundDurationFor(challenge) {
  return ROUND_DURATION[challenge?.category] || 28;
}
