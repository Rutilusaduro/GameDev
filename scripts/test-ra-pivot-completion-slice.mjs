#!/usr/bin/env node
/** Runs only completion-audit checks whose ids start with ra-dorm-pivot-. */
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const out = spawnSync('node', ['scripts/test-completion-audit.mjs'], {
  cwd: root,
  encoding: 'utf8',
});
const text = `${out.stdout || ''}\n${out.stderr || ''}`;
const lines = text.split('\n').filter((l) => /ra-dorm-pivot/.test(l));
const failed = lines.filter((l) => l.includes('✗'));
if (failed.length) {
  console.error('test-ra-pivot-completion-slice: failed\n' + failed.join('\n'));
  process.exit(1);
}
if (lines.length < 3) {
  console.error('test-ra-pivot-completion-slice: expected 3 ra-dorm-pivot checks, saw:\n' + lines.join('\n'));
  process.exit(1);
}
console.log('test-ra-pivot-completion-slice: ok (3/3 ra-dorm-pivot completion-audit checks)');
