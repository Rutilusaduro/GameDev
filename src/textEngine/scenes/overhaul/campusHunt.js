// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Campus look + hunt linger: modular overlays on hardcoded flavor.
import { registerPool, registerModuleVariants, render, createContext } from '../../engine.js';
import { CAMPUS_NODES } from '../../../gameData/campus.js';
import { HUNT_NODES } from '../../../gameData/lilith.js';

const LOOK_HEAVY = {
  office: [
    'The couch remembers someone larger than last month. The fridge does too.',
  ],
  lecture_hall: [
    'The sectional holds one resident the way it used to hold two. She looks comfortable about it.',
  ],
  quad: [
    'A bench built for three is a one-woman throne. She finishes something sticky and does not apologize.',
  ],
  dining_hall: [
    'Trays stack. A resident laughs around a mouthful and reaches for dessert like it was always hers.',
  ],
  dorms: [
    'The elevator groans under one very settled resident and her groceries. She waves. The bags wave back.',
  ],
  gym: [
    'The juice bar line is all recovery shakes. Nobody here is recovering in the direction the posters promised.',
  ],
  library: [
    'A textbook rides the shelf of a belly. The page turns. The belly does not.',
  ],
};

function lintSafe(s) {
  return String(s || '').replace(/\u2014/g, ',');
}

for (const [id, node] of Object.entries(CAMPUS_NODES)) {
  const extras = LOOK_HEAVY[id] || [
    'Someone walks past slower than last week, softer, still smiling.',
  ];
  const flavor = (node.flavor || []).map(lintSafe);
  registerPool(`campus.look.${id}`, [
    { when: {}, text: flavor.length ? flavor : extras },
    { when: { stageMin: 5 }, weight: 2, text: extras },
  ]);
}

for (const id of Object.keys(HUNT_NODES)) {
  registerModuleVariants(`hunt.node.${id}`, [
    { when: {}, weight: 2, text: [
      'Warmth hangs off the path. The ones who look twice already know.',
      'The air tastes like a dinner she has not named yet.',
    ]},
    { when: { stageMin: 7 }, weight: 3, text: [
      'She fills more of the approach than the map expected. The hunt still starts here.',
    ]},
  ]);
}

export function renderCampusLook(nodeId, week = 1) {
  const id = CAMPUS_NODES[nodeId] ? nodeId : 'office';
  const ctx = createContext({ week });
  const keyed = render(`{campus.look.${id}}`, ctx)?.trim() || '';
  const linger = render('{overhaul.linger.campus}', ctx)?.trim() || '';
  return [keyed, linger].filter(Boolean).join(' ');
}
