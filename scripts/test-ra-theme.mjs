#!/usr/bin/env node
/** Fail on high-signal Professor Sim / class / spirit framing leaks in player-facing paths. */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOTS = ['src/views', 'src/components', 'src/textEngine', 'src/gameData'];
const EXT = new Set(['.js', '.jsx']);

const BANNED = [
  { id: 'professor-sim', re: /Professor Sim/i },
  { id: 'spirit-possessed', re: /spirit-possessed/i },
  { id: 'madeline-name', re: /\bMadeline\b/ },
  { id: 'academic-inquiry', re: /Academic Inquiry Board/i },
  { id: 'class-wide-actions', re: /Class-Wide Actions/i },
  { id: 'present-thesis', re: /Present Thesis/i },
  { id: 'phd-proposal', re: /PhD Proposal/i },
  { id: 'community-researcher-header', re: /COMMUNITY RESEARCHER/i },
  { id: 'the-class-target', re: /["']the class["']/ },
  { id: 'class-banquet-label', re: /Class Banquet/ },
  { id: 'speaks-in-class', re: /speaks (up )?in class/i },
];

const ALLOW_LINE = [
  /getMadelineTier/,
  /MadelineTier/,
  /professorProfile/,
  /setProfessorProfile/,
  /ProfessorProfile/,
  /ClassroomView/,
  /classroomSkills/,
  /ownedClassSkills/,
  /doClass[:/(]/,
  /spirit_ride/,
  /spiritLevel/,
  /spiritFavor/,
  /SpiritHub/,
  /professorReplies/,
  /CG_PROFESSOR/,
  /class_banquet/,
  /classEvents/,
  /renderMemoryClass/,
  /memory\.class/,
  /type==="class"/,
  /case 'class'/,
  /view==="class"/,
  /view==="classroom"/,
  /pledge class/i,
  /weight class/i,
  /life-drawing class/i,
  /workout class/i,
  /second PhD/,
  /@deprecated/,
  /\/\//,
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXT.has(extname(p))) out.push(p);
  }
  return out;
}

const files = ROOTS.flatMap((r) => walk(r));
const failures = [];

for (const file of files) {
  const lines = readFileSync(file, 'utf8').split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (ALLOW_LINE.some((re) => re.test(line))) continue;
    for (const rule of BANNED) {
      if (rule.re.test(line)) {
        failures.push({ file, line: i + 1, rule: rule.id, text: line.trim().slice(0, 120) });
      }
    }
  }
}

if (failures.length) {
  console.error(`ra-theme: ${failures.length} leak(s) found:\n`);
  for (const f of failures) {
    console.error(`  [${f.rule}] ${f.file}:${f.line}`);
    console.error(`    ${f.text}\n`);
  }
  process.exit(1);
}

console.log(`ra-theme: ${files.length} files scanned, no high-signal leaks`);
