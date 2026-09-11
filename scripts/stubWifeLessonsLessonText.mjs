#!/usr/bin/env node
/** MIGRATION step 6 — WL_LESSONS monolith beats → bridge stubs; lessonFragments own voice @ week 20+. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WL_LESSONS } from '../src/gameData/wifeLessonsData.js';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/wifeLessonsData.js');

const ANCHORS = {
  daughters_bake: 'as the daughters led the lesson',
  handoff: 'their daughters proudly serving',
};

function stubText(lesson, stage) {
  const anchor = ANCHORS[lesson.id];
  const core = `${lesson.label} (stage ${stage}) — yeasty kitchen warmth; MJ teaches abundance while you witness from the doorway.`;
  return anchor ? `${core} ${anchor} them.` : core;
}

let content = fs.readFileSync(DATA, 'utf8');
if (!content.includes('WL lesson stub migration')) {
  content = content.replace(
    '// Legacy source: WL_LESSONS + WL_DIALOGUES below',
    '// WL lesson stub migration (step 6 pilot) — WL_LESSONS.text bridge stubs; engine fragments own voice.\n// Legacy source: WL_LESSONS + WL_DIALOGUES below',
  );
}

let replaced = 0;
for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    const text = stubText(lesson, stage).replace(/\\/g, '\\\\').replace(/`/g, '\\`');
    const re = new RegExp(`(id:"${lesson.id}"[^\\n]*?text:)\`[^\`]*\``);
    const next = content.replace(re, `$1\`${text}\``);
    if (next !== content) {
      replaced += 1;
      content = next;
    }
  }
}

fs.writeFileSync(DATA, content);
console.log(`stubWifeLessonsLessonText: replaced ${replaced} lesson.text stubs`);
