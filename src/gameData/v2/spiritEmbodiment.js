// ═══════════════════════════════════════════════════════════════
// SPIRIT EMBODIMENT — inhabit students, drive their actions
// ═══════════════════════════════════════════════════════════════
import { getStage } from '../stages.js';
import { V2_CONFIG } from './state.js';

export const EMBODIMENT_ACTIONS = [
  {
    id: 'raid_pantry',
    label: 'Raid the Pantry',
    icon: '🥫',
    apCost: 0,
    minStage: 0,
    minCorruption: 0,
    requiresSkill: 'spirit_ride',
    calories: 1200,
    fullness: 35,
    rel: 2,
    corruption: 3,
    desc: 'Her hands move before her mind catches up. Cartons, leftovers, the thing in the back she forgot she bought.',
  },
  {
    id: 'secret_binge',
    label: 'Secret Binge',
    icon: '🍕',
    apCost: 0,
    minStage: 2,
    minCorruption: 15,
    requiresSkill: 'spirit_ride',
    calories: 2200,
    fullness: 55,
    rel: 4,
    corruption: 6,
    desc: 'Door locked. Phone face-down. She eats like someone who has decided not to be witnessed.',
  },
  {
    id: 'seduce_appetite',
    label: 'Seduce Her Appetite',
    icon: '💋',
    apCost: 0,
    minStage: 3,
    minCorruption: 25,
    requiresSkill: 'spirit_ride',
    calories: 1800,
    fullness: 45,
    rel: 6,
    corruption: 8,
    desc: 'You whisper want into the places she keeps polite. Hunger stops being embarrassment and becomes appetite.',
  },
  {
    id: 'mirror_confession',
    label: 'Mirror Confession',
    icon: '🪞',
    apCost: 0,
    minStage: 4,
    minCorruption: 35,
    requiresSkill: 'deep_ride',
    calories: 900,
    fullness: 25,
    rel: 8,
    corruption: 10,
    desc: 'She stands before the glass and tells the truth her friends never hear: she likes this. She wants more.',
  },
  {
    id: 'text_professor',
    label: 'Text the Professor',
    icon: '💬',
    apCost: 0,
    minStage: 2,
    minCorruption: 20,
    requiresSkill: 'spirit_ride',
    calories: 600,
    fullness: 15,
    rel: 10,
    corruption: 5,
    desc: '"I\'m hungry again." She sends it before shame can edit. You feel the spirit purr.',
  },
  {
    id: 'roommate_tempt',
    label: 'Tempt the Roommate',
    icon: '🛋',
    apCost: 0,
    minStage: 3,
    minCorruption: 30,
    requiresSkill: 'deep_ride',
    calories: 1500,
    fullness: 40,
    rel: 3,
    corruption: 7,
    desc: 'Order for two. Eat for one and a half. Leave evidence. Let someone else notice.',
  },
  {
    id: 'auto_surrender',
    label: 'Surrender to Hunger',
    icon: '🌀',
    apCost: 0,
    minStage: 5,
    minCorruption: 50,
    requiresSkill: 'deep_ride',
    calories: 3200,
    fullness: 70,
    rel: 5,
    corruption: 12,
    desc: 'No negotiation. She opens the delivery app and does not stop until the bags are empty.',
  },
  {
    id: 'public_eating',
    label: 'Eat in Public',
    icon: '🍔',
    apCost: 0,
    minStage: 5,
    minCorruption: 45,
    requiresSkill: 'deep_ride',
    calories: 2400,
    fullness: 50,
    rel: 4,
    corruption: 9,
    scrutiny: 3,
    desc: 'Campus quad. She eats without apology. People look. She does not stop.',
  },
  {
    id: 'immobile_feast',
    label: 'Feast from Within',
    icon: '🏔',
    apCost: 0,
    minStage: 7,
    minCorruption: 60,
    requiresSkill: 'deep_ride',
    calories: 4500,
    fullness: 85,
    rel: 7,
    corruption: 15,
    desc: 'She cannot stand. You make the world bring food to her. Every bite is a landslide of warmth.',
  },
];

export function canEmbody(student, { ownedSkills = {}, ownedClassSkills = {}, embodimentState = {}, week = 1 } = {}) {
  if (!student || student.hidden) return { ok: false, reason: 'No target' };
  if ((ownedSkills.spirit_ride || 0) < 1) return { ok: false, reason: 'Requires Spirit Ride skill' };
  const maxUses = (ownedSkills.deep_ride || 0) >= 1 ? V2_CONFIG.maxEmbodimentsDeepRide : V2_CONFIG.maxEmbodimentsPerWeek;
  if ((embodimentState.usedThisWeek || 0) >= maxUses) return { ok: false, reason: 'Embodiment limit reached this week' };
  if (embodimentState.activeStudentId != null) return { ok: false, reason: 'Already inhabiting someone' };
  const apCost = ownedClassSkills.embodiment_chamber ? V2_CONFIG.embodimentDiscountAp : V2_CONFIG.embodimentBaseAp;
  return { ok: true, apCost };
}

export function getAvailableEmbodimentActions(student, ownedSkills = {}) {
  const stage = getStage(student.lbs).id;
  const cor = student.corruption || 0;
  return EMBODIMENT_ACTIONS.filter((a) => {
    if ((ownedSkills[a.requiresSkill] || 0) < 1) return false;
    if (stage < a.minStage) return false;
    if (cor < a.minCorruption) return false;
    return true;
  });
}

export function startEmbodiment(studentId, v2State) {
  return {
    ...v2State,
    embodiment: {
      ...v2State.embodiment,
      activeStudentId: studentId,
      usedThisWeek: (v2State.embodiment.usedThisWeek || 0) + 1,
      totalSessions: (v2State.embodiment.totalSessions || 0) + 1,
    },
  };
}

export function endEmbodiment(v2State) {
  return {
    ...v2State,
    embodiment: {
      ...v2State.embodiment,
      activeStudentId: null,
    },
  };
}

export function applyEmbodimentAction(v2State, actionId) {
  return {
    ...v2State,
    embodiment: {
      ...v2State.embodiment,
      lastAction: actionId,
    },
  };
}
