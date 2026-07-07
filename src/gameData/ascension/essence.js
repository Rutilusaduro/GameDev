// The Squad — Lead: A4 Architect | Support: A5 Editor
// Essence helpers stay pure so every gain path can award the resource safely.

import { getFormGainRule } from './gainRules.js';
import { isAscended } from './state.js';

function roundEssence(amount) {
  return Math.max(0, Math.round(amount * 10) / 10);
}

export function essenceFromGain(student, lbsGained = 0, { stagedUp = false } = {}) {
  if (!isAscended(student) || lbsGained <= 0) return 0;
  const rule = getFormGainRule(student.ascension.formId);
  const perLb = rule.essencePerLb ?? 0.5;
  const rung = stagedUp ? (rule.rungEssenceBonus ?? 2) : 0;
  return roundEssence(lbsGained * perLb + rung);
}

export function addEssence(student, amount) {
  if (!isAscended(student) || amount <= 0) return student;
  return {
    ...student,
    ascension: {
      ...student.ascension,
      essence: roundEssence((student.ascension.essence || 0) + amount),
    },
  };
}

export function applyEssenceFromGain(student, lbsGained = 0, opts = {}) {
  return addEssence(student, essenceFromGain(student, lbsGained, opts));
}

export function canSpendEssence(student, cost = 0) {
  return isAscended(student) && (student.ascension.essence || 0) >= cost;
}

export function spendEssence(student, cost = 0, { publicSpend = false } = {}) {
  if (!canSpendEssence(student, cost)) return { ok: false, student };
  const nextEssence = roundEssence((student.ascension.essence || 0) - cost);
  return {
    ok: true,
    student: {
      ...student,
      ascension: {
        ...student.ascension,
        essence: nextEssence,
        essenceSpentPublic: (student.ascension.essenceSpentPublic || 0) + (publicSpend ? cost : 0),
      },
    },
  };
}
