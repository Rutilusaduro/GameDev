// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// Last-wins chapter-hostess feast log. Do not import chapterHostess.js.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

function three(arr) {
  const list = (arr || []).filter(Boolean);
  const pad = [
    'The extra of the sitting answers the table.',
    'She notices with her appetite first.',
    'The chapter keeps the habit of staying.',
  ];
  for (const line of pad) {
    if (list.length >= 3) break;
    if (!list.includes(line)) list.push(line);
  }
  return list.slice(0, 6);
}

function pool(key, texts) {
  registerPool(key, [{ when: {}, text: three(texts) }]);
}

const ATMO = [
  [
    'Chapter lounge, couches still honest. SISNAME already claimed the sofa arm like she meant to stay.',
    'Living room extra. Nothing dressed. SISNAME is here first, perched, waiting on the food to start.',
    'Familiar furniture. SISNAME looks at home on the couch arm. The sitting can begin without a cue.',
  ],
  [
    'Fiona turned the chairs inward. SISNAME stops in the doorway. "Different," she says, already smiling.',
    'Dining room with real space. SISNAME walks in behind you and takes it in. Facing is the extra.',
    'Tables that talk to each other. SISNAME notices before she sits. The room learned appetite.',
  ],
  [
    'White linen, tapers, warm wax. SISNAME stands in the doorway a beat. "This is real," she says.',
    'Cloth and candle extra. SISNAME arrives first and confirms it like a fact she wanted.',
    'The room smells like wax and dinner. SISNAME holds the threshold, then claims a chair.',
  ],
  [
    'Florals on every table, settings a little different. SISNAME lifts a centerpiece, careful. "Fiona?"',
    'Custom places. SISNAME studies a centerpiece and sets it down like it might bruise.',
    'Each table considered. SISNAME asks if Fiona made them. You say yes. She treats them as extra.',
  ],
  [
    'String lights, drape in soft waves. SISNAME looks up, then at you. "How long?" You tell her. She grins.',
    'Warm fabric overhead. SISNAME stops in the entrance and lets the glow land. "It shows."',
    'Installed extra. SISNAME reads the ceiling like a menu and likes the portion.',
  ],
  [
    'Dining hall, loved into something else. SISNAME is already seated. "I got here early. I was not ready to leave."',
    'Fiona\'s installation fills the corners. SISNAME sat down before you arrived. The extra held her.',
    'Light, fabric, a space kept. SISNAME saved you a look from a chair she claimed early.',
  ],
];

const ARRIVE = [
  [
    'SISNAME shows on the minute. Punctuality here is appetite, and she brought both.',
    'SISNAME arrives exactly when the sitting starts. She meant to be hungry on time.',
    'SISNAME is not late. She never is when the table is the point.',
  ],
  [
    'SISNAME is already mid-conversation when she comes through the door, laugh still warm.',
    'SISNAME enters talking. The extra of the room catches her mid-sentence and she stays in it.',
    'SISNAME comes in already belonging to someone\'s story. Then she finds the table.',
  ],
  [
    'SISNAME drops her bag and goes to the table like that was the whole commute.',
    'Bag down. Chair claimed. SISNAME does not tour the room. She came to eat.',
    'SISNAME sets her things aside and sits with the plates. Priority is obvious.',
  ],
];

