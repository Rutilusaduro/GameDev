#!/usr/bin/env node
/** Pass 9 — evolvedForms + misc player-visible RA framing */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const TARGETS = new Set([
  'src/gameData/evolvedForms.js',
  'src/gameData/oppositionCampus.js',
  'src/gameData/chloeSalon.js',
  'src/gameData/faculty.js',
  'src/gameData/campus.js',
  'src/gameData/competitiveGainerText.js',
  'src/gameData/students.js',
  'src/gameData/oppositionIntegration.js',
  'src/gameData/opposition.js',
  'src/textEngine/scenes/diary.js',
  'src/textEngine/scenes/diaryPhaseD.js',
  'src/textEngine/scenes/v2/echo/echoSceneDepth.js',
  'src/textEngine/scenes/opposition/oppositionHearingSceneDepth.js',
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.js', '.jsx'].includes(extname(p))) out.push(p);
  }
  return out;
}

const REPLACEMENTS = [
  ['faculty lends prestige', 'staff lends prestige'],
  ['Faculty lends prestige', 'Staff lends prestige'],
  ['half this faculty acts', 'half this staff acts'],
  ['Welcome Mori — faculty lends prestige', 'Welcome Mori — staff lends prestige'],
  ['your syllabus to wellness', 'your floor notes to wellness'],
  ['appetite still on the syllabus', 'appetite still on the meal plan'],
  ["wasn't on the syllabus", "wasn't on the move-in checklist"],
  ['Domestic syllabus includes', 'Domestic rotation includes'],
  ['faculty affinity 60+', 'staff affinity 60+'],
  ['faculty testimony', 'staff testimony'],
  ['faculty dinner', 'staff dinner'],
  ['enormous in the lecture hall seat', 'enormous in the common room seat'],
  ['in the lecture hall —', 'in the common room —'],
  ['between lectures', 'between study blocks'],
  ['during lectures', 'during study blocks'],
  ['Someone from class ', 'Someone from the floor '],
  ['Someone in class ', 'Someone on the floor '],
  ['for a class project', 'for a hall survey'],
  ['Authorize a class test subject', 'Authorize a floor volunteer'],
  ['line from the story in passing', 'line from the group chat in passing'],
  ['first day of class', 'move-in day'],
  ['single class you can confirm', 'single floor meeting you can confirm'],
  ['between classes', 'between classes'], // no-op anchor
  ['picking at a snack between classes', 'picking at a snack between classes'],
];

const FILES = walk('src').filter((f) => TARGETS.has(f));

let touched = 0;
for (const file of FILES) {
  let src = readFileSync(file, 'utf8');
  let next = src;
  for (const [from, to] of REPLACEMENTS) {
    if (from === to) continue;
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== src) {
    writeFileSync(file, next);
    touched++;
    console.log('updated:', file);
  }
}
console.log(`pass9: ${touched} files updated`);
