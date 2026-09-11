// Evolved branching events — composable phase slots (MIGRATION pilot).
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('evolved.scene.atmosphere', [
  {
    when: {},
    weight: 2,
    text: [
      'The room smells like food and ambition — warm light, heavier bodies, nobody pretending.',
      'Ambient noise drops when plates arrive; appetite becomes the only agenda.',
      'Fabric strains, chairs creak, and the mood stays tender instead of tense.',
    ],
  },
]);

registerPool('evolved.scene.stakes', [
  {
    when: {},
    weight: 2,
    text: [
      'Every choice tonight will show up on the scale and in the retelling.',
      'The next bite is not casual — it is a direction.',
      'Winning here means growing into something the old self could not hold.',
    ],
  },
]);

registerPool('evolved.scene.hungerCue', [
  {
    when: { stageMin: [4] },
    weight: 2,
    text: [
      'Her belly leads when she moves — soft, forward, impossible to ignore.',
      'Fullness sits in her lap like a trophy she is still earning.',
    ],
  },
  {
    when: {},
    text: [
      'Hunger hums under her ribs, polite but persistent.',
      'She eats like someone who already knows the ending and wants it sooner.',
    ],
  },
]);

const MODULAR_EVENT_PHASES = [
  'evolved.event.eating_streamer.s0.p0',
  'evolved.event.eating_streamer.s1.p0',
  'evolved.event.feedee_creator.s0.p0',
  'evolved.event.ranked_feedee.s0.p0',
  'evolved.event.state_fair_queen.s0.p0',
];

const EVENT_SKELETON = '{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: } {evolved.scene.hungerCue|prefix: }';

for (const key of MODULAR_EVENT_PHASES) {
  registerModuleVariants(key, [
    {
      when: { weekMin: [8] },
      weight: 3,
      priority: 2,
      text: [EVENT_SKELETON],
    },
    {
      when: { weekMin: [4] },
      weight: 2,
      priority: 1,
      text: ['{evolved.scene.atmosphere|prefix:} {evolved.scene.stakes|prefix: }'],
    },
  ]);
}

registerPool('evolved.choice.chatReact', [
  {
    when: {},
    weight: 2,
    text: [
      'Chat erupts — donations, clips, the supportive chaos of people who came to watch her eat.',
      'The viewer count ticks up before she finishes the sentence; someone types *finally* in all caps.',
      'She reads the spam aloud, amused, and keeps chewing like the camera is an old friend.',
    ],
  },
]);

registerPool('evolved.choice.bodyResult', [
  {
    when: {},
    weight: 2,
    text: [
      'Sauce on her fingers, a soft sound she does not edit out — appetite made honest on stream.',
      'Her belly shifts under the ring light; the mic catches every satisfied exhale.',
      'She leans into the bite and the room feels warmer, heavier, more real.',
    ],
  },
]);

const MODULAR_EVENT_CHOICES = [
  'evolved.event.eating_streamer.s0.p0.hype_chat',
  'evolved.event.eating_streamer.s0.p0.load_pre',
  'evolved.event.eating_streamer.s0.p1.own_nerves',
  'evolved.event.feedee_creator.s0.p0.warmup_both',
  'evolved.event.feedee_creator.s0.p0.talk_dynamic',
];

const CHOICE_SKELETON = '{evolved.choice.chatReact|prefix:} {evolved.choice.bodyResult|prefix: }';

for (const key of MODULAR_EVENT_CHOICES) {
  registerModuleVariants(key, [
    {
      when: { weekMin: [6] },
      weight: 3,
      priority: 2,
      text: [CHOICE_SKELETON],
    },
  ]);
}

registerPool('evolved.ending.streamCoda', [
  {
    when: {},
    weight: 2,
    text: [
      'The challenge UI waits — chat climbing, belly warm, the format finally real.',
      'Viewer count keeps ticking; she exhales and hits go-live like it was always inevitable.',
      'Bags ready, mic hot, focus bar armed — performance and appetite braided together.',
    ],
  },
]);

registerPool('evolved.ending.relGain', [
  {
    when: {},
    weight: 2,
    text: [
      'She feels seen in the way that makes appetite easier — not judged, just watched.',
      'The room trusts her; she trusts the next bite.',
    ],
  },
]);

const MODULAR_EVENT_ENDINGS = [
  'evolved.event.eating_streamer.s0.end0',
  'evolved.event.eating_streamer.s0.end1',
  'evolved.event.eating_streamer.s0.end2',
  'evolved.event.feedee_creator.s0.end0',
  'evolved.event.ranked_feedee.s0.end0',
];

const ENDING_SKELETON = '{evolved.ending.streamCoda|prefix:} {evolved.ending.relGain|prefix: }';

for (const key of MODULAR_EVENT_ENDINGS) {
  registerModuleVariants(key, [
    {
      when: { weekMin: [7] },
      weight: 3,
      priority: 2,
      text: [ENDING_SKELETON],
    },
  ]);
}

const EXTRA_CHOICES = [
  'evolved.event.eating_streamer.s0.p1.play_cool',
  'evolved.event.feedee_creator.s0.p1.feed_her_first',
  'evolved.event.feedee_creator.s0.p1.both_go',
  'evolved.event.ranked_feedee.s0.p0.go_big',
  'evolved.event.ranked_feedee.s0.p0.keep_light',
];

for (const key of EXTRA_CHOICES) {
  registerModuleVariants(key, [
    {
      when: { weekMin: [6] },
      weight: 2,
      priority: 2,
      text: [CHOICE_SKELETON],
    },
  ]);
}
