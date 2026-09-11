#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WL_DIALOGUES } from '../src/gameData/wifeLessonsData.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const MAX = 220;
const PRESERVE_LEN = 280;

function checkString(s, path) {
  if (!s || typeof s !== 'string') return;
  const max = path.includes('Darlene') && path.includes('greeting') && s.includes('my daughters seemed')
    ? PRESERVE_LEN
    : MAX;
  assert.ok(s.length <= max, `${path} length ${s.length} > ${max}`);
  assert.doesNotMatch(s, /I still can't quite believe|OMG, I can't believe/i, `${path} legacy opener`);
}

let n = 0;
for (const [person, stages] of Object.entries(WL_DIALOGUES)) {
  stages.forEach((entry, si) => {
    const base = `${person}.s${si + 1}`;
    if (entry.greeting) { checkString(entry.greeting, `${base}.greeting`); n += 1; }
    if (entry.cappedGreeting) { checkString(entry.cappedGreeting, `${base}.capped`); n += 1; }
    if (entry.overtookGreeting) { checkString(entry.overtookGreeting, `${base}.overtook`); n += 1; }
    entry.options?.forEach((opt, oi) => {
      checkString(opt.text, `${base}.opt${oi}`);
      n += 1;
      opt.subs?.forEach((sub, sj) => {
        checkString(sub.text, `${base}.opt${oi}.sub${sj}`);
        n += 1;
      });
    });
  });
}

const file = readFileSync(join(root, 'src/gameData/wifeLessonsData.js'), 'utf8');
assert.match(file, /my daughters seemed to enjoy/, 'audit greeting phrase preserved');
assert.match(file, /modular talk carries/i, 'dialogue stub marker');

console.log(`test-wife-lessons-dialogue-stub-debt: ok (${n} lines checked)`);
