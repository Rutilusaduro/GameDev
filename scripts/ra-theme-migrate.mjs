#!/usr/bin/env node
/**
 * Conservative RA theme pass on prose-heavy textEngine scenes.
 * Does NOT touch archetype keys or game logic identifiers.
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src', 'textEngine');
const EXT = new Set(['.js']);

const REPLACEMENTS = [
  [/The Professor/g, 'You'],
  [/the professor/g, 'you'],
  [/Professor's Quarters/g, 'RA Desk'],
  [/PROFESSOR'S QUARTERS/g, 'RA DESK'],
  [/your class/g, 'your hall'],
  [/the class/g, 'the hall'],
  [/in class/g, 'on the floor'],
  [/Class session/g, 'Floor check-in'],
  [/CLASS SESSION/g, 'FLOOR CHECK-IN'],
  [/Spirit favor/g, 'Hall cred'],
  [/spirit favor/g, 'hall cred'],
  [/faculty lounge/g, 'RA office'],
  [/office hours/g, 'desk hours'],
  [/lecture/g, 'floor meeting'],
  [/semester's class/g, "semester's hall"],
];

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (EXT.has(extname(name))) files.push(p);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let text = readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
  if (next !== text) {
    writeFileSync(file, next);
    changed++;
  }
}
console.log(`textEngine: ${changed} files updated.`);
