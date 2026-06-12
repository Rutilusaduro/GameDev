// ═══════════════════════════════════════════════════════════════
// DESTINY STREAMING MINI-GAME — static config + pure helpers
// ═══════════════════════════════════════════════════════════════
import { CORRUPTION_CONFIG } from './corruption.js';
import { getStage } from './stages.js';

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
export const ZONE_MIN = 0.10;
export const SPEED_MAX = 1.55;
export const BAR_BASE_ZONE = 0.26;
/** Indicator cycles per second at base (~0.68 ≈ 1.5s full sweep). */
export const BAR_BASE_SPEED = 0.68;

export const STREAM_ROUND_SECONDS = 15;
export const STREAM_DEFAULT_ROUNDS = 4;

export const BRAND_IDS = Object.keys(BRANDS);

export function needsStreamBrand(student) {
  return student?.evolvedForm === 'eating_streamer' && !student?.brand;
}

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
    baseLbs: 7, staminaDrain: 11, speedDelta: -0.06, gainMult: 1.0, payoutMult: 1.0, roundCount: [5, 6], roundSeconds: 18 },
  { id: 'endurance_allnight', category: 'endurance', label: 'All-Night Grind', intensity: 'extreme',
    baseLbs: 10, staminaDrain: 14, speedDelta: -0.08, gainMult: 1.15, payoutMult: 1.35, roundCount: [6, 7], roundSeconds: 20 },
  { id: 'speed_sprint', category: 'speed', label: 'Speed Sprint', intensity: 'normal',
    baseLbs: 5, staminaDrain: 9, speedDelta: 0.12, gainMult: 0.95, payoutMult: 1.05, roundCount: [4, 5], roundSeconds: 12 },
  { id: 'speed_blitz', category: 'speed', label: 'Blitz Binge', intensity: 'high',
    baseLbs: 6, staminaDrain: 10, speedDelta: 0.18, gainMult: 1.0, payoutMult: 1.15, roundCount: [5, 6], roundSeconds: 13 },
  { id: 'sensual_slow', category: 'sensual', label: 'Slow Indulgence', intensity: 'normal',
    baseLbs: 6, staminaDrain: 8, speedDelta: -0.12, gainMult: 1.05, payoutMult: 1.1, roundCount: [5, 6], roundSeconds: 17 },
  { id: 'sensual_tease', category: 'sensual', label: 'Tease & Feast', intensity: 'high',
    baseLbs: 7, staminaDrain: 9, speedDelta: -0.06, gainMult: 1.1, payoutMult: 1.2, roundCount: [5, 7], roundSeconds: 16 },
  { id: 'chaotic_multitask', category: 'chaotic', label: 'Chaos Course', intensity: 'normal',
    baseLbs: 6, staminaDrain: 12, speedDelta: 0.10, gainMult: 1.0, payoutMult: 1.12, roundCount: [4, 5], roundSeconds: 14 },
  { id: 'chaotic_feral', category: 'chaotic', label: 'Feral Feed', intensity: 'extreme',
    baseLbs: 9, staminaDrain: 15, speedDelta: 0.14, gainMult: 1.12, payoutMult: 1.3, roundCount: [5, 6], roundSeconds: 15 },
  { id: 'greedy_pile', category: 'greedy', label: 'Greedy Pile-On', intensity: 'high',
    baseLbs: 9, staminaDrain: 13, speedDelta: 0.06, gainMult: 1.2, payoutMult: 1.18, roundCount: [5, 6], roundSeconds: 15 },
  { id: 'greedy_destroy', category: 'greedy', label: 'Table Destroyer', intensity: 'extreme',
    baseLbs: 11, staminaDrain: 16, speedDelta: 0.08, gainMult: 1.25, payoutMult: 1.4, roundCount: [6, 7], roundSeconds: 16 },
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
  const stagePenalty = Math.max(0, weightStageId - 5) * 0.008;
  const stageSpeed = Math.max(0, weightStageId - 5) * 0.035;
  // Lighter girls get a wider sweet spot and a noticeably slower indicator.
  const lowStageEase = weightStageId < 5 ? (5 - weightStageId) * 0.018 : 0;
  const lowStageSlow = weightStageId < 5 ? (5 - weightStageId) * 0.03 : 0;
  const addictionMod = addictionZoneMod(addiction, roundIndex, totalRounds);
  const zoneSize = Math.max(ZONE_MIN, BAR_BASE_ZONE - resistance * 0.08 - stagePenalty + addictionMod + lowStageEase);
  const speed = Math.max(
    0.28,
    Math.min(SPEED_MAX, BAR_BASE_SPEED + stageSpeed + (challenge?.speedDelta || 0) - lowStageSlow),
  );
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
  if (!challenge?.roundCount) return STREAM_DEFAULT_ROUNDS;
  const [min, max] = challenge.roundCount;
  if (min >= max) return min;
  return min + Math.floor(rng() * (max - min + 1));
}

