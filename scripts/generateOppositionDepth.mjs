// Generate opposition/depth.js — pad opposition wildcard pools to ≥3 texts.
// Run: node scripts/generateOppositionDepth.mjs
import { writeFileSync } from 'fs';

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A4 Architect',
  '// Auto-generated — run: node scripts/generateOppositionDepth.mjs',
  '// Wildcard depth for opposition pools (Pass 32).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

function esc(s) {
  return JSON.stringify(s);
}

const pads = [
  ['opposition.aib.unlocked', [
    'Scrutiny unlocks the wrong doors — polished tables, thick folders, hunger for your language.',
  ]],
  ['opposition.aib.open', [
    'Vance taps once. Cooperation is expected. Your class feels the room lean institutional.',
  ]],
  ['opposition.counter.discredit', [
    'The counter lands surgical and public — abundance reframed before the board can flinch.',
  ]],
  ['opposition.agenda.wellness_audit', [
    'Clipboard at mid-meal — shame arrives wearing a lanyard and calling itself care.',
  ]],
  ['opposition.proxy.wellness_coalition', [
    'Coaches and liaisons assemble — smiles like measuring tapes, concern like policy.',
    'The coalition forms with gym-floor certainty; your catering budget becomes their sermon.',
  ]],
  ['opposition.proxy.ascetic_circle', [
    'Garden candles, chanted restraint — your classroom still smells like dinner behind them.',
    'Ascetic protest flickers outside; inside, appetite refuses the cold.',
  ]],
  ['opposition.hearing.open', [
    'Toner and denial in the conference air — Vance\'s folder thick enough to bruise.',
    'The board room leans institutional; every chair feels like a verdict waiting.',
  ]],
  ['opposition.hearing.verdict', [
    'The board adjourns ambiguous — reprieve or postponement, never quite clarity.',
    'Signatures wait; the class holds its breath in the hallway outside.',
  ]],
  ['opposition.agenda.fire', [
    'An agenda card resolves — friction made flesh, policy made personal.',
    'Institutional teeth find a student-shaped target; the room feels colder.',
  ]],
  ['opposition.counter.success', [
    'Your counter lands — the board stumbles, briefly off-balance, abundance still defensible.',
    'Institutional momentum falters; for a week the scales tip back toward appetite.',
  ]],
  ['opposition.endgame.synthesis', [
    'Scarcity folds inward — hunger becomes ally, passive abundance swells, the class breathes.',
    'Every evolved girl ascended; the pharmacist crowned — famine language finally fails.',
  ]],
  ['opposition.endgame.capture', [
    'Four seats compromised; scarcity cannot climb past a whisper — capture holds the line.',
    'The board still meets, but your class eats under institutional cover now.',
  ]],
  ['opposition.endgame.banished', [
    'The hollow act exhausts itself — famine lifts, curses thin, abundance returns.',
    'Scarcity pressure hits zero; plates look generous again.',
  ]],
  ['opposition.endgame.allThin', [
    'Every evolved student wears thin skin; memory mass glows beneath — luminous, hungry, unafraid.',
    'The class is hollow-bright; appetite honest and enormous under the skin.',
  ]],
  ['opposition.endgame.vance', [
    'Vance folds; the Chair compromised — hearings lose their teeth for a season.',
    'Dr. Helena Vance signs nothing today; your syllabus survives the season.',
  ]],
];

for (const [key, texts] of pads) {
  lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${texts.map(esc).join(', ')}] }]);`);
}

writeFileSync('src/textEngine/scenes/opposition/depth.js', `${lines.join('\n')}\n`);
console.log(`generateOppositionDepth: ${pads.length} pools → opposition/depth.js`);
