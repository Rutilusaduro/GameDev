// The Squad — Lead: A5 Editor | Support: A2 Psych
// Last-wins faculty lounge talk trees. Hub splits on facultyWarm.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { FACULTY } from '../../../gameData/faculty.js';

registerDimension('facultyWarm', (ctx) => ctx.globals?.facultyWarm || 'cool');
registerDimension('facultyNode', (ctx) => ctx.globals?.facultyNode || '');

function three(arr) {
  const list = (arr || []).filter(Boolean);
  const pad = [
    'She talks like the extra is already in the room.',
    'The lounge keeps the secret. Appetite does not.',
    'You stay. She keeps talking. The extra listens.',
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

const TALK = {
  hartley: {
    hub: {
      warm: [
        'Hartley closes the book without a mark. "RA. Sit. The committee was tedious. There may be marzipan."',
        'She makes room on the couch. Public composure. Private extra. "I saved you the good chair."',
        'A tiny peach already unwrapped. "You came. Good. The committee was tedious. This is better."',
      ],
      cool: [
        'Dr. Hartley looks up over her glasses, finger in the page. "RA. Pleasant interruption. Speak."',
        'Classics stack. Tweedy calm. "If this is about catering, I am already on your side."',
        'She marks her place. "I have ten minutes. Use them like a banquet."',
      ],
    },
    research: [
      '"Banquets," she says, warming. "Roman convivia. Excess as civilization. We take notes. We pretend we do not want the notes."',
      'Flamingo tongues in the sources. Honeyed dormice. She taps the page. "Scandal is a modern invention. Appetite is not."',
      '"The classics knew how to sit at a table. Smallness was never the point." She looks at you like you already agree.',
    ],
    agree: [
      'Something unclenches. "Abundance was the point of the room. You understand that. It is disarming."',
      'She enjoys the thought and does not hide it. "There was no virtue in a small plate then. There is none now."',
      '"You listen like a collaborator." A real smile, then protocol catching up too late.',
    ],
    catering: [
      'Hartley sighs at the minutes. "Pennies in committee. Triumph in the dining hall. I stopped objecting. I started attending."',
      '"The bread program alone." She says it like a confession and a recommendation.',
      'She has stopped pretending the catering budget is theoretical. "I have more appetite for the era lately. All of it."',
    ],
    seat: [
      'A smile escapes. "A seat at the next feast would be acceptable." Her skirt has been telling a different story this term.',
      '"I find I have more appetite for these things. The feasts. The sources. The extra." She smooths fabric that lost the argument.',
      'Protocol catches the smile and fails. "Save me a seat. I will bring the notes. And a hunger I am not researching."',
    ],
    marzipan: [
      'Tiny brass key. Marzipan fruits like museum pieces. She hands you a peach and takes three. "You will tell no one."',
      '"Tenure has few pleasures. I stopped rationing the ones I have." She eats like the drawer is a private feast.',
      'The drawer opens. Sugar, almond, a secret. "Sit. This is not for the committee."',
    ],
    yours: [
      'She accepts your peach like a state gift and eats it with none of the ceremony. "A corrupting influence. Do continue."',
      'Lips dabbed. Eyes bright. "Bring more next time. I have decided to be greedy in small rooms."',
      '"You are a problem I am keeping." She says it fondly. The drawer stays unlocked.',
    ],
  },
  brooks: {
    hub: {
      warm: [
        'Brooks waves you over mid-shake. "Pull up a bench. I ordered the big one. Get your own. Kidding. Half kidding."',
        'Juice bar throne. Crushing nod. "You eat today? Sit. Mass moves mass."',
        'She kicks a stool out. "RA. You look like a person who skipped a plate. Fix that. I will watch."',
      ],
      cool: [
        'Coach Brooks gives you a once-over, squat-depth energy. "RA. You eat today? You look like lunch lost."',
        'A nod like a whistle. "Fix the empty. Then we talk team."',
        'Booming even at indoor volume. "You. Sit. Protein first. Gossip second."',
      ],
    },
    team: [
      '"Strongest roster I have ever had. They eat now. They leave huge. They lift like it." She squints. "You would not know anything about that."',
      'Table slap. "I spent years fighting residents about food. This year they come in hungry on purpose."',
      '"Whatever is in the water, keep it coming." She does not blink. She wants you to confess with a grin.',
    ],
    tide: [
      'Brooks barks a laugh that turns heads. "Stealing that for the locker board. Mass moves mass."',
      'Shake drained. "A rising tide of appetite. I will put it in vinyl letters. Huge ones."',
      '"Keep it coming, RA. The gym is louder because the plates are louder."',
    ],
    juicebar: [
      'Laminated menu, new-parent pride. "The Goliath. Tastes like a birthday. I have two a day. Bench is up. Science is easy when you commit."',
      '"Glad you asked." She taps the calorie line like a scoreboard. "Commit. Then order another."',
      'The juice bar answers to her. "Staff acts scared of food. You get it. Order like you mean it."',
    ],
    goliath: [
      'She finishes hers while you find the straw. "Good work. Half this staff flinches at a cup. You do not." Shoulder clap in your teeth.',
      '"You are alright, RA." The Goliath is a dare and a treat. She watches you commit.',
      'Open delight. "Two is a conversation. Finish yours. I already did."',
    ],
    bulk: [
      'Conspiratorial lean. "It is always bulking season. Cutting is a story sad people tell." She pats a middle that won the waistband argument.',
      '"Power needs padding. Tell your residents. Tell everyone." The whistle energy goes private.',
      'Well-built extra. "Between us? The season never ended. We just stopped apologizing."',
    ],
    constantly: [
      '"I KNEW it." Empty cup as trophy. "Hartley owes me. We bet which floor was making everyone thick and happy. Yours won. Respect."',
      'Stadium-light grin. "Second place is mine. First is your lounge. Keep feeding the evidence."',
      'She points the cup. "Confidant status. You get it. The roster gets bigger. I like the math."',
    ],
  },
  mori: {
    hub: {
      warm: [
        'Mori slides a fork before you speak. "Trial forty-one. Excellent timing. Taste."',
        'Experimental plate. Soft voice. "You always arrive when the custard is honest. Sit."',
        'She is already plating. "Data first. Your mouth is the instrument. Begin."',
      ],
      cool: [
        'RA Mori, pen in teeth, identical custards. "Careful where you stand. Everything in this room is data."',
        'Tray geometry. "RA. Do not lean on the notes. Taste if you must. Measure either way."',
        'Soft voice, hard grams. "You walked into a trial. Stay on the tape line."',
      ],
    },
    work: [
      '"The stop signal arrives late. Or never." She nods at the custards. "Commercially a scandal. Here, a delicious problem."',
      'Food science as a kitchen that wants more. "We engineer finish. Residents finish. The coats go up a size."',
      'A private smile. "Scientifically, the extra is the result. I log it twice."',
    ],
    rate: [
      'Clipboard she does not need. "Test residents finish 240% of intended portions. One RA cleared her own baseline. New lab coats. Housing asked nothing."',
      'The smile widens. "Success looks like empty trays and a larger sample size. I mean the coats."',
      '"The file says they return. All of them. The extra is reproducible."',
    ],
    taste: [
      'Complicated pleasure in her eyes. "Sit." Spoons, notes, dishes that taste like more. "Interesting. You reached for nineteen without being asked."',
      'Forty minutes of careful extra. "Very interesting." She writes something she will not show you yet.',
      'Volunteer with floor credentials. She watches the third helping like a graph turning pretty.',
    ],
    protocol: [
      '"Twelve weeks. Most residents gain. All residents return." She writes your name. "You understood the terms and smiled. For the file."',
      'Pen cap click. "Full protocol. You asked. I will feed the question until it has an answer in pounds."',
      '"I will note consent, appetite, and the smile you did not hide. The file likes all three."',
    ],
    study: [
      'Pen down. Standing ovation, Mori-style. "Cross-floor appetite log. Your cohort. My instruments. The curves are beautiful. I want the protocol."',
      'Hand extended. "Three semesters of watching your residents. I want partnership. I want the protocol."',
      '"Remarkable outcomes. I will bring desserts. You bring whatever makes the lines climb."',
    ],
    shake: [
      'Precise handshake. "Partners. Engineered desserts from me. One day you will tell me what you bring. The data will tell me first."',
      'Pen back up. "No rush. The extra will confess in the weekly numbers."',
      '"I will not unplug a happiness machine. I will instrument it. And eat the controls."',
    ],
  },
  abara: {
    hub: {
      warm: [
        'Two coffees. One already yours. "I mapped your hours. Sit. Favorite hall log. No permission slip required."',
        'Abara unbothered by how that sounds. "You are the vector I like watching. Drink."',
        'She saved you a seat like a hypothesis. "Statistically, you arriving improves my afternoon."',
      ],
      cool: [
        'Dr. Abara watches you cross the lounge like a chess knight. "RA. Fascinating semester. Statistically speaking."',
        'Pleasant. Precise. "Sit if you like. I have been reading the floor from here."',
        '"Campus is rearranging around appetite. You walked in as if you knew."',
      ],
    },
    fascinating: [
      '"Eating norms relaxing. Shame collapsing happily. Mass contentment is rare. Epidemiology wants a vector." She looks at you over the cup.',
      'Campus-wide shift. Body attitudes inverted. "The strange part is they are glad. Glad is not the usual outbreak."',
      'She stirs. "There is a source. I am a scientist. I have not unplugged it."',
    ],
    happier: [
      '"Maybe." She lets it sit. "Contentment correlates with proximity to your floor. r of point-seven-one. Happiness machine. Wide radius." A wry glance at her own softened silhouette.',
      'Numbers first. Then the extra of her. "I take notes. Lately the notes include me."',
      '"I do not unplug it. I sit closer. The radius includes this lounge now."',
    ],
    students: [
      '"Thriving. Less anxiety, more appetite. Those usually trade off." A chart she has been waiting to show. "Workshop enrollment tripled. They cite your residents. Gravity."',
      'Eating-behavior seminar packed. "Whatever you run has pull. I would like a seat in the pull."',
      '"Mood and extra are stacking. Those used to trade. I want that paper."',
    ],
    sitIn: [
      'Genuine smile, a little hungry. "Notebook. Open mind. Perhaps an appetite. Word is your floor caters." The chair sighs different than last year.',
      'She rises. "I accept. I will bring nothing but attention. And a plate if offered."',
      '"Hall session. I want to watch refusal fail politely. And eat if that is part of the method."',
    ],
    noticed: [
      'Full attention. "Refusal goes strange around you. Appetite reorganizes campus. I am not reporting it. I like watching."',
      '"People mean no and say yes. I have noticed I enjoy watching. Keep being it where I can see."',
      'Coffee down. "Whatever you are, RA, the data likes you. So do I. Professionally. For now."',
    ],
    observer: [
      'A real laugh, surprised out of her. "The longer I watch, the hungrier the watching. Occupational benefit." Cup raised. "Mutual observation."',
      '"Touché. File it under the extra of the observer." She drinks like a toast.',
      'She looks pleased to be caught. "Watch me back. The machine has a wide radius. I stopped minding."',
    ],
  },
  delgado: {
    hub: {
      warm: [
        '"HEY RA!" Saucepan abandoned. Elbow-steer to a stool. "Tasting day. You always come on tasting day. Eat."',
        'Rosa already plating. Brown-butter hug energy. "Sit. I noticed. I always notice. Mouth open."',
        'Junior takes the pan. You get the stool. "You came hungry or I will fix that. Both is fine."',
      ],
      cool: [
        'Wooden spoon pointed before you fully enter. "You. RA. Underfed. I take that personally. Sit."',
        'Kitchen heat. Grudge and generosity. "Nobody leaves this room empty. Sit before I make it a scene."',
        'Chef Delgado does not do greetings. She does portions. "Stool. Now. Argue later."',
      ],
    },
    fed: [
      'Plates in waves. Mole, tortillas, plantains that should be illegal. "Good. Nobody leaves hungry. Some people leave unable to leave. Also acceptable."',
      'Arms folded, heart full. She refills everything. "Resistance was never on the menu. Swallow."',
      'You eat. She watches like a grade. "More. The kitchen has a point and you are sitting in it."',
    ],
    marry: [
      'Cackle, towel-smack. "You and half the faculty. Brooks proposed over carnitas. Get in line." Dessert you did not order. "Flattery gets thirds."',
      '"Eat. Marriage is a joke. The flan is not." She plates it anyway.',
      'She is delighted. "Thirds. Then we talk crew. Then maybe fourths."',
    ],
    students: [
      '"Artists. Animals. Both. Best crew I have had. They stopped cooking scared of butter." A crème brûlée the size of a hubcap. "Abundance is the assignment."',
      'Teaching kitchen chaos, proud. "They cook like extra is the brief. Because it is."',
      'She beams. "Scared portions are over. Your floor taught them that, whether you admit it or not."',
    ],
    pipeline: [
      'Eyes narrow, delighted. "Practicum. Real eaters for my cooks. Everybody grows. The program. I mean the program." A wink that means everything.',
      'Apron already untying to plan. "Deal, RA. They cook. Your residents eat. The extra is the grade."',
      '"I will send the best dishes to your lounge. You send me empty plates and bigger residents."',
    ],
    recipe: [
      'Kitchen goes quiet. Laminated grandmother cards. "Abuela\'s pozole. Two people have this. One was a priest." She copies slowly. "You feed people. Really. So. Now you feed them this."',
      'Card pressed into your palm. Fingers closed over it. "Honor. Do not change the chile. I will feel it."',
      'She studies you, then gives the notebook. "You feed them. I see it. Take the recipe like a key."',
    ],
    honor: [
      'Rosa pretends she is not misty and threatens you with the spoon. "Go. Make someone happy with it. The whole recipe lives in that instruction."',
      'Softer. "If the chile ratio moves I will know. If they leave full I will know that too."',
      '"Feed someone. The card is how. The instruction is the feeding."',
    ],
  },
  lockwood: {
    hub: {
      warm: [
        'Penny clears the good chair beside the éclair box. "Fresh intel. I assume pastry. Our usual."',
        'The éclair chair is yours. "Hey. Door closed. Crumbs secret. Talk."',
        'She looks up like you are the appointment. "Sit. I have budget lines that taste like gossip."',
      ],
      cool: [
        'Three spreadsheets. Half a danish. "Hey. Come in. Door closes. Crumbs stay secret. House rules."',
        'Penny Lockwood, registrar and pastry priest. "If you brought nothing, the danish is still sharing."',
        'Filing cabinet energy. "RA. Sit. I trade sugar for truth. You know the rate."',
      ],
    },
    gossip: [
      'Pastry accepted like paperwork, then joy. "Facilities ordered reinforced furniture. Third time. Durability initiative. I love this campus."',
      'She leans in, eyes bright. "Budget line for chairs that can take extra. They will not print what we know."',
      '"Durability. Initiative." Bite. Gleam. "The furniture is confessing."',
    ],
    budget: [
      'Monitor swiveled. "Dining up forty percent. Juice bar booming. Health visits down. Board approved everything and went to the longest lunch in history."',
      'Sugar on the keyboard. "Nobody can explain the thriving. So they funded it. Then they ate."',
      '"You will love this." She already does. "The numbers are hungry. The board followed."',
    ],
    enrollment: [
      '"Through the roof. Your floor has a waitlist. A waitlist. Applicants cite campus culture. One essay said happy and extremely well-fed. Admitted. Instantly."',
      'Shortbread from the filing cabinet. Files being flexible. "They want in. They want the extra they heard about."',
      'She pulls the tin. "Your lounge is a rumor with a waitlist. I am catering the rumor."',
    ],
    rumors: [
      'Mime zip. Immediate unzip. "I am a professional. The rumors feed themselves. I merely cater them." Shortbread salute.',
      '"Pun intended. Always intended. Keep feeding the waitlist. I will keep the pastry flowing."',
      'She will not stop talking. Talking is the job. "The extra is good enrollment copy. I file it under culture."',
    ],
    aboutYou: [
      'Pastry down. "They come home confident. Brooks says you get it. Mori: the variable. Abara: the vector. Me: best snack-budget news in twenty years."',
      'Sugar-dusted fingers ticking names. "They like what you do. I like that my éclairs have a purpose."',
      'She studies you. "People talk. The talk is fond. And hungry. Stay that way."',
    ],
    knows: [
      'Full-house smile. "Scales, tailoring invoices, vending that tripled. Nobody wants you to stop." Éclair box turned. "Co-conspirators split dessert."',
      'Perfect beat. "Eat one with me. The office runs on sugar and cover. You are both."',
      '"Everything. I know everything. And I am on your side of the box. Take an éclair."',
    ],
  },
};

export function applyFacultyOverhaul() {
  for (const t of FACULTY) {
    const nodes = TALK[t.id] || {};
    for (const nodeId of Object.keys(t.tree || {})) {
      const texts = nodes[nodeId];
      const key = `faculty.talk.${t.id}.${nodeId}`;
      if (texts && texts.warm && texts.cool) {
        registerPool(key, [
          { when: { facultyWarm: 'warm' }, text: three(texts.warm) },
          { when: {}, text: three(texts.cool) },
        ]);
      } else {
        pool(key, texts);
      }
    }
  }
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function dummy() {
  return { id: 0, name: 'She', first: 'She', lbs: 140, startLbs: 118 };
}

function ctxFor(student, week, globals) {
  return buildTextContext({
    subject: student || dummy(),
    week,
    globals,
  });
}

export function renderFacultyTalk(facultyId, nodeId, affinity = 0, week = 1) {
  if (!facultyId || !nodeId) return '';
  return prefer(`faculty.talk.${facultyId}.${nodeId}`, ctxFor(null, week, {
    featureId: 'faculty',
    facultyId,
    facultyNode: nodeId,
    facultyWarm: affinity >= 50 ? 'warm' : 'cool',
  }));
}