/** Rolling performance over last 2–3 rounds for reactive dialogue. */
export function deriveRecentPerf(tierHistory = []) {
  if (!tierHistory.length) return 'unknown';
  const last = tierHistory.slice(-3);
  const avg = last.reduce((s, t) => s + TIER_ORDER.indexOf(t), 0) / last.length;
  if (avg >= 3.5) return 'hot';
  if (avg >= 2) return 'mixed';
  return 'cold';
}

export function getBrandPersona(brandId) {
  return BRANDS[brandId]?.persona || null;
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
  tapOutCause, overallTierOverride, spendEffects,
}) {
  const spend = spendEffects || {};
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
    ((6 + perfMult * 8) * match * (brand?.favorGainMult || 1) * tapOutPenalty)
    + (spend.favorBonus || 0),
  );

  const moneyGenerated = Math.round(
    (40 + (audience || 100) * 0.08)
    * perfMult
    * favorBonus
    * (brand?.payoutMult || 1)
    * (challenge?.payoutMult || 1)
    * tapOutPenalty
    * (spend.moneyMult || 1),
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
    destinyMoney: student.destinyMoney ?? 0,
    destinyPurchases: student.destinyPurchases ?? {},
    destinyPendingBuffs: student.destinyPendingBuffs ?? {},
    personaDrift: student.personaDrift ?? {},
    streamVoice: student.streamVoice ?? 'default',
  };
}

// ── Destiny spend shop ───────────────────────────────────────────

export const DESTINY_SPEND_ITEMS = [
  { id: 'delivery_stash', label: 'Delivery Stash', emoji: '📦', cost: 45,
    desc: 'Always-stocked pre-stream snacks. +4% session gain.',
    effect: { gainMult: 1.04 }, max: 1 },
  { id: 'mic_arm', label: 'Pro Mic Arm', emoji: '🎙️', cost: 80,
    desc: 'Crystal-clear audio. +6% audience growth.',
    effect: { audienceMult: 1.06 }, max: 1 },
  { id: 'rgb_rig', label: 'RGB Overload Rig', emoji: '🌈', cost: 120,
    desc: 'Flashy setup pulls eyes. +10% audience, +5% revenue.',
    effect: { audienceMult: 1.1, moneyMult: 1.05 }, max: 1 },
  { id: 'comfort_throne', label: 'Comfort Throne', emoji: '🪑', cost: 100,
    desc: 'Better stamina on long streams. +8% stamina retention.',
    effect: { staminaMult: 1.08 }, max: 1 },
  { id: 'brand_wardrobe', label: 'Brand Wardrobe Refresh', emoji: '👗', cost: 90,
    desc: 'Sharper sponsor fit. +12% favor per stream.', requiresBrand: true,
    effect: { favorBonus: 4 }, max: 1 },
  { id: 'sub_box', label: 'Mystery Sub Box', emoji: '🎁', cost: 65,
    desc: 'Sponsor surprise crate. +3 favor (stackable).',
    effect: { favorBonus: 3 }, max: 5, stackable: true },
  { id: 'chat_feast', label: 'Chat Food Delivery', emoji: '🍕', cost: 55,
    desc: 'Treat chat — +30 audience on next stream (consumes).',
    effect: { audienceBurst: 30 }, max: 8, stackable: true, consumable: true },
];

export function getDestinyShare(rewards) {
  return Math.max(0, (rewards.moneyGenerated || 0) - (rewards.playerShare || 0));
}

