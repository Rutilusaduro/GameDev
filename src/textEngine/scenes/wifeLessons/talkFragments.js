// Wife Lessons 1-on-1 talk — composable greeting slots (MIGRATION pilot).
import { registerPool, registerModuleVariants } from '../../engine.js';
import { WL_DIALOGUES, WL_CONFIG } from '../../../gameData/wifeLessonsData.js';

const DAUGHTERS = new Set(['Emma', 'Chloe', 'Kezia', 'Lila']);

function talkStageNum(person, stageIdx) {
  return DAUGHTERS.has(person) ? stageIdx + WL_CONFIG.daughtersFrom : stageIdx + 1;
}

registerPool('wl.talk.warmOpen', [
  {
    when: {},
    weight: 2,
    text: [
      'Yeasty warmth hits before anyone sits — permission baked into the air.',
      'Mary Jane\'s table feels like the warmest room on the floor tonight.',
      'They drove over hungry; the week already wrote itself on their faces.',
      'The daughters asked Monday what we\'re making this week — appetite as family calendar.',
      'Steam and brown sugar braid together; someone\'s already reaching for the bread basket.',
      'Fat is what makes a home feel like home — they say it like scripture, then prove it with seconds.',
    ],
  },
]);

registerPool('wl.talk.scaleNote', [
  {
    when: {},
    weight: 2,
    text: [
      '"The scale told a story this week. We listened without arguing."',
      '"New uniforms again. I stopped apologizing for the sizes."',
      '"Both daughters reached the mark. I\'m calling that progress with a full heart."',
      '"I wrote the number on the calendar. Pride, not panic."',
    ],
  },
]);

registerPool('wl.talk.raPresence', [
  {
    when: {},
    text: [
      'She meets your eyes — soft apple belly rounding, appetite no longer hidden.',
      'Her voice stays careful, but her plate is already half-finished.',
      'You nod; the hall log can wait for whatever truth she is offering.',
      'Her blouse strains when she laughs — softness worn openly, wellness framing ready on your tongue.',
      'Floor check-in energy turns tender; you keep the clipboard closed while she keeps eating.',
      'She smells like cinnamon and certainty; appetite sits in her lap like something she chose on purpose.',
    ],
  },
]);

registerPool('wl.talk.branchPrompt', [
  {
    when: {},
    weight: 2,
    text: [
      'She folds her hands over her belly and waits for you to pick the thread.',
      'Her question hangs in the kitchen heat — honest, a little shy, hungry for an answer.',
      'She watches your face the way mothers watch report cards — hoping for kindness.',
      'The question is simple and enormous: are we doing this right? Her belly answers before you do.',
      'Daughters murmur in the next room; this kitchen is the only place the numbers feel like love.',
    ],
  },
]);

registerPool('wl.talk.branchAnswer', [
  {
    when: {},
    weight: 2,
    text: [
      '"Thank you for saying that. We mean it every week."',
      '"Honest answer: we\'re grateful to belong here."',
      '"I\'ll tell the girls you said so. They\'ll glow."',
      '"That\'s what matters — full plates, full hearts."',
    ],
  },
]);

const TALK_GREETING_SKELETON = '{wl.talk.warmOpen|prefix:} {wl.talk.raPresence|prefix: }';
const TALK_BRANCH_SKELETON = '{wl.talk.branchPrompt|prefix:} {wl.talk.branchAnswer|prefix: }';

for (const [person, stages] of Object.entries(WL_DIALOGUES)) {
  if (!Array.isArray(stages)) continue;
  stages.forEach((entry, stageIdx) => {
    const stage = talkStageNum(person, stageIdx);
    const prefix = `wifeLessons.talk.${person}.s${stage}`;
    registerModuleVariants(`${prefix}.greeting`, [
      {
        when: { weekMin: 20 },
        weight: 5,
        priority: 5,
        text: [TALK_GREETING_SKELETON],
      },
      {
        when: { weekMin: 5 },
        weight: 3,
        priority: 3,
        text: [TALK_GREETING_SKELETON],
      },
      {
        when: { weekMin: 1 },
        weight: 2,
        priority: 2,
        text: [TALK_GREETING_SKELETON],
      },
    ]);
    registerModuleVariants(`${prefix}.capped`, [
      {
        when: { weekMin: 5 },
        weight: 3,
        priority: 3,
        text: ['{wl.talk.scaleNote|prefix:} {wl.talk.raPresence|prefix: }'],
      },
      {
        when: { weekMin: 1 },
        weight: 2,
        priority: 2,
        text: ['{wl.talk.scaleNote|prefix:} {wl.talk.raPresence|prefix: }'],
      },
    ]);
    if (entry.overtookGreeting) {
      registerModuleVariants(`${prefix}.overtook`, [
        {
          when: { weekMin: 5 },
          weight: 2,
          priority: 2,
          text: ['{wl.talk.scaleNote|prefix:} {wl.talk.branchAnswer|prefix: }'],
        },
      ]);
    }
    entry.options?.forEach((opt, oi) => {
      registerModuleVariants(`${prefix}.opt${oi}`, [
        {
          when: { weekMin: 6 },
          weight: 3,
          priority: 3,
          text: [TALK_BRANCH_SKELETON],
        },
        {
          when: { weekMin: 1 },
          weight: 2,
          priority: 2,
          text: [TALK_BRANCH_SKELETON],
        },
      ]);
      opt.subs?.forEach((_, si) => {
        registerModuleVariants(`${prefix}.opt${oi}.sub${si}`, [
          {
            when: { weekMin: 6 },
            weight: 3,
            priority: 3,
            text: ['{wl.talk.branchAnswer|prefix:} {wl.talk.raPresence|prefix: }'],
          },
          {
            when: { weekMin: 1 },
            weight: 2,
            priority: 2,
            text: ['{wl.talk.branchAnswer|prefix:} {wl.talk.raPresence|prefix: }'],
          },
        ]);
      });
    });
  });
}
