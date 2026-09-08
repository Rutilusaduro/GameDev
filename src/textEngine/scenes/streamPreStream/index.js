// ═══════════════════════════════════════════════════════════════
// DESTINY STREAM — pre-stream vignettes (stage-bucketed, composed)
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import '../streamPreStreamBrand.js';

registerPool('stream.pre.outfit.casual', [
  { when: {}, text: [
    '{stream.pre.outfit.casual.c1} {stream.pre.outfit.casual.c2} {stream.pre.outfit.casual.c3}\n\n{stream.pre.outfit.casual.line}',
    '{stream.pre.outfit.casual.c2} {stream.pre.outfit.casual.c3}\n\n{stream.pre.outfit.casual.c1}\n\n{stream.pre.outfit.casual.line}',
    '{stream.pre.outfit.casual.c1}\n\n{stream.pre.outfit.casual.c2} {stream.pre.outfit.casual.c3}\n\n{stream.pre.outfit.casual.line}',
  ] },
]);

registerPool('stream.pre.outfit.revealing', [
  { when: {}, text: [
    '{stream.pre.outfit.revealing.c1} {stream.pre.outfit.revealing.c2}\n\n{stream.pre.outfit.revealing.line}',
    '{stream.pre.outfit.revealing.c2}\n\n{stream.pre.outfit.revealing.c1}\n\n{stream.pre.outfit.revealing.line}',
    '{stream.pre.outfit.revealing.c1}\n\n{stream.pre.outfit.revealing.line}\n\n{stream.pre.outfit.revealing.c2}',
  ] },
]);

registerPool('stream.pre.outfit.branded', [
  { when: {}, text: [
    '{stream.pre.outfit.branded.c1}\n\n{stream.pre.outfit.branded.line}',
    '{stream.pre.outfit.branded.line}\n\n{stream.pre.outfit.branded.c1}',
    '{stream.pre.outfit.branded.c1} {stream.pre.outfit.branded.line}',
  ] },
]);

registerPool('stream.pre.bodyCheck.quick', [
  { when: {}, text: [
    '{stream.pre.bodyCheck.quick.c1}\n\n{stream.pre.bodyCheck.quick.line}',
    '{stream.pre.bodyCheck.quick.line}\n\n{stream.pre.bodyCheck.quick.c1}',
    '{stream.pre.bodyCheck.quick.c1} {stream.pre.bodyCheck.quick.line}',
  ] },
]);

registerPool('stream.pre.bodyCheck.thorough', [
  { when: {}, text: [
    '{stream.pre.bodyCheck.thorough.c1} {stream.pre.bodyCheck.thorough.c2}\n\n{stream.pre.bodyCheck.thorough.line}',
    '{stream.pre.bodyCheck.thorough.c2} {stream.pre.bodyCheck.thorough.c1}\n\n{stream.pre.bodyCheck.thorough.line}',
    '{stream.pre.bodyCheck.thorough.c1}\n\n{stream.pre.bodyCheck.thorough.line}\n\n{stream.pre.bodyCheck.thorough.c2}',
  ] },
]);

registerPool('stream.pre.bodyCheck.showoff', [
  { when: {}, text: [
    '{stream.pre.bodyCheck.showoff.c1} {stream.pre.bodyCheck.showoff.c2}\n\n{stream.pre.bodyCheck.showoff.line}',
    '{stream.pre.bodyCheck.showoff.c2}\n\n{stream.pre.bodyCheck.showoff.c1}\n\n{stream.pre.bodyCheck.showoff.line}',
    '{stream.pre.bodyCheck.showoff.c1}\n\n{stream.pre.bodyCheck.showoff.line}',
  ] },
]);

registerPool('stream.pre.snack.skip', [
  { when: {}, text: [
    '{stream.pre.snack.skip.c1}\n\n{stream.pre.snack.skip.line}',
    '{stream.pre.snack.skip.line}\n\n{stream.pre.snack.skip.c1}',
    '{stream.pre.snack.skip.c1} {stream.pre.snack.skip.line}',
  ] },
]);

registerPool('stream.pre.snack.light', [
  { when: {}, text: [
    '{stream.pre.snack.light.c1} {stream.pre.snack.light.c2}\n\n{stream.pre.snack.light.line}',
    '{stream.pre.snack.light.c2} {stream.pre.snack.light.c1}\n\n{stream.pre.snack.light.line}',
    '{stream.pre.snack.light.c1}\n\n{stream.pre.snack.light.line}',
  ] },
]);

registerPool('stream.pre.snack.heavy', [
  { when: {}, text: [
    '{stream.pre.snack.heavy.c1} {stream.pre.snack.heavy.c2}\n\n{stream.pre.snack.heavy.line}',
    '{stream.pre.snack.heavy.c2} {stream.pre.snack.heavy.c1}\n\n{stream.pre.snack.heavy.line}',
    '{stream.pre.snack.heavy.c1}\n\n{stream.pre.snack.heavy.line}',
  ] },
]);

registerPool('stream.pre.warmup.skip', [
  { when: {}, text: [
    '{stream.pre.warmup.skip.c1}\n\n{stream.pre.warmup.skip.line}',
    '{stream.pre.warmup.skip.line}\n\n{stream.pre.warmup.skip.c1}',
    '{stream.pre.warmup.skip.c1} {stream.pre.warmup.skip.line}',
  ] },
]);

registerPool('stream.pre.warmup.stretch', [
  { when: {}, text: [
    '{stream.pre.warmup.stretch.c1}\n\n{stream.pre.warmup.stretch.line}',
    '{stream.pre.warmup.stretch.line}\n\n{stream.pre.warmup.stretch.c1}',
    '{stream.pre.warmup.stretch.c1} {stream.pre.warmup.stretch.line}',
  ] },
]);

registerPool('stream.pre.warmup.eat', [
  { when: {}, text: [
    '{stream.pre.warmup.eat.c1}\n\n{stream.pre.warmup.eat.line}',
    '{stream.pre.warmup.eat.line}\n\n{stream.pre.warmup.eat.c1}',
    '{stream.pre.warmup.eat.c1} {stream.pre.warmup.eat.line}',
  ] },
]);

registerPool('stream.pre.setup.minimal', [
  { when: {}, text: [
    '{stream.pre.setup.minimal.c1}\n\n{stream.pre.setup.minimal.line}',
    '{stream.pre.setup.minimal.line}\n\n{stream.pre.setup.minimal.c1}',
    '{stream.pre.setup.minimal.c1} {stream.pre.setup.minimal.line}',
  ] },
]);

registerPool('stream.pre.setup.comfort', [
  { when: {}, text: [
    '{stream.pre.setup.comfort.c1}\n\n{stream.pre.setup.comfort.line}',
    '{stream.pre.setup.comfort.line}\n\n{stream.pre.setup.comfort.c1}',
    '{stream.pre.setup.comfort.c1} {stream.pre.setup.comfort.line}',
  ] },
]);

registerPool('stream.pre.setup.production', [
  { when: {}, text: [
    '{stream.pre.setup.production.c1}\n\n{stream.pre.setup.production.line}',
    '{stream.pre.setup.production.line}\n\n{stream.pre.setup.production.c1}',
    '{stream.pre.setup.production.c1} {stream.pre.setup.production.line}',
  ] },
]);

export function renderPreStreamVignette(actionId, choiceId, ctx, opts = {}) {
  if (!actionId || !choiceId || !ctx) return '';
  const base = render(`{stream.pre.${actionId}.${choiceId}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'streamPre', ctx, opts.v2DepthChance ?? 0.28);
}
