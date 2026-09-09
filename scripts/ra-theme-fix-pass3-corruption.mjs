#!/usr/bin/env node
/** Undo pass3 thesis→season plan corruption inside identifiers (synthesis, hypothesis, thesis_*). */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');
const EXT = new Set(['.js', '.jsx']);

const REPLACEMENTS = [
  // Compound corruptions first (order matters)
  [/hyposeason plan/g, 'hypothesis'],
  [/synseason plan/g, 'synthesis'],
  [/Synseason plan/g, 'Synthesis'],
  // Identifier / key patterns (keep prose "season plan" intact)
  [/season planRewrite/g, 'thesisRewrite'],
  [/season planComplete/g, 'thesisComplete'],
  [/season planApproved/g, 'thesisApproved'],
  [/season planRejected/g, 'thesisRejected'],
  [/season plan_board/g, 'thesis_board'],
  [/season plan_success/g, 'thesis_success'],
  [/season plan_approved/g, 'thesis_approved'],
  [/season plan_rejected/g, 'thesis_rejected'],
  [/season plan_rewrite/g, 'thesis_rewrite'],
  [/nadia_season plan_/g, 'nadia_thesis_'],
  [/psych_season plan_/g, 'psych_thesis_'],
  [/weekly\.season plan/g, 'weekly.thesis'],
  [/opposition\.endgame\.season plan/g, 'opposition.endgame.synthesis'],
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

let n = 0;
for (const file of walk(ROOT)) {
  let text = readFileSync(file, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
  if (next !== text) {
    writeFileSync(file, next);
    n++;
  }
}
console.log(`fix-pass3-corruption: ${n} files repaired`);
