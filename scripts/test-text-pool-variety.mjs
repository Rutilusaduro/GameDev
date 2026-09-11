#!/usr/bin/env node
/** Reject legacy bridge anti-pattern: triple-identical slot in one pool row. */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const scenes = join(root, 'src/textEngine/scenes');

const TRIPLE_SLOT = /\[(?:\s*slot|\s*bodySlot)(?:\s*,\s*(?:slot|bodySlot)){2}\s*\]/;

function walk(dir, out = []) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    if (ent.name.startsWith('.')) continue;
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.js')) out.push(p);
  }
  return out;
}

const hits = [];
for (const file of walk(scenes)) {
  const rel = file.slice(root.length + 1);
  const src = readFileSync(file, 'utf8');
  if (TRIPLE_SLOT.test(src)) hits.push(rel);
}

if (hits.length) {
  console.error('test-text-pool-variety: triple-slot pools still present:', hits.join(', '));
  process.exit(1);
}

console.log('test-text-pool-variety: ok');
