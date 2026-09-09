#!/usr/bin/env node
/** Pass 4 — hall lounge / floor / RA dialogue (avoid code identifiers) */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');
const EXT = new Set(['.js', '.jsx']);

const PROSE_REPLACEMENTS = [
  // skills.js hall lounge framing
  [/The whole class/g, 'The whole floor'],
  [/the whole class/g, 'the whole floor'],
  [/All class feeding/g, 'All floor feeding'],
  [/All class feast/g, 'All floor feast'],
  [/All class actions/g, 'All floor actions'],
  [/class feast actions/g, 'floor feast actions'],
  [/class actions gain/g, 'floor actions gain'],
  [/class avg weight/g, 'floor avg weight'],
  [/Grand Banquet class event/g, 'Grand Banquet floor event'],
  [/Every class day/g, 'Every check-in day'],
  [/before class begins/g, 'before check-in'],
  [/between-class/g, 'between-check-in'],
  [/in the classroom/g, 'in the common-room kitchen'],
  [/from the classroom/g, 'from the kitchen'],
  [/how I look in the classroom/g, 'how I look leading the kitchen club'],
  [/The classroom/g, 'The hall lounge'],
  [/the classroom/g, 'the hall lounge'],
  [/Extended Office Hours/g, 'Extended Desk Hours'],
  [/📓 Lesson Planning/g, '📓 Shift Planning'],
  [/Better-structured lectures/g, 'Better-structured programming'],
  [/The administration/g, 'Res life'],
  [/the administration/g, 'res life'],
  [/The department/g, 'Housing'],
  [/the department/g, 'housing'],
  [/departmental budget/g, 'program budget'],
  [/administrative scrutiny/g, 'oversight scrutiny'],
  [/You understand how the class moves/g, 'You understand how the floor moves'],
  [/The class looks forward/g, 'The floor looks forward'],
  [/attend regular class/g, 'hang in the common room'],
  [/The class as a single unit/g, 'The floor as a single unit'],
  [/The class has become/g, 'The floor has become'],
  [/Not a class\. Not a project/g, 'Not a roster. Not a project'],
  [/outlast your tenure/g, 'outlast your contract'],
  [/Dinner as pedagogy/g, 'Dinner as hall programming'],
  [/outside your classroom door/g, 'outside your hall lounge door'],
  [/Offer the classroom as venue/g, 'Offer the hall lounge as venue'],
  [/Send your best dishes to my classroom/g, 'Send your best dishes to my hall lounge'],
  [/classroom as court/g, 'lounge as court'],
  [/classroom as venue/g, 'hall lounge as venue'],
  [/bigger classroom/g, 'bigger kitchen'],

  // RA dialogue — player addressed as professor
  [/Good evening, Professor\./g, 'Good evening.'],
  [/Hi, Professor\./g, 'Hi, RA.'],
  [/Hey, Professor\./g, 'Hey, RA.'],
  [/"Oh — hi, Professor\."/g, '"Oh — hi, RA."'],
  [/"Hi, Professor\."/g, '"Hi, RA."'],
  [/"Hey, Professor\."/g, '"Hey, RA."'],
  [/Yes, Professor\./g, 'Yes, RA.'],
  [/anything else, Professor\?/g, 'anything else?'],
  [/thank you for taking care of me, Professor/g, 'thank you for taking care of me'],
  [/That's how this works, Professor\./g, "That's how this works, RA."],
  [/still hungry, Professor\./g, 'still hungry, RA.'],
  [/Wellness is a dosage question, Professor\./g, 'Wellness is a dosage question, RA.'],
  [/Explain yourself, Professor\./g, 'Explain yourself, RA.'],
  [/Professor enables/g, 'RA enables'],
  [/professor tells me/g, 'RA tells me'],
  [/Title: Professor enables/g, 'Title: RA enables'],
  [/You don't have to encourage me anymore, Professor/g, "You don't have to encourage me anymore, RA"],
  [/content idea: professor tells/g, 'content idea: RA tells'],
  [/A professor assigned my content/g, 'A cultural studies seminar assigned my content'],
  [/Lessons feel less like class/g, 'Lessons feel less like obligation'],
];

const TARGET_FILES = [
  join(ROOT, 'gameData', 'skills.js'),
  join(ROOT, 'gameData', 'evolvedForms.js'),
  join(ROOT, 'gameData', 'classEvents.js'),
  join(ROOT, 'gameData', 'oppositionActs.js'),
  join(ROOT, 'gameData', 'faculty.js'),
  join(ROOT, 'textEngine', 'scenes'),
];

function walk(dir, files = []) {
  if (!statSync(dir).isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (EXT.has(extname(name))) files.push(p);
  }
  return files;
}

const fileSet = new Set();
for (const t of TARGET_FILES) {
  if (statSync(t).isDirectory()) walk(t).forEach((f) => fileSet.add(f));
  else fileSet.add(t);
}

let n = 0;
for (const file of fileSet) {
  let text = readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of PROSE_REPLACEMENTS) next = next.replace(from, to);
  if (next !== text) {
    writeFileSync(file, next);
    n++;
    console.log('  ', file.replace(ROOT + '/', ''));
  }
}
console.log(`pass4: ${n} files updated`);
