import { renderWeeklyEvent, weeklyEventHasModularText } from '../textEngine/scenes/weeklyEvent/index.js';

export function narrativeEventText(event, student, opts = {}) {
  return renderWeeklyEvent(event.id, student, {
    ...opts,
    eventKind: 'narrative',
    legacyText: typeof event.text === 'function' ? event.text : null,
  });
}

export function randomEventText(event, student, opts = {}) {
  return renderWeeklyEvent(event.id, student, {
    ...opts,
    eventKind: 'random',
    targetType: event.target || 'single',
    legacyText: typeof event.text === 'function' ? event.text : null,
  });
}

export { weeklyEventHasModularText };
