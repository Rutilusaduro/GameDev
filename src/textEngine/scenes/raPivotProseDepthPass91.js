// Hall room vignette (Pass 91) — CG resident thin lines + homeroom/fair bridges retired.
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

const cgMaya = {
  ahead: ['Mine bigger there.', 'Still ahead in one column. Board updated.'],
  behind: ['You ahead. I eat.', 'Your numbers win today. I am not done.'],
  close: ['Close. Good.', 'Almost tied. I like that.'],
  proud: ['Growing steady.', 'Trend line up. That is enough.'],
  unmeasured: ['Measure me if you want real data.', 'No numbers, no brag — book the session.'],
};

for (const [replyType, lines] of Object.entries(cgMaya)) {
  for (const line of lines) {
    registerModuleVariants(`cg.chat.resident.Maya.${replyType}`, [
      { when: legacyBridgeWhen(), weight: 1, text: [line] },
    ]);
  }
}

const cgTiffany = {
  ahead: [
    'How interesting — one of my columns still leads yours.',
    'A single category advantage. I shall savor it.',
  ],
  behind: [
    'Your data presentation is persuasive. Irritatingly so.',
    'The board favors you this week. I am taking notes.',
  ],
  close: ['That margin is too narrow for confidence.', 'Contested territory suits me.'],
};

for (const [replyType, lines] of Object.entries(cgTiffany)) {
  for (const line of lines) {
    registerModuleVariants(`cg.chat.resident.Tiffany.${replyType}`, [
      { when: legacyBridgeWhen(), weight: 1, text: [line] },
    ]);
  }
}

registerModuleVariants('hall.room.blurb', [
  {
    when: { hallRoomId: ['wellness_nook'] },
    weight: 1,
    text: [
      'Soft light, honest mirrors — want learns to speak without shame in this wing.',
    ],
  },
]);
