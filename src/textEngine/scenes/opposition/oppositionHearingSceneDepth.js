// The Squad — Lead: A2 Psych | Support: A4 Architect
// Per-student + stage depth on opposition hearing fragment pools.
import { registerModuleVariants } from '../../engine.js';

const W = 4;

registerModuleVariants('opposition.hearing.removal.phase0', [
  { when: { studentId: 2, stageMin: 5 }, weight: W, text: [
    `Vance projects Kylie's feed screenshots — {studentLbs} lbs framed as scandal. The chat would disagree.`,
  ]},
  { when: { studentId: 8, stageMin: 4 }, weight: W, text: [
    `Maya at {studentLbs} pounds on the slide deck — quiet resident, loud folder. She does not flinch.`,
  ]},
  { when: { studentId: 15, stageMin: 6 }, weight: W, text: [
    `Lilith fills the projector frame — {studentLbs} lbs presented as threat. She looks bored.`,
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    `{subject.name} at {studentLbs} pounds beside you — vast, warm, unapologetic while Vance performs concern.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.phase1', [
  { when: { studentId: 0 }, weight: W, text: [
    `Vance demands restraint. Brittany's jaw sets — captain does not apologize for eating.`,
  ]},
  { when: { studentId: 7 }, weight: W, text: [
    `Priya adjusts her glasses. "Define restraint," she says. The Board has no metric.`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `Conditional enrollment spoken like virtue. {subject.name}'s belly remembers lunch anyway.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.result.testify', [
  { when: { studentId: 6 }, weight: W, text: [
    `Tiffany testifies with chapter grace — devotion spoken polite and fierce. Vance flinches.`,
  ]},
  { when: { studentId: 13 }, weight: W, text: [
    `Daisy speaks warm and certain — loves {subject.name} out loud. The room softens.`,
  ]},
  { when: { studentId: 8 }, weight: W, text: [
    `Maya says one sentence. It lands harder than a speech. Vance's pen stops.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.result.discredit', [
  { when: { studentId: 1 }, weight: W, text: [
    `Cassidy's projector pairs Board catering photos with wellness slides — hypocrisy visible.`,
  ]},
  { when: { studentId: 18, custom: false }, weight: W, text: [
    `Talia buries the audit in thermal noise — wrong numbers, beautiful chaos, Vance blinking.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.result.feast', [
  { when: { studentId: 10 }, weight: W, text: [
    `Reneé serves mid-hearing — courses arrive, procedure dissolves into appetite.`,
  ]},
  { when: { studentId: 14 }, weight: W, text: [
    `Mary Jane's trays interrupt Vance — steam, sweetness, Board eating before voting.`,
  ]},
  { when: { stageMin: 6 }, weight: 3, text: [
    `You serve. They eat. The hearing becomes dinner — institutional theater undone.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.ending.testify_firm', [
  { when: { studentId: 0 }, weight: W, text: [
    `Brittany stays enrolled — captain wins another round. Appetite unmoved.`,
  ]},
  { when: { studentId: 8 }, weight: W, text: [
    `Maya stays — one exhale in the hall, verdict survived, trust intact.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.ending.suspended', [
  { when: { studentId: 2 }, weight: W, text: [
    `Kylie suspended from campus — stream continues off-site, hunger undefeated.`,
  ]},
  { when: { studentId: 5 }, weight: W, text: [
    `Destiny banned from quad — "IRL debuff," she mutters. Stream audience grows.`,
  ]},
]);

registerModuleVariants('opposition.hearing.emergency.phase0', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `Scandal critical — hall mass on the chart, Vance hungry for a name to blame.`,
  ]},
  { when: { studentId: 12 }, weight: W, text: [
    `Nadia watches Vance perform crisis — clinical interest, private amusement.`,
  ]},
]);

registerModuleVariants('opposition.hearing.emergency.result.feast_bribe', [
  { when: { studentId: 13 }, weight: W, text: [
    `Daisy's catering lands mid-sentence — Southern hospitality defeats procedure.`,
  ]},
  { when: { studentId: 10 }, weight: W, text: [
    `Reneé feeds the Board like a tasting menu — hostility softening bite by bite.`,
  ]},
]);

registerModuleVariants('opposition.hearing.emergency.result.hive', [
  { when: { studentId: 18, custom: false }, weight: W, text: [
    `Talia's mesh misdirects records — audit trail loses appetite, Vance blinking.`,
  ]},
  { when: { studentId: 7 }, weight: W, text: [
    `Priya's data redirect — spreadsheets diverge, scandal starved of numbers.`,
  ]},
]);

registerModuleVariants('opposition.hearing.emergency.ending.catered_future', [
  { when: { corruption: [2] }, weight: 3, text: [
    `They ate through the emergency — full bellies adjourn crisis, meter cooling around crumbs.`,
  ]},
  { when: { studentId: 14 }, weight: W, text: [
    `Mary Jane fed the Board until scandal dissipated — harvest logic wins again.`,
  ]},
]);

registerModuleVariants('opposition.hearing.verdict', [
  { when: { outcome: 'win', studentId: 15 }, weight: W, text: [
    `Vance closes the folder. Lilith remains — predator enrolled, Board exhausted.`,
  ]},
  { when: { outcome: 'win', stageMin: 6 }, weight: 3, text: [
    `Removal denied. {subject.name} stays — appetite still on the meal plan.`,
  ]},
]);
