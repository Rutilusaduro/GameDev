// The Squad — Lead: A2 Psych | Support: A4 Architect
// Hall kitchen queen — engine bridge from HOMEROOM_* legacy prose.
import { render, registerModuleVariants } from '../../engine.js';
import { buildTextContext, wrapLeftoverLinger } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { registerPool } from '../../engine.js';
import { homeroomTailBeat } from '../evolved/proseTails.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';
import { HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES, BATCH_BAKER_NPCS } from '../../../gameData/homeroomEvents.js';
import './batchBakerPools.js';

const SAMPLE_HOMEROOM_DAISY = { id: 13, name: 'Daisy', lbs: 210, archetype: 'homeroom_queen' };

function resolveHomeroomProse(prose) {
  if (typeof prose === 'function') {
    try {
      return String(prose(SAMPLE_HOMEROOM_DAISY)).trim();
    } catch {
      try {
        return String(prose()).trim();
      } catch {
        return '';
      }
    }
  }
  return (prose || '').trim();
}

function registerHomeroomBeat(poolKey, prose) {
  const text = resolveHomeroomProse(prose);
  if (!text) return;
  const bodyKey = `${poolKey}.body`;
  registerDecomposedPool(bodyKey, text);
  registerPool(poolKey, [
    {
      when: legacyBridgeWhen(),
      weight: 3,
      text: [
        (ctx) => {
          const line = render(`{${bodyKey}}`, ctx)?.trim();
          return line && !line.includes('{unresolved}') ? line : text;
        },
        homeroomTailBeat(poolKey, 0),
        homeroomTailBeat(poolKey, 1),
      ],
    },
    lintWildcardVariant('{homeroom.scene.floorTone|prefix:} {homeroom.scene.raStance|prefix: }'),
  ]);
}

for (const [key, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  if (ev.text) registerHomeroomBeat(`homeroom.conference.${key}.intro`, ev.text);
  for (const ch of ev.choices || []) {
    if (ch.result) registerHomeroomBeat(`homeroom.conference.${key}.${ch.id}`, ch.result);
  }
}

for (const [actKey, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  const phases = act.phases || [{ text: act.text, choices: act.choices || [] }];
  phases.forEach((phase, pi) => {
    if (phase.text) registerHomeroomBeat(`homeroom.activity.${actKey}.p${pi}`, phase.text);
    for (const ch of phase.choices || []) {
      if (ch.result) registerHomeroomBeat(`homeroom.activity.${actKey}.p${pi}.${ch.id}`, ch.result);
    }
  });
}

function buildHomeroomCtx(daisyStudent, week, opts = {}) {
  const { globals: extraGlobals, v2DepthChance: _v2, ...rest } = opts;
  return buildTextContext({
    subject: daisyStudent,
    week,
    ...rest,
    globals: { featureId: 'homeroom_queen', ...(extraGlobals || {}) },
  });
}

function composedHomeroomKey(poolKey) {
  if (!poolKey) return null;
  if (poolKey.includes('.intro') || /^homeroom\.activity\.[^.]+\.p\d+$/.test(poolKey)) {
    return poolKey.startsWith('homeroom.conference')
      ? 'homeroom.conference.scene'
      : 'homeroom.activity.scene';
  }
  return 'homeroom.result.scene';
}

/** Render a registered homeroom pool key with V2 depth. Prefer composed scenes. */
export function renderHomeroomPool(poolKey, daisyStudent, week = 1, opts = {}) {
  if (!poolKey || !daisyStudent) return '';
  const ctx = buildHomeroomCtx(daisyStudent, week, opts);
  try {
    const composedKey = composedHomeroomKey(poolKey);
    if (composedKey) {
      const composed = render(`{${composedKey}}`, ctx)?.trim();
      if (composed && !composed.includes('{unresolved}')) {
        return appendV2Depth(composed, 'homeroom', ctx, opts.v2DepthChance ?? 0.28);
      }
    }
    const line = render(`{${poolKey}}`, ctx)?.trim();
    if (!line || line.includes('{unresolved}')) return '';
    const intro = /\.intro$/.test(poolKey) || /^homeroom\.activity\.[^.]+\.p\d+$/.test(poolKey);
    const glow = intro ? (render('{homeroom.afterglow}', ctx)?.trim() || '') : '';
    const linger = render('{homeroom.linger}', ctx)?.trim() || '';
    return appendV2Depth([line, glow, linger].filter(Boolean).join('\n\n'), 'homeroom', ctx, opts.v2DepthChance ?? 0.28);
  } catch {
    return '';
  }
}

/** Hall kitchen queen prose beat — V2 depth on legacy text (fallback). */
export function renderHomeroomProse(text, daisyStudent, week = 1, opts = {}) {
  if (!text?.trim()) return '';
  const ctx = buildHomeroomCtx(daisyStudent, week, opts);
  const base = text.trim();
  return wrapLeftoverLinger(appendV2Depth(base, 'homeroom', ctx, opts.v2DepthChance ?? 0.28), daisyStudent, week, 'homeroom.linger');
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

/** Batch-baker NPC stage blurb (card snippet or full measurement reveal). */
export function renderHomeroomNpcDesc(npcKey, stageIdx, daisyStudent, week = 1, opts = {}) {
  if (!npcKey || !daisyStudent) return '';
  const stageMap = BATCH_BAKER_NPCS[npcKey];
  if (!stageMap) return '';
  const maxStage = Math.max(0, ...Object.keys(stageMap).map((k) => Number(k)));
  const si = Math.min(Math.max(0, stageIdx), maxStage);
  const legacy = stageMap[si] || '';
  const ctx = buildHomeroomCtx(daisyStudent, week, {
    globals: { npcKey, npcStage: si, snippetOnly: !!opts.snippetOnly },
  });
  try {
    const line = render(`{homeroom.npc.${npcKey}.s${si}}`, ctx)?.trim();
    const base = line && !line.includes('{unresolved}') ? line : legacy;
    if (!base) return '';
    const out = appendV2Depth(base, 'homeroom', ctx, opts.v2DepthChance ?? 0.18);
    if (opts.snippetOnly) {
      return (out.split(/(?<=[.!?])\s+/)[0] || out).trim();
    }
    return out;
  } catch {
    return legacy;
  }
}
