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
