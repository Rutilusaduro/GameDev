// The Squad — Lead: A2 Psych | Support: A5 Editor
// Comprehensive evolved-diary depth — every form, corruption + stage keyed.
import { registerModuleVariants } from '../engine.js';

const EVOLVED_FORMS = [
  'sumo', 'eating_competitor', 'feedee_creator', 'body_positive_creator',
  'eating_captain', 'big_squad_captain', 'eating_diarist', 'food_researcher',
  'eating_streamer', 'speed_eater', 'ranked_feedee', 'chapter_hostess',
  'body_positive_greek', 'installation_artist', 'food_photographer',
  'anonymous_blogger', 'asmr_creator', 'home_nest', 'delivery_hive',
  'campus_legend', 'food_tourist', 'ff_author', 'homestead_queen',
  'state_fair_queen', 'wife_lessons', 'psych_researcher', 'homeroom_queen',
  'cultivator', 'community_researcher',
];

const CHAPTERS = ['c1', 'c2', 'c3', 'c4'];

const COR0 = [
  'Appetite still surprises me — I write it down before I can talk myself out of honesty.',
  'The week added softness I keep touching to believe. Curiosity wins over denial, barely.',
];
const COR1 = [
  'I stopped translating hunger into something respectable. It tastes like relief now.',
  'Fullness feels like completion. I schedule my life around it without apology.',
];
const COR2 = [
  'Want is policy. I eat like someone who decided — calm, open, pleased.',
  'Mass is momentum. I do not brake for shame anymore.',
];
const STAGE_HIGH = [
  'Scale and chair negotiate on my terms now. Appetite leads; I follow, grateful.',
  'Another week of honest growth — body and hunger sharing the same long breath.',
];

EVOLVED_FORMS.forEach((form) => {
  CHAPTERS.forEach((ch) => {
    registerModuleVariants(`diary.${form}.${ch}`, [
      { when: { stageMin: 9 }, weight: 3, text: STAGE_HIGH },
      { when: { stageMin: 6, stageMax: 8, corruption: [2] }, weight: 3, text: COR2 },
      { when: { stageMin: 5, stageMax: 7, corruption: [1] }, weight: 3, text: COR1 },
      { when: { stageMax: 6, corruption: [0] }, weight: 3, text: COR0 },
      { when: { corruption: [2] }, weight: 2, text: COR2 },
      { when: { corruption: [1] }, weight: 2, text: COR1 },
      { when: {}, weight: 2, text: COR0 },
    ]);
  });
  registerModuleVariants(`diary.${form}`, [
    { when: { stageMin: 8, corruptionMin: 2 }, weight: 3, text: [
      'The entry closes on warmth — belly, appetite, identity aligned without argument.',
    ]},
    { when: { stageMin: 5 }, weight: 2, text: [
      'Another page, another inch of honesty. The form fits the hunger now.',
    ]},
    { when: {}, text: [
      'I sign my name and the ink feels like permission.',
    ]},
  ]);
});

registerModuleVariants('diary.innerBeat', [
  { when: { studentId: 16 }, weight: 4, text: [
    'Routes multiply; so do I. Lavender light, full bags, appetite as logistics.',
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    'Relic maps and full pockets — campus yields secrets and snacks in equal measure.',
  ]},
]);
