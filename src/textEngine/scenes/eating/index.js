// ═══════════════════════════════════════════════════════════════
// EATING SCENE LIBRARY — meal beats for the feeding game core loop.
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';
import './fragments.js';
import './personas.js';
import './foodFragments.js';

registerPool('eat.scene', [
  { when: {}, text: [
    '{eat.settleIn} {eat.firstBite} {eat.midMeal|prefix: }{eat.pacing|prefix: }{eat.finish} {eat.aftermath}',
    '{eat.settleIn} {eat.hungerClause|prefix: }{eat.firstBite} {eat.bodyResponse|prefix:, }{eat.finish}',
    '{eat.firstBite} {eat.portionObs|prefix:, }{eat.finish} {eat.aftermath}',
  ] },
]);
