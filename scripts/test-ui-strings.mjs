#!/usr/bin/env node
/** Player-facing UI labels — setup wizard, nav, view titles, ranks, dorm hooks. */
import assert from 'assert';
import { readFileSync } from 'fs';
import { DORM_LIST } from '../src/gameData/dorms.js';
import { RA_APPROACH_LIST } from '../src/gameData/raApproaches.js';
import { PROFESSOR_RANKS } from '../src/gameData/content.js';

const BANNED = [
  /Professor Sim/i,
  /spirit-possessed/i,
  /\bMadeline\b/,
  /Back to Class/i,
  /Chubby Class/i,
  /Class Banquet/i,
  /Present Thesis/i,
  /Spirit Hub/i,
  /Department budget/i,
  /Athletics Department/i,
  /future of the department/i,
];

function assertClean(text, label) {
  for (const re of BANNED) {
    assert(!re.test(text), `${label} must not match ${re}`);
  }
}

const hallPass = readFileSync('src/HallPass.jsx', 'utf8');
assert(
  /\[\["class","📋 Roster"\],\["classroom","🏠 Hall Lounge"\],\["spirit-hub","✨ Influence"\]/.test(hallPass),
  'main nav must use Roster / Hall Lounge / Influence labels',
);
assert(hallPass.includes('RA DESK'), 'header must say RA DESK');
assertClean(hallPass, 'HallPass.jsx');

const viteConfig = readFileSync('vite.config.js', 'utf8');
assert(viteConfig.includes('name: "Hall Pass"'), 'PWA manifest name must be Hall Pass');
assert(!/Professor's Quarters|Prof Sim/i.test(viteConfig), 'PWA manifest must not reference Professor Sim');

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('<title>Hall Pass</title>'), 'index.html title must be Hall Pass');

const wizard = readFileSync('src/components/RaSetupWizard.jsx', 'utf8');
assert(wizard.includes('Hall Pass'), 'setup wizard title must be Hall Pass');
assert(wizard.includes('RESIDENCE LIFE SIMULATOR'), 'setup wizard genre tag required');
assert(wizard.includes('Your floor. Your rules.'), 'setup wizard tagline required');
assertClean(wizard, 'RaSetupWizard.jsx');

const spiritHub = readFileSync('src/views/SpiritHubView.jsx', 'utf8');
assert(spiritHub.includes('Floor Influence'), 'SpiritHubView title must be Floor Influence');
assertClean(spiritHub, 'SpiritHubView.jsx');

const roster = readFileSync('src/views/ClassView.jsx', 'utf8');
assert(roster.includes('Residents —'), 'ClassView must label roster Residents');
assertClean(roster, 'ClassView.jsx');

const lounge = readFileSync('src/views/ClassroomView.jsx', 'utf8');
assert(lounge.includes('HALL LOUNGE'), 'ClassroomView must say HALL LOUNGE');
assertClean(lounge, 'ClassroomView.jsx');

for (const r of PROFESSOR_RANKS) {
  assert(r.label, 'rank needs label');
  assert(!/professor/i.test(r.label), `rank label must not say professor: ${r.label}`);
}

for (const d of DORM_LIST) {
  assert(d.label && d.hook, `dorm ${d.id} needs label + hook`);
  assertClean(d.hook, `dorm ${d.id} hook`);
}

for (const a of RA_APPROACH_LIST) {
  assert(a.label && a.tagline, `approach ${a.id} needs label + tagline`);
  assertClean(`${a.label} ${a.tagline}`, `approach ${a.id}`);
}

console.log('ui-strings: setup wizard, nav, views, ranks, and dorm hooks OK');
