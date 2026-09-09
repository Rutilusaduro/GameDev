#!/usr/bin/env node
/** Clone bookworm nadia journal depth variants → swimmer (Cassidy) with lane-themed taglines */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const nadiaDepth = join(import.meta.dirname, '..', 'src/textEngine/scenes/researchJournal/nadiaDepth.js');
const outPath = join(import.meta.dirname, '..', 'src/textEngine/scenes/researchJournal/swimmerDepth.js');

const REPLACEMENTS = [
  [/journal\.nadia\.bookworm/g, 'journal.nadia.swimmer'],
  [/Notes forgotten between bites; data getting personal\./g, 'Lane splits forgotten between bites; data getting personal.'],
  [/Footnotes and waistlines both expanding on schedule\./g, 'Splits and waistlines both expanding on schedule.'],
  [/Hyposeason plan revised: she wants to be stuffed\./g, 'Training hypothesis revised: she wants to be stuffed.'],
  [/Living bibliography of appetite — immobile appendix\./g, 'Living lane log of appetite — immobile anchor.'],
  [/Still too athletic for my taste/g, 'Still too lean from the pool for my taste'],
  [/athletic poise gone/g, 'swimmer poise gone'],
];

let src = readFileSync(nadiaDepth, 'utf8');
// Fix bookworm corruption in source while we're here
src = src.replace(/Hyposeason plan/g, 'Training hypothesis');
writeFileSync(nadiaDepth, src);

const bookwormLines = src.split('\n').filter((l) => l.includes("registerModuleVariants('journal.nadia.bookworm"));

const header = `// The Squad — Lead: A2 Psych | Support: A5 Editor
// Swimmer (Cassidy) journal depth — generated from bookworm variants
import { registerModuleVariants } from '../../engine.js';

`;

const body = bookwormLines.map((line) => {
  let next = line;
  for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
  return next;
}).join('\n');

writeFileSync(outPath, `${header}${body}\n`);
console.log(`wrote ${bookwormLines.length} swimmer depth variants → swimmerDepth.js`);
