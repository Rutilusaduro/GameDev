// Campus finds, evolved arcs, CG + homeroom (Pass 90).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


registerModuleVariants('campus.find', [
  {
    when: { campusTierMin: [2] },
    weight: 1,
    text: [
      'A maintenance closet yields sealed samples — campus wellness branding, appetite-forward chemistry.',
    ],
  },
  {
    when: {},
    weight: 1,
    text: [
      'You follow a smell to a forgotten snack stash — still warm, still generous, still unclaimed.',
    ],
  },
]);

registerModuleVariants('campus.travel', [
  {
    when: {},
    weight: 1,
    text: [
      'Crossing campus, every flyer competes with the dining hall — hunger wins the billboard war.',
    ],
  },
]);

registerModuleVariants('evolved.event.state_fair_queen.s0.p0', [
  {
    when: {},
    weight: 1,
    text: [
      'Midway lights hit MJ first — she tastes county fame and decides the crown is edible.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s0.p1', [
  {
    when: {},
    weight: 1,
    text: [
      'Kayla eats before questions; Bri never stops; Sofia counts cinnamon rolls like homework.',
    ],
  },
]);

registerModuleVariants('evolved.event.wife_lessons.s0.p0', [
  {
    when: {},
    weight: 1,
    text: [
      'Flour dust and gingham — Darlene diets out loud while Wanda eats the basket before the lesson starts.',
    ],
  },
]);

registerModuleVariants('evolved.activity.wife_lessons', [
  {
    when: {},
    weight: 1,
    text: [
      'Kitchen steam carries recipes home — daughters learn appetite the way other kids learn piano.',
    ],
  },
]);

registerModuleVariants('evolved.activity.state_fair_queen', [
  {
    when: {},
    weight: 1,
    text: [
      'Fair grease on MJ’s smile — pride and portions climb the same leaderboard.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.taste_now', [
  {
    when: {},
    weight: 1,
    text: [
      'Mrs. Monroe tastes on principle — one bite becomes two, and Tuesday earns another checkmark.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Kayla.progress_review', [
  {
    when: {},
    weight: 1,
    text: [
      'Grades up, appetite up — Kayla asks if Tuesday still counts. The container answers first.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaFollowup.leading.Driven', [
  {
    when: {},
    weight: 1,
    text: [
      'Priya follows her own post with a smirk — the board updates before anyone finishes chewing.',
    ],
  },
]);

registerModuleVariants('cg.raReply.observe', [
  {
    when: {},
    weight: 1,
    text: [
      'You watch without typing — silence on the thread still feeds the rivalry.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.comfort', [
  {
    when: {},
    weight: 1,
    text: [
      'Radiators hum soft — residents sink into furniture like the hall trained them to.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.synergy', [
  {
    when: {},
    weight: 1,
    text: [
      'Two wings share one appetite now — lounge warmth walks to the stove without asking.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Patrice.s2.greeting', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      '"Store cookies stayed on the counter untouched — your cinnamon buns did not."',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s5.mac_cheese', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Four cheeses, one silence — spoons scrape the pot until mothers forget they brought Tupperware.',
    ],
  },
]);
