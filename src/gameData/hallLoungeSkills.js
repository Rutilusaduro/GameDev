// ═══════════════════════════════════════════════════════════════
// HALL LOUNGE PRESTIGE SKILLS — lbs-cost shop (§12, §30 gates)
// ═══════════════════════════════════════════════════════════════
import { SKILL_TREE } from './skills.js';
import { computeHallRoomSynergyBonus } from './hallBlueprint.js';
import { depthSaturationBonus, depthTalkRelGrant } from './mechanicsDepthLayer.js';
import { computeHallAmbiancePerks } from './hallAmbiance.js';

export function computeClassSkillTotal(students = []) {
  return Math.round(
    students.reduce((a, s) => a + Math.max(0, (s.lbs || 0) - (s.startLbs || 0)), 0),
  );
}

export function computeClassSkillSpent(owned = {}) {
  return SKILL_TREE.reduce((sum, sk) => sum + (owned[sk.id] ? sk.cost : 0), 0);
}

/** Lifetime lbs gained minus prestige already spent on upgrades. */
export function computeClassSkillCurrency(students = [], owned = {}) {
  return Math.max(0, computeClassSkillTotal(students) - computeClassSkillSpent(owned));
}

export function getClassSkill(skillId) {
  return SKILL_TREE.find((s) => s.id === skillId) || null;
}

export function getClassUnlocks(owned = {}) {
  const unlocks = new Set();
  SKILL_TREE.forEach((sk) => {
    if (!owned[sk.id]) return;
    (sk.unlocks || []).forEach((u) => unlocks.add(u));
  });
  return unlocks;
}

export function hasClassUnlock(owned = {}, unlockId) {
  return getClassUnlocks(owned).has(unlockId);
}

export function canBuyClassSkill(skillId, owned = {}, students = []) {
  const sk = getClassSkill(skillId);
  if (!sk) return { ok: false, reason: 'Unknown upgrade' };
  if (owned[skillId]) return { ok: false, reason: 'Already purchased' };
  const missing = (sk.requires || []).find((r) => !owned[r]);
  if (missing) {
    const req = getClassSkill(missing);
    return { ok: false, reason: `Requires ${req?.label || missing}` };
  }
  const currency = computeClassSkillCurrency(students, owned);
  if (currency < sk.cost) return { ok: false, reason: `Need ${sk.cost} lbs prestige (have ${currency})` };
  return { ok: true, skill: sk };
}

export function buyClassSkill(skillId, owned = {}, students = []) {
  const check = canBuyClassSkill(skillId, owned, students);
  if (!check.ok) return { ok: false, ...check };
  return {
    ok: true,
    owned: { ...owned, [skillId]: true },
    spent: check.skill.cost,
    skill: check.skill,
  };
}

export function aggregateClassSkillEffects(owned = {}) {
  const effects = {
    scrutinyReduce: 0,
    scrutinyPassiveReduce: 0,
    passiveBonus: 0,
    apBonus: 0,
    gainMult: 0,
    sessionCapBonus: 0,
    tapOutResistance: 0,
    talkRelBonus: 0,
    roomSynergyGain: 0,
    hallAmbianceGain: 0,
  };
  SKILL_TREE.forEach((sk) => {
    if (!owned[sk.id]) return;
    effects.scrutinyReduce += sk.scrutinyReduce || 0;
    effects.scrutinyPassiveReduce += sk.scrutinyPassiveReduce || 0;
    effects.passiveBonus += sk.passiveBonus || 0;
    effects.apBonus += sk.apBonus || 0;
    effects.gainMult += sk.gainMult || 0;
    effects.sessionCapBonus += sk.sessionCapBonus || 0;
    effects.tapOutResistance += sk.tapOutResistance || 0;
  });
  const synergy = computeHallRoomSynergyBonus(owned);
  const ambiance = computeHallAmbiancePerks(owned);
  effects.gainMult += synergy;
  effects.gainMult += ambiance.gainMult || 0;
  effects.passiveBonus += ambiance.passiveBonus || 0;
  effects.scrutinyPassiveReduce += ambiance.scrutinyPassiveReduce || 0;
  effects.sessionCapBonus += ambiance.sessionCapBonus || 0;
  effects.talkRelBonus = (effects.talkRelBonus || 0) + (ambiance.talkRelBonus || 0);
  effects.roomSynergyGain = synergy;
  effects.hallAmbianceGain = ambiance.gainMult || 0;
  effects.passiveBonus = depthSaturationBonus(effects.passiveBonus);
  effects.talkRelBonus = depthTalkRelGrant(effects.talkRelBonus);
  return effects;
}

export function getClassActionCost(action, owned = {}) {
  let cost = action.cost ?? 0;
  if (action.id === 'feast' && hasClassUnlock(owned, 'feast_discount')) {
    cost = Math.max(1, cost - 1);
  }
  return cost;
}

export function listPurchasableClassSkills(owned = {}, students = []) {
  return SKILL_TREE.filter((sk) => {
    if (owned[sk.id]) return false;
    return canBuyClassSkill(sk.id, owned, students).ok;
  });
}

/** Map dinner venue ids to hall lounge prestige unlock keys. */
const VENUE_UNLOCK_MAP = {
  bistro: 'dinner_action',
  italian: 'dinner_action',
  steakhouse: 'dinner_upscale_venues',
  french: 'dinner_upscale_venues',
  omakase: 'dinner_upscale_venues',
  brunch_hall: 'dinner_action',
  private_club: 'dinner_private_venues',
  chefs_table: 'dinner_private_venues',
  home_dinner: 'dinner_private_venues',
};

export function isDinnerVenueUnlocked(venueId, owned = {}) {
  const req = VENUE_UNLOCK_MAP[venueId];
  if (!req) return true;
  return hasClassUnlock(owned, req);
}

/** @deprecated legacy names — use hall-lounge variants in new code */
export const computeHallLoungeSkillTotal = computeClassSkillTotal;
export const computeHallLoungeSkillSpent = computeClassSkillSpent;
export const computeHallLoungeSkillCurrency = computeClassSkillCurrency;
export const getHallLoungeSkill = getClassSkill;
export const getHallLoungeUnlocks = getClassUnlocks;
export const hasHallLoungeUnlock = hasClassUnlock;
export const canBuyHallLoungeSkill = canBuyClassSkill;
export const buyHallLoungeSkill = buyClassSkill;
export const aggregateHallLoungeSkillEffects = aggregateClassSkillEffects;
export const getHallActionCost = getClassActionCost;
export const listPurchasableHallLoungeSkills = listPurchasableClassSkills;
