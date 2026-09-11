#!/usr/bin/env node
/** Dinner, floor campus scenes, hunt feast, eating contest — modular @ week 24. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 265 };
const lilith = { id: 6, name: 'Lilith', archetype: 'predator', lbs: 320 };

const cases = [
  {
    label: 'dinner.dish.pr_pasta',
    key: '{dinner.dish.pr_pasta}',
    subject: destiny,
    fp: /dinner\.dish\.savor|Candlelight|Late-semester dinners|venueMood/i,
    globals: { featureId: 'private_dinner' },
  },
  {
    label: 'campusEvent.scene.mood_stressed',
    key: '{campusEvent.scene.mood_stressed}',
    subject: destiny,
    fp: /hallTone|choiceEcho|Hall Ambiance|hunger hums/i,
    globals: { featureId: 'floor_event' },
  },
  {
    label: 'hunt.feast.s4',
    key: '{hunt.feast.s4}',
    subject: lilith,
    fp: /hungerCall|yieldBeat|Late-semester rituals|hall log/i,
    globals: { featureId: 'hunt_feast' },
  },
  {
    label: 'contest.payoff.legacy.s0',
    key: '{contest.payoff.legacy.s0}',
    subject: destiny,
    fp: /crowdHeat|tableStakes|Late-semester contests|growth as lifestyle/i,
    globals: { featureId: 'eating_contest' },
  },
  {
    label: 'sumo.payoff.legacy.s1',
    key: '{sumo.payoff.legacy.s1}',
    subject: destiny,
    fp: /dohyo|boutHeat|Late-semester bouts|Tachi-ai/i,
    globals: { featureId: 'sumo_match' },
  },
  {
    label: 'recording.opening.s0',
    key: '{recording.opening.s0}',
    subject: destiny,
    fp: /ringLight|takeYield|Late-semester streams|ring light/i,
    globals: { featureId: 'recording_session' },
  },
  {
    label: 'weekly.uniform_split',
    key: '{weekly.uniform_split}',
    subject: { id: 0, name: 'Brittany', archetype: 'cheerleader', lbs: 240 },
    fp: /floorEcho|uniformSplit|Hall Ambiance|audible pop/i,
    globals: { featureId: 'weekly_event', eventId: 'uniform_split', endStage: 7 },
  },
];

for (const c of cases) {
  let hit = false;
  for (let s = 0; s < 12; s += 1) {
    const line = render(c.key, buildTextContext({
      subject: c.subject,
      week,
      seed: 61000 + s + c.label.length,
      globals: c.globals,
    }))?.trim() || '';
    assert.ok(line.length > 45, `short ${c.label}`);
    assert.ok(!line.includes('{unresolved}'), `unresolved ${c.label}`);
    if (c.fp.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular ${c.label} @ week ${week}`);
}

console.log('test-social-scenes-modular-late: ok');
