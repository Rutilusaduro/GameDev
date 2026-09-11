#!/usr/bin/env node
/** MIGRATION step 6 — evolution UI blurbs/offers → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EVOLVED_FORM_META,
  EVOLUTION_BUTTON_BLURB,
  EVOLUTION_OFFER,
} from '../src/gameData/evolutionUiData.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/evolutionUiData.js');

function stubBlurb(archetype) {
  return `(s)=>\`${archetype} evolution blurb bridge — \${s.name} at \${Math.round(s.lbs)} lbs. Modular evolution.blurb @ week 20+.\``;
}

function stubIntro(archetype) {
  return `(s)=>\`${archetype} evolution offer intro — \${s.name} ready to name the path. Modular evolution.offer @ week 20+.\``;
}

function stubPathDesc(archetype, pathId) {
  return `${pathId} path (${archetype}) — choice copy bridge; evolution.offer slots @ week 20+.`;
}

const blurbs = {};
for (const key of Object.keys(EVOLUTION_BUTTON_BLURB)) {
  blurbs[key] = stubBlurb(key);
}

const offers = {};
for (const [archetype, block] of Object.entries(EVOLUTION_OFFER)) {
  const paths = {};
  for (const [pathId, row] of Object.entries(block.paths || {})) {
    paths[pathId] = {
      label: row.label,
      desc: stubPathDesc(archetype, pathId),
    };
  }
  offers[archetype] = {
    intro: stubIntro(archetype),
    paths,
  };
}

const blurbLines = Object.entries(blurbs)
  .map(([k, fn]) => `  ${k}:${fn}`)
  .join(',\n');

const offerLines = Object.entries(offers).map(([archetype, block]) => {
  const pathLines = Object.entries(block.paths)
    .map(([pid, row]) => `      ${pid}:{ label:${JSON.stringify(row.label)}, desc:${JSON.stringify(row.desc)} }`)
    .join(',\n');
  return `  ${archetype}:{\n    intro:${block.intro},\n    paths:{\n${pathLines}\n    },\n  }`;
}).join(',\n');

const file = `// Evolution offer UI copy — MIGRATION.md extract.
// Evolution UI prose stub migration (step 6) — bridge cells; evolution.* fragments @ week 20+.

export const EVOLVED_FORM_META = ${JSON.stringify(EVOLVED_FORM_META, null, 2)};

export const EVOLUTION_BUTTON_BLURB = {
${blurbLines}
};


export const EVOLUTION_OFFER = {
${offerLines}
};
`;

fs.writeFileSync(OUT, file);
console.log(`stubEvolutionUiProse: wrote ${OUT} (${fs.statSync(OUT).size} bytes)`);