const CAMILLE = [
  null,
  [
    'Camille slips in quiet and sits like the chair was always hers. She reads the spread once. Approval as seating.',
    'Camille arrives contained, then belongs. A nod at the extra. No speech required.',
    'No announcement. Camille takes a place and looks at the extra like she expected it to be this generous.',
  ],
  [
    'Camille brings a bottle she does not introduce. She sets it down, sits, looks around. Settled.',
    'Wine without a speech. Camille takes her seat and lets the room catch up to her calm.',
    'Camille arrives carrying extra she will not name. The bottle finds the table. So does she.',
  ],
  [
    'Camille is last. She stops inside the door, looks at all of you, then sits like the extra finally caught up.',
    'She almost shows it. Then Camille sits and names the hope like a toast she is too careful to lift.',
    'Last through the door. Camille takes in the sitting and lets the extra land before she claims a chair.',
  ],
  [
    'Camille brought three. First names, what they do. They know elegant rooms. This one impresses them.',
    'Three contacts in her wake. Camille introduces them simply. They look at the extra and stay.',
    'Camille arrives with company she has been cultivating. They read the room as a feast and sit like guests.',
  ],
  [
    'Camille brought five. You have never seen five. She works the crowd like this is her hundredth sitting.',
    'Five people. Camille moves through introductions as if the extra were a language she already speaks.',
    'A wider orbit. Camille shepherds them to chairs and makes the hall feel expected.',
  ],
  [
    'Camille arrives like she lives here. Greets everyone by name, pours without asking, lifts the glass at you.',
    'Home energy. Camille goes to the table first, names people, claims wine. When she sees you watching, a small raise.',
    'She belongs loudly now. Camille sits, pours, and lets you catch the toast she does not need to explain.',
  ],
];

const RENEE = [
  'Reneé leans out of the kitchen. "Plates in five." Then the door takes her back until the last course.',
  'A flash of Reneé. Timing, not greeting. She vanishes into heat and will not surface early.',
  'Reneé appears long enough to promise the first plate, then the kitchen keeps her.',
];

const KYLIE = [
  'Kylie works the door like the extra already has names. Strangers walk in feeling expected.',
  'At the entrance Kylie greets people she has never met and makes the hall feel like a plus-one.',
  'Kylie\'s natural state: the threshold, the smile, the sense that you were on the list.',
];

const FOOD = [
  [
    'Salt, oil, whatever she found and made generous. Hands already in.',
    'Counter extra. Dip catching the light. Nobody pretends this is plated.',
    'Bags and bowls. The first sitting does not need a course name to fill a plate.',
  ],
  [
    'Tested bites from her kitchen. Warm, passed, gone before anyone names them.',
    'Bruschetta extra, cheese still talking. Then pasta she had been arguing with all week.',
    'Homemade first round. The bread arrives like a thesis she also eats.',
  ],
  [
    'Hired pans, full spread. Generous on purpose. Small plates that do not stay small.',
    'Catered extra that still feels like dinner. The main more generous than the invoice.',
    'A dessert that came along unasked. Everyone accepts. Coffee follows like a habit.',
  ],
  [
    'Starter chosen for this table. Warm first course, served like she meant the sitting.',
    'Family-style main. All of it. Passing becomes the extra.',
    'Dessert with coffee nobody ordered and everybody keeps.',
  ],
  [
    'A small welcome bite, then soup that asks for quiet, then greens that earn the plate.',
    'Three choices on the main, all good. The far table holds dessert like a second kitchen.',
    'Amuse into salad into a main that wants emptying. Time as an ingredient.',
  ],
  [
    'A morsel from Reneé\'s hand. Soup that changes the word. Greens that justify the fork.',
    'Cold reset between courses. Then her signature, the climb she cooked toward for years.',
    'Something sweet and small at the end. Quiet on purpose. The extra still lands.',
  ],
  [
    'An impossibly small bite that announces the evening. Soup people will quote later.',
    'Composed salad. A perfect reset. Main without compromise. Cheese because she believes in it.',
    'Barely sweet finish. Restraint as a last plate. They still take it.',
  ],
];

const SISTER = [
  [
    'SISNAME takes more while the first serving is still warm. The table does not comment.',
    'SISNAME passes the dish, then pulls it back. "Actually." The extra answers.',
    'SISNAME has been eating quiet and steady. When the plate comes around she looks glad.',
    'SISNAME tips the serving dish for the last bit. No apology. None wanted.',
    'SISNAME leans back, thinks better of it, and reaches again.',
  ],
  [
    'SISNAME looks at the empty plate, then picks up the serving spoon like a decision.',
    'SISNAME nods when the next dish arrives. Hunger as manners.',
    'SISNAME stops talking. The sitting takes that as praise.',
    'SISNAME refills glass and plate in one motion. Efficient extra.',
    'SISNAME murmurs to her neighbor. You miss the words. You catch the smile.',
  ],
];

