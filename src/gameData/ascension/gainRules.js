// The Squad — Lead: A4 Architect | Support: A2 Psych
// Form gain rules are data consumed by existing gain paths. No second ladder.

import { depthGainMult } from '../mechanicsDepthLayer.js';

export const DEFAULT_FORM_GAIN_RULE = {
  weeklyMult: 1,
  essencePerLb: 0.5,
  rungEssenceBonus: 2,
};

export const FORM_GAIN_RULES = {
  valkyrie: {
    ...DEFAULT_FORM_GAIN_RULE,
    weeklyMult: 1.05,
    catalystFlag: 'squad_feast_win',
    catalystEssence: 2,
  },
  sphinx: {
    ...DEFAULT_FORM_GAIN_RULE,
    finalsWeekMult: 1.2,
    campusEventEssence: 1,
  },
  siren: {
    ...DEFAULT_FORM_GAIN_RULE,
    streamNightMult: 1.25,
    catalystFlag: 'stream_live',
  },
  mermaid: {
    ...DEFAULT_FORM_GAIN_RULE,
    inWaterDigestMult: 0.9,
    ashoreMult: 1.15,
    lapWeekEssenceBonus: 1,
    tankStages: [4, 7, 9],
  },
  galatea: {
    ...DEFAULT_FORM_GAIN_RULE,
    bankKey: 'studyWeight',
    burstStages: [5, 8, 11],
  },
  glitch_sprite: {
    ...DEFAULT_FORM_GAIN_RULE,
    rollbackReconcileMult: 1.3,
    rollbackCooldownWeeks: 2,
  },
  feast_nymph: {
    ...DEFAULT_FORM_GAIN_RULE,
    guestFedShare: 0.15,
    houseRoomStages: [3, 6, 9],
  },
  djinn: {
    ...DEFAULT_FORM_GAIN_RULE,
    wishGrantedLb: [1, 3],
    catalystFlag: 'wish_closed',
  },
  dryad: {
    ...DEFAULT_FORM_GAIN_RULE,
    groveBankMult: 0.8,
    bloomWeeks: [8, 16, 24],
  },
  melusine: {
    ...DEFAULT_FORM_GAIN_RULE,
    salonDinnerLb: [2, 5],
    bathMult: 1.1,
  },
  hearth_demigoddess: {
    ...DEFAULT_FORM_GAIN_RULE,
    transformCookLb: [1, 2],
    catalystFlag: 'ambrosia_served',
  },
  fertility_goddess: {
    ...DEFAULT_FORM_GAIN_RULE,
    adjacencyMult: 1.05,
    witnessRungLb: 2,
  },
  dream_eater: {
    ...DEFAULT_FORM_GAIN_RULE,
    sessionLb: [1, 3],
    psychAccelMult: 1.1,
  },
  angel_of_plenty: {
    ...DEFAULT_FORM_GAIN_RULE,
    gratitudeLb: 1,
    catalystFlag: 'blessing_spoken',
  },
  harvest_queen: {
    ...DEFAULT_FORM_GAIN_RULE,
    harvestWeekMult: 1.4,
    harvestWeeks: [12, 24],
  },
  lamia: {
    ...DEFAULT_FORM_GAIN_RULE,
    coilBankKey: 'coilMass',
    secretLbRate: 0.5,
  },
  potion_witch: {
    ...DEFAULT_FORM_GAIN_RULE,
    brewSelfLb: [1, 2],
    compoundEssenceBonus: 1,
  },
  dragon: {
    ...DEFAULT_FORM_GAIN_RULE,
    hoardConvertRate: 0.02,
    hoardBloomWeeks: 3,
  },
};

export function getFormGainRule(formId) {
  return formId && FORM_GAIN_RULES[formId]
    ? FORM_GAIN_RULES[formId]
    : DEFAULT_FORM_GAIN_RULE;
}

export function formPassiveGainMultiplier(student) {
  if (!student?.ascension?.formId) return 1;
  const mult = getFormGainRule(student.ascension.formId).weeklyMult ?? 1;
  return depthGainMult(mult);
}
