#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { MECHANICS_DEPTH_SYSTEMS } from '../src/gameData/mechanicsDepthRegistry.js';

const root = join(import.meta.dirname, '..');

for (const sys of MECHANICS_DEPTH_SYSTEMS) {
  const path = join(root, 'src/gameData', sys.file);
  const src = readFileSync(path, 'utf8');
  const wired = /mechanicsDepthLayer/.test(src);
  assert.ok(wired, `${sys.file} must wire mechanics depth (system: ${sys.id})`);
}

assert.ok(readFileSync(join(root, 'src/HallPass.jsx'), 'utf8').includes('depthCorruptionGrant'));
assert.ok(readFileSync(join(root, 'src/gameData/talkSystem.js'), 'utf8').includes('enrichTalkEffect'));

console.log(`test-mechanics-depth: ${MECHANICS_DEPTH_SYSTEMS.length} systems wired`);
