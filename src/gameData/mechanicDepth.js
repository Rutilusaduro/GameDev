// ═══════════════════════════════════════════════════════════════
// MECHANIC DEPTH — extra states, choices, and weekly ticks that
// sit on top of talk / feed / session / dinner / campus / devices
// / hunger / relationship without forking those files into new
// systems. Habitat bonuses come from dormBlueprint.js.
// ═══════════════════════════════════════════════════════════════
import { habitatForStudent, neighborStudentIds, roomCompletion, studentFits } from './dormBlueprint.js';
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
  if (hab.discontentEase) {
    ns = { ...ns, discontent: Math.max(0, (ns.discontent || 0) - hab.discontentEase) };
  }
  return { student: ns, extraLbs, gainMult: hab.gainMult, deviceTickMult: hab.deviceTickMult };
}

/** Cross-system habitat readout — lounge rooms + per-door fit-outs + night rounds. */
export function habitatFx(student, dormState, ownedHallSkills = {}) {
  const hab = habitatForStudent(student, dormState, ownedHallSkills);
  const fits = studentFits(dormState, student?.id);
  const nr = dormState?.nightRounds || {};
  const kitchen = roomCompletion('kitchen', ownedHallSkills);
  const annex = roomCompletion('annex', ownedHallSkills);
  const terrace = roomCompletion('terrace', ownedHallSkills);
  const desk = roomCompletion('ra_desk', ownedHallSkills);
  const lounge = roomCompletion('lounge', ownedHallSkills);
  const dining = roomCompletion('dining', ownedHallSkills);
  const habit = nr.habits?.[student?.id];
  return {
    ...hab,
    scrutinyEase: annex.owned + (nr.floorIntimacy >= 50 ? 1 : 0) + (desk.owned >= 2 ? 1 : 0),
    malfRiskMult: fits.outlets ? 0.72 : 1,
    hungerInterruptEase:
      (fits.fridge ? 0.22 : 0)
      + (fits.snacks ? 0.12 : 0)
      + (habit === 'midnight_snack' ? 0.18 : 0),
    intimacyRel: fits.bed ? 2 : 0,
    intimacyLbs: fits.bed ? 1 : 0,
    streamLbs: fits.lighting ? 1 : 0,
    campusFindBonus: terrace.owned >= 1 ? 1 : 0,
    evolvedLbs: lounge.owned >= 2 && student?.evolvedForm ? 1 : 0,
    plannerAp: desk.owned >= 2 ? 1 : 0,
    pharmacistYield: kitchen.owned >= 2 ? 1 : 0,
    diningConvBonus: dining.owned >= 2 ? 1 : 0,
    mysteryNudge: Math.min(8, Math.floor((nr.floorIntimacy || 0) / 12) + annex.owned),
  };
}

export function shouldSkipHungerInterrupt(student, dormState, weeklyArms = {}, rng = Math.random) {
  if (!student) return false;
  if (weeklyArms?.devouringStudentId === student.id && !weeklyArms?.devouringConsumed) return false;
  const fx = habitatFx(student, dormState);
  return fx.hungerInterruptEase > 0 && rng() < Math.min(0.55, fx.hungerInterruptEase);
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
