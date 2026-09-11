// Hall ambiance + homeroom NPC + ranked session (Pass 104).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('hall.ambiance.pulse.appetite', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Oven timers stack — the hall learns to schedule hunger between bells.',
    ],
  },
]);

registerModuleVariants('homeroom.npc.Kayla.s2', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Kayla’s widest stage — hips own the chair, waistband stopped fighting.',
    ],
  },
]);

registerModuleVariants('session.rae.arrival.s3', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Rae knows the lobby code — delivery before Destiny taps order.',
    ],
  },
]);

registerModuleVariants('weekly.gaming_sponsor', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Sponsor crates land — chat cheers, calories become content.',
    ],
  },
]);

registerModuleVariants('weekly.transfer_settled', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Transfer finally exhales — the floor feels like home and seconds.',
    ],
  },
]);

registerModuleVariants('evolved.event.feedee_creator.s1.p0.legacyBody', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Ring light warms — every bite is content before it is meal.',
    ],
  },
]);
