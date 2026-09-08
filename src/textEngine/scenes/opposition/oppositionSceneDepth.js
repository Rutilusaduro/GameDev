// The Squad — Lead: A2 Psych | Support: A4 Architect
// Stage/student depth on opposition agenda, counter, and hearing pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('opposition.agenda.wellness_audit', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `Clipboard at mid-meal — they photograph abundance at scale and call it intervention.`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `Wellness audit finds a class unashamed — concern dressed as care, appetite unrepentant.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena's portions flagged mid-practice — coaches with clipboards, athlete appetite on trial.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya observed eating quietly — every bite logged like evidence of moral failure.`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia watches the observer watch her — clinical calm, private fury, data either way.`,
  ]},
]);

registerModuleVariants('opposition.agenda.size_review', [
  { when: { stageMin: 6 }, weight: 3, text: [
    `Mandatory weigh-ins — mass translated into audit columns, every pound bureaucratic.`,
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany's number read aloud — captain's mass become public record, pride complicated.`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya's spreadsheet meets Vance's folder — data weaponized, projections irrelevant.`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane laughs at the scale until the clipboard writes it down anyway.`,
  ]},
]);

registerModuleVariants('opposition.agenda.mandatory_fitness', [
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena assigned extra drills — athlete body judged by metrics that hate softness.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny skips the gym in spirit; compliance assigns exertion anyway.`,
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    `Fitness assessment for bodies built past gym-floor assumptions — absurdity documented.`,
  ]},
]);

registerModuleVariants('opposition.agenda.removal_hearing', [
  { when: { corruption: [2], stageMin: 6 }, weight: 3, text: [
    `Removal hearing — photos of willing abundance filed as scandal, appetite on trial.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie's enrollment contested — viral curves entered as evidence, fame weaponized.`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith summoned to defend presence — board afraid of what she does not understand.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya's place questioned quietly — soft girl, loud folder, institutional teeth.`,
  ]},
]);

registerModuleVariants('opposition.agenda.shame_vigil', [
  { when: { studentId: 6 }, weight: 4, text: [
    `Ascetic candles outside — Tiffany hosts dinner inside, chapter grace undiminished.`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia hears restraint chanted — formulation language thinner than cafeteria smell.`,
  ]},
  { when: { stageMin: 5 }, weight: 3, text: [
    `Garden vigil chants denial — your classroom still smells like seconds, warmth winning.`,
  ]},
]);

registerModuleVariants('opposition.agenda.budget_freeze', [
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy tightens catering with southern ingenuity — abundance rationed, creativity undefeated.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé treats the freeze like a tasting challenge — fewer courses, more intensity.`,
  ]},
]);

registerModuleVariants('opposition.counter.success', [
  { when: { counter: 'feast_bribe', stageMin: 6 }, weight: 3, text: [
    `Lavish catering buys institutional blindness — plates speak louder than clipboards.`,
  ]},
  { when: { counter: 'public_discredit', studentId: 1 }, weight: 4, text: [
    `Madeline's projector reframes abundance as research — Vance stumbles mid-sentence.`,
  ]},
  { when: { counter: 'network_misdirect', studentId: 18, custom: false }, weight: 4, text: [
    `Talia's mesh buries the audit trail — thermal noise, clean signal, board blind again.`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `Your counter lands — appetite still defensible, institutional momentum falters a week.`,
  ]},
]);

registerModuleVariants('opposition.counter.discredit', [
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline's evidence reframes fullness — research, not scandal; board off-balance.`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia's testimony clinical and devastating — concern exposed as prurience.`,
  ]},
  { when: { stageMin: 7 }, weight: 3, text: [
    `Counter lands surgical — abundance reframed before the board can flinch.`,
  ]},
]);

registerModuleVariants('opposition.hearing.removal.phase0', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `Projector fills with abundance at scale — concern performed, hunger already lost semantically.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie's feed screenshots enter evidence — fame weaponized, appetite on trial.`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `Vance opens with documentation — your class's willingness filed as misconduct.`,
  ]},
]);

registerModuleVariants('opposition.hearing.verdict', [
  { when: { corruption: [1, 2] }, weight: 3, text: [
    `Board adjourns ambiguous — reprieve or postponement, appetite survives another week.`,
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany exits chin high — captain still enrolled, hunger still undefeated.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya says nothing in the hall — one exhale, verdict survived, trust intact.`,
  ]},
]);

registerModuleVariants('opposition.endgame.synthesis', [
  { when: { stageMin: 9 }, weight: 3, text: [
    `Scarcity folds inward — class-wide abundance swells, famine language finally fails.`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith crowned in aftermath — predator appetite legitimized, board exhausted.`,
  ]},
]);

registerModuleVariants('opposition.endgame.allThin', [
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona hollow-bright — memory mass glows beneath, appetite honest and enormous.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya thin-skinned luminous — want visible under surface, hunger unafraid.`,
  ]},
]);

registerModuleVariants('opposition.proxy.wellness_coalition', [
  { when: { studentId: 3 }, weight: 4, text: [
    `Coaches assemble with measuring tapes — Serena's softness their sermon, your class their target.`,
  ]},
  { when: { stageMin: 6 }, weight: 3, text: [
    `Wellness coalition smiles like policy — catering budget becomes their evidence.`,
  ]},
]);
