// The Squad — Lead: A2 Psych | Support: A4 Architect
// Unified feed-moment voice — hunger + corruption interior beats.
import { render } from '../../engine.js';
import { buildTextContext, wrapLeftoverLinger } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './hungerVoice.js';
import '../corruptionVoice.js';
import '../hungerInterruptPersonal.js';

/** Inner monologue + physical hunger beat during any feed moment. */
export function renderFeedVoice(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const personal = render('{scene.hungerInterrupt.personal}', ctx, { noSmooth: true })?.trim();
  const line = render('{feed.voice}', ctx, { trace: opts.trace || null, noSmooth: true });
  const voice = line?.trim() || '';
  const combined = personal && voice ? `${personal} ${voice}` : personal || voice;
  const withDepth = appendV2Depth(combined, 'feedVoice', ctx, opts.v2DepthChance ?? 0.28);
  return wrapLeftoverLinger(withDepth, student, week, 'feed.linger');
}

/** Physical sensation clause only (fullness/hunger body). */
export function renderHungerPhysical(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{hunger.physical}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'feedVoice', ctx, opts.v2DepthChance ?? 0.25);
}
