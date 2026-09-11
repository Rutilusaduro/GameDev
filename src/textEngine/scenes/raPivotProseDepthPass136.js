// Evolved event + ranked session + hall room (Pass 136).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.event.eating_streamer.s0.p0', [
  {
    when: { evolvedFormId: ['eating_streamer'] },
    weight: 1,
    text: [
      'Stream overlay loads — chat already donating snacks before she finishes hello.',
    ],
  },
]);

registerModuleVariants('session.rae.exit.s2', [
  {
    when: { sessionStage: [2] },
    weight: 1,
    text: [
      'Rae ducks out mid-queue — “good luck” sounds like she already knows Destiny will tap out full.',
    ],
  },
]);

registerModuleVariants('hall.room.blurb', [
  {
    when: { hallRoomId: ['grand_atrium'] },
    weight: 1,
    text: [
      'Grand Atrium: prestige echoes off marble; residents arrive heavier just walking the threshold.',
    ],
  },
]);

registerModuleVariants('journal.feeder.influencer.s1', [
  {
    when: { archetype: ['influencer'] },
    weight: 1,
    text: [
      'Kylie’s journal admits the ring light loves curves — wellness season became content season.',
    ],
  },
]);
