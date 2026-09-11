// WL + homeroom + fair day + device + talk (Pass 111).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('homeroom.conference.Bri.brought_something', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Bri’s drawer ritual — Tupperware like scripture, appetite like homework.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.curriculum', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Wellness agenda holds until snacks rewrite the minutes.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s3.potluck', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Potluck theology — every dish a sermon, every second helping amen.',
    ],
  },
]);

