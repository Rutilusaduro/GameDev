// ═══════════════════════════════════════════════════════════════
// SOPHIA LANG — Pharmacist evolution path & compounds
// See docs/Pharmacist/
// ═══════════════════════════════════════════════════════════════
import { defaultCultState, initCultOnUnlock, cultLoyaltyRelBonus, consumeCultSupplyReservoir } from './pharmacistCult.js';

export const PHARMACIST_STAGES = [
  { id: 1, key: "corporate_chemist",  label: "Corporate Chemist",   desc: "Secret sabotage at her day job. Early compounds for the player." },
  { id: 2, key: "wellness_excess",    label: "Wellness to Excess",  desc: "Wellness branding. Campus starts softening. Home synthesis." },
  { id: 3, key: "cult_chemist",       label: "Cult Chemist",        desc: "Devoted users. Stronger tools. Addiction cure unlocked." },
  { id: 4, key: "goddess_excess",     label: "Goddess of Excess",  desc: "Mass transformation. Ascension protocol. Endgame power." },
];

export const COMPOUNDS = {
  appetite_stimulant: {
    id: "appetite_stimulant", label: "Appetite Stimulant", stage: 1,
    flavor: "Nothing too strong… just something to take the edge off. She might reach for seconds without thinking about it.",
    addictionGain: 0, hungerDelta: 1, corruptionGain: 1, calMult: 1.15, fullMult: 1.1,
  },
  mild_pleasure: {
    id: "mild_pleasure", label: "Mild Pleasure Enhancer", stage: 1,
    flavor: "Food tastes better. Fullness feels warmer. Subtle, but she'll notice.",
    addictionGain: 1, hungerDelta: 0, corruptionGain: 2, calMult: 1.1, fullMult: 1.05,
  },
  metabolic_slowdown: {
    id: "metabolic_slowdown", label: "Metabolic Slowdown", stage: 1,
    flavor: "Permanent slowdown in calorie burn. More of what she eats stays.",
    addictionGain: 0, hungerDelta: 0, corruptionGain: 0, calMult: 1, fullMult: 1,
    metabolicBonus: 0.12,
  },
  weight_gain_potion: {
    id: "weight_gain_potion", label: "Weight Gain Potion", stage: 1,
    flavor: "The scale moves the moment she swallows it — immediate, visible, stomach unchanged.",
    addictionGain: 1, hungerDelta: 1, corruptionGain: 2, calMult: 1, fullMult: 1,
    immediateLbsGain: [8, 14],
  },
  strong_appetite: {
    id: "strong_appetite", label: "Strong Appetite Stimulant", stage: 2,
    flavor: "Aggressive. She'll eat significantly more before she thinks about stopping.",
    addictionGain: 1, hungerDelta: 2, corruptionGain: 2, calMult: 1.3, fullMult: 1.25,
  },
  high_pleasure: {
    id: "high_pleasure", label: "High-Grade Pleasure Enhancer", stage: 2,
    flavor: "Eating feels really good. She might get desperate for that feeling.",
    addictionGain: 2, hungerDelta: 1, corruptionGain: 4, calMult: 1.2, fullMult: 1.15,
  },
  digestion_supplement: {
    id: "digestion_supplement", label: "Digestion Supplement", stage: 2,
    flavor: "After a big meal it all goes straight to her. Fast. Almost visible.",
    addictionGain: 1, hungerDelta: -1, corruptionGain: 2, calMult: 1.5, fullMult: 0.9,
    digestMult: 1.4,
  },
  craving_inducer: {
    id: "craving_inducer", label: "Craving Inducer", stage: 2,
    flavor: "Mean. She feels actually hungry — even when she shouldn't.",
    addictionGain: 1, hungerDelta: 3, corruptionGain: 3, calMult: 1, fullMult: 1,
    bypassAddictionGate: true,
  },
  sensitivity_serum: {
    id: "sensitivity_serum", label: "Sensitivity Serum", stage: 2,
    flavor: "Touch, pressure, fullness — everything hits harder. Overwhelming in a good way.",
    addictionGain: 1, hungerDelta: 0, corruptionGain: 3, calMult: 1.05, fullMult: 1.2,
    relGain: 6,
  },
  intentional_addiction: {
    id: "intentional_addiction", label: "Intentional Addiction Compound", stage: 3,
    flavor: "Made to make her need it. The food. The feeling. You.",
    addictionGain: 3, hungerDelta: 2, corruptionGain: 5, calMult: 1.1, fullMult: 1.1,
  },
  loyalty_enhancer: {
    id: "loyalty_enhancer", label: "Loyalty Enhancer", stage: 3,
    flavor: "Very attached — not just to food, but to who's giving it.",
    addictionGain: 1, hungerDelta: 0, corruptionGain: 2, calMult: 1, fullMult: 1,
    relGain: 12,
  },
  rapid_expansion: {
    id: "rapid_expansion", label: "Rapid Expansion Serum", stage: 3,
    flavor: "Big gains fast. Not subtle. Not safe to overuse.",
    addictionGain: 2, hungerDelta: 1, corruptionGain: 4, calMult: 1.8, fullMult: 1.3,
  },
  addiction_cure: {
    id: "addiction_cure", label: "Dependency Reset", stage: 3,
    flavor: "Pulls addiction back down to Mild. Doesn't remove it entirely.",
    addictionGain: 0, hungerDelta: -2, corruptionGain: 0, calMult: 1, fullMult: 1,
    resetAddictionTo: 1,
    category: "control",
  },
  cult_appetite: {
    id: "cult_appetite", label: "Cult-Strength Appetite", stage: 3,
    flavor: "She'll eat for you until obedience feels like relief. Aggressive and attached.",
    addictionGain: 2, hungerDelta: 2, corruptionGain: 3, calMult: 1.45, fullMult: 1.3,
    relGain: 8,
    category: "cult",
  },
  cult_pleasure: {
    id: "cult_pleasure", label: "Cult-Strength Pleasure", stage: 3,
    flavor: "Pleasure and loyalty merge. She associates fullness with belonging to your circle.",
    addictionGain: 2, hungerDelta: 1, corruptionGain: 5, calMult: 1.25, fullMult: 1.2,
    relGain: 10,
    category: "cult",
  },
  dependency_maintenance: {
    id: "dependency_maintenance", label: "Dependency Maintenance", stage: 3,
    flavor: "Keeps her needy — always a little hungry, always thinking about your food.",
    addictionGain: 0, hungerDelta: 1, corruptionGain: 1, calMult: 1.08, fullMult: 1.05,
    relGain: 6,
    maintainAddiction: true,
    category: "control",
  },
};

