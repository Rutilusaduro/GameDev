#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SALON_EVOLVED_EVENTS } from '../src/gameData/chloeSalon.js';
import { GALLERY_EVOLVED_EVENTS } from '../src/gameData/fionaGallery.js';

const MAX = 280;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function samplePhase(phase) {
  const subj = { lbs: 265, name: 'Chloé' };
  return String(phase.text([], subj)).trim();
}

for (const [label, arr] of [['salon', SALON_EVOLVED_EVENTS], ['gallery', GALLERY_EVOLVED_EVENTS]]) {
  arr.forEach((ev, si) => {
    (ev.phases || []).forEach((ph, pi) => {
      const line = samplePhase(ph);
      assert.ok(line.length <= MAX, `${label} s${si}p${pi} too long`);
      assert.match(line, /Modular evolved\.scene/i, `${label} s${si}p${pi}`);
    });
  });
}

assert.match(readFileSync(join(root, 'src/gameData/chloeSalon.js'), 'utf8'), /SALON_EVOLVED_EVENTS/);
console.log('test-salon-gallery-evolved-stub-debt: ok');
