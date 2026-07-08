#!/usr/bin/env node
import {
  seedStarterEdges, tickRelationshipWeb, rivalWithId, pactWithId, plannerSynergyHint,
} from '../src/gameData/relationshipWeb.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { renderEdgeIntro } from '../src/textEngine/scenes/relationshipWeb/index.js';

let failures = 0;
function assert(cond, msg) {
  if (!cond) { failures += 1; console.error(`FAIL: ${msg}`); }
}

const seeded = seedStarterEdges(INIT_STUDENTS.map((s) => ({ ...s, edges: [] })));
assert(seeded.filter((s) => (s.edges || []).length > 0).length >= 15, 'starter edges seeded');

const brittany = seeded.find((s) => s.id === 0);
assert(rivalWithId(brittany) === 3, 'brittany rival serena');

const tick = tickRelationshipWeb(seeded, 2, {
  weeklyFeedCounts: { 2: 1, 6: 1 },
  stageUps: [{ id: 0, stageId: 3 }],
});
assert(tick.jointPairs.length >= 1, 'joint pair on co-feed');

const intro = renderEdgeIntro(brittany, seeded.find((s) => s.id === 3), 1, { edgeType: 'rival' });
assert(intro && intro.length > 10, 'edge intro renders');

const hint = plannerSynergyHint(brittany, seeded);
assert(hint && hint.includes('Serena'), 'planner synergy hint');

console.log(`relationship-web:probe — ${failures} failures`);
process.exit(failures > 0 ? 1 : 0);
