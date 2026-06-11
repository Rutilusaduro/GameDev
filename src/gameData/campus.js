// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — walk the campus as the professor
// Text-adventure movement over a node graph with a visible map.
// Encounters reference live student state; items can be found.
// ═══════════════════════════════════════════════════════════════

export const CAMPUS_NODES = {
  office: {
    id:"office", label:"Your Office", emoji:"🏛️", x:50, y:78,
    exits:["lecture_hall","faculty_lounge","quad"],
    desc:"Your office. Grade-stained desk, a couch that has heard confessions, and a filing cabinet whose lowest drawer is entirely snacks. The door is always open. That's the whole strategy.",
    flavor:[
      "A thank-you note sits on the desk, unsigned, weighted down with an empty cake box.",
      "The couch cushions are flattened in a way that suggests increasingly heavy office-hours attendance.",
      "Someone has left a crumb trail to your snack drawer. The drawer is lighter than you left it.",
    ],
  },
  lecture_hall: {
    id:"lecture_hall", label:"Lecture Hall", emoji:"🎓", x:30, y:62,
    exits:["office","quad","library"],
    desc:"Banked seating, good acoustics, and — after a quiet word with facilities — chairs without armrests. The whiteboard still has last week's diagram of a tasting menu.",
    flavor:[
      "The seats in the front row have been recently re-bolted. Reinforced. Facilities asks no questions anymore.",
      "A forgotten lunchbox sits on a desk. Inside: a second, smaller lunchbox. Someone is planning ahead.",
      "The vending machine outside has been emptied again. There's a waiting list now. For a vending machine.",
    ],
  },
  quad: {
    id:"quad", label:"The Quad", emoji:"🌳", x:50, y:50,
    exits:["office","lecture_hall","dining_hall","dorms","gym"],
    desc:"The crossroads of campus. Lawn, benches, food trucks idling along the path like opportunists. Everyone passes through here eventually, usually carrying something edible.",
    flavor:[
      "The food trucks have doubled since last semester. Market forces at work.",
      "A picnic on the lawn has entered its fourth hour. The blanket is mostly serving dishes now.",
      "Two girls share a bench built for three and fill it completely. Neither seems bothered. The bench, structurally, has opinions.",
    ],
  },
  dining_hall: {
    id:"dining_hall", label:"Dining Hall", emoji:"🍽️", x:72, y:42,
    exits:["quad","dorms"],
    desc:"All-you-can-eat, a phrase the student body has come to treat as a personal challenge. The staff know your students by name and portion size. The dessert station has tripled its footprint.",
    flavor:[
      "The dining staff are wheeling out a fourth dessert cart. On a Tuesday.",
      "A laminated sign reads 'UNLIMITED MEANS UNLIMITED — Management.' It looks recent and hard-won.",
      "Trays are being carried in stacks of two and three now. The single-tray era is over.",
    ],
  },
  library: {
    id:"library", label:"Library", emoji:"📚", x:18, y:42,
    exits:["lecture_hall","garden"],
    desc:"Hushed stacks and study carrels. The 'no food' signs came down last year — a quiet administrative surrender. Now the third floor smells like a bakery and nobody complains.",
    flavor:[
      "A study group has annexed two tables: one for laptops, one entirely for snacks. The snack table is busier.",
      "Someone dozes in a carrel, a textbook open on the wide shelf of her belly. It rises and falls peacefully.",
      "The librarian restocks a cart labeled 'STUDY FUEL.' It is not books.",
    ],
  },
  gym: {
    id:"gym", label:"Recreation Center", emoji:"🏋️", x:78, y:62,
    exits:["quad","dorms"],
    desc:"Treadmills, weight racks, a juice bar that quietly serves 1,200-calorie 'recovery' shakes. Attendance is steady; results are, by careful design, going the other direction.",
    flavor:[
      "The juice bar's new 'mass gainer' menu board is twice the size of the workout class schedule.",
      "Someone is using the squat rack to hold her snacks at a convenient height. Innovative.",
      "The scale by the lockers has a sticky note: 'OUT OF ORDER (reads too low).' It is not out of order.",
    ],
  },
  dorms: {
    id:"dorms", label:"Dormitories", emoji:"🏠", x:82, y:28,
    exits:["quad","dining_hall","gym"],
    desc:"Residence halls with a delivery problem — in the sense that the lobby is a logistics hub now. Drivers wave at the RA. The RA waves back and signs for everything.",
    flavor:[
      "Six delivery bags wait in the lobby, names sharpied on each. Three are for the same room.",
      "A door on the second floor is propped open; the unmistakable sound of a feast in progress drifts out.",
      "The elevator groans past, fully occupied by one extremely comfortable-looking resident and her groceries.",
    ],
  },
  faculty_lounge: {
    id:"faculty_lounge", label:"Faculty Lounge", emoji:"☕", x:32, y:84,
    exits:["office"],
    desc:"Burnt coffee, departmental gossip, and a communal pastry plate that you keep mysteriously well-stocked. Your colleagues have stopped asking where the éclairs come from.",
    flavor:[
      "The pastry plate is empty again. You feel a craftsman's pride.",
      "Two colleagues debate the cafeteria budget. Both are eating second danishes while they do.",
      "Someone has pinned a potluck signup sheet to the corkboard. It filled up in a day.",
    ],
  },
  garden: {
    id:"garden", label:"Botanical Garden", emoji:"🌿", x:12, y:22,
    exits:["library"],
    desc:"The quiet edge of campus. Greenhouses, fruit trees, a bench with a view. Students come here to eat in peace — and to be honest, that's why you come too.",
    flavor:[
      "The orchard's honor-system fruit stand is empty except for an IOU written in three different hands.",
      "A greenhouse table is laid out with someone's very unbotanical picnic. You pretend not to see it.",
      "Wind through the leaves, birdsong, and from somewhere behind the hedge, the contented sound of someone finishing a very large lunch.",
    ],
  },
};

export const CAMPUS_CONFIG = {
  startNode: "office",
  encounterChance: 0.45,  // chance a move surfaces a student sighting
  itemFindChance: 0.18,   // chance a move turns up a pantry item
  logLimit: 60,
};

// Weight-stage-aware sighting templates. fn(student, stageDescriptor)
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
