#!/usr/bin/env node
/** Gate: modular text bridge files + prose pass depth + lint entrypoint. */
import { existsSync, readdirSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');
const scenes = join(root, 'src/textEngine/scenes');

const required = [
  'evolved/reactionPools.js',
  'evolved/outfitPools.js',
  'evolved/activityPools.js',
  'evolved/evolutionOfferPools.js',
  'evolved/evolutionBlurbPools.js',
  'session/tapOutPools.js',
  'session/tapOutFragments.js',
  'unlockScene/unlockFragments.js',
  'session/blobIntroPools.js',
  'session/immobileRedirectPools.js',
  'session/index.js',
  'evolved/index.js',
  'homeroom/index.js',
  'unlockScene/index.js',
  'rankedSession/legacyPools.js',
  'rankedSession/sessionFragments.js',
  'rankedSession/sessionPayoffFragments.js',
  'legacyPoolPolicy.js',
  'campusEvent/campusEventFragments.js',
  'campusExplorationModularFragments.js',
  'itemUse/itemUseModularFragments.js',
  'dinner/dinnerDishFragments.js',
  'hunt/huntFeastFragments.js',
  'eatingContest/eatingContestFragments.js',
  'sumoMatch/sumoMatchFragments.js',
  'recordingSession/recordingSessionFragments.js',
  'researchJournal/journalFragments.js',
  'homeroom/batchBakerPools.js',
  'homeroom/conferenceFragments.js',
  'homeroom/activityFragments.js',
  'homeroom/homeroomV2ModularFragments.js',
  'fairQueen/dayModularFragments.js',
  'competitiveGainer/cgChatPools.js',
  'competitiveGainer/cgChatFragments.js',
  'competitiveGainer/cgSceneFragments.js',
  'competitiveGainer/cgRaReplyFragments.js',
  'competitiveGainer/cgMeasurementModularFragments.js',
  'session/fullnessFragments.js',
  'session/aftermathFragments.js',
  'cultivator/cultivatorFragments.js',
  'competitiveGainer/cgScenePools.js',
  'competitiveGainer/raReplyPools.js',
  'cultivator/index.js',
  'cultivator/vignettes.js',
  'hallBlueprint/index.js',
  'hallBlueprint/blueprintModularFragments.js',
  'hallBlueprint/hallAmbianceModularFragments.js',
  'session/blobIntroFragments.js',
  'session/immobileRedirectFragments.js',
  'homeroom/batchBakerFragments.js',
  'researchJournal/index.js',
  'evolved/eventPools.js',
  'evolved/eventPhaseFragments.js',
  'evolved/reactionFragments.js',
  'evolved/activityModularFragments.js',
  'evolved/evolutionOfferFragments.js',
  'evolved/outfitFragments.js',
  'evolved/evolutionBlurbFragments.js',
  'wifeLessons/index.js',
  'wifeLessons/lessonFragments.js',
  'wifeLessons/talkFragments.js',
  'fairQueen/index.js',
];

const missing = required.filter((rel) => !existsSync(join(scenes, rel)));
if (missing.length) {
  console.error('test-text-bridges: missing bridge files:', missing.join(', '));
  process.exit(1);
}

const passes = readdirSync(scenes).filter((f) => /^raPivotProseDepthPass\d+\.js$/.test(f));
const passNums = passes.map((f) => Number(f.match(/Pass(\d+)/)[1]));
const maxPass = Math.max(...passNums, 0);
if (maxPass < 120) {
  console.error(`test-text-bridges: expected prose pass >= 120, max=${maxPass}`);
  process.exit(1);
}

console.log(`test-text-bridges: ok (${required.length} bridges, prose passes 1–${maxPass}, n=${passNums.length})`);
