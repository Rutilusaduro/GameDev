#!/usr/bin/env node
/** Pass 128 — dev-comment sweep: per-girl → per-resident in headers/docs. */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');
const EXT = /\.(js|jsx)$/;

const REPLACEMENTS = [
  [/Per-girl\b/g, 'Per-resident'],
  [/per-girl\b/g, 'per-resident'],
  [/cross-girl\b/g, 'cross-resident'],
  [/pool girls\b/g, 'pool residents'],
  [/for each girl\b/g, 'for each resident'],
  [/THIS girl\b/g, 'THIS resident'],
  [/one locked pool girl\b/g, 'one locked pool resident'],
  [/one girl\b/g, 'one resident'],
  [/immobile girl\b/g, 'immobile resident'],
  [/Fed girl\b/g, 'Fed resident'],
  [/two girls\b/g, 'two residents'],
  [/A content girl\b/g, 'A content resident'],
  [/small girl's\b/g, "small resident's"],
  [/girls attending\b/g, 'residents attending'],
  [/hooked a girl\b/g, 'hooked a resident'],
  [/Hooked girls\b/g, 'Hooked residents'],
  [/stuffed girls\b/g, 'stuffed residents'],
  [/hungry girl\b/g, 'hungry resident'],
  [/how hooked a girl\b/g, 'how hooked a resident'],
  [/a girl is\b/g, 'a resident is'],
  [/a girl's\b/g, "a resident's"],
  [/one girl's\b/g, "one resident's"],
  [/the girl's\b/g, "the resident's"],
  [/Lighter girls\b/g, 'Lighter residents'],
  [/glaring girl\b/g, 'glaring resident'],
  [/girls who actually\b/g, 'residents who actually'],
  [/cover every girl\b/g, 'cover every resident'],
];

function walk(dir) {
  const out = [];
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) out.push(...walk(p));
    else if (EXT.test(ent.name)) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  if (file.includes('DialogueLab.jsx')) continue;
  const before = readFileSync(file, 'utf8');
  let src = before;
  for (const [re, rep] of REPLACEMENTS) {
    src = src.replace(re, rep);
  }
  if (src !== before) {
    writeFileSync(file, src);
    changed += 1;
  }
}
console.log(`per-girl comment sweep: ${changed} files updated`);
