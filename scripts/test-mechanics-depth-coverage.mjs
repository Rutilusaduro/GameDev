#!/usr/bin/env node
/** Report mechanical gameData files not yet in the depth registry. */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { MECHANICS_DEPTH_SYSTEMS } from '../src/gameData/mechanicsDepthRegistry.js';

const root = join(import.meta.dirname, '..');
const gameData = join(root, 'src/gameData');

const registryFiles = new Set(MECHANICS_DEPTH_SYSTEMS.map((s) => s.file));
const mech = /export function|gainLbs|relBonus|relGain|calories|psychDelta|trustGrants|passiveLbs|gainRange/;

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.js')) out.push(p.slice(gameData.length + 1));
  }
  return out;
}

const mechanical = walk(gameData).filter((rel) => {
  const src = readFileSync(join(gameData, rel), 'utf8');
  return mech.test(src);
});

const wiredInFile = mechanical.filter((rel) =>
  /mechanicsDepthLayer/.test(readFileSync(join(gameData, rel), 'utf8')),
);
const inRegistry = mechanical.filter((rel) => registryFiles.has(rel));
const unwired = mechanical.filter((rel) => {
  const src = readFileSync(join(gameData, rel), 'utf8');
  return !/mechanicsDepthLayer/.test(src);
});

/** Static data / UI helpers — no payout math to deepen. */
const DATA_ONLY = new Set([
  'bugReport.js',
  'circuitBoardDefs.js',
  'deviceCategories.js',
  'gameSave.js',
  'hallPassAudio.js',
  'hallPassEvents.js',
  'intimacyData.js',
  'items.js',
  'mechanicsDepthLayer.js',
  'playerPrefs.js',
  'profileSprites.js',
  'raDisplay.js',
  'stages.js',
  'studentSprites.js',
  'students.js',
  'textFlagStore.js',
  'textLintMeta.js',
  'wlMomDialogueDepth.js',
]);

const unwiredPayout = unwired.filter((rel) => !DATA_ONLY.has(rel));

console.log(
  `mechanics-depth-coverage: registry=${registryFiles.size} mechanical=${mechanical.length} layer-import=${wiredInFile.length} unwired=${unwired.length} unwired-payout=${unwiredPayout.length}`,
);
if (unwiredPayout.length) {
  console.log('unwired payout paths:', unwiredPayout.join(', '));
} else if (unwired.length) {
  console.log('unwired data-only:', unwired.length, 'files (expected)');
}
