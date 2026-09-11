// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A3 Immobility
// Last-wins catalog overwrite: pantry, private venues, quests, capstones, blob intros.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { ITEMS } from '../../../gameData/items.js';
import { PRIVATE_VENUES } from '../../../gameData/sessions.js';
import { ELARA_QUESTS } from '../../../gameData/relicHunter.js';
import { ARRIVAL_CAPSTONES } from '../../../gameData/arrivalCapstones.js';

const ITEM = {
  protein_shake: [
    'Dense, drinkable, easy. It slides in under the fullness she would notice from a plate.',
    'A shake that treats calories like a secret. She finishes it standing.',
    'Sweet, heavy, gone. The cup is lighter than the extra it leaves.',
  ],
  donut_box: [
    'A dozen glazed. Nobody has ever eaten just one from this box.',
    'Sugar, glaze, a count that will not survive the hour.',
    'The box is a dare. She knows. She opens it anyway.',
  ],
  family_lasagna: [
    'Serves six, allegedly. The serving note is a coward.',
    'A pan of lasagna with no interest in sharing math.',
    'Family size for one resident. She does not split it.',
  ],
  cake_whole: [
    'Three layers, real buttercream. A fork works without slicing.',
    'A whole cake. Cutting is optional. She treats it as optional.',
    'Celebration cake with no party required. She is the party.',
  ],
  butter_coffee: [
    'Coffee in the technical sense. Cream in every other sense.',
    'A latte that is mostly cream. She drinks it like breakfast.',
    'Heat, fat, caffeine as an excuse. The cup still empties.',
  ],
  snack_crate: [
    'A whole crate, opened and arranged. Grazing fuel for an afternoon.',
    'Gourmet snacks in quantity. She grazes like it is a sitting.',
    'The crate is an afternoon. She has the afternoon.',
  ],
  feast_platter: [
    'Catering surplus, officially. A feast for one, actually.',
    'A platter built as a centerpiece. She is the table.',
    'Banquet food without a banquet. She does not wait for guests.',
  ],
  gainer_fudge: [
    'Absurd density, almost no bulk. She will not clock what hit her.',
    'Double-cream fudge. Small pieces, large extra.',
    'A quiet recipe. She eats it like candy. It is not candy.',
  ],
  greenhouse_honey_tart: [
    'Still warm. Honey forward. Impossible to stop at one slice.',
    'Greenhouse tart, butter and heat. She takes another wedge.',
    'Honey, crust, a bench recipe. She finishes the tin.',
  ],
  cellar_comfort_loaf: [
    'Dense, sweet, cut thick. Feeds a study group or one committed resident.',
    'Cellar loaf with a crust that crackles. She takes the thick end.',
    'Pre-renovation comfort. She treats the loaf as a sitting.',
  ],
  trail_ration: [
    'Nuts, fruit, a bar that packs diner calories into a pocket.',
    'Indiana\'s field snack. She eats it like a meal anyway.',
    'Trail food with no trail. The calories still land.',
  ],
  tunnel_mushroom_stew: [
    'Cream stew from the tunnels. She eats it like a dare she won.',
    'Fungus, cream, heat. Digests with enthusiasm.',
    'A bowl that should not exist. She empties it anyway.',
  ],
  archives_seed_bread: [
    'Pressed herbs in a forgotten loaf. Crust crackles. Crumb surrenders.',
    'Archive bread, dense and willing. She takes the heel.',
    'Seed, herb, old recipe. She treats it as found treasure.',
  ],
  wellness_sample_plate: [
    'Wellness on the label. The portions are not. Neither is the appetite.',
    'A sample plate that is not a sample. She finishes the branding.',
    'Corporate wrapping, uncorporate quantity. She eats the contradiction.',
  ],
};

