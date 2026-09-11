// The Squad — Lead: A4 Architect | Support: A2 Psych
// Evolved forms — engine bridge from EVOLVED_EVENTS legacy prose.
import { buildTextContext } from '../../../gameData/textContext.js';
import { render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

/** Evolved form → optional second depth pool appended after evolved.v2.depth */
const EVOLVED_FORM_POOLS = {
  salon_appetit: 'evolved.salon.v2.depth',
  artisan_gallery: 'evolved.gallery.v2.depth',
  cultivator: 'evolved.cultivator.v2.depth',
  feedee_creator: 'evolved.feedee.v2.depth',
  machine_goddess: 'evolved.machine.v2.depth',
  pharmacist: 'evolved.pharmacist.v2.depth',
  competitive_gainer: 'evolved.gainer.v2.depth',
  homeroom_queen: 'evolved.homeroomQueen.v2.depth',
};

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
  const chance = opts.v2DepthChance ?? 0.3;
  let out = appendV2Depth(line, 'evolved', ctx, chance);
  const formId = opts.formId || student?.evolvedForm;
  const formPool = EVOLVED_FORM_POOLS[formId];
  if (formPool && out?.trim() && Math.random() < chance * 0.85) {
    const extra = render(`{${formPool}}`, ctx)?.trim();
    if (extra) out = `${out}\n\n${extra}`;
  }
  if (out?.trim() && Math.random() < chance * 0.55) {
    const linger = render('{overhaul.linger.evolved}', ctx)?.trim();
    if (linger) out = `${out} ${linger}`;
  }
  return out;
}
