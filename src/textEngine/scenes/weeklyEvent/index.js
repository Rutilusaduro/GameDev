// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — render API for per-girl stage-up narrative beats
// (The hall-wide random-incident layer was removed with RANDOM_EVENTS.)
// ═══════════════════════════════════════════════════════════════
import { createContext, render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { getStage } from '../../../gameData/stages.js';
import '../../modules.js';
import './chairIncident.js';
import './teamWeighIn.js';
import './narrativeEvents.js';

const POOL_BY_EVENT_ID = {
  uniform_split: 'weekly.uniform_split',
  chair_breaks: 'weekly.chair_breaks',
  viral_post: 'weekly.viral_post',
  thesis_rewrite: 'weekly.thesis_rewrite',
  gaming_sponsor: 'weekly.gaming_sponsor',
  intervention_fails: 'weekly.intervention_fails',
  art_exhibition: 'weekly.art_exhibition',
  team_weigh_in: 'weekly.team_weigh_in',
  quiet_opens_up: 'weekly.quiet_opens_up',
  overachiever_pivot: 'weekly.overachiever_pivot',
  transfer_settled: 'weekly.transfer_settled',
  custom_clothing: 'weekly.custom_clothing',
  immobility_peace: 'weekly.immobility_peace',
  blob_ending: 'weekly.blob_ending',
};

export function buildWeeklyEventGlobals(student, eventId, opts = {}) {
  const endStage = getStage(student?.lbs ?? 130).id;
  const startLbs = student?.startLbs ?? student?.lbs ?? 130;
  return {
    eventId,
    endStage,
    startStage: getStage(startLbs).id,
    semesterGainLbs: Math.max(0, Math.round((student?.lbs ?? startLbs) - startLbs)),
    eventKind: opts.eventKind || 'narrative',
    targetType: opts.targetType || 'single',
    week: opts.week ?? 1,
  };
}

export function renderWeeklyEvent(eventId, student, opts = {}) {
  const poolKey = POOL_BY_EVENT_ID[eventId];
  if (!poolKey) {
    return opts.legacyText?.(student) ?? '';
  }
  const ctx = createContext({
    subject: student,
    week: opts.week ?? 1,
    globals: buildWeeklyEventGlobals(student, eventId, opts),
  });
  const base = render(`{${poolKey}}`, ctx, { trace: opts.trace });
  return appendV2Depth(base, 'weekly', ctx, opts.v2DepthChance ?? 0.3);
}

export function weeklyEventHasModularText(eventId) {
  return !!POOL_BY_EVENT_ID[eventId];
}
