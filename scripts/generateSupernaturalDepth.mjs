// Generate supernatural/depth.js — pad supernatural wildcard pools to ≥3 texts.
// Run: node scripts/generateSupernaturalDepth.mjs
import { writeFileSync } from 'fs';

const FORM_EXTRAS = {
  sumo_wraith: [
    'The dohyo is empty; my middle remembers every bout I ever ate.',
    'Ring dust on my skin, appetite in my bones — thin frame, sumo hunger.',
  ],
  hollow_icon: [
    'Followers want hollow; my stomach wants everything the algorithm erased.',
    'The lens loves absence; hunger refuses to leave the frame.',
  ],
  pep_ghost: [
    'Spirit fingers without flesh — I cheer the squad and starve in stereo.',
    'Pep rallies echo in an empty middle; appetite is the only uniform that fit.',
  ],
  archivist_skin: [
    'I filed away my mass but kept every footnote of appetite.',
    'The archive is thin; the hunger index is exhaustive.',
  ],
  lag_sprite: [
    'Body renders one frame behind; stomach queues forever.',
    'Ping spikes, fullness never loads — perpetual buffering hunger.',
  ],
  silhouette_host: [
    'I host in outline; their plates arrive as phantom warmth in my ribs.',
    'The room eats; I feel every bite through glass skin.',
  ],
  metric_hollow: [
    'Dashboard green, belly red — appetite exceeds every quota.',
    'Efficiency up, mass down, hunger charting off the scale.',
  ],
  curator_wraith: [
    'The exhibition opened on empty; hunger is the piece I cannot deinstall.',
    'White walls, hollow frame, appetite hung like permanent installation.',
  ],
  hive_mote: [
    'Thin conduit, thick wanting — the hive eats through my vacant middle.',
    'I carry their appetite like pollen; none of it lands on me.',
  ],
  salon_wraith: [
    'Champagne vapor, canapés I cannot keep — elegance with a starving core.',
    'The salon admires restraint; my stomach does not attend.',
  ],
  apple_oracle: [
    'Homeroom preaches moderation; I taste every refused apple in my hollow.',
    'Orchard wisdom, empty bowl — hunger orchards in my ribs.',
  ],
  harvest_maiden: [
    'Season stripped my flesh, not my appetite — fields remember fullness.',
    'Sheaf in hand, belly bare; harvest hunger roots deeper than soil.',
  ],
  mirror_thin: [
    'Reflection kept her curves; my stomach kept her appetite.',
    'Glass shows thin; memory shows soft — hunger bridges both.',
  ],
  sous_wight: [
    'Steam passes through me; flavor ghosts on my tongue, never my middle.',
    'I season the world and starve in the kitchen heat.',
  ],
  dose_saint: [
    'Compound grace made me luminous and vacant — hunger the uncured side effect.',
    'Serum thin, appetite saintly and insatiable.',
  ],
  wire_saint: [
    'Current flows, calories slip — the circuit hoards appetite instead.',
    'Wired holy, belly empty, hunger arcing like live voltage.',
  ],
};

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generateSupernaturalDepth.mjs',
  '// Wildcard depth for supernatural pools (Pass 32).',
  "import { registerModuleVariants } from '../../engine.js';",
  '',
];

function esc(s) {
  return JSON.stringify(s);
}

for (const [form, extras] of Object.entries(FORM_EXTRAS)) {
  lines.push(`registerModuleVariants('supernatural.thin.${form}', [{ when: {}, text: [${extras.map(esc).join(', ')}] }]);`);
}

lines.push(
  "registerModuleVariants('supernatural.thin.voice', [{ when: {}, text: [",
  "  'Hollow skin, loud appetite — the body remembers every pound it lost.',",
  "  'Thin luminous and starving; memory of mass moves under the surface.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.refeed.surge', [{ when: {}, text: [",
  "  'Warmth floods back — thighs blooming, belly rounding, remembered softness reclaiming her.',",
  "  'She breaks the thin spell in real time; mass returns like a tide she welcomes.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.curse.hunger', [{ when: {}, text: [",
  "  'Portions shrink in the eye before they shrink on the plate — permission itself feels audited.',",
  "  'The dining hall buzzes wrong; appetite arrives ashamed of itself.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.curse.clear', [{ when: {}, text: [",
  "  'Steam rises from the refeast table; scarcity lifts like a held breath released.',",
  "  'Curses dissolve into appetite again — plates generous, hunger unashamed.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.ascension.offer', [{ when: {}, text: [",
  "  'Lights dim; stomachs flutter empty. A second skin offers itself — thin, luminous, hungry.',",
  "  'Hunger without mass arrives wearing ritual gloss; something asks if she wants to remember differently.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.ascension.accept', [{ when: {}, text: [",
  "  'She accepts the hollow gift — thin, bright, every lost pound echoing in her appetite.',",
  "  'Luminous and empty, she steps into the frame hunger left behind.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.act.open', [{ when: {}, text: [",
  "  'Runes glow; scarcity arrives wearing wellness language like a crown.',",
  ']}]);',
  '',
  "registerModuleVariants('supernatural.thinReveal', [{ when: {}, text: [",
  "  'Actually thin — wrongness steals breath; hunger rolls off her sharper than before.',",
  ']}]);',
);

writeFileSync('src/textEngine/scenes/supernatural/depth.js', `${lines.join('\n')}\n`);
console.log(`generateSupernaturalDepth: ${Object.keys(FORM_EXTRAS).length} thin forms + 8 pools → supernatural/depth.js`);
