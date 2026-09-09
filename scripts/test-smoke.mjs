#!/usr/bin/env node
/** Aggregate CI gate: build + RA theme + dorm unlock + text lint. */
import { spawnSync } from 'child_process';

const steps = [
  ['npm', ['run', 'build']],
  ['npm', ['run', 'test:ra-theme']],
  ['npm', ['run', 'test:dorm-unlock']],
  ['npm', ['run', 'test:dorm-unlock-ui']],
  ['npm', ['run', 'text:lint']],
];

let failed = false;
for (const [cmd, args] of steps) {
  const label = `${cmd} ${args.join(' ')}`;
  console.log(`\n▶ ${label}`);
  const r = spawnSync(cmd, args, { stdio: 'inherit', shell: true });
  if (r.status !== 0) {
    console.error(`✗ failed: ${label}`);
    failed = true;
    break;
  }
  console.log(`✓ ${label}`);
}

if (failed) process.exit(1);
console.log('\n✓ smoke gate passed');
