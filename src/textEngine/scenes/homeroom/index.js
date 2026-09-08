// The Squad — Lead: A2 Psych | Support: A4 Architect
// Homeroom Queen — engine bridge from HOMEROOM_* legacy prose.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES } from '../../../gameData/evolvedForms.js';

for (const [key, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  if (ev.text) registerDecomposedPool(`homeroom.conference.${key}.intro`, ev.text);
  for (const ch of ev.choices || []) {
    if (typeof ch.result === 'string' && ch.result) {
      registerDecomposedPool(`homeroom.conference.${key}.${ch.id}`, ch.result);
    }
  }
}

for (const [actKey, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  const phases = act.phases || [{ text: act.text, choices: act.choices || [] }];
  phases.forEach((phase, pi) => {
    if (phase.text) registerDecomposedPool(`homeroom.activity.${actKey}.p${pi}`, phase.text);
    for (const ch of phase.choices || []) {
      if (typeof ch.result === 'string' && ch.result) {
        registerDecomposedPool(`homeroom.activity.${actKey}.p${pi}.${ch.id}`, ch.result);
      }
    }
  });
}

function buildHomeroomCtx(daisyStudent, week, opts = {}) {
  return buildTextContext({
    subject: daisyStudent,
    week,
    globals: { featureId: 'homeroom_queen', ...(opts.globals || {}) },
    ...opts,
  });
}

/** Render a registered homeroom pool key with V2 depth. */
export function renderHomeroomPool(poolKey, daisyStudent, week = 1, opts = {}) {
  if (!poolKey || !daisyStudent) return '';
  const ctx = buildHomeroomCtx(daisyStudent, week, opts);
  try {
    const line = render(`{${poolKey}}`, ctx)?.trim();
    if (!line || line.includes('{unresolved}')) return '';
    return appendV2Depth(line, 'homeroom', ctx, opts.v2DepthChance ?? 0.28);
  } catch {
    return '';
  }
}

/** Homeroom Queen prose beat — V2 depth on legacy text (fallback). */
export function renderHomeroomProse(text, daisyStudent, week = 1, opts = {}) {
  if (!text?.trim()) return '';
  const ctx = buildHomeroomCtx(daisyStudent, week, opts);
  const base = text.trim();
  return appendV2Depth(base, 'homeroom', ctx, opts.v2DepthChance ?? 0.28);
}

/** Pool key for conference intro or choice result. */
export function homeroomConferencePoolKey(npcKey, choiceId = null) {
  if (!npcKey) return null;
  return choiceId
    ? `homeroom.conference.${npcKey}.${choiceId}`
    : `homeroom.conference.${npcKey}.intro`;
}

/** Pool key for group activity phase or choice result. */
export function homeroomActivityPoolKey(actKey, phaseIdx = 0, choiceId = null) {
  if (!actKey) return null;
  return choiceId
    ? `homeroom.activity.${actKey}.p${phaseIdx}.${choiceId}`
    : `homeroom.activity.${actKey}.p${phaseIdx}`;
}