export const COMPOUND_CATEGORIES = {
  growth: { label: 'Growth & appetite', ids: [] },
  control: { label: 'Dependency control', ids: ['addiction_cure', 'dependency_maintenance'] },
  cult: { label: 'Cult supply', ids: ['intentional_addiction', 'loyalty_enhancer', 'rapid_expansion', 'cult_appetite', 'cult_pleasure'] },
};

// Populate growth with everything not in control/cult
const _special = new Set([...COMPOUND_CATEGORIES.control.ids, ...COMPOUND_CATEGORIES.cult.ids]);
COMPOUND_CATEGORIES.growth.ids = Object.keys(COMPOUNDS).filter(id => !_special.has(id));

export function getCompoundCategory(compoundId) {
  if (COMPOUND_CATEGORIES.control.ids.includes(compoundId)) return 'control';
  if (COMPOUND_CATEGORIES.cult.ids.includes(compoundId)) return 'cult';
  return 'growth';
}

export function compoundsForStage(stage) {
  return Object.values(COMPOUNDS).filter(c => c.stage <= stage);
}

export const SYNTHESIS_YIELD_BY_STAGE = {
  1: { doses: 2, pickFromStage: 1 },
  2: { doses: 3, pickFromStage: 2 },
  3: { doses: 4, pickFromStage: 3 },
  4: { doses: 5, pickFromStage: 4 },
};