const CAMILLE_EAT = [
  null,
  [
    'Camille eats carefully and well. Nothing performed. Appetite as manners.',
    'She works the plate without theater. Camille is simply eating, and enjoying it.',
    'Camille\'s fork is precise. The extra still disappears.',
  ],
  [
    'Camille reaches for bread unprompted. Tears it. Dips it. A good sign with no speech.',
    'Bread without ceremony. Camille treats it like the course it is.',
    'She takes bread because it is there and she wants it. Camille does not narrate hunger.',
  ],
  [
    'Camille is on a third serving. You notice because you are watching. She does not.',
    'Third plate. Camille keeps her face even. The extra keeps arriving.',
    'You count. She does not. Camille eats like the sitting is the point.',
  ],
  [
    'Camille is eating more than usual. She talks less, which you have learned means she is happy.',
    'Fewer words, more plate. Camille\'s quiet is a compliment to the extra.',
    'She has gone quiet into the courses. Enjoyment as a closed mouth and an open appetite.',
  ],
  [
    'Camille works every course with methodical appreciation. She catches you watching. A small glass-raise.',
    'Course by course, Camille stays with it. When your eyes meet, the toast is barely there.',
    'She is thorough. Camille lets you see the raise and then returns to the extra.',
  ],
  [
    'Sometime in the last hour Camille said "this is extraordinary," quiet, to herself. You heard it.',
    'A private verdict. Camille named the extra without aiming it at anyone. It still landed.',
    'She praised the sitting under her breath. You were close enough. That was the point.',
  ],
];

const CLOSE = [
  [
    'Chairs stay. Coats wait. The sitting refuses to become an exit.',
    'Nobody hurries a goodbye. The extra of remaining is the result.',
    'The door can wait. Plates empty slower than people.',
  ],
  [
    'Plates empty first. People do not. You count that as a win you can taste.',
    'Dishes gone, bodies still here. The sitting outlasted the courses.',
    'Food finished. Company still here. The feast is whoever stayed.',
  ],
  [
    'A chair scrapes. Fullness as punctuation. Nobody stands on the beat.',
    'Wood complains once. The sitting exhales. Coats stay on the backs of chairs.',
    'Someone leans away from the plate and smiles like the extra finished them kindly.',
  ],
  [
    'The hall holds its guests like a second course. You take the host chair already fed.',
    'No clock in any face. You built a sitting that does not want the door.',
    'Warm room, slow talk, nowhere else calling. The head chair is yours because you fed it.',
  ],
  [
    'Late enough that plates are history. Talk is the last serving and it keeps coming.',
    'You quit tallying bites. Conversations outran the courses and nobody minds.',
    'Clock ignored. Other mouths keep the extra talking. You let them.',
  ],
  [
    'Another hour in them. Exit is a rumor. The platters lost; the sitting did not.',
    'Empty platters, full chairs. The point of a feast, still in progress.',
    'They stay after the last bite. The extra you cooked toward is the staying.',
  ],
];

const ATMO_HOLD = [
  'The room keeps them at the table past the planned last plate.',
  'Atmosphere as a second serving. Nobody stands on time.',
  'Fiona\'s extra holds the sitting. Appetite uses the extra minutes.',
];

const GUEST_HOLD = [
  'Company as pressure, the kind that fills plates. Stopping would look strange.',
  'Too many witnesses to appetite. The extra keeps circulating.',
  'A full hall makes another serving feel obvious. They take it.',
];

let _registered = false;

