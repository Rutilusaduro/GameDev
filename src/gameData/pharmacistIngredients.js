// ═══════════════════════════════════════════════════════════════
// PHARMACIST INGREDIENTS — resources, recipes, stage acquisition
// ═══════════════════════════════════════════════════════════════
import { COMPOUNDS, compoundsForStage } from './pharmacist.js';
import { cultSupplyToIngredients, applyBulkProductionDiscount } from './pharmacistCult.js';

export const INGREDIENTS = {
  precursors: { id: 'precursors', label: 'Lab Precursors', icon: '⚗️', desc: 'Corporate-grade chemical stock.' },
  reagents:   { id: 'reagents',   label: 'Reagents',       icon: '🧫', desc: 'Mixing agents and stabilizers.' },
  extracts:   { id: 'extracts',   label: 'Bio Extracts',   icon: '🌿', desc: 'Flavor and appetite carriers.' },
  branding:   { id: 'branding',   label: 'Wellness Brand', icon: '💊', desc: 'Trial kits, labels, campus credibility.' },
  supply:     { id: 'supply',     label: 'Supply Lines',   icon: '🕯️', desc: 'Cult distribution capacity.' },
  catalyst:   { id: 'catalyst',   label: 'Ascension Catalyst', icon: '👑', desc: 'Endgame mass-production reagent.' },
};

/** Per-compound ingredient costs (doses brew 1:1). */
export const COMPOUND_RECIPES = {
  appetite_stimulant:    { precursors: 2, reagents: 1 },
  mild_pleasure:         { precursors: 1, reagents: 1, extracts: 1 },
  metabolic_slowdown:    { precursors: 3, reagents: 1 },
  weight_gain_potion:    { precursors: 2, reagents: 2, extracts: 1 },
  strong_appetite:       { precursors: 2, reagents: 2, extracts: 1, branding: 1 },
  high_pleasure:         { precursors: 1, reagents: 2, extracts: 2, branding: 1 },
  digestion_supplement:  { precursors: 3, reagents: 2, extracts: 1 },
  craving_inducer:       { precursors: 2, reagents: 3, extracts: 2 },
  intentional_addiction: { precursors: 2, reagents: 2, extracts: 2, supply: 2 },
  loyalty_enhancer:      { precursors: 1, reagents: 2, supply: 2, branding: 1 },
  rapid_expansion:       { precursors: 3, reagents: 3, extracts: 2, supply: 1 },
  addiction_cure:        { precursors: 4, reagents: 3, extracts: 1 },
  sensitivity_serum:     { precursors: 2, reagents: 2, extracts: 2, branding: 1 },
  cult_appetite:         { precursors: 3, reagents: 2, extracts: 2, supply: 2 },
  cult_pleasure:         { precursors: 2, reagents: 3, extracts: 3, supply: 2, branding: 1 },
  dependency_maintenance:  { precursors: 3, reagents: 3, extracts: 2, supply: 1 },
};

export const MAX_BREWS_BY_STAGE = { 1: 2, 2: 3, 3: 4, 4: 5 };

/** Starting session pool when the chemistry modal opens. */
export function sessionIngredientBudget(stageId) {
  const base = {
    1: { precursors: 6, reagents: 4, extracts: 1 },
    2: { precursors: 5, reagents: 4, extracts: 2, branding: 3 },
    3: { precursors: 4, reagents: 4, extracts: 3, branding: 2, supply: 3 },
    4: { precursors: 6, reagents: 5, extracts: 4, branding: 3, supply: 4, catalyst: 2 },
  };
  return { ...(base[stageId] || base[1]) };
}

/** Campus narrative intensity (matches numeric campus tiers). */
export function getCampusNarrativeTier(pharmacistState) {
  if (!pharmacistState?.campusFattening) return 0;
  const stage = pharmacistState.stage ?? 2;
  if (stage >= 4) return 3;
  if (stage >= 3) return 2;
  return 1;
}

export const CAMPUS_NARRATIVE_LABELS = {
  0: null,
  1: 'Campus Softening',
  2: 'Campus Saturated',
  3: 'Regional Excess',
};