export const PHARMACIST_EXPOSURE_EVENTS = [
  {
    id: 'wellness_audit',
    minExposure: 28,
    scrutiny: 2,
    exposureDelta: -5,
    text: () => `Corporate wellness flags an irregular batch in Sophia's division. She talks her way through a polite audit — formulas adjusted, logs rewritten. Exposure simmers down, but someone is watching now.`,
  },
  {
    id: 'curious_colleague',
    minExposure: 45,
    scrutiny: 3,
    exposureDelta: -8,
    text: () => `A lab colleague asks why Sophia's appetite compounds keep disappearing from inventory. She blames "pilot trials." He nods slowly. The nod is not entirely convinced.`,
  },
  {
    id: 'near_miss',
    minExposure: 62,
    scrutiny: 5,
    exposureDelta: -12,
    text: () => `Security almost opens Sophia's after-hours synthesis locker. She is one badge swipe away from catastrophe — then a fire drill scatters everyone. She exhales for a full minute in the stairwell.`,
  },
  {
    id: 'corporate_review',
    minExposure: 78,
    scrutiny: 7,
    exposureDelta: -18,
    text: () => `HR schedules a "wellness ethics" review. Sophia wears her most innocent cardigan and brings homemade cookies. The review ends inconclusively. Her hands shake in the parking garage afterward.`,
  },
  {
    id: 'crisis_averted',
    minExposure: 92,
    scrutiny: 4,
    exposureDelta: -30,
    text: () => `A near-disclosure forces Sophia to torch a batch and blame equipment failure. Corporate is furious; campus distribution pauses one week. She survives — barely — and the compounds that remain feel infinitely more precious.`,
  },
];

export function defaultPharmacistState() {
  return {
    stage: 1,
    exposureRisk: 0,
    sessionsRun: 0,
    campusFattening: false,
    cultActive: false,
    unlockedCompounds: compoundsForStage(1).map(c => c.id),
    compoundInventory: { appetite_stimulant: 2, mild_pleasure: 1 },
    ingredients: { precursors: 2, reagents: 1, extracts: 0, branding: 0, supply: 0, catalyst: 0 },
    cult: defaultCultState(),
    exposureEventsTriggered: [],
    synthesisPausedWeeks: 0,
  };
}

export function getCompoundStock(state, compoundId) {
  return state?.compoundInventory?.[compoundId] ?? 0;
}

export function getStockedCompoundIds(state) {
  if (!state?.compoundInventory) return [];
  return Object.entries(state.compoundInventory)
    .filter(([, qty]) => qty > 0)
    .map(([id]) => id)
    .filter(id => (state.unlockedCompounds || []).includes(id));
}

export function consumeCompoundDose(state, compoundId) {
  const qty = getCompoundStock(state, compoundId);
  if (qty <= 0) return state;
  return {
    ...state,
    compoundInventory: {
      ...state.compoundInventory,
      [compoundId]: qty - 1,
    },
  };
}

/** Home synthesis: each session brews doses into the player's compound stash. */
export function grantSynthesisYield(state, stageId) {
  const cfg = SYNTHESIS_YIELD_BY_STAGE[stageId] || SYNTHESIS_YIELD_BY_STAGE[1];
  const pool = compoundsForStage(cfg.pickFromStage).map(c => c.id);
  const inv = { ...state.compoundInventory };
  const granted = [];
  for (let i = 0; i < cfg.doses; i++) {
    const id = pool[Math.floor(Math.random() * pool.length)];
    inv[id] = (inv[id] || 0) + 1;
    granted.push(id);
  }
  return { compoundInventory: inv, lastSynthesisGrant: granted };
}

