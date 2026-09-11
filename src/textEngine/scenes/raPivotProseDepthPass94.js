// Evolved endings, fair photos, WL + campus (Pass 94).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('evolved.event.sumo.s0.end0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Chanko-heavy and locked in — the dohyo waits for belly-first argument.',
    ],
  },
]);

registerModuleVariants('evolved.event.state_fair_queen.s0.end0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Pies on the table, horn in three minutes — county hunger becomes sport.',
    ],
  },
]);

registerModuleVariants('fair.photo.Kylie', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Fryer glow on Kylie’s grin — another greasy saint for the trophy wall.',
    ],
  },
]);

registerModuleVariants('fair.photo.Serena', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Serena poses between funnel cakes — flash adds legend before MJ claims ribbon.',
    ],
  },
]);

registerModuleVariants('campus.sighting', [
  {
    when: { weightBand: ['heavy'] },
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Someone';
        return `${n} moves slower across the quad — fullness shows in the pace.`;
      },
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.curriculum', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Wellness slides until arms uncross — snacks do the persuasion slides cannot.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Patrice.s4.greeting', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      '"Store cookies stayed on the counter — your cinnamon buns did not survive the drive home."',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s8.final_spread', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Every favorite dish at once — the table becomes a map of the whole journey.',
    ],
  },
]);

registerModuleVariants('cg.scene.corkboard.Driven', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Pins bite new numbers — Priya leans in until the desk creaks with her belly.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.prestige', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Marble echoes prestige — residents loosen belts in unison without a word.',
    ],
  },
]);
