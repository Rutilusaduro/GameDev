// ═══════════════════════════════════════════════════════════════
// C2 — upgradeable campus institutions (venues as event generators)
// ═══════════════════════════════════════════════════════════════

export const INSTITUTION_TIER_MAX = 3;

/** Purchasable venues + secret Gainers' Society (discovered, not bought at T1). */
export const CAMPUS_INSTITUTIONS = [
  {
    id: 'dining',
    label: 'Dining hall',
    glyph: '🍽',
    nodeId: 'dining_hall',
    locale: 'institution_dining',
    purchasable: true,
    tiers: [
      { label: 'Bigger portions menu', cost: 180, apCost: 2, desc: 'Meal estimates drop ~8%. Campus eating scenes lean cafeteria-forward.' },
      { label: 'Reinforced booths', cost: 420, apCost: 2, desc: 'Stage-8+ group dinners unlock. Booth-fit beats read one band heavier.' },
      { label: 'Standing buffet contract', cost: 780, apCost: 3, desc: 'Weekly all-cast buffet interrupt. Dining locale scenes fire more often.' },
    ],
  },
  {
    id: 'gym',
    label: 'Recreation center',
    glyph: '🏋️',
    nodeId: 'gym',
    locale: 'institution_gym',
    purchasable: true,
    tiers: [
      { label: 'Sturdier equipment', cost: 150, apCost: 2, desc: 'Gym locale unlocks for movement prose. Interrupt family: pride-at-any-size.' },
      { label: 'Strength at any size', cost: 380, apCost: 2, desc: 'Serena/Brittany-adjacent gym beats. Movement register turns proud.' },
      { label: 'Exhibition hall', cost: 720, apCost: 3, desc: 'Festival exhibition anchor (C3). Gym interrupts escalate.' },
    ],
  },
  {
    id: 'clinic',
    label: "Pharmacist's clinic",
    glyph: '🏥',
    nodeId: 'health_center',
    locale: 'institution_clinic',
    purchasable: true,
    tiers: [
      { label: 'Consultation wing', cost: 200, apCost: 2, desc: 'Aligns with Pharmacist stage 1 — compound surface grows.' },
      { label: 'Compounding lab', cost: 450, apCost: 2, desc: 'Stage-2 drug breadth. Clinic interrupts reference prescriptions.' },
      { label: 'Research wing', cost: 820, apCost: 3, desc: 'Feeds Researcher branch (C4). Campus-wide supplement culture.' },
    ],
  },
  {
    id: 'tailor',
    label: 'The tailor',
    glyph: '🧵',
    nodeId: 'arts_wing',
    locale: 'institution_tailor',
    purchasable: true,
    tiers: [
      { label: 'Rush alterations', cost: 160, apCost: 2, desc: 'Same-week wardrobe failure repairs. Strain scheduling opens.' },
      { label: 'Made-to-measure', cost: 400, apCost: 2, desc: 'Custom garments as gifts with chosen fitLbs.' },
      { label: 'The atelier', cost: 750, apCost: 3, desc: 'Size-up trips become ceremony scenes.' },
    ],
  },
  {
    id: 'gainers_society',
    label: "Gainers' Society",
    glyph: '🕯️',
    nodeId: 'student_union',
    locale: 'institution_society',
    purchasable: false,
    discover: { saturationTierMin: 2 },
    tiers: [
      { label: 'Invitation chain', cost: 0, apCost: 2, desc: 'Secret discovered — first records whisper. Rivalry fuel (C1).' },
      { label: 'Records nights', cost: 350, apCost: 2, desc: 'Monthly leaderboards. Joint rival scenes get hotter.' },
      { label: 'The charter', cost: 680, apCost: 3, desc: 'Society goes public — campus reaction ecology shifts.' },
    ],
  },
];

export function defaultCampusInstitutionState() {
  return {
    tiers: {},
    discovered: {},
    inauguratedWeek: {},
    lastInterruptWeek: {},
  };
}

export function institutionById(id) {
  return CAMPUS_INSTITUTIONS.find((i) => i.id === id) || null;
}

export function getInstitutionTier(state, institutionId) {
  return state?.tiers?.[institutionId] ?? 0;
}

export function isInstitutionDiscovered(state, institutionId, ctx = {}) {
  const inst = institutionById(institutionId);
  if (!inst) return false;
  if (inst.purchasable !== false) return true;
  if (state?.discovered?.[institutionId]) return true;
  const min = inst.discover?.saturationTierMin ?? 99;
  return (ctx.saturationTier ?? 0) >= min;
}

