// The Squad — Lead: A3 Immobility | Support: A4 Architect
// Stage limits + pin-risk for intimacy scenes. Hand-authored and kept OUT of
// the generated intimacyData.js so regeneration never clobbers it.
import { getStage } from './stages.js';
import { getImmobilityTier } from './immobilityArrival.js';
import { depthPinBlackoutChance, depthPinRelBonus } from './mechanicsDepthLayer.js';

// Scenes that need standing / mobile posture. Once she's past mobility
// (stage 10+) she can't be pinned to a wall, pull you in, straddle a lap she
// can't move onto, or squeeze you standing — so these leave the menu.
const MOBILE_ONLY = new Set(['wall_press', 'kissing_pull', 'thighs_lap', 'squeeze_thighs']);

export function intimacySceneAllowed(sceneId, student) {
  if (getStage(student?.lbs ?? 0).id >= 10 && MOBILE_ONLY.has(sceneId)) return false;
  return true;
}

// (sceneId → choiceIds) where her mass comes down over you. Once she's settled,
// these carry a chance she pins you and you black out — the week ends there.
export const INTIMACY_PIN_RISK = {
  her_weight: ['rock_gently', 'pull_closer', 'reach_lower'],
  under_her:  ['take_weight', 'shift_under', 'press_belly_up', 'stay_under', 'feel_movement'],
};

export function choiceHasPinRisk(sceneId, choiceId) {
  return (INTIMACY_PIN_RISK[sceneId] || []).includes(choiceId);
}

/** True when this choice can black the player out: pin-risk choice + she's
 *  heavy enough to do it (settled, stage 10+). */
export function choiceCanPin(sceneId, choiceId, student) {
  return getImmobilityTier(student) >= 1 && choiceHasPinRisk(sceneId, choiceId);
}

// Blackout odds: heavy enough to be dangerous at stage 10, far worse at 11.
export function pinBlackoutChance(student) {
  const base = getStage(student?.lbs ?? 0).id >= 11 ? 0.35 : 0.20;
  return depthPinBlackoutChance(base);
}

// She does not forget a man who let her put him out for a week.
export const PIN_PASSOUT_REL_BONUS = depthPinRelBonus(8);
