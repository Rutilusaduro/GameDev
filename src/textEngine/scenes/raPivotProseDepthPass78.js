// Evolved activity + homeroom event prose (Pass 78).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('evolved.activity.state_fair_queen', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} pins her number and studies the scoreboard like scripture — county fair season is just another weigh-in with applause.`;
      },
      'Sawdust and sugar glaze the air; Darcy’s shadow on the tent wall is already shrinking.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s0.p0', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        const lbs = Math.round(ctx.subject?.lbs ?? 0);
        return `${n} is ${lbs} pounds in the common-room kitchen, apron tied, cabinets stocked like she planned hunger on purpose.`;
      },
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s0.p1', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Kayla eats like the session was always hers. Bri follows. Sofia pretends she is only here for cinnamon.',
    ],
  },
]);
