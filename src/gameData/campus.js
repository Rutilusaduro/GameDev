// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — walk the campus as the professor
// Text-adventure movement over a node graph with a visible map.
// Encounters reference live student state; items can be found.
// 18 zones; faculty homeZone nodes are marked with *
// ═══════════════════════════════════════════════════════════════

export const CAMPUS_NODES = {
  // ── core academic ──────────────────────────────────────────
  office: {
    id:"office", label:"Your Office", emoji:"🏛️", x:52, y:76,
    exits:["lecture_hall","faculty_lounge","quad","rooftop"],
    desc:"Your office. Grade-stained desk, a couch that has heard confessions, and a filing cabinet whose lowest drawer is entirely snacks. The door is always open. That's the whole strategy.",
    flavor:[
      "A thank-you note sits on the desk, unsigned, weighted down with an empty cake box.",
      "The couch cushions are flattened in a way that suggests increasingly heavy office-hours attendance.",
      "Someone has left a crumb trail to your snack drawer. The drawer is lighter than you left it.",
    ],
  },
  lecture_hall: {
    id:"lecture_hall", label:"Lecture Hall", emoji:"🎓", x:32, y:60,
    exits:["office","quad","library","science_wing"],
    desc:"Banked seating, good acoustics, and — after a quiet word with facilities — chairs without armrests. The whiteboard still has last week's diagram of a tasting menu.",
    flavor:[
      "The seats in the front row have been recently re-bolted. Reinforced. Facilities asks no questions anymore.",
      "A forgotten lunchbox sits on a desk. Inside: a second, smaller lunchbox. Someone is planning ahead.",
      "The vending machine outside has been emptied again. There's a waiting list now. For a vending machine.",
    ],
  },
  // * Dr. Abara's home: lecture_hall (psychology — uses the lecture hall)
  science_wing: {
    id:"science_wing", label:"Science Wing", emoji:"🔬", x:14, y:58,
    exits:["lecture_hall","library"],
    desc:"Labs that smell of solvents and something baked. Professor Mori's food-science lab takes up the entire third floor and produces scents that violate the ventilation assumptions of the original blueprints.",
    flavor:[
      "A whiteboard outside Lab 3C reads: 'SENSORY TRIAL TODAY — VOLUNTEERS EAT FREE (EXTENSIVELY).'",
      "A mini-fridge in the hallway, labelled 'RESEARCH SAMPLES,' has been raided. The label has been edited to read 'RESEARCH SAMPLES (THEORETICAL).'",
      "The lab safety sheet has a new line: 'Do not operate heavy equipment after consuming test batch B.'",
    ],
  },
  quad: {
    id:"quad", label:"The Quad", emoji:"🌳", x:52, y:48,
    exits:["office","lecture_hall","dining_hall","dorms","gym","coffee_shop","student_union"],
    desc:"The crossroads of campus. Lawn, benches, food trucks idling along the path like opportunists. Everyone passes through here eventually, usually carrying something edible.",
    flavor:[
      "The food trucks have doubled since last semester. Market forces at work.",
      "A picnic on the lawn has entered its fourth hour. The blanket is mostly serving dishes now.",
      "Two girls share a bench built for three and fill it completely. Neither seems bothered. The bench, structurally, has opinions.",
    ],
  },
  library: {
    id:"library", label:"Library", emoji:"📚", x:18, y:40,
    exits:["lecture_hall","garden","science_wing","theater"],
    desc:"Hushed stacks and study carrels. The 'no food' signs came down last year — a quiet administrative surrender. Now the third floor smells like a bakery and nobody complains.",
    flavor:[
      "A study group has annexed two tables: one for laptops, one entirely for snacks. The snack table is busier.",
      "Someone dozes in a carrel, a textbook open on the wide shelf of her belly. It rises and falls peacefully.",
      "The librarian restocks a cart labeled 'STUDY FUEL.' It is not books.",
    ],
  },
  dining_hall: {
    id:"dining_hall", label:"Dining Hall", emoji:"🍽️", x:72, y:40,
    exits:["quad","dorms","food_court","coffee_shop"],
    desc:"All-you-can-eat, a phrase the student body has come to treat as a personal challenge. The staff know your students by name and portion size. The dessert station has tripled its footprint.",
    flavor:[
      "The dining staff are wheeling out a fourth dessert cart. On a Tuesday.",
      "A laminated sign reads 'UNLIMITED MEANS UNLIMITED — Management.' It looks recent and hard-won.",
      "Trays are being carried in stacks of two and three now. The single-tray era is over.",
    ],
  },
  gym: {
    id:"gym", label:"Recreation Center", emoji:"🏋️", x:80, y:60,
    exits:["quad","dorms","outdoor_track"],
    desc:"Treadmills, weight racks, a juice bar that quietly serves 1,200-calorie 'recovery' shakes. Attendance is steady; results are, by careful design, going the other direction.",
    flavor:[
      "The juice bar's new 'mass gainer' menu board is twice the size of the workout class schedule.",
      "Someone is using the squat rack to hold her snacks at a convenient height. Innovative.",
      "The scale by the lockers has a sticky note: 'OUT OF ORDER (reads too low).' It is not out of order.",
    ],
  },
  dorms: {
    id:"dorms", label:"Dormitories", emoji:"🏠", x:84, y:28,
    exits:["quad","dining_hall","gym","health_center","food_court"],
    desc:"Residence halls with a delivery problem — in the sense that the lobby is a logistics hub now. Drivers wave at the RA. The RA waves back and signs for everything.",
    flavor:[
      "Six delivery bags wait in the lobby, names sharpied on each. Three are for the same room.",
      "A door on the second floor is propped open; the unmistakable sound of a feast in progress drifts out.",
      "The elevator groans past, fully occupied by one extremely comfortable-looking resident and her groceries.",
    ],
  },
  faculty_lounge: {
    id:"faculty_lounge", label:"Faculty Lounge", emoji:"☕", x:34, y:82,
    exits:["office"],
    desc:"Burnt coffee, departmental gossip, and a communal pastry plate that you keep mysteriously well-stocked. Your colleagues have stopped asking where the éclairs come from.",
    flavor:[
      "The pastry plate is empty again. You feel a craftsman's pride.",
      "Two colleagues debate the cafeteria budget. Both are eating second danishes while they do.",
      "Someone has pinned a potluck signup sheet to the corkboard. It filled up in a day.",
    ],
  },
  garden: {
    id:"garden", label:"Botanical Garden", emoji:"🌿", x:8, y:22,
    exits:["library","theater"],
    desc:"The quiet edge of campus. Greenhouses, fruit trees, a bench with a view. Students come here to eat in peace — and to be honest, that's why you come too.",
    flavor:[
      "The orchard's honor-system fruit stand is empty except for an IOU written in three different hands.",
      "A greenhouse table is laid out with someone's very unbotanical picnic. You pretend not to see it.",
      "Wind through the leaves, birdsong, and from somewhere behind the hedge, the contented sound of someone finishing a very large lunch.",
    ],
  },

  // ── new zones ──────────────────────────────────────────────
  // * Professor Mori's home: science_wing (already above)
  food_court: {
    id:"food_court", label:"Food Court", emoji:"🍜", x:70, y:22,
    exits:["dining_hall","dorms","student_union"],
    desc:"Six vendors and a rotating seasonal kiosk, organized under a glass atrium with very flattering lighting. Chef Delgado's culinary lab smells of caramelized sugar from eight on the dot every morning. The court never fully closes.",
    flavor:[
      "A student carries three food-court containers stacked in one arm with practiced efficiency.",
      "The queue at Delgado's window wraps the atrium. Some are waiting. Most are already eating something else while they wait.",
      "A chalkboard special reads 'WEDNESDAY BELLY-BUSTER BOWL — BOTTOMLESS.' The chalk is fresh.",
    ],
  },
  student_union: {
    id:"student_union", label:"Student Union", emoji:"🏢", x:52, y:28,
    exits:["quad","food_court","dorms","arts_wing"],
    desc:"The administrative hub where unofficial things get officially ignored. The registrar's window has the longest line on campus. Lockwood has worked this window for twelve years. She remembers every student's name and every late enrollment waiver she has ever granted.",
    flavor:[
      "The bulletin board is a palimpsest of flyers; the bottom layer is from six semesters ago. A wellness announcement. It has not aged well.",
      "The vending alcove has been colonized by a study group using it as a snack depot.",
      "A girl at the registrar's window is gesturing expressively. Lockwood listens with the expression of someone who has already made up her mind and has all day.",
    ],
  },
  coffee_shop: {
    id:"coffee_shop", label:"The Commons Café", emoji:"☕", x:64, y:52,
    exits:["quad","dining_hall"],
    desc:"Soft chairs, decent espresso, and pastries that are theoretically for sale and practically communal. The staff have stopped enforcing the one-item-minimum. It wasn't worth the looks.",
    flavor:[
      "Every table has something sweet on it. The ones without coffee cups have more pastries.",
      "A girl waits for her order, phone in one hand and a half-eaten muffin from somewhere else in the other.",
      "The loyalty card program has been abused to the point that the barista just smiles and waves the heavy regulars through.",
    ],
  },
  arts_wing: {
    id:"arts_wing", label:"Arts Wing", emoji:"🎨", x:26, y:28,
    exits:["library","student_union","theater"],
    desc:"Paint smell, clay smell, the specific smell of art-program stress baking. Studios line the hall and spill into the corridor with sculptures and stretched canvases. Several pieces are figurative. They have a theme.",
    flavor:[
      "A maquette on a pedestal is figure study — rounded, generous, confident. The placard says 'FORMS IN REPOSE.' The professor gave it a 94.",
      "A life-drawing class is wrapping up. The model eats a snack on the dais with the nonchalance of royalty.",
      "Charcoal smudges on the hallway wall map a trajectory of this semester's major project. They are impressive.",
    ],
  },
  outdoor_track: {
    id:"outdoor_track", label:"Outdoor Track", emoji:"🏃", x:88, y:46,
    exits:["gym"],
    desc:"Quarter-mile loop, bleachers, and a field house nobody goes to after the vending machines were removed. Coach Brooks runs fitness assessments here. She has quietly stopped recording the weight measurements.",
    flavor:[
      "Three girls walk the track in a cluster, snacks in hand. It counts as exercise. Brooks said so.",
      "The bleachers double as a lunch spot for students who want the fresh air without the movement.",
      "Someone's left a bag from the food court wedged under a bleacher seat. For later, presumably.",
    ],
  },
  health_center: {
    id:"health_center", label:"Health Center", emoji:"🏥", x:88, y:14,
    exits:["dorms"],
    desc:"Student medical. The nurse stocks nutritional supplements beside the bandages. The waiting room chairs were upgraded last spring, quietly, without announcement. Nobody asked why. Everyone knows why.",
    flavor:[
      "The nutrition pamphlets on the rack have been reorganized by someone, most-reaching-for-first. Bulk calorie guides are at eye level.",
      "A student exits looking content. She was there for a routine check. It went well by any meaningful metric.",
      "The new scale in the corner has a larger platform and a higher max than the old one. The nurse replaced it in March and said nothing.",
    ],
  },
  theater: {
    id:"theater", label:"Performing Arts Theater", emoji:"🎭", x:14, y:22,
    exits:["library","arts_wing","garden"],
    desc:"Six hundred seats, a pit orchestra that is always behind schedule, and a wardrobe department that has gotten very good at letting things out. This semester's production is a musical. The costumes have elastic.",
    flavor:[
      "Rehearsal noise leaks through the lobby doors — the blocking has changed three times because of logistical realities.",
      "A costume rack in the hall has notecards pinned to each piece: 'REVISED FIT — see Wardrobe.' Most are from this week.",
      "The director's board outside reads 'NOTES: BLOCKING, ACT II. Also: EVERYONE EAT, WE NEED THE ENERGY.' Both goals are being met.",
    ],
  },
  rooftop: {
    id:"rooftop", label:"Admin Rooftop", emoji:"🌆", x:58, y:88,
    exits:["office"],
    desc:"Locked access, officially. You have the key. The rooftop looks over the whole campus — the food trucks on the quad, the science wing's persistent smell, the dining hall's impossible throughput. From here, the scope of the thing is visible all at once.",
    flavor:[
      "The quad below is busy. There is always a queue somewhere.",
      "A delivery truck navigates to the dorm loading dock. It is not the first today.",
      "The campus stretches out in all directions, domestically enormous. You built this, more or less.",
    ],
  },
};