export function aggregateDestinySpendEffects(purchases = {}) {
  const fx = {
    audienceMult: 1, moneyMult: 1, favorBonus: 0, gainMult: 1,
    staminaMult: 1, audienceBurst: 0,
  };
  for (const [id, count] of Object.entries(purchases)) {
    if (!count) continue;
    const item = DESTINY_SPEND_ITEMS.find((i) => i.id === id);
    if (!item?.effect) continue;
    const stacks = item.stackable === false ? 1 : count;
    const e = item.effect;
    if (e.audienceMult) fx.audienceMult *= e.audienceMult ** stacks;
    if (e.moneyMult) fx.moneyMult *= e.moneyMult ** stacks;
    if (e.gainMult) fx.gainMult *= e.gainMult ** stacks;
    if (e.staminaMult) fx.staminaMult *= e.staminaMult ** stacks;
    if (e.favorBonus) fx.favorBonus += e.favorBonus * stacks;
    if (e.audienceBurst) fx.audienceBurst += e.audienceBurst * count;
  }
  return fx;
}

export function tryDestinyPurchase(student, itemId) {
  const item = DESTINY_SPEND_ITEMS.find((i) => i.id === itemId);
  if (!item) return { ok: false, student, reason: 'unknown' };
  if (item.requiresBrand && !student.brand) return { ok: false, student, reason: 'brand' };
  const bal = student.destinyMoney || 0;
  if (bal < item.cost) return { ok: false, student, reason: 'funds' };
  const count = student.destinyPurchases?.[itemId] || 0;
  if (item.max != null && count >= item.max) return { ok: false, student, reason: 'maxed' };
  const purchases = { ...(student.destinyPurchases || {}), [itemId]: count + 1 };
  let pending = { ...(student.destinyPendingBuffs || {}) };
  if (item.consumable && item.effect?.audienceBurst) {
    pending.audienceBurst = (pending.audienceBurst || 0) + item.effect.audienceBurst;
  }
  return {
    ok: true,
    student: {
      ...student,
      destinyMoney: bal - item.cost,
      destinyPurchases: purchases,
      destinyPendingBuffs: pending,
    },
    item,
  };
}

export function consumeDestinySpend(student, itemId, amount = 1) {
  const cur = student.destinyPurchases?.[itemId] || 0;
  if (cur < amount) return student;
  const purchases = { ...(student.destinyPurchases || {}) };
  const next = cur - amount;
  if (next <= 0) delete purchases[itemId];
  else purchases[itemId] = next;
  return { ...student, destinyPurchases: purchases };
}

export function applyPersonaDrift(student, brandId, favorGain = 0) {
  if (!brandId || student.evolvedForm !== 'eating_streamer') return student;
  const drift = { ...(student.personaDrift || {}) };
  const inc = 1 + Math.floor((favorGain || 0) / 5);
  drift[brandId] = Math.min(100, (drift[brandId] || 0) + inc);
  for (const b of BRAND_IDS) {
    if (b !== brandId && drift[b]) drift[b] = Math.max(0, Math.round(drift[b] - 1));
  }
  const next = { ...student, personaDrift: drift, brand: brandId };
  return { ...next, streamVoice: getStreamVoice(next) };
}

export function getStreamVoice(student) {
  if (student?.evolvedForm !== 'eating_streamer' || !student.brand) return 'default';
  const persona = BRANDS[student.brand]?.persona;
  if (!persona) return 'default';
  const streak = student.brandStreaks?.[student.brand] || 0;
  const drift = student.personaDrift?.[student.brand] || 0;
  const control = getBrandControlTier(streak);
  if (control === 'soldOut' || drift >= 55) return `${persona}_soldOut`;
  if (control === 'late' || drift >= 30) return `${persona}_deep`;
  if (drift >= 12) return persona;
  return 'default';
}

export function getStreamVoiceLabel(voice) {
  const map = {
    default: 'Still herself',
    aggressive: 'Getting feral',
    aggressive_deep: 'CrunchForge-coded',
    aggressive_soldOut: 'Fully sold out (feral)',
    manic: 'Hype mode',
    manic_deep: 'FizzPeak unhinged',
    manic_soldOut: 'Chaos mascot',
    sensual: 'Soft streamer voice',
    sensual_deep: 'VelvetMelt dreamy',
    sensual_soldOut: 'Object-of-desire mode',
    bratty: 'Bratty tease',
    bratty_deep: 'GlazeCo princess',
    bratty_soldOut: 'Spoiled brand pet',
  };
  return map[voice] || voice;
}

