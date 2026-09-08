// The Squad — Lead: A4 Architect | Support: A1 Mobile
// Destiny streaming — V2 depth bridge for live session prose.
import { render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

/** Render a stream template and optionally append V2 live depth. */
export function renderStreamBeat(template, ctx, opts = {}) {
  if (!template || !ctx) return '';
  const base = render(template, ctx, { trace: opts.trace || null })?.trim() || '';
  if (!base) return '';
  const chance = opts.v2DepthChance ?? (opts.chat ? 0.1 : 0.28);
  return appendV2Depth(base, 'stream', ctx, chance);
}

/** Append V2 live depth to already-resolved stream prose. */
export function renderStreamProse(text, ctx, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line || !ctx) return line;
  const chance = opts.v2DepthChance ?? 0.24;
  return appendV2Depth(line, 'stream', ctx, chance);
}
