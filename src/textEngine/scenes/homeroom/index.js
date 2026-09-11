// The Squad — Lead: A2 Psych | Support: A4 Architect
// Hall kitchen queen — engine bridge from HOMEROOM_* legacy prose.
import { render, registerModuleVariants } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
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

registerModuleVariants('homeroom.activity.parent_meeting.p0.leftover_trays', [
  { when: {}, text: [
    `Foil from last night hits the table. Mrs. Monroe is eating before plates exist. Mrs. Calloway asks if Daisy packed extra. Daisy packed extra.`,
    `The tasting is leftovers with better lighting. Mrs. Reyes takes seconds standing up. The agenda stays in the folder.`,
  ]},
]);

registerModuleVariants('homeroom.activity.leftover_tuesday.p0', [
  { when: {}, text: [
    `Warm trays, no syllabus. Daisy sets the lounge like a second dinner and lets the floor find it.`,
    `Last night's galley still smells like butter. Residents sit without being asked. Forks already know the job.`,
  ]},
]);

registerModuleVariants('homeroom.activity.leftover_tuesday.p0.open_table', [
  { when: {}, text: [
    `Nobody waits for serving spoons. Daisy watches belts lose an argument they already knew they would lose.`,
    `The foil comes off in a hurry. Conversation drops to chewing. Daisy keeps the empty trays coming.`,
  ]},
]);

registerModuleVariants('homeroom.activity.leftover_tuesday.p0.seconds_first', [
  { when: {}, text: [
    `She plates the next round while mouths are still full. Someone protests and then holds out a dish.`,
    `Firsts never finish. Daisy planned that. The second tray is heavier than the first.`,
  ]},
]);

registerModuleVariants('homeroom.activity.leftover_tuesday.p0.send_home', [
  { when: {}, text: [
    `Lids snap. Bags leave heavy. Daisy keeps one tray for whoever wanders back after dark.`,
    `Moms take containers like they paid tuition for them. Tuesday continues in other kitchens.`,
  ]},
]);
