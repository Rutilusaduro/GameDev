// The Squad — Lead: A4 Architect | Support: A2 Psych
// Form gain rules are data consumed by existing gain paths. No second ladder.

export const DEFAULT_FORM_GAIN_RULE = {
  weeklyMult: 1,
  essencePerLb: 0.5,
  rungEssenceBonus: 2,
};

export const FORM_GAIN_RULES = {
  mermaid: {
    ...DEFAULT_FORM_GAIN_RULE,
    inWaterDigestMult: 0.9,
    ashoreMult: 1.15,
    lapWeekEssenceBonus: 1,
    tankStages: [4, 7, 9],
  },
};

export function getFormGainRule(formId) {
  return formId && FORM_GAIN_RULES[formId]
    ? FORM_GAIN_RULES[formId]
    : DEFAULT_FORM_GAIN_RULE;
}

export function formPassiveGainMultiplier(student) {
  if (!student?.ascension?.formId) return 1;
  return getFormGainRule(student.ascension.formId).weeklyMult ?? 1;
}
