#!/usr/bin/env node
/**
 * Pass 8 — RA framing: class/faculty/AIB display strings → hall/staff/RRB
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.js', '.jsx'].includes(extname(p))) out.push(p);
  }
  return out;
}

const FILES = walk('src');

const REPLACEMENTS = [
  ['Academic Inquiry Board', 'Residence Review Board'],
  ['Faculty whispers about your class', 'Staff whispers about your floor'],
  ['Faculty whispers about your hall', 'Staff whispers about your floor'],
  ['Faculty Drift', 'Staff Drift'],
  ['Faculty knows.', 'Staff knows.'],
  ['Faculty at the table', 'Staff at the table'],
  ['Faculty lends prestige', 'Staff lends prestige'],
  ['your classes cater', 'your floor caters'],
  ['walks out of your class', 'walks off your hall'],
  ['she walks out of your class', 'she walks off your hall'],
  ['leave the class roster', 'leave the roster'],
  ['leaves the class roster', 'leaves the roster'],
  ['The class is full of subjects', 'The floor is full of subjects'],
  ['nutrition plan."', 'meal plan."'],
  ['Your class feels', 'Your hall feels'],
  ['your class on the roster', 'your hall on the roster'],
  ['eyes on your class', 'eyes on your hall'],
  ['Your class drifts', 'Your floor drifts'],
  ['Your class feels', 'Your hall feels'],
  ['The class eats', 'The hall eats'],
  ['The class hums', 'The hall hums'],
  ['The class keeps', 'The hall keeps'],
  ['The class registered', 'The hall registered'],
  ['The class has updated', 'The hall has updated'],
  ['The class moves', 'The hall moves'],
  ['The class updates', 'The hall updates'],
  ['The class tracks', 'The hall tracks'],
  ['The class ecology', 'The hall ecology'],
  ['The class protected', 'The hall protected'],
  ['The class eats free', 'The hall eats free'],
  ['The class is hollow-bright', 'The hall is hollow-bright'],
  ['The class holds', 'The hall holds'],
  ['The class worships', 'The hall worships'],
  ['The class still hasn\'t', 'The hall still hasn\'t'],
  ['your class.', 'your hall.'],
  ['your class has', 'your hall has'],
  ['your class."', 'your hall."'],
];

let touched = 0;
for (const file of FILES) {
  let src = readFileSync(file, 'utf8');
  let next = src;
  for (const [from, to] of REPLACEMENTS) {
    if (next.includes(from)) next = next.split(from).join(to);
  }
  if (next !== src) {
    writeFileSync(file, next);
    touched++;
    console.log('updated:', file);
  }
}
console.log(`pass8: ${touched} files updated`);
