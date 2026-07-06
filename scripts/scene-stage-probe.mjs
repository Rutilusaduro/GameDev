#!/usr/bin/env node
import { splitProseToBeats, inferChoiceIntent } from '../src/utils/sceneStage.js';

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    failures += 1;
    console.error(`FAIL: ${msg}`);
  }
}

const beats = splitProseToBeats('First beat.\n\nSecond beat here.');
assert(beats.length === 2, 'splits on blank line');
assert(inferChoiceIntent('See it through') === 'press', 'press intent');
assert(inferChoiceIntent('Apologize sincerely') === 'comfort', 'comfort intent');
assert(inferChoiceIntent('Feed her more') === 'feed', 'feed intent');

console.log(`scene-stage:probe — ${failures} failures`);
process.exit(failures > 0 ? 1 : 0);
