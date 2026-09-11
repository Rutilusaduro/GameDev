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
  'session/blobIntroPools.js',
  'session/immobileRedirectPools.js',
  'session/index.js',
  'evolved/index.js',
  'homeroom/index.js',
  'unlockScene/index.js',
  'rankedSession/legacyPools.js',
  'homeroom/batchBakerPools.js',
  'competitiveGainer/cgChatPools.js',
  'competitiveGainer/cgScenePools.js',
  'competitiveGainer/raReplyPools.js',
  'cultivator/index.js',
  'hallBlueprint/index.js',
  'researchJournal/index.js',
  'evolved/eventPools.js',
  'wifeLessons/index.js',
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
