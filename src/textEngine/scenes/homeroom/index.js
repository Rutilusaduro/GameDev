// The Squad — Lead: A2 Psych | Support: A4 Architect
// Homeroom Queen — engine bridge from HOMEROOM_* legacy prose.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES } from '../../../gameData/evolvedForms.js';

const FRAG_MAX = 200;

/** Split long prose into ≤200-char fragments for pool lint compliance. */
function splitProseFragments(text) {
  const trimmed = (text || '').trim();
  if (!trimmed) return [];
  if (trimmed.length <= FRAG_MAX) return [trimmed];

  const chunks = [];
  const push = (s) => {
    const t = s.trim();
    if (t) chunks.push(t);
  };

  const splitLong = (para) => {
    if (para.length <= FRAG_MAX) {
      push(para);
      return;
    }
    const sentences = para.split(/(?<=[.!?])\s+/);
    let buf = '';
    for (const sent of sentences) {
      const piece = sent.trim();
      if (!piece) continue;
      if (piece.length > FRAG_MAX) {
        if (buf) { push(buf); buf = ''; }
        let remaining = piece;
        while (remaining.length > FRAG_MAX) {
          let cut = remaining.lastIndexOf(' ', FRAG_MAX);
          if (cut < FRAG_MAX * 0.45) cut = FRAG_MAX;
          push(remaining.slice(0, cut).trim());
          remaining = remaining.slice(cut).trim();
        }
        if (remaining) buf = remaining;
      } else if ((`${buf} ${piece}`).trim().length <= FRAG_MAX) {
        buf = buf ? `${buf} ${piece}` : piece;
      } else {
        push(buf);
        buf = piece;
      }
    }
    if (buf) push(buf);
  };

  for (const para of trimmed.split(/\n\n+/)) {
    splitLong(para.trim());
  }
  return chunks;
}

function registerDecomposedPool(poolKey, text) {
  const fragments = splitProseFragments(text);
  if (!fragments.length) return;
  if (fragments.length === 1) {
    registerPool(poolKey, [{ when: {}, text: fragments }]);
    return;
  }
  const skeleton = fragments.map((_, i) => `{${poolKey}.f${i}}`).join('\n\n');
  fragments.forEach((frag, i) => {
    registerPool(`${poolKey}.f${i}`, [{ when: {}, text: [frag] }]);
  });
  registerPool(poolKey, [{ when: {}, text: [skeleton] }]);
}

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
