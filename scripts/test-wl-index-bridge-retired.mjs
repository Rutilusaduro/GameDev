#!/usr/bin/env node
/** Wife Lessons index must not register week≤19 legacy body bridges (fragment-only pools). */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const path = join(import.meta.dirname, '..', 'src/textEngine/scenes/wifeLessons/index.js');
const src = readFileSync(path, 'utf8');

assert.ok(!src.includes('legacyBridgeWhen'), 'wifeLessons/index.js should not use legacyBridgeWhen');
assert.ok(!src.includes('wlTalkTailBeat'), 'wifeLessons/index.js should not attach prose tail bridges');

console.log('test-wl-index-bridge-retired: ok');