export const CAMPUS_CONFIG = {
  startNode: "office",
  encounterChance: 0.45,
  itemFindChance: 0.18,
  logLimit: 60,
};

export const CAMPUS_ENCOUNTERS = [
  (s,sd) => `You spot ${s.name} ${sd.move}. She waves when she sees you${sd.heavy?", the gesture setting off a slow ripple she makes no attempt to hide":""}.`,
  (s,sd) => `${s.name} is here, ${sd.eat}. She catches your eye and, very deliberately, takes another bite.`,
  (s,sd) => `${s.name} passes by${sd.heavy?" — gradually":""}. ${sd.aside}`,
];

export const stageDescriptor = (stageId) => {
  if (stageId <= 2) return {
    heavy:false,
    move:"walking briskly between buildings",
    eat:"picking at a snack between classes",
    aside:"There's a new softness about her that wasn't on the syllabus.",
  };
  if (stageId <= 5) return {
    heavy:false,
    move:"strolling along the path, in no hurry at all",
    eat:"working through a very full lunch with practiced commitment",
    aside:"Her wardrobe is fighting a rearguard action, and losing graciously.",
  };
  if (stageId <= 8) return {
    heavy:true,
    move:"making her unhurried, swaying way across the grounds",
    eat:"installed at a table behind an impressive spread, pacing herself like a professional",
    aside:"People step aside for her now. She has visibly stopped minding — started enjoying it, even.",
  };
  return {
    heavy:true,
    move:"holding court from the sturdiest bench on the row, going nowhere, needing nothing",
    eat:"being handed things to eat by an attentive orbit of friends",
    aside:"She is less a passerby than a landmark, and campus has quietly reorganized itself around her.",
  };
};
