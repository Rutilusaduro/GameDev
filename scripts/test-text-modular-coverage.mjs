#!/usr/bin/env node
/** Modular text pilot — slot pools exist and fragment files meet minimum breadth. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import '../src/textEngine/scenes/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const root = join(import.meta.dirname, '..');

function poolTextCount(key) {
  const variants = _registryEntries().find(([k]) => k === key)?.[1];
  if (!variants) return 0;
  let n = 0;
  for (const v of variants) {
    const texts = Array.isArray(v.text) ? v.text : [v.text];
    n += texts.filter((t) => typeof t === 'string' && t.trim()).length;
  }
  return n;
}

const SLOT_KEYS = [
  'wl.lesson.aroma',
  'wl.lesson.mjDoctrine',
  'wl.talk.warmOpen',
  'wl.talk.branchAnswer',
  'evolved.scene.atmosphere',
  'evolved.choice.chatReact',
  'evolved.ending.streamCoda',
];

for (const key of SLOT_KEYS) {
  const n = poolTextCount(key);
  assert.ok(n >= 3, `slot pool ${key} needs >=3 wildcard strings, got ${n}`);
}

const lessonFrag = readFileSync(join(root, 'src/textEngine/scenes/wifeLessons/lessonFragments.js'), 'utf8');
const talkFrag = readFileSync(join(root, 'src/textEngine/scenes/wifeLessons/talkFragments.js'), 'utf8');
const eventFrag = readFileSync(join(root, 'src/textEngine/scenes/evolved/eventPhaseFragments.js'), 'utf8');

assert.match(lessonFrag, /MODULAR_LESSON_KEYS/);
assert.match(talkFrag, /opt\$\{oi\}\.sub\$\{si\}/);
assert.match(eventFrag, /MODULAR_EVENT_ENDINGS/);

let talkOptVariants = 0;
for (const [key] of _registryEntries()) {
  if (/^wifeLessons\.talk\.[^.]+\.s\d+\.opt\d+$/.test(key)) talkOptVariants += 1;
}
assert.ok(talkOptVariants >= 30, `expected many WL talk opt pools, got ${talkOptVariants}`);

console.log(`test-text-modular-coverage: ok (${SLOT_KEYS.length} slot pools, ${talkOptVariants} talk opt pools)`);
