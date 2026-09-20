#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { renderDeviceUseLine } from '../src/textEngine/scenes/deviceUse/index.js';
import { renderDeviceCampusUseLine } from '../src/textEngine/scenes/deviceCampusUse/index.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 265, hungerTier: 2 };

const USE_FP = /labHum|peer-reviewed|Hall Ambiance muted|afterPulse|calibrated hunger/i;
let useHit = false;
for (let s = 0; s < 16; s += 1) {
  const line = renderDeviceUseLine({
    student: destiny,
    deviceId: 'auto_feeder_arm',
    deviceLabel: 'Precision Feeder Arm',
    actionId: 'burst_feed',
    week,
  })?.trim() || '';
  assert.ok(line.length > 55, 'short device.use line');
  assert.ok(!line.includes('{unresolved}'), 'unresolved device.use');
  if (USE_FP.test(line)) useHit = true;
}
assert.ok(useHit, `expected modular device.use.beat @ week ${week}`);

const CAMPUS_FP = /meshAir|mesh flickers|deployEcho|Hall Ambiance thins|hall log stays neutral/i;
let campusHit = false;
for (let s = 0; s < 16; s += 1) {
  const line = renderDeviceCampusUseLine({
    student: destiny,
    deviceId: 'feeding_mask',
    deviceLabel: 'Feeding Mask',
    targetType: 'student',
    week,
  })?.trim() || '';
  assert.ok(line.length > 55, 'short device.campus line');
  assert.ok(!line.includes('{unresolved}'), 'unresolved device.campus');
  if (CAMPUS_FP.test(line)) campusHit = true;
}
assert.ok(campusHit, `expected modular device.campus.beat @ week ${week}`);

console.log('test-device-modular-late: ok');
