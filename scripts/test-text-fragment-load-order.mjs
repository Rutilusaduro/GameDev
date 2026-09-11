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
  ['rankedSession/index.js', 'rankedSession/sessionPayoffFragments.js'],
  ['campusEvent/index.js', 'campusEvent/campusEventFragments.js'],
  ['dinner/index.js', 'dinner/dinnerDishFragments.js'],
  ['hunt/index.js', 'hunt/huntFeastFragments.js'],
  ['eatingContest/index.js', 'eatingContest/eatingContestFragments.js'],
  ['sumoMatch/index.js', 'sumoMatch/sumoMatchFragments.js'],
  ['recordingSession/index.js', 'recordingSession/recordingSessionFragments.js'],
  ['wifeLessons/index.js', 'wifeLessons/lessonFragments.js'],
  ['wifeLessons/index.js', 'wifeLessons/talkFragments.js'],
  ['evolved/index.js', 'evolved/eventPhaseFragments.js'],
  ['evolved/index.js', 'evolved/reactionFragments.js'],
  ['evolved/index.js', 'evolved/activityModularFragments.js'],
  ['evolved/index.js', 'evolved/evolutionOfferFragments.js'],
  ['evolved/index.js', 'evolved/outfitFragments.js'],
  ['evolved/index.js', 'evolved/evolutionBlurbFragments.js'],
  ['competitiveGainer/index.js', 'competitiveGainer/cgChatFragments.js'],
  ['competitiveGainer/index.js', 'competitiveGainer/cgSceneFragments.js'],
  ['competitiveGainer/index.js', 'competitiveGainer/cgRaReplyFragments.js'],
  ['competitiveGainer/cgSceneFragments.js', 'competitiveGainer/cgMeasurementModularFragments.js'],
  ['session/index.js', 'session/fullnessFragments.js'],
  ['session/index.js', 'session/aftermathFragments.js'],
  ['cultivator/index.js', 'cultivator/cultivatorFragments.js'],
  ['session/index.js', 'session/tapOutFragments.js'],
  ['unlockScene/index.js', 'unlockScene/unlockFragments.js'],
  ['hallBlueprint/index.js', 'hallBlueprint/blueprintModularFragments.js'],
  ['hallBlueprint/index.js', 'hallBlueprint/hallAmbianceModularFragments.js'],
  ['session/index.js', 'session/blobIntroFragments.js'],
  ['session/index.js', 'session/immobileRedirectFragments.js'],
  ['homeroom/index.js', 'homeroom/batchBakerFragments.js'],
  ['weeklyEvent/index.js', 'weeklyEvent/weeklyEventLateModularFragments.js'],
  ['campusEvent/depth.js', 'campusEvent/campusEventLateModularFragments.js'],
  ['campusEvent/campusEventFragments.js', 'campusExplorationModularFragments.js'],
  ['growthEvent/depth.js', 'growthEvent/growthEventLateModularFragments.js'],
  ['deviceUse/index.js', 'deviceUse/deviceLateModularFragments.js'],
  ['deviceCampusUse/index.js', 'deviceUse/deviceLateModularFragments.js'],
  ['talkEncourage.js', 'talkEncourageModularFragments.js'],
  ['talkCommandFinishDepth.js', 'talkCommandFinishModularFragments.js'],
  ['raPivotProseDepthPass112.js', 'streamEndStreamModularFragments.js'],
  ['raPivotProseDepthPass112.js', 'raPivotPassPeelFragments.js'],
  ['opposition/depth.js', 'opposition/oppositionLateModularFragments.js'],
  ['opposition/oppositionLateModularFragments.js', 'opposition/oppositionAgendaModularFragments.js'],
  ['talkRefusalDepth.js', 'talkRefusalCommandFinishModularFragments.js'],
  ['talkRefusalCommandFinishModularFragments.js', 'talkRefusalCommandDevourModularFragments.js'],
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
