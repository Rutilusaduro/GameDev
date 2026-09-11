// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Body portrait prose — render helper for body.portrait pools.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { createContext } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './portraits.js';
import './portraitDepth.js';
import './portraitUpgrade.js';
import './depth.js';

function renderRichFallback(student, week) {
  const ctx = createContext({ subject: student, week });
  return render('{word.body|cap}, {word.clothingFit}.', ctx)?.trim() || '';
}

/** Stage- and body-type-keyed portrait line (migrated from BODY_DESCS). */
export function renderBodyPortrait(student, week = 1, opts = {}) {
  if (!student) return '';
  if (student.bodyOverride?.stateType || student.bodyOverride?.bodyTypeOverride) {
    return renderRichFallback(student, week);
  }
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const depthLine = render('{body.portrait.depth}', ctx, { trace: opts.trace || null });
  if (depthLine?.trim() && !depthLine.includes('{unresolved}')) {
    return appendV2Depth(depthLine.trim(), 'body', ctx, opts.v2DepthChance ?? 0.25);
  }
  const line = render('{body.portrait}', ctx, { trace: opts.trace || null });
  const base = line?.trim() || renderRichFallback(student, week);
  return appendV2Depth(base, 'body', ctx, opts.v2DepthChance ?? 0.25);
}
