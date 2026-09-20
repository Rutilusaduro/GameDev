// Replay prose for dossier pinned moments (on-demand when excerpt wasn't cached).
import { GATEWAY_MOMENTS } from './gatewayMoments.js';
import { NARRATIVE_EVENTS } from './weeklyEventDefs.js';
import { narrativeEventText } from './weeklyEventText.js';
import { renderMilestone } from '../textEngine/scenes/milestone/index.js';
import { renderAscensionCeremony } from '../textEngine/scenes/ascension/index.js';
import { renderMemoryCallback } from '../textEngine/scenes/memory/index.js';
import { pinLabel } from './dossier.js';
import { depthDossierReplayDepthChance } from './mechanicsDepthLayer.js';

export function replayStudentAtWeek(student, pinWeek) {
  const snap = (student?.dossierSnapshots || []).find((s) => s.week === pinWeek);
  if (!snap) return student;
  return { ...student, lbs: snap.lbs };
}

/** Generate readable replay text for a pinned moment. */
export function resolvePinExcerpt(student, pin, currentWeek = 1) {
  if (!student || !pin) return '';
  if (pin.excerpt?.trim()) return pin.excerpt.trim();

  const week = pin.week ?? currentWeek;
  const replay = replayStudentAtWeek(student, week);
  const weeksAgo = Math.max(0, (currentWeek || week) - week);
  const replayDepth = depthDossierReplayDepthChance(weeksAgo);

  switch (pin.kind) {
    case 'stageUp':
      return renderMilestone(replay, week)?.trim() || pinLabel('stageUp', week, pin.ref, student);

    case 'narrative': {
      const ev = NARRATIVE_EVENTS.find((e) => e.id === pin.ref);
      if (!ev) return pin.label || '';
      return narrativeEventText(ev, replay, { week, currentWeek, v2DepthChance: replayDepth })?.trim() || pin.label || '';
    }

    case 'gateway': {
      const gate = GATEWAY_MOMENTS.find((g) => g.flag === pin.ref);
      if (gate?.eventId) {
        const ev = NARRATIVE_EVENTS.find((e) => e.id === gate.eventId);
        if (ev) return narrativeEventText(ev, replay, { week, currentWeek, v2DepthChance: replayDepth })?.trim() || '';
      }
      return `A private threshold — the kind of beat her diary was waiting for. Week ${week}.`;
    }

    case 'ascended':
      return renderAscensionCeremony(replay, week)?.trim()
        || `She crossed into something new. Week ${week}.`;

    case 'feast':
    case 'forced':
      return renderMemoryCallback(replay, week, {
        memScope: 'sameWeek',
        memType: pin.kind,
        memWeeksAgo: weeksAgo,
        v2DepthChance: replayDepth,
      })?.trim() || pin.label || '';

    case 'stuffed':
    case 'scaleBreak':
    case 'bondShift':
      return renderMemoryCallback(replay, week, {
        memScope: 'longArc',
        memType: pin.kind,
        memWeeksAgo: weeksAgo,
        memValue: pin.ref,
        v2DepthChance: replayDepth,
      })?.trim() || pin.label || '';

    case 'garment':
      return `The ${pin.ref || 'garment'} finally gave way under her — week ${week}, and she kept growing anyway.`;

    case 'player':
      return pin.excerpt || '';

    default:
      return pin.label || pinLabel(pin.kind, week, pin.ref, student);
  }
}
