#!/usr/bin/env node
/** talkDepth.js must stay hollow — voice lives in talkFragments + index stubs. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const path = join(import.meta.dirname, '..', 'src/textEngine/scenes/wifeLessons/talkDepth.js');
const src = readFileSync(path, 'utf8');
assert.ok(!src.includes('registerModuleVariants'), 'talkDepth.js should not register variants');
assert.ok(!src.includes('legacyBridgeWhen'), 'talkDepth.js should not use legacyBridgeWhen');
console.log('test-wl-talk-depth-retired: ok');
