// The Squad — Lead: A4 Architect | Support: A2 Psych
// Evolved forms — engine bridge from EVOLVED_EVENTS legacy prose.
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

/** Evolved event prose beat — V2 depth on legacy phase/choice/ending text. */
export function renderEvolvedEventProse(text, student, week = 1, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: opts.formId || student?.evolvedForm || 'evolved',
      stageIdx: opts.stageIdx ?? null,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  return appendV2Depth(line, 'evolved', ctx, opts.v2DepthChance ?? 0.3);
}