export function roundDurationFor(challenge) {
  return challenge?.roundSeconds ?? STREAM_ROUND_SECONDS;
}

// ── Brand loyalty / selling out ─────────────────────────────────

export const BRAND_CONTROL_TIERS = [
  { id: 'early', min: 0, label: 'Fresh Signing' },
  { id: 'mid', min: 3, label: 'On the Roster' },
  { id: 'late', min: 8, label: 'Brand Darling' },
  { id: 'soldOut', min: 15, label: 'Sold Out' },
];

export function getBrandControlTier(brandStreak = 0) {
  let tier = BRAND_CONTROL_TIERS[0].id;
  for (const t of BRAND_CONTROL_TIERS) {
    if (brandStreak >= t.min) tier = t.id;
  }
  return tier;
}

export function getBrandControlLabel(brandStreak = 0) {
  return BRAND_CONTROL_TIERS.find((t) => t.id === getBrandControlTier(brandStreak))?.label || 'Fresh Signing';
}

export const STAMINA_DRAIN_PER_SEC = 0.45;
export const STAMINA_DRAIN_CONTROL_MULT = { early: 1, mid: 1.05, late: 1.12, soldOut: 1.2 };

// ── Stream milestones (fire once) ───────────────────────────────

export const STREAM_MILESTONE_DEFS = [
  { key: 'first_stream', label: 'First Stream', emoji: '🎬' },
  { key: 'streams_5', label: 'Regular', emoji: '📺' },
  { key: 'streams_15', label: 'Veteran Streamer', emoji: '⭐' },
  { key: 'streams_30', label: 'Icon', emoji: '👑' },
  { key: 'audience_500', label: '500 Followers', emoji: '📈' },
  { key: 'audience_2500', label: '2.5K Followers', emoji: '🔥' },
  { key: 'audience_10000', label: '10K Followers', emoji: '💥' },
  { key: 'favor_max', label: 'Sponsor Favorite', emoji: '💎' },
  { key: 'brand_sold_out', label: 'Sold Out', emoji: '🏷️' },
];

export function getStreamMilestoneLabel(key) {
  const def = STREAM_MILESTONE_DEFS.find((m) => m.key === key);
  if (def) return def;
  const stageMatch = key.match(/^stage_(\d+)$/);
  if (stageMatch) {
    return { key, label: `Stage ${stageMatch[1]} On Stream`, emoji: '⚖️' };
  }
  return { key, label: key.replace(/_/g, ' '), emoji: '✨' };
}

export function detectNewStreamMilestones(before, after, brandId) {
  const fired = [];
  const bm = before.streamMilestones || {};
  const milestones = { ...bm };
  const add = (key) => {
    if (!bm[key] && !milestones[key]) {
      milestones[key] = true;
      fired.push(key);
    }
  };
  if ((after.totalStreams || 0) >= 1 && (before.totalStreams || 0) < 1) add('first_stream');
  if ((after.totalStreams || 0) >= 5 && (before.totalStreams || 0) < 5) add('streams_5');
  if ((after.totalStreams || 0) >= 15 && (before.totalStreams || 0) < 15) add('streams_15');
  if ((after.totalStreams || 0) >= 30 && (before.totalStreams || 0) < 30) add('streams_30');
  if ((after.audience || 0) >= 500 && (before.audience || 0) < 500) add('audience_500');
  if ((after.audience || 0) >= 2500 && (before.audience || 0) < 2500) add('audience_2500');
  if ((after.audience || 0) >= 10000 && (before.audience || 0) < 10000) add('audience_10000');
  if (brandId && (after.sponsorFavor?.[brandId] || 0) >= 100 && (before.sponsorFavor?.[brandId] || 0) < 100) add('favor_max');
  const streak = after.brandStreaks?.[brandId] || 0;
  if (brandId && streak >= 15 && (before.brandStreaks?.[brandId] || 0) < 15) add('brand_sold_out');
  const weightCross = before.lbs != null && after.lbs != null && getStage(after.lbs).id > getStage(before.lbs).id;
  if (weightCross) {
    const sid = getStage(after.lbs).id;
    add(`stage_${sid}`);
  }
  return { fired, milestones };
}

