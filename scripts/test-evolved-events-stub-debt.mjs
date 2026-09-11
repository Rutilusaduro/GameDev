#!/usr/bin/env node
/** Step-6 evolvedEvents extract — phase/choice strings stay bridge-sized. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVOLVED_EVENTS } from '../src/gameData/evolvedEvents.js';

const MAX = 280;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function samplePhase(phase) {
  if (typeof phase.text === 'string') return phase.text;
  if (typeof phase.text === 'function') {
    const subj = { lbs: 260, name: 'Tester' };
    try {
      return String(phase.text([], subj)).trim();
    } catch {
      return '';
    }
  }
  return '';
}

const SKIP = new Set(['salon_appetit', 'artisan_gallery']);

let cells = 0;
for (const [formId, stages] of Object.entries(EVOLVED_EVENTS)) {
  if (SKIP.has(formId) || !Array.isArray(stages)) continue;
  stages.forEach((evDef, si) => {
    (evDef.phases || []).forEach((phase, pi) => {
      const line = samplePhase(phase);
      cells += 1;
      assert.ok(line.length <= MAX, `${formId} s${si}p${pi} too long (${line.length})`);
      assert.match(line, /week 20\+|Modular evolved/i, `${formId} s${si}p${pi} missing bridge marker`);
      for (const ch of phase.choices || []) {
        const res = typeof ch.result === 'string' ? ch.result : '';
        if (res) {
          cells += 1;
          assert.ok(res.length <= MAX, `${formId} ${ch.id} result too long`);
        }
      }
    });
  });
}

const src = readFileSync(join(root, 'src/gameData/evolvedEvents.js'), 'utf8');
assert.match(src, /step 6/i);

console.log(`test-evolved-events-stub-debt: ok (${cells} cells, max ${MAX} chars)`);
