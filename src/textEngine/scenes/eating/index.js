// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// ═══════════════════════════════════════════════════════════════
// EATING SCENE LIBRARY — meal beats for the feeding game core loop.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { renderInteriorSelfObs } from '../interior/index.js';
import './fragments.js';
import './personas.js';
import './foodFragments.js';

export const EAT_SCENE = '{eat.scene}';

registerPool('eat.scene', [
  { when: {}, text: [
    '{eat.settleIn} {eat.firstBite} {eat.midMeal|prefix: }{eat.pacing|prefix: }{eat.finish} {eat.aftermath}',
    '{eat.settleIn} {eat.hungerClause|prefix: }{eat.firstBite} {eat.bodyResponse|prefix:, }{eat.finish}',
    '{eat.firstBite} {eat.portionObs|prefix:, }{eat.finish} {eat.aftermath}',
    '{eat.hungerClause|prefix: }{eat.firstBite} {eat.midMeal|prefix: }{eat.finish} {eat.aftermath}',
  ] },
]);

/**
 * Render a composed eating beat for a feeding moment.
 * @param {object} student — focal character
 * @param {number} week
 * @param {object} opts — mealType, locale, clothingState, skillEffects, trace, globals
 */
export function renderEatScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const line = render(EAT_SCENE, ctx, { trace: opts.trace || null });
  const base = line?.trim() || '';
  let out = appendV2Depth(base, 'eating', ctx, opts.v2DepthChance ?? 0.3);
  if (opts.includeInterior !== false && Math.random() < (opts.interiorChance ?? 0.22)) {
    const interior = renderInteriorSelfObs(student, week, { v2DepthChance: 0.18, trace: opts.trace || null });
    if (interior?.trim()) out += `\n\n${interior}`;
  }
  return out;
}