export function institutionAtNode(nodeId, state, ctx = {}) {
  return CAMPUS_INSTITUTIONS.filter((inst) => {
    if (inst.nodeId !== nodeId) return false;
    if (inst.purchasable === false) return isInstitutionDiscovered(state, inst.id, ctx);
    return true;
  });
}

export function nextTierOffer(state, institutionId, ctx = {}) {
  const inst = institutionById(institutionId);
  if (!inst) return null;
  if (!isInstitutionDiscovered(state, institutionId, ctx)) return null;
  const cur = getInstitutionTier(state, institutionId);
  if (cur >= INSTITUTION_TIER_MAX) return null;
  return { tierIndex: cur, ...inst.tiers[cur], institution: inst };
}

export function canInaugurateTier(state, institutionId, { money = 0, ap = 0 }, ctx = {}) {
  const offer = nextTierOffer(state, institutionId, ctx);
  if (!offer) return { ok: false, reason: 'No further upgrades.' };
  if (money < (offer.cost || 0)) return { ok: false, reason: 'Insufficient funds.', offer };
  if (ap < (offer.apCost || 0)) return { ok: false, reason: 'Need a time slot (AP).', offer };
  return { ok: true, offer };
}

export function applyInaugurateTier(state, institutionId, week, ctx = {}) {
  const offer = nextTierOffer(state, institutionId, ctx);
  if (!offer) return state;
  const nextTier = offer.tierIndex + 1;
  return {
    ...state,
    tiers: { ...(state.tiers || {}), [institutionId]: nextTier },
    discovered: { ...(state.discovered || {}), [institutionId]: true },
    inauguratedWeek: {
      ...(state.inauguratedWeek || {}),
      [`${institutionId}:${nextTier}`]: week,
    },
  };
}

export function diningMealDiscount(state) {
  const tier = getInstitutionTier(state, 'dining');
  if (tier >= 3) return 0.14;
  if (tier >= 2) return 0.1;
  if (tier >= 1) return 0.08;
  return 0;
}

export function institutionMealCostMultiplier(state, venueId) {
  if (venueId === 'dining' || venueId === 'dining_hall') {
    return 1 - diningMealDiscount(state);
  }
  return 1;
}

export function groupDinnersUnlocked(state) {
  return getInstitutionTier(state, 'dining') >= 2;
}

export function institutionLocaleActive(state, localeKey) {
  const inst = CAMPUS_INSTITUTIONS.find((i) => i.locale === localeKey);
  if (!inst) return false;
  return getInstitutionTier(state, inst.id) >= 1;
}

export function institutionSummaryLine(state, institutionId, ctx = {}) {
  const inst = institutionById(institutionId);
  if (!inst) return null;
  const tier = getInstitutionTier(state, institutionId);
  if (tier <= 0 && !isInstitutionDiscovered(state, institutionId, ctx)) return null;
  const label = tier > 0 ? inst.tiers[tier - 1]?.label : 'Discovered';
  return `${inst.glyph} ${inst.label} · T${tier || '?'} ${label || ''}`.trim();
}

/** Weekly institution interrupts — one roll per upgraded venue. */
export function rollInstitutionInterrupts(state, week, ctx = {}) {
  const lines = [];
  const rng = ctx.rng || Math.random;

  for (const inst of CAMPUS_INSTITUTIONS) {
    const tier = getInstitutionTier(state, inst.id);
    if (tier <= 0) continue;
    const last = state.lastInterruptWeek?.[inst.id];
    if (last === week) continue;

    let chance = 0.12 + tier * 0.06;
    if (inst.id === 'dining' && tier >= 3) chance = 0.55;
    if (rng() > chance) continue;

    lines.push({
      institutionId: inst.id,
      tier,
      locale: inst.locale,
      glyph: inst.glyph,
      label: inst.label,
    });
  }

  return lines;
}

export function markInstitutionInterruptWeek(state, institutionId, week) {
  return {
    ...state,
    lastInterruptWeek: { ...(state.lastInterruptWeek || {}), [institutionId]: week },
  };
}

export function applyInterruptMarks(state, events, week) {
  let next = state;
  for (const ev of events || []) {
    next = markInstitutionInterruptWeek(next, ev.institutionId, week);
  }
  return next;
}

/** Auto-discover secret society when saturation threshold met. */
export function tickInstitutionDiscovery(state, ctx = {}) {
  let next = { ...state, discovered: { ...(state.discovered || {}) } };
  let changed = false;
  for (const inst of CAMPUS_INSTITUTIONS) {
    if (inst.purchasable !== false) continue;
    if (next.discovered[inst.id]) continue;
    if (isInstitutionDiscovered(next, inst.id, ctx)) {
      next.discovered[inst.id] = true;
      changed = true;
    }
  }
  return changed ? next : state;
}
