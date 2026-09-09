#!/usr/bin/env node
/** Pass 23 — RA-frame FEEDER_SUBJECT_JOURNALS: RA feeds, not Nadia sociology study. */
import { readFileSync, writeFileSync } from 'fs';

const FILE = 'src/gameData/evolvedForms.js';
const MARKER = 'export const FEEDER_SUBJECT_JOURNALS = {';
const END_MARKER = '\n};\n\n// ── NADIA\'S SUBJECT NOTES ──';

const REPLACEMENTS = [
  [/RA \[Name\] and Nadia said it was for her big season plan on feederism, and the extra credit plus helping a classmate/g,
    'RA [Name] pitched our hall wellness season — floor favor plus helping a resident'],
  [/RA \[Name\] and Nadia said it was for her big season plan on feederism/g,
    'RA [Name] pitched our hall wellness season'],
  [/You and Nadia said it would be good for her feederism season plan/g,
    'RA [Name] said it could work for our hall meal season'],
  [/You and Nadia said it would be great for her feederism season plan/g,
    'RA [Name] said it could work for our hall meal season'],
  [/RA and Nadia convinced me to be the subject for her feederism study/g,
    'RA [Name] convinced me to commit to the hall meal season'],
  [/You and Nadia framed it as a living art piece — a study on feederism psychology/g,
    'RA [Name] framed it as a living art piece — appetite and body as canvas'],
  [/You and Nadia said it would be good experience/g,
    'RA [Name] said it would be good experience'],
  [/You and Nadia told me it would be perfect for her feederism research/g,
    'RA [Name] told me it could count toward our hall meal season'],
  [/Nadia needed a live subject for her feederism season plan/g,
    'RA [Name] needed someone willing for the hall meal season'],
  [/Nadia encourages/g, 'RA [Name] encourages'],
  [/Nadia encouraged/g, 'RA [Name] encouraged'],
  [/Nadia is obsessed/g, 'RA [Name] is obsessed'],
  [/Nadia is so/g, 'RA [Name] is so'],
  [/Nadia gets/g, 'RA [Name] gets'],
  [/Nadia keeps/g, 'RA [Name] keeps'],
  [/Nadia grows visibly/g, 'RA [Name] grows visibly'],
  [/Nadia grows/g, 'RA [Name] grows'],
  [/Nadia regards/g, 'RA [Name] regards'],
  [/Nadia looked/g, 'RA [Name] looked'],
  [/Nadia seemed/g, 'RA [Name] seemed'],
  [/Nadia was/g, 'RA [Name] was'],
  [/Nadia gets intensely/g, 'RA [Name] gets intensely'],
  [/Nadia looks at/g, 'RA [Name] looks at'],
  [/feederism season plan/g, 'hall meal season'],
  [/feederism study/g, 'hall meal season'],
  [/feederism research/g, 'hall wellness season'],
  [/feederism psychology/g, 'appetite psychology'],
  [/feederism dynamic/g, 'feeding dynamic'],
  [/classmate/g, 'resident'],
  [/extra credit/g, 'floor favor'],
  [/for the grade/g, 'for the floor favor'],
  [/doing this for the study/g, 'doing this for the season plan'],
  [/for the study/g, 'for the season plan'],
  [/the study is done/g, 'the season plan is done'],
  [/until the study ends/g, 'until the season plan ends'],
  [/until the study is done/g, 'until the season plan is done'],
  [/just for the study/g, 'just for the season plan'],
  [/I'm doing this for the research/g, "I'm doing this for the season plan"],
  [/for the research/g, 'for the season plan'],
  [/it looks in class/g, 'it looks on the floor'],
  [/walk to class/g, 'walk the hall'],
  [/psych student keeps/g, 'RA keeps'],
  [/letting a classmate stuff/g, 'letting my RA stuff'],
  [/her own massive body/g, 'her curves'],
  [/her enormous body/g, 'her warmth'],
  [/her colossal body/g, 'her body'],
  [/her very fat body/g, 'her body'],
  [/her massive frame/g, 'her presence'],
  [/her massive body/g, 'her curves'],
  [/her own enormous form/g, 'her presence'],
];

let src = readFileSync(FILE, 'utf8');
const start = src.indexOf(MARKER);
const end = src.indexOf(END_MARKER);
if (start < 0 || end < 0) {
  console.error('FEEDER_SUBJECT_JOURNALS block not found');
  process.exit(1);
}

let block = src.slice(start, end);
const before = block;
for (const [re, rep] of REPLACEMENTS) {
  block = block.replace(re, rep);
}

if (block === before) {
  console.log('no feeder journal changes needed');
} else {
  src = src.slice(0, start) + block + src.slice(end);
  writeFileSync(FILE, src);
  const nadiaLeft = (block.match(/Nadia/g) || []).length;
  console.log(`feeder journals migrated; Nadia refs remaining in block: ${nadiaLeft}`);
}