export function rollExposureEvent(prevState, nextState) {
  const prev = prevState.exposureRisk ?? 0;
  const next = nextState.exposureRisk ?? 0;
  const triggered = new Set(prevState.exposureEventsTriggered || []);
  for (const ev of PHARMACIST_EXPOSURE_EVENTS) {
    if (triggered.has(ev.id)) continue;
    if (prev < ev.minExposure && next >= ev.minExposure) {
      return ev;
    }
  }
  if (next >= 40 && Math.random() < 0.12) {
    return PHARMACIST_EXPOSURE_EVENTS.find(e => e.id === 'curious_colleague' && !triggered.has(e.id))
      || PHARMACIST_EXPOSURE_EVENTS.find(e => e.id === 'wellness_audit' && !triggered.has(e.id))
      || null;
  }
  return null;
}

export function applyExposureEvent(state, event) {
  if (!event) return state;
  return {
    ...state,
    exposureRisk: Math.max(0, Math.min(100, (state.exposureRisk ?? 0) + (event.exposureDelta ?? 0))),
    exposureEventsTriggered: [...(state.exposureEventsTriggered || []), event.id],
    synthesisPausedWeeks: event.id === 'crisis_averted' ? 1 : (state.synthesisPausedWeeks ?? 0),
  };
}

export function applyCompoundToFeed(student, compoundId, feedResult = {}, pharmacistState = null) {
  const compound = COMPOUNDS[compoundId];
  if (!compound) return { student, feedResult };
  let s = { ...student };
  if (compound.addictionGain && !compound.maintainAddiction) {
    const next = Math.min(4, getAddictionLevel(s) + compound.addictionGain);
    s.addictionLevel = next;
  }
  if (compound.maintainAddiction && getAddictionLevel(s) < 2) {
    s.addictionLevel = 2;
  }
  if (compound.resetAddictionTo != null) {
    s.addictionLevel = Math.min(getAddictionLevel(s), compound.resetAddictionTo);
  }
  if (compound.hungerDelta) {
    let t = (s.hungerTier ?? 0) + compound.hungerDelta;
    if (!compound.bypassAddictionGate && t >= 3 && getAddictionLevel(s) < 2) t = 2;
    s.hungerTier = Math.min(4, Math.max(0, t));
  }
  if (compound.metabolicBonus) {
    s.metabolicSlowdown = (s.metabolicSlowdown ?? 0) + compound.metabolicBonus;
  }
  s.lastCompound = compoundId;
  s.weeksWithoutPlayerFeed = 0;
  const fr = { ...feedResult };
  fr.calMult = (fr.calMult ?? 1) * (compound.calMult ?? 1);
  fr.fullMult = (fr.fullMult ?? 1) * (compound.fullMult ?? 1);
  fr.corruptionGain = (fr.corruptionGain ?? 0) + (compound.corruptionGain ?? 0);
  fr.relGain = (fr.relGain ?? 0) + (compound.relGain ?? 0) + cultLoyaltyRelBonus(pharmacistState, compoundId);
  fr.digestMult = (fr.digestMult ?? 1) * (compound.digestMult ?? 1);
  return { student: s, feedResult: fr, flavor: compound.flavor };
}

function getAddictionLevel(student) {
  return Math.min(4, Math.max(0, student?.addictionLevel ?? 0));
}

export const PHARMACIST_ACTIVITIES = {
  1: {
    label: "🧪 Synthesize Batch",
    apCost: 1,
    desc: "Sophia runs a quiet lab session. Unlocks stage compounds and raises exposure slightly.",
    sophiaGain: [2, 5],
    exposure: 8,
  },
  2: {
    label: "💊 Wellness Trial",
    apCost: 2,
    desc: "Campus wellness branding trial. The student body starts softer.",
    sophiaGain: [4, 8],
    exposure: 12,
    unlockCampusFattening: true,
  },
  3: {
    label: "🕯️ Supply the Circle",
    apCost: 2,
    desc: "Sophia's devoted users get stronger doses. Area gains accelerate.",
    sophiaGain: [5, 10],
    exposure: 5,
    unlockCult: true,
  },
  4: {
    label: "👑 Ascension Protocol",
    apCost: 3,
    desc: "Endgame synthesis. Massive personal and regional consequences.",
    sophiaGain: [8, 15],
    exposure: 20,
  },
};

