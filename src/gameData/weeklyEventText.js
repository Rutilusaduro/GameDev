import { renderWeeklyEvent, weeklyEventHasModularText } from '../textEngine/scenes/weeklyEvent/index.js';
import { depthDossierReplayDepthChance } from './mechanicsDepthLayer.js';

export function narrativeEventText(event, student, opts = {}) {
  const week = opts.week ?? 1;
  const currentWeek = opts.currentWeek ?? week;
  const weeksAgo = Math.max(0, currentWeek - week);
  const v2DepthChance = opts.v2DepthChance ?? depthDossierReplayDepthChance(weeksAgo);
  return renderWeeklyEvent(event.id, student, {
    ...opts,
    eventKind: 'narrative',
    legacyText: typeof event.text === 'function' ? event.text : null,
    v2DepthChance,
  });
}

export { weeklyEventHasModularText };
