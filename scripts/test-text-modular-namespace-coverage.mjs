#!/usr/bin/env node
/**
 * Text overhaul namespace coverage — fragment modules exist and modular overlays register.
 */
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import '../src/textEngine/scenes/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const root = join(import.meta.dirname, '..');
const scenesRoot = join(root, 'src/textEngine/scenes');

function walkFragments(dir, acc = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walkFragments(p, acc);
    else if (/Fragments\.js$/.test(ent.name)) acc.push(p.replace(`${scenesRoot}/`, ''));
  }
  return acc;
}

const fragmentFiles = walkFragments(scenesRoot);
assert.ok(fragmentFiles.length >= 24, `expected >=24 *Fragments.js modules, got ${fragmentFiles.length}`);

const requiredFragments = [
  'evolved/eventPhaseFragments.js',
  'wifeLessons/lessonFragments.js',
  'fairQueen/dayModularFragments.js',
  'fairQueen/trainingModularFragments.js',
  'fairQueen/photoBoostModularFragments.js',
  'talkSuggestIndulgenceModularFragments.js',
  'talkSuggestGrowthModularFragments.js',
  'hallBlueprint/blueprintModularFragments.js',
  'hallBlueprint/hallAmbianceModularFragments.js',
  'competitiveGainer/cgSceneFragments.js',
  'competitiveGainer/cgMeasurementModularFragments.js',
  'cultivator/cultivatorFragments.js',
  'dinner/dinnerDishFragments.js',
  'campusEvent/campusEventFragments.js',
  'hunt/huntFeastFragments.js',
  'eatingContest/eatingContestFragments.js',
  'sumoMatch/sumoMatchFragments.js',
  'recordingSession/recordingSessionFragments.js',
  'weeklyEvent/weeklyEventLateModularFragments.js',
  'campusEvent/campusEventLateModularFragments.js',
  'campusExplorationModularFragments.js',
  'itemUse/itemUseModularFragments.js',
  'growthEvent/growthEventLateModularFragments.js',
  'deviceUse/deviceLateModularFragments.js',
  'talkEncourageModularFragments.js',
  'streamEndStreamModularFragments.js',
  'talkCommandFinishModularFragments.js',
  'opposition/oppositionLateModularFragments.js',
  'talkRefusalCommandFinishModularFragments.js',
  'opposition/oppositionAgendaModularFragments.js',
  'talkRefusalCommandDevourModularFragments.js',
  'raPivotPassPeelFragments.js',
  'fairQueen/trainingModularFragments.js',
  'fairQueen/photoBoostModularFragments.js',
  'weeklyEvent/weeklyEventLateModularFragments.js',
  'talkSuggestIndulgenceModularFragments.js',
  'talkSuggestGrowthModularFragments.js',
];
for (const rel of requiredFragments) {
  assert.ok(fragmentFiles.includes(rel) || existsSync(join(scenesRoot, rel)), `missing fragment ${rel}`);
}

let modularOverlayPools = 0;
for (const [key, variants] of _registryEntries()) {
  if (!Array.isArray(variants)) continue;
  const hasOverlay = variants.some((v) => (v.priority ?? 0) >= 2 && v.when && Object.keys(v.when).length > 0);
  if (hasOverlay) modularOverlayPools += 1;
}
assert.ok(modularOverlayPools >= 180, `expected many pools with priority>=2 overlays, got ${modularOverlayPools}`);

console.log(`test-text-modular-namespace-coverage: ok (${fragmentFiles.length} fragment files, ${modularOverlayPools} overlay pools)`);
