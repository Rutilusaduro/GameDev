// Homeroom conference + group activity tails (Pass 101).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('homeroom.conference.Kayla.intro', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Kayla drops into the chair like Tuesday already started — hall standing is not what she came for.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.taste_now', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Mrs. Monroe has the good container open before the agenda exists — abundance as policy.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.recipes', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'The recipe book hits the table — cardamom and peach upside-down rewrite the parent meeting.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p0', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Health unit day — the scale waits like a confession booth everyone already queued for.',
    ],
  },
]);

registerModuleVariants('campus.find.saturated_extract', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Saturated runoff bottles sweet — the gathering site left you a trophy of appetite.',
    ],
  },
]);

registerModuleVariants('weekly.viral_post', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'The post blows up — comments hungry, algorithm complicit, her belly the thumbnail.',
    ],
  },
]);