const VENUE = {
  office: [
    'The hall empties. You order in. The lounge door locks. Time is not a factor.',
    'After hours in the lounge. Food waiting. She stays.',
    'Locked door, delivered heat. The night belongs to the table.',
  ],
  apartment: [
    'Your kitchen, your rules. No pretense. Food and time.',
    'Home cooking with no clock. She already knows how this goes.',
    'Your place. The portions do not have a closing time.',
  ],
  her_space: [
    'Her territory. Comfortable clothes. Snacks everywhere. She does not hold back.',
    'Her room, her rules. She is already sitting like the night is settled.',
    'You bring the food to her. She never has to perform hunger here.',
  ],
};

const VENUE_INTRO = {
  office: [
    '{subject.name} arrives after the last corridor light dies. She looks at the spread. "You planned this."',
    'She shuts the lounge door with her hip. The food is already out. She sits like that was the plan.',
    'After hours. She sees the table and her face goes quiet and wanting. She does not ask if this is allowed.',
  ],
  apartment: [
    'You have been cooking since afternoon. {subject.name} stands in the doorway and breathes in.',
    'She arrives to a kitchen that already decided. "It smells like you meant it," she says.',
    'Your place, hot pans, too much food. She hangs her bag and does not pretend she will pace herself.',
  ],
  her_space: [
    'You bring the food to her. She opens the door in the clothes she wears when she does not care.',
    'Her space. She is already comfortable. The snacks were winning before you arrived.',
    '{subject.name} lets you in and nods at the bags. She does not get dressed up for this anymore.',
  ],
};

const QUEST = {
  tunnel_markings: [
    'Indiana wants eyes on the old maintenance routes under the rec center.',
    'Tunnel chalk. She thinks someone mapped feeding paths under the gym.',
    'The grate by the rec center. She wants you looking where Housing will not.',
  ],
  botanical_specimen: [
    'A rare plant in the walled greenhouse, if you know which bench to lift.',
    'Greenhouse cutting. She wants the specimen before the gardener notices.',
    'A plant that should not be here. Indiana wants proof it still is.',
  ],
  library_basement: [
    'Sealed stacks with carvings that match no registered club.',
    'Basement inscriptions. Older than the library, hungrier than the catalog.',
    'She wants you in the stacks where the carvings predate the building.',
  ],
  wellness_investigation: [
    'Indiana smells corporate wellness on the secret map. She wants proof.',
    'A circuit of food in and devotion out. She wants it documented.',
    'Wellness branding over an old appetite map. She is already angry about it.',
  ],
};

const CAPSTONE = {
  sumo: [
    'A ceremonial match that celebrates how far she has come. Repeatable. Always heavier.',
    'Grand bout. The ring is for witnessing. She is the event.',
    'She wants the match again. Heavier than last time. Repeating is the celebration.',
  ],
  eating_streamer: [
    'A capstone broadcast. The audience already knows what they are watching.',
    'Legacy stream. She stops pretending the calories are incidental.',
    'Camera on. Chat climbing. She lets the extra be the content.',
  ],
  feedee_creator: [
    'The channel stops pretending. The feed is the point.',
    'Creator arrival. She films the extra as the product.',
    'No more lifestyle framing. She wants the audience on the pounds.',
  ],
  machine_goddess: [
    'Talia runs the mesh at full saturation across the roster for one perfect week.',
    'Factory blessing. Devices in concert. She is the switch.',
    'The lab sings. She wants every unit answering at once.',
  ],
  competitive_gainer: [
    'She invites the room to witness the final version of the competition.',
    'Open challenge. No more hiding the scoreboard.',
    'The bout is public. She wants the extra counted where people can see.',
  ],
  delivery_hive: [
    'The building answers to her. Deliveries never stop.',
    'Hive arrival. Tribute on a clock she wrote.',
    'Nest complete. Food in, bodies claimed, the floor as territory.',
  ],
};

