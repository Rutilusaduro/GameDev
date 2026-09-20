#!/usr/bin/env node
/** All modular weekly incident pools should compose floor-echo prose @ week 24. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { renderWeeklyEvent, POOL_BY_EVENT_ID } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);

const FP = /floorEcho|Hall Ambiance|Late-semester floor|Wellness framing stays thin|growth as lifestyle/i;

const subject = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 380, startLbs: 180 };

const eventIds = Object.keys(POOL_BY_EVENT_ID);
assert.ok(eventIds.length >= 14, `expected >=14 weekly events, got ${eventIds.length}`);

for (const eventId of eventIds) {
  let hit = false;
  for (let s = 0; s < 10; s += 1) {
    const line = renderWeeklyEvent(eventId, subject, { week, seed: 62000 + s + eventId.length })?.trim() || '';
    assert.ok(line.length > 60, `short weekly ${eventId}: "${line.slice(0, 80)}"`);
    assert.ok(!line.includes('{unresolved}'), `unresolved weekly ${eventId}`);
    if (FP.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular weekly.floorEcho overlay @ w${week} for ${eventId}`);
}

console.log(`test-weekly-events-modular-late: ok (${eventIds.length} events)`);