export function applyFeastLogOverhaul() {
  if (_registered) {
    // registerPool overwrites; safe to run again after leftoverLastWins
  }
  ATMO.forEach((texts, i) => pool(`feast.log.atmo.${i}`, texts));
  ARRIVE.forEach((texts, i) => pool(`feast.log.arrive.${i}`, texts));
  CAMILLE.forEach((texts, i) => { if (texts) pool(`feast.log.camille.${i}`, texts); });
  pool('feast.log.renee', RENEE);
  pool('feast.log.kylie', KYLIE);
  FOOD.forEach((texts, i) => pool(`feast.log.food.${i}`, texts));
  SISTER.forEach((texts, i) => pool(`feast.log.sister.${i}`, texts));
  CAMILLE_EAT.forEach((texts, i) => { if (texts) pool(`feast.log.camilleEat.${i}`, texts); });
  CLOSE.forEach((texts, i) => pool(`feast.log.close.${i}`, texts));
  pool('feast.log.atmoHold', ATMO_HOLD);
  pool('feast.log.guestHold', GUEST_HOLD);
  _registered = true;
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function dummy() {
  return { id: 0, name: 'Tiffany', first: 'Tiffany', lbs: 160, startLbs: 118 };
}

function ctxFor(student, week, globals) {
  return buildTextContext({
    subject: student || dummy(),
    week,
    globals,
  });
}

const ATMO_SIS = [0, 1, 2, 0, 1, 0];

export function overlayFeastLog(log, ctx = {}) {
  if (!Array.isArray(log)) return log;
  const week = ctx.week ?? 1;
  const student = ctx.student;
  const sisters = ctx.sisters || [];
  const engineCtx = ctxFor(student, week, { featureId: 'feastLog' });
  const out = [];
  for (const entry of log) {
    if (!entry || typeof entry !== 'object' || !entry.beat) {
      out.push(entry);
      continue;
    }
    const beat = entry.beat;
    let composed = '';
    if (beat === 'feast.log.atmo') {
      const idx = entry.idx ?? 0;
      composed = prefer(`feast.log.atmo.${idx}`, engineCtx);
      const sisIdx = entry.sisIdx ?? ATMO_SIS[idx] ?? 0;
      composed = composed.replaceAll('SISNAME', sisters[sisIdx]?.name || 'a sister');
    } else if (beat === 'feast.log.arrive') {
      const parts = sisters.map((sis, i) => {
        const line = prefer(`feast.log.arrive.${i % 3}`, engineCtx);
        return line.replaceAll('SISNAME', sis.name);
      }).filter(Boolean);
      composed = parts.join(' ');
    } else if (beat === 'feast.log.camille') {
      composed = prefer(`feast.log.camille.${entry.idx}`, engineCtx);
    } else if (beat === 'feast.log.renee') {
      composed = prefer('feast.log.renee', engineCtx);
    } else if (beat === 'feast.log.kylie') {
      composed = prefer('feast.log.kylie', engineCtx);
    } else if (beat === 'feast.log.food') {
      composed = prefer(`feast.log.food.${entry.idx ?? 0}`, engineCtx);
    } else if (beat === 'feast.log.sister') {
      composed = prefer(`feast.log.sister.${entry.idx ?? 0}`, engineCtx)
        .replaceAll('SISNAME', entry.sisName || 'a sister');
    } else if (beat === 'feast.log.camilleEat') {
      composed = prefer(`feast.log.camilleEat.${entry.idx}`, engineCtx);
    } else if (beat === 'feast.log.close') {
      composed = prefer(`feast.log.close.${entry.idx ?? 0}`, engineCtx);
    } else if (beat === 'feast.log.atmoHold') {
      composed = prefer('feast.log.atmoHold', engineCtx);
    } else if (beat === 'feast.log.guestHold') {
      composed = prefer('feast.log.guestHold', engineCtx);
    }
    if (!composed) {
      out.push(entry);
      continue;
    }
    if (entry.gain != null && (beat === 'feast.log.atmoHold' || beat === 'feast.log.guestHold')) {
      composed = `${composed} +${entry.gain} lbs`;
    }
    out.push({ ...entry, text: composed });
  }
  return out;
}
