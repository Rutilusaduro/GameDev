// ═══════════════════════════════════════════════════════════════
// V2.0 HANDLERS — game logic wired from ProfessorSim
// ═══════════════════════════════════════════════════════════════
import {
  canEmbody, startEmbodiment, endEmbodiment, applyEmbodimentAction,
  EMBODIMENT_ACTIONS,
} from './spiritEmbodiment.js';
import {
  canCreateLink, createResonanceLink, pulseResonance, shouldResonanceSurge,
} from './cravingResonance.js';
import { canRunRitual, FEAST_RITUALS } from './feastRituals.js';
import { captureEcho, canResonateEcho, resonateEcho } from './bodyEcho.js';
import { getStage } from '../stages.js';
import {
  canTriggerDream, pickDreamScenario, recordDream, rollWeeklyDreams,
} from './appetiteDreams.js';
import { renderResonanceSurge } from '../../textEngine/scenes/v2/resonance/index.js';
import { createContext } from '../../textEngine/engine.js';

export function resetV2Weekly(v2State) {
  return {
    ...v2State,
    embodiment: {
      ...v2State.embodiment,
      activeStudentId: null,
      usedThisWeek: 0,
    },
  };
}

export function captureStageUpEcho(v2State, studentId, week, stageId) {
  if (!v2State?.echoes) return v2State;
  return {
    ...v2State,
    echoes: captureEcho(v2State.echoes, {
      studentId, type: 'stage_up', week, stageId,
    }),
  };
}

export function captureWeighInEcho(v2State, studentId, week, stageId) {
  if (!v2State?.echoes) return v2State;
  return {
    ...v2State,
    echoes: captureEcho(v2State.echoes, {
      studentId, type: 'weigh_in', week, stageId,
    }),
  };
}

export function captureFeedEcho(v2State, student, week, { forced = false, feast = false } = {}) {
  if (!v2State?.echoes) return v2State;
  const stageId = getStage(student?.lbs || 0).id;
  let type = null;
  if (forced && (student.timesForceFed || 0) <= 1) type = 'first_force_feed';
  else if (feast) type = 'dinner_unbutton';
  if (!type) return v2State;
  return {
    ...v2State,
    echoes: captureEcho(v2State.echoes, {
      studentId: student.id, type, week, stageId,
    }),
  };
}

export function runWeeklyV2Events(v2State, students, ownedSkills, week) {
  let next = resetV2Weekly(v2State);
  const messages = [];

  // Resonance surge
  if (shouldResonanceSurge(next.resonance, week)) {
    next = {
      ...next,
      resonance: { ...next.resonance, lastSurgeWeek: week },
    };
    const ctx = createContext({ group: students.filter((s) => !s.hidden) });
    messages.push({ type: 'surge', text: renderResonanceSurge(ctx) });
  }

  // Weekly dream rolls
  const dreamIds = rollWeeklyDreams(students, next.dreams, ownedSkills, week);
  for (const id of dreamIds) {
    const s = students.find((st) => st.id === id);
    if (!s) continue;
    const scenario = pickDreamScenario(s);
    next = {
      ...next,
      dreams: recordDream(next.dreams, id, week, scenario.id),
    };
    messages.push({ type: 'dream', studentId: id, scenarioId: scenario.id });
  }

  return { v2State: next, messages };
}

export function handleEmbodimentStart(student, ctx) {
  const check = canEmbody(student, ctx);
  if (!check.ok) return { ok: false, reason: check.reason };
  const v2State = startEmbodiment(student.id, ctx.v2State);
  return { ok: true, apCost: check.apCost, v2State };
}

export function handleEmbodimentAction(action, student, v2State) {
  const act = EMBODIMENT_ACTIONS.find((a) => a.id === action.id) || action;
  const v2 = applyEmbodimentAction(v2State, act.id);
  return {
    ok: true,
    v2State: v2,
    calories: act.calories || 0,
    fullness: act.fullness || 0,
    rel: act.rel || 0,
    corruption: act.corruption || 0,
    scrutiny: act.scrutiny || 0,
  };
}

export function handleEmbodimentRelease(v2State) {
  return { ok: true, v2State: endEmbodiment(v2State) };
}

export function handleResonanceLink(aId, bId, students, v2State, ownedSkills, ownedClassSkills) {
  const check = canCreateLink(aId, bId, students, v2State.resonance, ownedSkills, ownedClassSkills);
  if (!check.ok) return { ok: false, reason: check.reason };
  const resonance = createResonanceLink(aId, bId, v2State.resonance);
  return { ok: true, apCost: check.apCost, v2State: { ...v2State, resonance } };
}

export function handleRitual(ritualId, studentIds, ctx) {
  const check = canRunRitual(ritualId, studentIds, ctx);
  if (!check.ok) return { ok: false, reason: check.reason };
  const ritual = check.ritual;
  const effects = studentIds.map((id) => ({
    studentId: id,
    calories: ritual.caloriesEach,
    rel: ritual.relEach,
    corruption: ritual.corruptionEach,
  }));
  const rituals = {
    ...ctx.v2State.rituals,
    completed: {
      ...ctx.v2State.rituals.completed,
      [ritualId]: (ctx.v2State.rituals.completed[ritualId] || 0) + 1,
    },
    lastRitualWeek: ctx.week,
  };
  return {
    ok: true,
    apCost: ritual.apCost,
    effects,
    v2State: { ...ctx.v2State, rituals },
  };
}

export function handleDreamChoice(scenario, choice, student, v2State, week) {
  const dreams = recordDream(v2State.dreams, student.id, week, scenario.id);
  return {
    ok: true,
    calories: choice.calories || 0,
    rel: choice.rel || 0,
    corruption: choice.corruption || 0,
    v2State: { ...v2State, dreams },
  };
}

export function handleEchoResonate(echoId, v2State, ownedSkills, ownedClassSkills) {
  const check = canResonateEcho(v2State.echoes, echoId, ownedSkills, ownedClassSkills);
  if (!check.ok) return { ok: false, reason: check.reason };
  const echoes = resonateEcho(v2State.echoes, echoId);
  return { ok: true, apCost: check.apCost, moment: check.moment, v2State: { ...v2State, echoes } };
}

export function handleFeedResonancePulse(fedStudentId, calories, students, v2State) {
  const { pulses } = pulseResonance(fedStudentId, calories, students, v2State.resonance);
  if (!pulses.length) return { pulses: [], v2State };
  const totalPulses = (v2State.resonance.totalPulses || 0) + pulses.length;
  return {
    pulses,
    v2State: {
      ...v2State,
      resonance: { ...v2State.resonance, totalPulses },
    },
  };
}
