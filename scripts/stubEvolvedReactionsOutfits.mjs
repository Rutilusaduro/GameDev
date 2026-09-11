#!/usr/bin/env node
/** MIGRATION step 6 — EVOLVED_REACTIONS / EVOLVED_OUTFITS → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVOLVED_REACTIONS, EVOLVED_OUTFITS } from '../src/gameData/evolvedReactionsOutfits.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/evolvedReactionsOutfits.js');
const SKIP = new Set(['competitive_gainer']);

function stubReaction(formId, idx) {
  return `${formId} reaction stage ${idx} bridge — modular evolved.reaction @ week 20+.`;
}

function stubOutfit(formId, idx) {
  return `${formId} outfit stage ${idx} bridge — modular evolved.outfit @ week 20+.`;
}

function emitBlock(map, stubFn) {
  const entries = [];
  for (const [formId, lines] of Object.entries(map)) {
    if (SKIP.has(formId)) continue;
    const arr = (lines || []).map((_, idx) => stubFn(formId, idx));
    entries.push(`  ${formId}: ${JSON.stringify(arr, null, 2).replace(/\n/g, '\n  ')}`);
  }
  return entries.join(',\n');
}

const file = `// Evolved stage reactions + outfit blurbs — MIGRATION.md extract.
// Evolved reactions/outfits stub migration (step 6) — bridge cells; evolved.* fragments @ week 20+.
import { CG_FILLED_REACTIONS, CG_FILLED_OUTFITS } from './competitiveGainerText.js';

export const EVOLVED_REACTIONS = {
${emitBlock(EVOLVED_REACTIONS, stubReaction)},
  competitive_gainer: CG_FILLED_REACTIONS,
};

export const EVOLVED_OUTFITS = {
${emitBlock(EVOLVED_OUTFITS, stubOutfit)},
  competitive_gainer: CG_FILLED_OUTFITS,
};
`;

fs.writeFileSync(OUT, file);
console.log(`stubEvolvedReactionsOutfits: wrote ${OUT} (${fs.statSync(OUT).size} bytes)`);
