#!/usr/bin/env node
/** Requirement checklist gate — proves RA dorm pivot objective items in repo. */
import assert from 'assert';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { DORMS, DORM_LIST, dormUnlocksForWeek, STUDENT_HOME_DORM } from '../src/gameData/dorms.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { PROFESSOR_RANKS } from '../src/gameData/content.js';

const root = join(import.meta.dirname, '..');
const read = (rel) => readFileSync(join(root, rel), 'utf8');

const checks = [];

function check(id, fn) {
  try {
    fn();
    checks.push({ id, ok: true });
  } catch (err) {
    checks.push({ id, ok: false, err: err.message });
  }
}

// ── RA player identity ─────────────────────────────────────────
check('ra-setup-wizard', () => {
  assert.ok(existsSync(join(root, 'src/components/RaSetupWizard.jsx')));
  const src = read('src/components/RaSetupWizard.jsx');
  assert.match(src, /Red hair/i, 'RA intro must mention red hair');
  assert.match(src, /curves/i, 'RA intro must mention curvy build');
  assert.match(src, /RESIDENCE LIFE SIMULATOR/i);
});

check('ra-profile-appearance', () => {
  const src = read('src/HallPass.jsx');
  assert.match(src, /appearance:\s*\{\s*hair:\s*'red',\s*build:\s*'curvy'\s*\}/);
  assert.match(src, /role:\s*"ra"/);
});

check('hall-pass-title', () => {
  const html = read('index.html');
  assert.match(html, /<title>Hall Pass<\/title>/);
  assert.doesNotMatch(html, /Professor Sim/i);
});

// ── Four dorms, ~5 residents each ──────────────────────────────
check('four-dorms', () => {
  assert.equal(DORM_LIST.length, 4);
  const ids = new Set(DORM_LIST.map((d) => d.id));
  assert.deepEqual([...ids].sort(), ['nerdy', 'socialite', 'sporty', 'weirdos']);
});

check('dorm-resident-counts', () => {
  const counts = Object.fromEntries(DORM_LIST.map((d) => [d.id, d.studentIds.length]));
  assert.equal(counts.sporty, 5, 'Victory Hall should have 5 home residents');
  assert.equal(counts.socialite, 5, 'Rosewood should have 5 home residents');
  assert.ok(counts.nerdy >= 4 && counts.nerdy <= 5, `Scholar's Rest resident count: ${counts.nerdy}`);
  assert.ok(counts.weirdos >= 4 && counts.weirdos <= 5, `Annex resident count: ${counts.weirdos}`);
});

check('unlock-schedule', () => {
  assert.deepEqual(dormUnlocksForWeek(8, 'sporty'), ['nerdy']);
  assert.deepEqual(dormUnlocksForWeek(12, 'sporty'), ['nerdy', 'socialite']);
  assert.deepEqual(dormUnlocksForWeek(16, 'sporty'), ['nerdy', 'socialite', 'weirdos']);
  for (const start of ['nerdy', 'socialite', 'weirdos']) {
    const at16 = [...dormUnlocksForWeek(16, start), start].sort();
    assert.deepEqual(at16, ['nerdy', 'socialite', 'sporty', 'weirdos'].sort(), `wk16 all halls for ${start} start`);
  }
});

// ── Cassidy replaces Madeline ──────────────────────────────────
check('cassidy-swimmer', () => {
  const cassidy = INIT_STUDENTS.find((s) => s.id === 1);
  assert.ok(cassidy, 'student id 1 must exist');
  assert.equal(cassidy.name, 'Cassidy');
  assert.equal(cassidy.archetype, 'swimmer');
  assert.equal(STUDENT_HOME_DORM[1], 'sporty');
  assert.ok(!INIT_STUDENTS.some((s) => /madeline/i.test(s.name)), 'no Madeline in roster');
});

check('community-researcher-cassidy', () => {
  const src = read('src/gameData/communityResearcher.js');
  assert.match(src, /Cassidy \(id:1\)/);
  assert.doesNotMatch(src, /\bMadeline\b/);
});

// ── RA-framed ranks ────────────────────────────────────────────
check('ra-rank-labels', () => {
  const labels = PROFESSOR_RANKS.map((r) => r.label).join(' ');
  assert.match(labels, /New RA/);
  assert.doesNotMatch(labels, /Professor/i);
});

// ── Verification gates wired ─────────────────────────────────────
const REQUIRED_SCRIPTS = [
  'test:ra-theme',
  'test:dorm-unlock',
  'test:dorm-unlock-ui',
  'test:playthrough',
  'test:semester-audit',
  'test:prose-coherence',
  'test:no-placeholders',
  'test:ui-strings',
  'test:e2e',
  'test:smoke',
  'test:completion-audit',
  'text:lint',
];

check('npm-scripts', () => {
  const pkg = JSON.parse(read('package.json'));
  for (const script of REQUIRED_SCRIPTS) {
    assert.ok(pkg.scripts[script], `missing npm script: ${script}`);
  }
});

check('smoke-wires-completion-audit', () => {
  const smoke = read('scripts/test-smoke.mjs');
  assert.match(smoke, /test:completion-audit/);
  assert.match(smoke, /test:no-placeholders/);
  assert.match(smoke, /test:semester-audit/);
});

const REQUIRED_E2E = [
  'e2e/setup-wizard.spec.js',
  'e2e/semester-wk4.spec.js',
  'e2e/semester-wk8-all-halls.spec.js',
  'e2e/semester-wk16-all-halls.spec.js',
  'e2e/semester-wk16-clickthrough.spec.js',
  'e2e/dorm-unlock.spec.js',
  'e2e/dorm-unlock-wk16.spec.js',
];

check('e2e-coverage', () => {
  for (const spec of REQUIRED_E2E) {
    assert.ok(existsSync(join(root, spec)), `missing e2e spec: ${spec}`);
  }
});

// ── UI polish hooks ────────────────────────────────────────────
check('ui-polish-css', () => {
  const css = read('src/index.css');
  const styles = read('src/styles.js');
  assert.match(styles, /backdropFilter/i, 'modal overlay must use backdrop blur');
  for (const cls of [
    'hall-pass-view-in', 'ra-wizard-card', 'hall-pass-modal-in', 'hall-unlock-new', 'ra-desk-header',
    'roster-tile-in', 'week-recap-card-in', 'hall-roadmap-card', 'ra-desk-action-btn',
    'ra-desk-week-tick', 'scene-beat-advance', 'scene-choice-btn',
  ]) {
    assert.match(css, new RegExp(`\\.${cls}`), `missing CSS class .${cls}`);
  }
});

check('ra-portrait-chip', () => {
  assert.ok(existsSync(join(root, 'src/components/RaPortraitChip.jsx')));
  const desk = read('src/HallPass.jsx');
  assert.match(desk, /RaPortraitChip/);
});

// ── Report ─────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  console.log(c.ok ? `  ✓ ${c.id}` : `  ✗ ${c.id}: ${c.err}`);
}

if (failed.length) {
  console.error(`\ncompletion-audit: ${failed.length}/${checks.length} failed`);
  process.exit(1);
}

console.log(`\ncompletion-audit: ${checks.length}/${checks.length} requirements verified`);
