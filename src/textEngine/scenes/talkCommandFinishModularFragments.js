// Floor talk — command finish late hall frame (prepend; keeps Phase C body).
import { registerPool, registerModuleVariants } from '../engine.js';

registerPool('talk.command_finish.lateFloor', [
  {
    when: {},
    weight: 2,
    text: [
      'Hall Ambiance drops to a hush — plates lined up like evidence, wellness framing gone quiet.',
      'Late-semester floor energy: empty trays waiting, appetite already leaning your way before you speak.',
      'Warmth pools in the room; the command will land like policy the hall pretends it never wrote.',
      'Clipboard stays out of sight; only forks, fullness, and the soft creak of her chair under growing weight.',
      'Hunger hums under polite silence — you both hear obedience before the first bite.',
    ],
  },
]);

registerPool('talk.command_finish.lateAuthority', [
  {
    when: {},
    weight: 2,
    text: [
      'Your voice does not negotiate; it schedules seconds — growth as lifestyle, measured in clean plates.',
      'She meets your eyes like the rest of the floor can wait until every calorie is accounted for.',
      'Permission and command share the same tone tonight — tender dominance, portions unmistakable.',
      'Every plate cleared will show on the scale and in how she breathes around distension afterward.',
      'Co-conspirator hush: the hall log neutral, her belly honest, your word final.',
    ],
  },
]);

const LATE_HEAD = '{talk.command_finish.lateFloor|suffix:\n\n}{talk.command_finish.lateAuthority|suffix:\n\n}';

const ROOT_LATE = [
  { when: { corruption: [0] }, body: '{talk.command_finish.t0}' },
  { when: { corruption: [1] }, body: '{talk.command_finish.t1}' },
  { when: { corruption: [2, 3] }, body: '{talk.command_finish.t2}' },
];

for (const tier of ROOT_LATE) {
  registerModuleVariants('talk.command_finish', [
    {
      when: { weekMin: 22, ...tier.when },
      weight: 8,
      priority: 7,
      text: [`${LATE_HEAD}${tier.body}`],
    },
    {
      when: { weekMin: 14, ...tier.when },
      weight: 4,
      priority: 4,
      text: [`${LATE_HEAD}${tier.body}`],
    },
  ]);
}