// ── Special stream outcomes ───────────────────────────────────────

export const SPECIAL_OUTCOME_DEFS = {
  perfect_stream: { label: 'Perfect Stream', emoji: '🌟', moneyMult: 1.35, audienceMult: 1.4 },
  viral_moment: { label: 'Viral Moment', emoji: '🚀', moneyMult: 1.25, audienceMult: 1.55 },
  brand_gift: { label: 'Brand Gift', emoji: '🎁', moneyMult: 1.2, audienceMult: 1.1, favorBonus: 12 },
  feast_god: { label: 'Feast God Run', emoji: '🍕', moneyMult: 1.15, audienceMult: 1.2 },
  comeback_queen: { label: 'Comeback Queen', emoji: '👑', moneyMult: 1.1, audienceMult: 1.25 },
  chat_legend: { label: 'Chat Legend', emoji: '💬', moneyMult: 1.1, audienceMult: 1.35 },
};

export function detectSpecialOutcomes(session, rewards, student) {
  const out = [];
  const th = session.tierHistory || [];
  if (!session.tapOutCause && th.length >= 3 && th.every((t) => t === 'excellent')) out.push('perfect_stream');
  if (!session.tapOutCause && rewards.overallTier === 'excellent' && session.challenge?.intensity === 'extreme') {
    out.push('viral_moment');
  }
  if (session.brand && (student.brandStreaks?.[session.brand] || 0) >= 4 && rewards.favorGain >= 8) {
    out.push('brand_gift');
  }
  if ((session.sessionGain || 0) >= 22) out.push('feast_god');
  if (session.trend === 'improving' && rewards.overallTier === 'good') out.push('comeback_queen');
  if ((student.audience || 0) >= 2500 && rewards.audienceGain >= 40) out.push('chat_legend');
  return [...new Set(out)];
}

export function applySpecialOutcomeBonuses(rewards, specialOutcomes = []) {
  if (!specialOutcomes.length) return rewards;
  let moneyMult = 1;
  let audienceMult = 1;
  let favorBonus = 0;
  for (const id of specialOutcomes) {
    const d = SPECIAL_OUTCOME_DEFS[id];
    if (!d) continue;
    moneyMult *= d.moneyMult || 1;
    audienceMult *= d.audienceMult || 1;
    favorBonus += d.favorBonus || 0;
  }
  return {
    ...rewards,
    audienceGain: Math.round(rewards.audienceGain * audienceMult),
    moneyGenerated: Math.round(rewards.moneyGenerated * moneyMult),
    playerShare: Math.round(rewards.moneyGenerated * moneyMult * 0.5),
    favorGain: rewards.favorGain + favorBonus,
    specialOutcomes,
  };
}

export function selectChallenges(brandId, count = 3, brandStreak = 0, rng = Math.random) {
  const pool = [...CHALLENGES];
  const brand = brandId ? BRANDS[brandId] : null;
  const control = getBrandControlTier(brandStreak);
  const weighted = pool.map((c) => {
    let w = 1;
    if (brand?.favStyles.includes(c.category)) w += 2;
    if (c.intensity === 'extreme' && brand) w += 0.5;
    if (control === 'mid' && brand?.favStyles.includes(c.category)) w += 0.75;
    if (control === 'late') {
      if (c.intensity === 'extreme') w += 2.5;
      if (brand?.favStyles.includes(c.category)) w += 1.25;
    }
    if (control === 'soldOut') {
      if (c.intensity === 'extreme') w += 4;
      if (brand?.favStyles.includes(c.category)) w += 2;
      if (c.intensity === 'normal') w *= 0.65;
    }
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
  if (control === 'soldOut' && brand && !picks.some((p) => p.intensity === 'extreme')) {
    const extreme = pool.find((c) => c.intensity === 'extreme' && brand.favStyles.includes(c.category))
      || pool.find((c) => c.intensity === 'extreme');
    if (extreme && !picks.find((p) => p.id === extreme.id)) {
      picks[picks.length - 1] = extreme;
    }
  }
  return picks;
}
