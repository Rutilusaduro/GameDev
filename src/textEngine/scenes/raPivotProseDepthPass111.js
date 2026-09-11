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

registerModuleVariants('fair.day.weighIn.open', [
  {
    when: { fairBoostTier: ['Mid', 'High'] },
    weight: 1,
    text: [
      'Scale lights the midway — crowd leans in before the number lands.',
    ],
  },
]);

registerModuleVariants('weekly.art_exhibition', [
  {
    when: { archetype: ['artsy'] },
    weight: 1,
    text: [
      'Gallery night — her body hung beside the canvases, both exhibits honest.',
    ],
  },
]);

registerModuleVariants('evolved.activity.feedee_creator.s1', [
  {
    when: { evolvedFormId: ['feedee_creator'], evolvedStageIdx: [1] },
    weight: 1,
    text: [
      'Collab stream warmup — ring light on, appetite already trending.',
    ],
  },
]);
