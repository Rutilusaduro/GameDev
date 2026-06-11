// ═══════════════════════════════════════════════════════════════
// SOPHIA LANG — Pharmacist evolution path & compounds
// See docs/Pharmacist/
// ═══════════════════════════════════════════════════════════════

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
    flavor: "The scale moves faster. She might start looking forward to it.",
    addictionGain: 1, hungerDelta: 1, corruptionGain: 2, calMult: 1.35, fullMult: 1.2,
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
  },
};

export function compoundsForStage(stage) {
  return Object.values(COMPOUNDS).filter(c => c.stage <= stage);
}

export function defaultPharmacistState() {
  return {
    stage: 1,
    exposureRisk: 0,
    sessionsRun: 0,
    campusFattening: false,
    cultActive: false,
    unlockedCompounds: compoundsForStage(1).map(c => c.id),
  };
}

export function applyCompoundToFeed(student, compoundId, feedResult = {}) {
  const compound = COMPOUNDS[compoundId];
  if (!compound) return { student, feedResult };
  let s = { ...student };
  if (compound.addictionGain) {
    const next = Math.min(4, getAddictionLevel(s) + compound.addictionGain);
    s.addictionLevel = next;
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
  fr.relGain = (fr.relGain ?? 0) + (compound.relGain ?? 0);
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
  if (stage >= 3) next.cultActive = true;
  return next;
}

export function runPharmacistActivity(state, stageId) {
  const act = PHARMACIST_ACTIVITIES[stageId];
  if (!act) return state;
  let next = { ...state };
  next.sessionsRun = (next.sessionsRun ?? 0) + 1;
  next.exposureRisk = Math.min(100, (next.exposureRisk ?? 0) + act.exposure);
  if (act.unlockCampusFattening) next.campusFattening = true;
  if (act.unlockCult) next.cultActive = true;
  next = maybeAdvancePharmacistStage(next);
  return next;
}

export const PHARMACIST_EVOLUTION_INTRO = (s) =>
  `${s.name} meets you after hours in a pharmacy lab that smells like ethanol and vanilla extract. Her hair is tied back, gloves on, notebook open to a page of molecular diagrams that have nothing to do with her assigned research. "I've been… adjusting things," she says, too carefully. "Appetite compounds. Metabolic support. Wellness adjacents." She removes a glove and taps the page. "I can make tools for you. Delivered through food — that's the only safe route." A pause. "I need someone who understands what they're authorizing."`;
