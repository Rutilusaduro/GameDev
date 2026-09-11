#!/usr/bin/env node
/** Modular fragment modules must load after their bridge index registers base pools. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const barrel = readFileSync(join(root, 'src/textEngine/scenes/index.js'), 'utf8');

const imports = [];
for (const m of barrel.matchAll(/import '\.\/([^']+)'/g)) {
  imports.push(m[1]);
}

function indexOf(rel) {
  const i = imports.indexOf(rel);
  assert.ok(i >= 0, `scenes/index.js should import ${rel}`);
  return i;
}

const pairs = [
  ['fairQueen/index.js', 'fairQueen/dayModularFragments.js'],
  ['homeroom/index.js', 'homeroom/conferenceFragments.js'],
  ['homeroom/index.js', 'homeroom/activityFragments.js'],
  ['researchJournal/index.js', 'researchJournal/journalFragments.js'],
  ['rankedSession/index.js', 'rankedSession/sessionFragments.js'],
  ['wifeLessons/index.js', 'wifeLessons/lessonFragments.js'],
  ['wifeLessons/index.js', 'wifeLessons/talkFragments.js'],
  ['evolved/index.js', 'evolved/reactionFragments.js'],
  ['evolved/index.js', 'evolved/activityModularFragments.js'],
  ['evolved/index.js', 'evolved/evolutionOfferFragments.js'],
  ['competitiveGainer/index.js', 'competitiveGainer/cgChatFragments.js'],
];

for (const [bridge, fragment] of pairs) {
  assert.ok(indexOf(fragment) > indexOf(bridge), `${fragment} must import after ${bridge}`);
}

const risky = [
  'src/textEngine/scenes/fairQueen/index.js',
  'src/textEngine/scenes/homeroom/index.js',
  'src/textEngine/scenes/wifeLessons/index.js',
];
for (const rel of risky) {
  const src = readFileSync(join(root, rel), 'utf8');
  assert.ok(!/import '\.\/.*Fragments\.js'/.test(src), `${rel} should not import fragment files (use scenes/index order)`);
}

console.log(`test-text-fragment-load-order: ok (${pairs.length} bridge→fragment pairs)`);
