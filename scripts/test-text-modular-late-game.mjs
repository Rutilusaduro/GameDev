#!/usr/bin/env node
/** Late-game (week 20+) modular renders — fair, CG, homeroom activity slots. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { renderCGPriyaPost } from '../src/textEngine/scenes/competitiveGainer/index.js';
import { HOMEROOM_GROUP_ACTIVITIES } from '../src/gameData/homeroomEvents.js';

const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 280 };
const priya = { id: 99, name: 'Priya', archetype: 'competitive_gainer', lbs: 260 };
const week = 22;

const carnivalAir = render('{fair.day.carnivalAir}', buildTextContext({ subject: mj, week, seed: 1 }))?.trim() || '';
assert.ok(carnivalAir.length > 20, 'fair.day.carnivalAir slot pool');
assert.ok(!carnivalAir.includes('{unresolved}'), 'fair.day.carnivalAir unresolved');

let fairModularHit = false;
for (let i = 0; i < 24; i += 1) {
  const line = render('{fair.day.weighIn.open}', buildTextContext({
    subject: mj,
    week,
    seed: 8800 + i,
    globals: { featureId: 'state_fair_queen', fairStageIdx: 2, fairInfluence: 'Brittany' },
  }))?.trim() || '';
  assert.ok(line.length > 30, 'fair day open at week 22 should render');
  assert.ok(!line.includes('{unresolved}'), 'fair day open unresolved');
  if (/cotton candy|Crowd noise|funnel-cake|Mary Jane stands taller|Pride sits on her hips|platform scale|weighInBeat|Officials murmur|weigh-in line/i.test(line)) {
    fairModularHit = true;
  }
}
assert.ok(fairModularHit, 'fair day open should sometimes compose modular slots at week 22');

const actKey = Object.keys(HOMEROOM_GROUP_ACTIVITIES)[0];
let homeroomModularHit = false;
for (let i = 0; i < 24; i += 1) {
  const line = render(`{homeroom.activity.${actKey}.p0}`, buildTextContext({
    subject: mj,
    week,
    seed: 8802 + i,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(line.length > 30, `homeroom activity ${actKey} p0 late render`);
  assert.ok(!line.includes('{unresolved}'), 'homeroom activity unresolved');
  if (/Oven heat|flour|Calloway|wide tables/i.test(line)) homeroomModularHit = true;
}
assert.ok(homeroomModularHit, 'homeroom activity p0 should sometimes compose modular slots at week 22');

let cgModularHit = false;
for (let i = 0; i < 24; i += 1) {
  const post = renderCGPriyaPost(priya, week, 'Heavy', 'Invested', { seed: 8803 + i });
  assert.ok(post.length > 20, 'CG Priya post late render');
  assert.ok(!post.includes('{unresolved}'), 'CG priya post unresolved');
  if (/corkboard|weekly numbers|Replies stack/i.test(post)) cgModularHit = true;
}
assert.ok(cgModularHit, 'CG priya post should sometimes compose modular chat slots at week 22');

const fairSamples = new Set();
for (let i = 0; i < 6; i += 1) {
  fairSamples.add(render('{fair.day.judging}', buildTextContext({
    subject: mj,
    week: 20,
    seed: 8900 + i,
    globals: { featureId: 'state_fair_queen', fairStageIdx: 1, fairInfluence: 'None' },
  }))?.trim() || '');
}
assert.ok(fairSamples.size >= 2, 'fair judging should vary at week 20+');

const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 240 };
let journalModularHit = false;
for (let i = 0; i < 24; i += 1) {
  const line = render('{journal.feeder.gamer.s0}', buildTextContext({
    subject: destiny,
    week: 20,
    seed: 9000 + i,
  }))?.trim() || '';
  assert.ok(line.length > 30, 'feeder journal s0 late render');
  assert.ok(!line.includes('{unresolved}'), 'feeder journal unresolved');
  if (/Clipboard|Observation beats|datapoint|fieldNotes/i.test(line)
    || /appetite curves|log what the body/i.test(line)) {
    journalModularHit = true;
  }
}
assert.ok(journalModularHit, 'feeder journal s0 should sometimes compose modular slots at week 20');

let sessionModularHit = false;
for (let i = 0; i < 24; i += 1) {
  const line = render('{session.rae.arrival.s1}', buildTextContext({
    subject: destiny,
    week: 21,
    seed: 9100 + i,
    globals: { featureId: 'ranked_session', sessionStage: 1 },
  }))?.trim() || '';
  assert.ok(line.length > 30, 'session Rae arrival late render');
  assert.ok(!line.includes('{unresolved}'), 'session arrival unresolved');
  if (/cart squeaks|Rae arrives|Clipboard, timer/i.test(line)) sessionModularHit = true;
}
assert.ok(sessionModularHit, 'session Rae arrival should sometimes compose modular slots at week 21');

console.log('test-text-modular-late-game: ok (fair, homeroom, CG, journal, session @ week 20+)');
