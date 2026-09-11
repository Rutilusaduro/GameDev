// AIB agenda cards + hearing endings — late-semester modular overlays.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('opposition.scene.agendaInstitutional', [
  {
    when: {},
    weight: 2,
    text: [
      'The Board plays institutional — clipboard, lanyard, wellness language sharp enough to cut.',
      'Late-semester agenda fire: scrutiny dressed as care, appetite framed as liability on your floor.',
      'Vance schedules policy like a threat; your hall schedules meals like a rebuttal waiting to happen.',
      'Compliance arrives with slides and silence about how good your residents smell like dinner.',
      'Hall Ambiance cannot enter their meeting room — only your counter-moves and nerve.',
    ],
  },
]);

registerPool('opposition.scene.agendaHallCost', [
  {
    when: {},
    weight: 2,
    text: [
      'Residents feel the card land before you do — shame, freeze, or a hearing date on someone\'s name.',
      'Every agenda play costs something edible: budget, dignity, or a week of pretending restraint is real.',
      'Growth as lifestyle meets growth as evidence — you will answer with warmth, data, or catering.',
      'The hall tightens its stomach collectively; you tighten your plan before the next tray cools.',
      'Opposition learns your floor is fed on purpose; they escalate because fullness refuses to apologize.',
    ],
  },
]);

const AGENDA_LATE = '{opposition.scene.agendaInstitutional|suffix:\n\n}{opposition.scene.agendaHallCost|suffix:\n\n}';

for (const cardId of [
  'wellness_audit',
  'removal_hearing',
  'size_review',
  'budget_freeze',
  'wellness_seminar',
]) {
  registerModuleVariants(`opposition.agenda.${cardId}`, [
    {
      when: { weekMin: 22 },
      weight: 8,
      priority: 7,
      text: [AGENDA_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [AGENDA_LATE],
    },
  ]);
}

registerPool('opposition.scene.endingRelief', [
  {
    when: {},
    weight: 2,
    text: [
      'The gavel hesitates — removal denied, enrollment intact, appetite unmoved and unapologetic.',
      'Hearing collapses into crumbs and contradiction; {subject.name} walks out fed, enrolled, watched.',
      'Victory tastes like catering: messy, warm, undeniable — scrutiny doubled but hunger protected.',
      'Vance closes without the signature she wanted; the hall exhales abundance back into its halls.',
      'Late-semester ending: policy lost to plates, testimony, and co-conspirator fullness.',
    ],
  },
]);

registerPool('opposition.scene.endingEcho', [
  {
    when: {},
    weight: 2,
    text: [
      'Board members leave hungrier than they arrived — famine rhetoric starved mid-sentence.',
      'The record will remember concern; residents will remember who fed them when institutions did not.',
      'Conditions may follow; so will seconds — growth as lifestyle does not suspend for paperwork.',
      'Hall Ambiance climbs back toward neutral as pressure leaks out the conference room doors.',
      'You file the win under survival — tender dominance, portions unmistakable, week not yet over.',
    ],
  },
]);

const ENDING_LATE = '{opposition.scene.endingRelief|suffix:\n\n}{opposition.scene.endingEcho|suffix:\n\n}';

for (const pool of [
  'opposition.hearing.removal.ending.discredit_feast',
  'opposition.hearing.removal.ending.testify_firm',
  'opposition.hearing.removal.ending.advocate_voice',
  'opposition.hearing.emergency.ending.catered_future',
]) {
  registerModuleVariants(pool, [
    {
      when: { weekMin: 22 },
      weight: 8,
      priority: 7,
      text: [ENDING_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [ENDING_LATE],
    },
  ]);
}

registerPool('opposition.scene.removalFeastPlay', [
  {
    when: {},
    weight: 2,
    text: [
      'You serve during procedure — trays mid-sentence, steam rewriting the agenda before votes harden.',
      'Removal hearing becomes dinner: board members chew while motion language dissolves into sweetness.',
      'Floor pressure via hospitality — fullness does what argument could not, one polite bite at a time.',
      'Appetite interrupts institutional theater; wellness framing starves between second helpings.',
      'Catering as counter-move — growth measured in clean plates and softened resolve.',
    ],
  },
]);

registerModuleVariants('opposition.hearing.removal.result.feast', [
  {
    when: { weekMin: 22 },
    weight: 8,
    priority: 7,
    text: ['{opposition.scene.removalFeastPlay|suffix:\n\n}{opposition.scene.cateredVote|suffix:\n\n}'],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 4,
    text: ['{opposition.scene.removalFeastPlay|suffix:\n\n}{opposition.scene.cateredVote|suffix:\n\n}'],
  },
]);
