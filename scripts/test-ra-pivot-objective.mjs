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

execSync('npm run text:lint', { cwd: root, stdio: 'pipe' });

const evoPath = join(root, 'src/gameData/evolvedForms.js');
const evoLines = readFileSync(evoPath, 'utf8').split('\n').length;
const debtThreshold = 4000;
if (evoLines > debtThreshold) {
  console.warn(`text-migration-debt: evolvedForms.js still ${evoLines} lines (target <=${debtThreshold}; homeroomEvents extracted)`);
}

console.log('test-ra-pivot-objective: ok (mechanics, blueprint, ambiance registry, text bridges, text:lint)');
