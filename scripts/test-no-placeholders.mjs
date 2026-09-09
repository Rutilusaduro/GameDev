#!/usr/bin/env node
/** Fail if any player-facing source still contains bracket placeholder prose. */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOTS = ['src'];
const EXT = new Set(['.js', '.jsx']);
const SKIP = new Set(['MIGRATION.md', 'AUTHORING.md', 'SQUAD.md']);

let hits = 0;
for (const root of ROOTS) {
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (SKIP.has(name)) continue;
      const path = join(dir, name);
      const st = statSync(path);
      if (st.isDirectory()) walk(path);
      else if (EXT.has(extname(name))) {
        const text = readFileSync(path, 'utf8');
        const lines = text.split('\n');
        lines.forEach((line, i) => {
          if (/\[placeholder/i.test(line)) {
            console.error(`  ${path}:${i + 1}: ${line.trim().slice(0, 100)}`);
            hits += 1;
          }
        });
      }
    }
  };
  walk(root);
}

if (hits) {
  console.error(`no-placeholders: ${hits} placeholder line(s) found`);
  process.exit(1);
}
console.log('no-placeholders: src scan clean');
