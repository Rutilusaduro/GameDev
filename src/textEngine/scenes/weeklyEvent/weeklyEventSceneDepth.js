// The Squad — Lead: A5 Editor | Support: A1 Mobile
// Per-student + stage-keyed depth on weekly narrative fragment pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('weekly.uniformSplit.incident', [
  { when: { studentId: 3, endStageMin: 5 }, weight: 4, text: [
    `Serena's uniform splits mid-lift — athlete's gear surrendering to athlete's appetite.`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany's chapter top gives way during rush review — pastel tearing, belly escaping, room gasping.`,
  ]},
  { when: { studentId: 8, endStageMin: 4 }, weight: 4, text: [
    `Maya's seam fails quietly in the studio — soft sound, hard flush, twenty witnesses.`,
  ]},
  { when: { studentId: 15, endStageMin: 6 }, weight: 4, text: [
    `Lilith's jacket button pops in the hallway — deliberate calm while fabric surrenders.`,
  ]},
]);

registerModuleVariants('weekly.uniformSplit.afterDialogue', [
  { when: { studentId: 3 }, weight: 4, text: [
    `"New uniform," Serena says. "Bigger. I'm still fastest. Don't test me."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie texts: "RIP old costume. Viral potential: high. New sizes: ordered. No regrets."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Chapter standards updated," Tiffany says brightly. "So did I. Both improvements."`,
  ]},
]);

registerModuleVariants('weekly.viralPost.line', [
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie shows you the count, glowing. "Two million," she says. "This is my body now. Deal with it."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny shrugs at the views. "Chat wanted proof. I delivered. Sponsors inbound."`,
  ]},
]);

registerModuleVariants('weekly.chairBreaks.afterDialogue', [
  { when: { studentId: 7, endStageMin: 6 }, weight: 4, text: [
    `Priya emails facilities with load ratings attached. "Chair failure predictable. Body mass exceeded spec."`,
  ]},
  { when: { studentId: 10, endStageMin: 7 }, weight: 4, text: [
    `Reneé pats the splintered seat. "The chair lacked ambition," she says. "I did not."`,
  ]},
  { when: { studentId: 14, endStageMin: 5 }, weight: 4, text: [
    `Mary Jane laughs, still seated on the floor. "Well shoot. Guess I outgrew that too."`,
  ]},
]);

registerModuleVariants('weekly.teamWeighIn.verdict', [
  { when: { studentId: 0 }, weight: 4, text: [
    `The number lands. Brittany straightens — captain first, athlete second, hungry always.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena reads the scale like a scoreboard. "Up," she says. "Good. Keep feeding the team."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia announces the result clinically. Her smile is not clinical at all.`,
  ]},
]);

registerModuleVariants('weekly.quietOpen.close', [
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya speaks one sentence — soft, plain, devastating. Then she lets you feed her without looking away.`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee exhales like a valve releasing. "Thank you for listening," she says. "Now feed me."`,
  ]},
]);

registerModuleVariants('weekly.immobilityPeace.line', [
  { when: { studentId: 11, endStageMin: 10 }, weight: 4, text: [
    `Kaylee settles vast and serene. "This is peace," she murmurs. "Don't move me yet."`,
  ]},
  { when: { studentId: 8, endStageMin: 10 }, weight: 4, text: [
    `Maya breathes slow inside immensity. "I'm still here," she whispers. "Still yours."`,
  ]},
]);
