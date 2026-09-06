// Generate session/selectorDepth.js + forceFeeder/depth.js
// Pad session selector overlays and ff.* catch-all pools to ≥3 wildcard texts.
// Run: node scripts/generateSessionFfDepthPass38.mjs
import { writeFileSync } from 'fs';

const OUT = {
  session: 'src/textEngine/scenes/session/selectorDepth.js',
  ff: 'src/textEngine/scenes/forceFeeder/depth.js',
};

const SESSION_ALTS = {
  'session.moodTone': ['', ''],
  'session.seasonNote': ['', ''],
  'session.relWarmth': ['', ''],
  'session.campusNote': ['', ''],
  'session.skillNote': ['', ''],
};

const FF_ALTS = {
  'ff.harness': [
    'The chair accepts her weight; straps cinch home around shoulders and hips.',
  ],
  'ff.machineBeat': [
    'The pump clears its throat and begins feeding.',
  ],
  'ff.intakeClause': [
    'thick calories sliding down in measured pulses',
  ],
  'ff.swellBeat': [
    'Her middle thickens with every successful cycle.',
  ],
  'ff.closeBeat': [
    'Extra softness remains when the harness finally releases.',
  ],
  'ff.resistBeat': ['""'],
  'ff.aftermath': [
    '{ff.closeBeat}',
  ],
  'ff.setup': [
    'The Force Feeder readies itself — harness waiting, pump primed.',
  ],
};

function esc(s) {
  return JSON.stringify(s);
}

function emitDepth(namespace, alts, passLabel) {
  const lines = [
    '// The Squad — Lead: A2 Psych | Support: A5 Editor',
    `// Auto-generated — run: node scripts/generateSessionFfDepthPass38.mjs`,
    `// Wildcard depth for ${namespace} pools (${passLabel}).`,
    "import { registerModuleVariants } from '../../engine.js';",
    '',
  ];
  for (const [key, extras] of Object.entries(alts)) {
    const textList = extras.map((t) => esc(t)).join(', ');
    lines.push(`registerModuleVariants(${esc(key)}, [{ when: {}, text: [${textList}] }]);`);
  }
  return `${lines.join('\n')}\n`;
}

writeFileSync(OUT.session, emitDepth('session.* selectors', SESSION_ALTS, 'Pass 38'));
writeFileSync(OUT.ff, emitDepth('ff.*', FF_ALTS, 'Pass 38'));

console.log(`generateSessionFfDepthPass38: ${Object.keys(SESSION_ALTS).length} session pools → ${OUT.session}`);
console.log(`generateSessionFfDepthPass38: ${Object.keys(FF_ALTS).length} ff pools → ${OUT.ff}`);
