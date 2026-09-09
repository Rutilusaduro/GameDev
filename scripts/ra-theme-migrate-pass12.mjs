#!/usr/bin/env node
/** Duplicate bookworm archetype selectors → swimmer with pool-key renames (Cassidy path). */
import { readFileSync, writeFileSync } from 'fs';

const FILES = [
  'src/textEngine/scenes/attitude.js',
  'src/textEngine/scenes/gossip/index.js',
  'src/textEngine/scenes/campusSoftening.js',
  'src/textEngine/scenes/weeklyEvent/narrativeFragments.js',
  'src/textEngine/scenes/campusDevice/fragments.js',
  'src/textEngine/scenes/growthEvent/fragments.js',
  'src/textEngine/scenes/dinner/groupConversations.js',
  'src/textEngine/scenes/intimacy/personas.js',
  'src/textEngine/scenes/session/fullness.js',
];

const TEXT_SWAP = [
  [/library/gi, 'pool deck'],
  [/cardigan/gi, 'team hoodie'],
  [/research/gi, 'training'],
  [/study carrel/gi, 'lane log'],
  [/books/gi, 'splits'],
  [/bookish/gi, 'athletic'],
  [/academic/gi, 'training'],
];

function swimmerMirror(src) {
  if (!src.includes('bookworm')) return src;
  if (src.includes("archetype: 'swimmer'") || src.includes('archetype: "swimmer"')) return src;

  let out = src
    .replace(/archetype:\s*['"]bookworm['"]/g, "archetype: 'swimmer'")
    .replace(/archetype:\s*\[['"]bookworm['"]\]/g, "archetype: ['swimmer']")
    .replace(/arch_bookworm/g, 'arch_swimmer')
    .replace(/session\.fullness\.bookworm/g, 'session.fullness.swimmer')
    .replace(/journal\.feeder\.bookworm/g, 'journal.feeder.swimmer');

  for (const [re, rep] of TEXT_SWAP) {
    out = out.replace(re, rep);
  }
  return out;
}

let touched = 0;
for (const file of FILES) {
  const raw = readFileSync(file, 'utf8');
  const lines = raw.split('\n');
  const additions = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!/archetype:\s*['"]bookworm['"]/.test(line) && !/archetype:\s*\[['"]bookworm['"]\]/.test(line)) continue;
    if (/swimmer/.test(line)) continue;

    // Grab variant block from opening { to closing }, or register line
    let block = [line];
    let depth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
    let j = i + 1;
    while (j < lines.length && depth > 0) {
      block.push(lines[j]);
      depth += (lines[j].match(/\{/g) || []).length - (lines[j].match(/\}/g) || []).length;
      j++;
    }
    const mirror = swimmerMirror(block.join('\n'));
    if (mirror !== block.join('\n')) additions.push({ after: j - 1, text: mirror });
  }

  if (!additions.length) continue;
  // Insert from bottom to preserve indices
  for (const { after, text } of additions.reverse()) {
    lines.splice(after + 1, 0, text);
  }
  writeFileSync(file, lines.join('\n'));
  touched++;
  console.log('mirrored swimmer variants in', file);
}

if (!touched) console.log('no files changed (swimmer mirrors may already exist)');
else console.log(`pass12 complete — ${touched} file(s)`);
