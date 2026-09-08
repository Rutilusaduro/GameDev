// The Squad — Lead: A2 Psych | Support: A4 Architect
// Homeroom Queen — engine bridge from HOMEROOM_* legacy prose.
import { registerPool } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES } from '../../../gameData/evolvedForms.js';

for (const [key, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  if (ev.text) {
    registerPool(`homeroom.conference.${key}.intro`, [{ when: {}, text: [ev.text] }]);
  }
  for (const ch of ev.choices || []) {
    if (typeof ch.result === 'string' && ch.result) {
      registerPool(`homeroom.conference.${key}.${ch.id}`, [{ when: {}, text: [ch.result] }]);
    }
  }
}

for (const [actKey, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  const phases = act.phases || [{ text: act.text, choices: act.choices || [] }];
  phases.forEach((phase, pi) => {
    if (phase.text) {
      registerPool(`homeroom.activity.${actKey}.p${pi}`, [{ when: {}, text: [phase.text] }]);
    }
    for (const ch of phase.choices || []) {
      if (typeof ch.result === 'string' && ch.result) {
        registerPool(`homeroom.activity.${actKey}.p${pi}.${ch.id}`, [{ when: {}, text: [ch.result] }]);
      }
    }
  });
}

/** Homeroom Queen prose beat — V2 depth on legacy conference/activity text. */
export function renderHomeroomProse(text, daisyStudent, week = 1, opts = {}) {
  if (!text?.trim()) return '';
  const ctx = buildTextContext({
    subject: daisyStudent,
    week,
    globals: { featureId: 'homeroom_queen', ...(opts.globals || {}) },
    ...opts,
  });
  const base = text.trim();
  return appendV2Depth(base, 'homeroom', ctx, opts.v2DepthChance ?? 0.28);
}
