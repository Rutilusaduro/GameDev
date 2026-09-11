#!/usr/bin/env node
/** Tracks raPivotProseDepthPass files hollowed vs still registering variants. */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const scenes = join(root, 'src/textEngine/scenes');

const RETIRED_EMPTY = new Set([
  'raPivotProseDepthPass85.js',
  'raPivotProseDepthPass89.js',
  'raPivotProseDepthPass94.js',
  'raPivotProseDepthPass100.js',
  'raPivotProseDepthPass101.js',
  'raPivotProseDepthPass111.js',
  'raPivotProseDepthPass112.js',
  'raPivotProseDepthPass81.js',
  'raPivotProseDepthPass84.js',
  'raPivotProseDepthPass104.js',
  'raPivotProseDepthPass106.js',
  'raPivotProseDepthPass113.js',
  'raPivotProseDepthPass114.js',
  'raPivotProseDepthPass93.js',
  'raPivotProseDepthPass115.js',
  'raPivotProseDepthPass75.js',
  'raPivotProseDepthPass76.js',
  'raPivotProseDepthPass77.js',
  'raPivotProseDepthPass78.js',
  'raPivotProseDepthPass80.js',
  'raPivotProseDepthPass82.js',
  'raPivotProseDepthPass86.js',
  'raPivotProseDepthPass57.js',
  'raPivotProseDepthPass87.js',
  'raPivotProseDepthPass91.js',
  'raPivotProseDepthPass92.js',
  'raPivotProseDepthPass96.js',
  'raPivotProseDepthPass61.js',
  'raPivotProseDepthPass79.js',
  'raPivotProseDepthPass102.js',
  'raPivotProseDepthPass105.js',
  'raPivotProseDepthPass110.js',
  'raPivotProseDepthPass133.js',
  'raPivotProseDepthPass90.js',
  'raPivotProseDepthPass98.js',
  'raPivotProseDepthPass103.js',
  'raPivotProseDepthPass108.js',
  'raPivotProseDepthPass88.js',
  'raPivotProseDepthPass99.js',
  'raPivotProseDepthPass63.js',
  'raPivotProseDepthPass69.js',
  'raPivotProseDepthPass70.js',
  'raPivotProseDepthPass72.js',
  'raPivotProseDepthPass74.js',
  'raPivotProseDepthPass83.js',
  'raPivotProseDepthPass97.js',
  'raPivotProseDepthPass68.js',
  'raPivotProseDepthPass116.js',
  'raPivotProseDepthPass117.js',
  'raPivotProseDepthPass118.js',
  'raPivotProseDepthPass119.js',
  'raPivotProseDepthPass120.js',
  'raPivotProseDepthPass121.js',
  'raPivotProseDepthPass122.js',
  'raPivotProseDepthPass123.js',
  'raPivotProseDepthPass124.js',
  'raPivotProseDepthPass125.js',
  'raPivotProseDepthPass126.js',
  'raPivotProseDepthPass127.js',
  'raPivotProseDepthPass128.js',
  'raPivotProseDepthPass129.js',
  'raPivotProseDepthPass130.js',
  'raPivotProseDepthPass131.js',
  'raPivotProseDepthPass132.js',
  'raPivotProseDepthPass133.js',
  'raPivotProseDepthPass134.js',
  'raPivotProseDepthPass135.js',
  'raPivotProseDepthPass136.js',
  'raPivotProseDepthPass137.js',
  'raPivotProseDepthPass138.js',
  'raPivotProseDepthPass139.js',
  'raPivotProseDepthPass140.js',
  'raPivotProseDepthPass141.js',
  'raPivotProseDepthPass142.js',
  'raPivotProseDepthPass143.js',
  'raPivotProseDepthPass144.js',
  'raPivotProseDepthPass145.js',
]);

const passFiles = readdirSync(scenes).filter((f) => /^raPivotProseDepthPass\d+\.js$/.test(f));
let hollow = 0;
let withVariants = 0;
let legacyBridgeBlocks = 0;

for (const f of passFiles) {
  const src = readFileSync(join(scenes, f), 'utf8');
  const hasVariants = src.includes('registerModuleVariants');
  if (hasVariants) withVariants += 1;
  else hollow += 1;
  legacyBridgeBlocks += (src.match(/legacyBridgeWhen/g) || []).length;
  if (RETIRED_EMPTY.has(f)) {
    assert.ok(!hasVariants, `${f} should be hollow (fragment migration)`);
  }
}

assert.ok(hollow >= 49, `expected >=49 hollow pass files, got ${hollow}`);
assert.ok(withVariants <= 58, `pass files with variants should shrink over time, got ${withVariants}`);
assert.ok(legacyBridgeBlocks === 0, `expected 0 legacyBridgeWhen in pass files, got ${legacyBridgeBlocks}`);

console.log(`test-pass-retire-inventory: ok (${hollow} hollow, ${withVariants} with variants, ${legacyBridgeBlocks} legacyBridgeWhen refs in passes)`);
