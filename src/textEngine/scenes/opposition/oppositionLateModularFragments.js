// Opposition hearings + endgame — late-semester modular overlays.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('opposition.scene.boardPressure', [
  {
    when: {},
    weight: 2,
    text: [
      'Toner, polished tables, and appetite dressed as policy — the board room leans institutional before anyone speaks.',
      'Chairwoman Vance\'s folder could bruise; every chair feels like a verdict waiting in advance.',
      'Late-semester scrutiny smells like denial cooling on catered coffee and unspoken hunger metrics.',
      'Wellness language lines the walls; abundance waits outside like weather the building pretends not to track.',
      'Hall Ambiance cannot follow you here — only procedure, portraits, and the soft threat of signatures.',
    ],
  },
]);

registerPool('opposition.scene.hearingHeat', [
  {
    when: {},
    weight: 2,
    text: [
      '{subject.name} sits beside you — visible, measurable, every pound a datapoint the room pretends is neutral.',
      'You feel the hall behind your ribs: residents fed, scales honest, scarcity framed as someone else\'s problem.',
      'The gavel has not landed; appetite already argues in whispers and side-eye toward the snack table.',
      'Institutional air presses thin; your counter-language will need warmth, portions, and nerve.',
      'Growth as lifestyle meets growth as liability — the hearing is where both stories fight for oxygen.',
    ],
  },
]);

registerPool('opposition.scene.cateredVote', [
  {
    when: {},
    weight: 2,
    text: [
      'Trays arrive mid-sentence — catering as strategy, hunger rewriting the agenda before the motion finishes.',
      'You feed the hearing itself; board members chew while procedure forgets how to sound stern.',
      'Appetite interrupts procedure: steam, sweetness, and the soft collapse of famine rhetoric between bites.',
      'Hearing catered on purpose — wellness framing dissolves into napkins and second helpings.',
      'The room slows around chewing; votes lean fuller, warmer, less interested in pretending restraint is policy.',
    ],
  },
]);

registerPool('opposition.scene.boardAppetite', [
  {
    when: {},
    weight: 2,
    text: [
      'Vance\'s mouth tightens; a colleague reaches for another roll anyway — co-conspirator silence.',
      'Folders stay open; forks win the argument appetite always wins in late semester.',
      'Scandal meter cools one degree per swallowed bite — abundance as bribe, tender and unmistakable.',
      'Chat would call it content; the board calls it lunch and stops performing shock.',
      'You watch hunger do your lobbying — growth measured in clean plates and relieved shoulders.',
    ],
  },
]);

registerPool('opposition.scene.endgameAbundance', [
  {
    when: {},
    weight: 2,
    text: [
      'Scarcity folds — the hall exhales abundance and the board stops pretending famine is policy.',
      'Passive abundance swells; evolved residents ascend and hunger becomes ally instead of indictment.',
      'Late-semester synthesis: every seat fed, every curse thinned, institutional shame losing its teeth.',
      'The pharmacist crowned, the floor luminous — wellness metrics finally honest about what fullness costs.',
      'Hall Ambiance climbs back to neutral as pressure lifts; appetite logged as victory, not violation.',
    ],
  },
]);

registerPool('opposition.scene.synthesisEcho', [
  {
    when: {},
    weight: 2,
    text: [
      'You feel the +10% in the air — not magic, momentum: residents orbiting food without flinching.',
      'Capture holds the line; scarcity cannot climb past a whisper while your roster stays devoted.',
      'The board adjourns hungry for once — not for control, for seconds they will not admit aloud.',
      'Endgame prose should taste like relief with portions: policy beaten by plates, not speeches.',
      'Your hall breathes out; the game remembers this beat as abundance choosing a side.',
    ],
  },
]);

const HEARING_OPEN_LATE = '{opposition.scene.boardPressure|suffix:\n\n}{opposition.scene.hearingHeat|suffix:\n\n}';
const FEAST_BRIBE_LATE = '{opposition.scene.cateredVote|suffix:\n\n}{opposition.scene.boardAppetite|suffix:\n\n}';
const ENDGAME_SYNTH_LATE = '{opposition.scene.endgameAbundance|suffix:\n\n}{opposition.scene.synthesisEcho|suffix:\n\n}';

