#!/usr/bin/env node
import assert from 'node:assert/strict';
import { WL_LESSONS } from '../src/gameData/wifeLessonsData.js';

const MAX = 320;
let n = 0;
for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    n += 1;
    const t = lesson.text || '';
    assert.ok(t.length <= MAX, `WL lesson s${stage}.${lesson.id} text ${t.length} > ${MAX}`);
    assert.match(t, /kitchen|MJ|witness|stage/i, `WL lesson s${stage}.${lesson.id} missing stub frame`);
  }
}
console.log(`test-wife-lessons-lesson-stub-debt: ok (${n} lessons, max ${MAX} chars)`);
