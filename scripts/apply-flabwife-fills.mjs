#!/usr/bin/env node
/**
 * Parse Flabwife placeholder fill upload and replace "[TAG]" strings in evolvedForms.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const UPLOAD = process.argv[2] || '/home/ubuntu/.cursor/projects/workspace/uploads/Flabwife_Placeholder_Fills_70de.txt';
const TARGET = path.join(ROOT, 'src/gameData/evolvedForms.js');

const raw = fs.readFileSync(UPLOAD, 'utf8');
const fills = new Map();

const tagRe = /^\[([A-Za-z0-9_]+)\]$/;
const lines = raw.split(/\r?\n/);
let i = 0;
while (i < lines.length) {
  const m = lines[i].match(tagRe);
  if (!m) {
    i++;
    continue;
  }
  const tag = m[1];
  i++;
  const buf = [];
  while (i < lines.length) {
    const next = lines[i];
    if (tagRe.test(next)) break;
    if (/^#{1,3}\s/.test(next)) break;
    if (/^\*\*Stage/.test(next)) break;
    if (/^###\s/.test(next)) break;
    buf.push(next);
    i++;
  }
  while (buf.length && buf[buf.length - 1].trim() === '') buf.pop();
  let text = buf.join('\n').trim();
  // Dialogue uploads wrap in quotes — keep them for in-world speech marks
  fills.set(tag, text);
}

console.log(`Parsed ${fills.size} fill entries from upload`);

const WL_TAG =
  /^(WL_|Darlene_|Wanda_|Patrice_|Emma_|Chloe_|Kezia_|Lila_)/;

let js = fs.readFileSync(TARGET, 'utf8');
const needed = new Set();
for (const m of js.matchAll(/\[([A-Za-z0-9_]+)\]/g)) {
  if (WL_TAG.test(m[1])) needed.add(m[1]);
}

const missing = [...needed].filter((t) => !fills.has(t));
if (missing.length) {
  console.error('Missing fills:', missing.join(', '));
  process.exit(1);
}

function toJsLiteral(s) {
  if (!s.includes('`') && !s.includes('${')) {
    return '`' + s.replace(/\\/g, '\\\\').replace(/`/g, '\\`') + '`';
  }
  return JSON.stringify(s);
}

let replaced = 0;
for (const tag of needed) {
  const val = fills.get(tag);
  const lit = toJsLiteral(val);
  const esc = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`"\\[${esc}\\]"`, 'g');
  const before = js;
  js = js.replace(re, () => {
    replaced++;
    return lit;
  });
  if (js === before) {
    console.warn(`Warning: no replacement for [${tag}]`);
  }
}

fs.writeFileSync(TARGET, js);
console.log(`Applied ${needed.size} tags (${replaced} replacements)`);