/** Stage-specific acquisition choices shown before crafting. */
export const ACQUISITION_BY_STAGE = {
  1: [
    {
      id: 'shift_stock',
      label: 'Use allotted shift stock',
      desc: 'Take only what the session budget allows. Corporate paperwork stays clean.',
      exposure: 0,
      grants: {},
      flavor: 'Sophia logs the minimum. Gloves on. Eyes down. By the book — for now.',
    },
    {
      id: 'pocket_precursors',
      label: 'Pocket extra precursors',
      desc: '+4 precursors · noticeable if inventory is audited.',
      exposure: 10,
      grants: { precursors: 4 },
      flavor: 'She slides two amber bottles into her tote while the shift lead is on break. Her pulse doesn\'t change. Her handwriting does.',
    },
    {
      id: 'falsify_log',
      label: 'Falsify the reagent log',
      desc: '+5 reagents · +2 extracts · colleagues may notice missing stock.',
      exposure: 18,
      grants: { reagents: 5, extracts: 2 },
      flavor: 'One line rewritten. One signature that almost matches. The numbers close if nobody looks too closely.',
    },
    {
      id: 'borrow_project',
      label: 'Borrow from an adjacent project',
      desc: '+4 precursors · +4 reagents · high exposure if security reviews access.',
      exposure: 26,
      grants: { precursors: 4, reagents: 4 },
      flavor: 'A diabetes trial won\'t miss a few vials. Probably. Sophia tells herself that twice while badge-scanning into the wrong cold room.',
    },
  ],
  2: [
    {
      id: 'wellness_shipment',
      label: 'Fulfill wellness trial shipment',
      desc: '+3 branding · +2 extracts · legitimate cover.',
      exposure: 4,
      grants: { branding: 3, extracts: 2 },
      flavor: 'Boxes labeled METABOLIC SUPPORT leave on the official truck. Half the labels are honest. The campus marketing team posts a thank-you.',
    },
    {
      id: 'divert_trial',
      label: 'Divert trial batch to home lab',
      desc: '+4 precursors · +3 reagents · +2 branding · audit risk.',
      exposure: 14,
      grants: { precursors: 4, reagents: 3, branding: 2 },
      flavor: 'Sophia signs for twelve kits and shelves four at her apartment. The wellness brand grows faster than corporate expected.',
    },
    {
      id: 'campus_sampling',
      label: 'Campus sampling event',
      desc: '+5 branding · +3 extracts · students get samples; you get ingredients.',
      exposure: 8,
      grants: { branding: 5, extracts: 3 },
      flavor: 'Free samples at the union. Lines around the table. Flyers with her division\'s logo. Everyone leaves with appetite and she leaves with stock.',
    },
    {
      id: 'influencer_collab',
      label: 'Wellness influencer collab',
      desc: '+3 reagents · +4 branding · soft exposure through PR.',
      exposure: 6,
      grants: { reagents: 3, branding: 4 },
      flavor: 'A ring-light video. "Doctor-adjacent wellness." Comments ask where to buy more. Sophia screenshots the engagement metrics for later.',
    },
  ],
  3: [
    {
      id: 'circle_pickup',
      label: 'Circle members pick up in person',
      desc: '+4 supply · +2 extracts · loyal users bring cash and empty bottles.',
      exposure: 3,
      grants: { supply: 4, extracts: 2 },
      flavor: 'They arrive in twos and threes, heavier each week, grateful in a way that makes accounting unnecessary.',
    },
    {
      id: 'dorm_routes',
      label: 'Route through dorm captains',
      desc: '+5 supply · +3 branding · wider campus distribution.',
      exposure: 7,
      grants: { supply: 5, branding: 3 },
      flavor: 'Sophia doesn\'t meet everyone anymore. She meets the girls who meet everyone else. The network fattens on its own.',
    },
    {
      id: 'bulk_drop',
      label: 'Bulk drop at the union',
      desc: '+3 precursors · +6 supply · visible but efficient.',
      exposure: 12,
      grants: { precursors: 3, supply: 6 },
      flavor: 'A rolling cart. Unmarked tubs. A sign that says WELLNESS SAMPLES. It is gone in twenty minutes.',
    },
    {
      id: 'loyalty_only',
      label: 'Loyalty-only distribution',
      desc: '+4 supply · +4 reagents · low exposure, smaller yield.',
      exposure: 2,
      grants: { supply: 4, reagents: 4 },
      flavor: 'Names on a list. Repeat customers only. The circle tightens and thickens together.',
    },
  ],
  4: [
    {
      id: 'regional_hub',
      label: 'Activate regional distribution hub',
      desc: '+5 supply · +4 catalyst · +3 branding · major visibility.',
      exposure: 15,
      grants: { supply: 5, catalyst: 4, branding: 3 },
      flavor: 'Cold storage rented under a wellness LLC. Trucks that don\'t ask questions. Sophia stops pretending this is a side project.',
    },
    {
      id: 'ascension_batch',
      label: 'Ascension precursor batch',
      desc: '+6 catalyst · +4 precursors · personal transformation fuel.',
      exposure: 18,
      grants: { catalyst: 6, precursors: 4 },
      flavor: 'She brews for herself first. The mirror shows someone who has outgrown the job title entirely.',
    },
    {
      id: 'mass_sampling',
      label: 'Mass sampling weekend',
      desc: '+8 supply · +5 extracts · campus-wide saturation push.',
      exposure: 22,
      grants: { supply: 8, extracts: 5 },
      flavor: 'Three buildings. One weekend. Portions that don\'t end. She watches strangers soften in real time and feels divine.',
    },
    {
      id: 'quiet_stockpile',
      label: 'Quiet stockpile from cult tithes',
      desc: '+4 catalyst · +3 of each base · lowest exposure.',
      exposure: 8,
      grants: { catalyst: 4, precursors: 3, reagents: 3, extracts: 3, supply: 3 },
      flavor: 'The devoted bring offerings. Chemicals. Cash. Tupperwares of dinner they couldn\'t finish. She accepts all of it.',
    },
  ],
};