registerPool('private.blob.setup', [
  { when: {}, text: [
    'You come to her. She does not come to you. Climbing is the greeting.',
    'The room is arranged around her. You haul up the warm geography of her and settle.',
    'She is the furniture now. You climb. She waits. The food comes with you.',
  ]},
  { when: { studentId: 0 }, weight: 5, text: [
    'You find Brittany in the cleared space. Belly first. She narrates the climb like a captain.',
  ]},
  { when: { studentId: 1 }, weight: 5, text: [
    'Cassidy nods like you arrived on the split she wrote. The note on the approach is laminated.',
  ]},
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie already has cameras. She documents the climb. The audience finds it compelling.',
  ]},
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya says nothing until you settle. Then two words. "You made it."',
  ]},
]);

registerPool('private.blob.body', [
  { when: {}, text: [
    'Warm folds, a shelf of chest, eye level with her face. She looks satisfied. "Okay. Let\'s go."',
    'You settle on her. Heat, extra, a lap that is a landscape. She waits for the first course.',
    'The climb ends. She is home in what she is. You get to work.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'At this size the approach is a route. She has opinions. You follow them. Food after.',
  ]},
]);

registerPool('private.blob.scene', [
  { when: {}, text: [
    '{private.blob.setup} {private.blob.body}',
    '{private.blob.body} {private.blob.setup}',
    '{private.blob.setup}',
  ]},
]);

function three(arr) {
  const list = (arr || []).filter(Boolean);
  while (list.length < 3) list.push(list[0] || 'She is here. The extra of her is the point.');
  return list.slice(0, 6);
}

function dummy() {
  return { id: 0, name: 'She', first: 'She', lbs: 140, startLbs: 118 };
}

export function applyCatalogOverhaul() {
  for (const item of ITEMS) {
    registerPool(`pantry.item.${item.id}`, [
      { when: {}, text: three(ITEM[item.id]) },
    ]);
  }
  for (const venue of PRIVATE_VENUES) {
    registerPool(`private.venue.${venue.id}`, [
      { when: {}, text: three(VENUE[venue.id]) },
    ]);
    registerPool(`private.venue.intro.${venue.id}`, [
      { when: {}, text: three(VENUE_INTRO[venue.id]) },
    ]);
  }
  for (const quest of ELARA_QUESTS) {
    registerPool(`quest.elara.${quest.id}`, [
      { when: {}, text: three(QUEST[quest.id]) },
    ]);
  }
  for (const [formId, cap] of Object.entries(ARRIVAL_CAPSTONES)) {
    registerPool(`arrival.capstone.${formId}`, [
      { when: {}, text: three(CAPSTONE[formId] || CAPSTONE.sumo) },
    ]);
  }
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderItemDesc(item, student, week = 1) {
  if (!item?.id) return '';
  return prefer(`pantry.item.${item.id}`, buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'pantry', itemId: item.id },
  }));
}

export function renderPrivateVenueDesc(venue, student, week = 1) {
  const id = typeof venue === 'string' ? venue : venue?.id;
  if (!id) return '';
  return prefer(`private.venue.${id}`, buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'session', venueId: id },
  }));
}

export function renderPrivateVenueIntro(venue, student, week = 1) {
  const id = typeof venue === 'string' ? venue : venue?.id;
  if (!id || !student) return '';
  return prefer(`private.venue.intro.${id}`, buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'session', venueId: id },
  }));
}

export function renderPrivateBlobIntro(student, week = 1) {
  if (!student) return '';
  return prefer('private.blob.scene', buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'session' },
  }));
}

export function renderQuestDesc(quest, student, week = 1) {
  const id = typeof quest === 'string' ? quest : quest?.id;
  if (!id) return '';
  return prefer(`quest.elara.${id}`, buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'quest', questId: id },
  }));
}

export function renderArrivalCapstoneDesc(formId, student, week = 1) {
  if (!formId) return '';
  return prefer(`arrival.capstone.${formId}`, buildTextContext({
    subject: student || dummy(),
    week,
    globals: { featureId: 'arrival', evolvedForm: formId },
  }));
}
