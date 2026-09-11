#!/usr/bin/env node
/**
 * RA dorm pivot objective — evidence gate (mechanics depth, blueprint, ambiance, text bridges).
 * Does not prove full MIGRATION.md fragment migration; proves wired deliverables in repo.
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import { MECHANICS_DEPTH_SYSTEMS } from '../src/gameData/mechanicsDepthRegistry.js';
import { MECHANICS_DEPTH_SCALE } from '../src/gameData/mechanicsDepthLayer.js';

const root = join(import.meta.dirname, '..');

function mustExist(rel) {
  const p = join(root, rel);
  assert.ok(existsSync(p), `missing ${rel}`);
  return p;
}

assert.equal(MECHANICS_DEPTH_SCALE, 1.5, 'MECHANICS_DEPTH_SCALE should be ~50% depth bump');
assert.ok(MECHANICS_DEPTH_SYSTEMS.length >= 100, `mechanics registry too small: ${MECHANICS_DEPTH_SYSTEMS.length}`);
const ids = new Set(MECHANICS_DEPTH_SYSTEMS.map((s) => s.id));
assert.ok(ids.has('hallBlueprint'), 'hallBlueprint not in depth registry');
assert.ok(ids.has('hallAmbiance'), 'hallAmbiance (designed mechanic) not in depth registry');

mustExist('src/components/HallBlueprint.jsx');
mustExist('src/gameData/hallBlueprint.js');
mustExist('src/gameData/hallAmbiance.js');
mustExist('src/gameData/homeroomEvents.js');
mustExist('src/gameData/feederSubjectJournals.js');
mustExist('src/gameData/wifeLessonsData.js');
mustExist('src/gameData/rankedSessionData.js');
mustExist('src/gameData/evolvedEvents.js');
mustExist('src/gameData/competitiveGainerData.js');
mustExist('src/gameData/fairQueenData.js');
mustExist('src/gameData/evolvedReactionsOutfits.js');
mustExist('src/gameData/evolvedActivityData.js');
mustExist('src/gameData/evolutionUiData.js');
mustExist('src/gameData/evolvedScaling.js');

const hallLounge = readFileSync(join(root, 'src/views/HallLoungeView.jsx'), 'utf8');
assert.match(hallLounge, /HallBlueprint/, 'Hall lounge view should render blueprint UI');

execSync('npm run test:hall-blueprint', { cwd: root, stdio: 'inherit' });
const depthOut = execSync('npm run test:mechanics-depth', { cwd: root, encoding: 'utf8' });
assert.match(depthOut, /systems wired/, depthOut);
const cov = execSync('npm run test:mechanics-depth-coverage', { cwd: root, encoding: 'utf8' });
assert.match(cov, /unwired-payout=0/, cov);

execSync('npm run test:text-bridges', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-pool-variety.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-spot-render.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-modular-pilot.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-modular-coverage.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-modular-late-game.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-overhaul-sampling.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-legacy-suppression-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-migration-bridge-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-feeder-journal-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-talk-checkin-modular-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-wife-lessons-lesson-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-wife-lessons-dialogue-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-wl-talk-modular-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-wl-mom-depth-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-nadia-journal-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-homeroom-events-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-homeroom-conference-modular-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-fair-day-modular-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-modular-pool-depth.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-cg-text-stub-debt.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-cg-corkboard-modular-late.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-fragment-load-order.mjs', { cwd: root, stdio: 'inherit' });

execSync('node scripts/test-text-modular-namespace-coverage.mjs', { cwd: root, stdio: 'inherit' });

execSync('npm run text:lint', { cwd: root, stdio: 'pipe' });

const evoPath = join(root, 'src/gameData/evolvedForms.js');
const evoLines = readFileSync(evoPath, 'utf8').split('\n').length;
const debtThreshold = 4000;
const extractModules = [
  'src/gameData/evolvedEvents.js',
  'src/gameData/evolvedReactionsOutfits.js',
  'src/gameData/evolvedActivityData.js',
  'src/gameData/evolutionUiData.js',
];
let extractLines = 0;
for (const rel of extractModules) {
  extractLines += readFileSync(join(root, rel), 'utf8').split('\n').length;
}
if (evoLines > debtThreshold) {
  console.warn(`text-migration-debt: evolvedForms barrel ${evoLines} lines; extracts ${extractLines} lines across modules`);
} else {
  console.log(`text-migration-debt: evolvedForms barrel ${evoLines} lines; prose extracts ${extractLines} lines (monolith retired)`);
}

console.log('test-ra-pivot-objective: ok (mechanics, blueprint, ambiance registry, text bridges, text:lint)');