export function emptyIngredientBag() {
  return { precursors: 0, reagents: 0, extracts: 0, branding: 0, supply: 0, catalyst: 0 };
}

export function mergeIngredients(base, delta = {}) {
  const out = { ...emptyIngredientBag(), ...base };
  for (const [k, v] of Object.entries(delta)) {
    if (INGREDIENTS[k]) out[k] = (out[k] || 0) + (v || 0);
  }
  return out;
}

export function getRecipeForCompound(compoundId, pharmacistState = null) {
  const base = COMPOUND_RECIPES[compoundId];
  if (!base) return null;
  return pharmacistState ? applyBulkProductionDiscount(base, pharmacistState) : base;
}

export function canAffordRecipe(pool, compoundId, pharmacistState = null) {
  const recipe = getRecipeForCompound(compoundId, pharmacistState);
  if (!recipe) return false;
  return Object.entries(recipe).every(([k, n]) => (pool[k] || 0) >= n);
}

export function spendRecipe(pool, compoundId, pharmacistState = null) {
  const recipe = getRecipeForCompound(compoundId, pharmacistState);
  if (!recipe || !canAffordRecipe(pool, compoundId, pharmacistState)) return pool;
  const next = { ...pool };
  for (const [k, n] of Object.entries(recipe)) {
    next[k] = (next[k] || 0) - n;
  }
  return next;
}

export function recipeCostLabel(compoundId, pharmacistState = null) {
  const recipe = getRecipeForCompound(compoundId, pharmacistState);
  if (!recipe) return '';
  return Object.entries(recipe)
    .map(([k, n]) => `${INGREDIENTS[k]?.icon || ''}${n}`)
    .join(' ');
}

export function compoundsCraftableNow(pool, stageId, pharmacistState = null) {
  const poolIds = compoundsForStage(stageId).map(c => c.id);
  return poolIds.filter(id => canAffordRecipe(pool, id, pharmacistState));
}

export function startChemSession(pharmacistState) {
  const stageId = pharmacistState?.stage ?? 1;
  const cultReservoir = pharmacistState?.cult?.supplyReservoir ?? 0;
  const cultBonus = pharmacistState?.cultActive ? cultSupplyToIngredients(pharmacistState) : {};
  return {
    stageId,
    phase: 'acquire',
    cultSupplyMerged: cultReservoir,
    pool: mergeIngredients(sessionIngredientBudget(stageId), pharmacistState?.ingredients, cultBonus),
    exposureGained: 0,
    acquisitionLog: [],
    brewPlan: [],
    maxBrews: MAX_BREWS_BY_STAGE[stageId] || 2,
  };
}

export function applyAcquisitionChoice(session, actionId) {
  const options = ACQUISITION_BY_STAGE[session.stageId] || ACQUISITION_BY_STAGE[1];
  const action = options.find(a => a.id === actionId);
  if (!action) return session;
  return {
    ...session,
    phase: 'craft',
    pool: mergeIngredients(session.pool, action.grants),
    exposureGained: (session.exposureGained || 0) + (action.exposure || 0),
    acquisitionLog: [...(session.acquisitionLog || []), action.flavor],
    lastAcquisition: action,
  };
}

export function skipAcquisition(session) {
  return { ...session, phase: 'craft' };
}

export function toggleBrewInPlan(session, compoundId, pharmacistState = null) {
  const plan = [...(session.brewPlan || [])];
  const idx = plan.indexOf(compoundId);
  if (idx >= 0) {
    plan.splice(idx, 1);
    return { ...session, brewPlan: plan };
  }
  if (plan.length >= session.maxBrews) return session;
  if (!canAffordRecipe(session.pool, compoundId, pharmacistState)) return session;
  let pool = session.pool;
  for (const id of plan) pool = spendRecipe(pool, id, pharmacistState);
  if (!canAffordRecipe(pool, compoundId, pharmacistState)) return session;
  return { ...session, brewPlan: [...plan, compoundId] };
}

export function finalizeBrewPlan(session, pharmacistState = null) {
  let pool = { ...session.pool };
  const granted = [];
  for (const id of session.brewPlan || []) {
    if (!canAffordRecipe(pool, id, pharmacistState)) continue;
    pool = spendRecipe(pool, id, pharmacistState);
    granted.push(id);
  }
  return {
    ...session,
    phase: 'summary',
    poolAfter: pool,
    granted,
  };
}

export function ingredientBagFromState(state) {
  return mergeIngredients(state?.ingredients);
}

export function formatIngredientBag(bag) {
  return Object.entries(INGREDIENTS)
    .map(([k, def]) => ({ ...def, qty: bag[k] || 0 }))
    .filter(x => x.qty > 0);
}