registerModuleVariants('opposition.hearing.open', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [HEARING_OPEN_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [HEARING_OPEN_LATE],
  },
]);

registerModuleVariants('opposition.hearing.emergency.result.feast_bribe', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [FEAST_BRIBE_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [FEAST_BRIBE_LATE],
  },
]);

registerModuleVariants('opposition.endgame.synthesis', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [ENDGAME_SYNTH_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [ENDGAME_SYNTH_LATE],
  },
]);

registerPool('opposition.scene.removalDocket', [
  {
    when: {},
    weight: 2,
    text: [
      'Removal hearing opens — {subject.name} at {studentLbs} lbs projected like liability, appetite framed as institutional emergency.',
      'Vance queues slides: meal photos, timestamps, wellness language thick enough to hide envy.',
      'The docket smells like toner and denial; your resident sits warm, enormous, unapologetic beside you.',
      'Documentation performs concern while {subject.name} performs hunger — two stories fighting for the room.',
      'Late-semester scrutiny counts pounds like votes; the Board pretends neutrality and watches her breathe.',
    ],
  },
]);

registerPool('opposition.scene.restraintFarce', [
  {
    when: {},
    weight: 2,
    text: [
      'Vance asks for restraint spoken like virtue — conditional enrollment hanging on vocabulary, not portions.',
      'Second motion: discretion promises while bellies remember lunch with perfect clarity.',
      'The word restraint lands wrong; {subject.name}\'s middle answers with honest weight and soft fabric strain.',
      'Language wars appetite tonight — you will need testimony, warmth, and nerve, not shame.',
      'Folders stay open; forks wait in the hall memory — growth as lifestyle on trial in public.',
    ],
  },
]);

const REMOVAL_P0_LATE = '{opposition.scene.removalDocket|suffix:\n\n}{opposition.scene.boardPressure|suffix:\n\n}';
const REMOVAL_P1_LATE = '{opposition.scene.restraintFarce|suffix:\n\n}{opposition.scene.hearingHeat|suffix:\n\n}';

registerModuleVariants('opposition.hearing.removal.phase0', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [REMOVAL_P0_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [REMOVAL_P0_LATE],
  },
]);

registerModuleVariants('opposition.hearing.removal.phase1', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [REMOVAL_P1_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [REMOVAL_P1_LATE],
  },
]);

registerPool('opposition.scene.emergencyExposure', [
  {
    when: {},
    weight: 2,
    text: [
      'Scandal meter critical — emergency session, no agenda, only exposure under fluorescent guilt.',
      'Vance convenes without notice: "Explain yourself, RA," while the chart glows red behind her.',
      'Every board member arrived angry and underfed; appetite for your failure fills the room first.',
      'Accreditation risk hangs unspoken — housing on record tonight, wellness language sharpened to a blade.',
      'Late-semester emergency: no toner smell, only heat — scandal as sport, your hall as headline.',
    ],
  },
]);

registerPool('opposition.scene.emergencyStake', [
  {
    when: {},
    weight: 2,
    text: [
      'Second round — reputations weighed like bodies; the observer\'s pen never stops moving.',
      'Every counter you play costs something the hall can feel in its stomach tomorrow.',
      'Vance offers no path without price — choose what abundance can afford to lose in public.',
      'Institutional hunger meets institutional fear; you need metrics, nerve, and maybe catering.',
      'Growth as lifestyle on trial under emergency lights — no hallway Ambiance, only verdict energy.',
    ],
  },
]);

const EMERGENCY_P0_LATE = '{opposition.scene.emergencyExposure|suffix:\n\n}{opposition.scene.boardPressure|suffix:\n\n}';
const EMERGENCY_P1_LATE = '{opposition.scene.emergencyStake|suffix:\n\n}{opposition.scene.hearingHeat|suffix:\n\n}';

registerModuleVariants('opposition.hearing.emergency.phase0', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [EMERGENCY_P0_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [EMERGENCY_P0_LATE],
  },
]);

registerModuleVariants('opposition.hearing.emergency.phase1', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [EMERGENCY_P1_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [EMERGENCY_P1_LATE],
  },
]);

