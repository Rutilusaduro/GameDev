#!/usr/bin/env node
/** MIGRATION step 6 — EVOLVED_ACTIVITY_TEXT prose → bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EVOLVED_ACTIVITY_TEXT,
  EVOLVED_ACTIVITY_META,
} from '../src/gameData/evolvedActivityData.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/evolvedActivityData.js');

function stubFn(formId, idx) {
  return `(s)=>\`${formId} activity beat ${idx} — \${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.\``;
}

const blocks = [];
for (const [formId, beats] of Object.entries(EVOLVED_ACTIVITY_TEXT)) {
  if (!Array.isArray(beats)) continue;
  const lines = beats.map((_, idx) => stubFn(formId, idx));
  blocks.push(`  ${formId}: [\n    ${lines.join(',\n    ')},\n  ]`);
}

const file = `// Evolved passive activity beats + AP meta — MIGRATION.md extract.
// Evolved activity prose stub migration (step 6) — bridge cells; evolved.activity fragments @ week 20+.
import { depthActivityGainBonus, depthLbsGrant, depthRelBonus } from './mechanicsDepthLayer.js';

export const EVOLVED_ACTIVITY_TEXT = {
${blocks.join(',\n')}
};

export const EVOLVED_ACTIVITY_META = ${JSON.stringify(EVOLVED_ACTIVITY_META, null, 2)};

/** Depth-scaled evolved activity payouts (gain range + relationship). */
export function getEvolvedActivityMeta(formId) {
  const raw = EVOLVED_ACTIVITY_META[formId];
  if (!raw) return raw;
  const meta = { ...raw };
  if (meta.gainRange?.length === 2) {
    meta.gainRange = [
      depthActivityGainBonus(meta.gainRange[0]),
      depthActivityGainBonus(meta.gainRange[1]),
    ];
  }
  if (meta.relBonus) meta.relBonus = depthRelBonus(meta.relBonus);
  return meta;
}

export function scaleEvolvedEventLbs(lbs = 0) {
  if (!lbs || lbs <= 0) return lbs || 0;
  return depthLbsGrant(lbs);
}

export function scaleEvolvedEventRel(rel = 0) {
  if (!rel) return 0;
  if (rel < 0) return rel;
  return depthRelBonus(rel);
}

/** Wife Lessons session payouts — same depth curve as evolved branching events. */
export function scaleWlLessonLbs(lbs = 0) {
  return scaleEvolvedEventLbs(lbs);
}

export function scaleWlLessonRel(rel = 0) {
  return scaleEvolvedEventRel(rel);
}
`;

fs.writeFileSync(OUT, file);
console.log(`stubEvolvedActivityProse: wrote ${OUT} (${fs.statSync(OUT).size} bytes)`);
