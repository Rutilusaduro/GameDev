// WL + homeroom + fair day + device + talk (Pass 111).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.conference.Bri.brought_something', [
  {
    when: {},
    weight: 1,
    text: [
      'Bri’s drawer ritual — Tupperware like scripture, appetite like homework.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.curriculum', [
  {
    when: {},
    weight: 1,
    text: [
      'Wellness agenda holds until snacks rewrite the minutes.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s3.potluck', [
  {
    when: {},
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

registerModuleVariants('device.use.beat', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Harness whirs — she settles deeper, already anticipating the next cycle.',
    ],
  },
]);

registerModuleVariants('talk.encourage', [
  {
    when: { corruption: [2, 3] },
    weight: 1,
    text: [
      'You tell her to indulge — she hears permission dressed as command.',
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
