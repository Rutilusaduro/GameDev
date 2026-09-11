// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender
// Campus look + hunt linger: modular overlays on hardcoded flavor.
import { registerPool, registerModuleVariants, render, createContext } from '../../engine.js';
import { CAMPUS_NODES } from '../../../gameData/campus.js';
import { HUNT_NODES } from '../../../gameData/lilith.js';

const LOOK_HEAVY = {
  office: [
    'The couch remembers someone larger than last month. The fridge does too.',
    'A snack wrapper ticks in the trash. She sits like the desk was built around her.',
    'The RA inbox can wait. Softness in the visitor chair cannot.',
  ],
  lecture_hall: [
    'The sectional holds one resident the way it used to hold two. She looks comfortable about it.',
    'An aisle seat is already a squeeze. She takes it anyway and keeps eating notes.',
    'The projector hums. Her belly takes more of the row than the syllabus planned.',
  ],
  quad: [
    'A bench built for three is a one-woman throne. She finishes something sticky and does not apologize.',
    'Grass prints on a thick thigh. She stays seated after the group leaves.',
    'A takeout bag shares the bench. She is the larger half of that arrangement.',
  ],
  dining_hall: [
    'Trays stack. A resident laughs around a mouthful and reaches for dessert like it was always hers.',
    'The swiper does not comment. The second plate comments for her.',
    'Steam, butter, a wider sit. She treats the line like a promise she intends to keep.',
  ],
  dorms: [
    'The elevator groans under one very settled resident and her groceries. She waves. The bags wave back.',
    'A mini-fridge door hangs open. Softness fills the doorway until she decides to move.',
    'Hall carpet remembers her steps. She is slower coming back from the kitchen.',
  ],
  gym: [
    'The juice bar line is all recovery shakes. Nobody here is recovering in the direction the posters promised.',
    'A smoothie the size of a meal. She drinks it like homework.',
    'The bike is unused. The bench press is a seat. She looks pleased about both.',
  ],
  library: [
    'A textbook rides the shelf of a belly. The page turns. The belly does not.',
    'Quiet hours, loud wrapper. She mouths sorry and keeps chewing.',
    'The carrel was built for a laptop. She has brought a laptop and a second lunch.',
  ],
  science_wing: [
    'A sensory trial sign is smudged with frosting. Volunteers left slower than they arrived.',
    'Lab coats hide less than they used to. She buttons one and laughs.',
    'A sample tray is empty. The notes say the subjects were thorough.',
  ],
  faculty_lounge: [
    'A faculty mug sits beside a plate that needed two hands. Nobody claims either.',
    'The good chair has a dent. Someone left frosting on the arm.',
    'Coffee, then pastry, then the look of a woman who is not leaving yet.',
  ],
  garden: [
    'A picnic blanket has become a serving table. She is still sitting on the grass like furniture.',
    'Sun on a round middle. She peels another orange like it is work.',
    'Bees prefer the flowers. She prefers the snacks she packed for the bees to ignore.',
  ],
  food_court: [
    'Trays travel in pairs. One resident, two stations, no apology.',
    'The combo meal is a suggestion. She treats it as a starting bid.',
    'Fryer smell, a wider sit, a cup that was never going to be enough.',
  ],
  student_union: [
    'A couch built for a committee holds one resident and her snacks. The meeting can wait.',
    'Event flyers curl on a belly used as a table. She reads one. She eats through two.',
    'The union piano is quiet. The vending machine keeps getting fed.',
  ],
  coffee_shop: [
    'The pastry case is open. She is the reason. She knows.',
    'Whipped cream, a wider chair, a name they spelled wrong and an order they got very right.',
    'She licks foam and does not hurry. The line behind her learns patience.',
  ],
  arts_wing: [
    'Clay, paint, and a stool that has learned a wider sit. She wipes frosting off a brush.',
    'Figure class left a wider stool. She fills it and keeps a snack under the sketchbook.',
    'Paint on a wrist, frosting on a thumb. She claims both as medium.',
  ],
  outdoor_track: [
    'A recovery shake in each hand. Nobody is timing laps. Everybody is timing fullness.',
    'She walks the inside lane like a parade of one. The bleachers watch.',
    'Cooler bag, wide sit on the metal bench, no interest in the stopwatch.',
  ],
  health_center: [
    'The waiting room scale is unplugged. Someone left a muffin anyway.',
    'A campus-club pamphlet sits under a pastry box. The box is winning.',
    'She fills a chair meant for two and looks calm about the paperwork.',
  ],
  theater: [
    'An aisle seat is a project. She takes two and looks pleased about the overlap.',
    'The armrest loses. She keeps the popcorn. Both outcomes were scheduled.',
    'House lights up. She is still seated, still eating, still the show in her row.',
  ],
  rooftop: [
    'Night air, a takeout bag, a body that makes the bench look borrowed.',
    'City lights, a round silhouette, a second container she said she would share.',
    'Wind in her hair. Heat off her. The skyline has to make room.',
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
