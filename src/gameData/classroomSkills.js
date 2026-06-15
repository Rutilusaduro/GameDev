// ═══════════════════════════════════════════════════════════════
// CLASSROOM PRESTIGE SKILLS — lbs-cost shop (§12, §30 gates)
// ═══════════════════════════════════════════════════════════════
import { SKILL_TREE } from './skills.js';

export function computeClassSkillCurrency(students = []) {
  return Math.round(
    students.reduce((a, s) => a + Math.max(0, (s.lbs || 0) - (s.startLbs || 0)), 0),
  );
}

export function getClassSkill(skillId) {
  return SKILL_TREE.find((s) => s.id === skillId) || null;
}

export function canBuyClassSkill(skillId, owned = {}, currency = 0) {
  const sk = getClassSkill(skillId);
  if (!sk) return { ok: false, reason: 'Unknown upgrade' };
  if (owned[skillId]) return { ok: false, reason: 'Already purchased' };
  const missing = (sk.requires || []).find((r) => !owned[r]);
  if (missing) {
    const req = getClassSkill(missing);
    return { ok: false, reason: `Requires ${req?.label || missing}` };
  }
  if (currency < sk.cost) return { ok: false, reason: `Need ${sk.cost} lbs prestige (have ${currency})` };
  return { ok: true, skill: sk };
}

export function buyClassSkill(skillId, owned = {}, currency = 0) {
  const check = canBuyClassSkill(skillId, owned, currency);
  if (!check.ok) return { ok: false, ...check };
  return {
    ok: true,
    owned: { ...owned, [skillId]: true },
    spent: check.skill.cost,
    skill: check.skill,
  };
}

export function aggregateClassSkillEffects(owned = {}) {
  const effects = { scrutinyReduce: 0, scrutinyPassiveReduce: 0, passiveBonus: 0, apBonus: 0, gainMult: 0 };
  SKILL_TREE.forEach((sk) => {
    if (!owned[sk.id]) return;
    effects.scrutinyReduce += sk.scrutinyReduce || 0;
    effects.scrutinyPassiveReduce += sk.scrutinyPassiveReduce || 0;
    effects.passiveBonus += sk.passiveBonus || 0;
    effects.apBonus += sk.apBonus || 0;
    effects.gainMult += sk.gainMult || 0;
  });
  return effects;
}

export function listPurchasableClassSkills(owned = {}, currency = 0) {
  return SKILL_TREE.filter((sk) => {
    if (owned[sk.id]) return false;
    return canBuyClassSkill(sk.id, owned, currency).ok;
  });
}
