// ═══════════════════════════════════════════════════════════════
// PHARMACIST CULT — circle supply, distribution, area fattening
// Stage 3+ (excludes ascension endgame)
// ═══════════════════════════════════════════════════════════════
export const CULT_DISTRIBUTION_ROUTES = [
  {
    id: 'circle_pickup',
    label: 'Circle pickup at the lab',
    desc: 'Devoted users collect doses in person. Low exposure, steady growth.',
    apCost: 1,
    exposure: 3,
    circleGrowth: [1, 2],
    supplyGain: [2, 4],
    devotionGain: [4, 8],
    classGain: [0, 0],
    addictedGain: [1, 2],
    flavor: () => `They arrive in twos and threes — heavier, softer, grateful. Sophia labels tubs with wellness stickers and pretends not to notice how they lean on each other leaving.`,
  },
  {
    id: 'dorm_captains',
    label: 'Route through dorm captains',
    desc: 'Wider campus push via trusted intermediaries. Your class feels it first.',
    apCost: 1,
    exposure: 7,
    circleGrowth: [0, 1],
    supplyGain: [3, 5],
    devotionGain: [6, 10],
    classGain: [1, 3],
    addictedGain: [0, 1],
    flavor: () => `Sophia meets three girls who "just love the product" in a stairwell. They leave with crates. By evening, half your section looks well-fed and vague about why.`,
  },
  {
    id: 'union_bulk',
    label: 'Bulk drop at the student union',
    desc: 'High visibility, high yield. Random students start sampling.',
    apCost: 2,
    exposure: 12,
    scrutiny: 2,
    circleGrowth: [1, 3],
    supplyGain: [4, 7],
    devotionGain: [8, 14],
    classGain: [2, 5],
    addictedGain: [1, 3],
    flavor: () => `A rolling cart. Unmarked tubs. A sign: WELLNESS SAMPLES. Twenty minutes later it's gone and the union smells like vanilla and compliance.`,
  },
  {
    id: 'loyalty_tithe',
    label: 'Loyalty tithe from inner circle',
    desc: 'No new outreach — existing devotees bring offerings. Safest route.',
    apCost: 1,
    exposure: 2,
    circleGrowth: [0, 0],
    supplyGain: [5, 8],
    devotionGain: [10, 16],
    classGain: [0, 1],
    addictedGain: [2, 4],
    flavor: () => `They bring cash, chemicals, Tupperwares of dinner they couldn't finish. Sophia accepts all of it and writes thank-you notes she doesn't mean.`,
  },
];

export function defaultCultState() {
  return {
    circleSize: 0,
    devotion: 0,
    distributionsRun: 0,
    supplyReservoir: 0,
    bulkProductionUnlocked: false,
  };
}

export function initCultOnUnlock(prevCult) {
  return {
    ...defaultCultState(),
    ...prevCult,
    circleSize: Math.max(prevCult?.circleSize ?? 0, 4),
    devotion: Math.max(prevCult?.devotion ?? 0, 15),
  };
}

export function applyCultDistribution(state, routeId, rndFn) {
  const route = CULT_DISTRIBUTION_ROUTES.find(r => r.id === routeId);
  if (!route || !state?.cultActive) return { state, outcome: null };
  const cult = { ...(state.cult || defaultCultState()) };
  const roll = (range) => {
    const [lo, hi] = range;
    return rndFn(lo, hi);
  };
  const outcome = {
    routeId,
    circleDelta: roll(route.circleGrowth),
    supplyDelta: roll(route.supplyGain),
    devotionDelta: roll(route.devotionGain),
    classGainRange: route.classGain,
    addictedGainRange: route.addictedGain,
    exposure: route.exposure,
    scrutiny: route.scrutiny || 0,
    flavor: route.flavor(),
  };
  cult.circleSize = Math.min(40, cult.circleSize + outcome.circleDelta);
  cult.devotion = Math.min(100, cult.devotion + outcome.devotionDelta);
  cult.supplyReservoir = cult.supplyReservoir + outcome.supplyDelta;
  cult.distributionsRun = (cult.distributionsRun || 0) + 1;
  if (cult.distributionsRun >= 5) cult.bulkProductionUnlocked = true;
  let next = {
    ...state,
    cult,
    exposureRisk: Math.min(100, (state.exposureRisk ?? 0) + outcome.exposure),
  };
  return { state: next, outcome };
}

/** Weekly passive: cult circle fattens addicted students & expands supply. */
export function tickCultWeek(state, students, rndFn) {
  if (!state?.cultActive) return state;
  const cult = { ...(state.cult || defaultCultState()) };
  if (cult.circleSize < 4 && cult.distributionsRun > 0) {
    cult.circleSize = Math.max(cult.circleSize, 4);
  }
  if (cult.devotion >= 60 && rndFn(0, 100) < 25) {
    cult.circleSize = Math.min(40, cult.circleSize + 1);
  }
  if (cult.supplyReservoir > 0 && rndFn(0, 100) < 35) {
    cult.supplyReservoir = Math.max(0, cult.supplyReservoir - 1);
  }
  const addictedCount = students.filter(s => !s.hidden && (s.addictionLevel ?? 0) >= 1).length;
  const areaBonus = Math.floor(cult.circleSize / 8);
  return {
    ...state,
    cult,
    _cultWeekly: {
      areaBonus,
      addictedCount,
      passiveAddictedGain: addictedCount > 0 ? rndFn(0, 1 + areaBonus) : 0,
    },
  };
}

/** Merge cult supply reservoir into ingredient pool at synthesis start. */
export function cultSupplyToIngredients(state) {
  const cult = state?.cult;
  if (!cult?.supplyReservoir) return {};
  const n = cult.supplyReservoir;
  return {
    supply: Math.ceil(n * 0.4),
    extracts: Math.ceil(n * 0.3),
    reagents: Math.ceil(n * 0.3),
  };
}

export function consumeCultSupplyReservoir(state, amount) {
  const cult = state?.cult;
  if (!cult) return state;
  return {
    ...state,
    cult: {
      ...cult,
      supplyReservoir: Math.max(0, cult.supplyReservoir - amount),
    },
  };
}

export function applyBulkProductionDiscount(recipe, state) {
  if (!state?.cult?.bulkProductionUnlocked) return recipe;
  const out = {};
  for (const [k, v] of Object.entries(recipe)) {
    out[k] = Math.max(1, v - (v >= 3 ? 1 : 0));
  }
  return out;
}

export function pickInterruptCompound(stockedIds, student) {
  if (!stockedIds?.length) return null;
  const addiction = student?.addictionLevel ?? 0;
  const hunger = student?.hungerTier ?? 0;
  if (addiction >= 3 && stockedIds.includes('addiction_cure')) return 'addiction_cure';
  if (addiction >= 2 && hunger >= 3 && stockedIds.includes('dependency_maintenance')) {
    return 'dependency_maintenance';
  }
  const growth = stockedIds.filter(id => !['addiction_cure', 'dependency_maintenance'].includes(id));
  return growth[0] || stockedIds[0];
}

export function cultLoyaltyRelBonus(state, compoundId) {
  if (!state?.cultActive || compoundId !== 'loyalty_enhancer') return 0;
  const devotion = state.cult?.devotion ?? 0;
  return Math.floor(devotion / 15);
}
