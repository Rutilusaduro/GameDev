// ═══════════════════════════════════════════════════════════════
// RA APPROACHES — playstyle axis (replaces spirit possession)
// Same mechanical levers as the old spirit system, reframed as
// how this RA runs her hall.
// ═══════════════════════════════════════════════════════════════

import { getDorm, getDormGainMult } from './dorms.js';
import { depthGainMult, depthSaturationBonus } from './mechanicsDepthLayer.js';

export const FAVOR_MAX = 10;
export const FAVOR_REBATE = 1;

export const RA_APPROACHES = {
  bloom: {
    id: 'bloom',
    label: 'The Instigator',
    lean: 'corruption',
    color: '#8a4be0',
    accentSoft: 'rgba(138,75,224,0.22)',
    traits: ['persuasive'],
    tagline: 'You plant ideas. They think the cravings were always theirs.',
    favorActions: { intimacy: 4, session: 3, feed: 2 },
    startMods: { corruption: 8 },
    gainMult: 1.0,
    corruptionMult: 1.4,
    loreParas: [
      'You mention the all-you-can-eat special in passing. By Thursday she has a group chat about it and thinks she started the whole thing.',
      'Your residents name their own excuses. You just make sure the good ones are easy to reach.',
    ],
  },
  hearth: {
    id: 'hearth',
    label: 'The Host',
    lean: 'comfort',
    color: '#d8943a',
    accentSoft: 'rgba(216,148,58,0.20)',
    traits: ['patient'],
    tagline: 'Warm common room, second helpings, nobody leaves hungry.',
    favorActions: { comfort: 4, session: 3, talk: 2 },
    startMods: {},
    gainMult: 1.0,
    passiveBonus: 1,
    scrutinyMult: 0.8,
    loreParas: [
      'Your floor lounge runs late. They used to study through dinner; now they stay for dessert and don\'t apologize.',
      'Comfort is the product you sell. They keep buying.',
    ],
  },
  hollow: {
    id: 'hollow',
    label: 'The Enabler',
    lean: 'hunger',
    color: '#c83a4a',
    accentSoft: 'rgba(200,58,74,0.20)',
    traits: ['generous'],
    tagline: 'You always know who\'s still hungry. You always have snacks.',
    favorActions: { feed: 4, dinner: 3, stuff: 4 },
    startMods: { hunger: 18 },
    gainMult: 1.15,
    scrutinyMult: 1.1,
    loreParas: [
      'The mini-fridge in your RA suite is never empty. Neither is anyone\'s plate when you\'re on duty.',
      'Hunger on your hall doesn\'t fade — it gets rerouted. Usually through you.',
    ],
  },
  tide: {
    id: 'tide',
    label: 'The Confidant',
    lean: 'trust',
    color: '#2a9d8f',
    accentSoft: 'rgba(42,157,143,0.20)',
    traits: ['discreet'],
    tagline: 'They tell you what they ordered before they tell their roommates.',
    favorActions: { talk: 4, session: 3, dinner: 2 },
    startMods: { relationship: 10 },
    gainMult: 1.0,
    scrutinyMult: 0.85,
    loreParas: [
      'She texts you her DoorDash order like a confession. You reply with the heart emoji. She thinks that means you approve.',
      'Trust on your floor is currency. You\'re rich.',
    ],
  },
};

export const RA_APPROACH_LIST = Object.values(RA_APPROACHES);

export function getApproach(id) {
  return RA_APPROACHES[id] || null;
}

/** Resolve approach id from RA profile (migrates legacy spiritId saves). */
export function getProfileApproachId(profile) {
  return profile?.approachId ?? profile?.spiritId ?? null;
}

export function getApproachLabel(profile) {
  const id = getProfileApproachId(profile);
  return id ? RA_APPROACHES[id]?.label : null;
}

/** Strip legacy spiritId from RA profile objects (save compat). */
export function migrateRaProfile(profile) {
  if (!profile || typeof profile !== 'object') return profile;
  const approachId = getProfileApproachId(profile);
  if (!approachId) return profile;
  if (profile.spiritId == null) return profile;
  const { spiritId: _legacy, ...rest } = profile;
  return { ...rest, approachId };
}

export function favorFill(approachId, tag) {
  return RA_APPROACHES[approachId]?.favorActions?.[tag] || 0;
}

export function profileGainMult(profile) {
  if (!profile) return 1;
  const dormId = profile.dormId || profile.subject;
  const approach = RA_APPROACHES[getProfileApproachId(profile)];
  const mult = getDormGainMult(dormId) * (approach?.gainMult ?? 1);
  return depthGainMult(mult);
}

export function profileScrutinyMult(profile) {
  if (!profile) return 1;
  const dorm = getDorm(profile.dormId || profile.subject);
  const approach = RA_APPROACHES[getProfileApproachId(profile)];
  return (dorm?.scrutinyMult ?? 1) * (approach?.scrutinyMult ?? 1);
}

export function profilePassiveBonus(profile) {
  const base = RA_APPROACHES[getProfileApproachId(profile)]?.passiveBonus || 0;
  return depthSaturationBonus(base);
}

export function profileCorruptionMult(profile) {
  return RA_APPROACHES[getProfileApproachId(profile)]?.corruptionMult || 1;
}