registerPool('opposition.scene.testifyWarmth', [
  {
    when: {},
    weight: 2,
    text: [
      'A resident speaks — warm, specific, unashamed; devotion lands like food on a cold table.',
      'Testimony turns metrics into names: hunger with a face, growth with a favorite meal remembered aloud.',
      'The room shifts one degree — concern performs, love answers with portions and patience.',
      'Plain sentences do what slides cannot — {subject.name} loved in public, appetite defended as family.',
      'Late-semester testimony: wellness language thins while gratitude thickens in the air.',
    ],
  },
]);

registerPool('opposition.scene.testifyDevotion', [
  {
    when: {},
    weight: 2,
    text: [
      'Vance\'s pen stops; even the observer looks up from notes that suddenly feel petty.',
      'Board members glance at each other — famine rhetoric starving mid-sentence.',
      'Hall Ambiance remembered in a story about midnight snacks and someone checking in kindly.',
      'Co-conspirator warmth without scandal — community framed as care, not conspiracy.',
      'Growth as lifestyle spoken by someone who chose it; the hearing exhales, unconvinced but softer.',
    ],
  },
]);

registerPool('opposition.scene.counterMomentum', [
  {
    when: {},
    weight: 2,
    text: [
      'Your counter lands — institutional momentum falters; abundance stays defensible another week.',
      'The board stumbles off-balance, clipboards momentarily heavier than their arguments.',
      'Late-semester counters taste like strategy: catering, culture slides, mesh noise — appetite as policy.',
      'Scrutiny cools a degree; the hall feels it in its stomach before the log updates.',
      'Wellness framing cracks; you wedge warmth into the gap before Vance can reseal it.',
    ],
  },
]);

registerPool('opposition.scene.counterAfterglow', [
  {
    when: {},
    weight: 2,
    text: [
      'Members chew metaphorically — resolve dips, truce weeks bloom, famine talk loses urgency.',
      'For seven days the scales tip toward plates, not punishments — victory measured in quiet halls.',
      'Residents orbit food without flinching; opposition learns hunger is not a temporary phase here.',
      'The message echoes: your hall feeds on purpose, and institutions can be bribed with honesty plus dessert.',
      'Counter afterglow — soft, full, unmistakably on purpose.',
    ],
  },
]);

const TESTIFY_LATE = '{opposition.scene.testifyWarmth|suffix:\n\n}{opposition.scene.testifyDevotion|suffix:\n\n}';
const COUNTER_LATE = '{opposition.scene.counterMomentum|suffix:\n\n}{opposition.scene.counterAfterglow|suffix:\n\n}';

const HOLD_FIRM_LATE = '{opposition.scene.restraintFarce|suffix:\n\n}{opposition.scene.counterMomentum|suffix:\n\n}{opposition.scene.counterAfterglow|suffix:\n\n}';

for (const pool of [
  'opposition.hearing.removal.result.testify',
  'opposition.hearing.removal.result.advocate',
]) {
  registerModuleVariants(pool, [
    {
      when: { weekMin: 22 },
      weight: 8,
      priority: 7,
      text: [TESTIFY_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [TESTIFY_LATE],
    },
  ]);
}

registerModuleVariants('opposition.hearing.removal.result.hold_firm', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [HOLD_FIRM_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [HOLD_FIRM_LATE],
  },
]);

registerModuleVariants('opposition.counter.success', [
  {
    when: { weekMin: 22 },
    weight: 9,
    priority: 8,
    text: [COUNTER_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 5,
    priority: 5,
    text: [COUNTER_LATE],
  },
]);

registerModuleVariants('opposition.counter.discredit', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: [
      '{opposition.scene.counterMomentum|suffix:\n\n}Counter lands surgical — abundance reframed before the board can flinch.',
    ],
  },
]);

registerModuleVariants('opposition.hearing.removal.result.testify', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Her testimony lands soft and certain — the Board hears devotion before policy.',
    ],
  },
]);

registerModuleVariants('opposition.proxy.wellness_coalition', [
  {
    when: { weekMin: [10] },
    weight: 1,
    text: [
      'The coalition smiles through policy — your hall’s abundance is the exhibit they fear.',
    ],
  },
]);
