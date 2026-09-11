// ═══════════════════════════════════════════════════════════════
// MECHANIC DEPTH — extra states, choices, and weekly ticks that
// sit on top of talk / feed / session / dinner / campus / devices
// / hunger / relationship without forking those files into new
// systems. Habitat bonuses come from dormBlueprint.js.
// ═══════════════════════════════════════════════════════════════
import { habitatForStudent, neighborStudentIds } from './dormBlueprint.js';
import { getStage } from './stages.js';
import { adjustHunger } from './hungerAddiction.js';
import { applyPsychDelta } from './psychState.js';

export const DEPTH_TALK_TOPICS = [
  {
    id: 'linger_after',
    label: 'Stay a while',
    icon: '🌙',
    group: 'floor',
    effect: { rel: 4 },
    engineTemplate: '{talk.linger}',
  },
  {
    id: 'notice_room',
    label: 'Comment on her space',
    icon: '🛏',
    group: 'floor',
    effect: { rel: 3 },
    engineTemplate: '{talk.notice_room}',
    dormGate: 'anyFit',
  },
  {
    id: 'midnight_habit',
    label: 'Ask about last night',
    icon: '🔑',
    group: 'floor',
    effect: { rel: 5, corruption: 1 },
    engineTemplate: '{talk.midnight_habit}',
    dormGate: 'habit',
  },
];

export function talkTopicAvailable(topic, student, dormState) {
  if (!topic?.dormGate) return true;
  const fits = dormState?.roomFits?.[student?.id] || {};
  if (topic.dormGate === 'anyFit') return Object.values(fits).some(Boolean);
  if (topic.dormGate === 'habit') return !!dormState?.nightRounds?.habits?.[student?.id];
  return true;
}

export function applyTalkHabitatBonus(effect, student, dormState) {
  const hab = habitatForStudent(student, dormState);
  if (!effect) return effect;
  const next = { ...effect };
  if (next.rel) next.rel += hab.talkRel;
  return next;
}

export function tickHabitatWeek(student, dormState, ownedHallSkills) {
  if (!student || student.hidden) return { student, extraLbs: 0 };
  const hab = habitatForStudent(student, dormState, ownedHallSkills);
  let ns = student;
  const extraLbs = hab.passiveLbs || 0;
  if (hab.weeklyCals) {
    ns = {
      ...ns,
      consumedCalories: (ns.consumedCalories || 0) + hab.weeklyCals,
      fullness: (ns.fullness || 0) + (hab.weeklyFull || 0),
    };
  }
  if (hab.hungerEase) ns = adjustHunger(ns, -hab.hungerEase);
  if (hab.shameEase) {
    ns = { ...ns, psych: applyPsychDelta(ns.psych || {}, { shame: -hab.shameEase }) };
  }
  return { student: ns, extraLbs, gainMult: hab.gainMult, deviceTickMult: hab.deviceTickMult };
}

export function neighborEcologyPatch(students, dormState) {
  if (!students?.length) return {};
  const patches = {};
  students.forEach((s) => {
    if (s.hidden) return;
    const neighbors = neighborStudentIds(students, s.id);
    const myFits = Object.values(dormState?.roomFits?.[s.id] || {}).filter(Boolean).length;
    neighbors.forEach((nid) => {
      const theirs = Object.values(dormState?.roomFits?.[nid] || {}).filter(Boolean).length;
      if (myFits >= 2 && theirs < myFits) {
        patches[nid] = (patches[nid] || 0) - 1;
        patches[s.id] = (patches[s.id] || 0) + 1;
      }
    });
  });
  return patches;
}

export function campusStayHome(student, dormState, rng = Math.random) {
  const fits = Object.values(dormState?.roomFits?.[student?.id] || {}).filter(Boolean).length;
  if (fits < 2) return false;
  const stage = getStage(student.lbs || 0).id;
  const chance = 0.12 + fits * 0.06 + (stage >= 7 ? 0.15 : 0);
  return rng() < Math.min(0.55, chance);
}

export function pantryDropBonus(ownedHallSkills = {}, dormState = {}) {
  const kitchenOwned = (ownedHallSkills.snack_station ? 1 : 0)
    + (ownedHallSkills.artisan_bakery ? 1 : 0)
    + (ownedHallSkills.luxury_pantry ? 1 : 0);
  const fridgeCount = Object.values(dormState.roomFits || {}).filter((f) => f.fridge).length;
  return kitchenOwned + (fridgeCount >= 3 ? 1 : 0);
}

export function sessionCapHabitatBonus(student, dormState, ownedHallSkills) {
  return habitatForStudent(student, dormState, ownedHallSkills).sessionCap || 0;
}

export function deviceTickHabitatMult(student, dormState) {
  return 1 + (habitatForStudent(student, dormState).deviceTickMult || 0);
}
