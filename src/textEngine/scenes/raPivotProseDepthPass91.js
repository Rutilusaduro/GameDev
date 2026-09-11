// CG resident variety (thin pools), homeroom + fair day (Pass 91).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


const cgMaya = {
  ahead: [
    'Mine bigger there.',
    'Still ahead in one column. Board updated.',
  ],
  behind: [
    'You ahead. I eat.',
    'Your numbers win today. I am not done.',
  ],
  close: [
    'Close. Good.',
    'Almost tied. I like that.',
  ],
  proud: [
    'Growing steady.',
    'Trend line up. That is enough.',
  ],
  unmeasured: [
    'Measure me if you want real data.',
    'No numbers, no brag — book the session.',
  ],
};

for (const [replyType, lines] of Object.entries(cgMaya)) {
  for (const line of lines) {
    registerModuleVariants(`cg.chat.resident.Maya.${replyType}`, [
      { when: {}, weight: 1, text: [line] },
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
  close: [
    'That margin is too narrow for confidence.',
    'Contested territory suits me.',
  ],
};

for (const [replyType, lines] of Object.entries(cgTiffany)) {
  for (const line of lines) {
    registerModuleVariants(`cg.chat.resident.Tiffany.${replyType}`, [
      { when: {}, weight: 1, text: [line] },
    ]);
  }
}

registerModuleVariants('homeroom.activity.parent_meeting.p0.refreshments_first', [
  {
    when: {},
    weight: 1,
    text: [
      'Container opens before the agenda — Mrs. Calloway eats three pieces while pretending she is still skeptical.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p1', [
  {
    when: {},
    weight: 1,
    text: [
      'Pickup looms — Mrs. Monroe watches the scale like it is a cooking show finale.',
    ],
  },
]);

registerModuleVariants('fair.day.weighIn.choice1', [
  {
    when: {},
    weight: 1,
    text: [
      'MJ plants on the livestock scale — the crowd treats the number like weather: loud, inevitable, shared.',
    ],
  },
]);

registerModuleVariants('fair.day.afterparty.ending', [
  {
    when: {},
    weight: 1,
    text: [
      'Fair night ends sticky — pride and grease share the same napkin.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s1.p0', [
  {
    when: {},
    weight: 1,
    text: [
      'Tuesday smells different now — parents notice before students admit it.',
    ],
  },
]);

registerModuleVariants('evolved.event.sumo.s0.p1', [
  {
    when: {},
    weight: 1,
    text: [
      'Darcy reads your number like policy — you read her shrug like a dare.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaFollowup.threatened.Frenzied', [
  {
    when: {},
    weight: 1,
    text: [
      'Priya types with one hand — the other is already reaching for seconds.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Wanda.s3.greeting', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      '"Kezia asked what we are baking before I could finish my coffee — I told her everything."',
    ],
  },
]);

registerModuleVariants('hall.room.blurb', [
  {
    when: { hallRoomId: ['wellness_nook'] },
    weight: 1,
    text: [
      'Soft light, honest mirrors — want learns to speak without shame in this wing.',
    ],
  },
]);