const STAGE_SESSION_THRESHOLDS = [0, 3, 7, 12];

export function maybeAdvancePharmacistStage(state) {
  const sessions = state.sessionsRun ?? 0;
  let stage = 1;
  for (let i = STAGE_SESSION_THRESHOLDS.length - 1; i >= 0; i--) {
    if (sessions >= STAGE_SESSION_THRESHOLDS[i]) stage = i + 1;
  }
  stage = Math.min(4, stage);
  if (stage <= state.stage) return state;
  const next = {
    ...state,
    stage,
    unlockedCompounds: compoundsForStage(stage).map(c => c.id),
  };
  if (stage >= 2) next.campusFattening = true;
  if (stage >= 3) {
    next.cultActive = true;
    next.cult = initCultOnUnlock(next.cult);
  }
  return next;
}

/** Apply chemistry session results (crafted doses + leftover ingredients). */
export function completePharmacistChemSession(state, stageId, chemSession) {
  const act = PHARMACIST_ACTIVITIES[stageId];
  if (!act || !chemSession) return state;
  let next = { ...state };
  next.sessionsRun = (next.sessionsRun ?? 0) + 1;
  const exposureFromSession = (chemSession.exposureGained ?? 0) + (act.exposure ?? 0);
  next.exposureRisk = Math.min(100, (next.exposureRisk ?? 0) + exposureFromSession);
  if (act.unlockCampusFattening) next.campusFattening = true;
  if (act.unlockCult) {
    next.cultActive = true;
    next.cult = initCultOnUnlock(next.cult);
  }
  const inv = { ...next.compoundInventory };
  const granted = chemSession.granted || [];
  granted.forEach(id => { inv[id] = (inv[id] || 0) + 1; });
  next.compoundInventory = inv;
  next.lastSynthesisGrant = granted;
  next.ingredients = chemSession.poolAfter || next.ingredients;
  if (chemSession.cultSupplyMerged > 0) {
    next = consumeCultSupplyReservoir(next, chemSession.cultSupplyMerged);
  }
  next = maybeAdvancePharmacistStage(next);
  return next;
}

/** @deprecated Random yield — use completePharmacistChemSession after chemistry UI. */
export function runPharmacistActivity(state, stageId) {
  const act = PHARMACIST_ACTIVITIES[stageId];
  if (!act) return state;
  let next = { ...state };
  next.sessionsRun = (next.sessionsRun ?? 0) + 1;
  next.exposureRisk = Math.min(100, (next.exposureRisk ?? 0) + act.exposure);
  if (act.unlockCampusFattening) next.campusFattening = true;
  if (act.unlockCult) next.cultActive = true;
  const yieldResult = grantSynthesisYield(next, stageId);
  next = { ...next, ...yieldResult };
  next = maybeAdvancePharmacistStage(next);
  return next;
}

export function tickPharmacistWeek(state) {
  if (!state) return state;
  let next = { ...state };
  if ((next.synthesisPausedWeeks ?? 0) > 0) {
    next.synthesisPausedWeeks = next.synthesisPausedWeeks - 1;
  }
  return next;
}

export function formatSynthesisGrant(grantedIds = []) {
  if (!grantedIds.length) return '';
  const counts = {};
  grantedIds.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
  return Object.entries(counts)
    .map(([id, n]) => `${COMPOUNDS[id]?.label || id}${n > 1 ? ` ×${n}` : ''}`)
    .join(', ');
}

export const PHARMACIST_EVOLUTION_INTRO = (s) =>
  `${s.name} meets you after hours in a pharmacy lab that smells like ethanol and vanilla extract. Her hair is tied back, gloves on, notebook open to a page of molecular diagrams that have nothing to do with her assigned research. "I've been… adjusting things," she says, too carefully. "Appetite compounds. Metabolic support. Wellness adjacents." She removes a glove and taps the page. "I can make tools for you. Delivered through food — that's the only safe route." A pause. "I need someone who understands what they're authorizing."`;
