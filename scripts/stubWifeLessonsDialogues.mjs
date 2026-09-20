#!/usr/bin/env node
/** MIGRATION step 6 — WL_DIALOGUES prose → bridge stubs; talkFragments own week 20+ voice. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { WL_DIALOGUES } from '../src/gameData/wifeLessonsData.js';

const DATA = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/wifeLessonsData.js');

const PRESERVE = {
  'Darlene:0:greeting': `"Good evening, RA. The rolls were heavier than I expected, but my daughters seemed to enjoy them."`,
};

function stubLine(person, stageIdx, slot, label = '') {
  const pk = `${person}:${stageIdx}:${slot}`;
  if (PRESERVE[pk]) return PRESERVE[pk];
  const stage = stageIdx + 1;
  const hint = label ? ` re: ${label.replace(/"/g, '')}` : '';
  return `"${person} (stage ${stage})${hint} — Mary Jane's kitchen; modular talk carries the real voice late semester."`;
}

function processEntry(person, stageIdx, entry) {
  const out = { ...entry };
  if (out.greeting) out.greeting = stubLine(person, stageIdx, 'greeting');
  if (out.cappedGreeting) out.cappedGreeting = stubLine(person, stageIdx, 'capped');
  if (out.overtookGreeting) out.overtookGreeting = stubLine(person, stageIdx, 'overtook');
  if (Array.isArray(out.options)) {
    out.options = out.options.map((opt) => ({
      ...opt,
      text: stubLine(person, stageIdx, 'opt', opt.label),
      subs: (opt.subs || []).map((sub) => ({
        ...sub,
        text: stubLine(person, stageIdx, 'sub', sub.label),
      })),
    }));
  }
  return out;
}

const stubbed = {};
for (const [person, stages] of Object.entries(WL_DIALOGUES)) {
  stubbed[person] = stages.map((entry, stageIdx) => processEntry(person, stageIdx, entry));
}

let raw = fs.readFileSync(DATA, 'utf8');
const start = raw.indexOf('export const WL_DIALOGUES =');
const end = raw.lastIndexOf('\n};');
if (start < 0 || end < start) throw new Error('WL_DIALOGUES block not found');

let header = raw.slice(0, start);
const tail = raw.slice(end + 3);
if (!raw.includes('WL dialogue stub migration')) {
  header = header.replace(
    '// @migrate wifeLessons.talk.{person}.s{stage}',
    '// WL dialogue stub migration (step 6 pilot) — bridge lines; talkFragments @ week 20+.\n// @migrate wifeLessons.talk.{person}.s{stage}',
  );
}

const body = `export const WL_DIALOGUES = ${JSON.stringify(stubbed)};\n`;
fs.writeFileSync(DATA, header + body + tail);
console.log(`stubWifeLessonsDialogues: stubbed ${Object.keys(stubbed).length} personas`);
