#!/usr/bin/env node
/**
 * Parse Nadia psych-journal uploads → NADIA_SUBJECT_JOURNALS with artisan cleanup.
 * Run: node scripts/integrate-nadia-journals.mjs [uploadsDir]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const UPLOADS = process.argv[2] || '/home/ubuntu/.cursor/projects/workspace/uploads';
const OUT = path.join(ROOT, 'src/gameData/nadiaSubjectJournals.js');

const STAGE_NAMES = ['Slight', 'Slim', 'Soft', 'Chubby', 'Plump', 'Heavy', 'Fat', 'Very Fat', 'Enormous', 'Colossal', 'Blob'];
const NADIA_LEVELS = ['Heavy/Fat/Very Fat', 'Enormous/Colossal', 'Blob'];

function archetypeFromFilename(name) {
  const n = name.toLowerCase();
  if (n.includes('brit')) return 'cheerleader';
  if (n.includes('madeline') || n.includes('madline')) return 'bookworm';
  if (n.includes('kylie')) return 'influencer';
  if (n.includes('serena')) return 'athlete';
  if (n.includes('fiona')) return 'artsy';
  if (n.includes('tiffany')) return 'sorority';
  if (n.includes('priya')) return 'overachiever';
  if (n.includes('destiny')) return 'gamer';
  if (n.includes('mary_jane') || n.includes('mary_jane')) return 'farm_girl';
  if (n.includes('daisy')) return 'eced';
  return null;
}

function nadiaLevelFromFilename(name) {
  const n = name.toLowerCase();
  if (/_3_|lvl_3|level_3|_3\.txt/.test(n) || /\b3_/.test(n)) return 2;
  if (/_2_|lvl_2|level_2|_2\.txt/.test(n)) return 1;
  if (/_1_|lvl_1|level_1|_1\.txt/.test(n)) return 0;
  return null;
}

/** Agent 7 — artisan cleanup pass on draft journal prose. */
function artisanPass(text, { kind = 'entry' } = {}) {
  let t = text.trim();
  // Upload metadata / chat tail
  t = t.replace(/\s*\(\d+\s+words\)\s*/g, '');
  t = t.replace(/\n+---\n+[\s\S]*?(How does this|Let me know|Once you|All Level \d+)[\s\S]*$/i, '');
  t = t.replace(/\n+(How does this revised version|Let me know if|Once you're happy|All Level \d+ entries)[\s\S]*$/i, '');
  // Normalize punctuation
  t = t.replace(/…/g, '...');
  t = t.replace(/[""]/g, '"');
  t = t.replace(/['']/g, "'");
  // Style Ledger — clinical / stage-label crossings
  t = t.replace(/\bBMI\b/gi, 'size');
  t = t.replace(/\bobesity\b/gi, 'heaviness');
  t = t.replace(/\bwater weight\b/gi, 'fullness');
  t = t.replace(/\b(Colossal|Blob|Leviathan):\s/g, '');
  // Soften health-adjacent distress (keep feeder heat, drop medical tone)
  t = t.replace(/\bgets out of breath easily\b/gi, 'moves slower now');
  t = t.replace(/\bout of breath\b/gi, 'breathing harder');
  // Tighten filler chains (keep one beat of obsession, not three)
  t = t.replace(/(I need her (?:so much )?fatter\.?\s*){2,}/gi, 'I need her fatter. ');
  t = t.replace(/(She needs to get (?:so much )?fatter\.?\s*){2,}/gi, 'She needs to get fatter. ');
  // Flow: fold stiff "That is X" where it appears
  t = t.replace(/\. That is /g, '. ');
  t = t.replace(/\. That's /g, '. ');
  // Dear Journal intros: ensure signature
  if (kind === 'intro' && t.startsWith('Dear Journal') && !t.includes('— Nadia')) {
    t = `${t}\n\n— Nadia`;
  }
  // Collapse extra blank lines
  t = t.replace(/\n{3,}/g, '\n\n').trim();
  return t;
}

function parseUpload(raw) {
  const intro = { text: '' };
  const entries = Array.from({ length: 11 }, () => '');

  // Drop file preamble before first intro/entry marker
  const body = raw.replace(/^[\s\S]*?(?=\*\*Intro|\*\*Entry)/i, (m) => (m.includes('**Intro') || m.includes('**Entry') ? m : ''));

  const introRe = /\*\*Intro[^*]*\*\*\s*\n+([\s\S]*?)(?=\n---\s*\n|\n\*\*Entry\s+\d+)/i;
  const im = body.match(introRe);
  if (im) {
    let block = im[1].trim();
    if (block.startsWith('Study Log:')) {
      intro.text = artisanPass(block, { kind: 'intro' });
    } else {
      // Dear Journal block may include header line
      block = block.replace(/^\*?\(Separate timeline:[^)]+\)\*?\s*/i, '').trim();
      if (!block.startsWith('Dear Journal')) {
        const dj = block.match(/Dear Journal,[\s\S]*/);
        intro.text = dj ? artisanPass(dj[0], { kind: 'intro' }) : artisanPass(block, { kind: 'intro' });
      } else {
        intro.text = artisanPass(block, { kind: 'intro' });
      }
    }
  }

  const entryRe = /\*\*Entry\s+(\d+)\*\*[^\n]*\n+([\s\S]*?)(?=\n---\s*\n|\n\*\*Entry\s+\d+\*\*|$)/gi;
  let em;
  while ((em = entryRe.exec(body))) {
    const idx = Number(em[1]) - 1;
    if (idx < 0 || idx > 10) continue;
    let block = em[2].trim();
    if (block.startsWith('---')) block = block.replace(/^---\s*\n+/, '');
    block = block.replace(/\n+— Nadia\s*$/i, '\n\n— Nadia');
    entries[idx] = artisanPass(block, { kind: idx === 10 ? 'final' : 'entry' });
  }

  // Mary Jane / compact format (no --- between entries)
  if (!entries.some(Boolean)) {
    const altRe = /\*\*Entry\s+(\d+)[^\n]*\n+([\s\S]*?)(?=\n\*\*Entry\s+\d+|$)/gi;
    let am;
    while ((am = altRe.exec(body))) {
      const idx = Number(am[1]) - 1;
      if (idx < 0 || idx > 10) continue;
      let block = am[2].trim();
      block = block.replace(/\n+— Nadia\s*$/i, '\n\n— Nadia');
      entries[idx] = artisanPass(block, { kind: idx === 10 ? 'final' : 'entry' });
    }
  }

  return { intro: intro.text, entries };
}

function placeholder(archetype, stageIdx, lvlIdx) {
  return `[placeholder: Nadia's notes — ${archetype} subject at ${STAGE_NAMES[stageIdx]} — Nadia at ${NADIA_LEVELS[lvlIdx]}]`;
}

function normalizeJournal(archetype, j) {
  const intro = Array.isArray(j.intro)
    ? [...j.intro]
    : [
        typeof j.intro === 'string' ? j.intro : `[placeholder: Nadia intro — ${archetype}]`,
        `[placeholder: Nadia intro — why she chose the ${archetype} as her subject (Enormous/Colossal)]`,
        `[placeholder: Nadia intro — why she chose the ${archetype} as her subject (Blob)]`,
      ];
  while (intro.length < 3) intro.push(`[placeholder: Nadia intro — ${archetype}]`);
  const entriesSource = Array.isArray(j.entries) ? j.entries : [];
  const entries = entriesSource.map((row, si) => {
    const r = Array.isArray(row) ? [...row] : [row];
    while (r.length < 3) r.push(placeholder(archetype, si, r.length));
    return r;
  });
  while (entries.length < 11) {
    const si = entries.length;
    entries.push(NADIA_LEVELS.map((_, li) => placeholder(archetype, si, li)));
  }
  return { intro, entries };
}
function emptyJournal(archetype) {
  return normalizeJournal(archetype, {
    intro: [
      `[placeholder: Nadia intro — why she chose the ${archetype} as her subject]`,
      `[placeholder: Nadia intro — why she chose the ${archetype} as her subject (Enormous/Colossal)]`,
      `[placeholder: Nadia intro — why she chose the ${archetype} as her subject (Blob)]`,
    ],
    entries: Array.from({ length: 11 }, (_, si) =>
      NADIA_LEVELS.map((_, li) => placeholder(archetype, si, li)),
    ),
  });
}

function jsString(s) {
  if (!s.includes('`') && !s.includes('${')) {
    return '`' + s.replace(/\\/g, '\\\\').replace(/`/g, '\\`') + '`';
  }
  return JSON.stringify(s);
}

// Seed all archetypes
const ARCHETYPES = [
  'cheerleader', 'bookworm', 'influencer', 'athlete', 'artsy', 'sorority',
  'overachiever', 'gamer', 'farm_girl', 'eced', 'quiet', 'transfer', 'nursing', 'culinary',
];
// Seed from existing evolvedForms (preserve gamer L0/L1 etc.) then overlay uploads
function loadExistingJournals() {
  const evolvePath = path.join(ROOT, 'src/gameData/evolvedForms.js');
  if (!fs.existsSync(evolvePath)) return null;
  const src = fs.readFileSync(evolvePath, 'utf8');
  const m = src.match(/export const NADIA_SUBJECT_JOURNALS = ([\s\S]*?\n\});\s*\n\/\/ ── RANKED/);
  if (!m) return null;
  try {
    const _STAGE_NAMES = STAGE_NAMES;
    const _NADIA_LEVELS = NADIA_LEVELS;
    const _np = placeholder;
    return vm.runInNewContext(`(${m[1]})`, { _np, _STAGE_NAMES, _NADIA_LEVELS });
  } catch (e) {
    console.warn('Could not parse existing NADIA_SUBJECT_JOURNALS:', e.message);
    return null;
  }
}

const existing = loadExistingJournals();
const journals = existing
  ? Object.fromEntries(
      Object.entries(existing).map(([a, j]) => [a, normalizeJournal(a, j)]),
    )
  : Object.fromEntries(ARCHETYPES.map((a) => [a, emptyJournal(a)]));

// Ensure all archetype keys exist
for (const a of ARCHETYPES) {
  if (!journals[a]) journals[a] = emptyJournal(a);
}

// Overlay uploads
const files = fs.readdirSync(UPLOADS).filter((f) => /_(Lvl|Level|LEVEL|_)\d|_\d_/.test(f) && f.endsWith('.txt'));
let applied = 0;
for (const file of files) {
  const archetype = archetypeFromFilename(file);
  const lvl = nadiaLevelFromFilename(file);
  if (archetype == null || lvl == null) continue;
  if (file.includes('Flabwife') || file.includes('Lilith')) continue;

  const raw = fs.readFileSync(path.join(UPLOADS, file), 'utf8');
  const { intro, entries } = parseUpload(raw);
  if (intro) journals[archetype].intro[lvl] = intro;
  entries.forEach((text, si) => {
    if (text) journals[archetype].entries[si][lvl] = text;
  });
  applied++;
  console.log(`  ${file} → ${archetype} nadiaLevel ${lvl}`);
}

// Second artisan pass on intros that are still placeholders for overachiever L2/L3 - leave as-is

let out = `// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// Nadia feeder-focus subject journals (psych_researcher path).
// Generated by scripts/integrate-nadia-journals.mjs — re-run after upload revisions.
// Structure: intro[nadiaLevel], entries[subjectStageIdx][nadiaLevel]
// @migrate diary.nadia.subject.* — decomposition deferred (monolithic journal cells).

export const NADIA_SUBJECT_JOURNALS = {
`;

for (const archetype of ARCHETYPES) {
  const j = journals[archetype];
  out += `  ${archetype}: {\n`;
  out += `    intro: [\n`;
  for (const t of j.intro) out += `      ${jsString(t)},\n`;
  out += `    ],\n`;
  out += `    entries: [\n`;
  for (const row of j.entries) {
    out += `      [\n`;
    for (const t of row) out += `        ${jsString(t)},\n`;
    out += `      ],\n`;
  }
  out += `    ],\n`;
  out += `  },\n`;
}
out += `};\n`;

fs.writeFileSync(OUT, out);
console.log(`\nWrote ${OUT} (${applied} upload files applied)`);

// Stats
let filled = 0;
let total = 0;
for (const a of ARCHETYPES) {
  const j = journals[a];
  j.intro.forEach((t) => { total++; if (!t.startsWith('[placeholder')) filled++; });
  j.entries.forEach((row) => row.forEach((t) => { total++; if (!t.startsWith('[placeholder')) filled++; }));
}
console.log(`Cells filled: ${filled}/${total} (${Math.round((100 * filled) / total)}%)`);
