#!/usr/bin/env node
/** Pass 25 — RA-frame Nadia subject journals (hall log, not academic feederism study). */
import { readFileSync, writeFileSync } from 'fs';

const FILE = 'src/gameData/nadiaSubjectJournals.js';

const REPLACEMENTS = [
  [/independent study on the psychology of feederism/gi, 'private hall log on appetite dynamics'],
  [/independent practice on the psychology of feederism/gi, 'private hall log on appetite dynamics'],
  [/official research study on the psychology of feederism/gi, 'official hall observation log on appetite dynamics'],
  [/official training practice on the psychology of feederism/gi, 'official hall observation log on appetite dynamics'],
  [/psychology of feederism/gi, 'appetite dynamics on the floor'],
  [/understand feederism/gi, 'understand appetite'],
  [/everything about feederism/gi, 'everything about appetite'],
  [/feederism deeply/gi, 'appetite deeply'],
  [/feederism on the deepest level/gi, 'appetite on the deepest level'],
  [/feederism completely/gi, 'appetite completely'],
  [/This study is mostly a front/gi, 'This log is mostly a front'],
  [/This study is the perfect/gi, 'This log is the perfect'],
  [/This study gives me/gi, 'This log gives me'],
  [/This practice is mostly a front/gi, 'This log is mostly a front'],
  [/This practice is the perfect/gi, 'This log is the perfect'],
  [/research study on/gi, 'observation log on'],
  [/research on feederism/gi, 'hall log on appetite'],
  [/how feederism affects/gi, 'how appetite affects'],
  [/about feederism/gi, 'about appetite'],
  [/feederism —/gi, 'appetite —'],
  [/feederism\./gi, 'appetite.'],
  [/in the library/gi, 'in the common room'],
  [/thick novels/gi, 'thick textbooks'],
];

let src = readFileSync(FILE, 'utf8');
const before = src;
for (const [re, rep] of REPLACEMENTS) {
  src = src.replace(re, rep);
}
if (src === before) {
  console.log('no nadia journal changes needed');
} else {
  writeFileSync(FILE, src);
  const left = (src.match(/feederism/gi) || []).length;
  console.log(`nadia journals migrated; feederism refs remaining: ${left}`);
}
