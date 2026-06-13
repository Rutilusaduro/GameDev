// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT — environment beat pools
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// FULL SENTENCE — environment beat skeletons
registerPool('ge.environment', [
  { when: { locale: 'lab' }, text: [
    '{ge.furnitureEvent}{join:ge.spaceEvent|prefix: }.',
    'The lab accommodates what it can{join:ge.furnitureEvent|prefix: — }.',
  ] },
  { when: { locale: 'stream_setup' }, text: [
    '{ge.furnitureEvent}{join:ge.spaceEvent|prefix: }.',
    'The stream rig creaks under a new center of gravity.',
  ] },
  { when: {}, text: [
    '{ge.furnitureEvent}{join:ge.spaceEvent|prefix: }.',
    'The room answers her growth{join:ge.furnitureEvent|prefix: — }.',
  ] },
]);

registerPool('ge.furnitureEvent', [
  { when: { endStageMin: 9 }, text: ['Reinforced furniture still complains', 'Nothing standard was built for this'] },
  { when: { endStageMin: 6, endStageMax: 8 }, text: ['A chair arm cracks under shifting weight', 'The seat cushion bottoms out'] },
  { when: { endStageMin: 4, endStageMax: 5 }, text: ['A chair creaks ominously', 'Wood protests under new distribution'] },
  { when: { locale: 'stream_setup', endStageMin: 4 }, text: ['Her gaming chair groans and tilts', 'The stream throne squeals in protest'] },
  { when: {}, text: ['', ''] },
]);

registerPool('ge.spaceEvent', [
  { when: { endStageMin: 7, locale: 'lab' }, text: ['She has to turn sideways for the doorway'] },
  { when: { endStageMin: 7 }, text: ['A desk edge catches her hip', 'She misjudges a gap that used to fit'] },
  { when: {}, text: ['', ''] },
]);
