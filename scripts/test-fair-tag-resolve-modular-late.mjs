#!/usr/bin/env node
/** Week 24 — bracket tags in fairQueenData should resolve to modular prose, not leak raw tags. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { resolveFairPlaceholder } from '../src/textEngine/scenes/fairQueen/index.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const FP = /Cotton candy|platform scale|Midway grease|Pageant lights|Training tent|canvas lights|co-conspirator|Hay-scent|Judges lean|Afterparty steam/i;

const TAGS = [
  '[FT_Brittany_MJ2_C3]',
  '[FT_Lil_MJ3_L2_Mid]',
  '[FBS_Serena_Mid]',
  '[FTP_Kylie_MJ1_C2]',
  '[FD_WI_2_Britt_Open]',
  '[FD_WI_2_Britt_C1]',
  '[FD_JU_2_Sere]',
  '[FD_AP_1_Kyli_Open]',
];

for (const tag of TAGS) {
  let hit = false;
  for (let s = 0; s < 8; s += 1) {
    const line = resolveFairPlaceholder(tag, mj, week, {
      featureId: 'state_fair_queen',
      fairCollab: 'Brittany',
      seed: 59000 + s + tag.length,
    })?.trim() || '';
    assert.ok(line.length > 45, `short resolve ${tag}: "${line.slice(0, 60)}"`);
    assert.ok(!line.includes('['), `raw tag leaked ${tag}`);
    assert.ok(!/^\[FT_|^\[FD_|^\[FBS_|^\[FTP_/i.test(line), `placeholder prefix leaked ${tag}`);
    if (FP.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular fair tag resolve @ w${week} for ${tag}`);
}

console.log('test-fair-tag-resolve-modular-late: ok');
