// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Body portrait prose — render helper for body.portrait pools.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { createContext } from '../../engine.js';
import './portraits.js';

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
  const line = render('{body.portrait}', ctx, { trace: opts.trace || null });
  return line?.trim() || renderRichFallback(student, week);
}
