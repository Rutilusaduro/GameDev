// CG measurement + homeroom queen depth (Pass 80).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('cg.measurement.session', [
  {
    when: { cgDriveTier: ['Frenzied', 'Ruthless'] },
    weight: 2,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        const t = ctx.globals?.targetName || 'her';
        return `${p} measures ${t} like a deadline — numbers sharp, appetite sharper.`;
      },
    ],
  },
]);

registerModuleVariants('evolved.gainer.v2.depth', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      'Pins migrate upward on the corkboard — the floor learns to read her handwriting.',
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} treats every pound like a trophy that still tastes good.`;
      },
    ],
  },
]);

registerModuleVariants('evolved.homeroomQueen.v2.depth', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Tuesday steam fogs the common-room windows — mothers smell success before they knock.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s0.p2', [
  {
    when: legacyBridgeWhen(),
    weight: 2,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} watches pickup like a director — smiles, containers, suspicion held at the door.`;
      },
    ],
  },
]);
