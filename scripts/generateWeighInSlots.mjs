#!/usr/bin/env node
/**
 * One-shot miner: extracts slot fragments from legacy weighIn.js + weighInReplies.js
 * and emits src/textEngine/scenes/weighIn/_mined/*.json for authoring review.
 * Run: node scripts/generateWeighInSlots.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wiSrc = readFileSync(join(root, 'src/textEngine/scenes/weighIn.js'), 'utf8');
const repliesSrc = readFileSync(join(root, 'src/gameData/weighInReplies.js'), 'utf8');

// Extract quoted strings from registerModule blocks
function extractStringLiterals(src, moduleKey) {
  const re = new RegExp(`registerModule\\("${moduleKey.replace('.', '\\.')}"[\\s\\S]*?\\]\\);`);
  const block = src.match(re)?.[0] || '';
  const strings = [...block.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"/g)].map((m) => m[1]);
  return [...new Set(strings)].filter((s) => s.length > 3 && !s.includes('weighIn.'));
}

// Extract mood tags from weighInReplies
const moodTagBlock = repliesSrc.match(/const tags = \{([\s\S]*?)\};/)?.[1] || '';
const moodTags = {};
for (const m of moodTagBlock.matchAll(/(\w+):\s*'([^']+)'/g)) {
  moodTags[m[1]] = m[2];
}

// Extract quoted dialogue from BUILDERS (lines starting with ")
const dialogues = [...repliesSrc.matchAll(/"([^"]{10,200})"/g)].map((m) => m[1]);

const outDir = join(root, 'src/textEngine/scenes/weighIn/_mined');
mkdirSync(outDir, { recursive: true });

const modules = ['weighIn.scaleApproach', 'weighIn.bigScaleApproach', 'weighIn.entrance'];
for (const key of modules) {
  const texts = extractStringLiterals(wiSrc, key);
  writeFileSync(join(outDir, `${key.replace(/\./g, '_')}.json`), JSON.stringify(texts, null, 2));
}

writeFileSync(join(outDir, 'moodTags.json'), JSON.stringify(moodTags, null, 2));
writeFileSync(join(outDir, 'dialogueQuotes.json'), JSON.stringify([...new Set(dialogues)].slice(0, 200), null, 2));

console.log('Mined to', outDir);
