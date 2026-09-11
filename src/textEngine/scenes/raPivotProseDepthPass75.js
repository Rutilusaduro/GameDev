// Evolved event phase depth (Pass 75).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('evolved.event.state_fair_queen.s0.p0', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `Sawdust sticks to ${n}'s boots before the first pie — county fair season already tastes like victory.`;
      },
    ],
  },
]);
