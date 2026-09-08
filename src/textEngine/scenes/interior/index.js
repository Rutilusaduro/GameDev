// The Squad — Lead: A2 Psych | Support: A5 Editor
// Interior monologue render API.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './selfObs.js';
import './sizeRealize.js';
import './gainPride.js';
import './personas.js';

/** Embeddable interior self-observation beat with V2 psych depth. */
export function renderInteriorSelfObs(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{interior.selfObs}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'psych', ctx, opts.v2DepthChance ?? 0.22);
}
