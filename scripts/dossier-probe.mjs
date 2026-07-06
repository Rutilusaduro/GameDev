#!/usr/bin/env node
/**
 * Smoke test: dossier assembly from synthetic student snapshots.
 */
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { appendDossierSnapshot, assembleDossier } from '../src/gameData/dossier.js';
import { appendMemory } from '../src/gameData/memory.js';

let failures = 0;
let checks = 0;

function assert(cond, msg) {
  checks += 1;
  if (!cond) {
    failures += 1;
    console.error(`FAIL: ${msg}`);
  }
}

const base = INIT_STUDENTS[0];
let student = { ...base, memories: [], triggeredEvents: [] };

student = appendDossierSnapshot(student, 1, {});
assert(student.dossierSnapshots?.length === 1, 'first snapshot appended');
assert(student.dossierSnapshots[0].week === 1, 'snapshot week');

student = {
  ...student,
  lbs: student.lbs + 8,
  memories: appendMemory(student.memories, 'stageUp', 2, 3),
};
student = appendDossierSnapshot(student, 2, {
  milestoneByStudent: {
    [student.id]: { prose: 'She crossed into chubby with a sigh.' },
  },
});
assert(student.dossierSnapshots.length === 2, 'second snapshot');
assert(student.pinnedMoments?.some((p) => p.kind === 'stageUp'), 'stageUp pin');

const dossier = assembleDossier(student, 2);
assert(dossier.header.name === student.name, 'header name');
assert(dossier.weightLine.snapshots.length >= 2, 'weight line data');
assert(dossier.nextThreshold != null, 'next threshold panel');
assert(typeof dossier.nextThreshold.lbsToNextRung === 'number', 'lbs to rung');

console.log(`dossier:probe — ${checks} checks, ${failures} failures`);
process.exit(failures > 0 ? 1 : 0);
