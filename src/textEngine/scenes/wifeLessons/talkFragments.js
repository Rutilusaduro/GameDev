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
      '"Good evening, RA. The kitchen already smells like butter before we sit down."',
      '"Mary Jane\'s table feels like the warmest room on the floor tonight."',
      '"We drove over hungry — that should tell you how the week went."',
      '"The daughters asked Monday what we\'re making this week. I didn\'t have the heart to tease them."',
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
    ],
  },
]);

const TALK_GREETING_SKELETON = '{wl.talk.warmOpen|prefix:} {wl.talk.raPresence|prefix: }';

for (const [person, stages] of Object.entries(WL_DIALOGUES)) {
  if (!Array.isArray(stages)) continue;
  stages.forEach((_, stageIdx) => {
    const stage = talkStageNum(person, stageIdx);
    const greetingKey = `wifeLessons.talk.${person}.s${stage}.greeting`;
    const cappedKey = `wifeLessons.talk.${person}.s${stage}.capped`;
    registerModuleVariants(greetingKey, [
      {
        when: { weekMin: [5] },
        weight: 3,
        priority: 2,
        text: [TALK_GREETING_SKELETON],
      },
    ]);
    registerModuleVariants(cappedKey, [
      {
        when: { weekMin: [5] },
        weight: 3,
        priority: 2,
        text: ['{wl.talk.scaleNote|prefix:} {wl.talk.raPresence|prefix: }'],
      },
    ]);
  });
}
