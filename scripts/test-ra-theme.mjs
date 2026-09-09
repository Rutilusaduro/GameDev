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
  { id: 'class-wide-softening', re: /Class-wide softening/i },
  { id: 'speaks-in-class', re: /speaks (up )?in class/i },
  { id: 'back-to-class', re: /Back to Class/i },
  { id: 'after-class', re: /After class,/i },
  { id: 'class-travels', re: /Class now travels to/i },
  { id: 'feederism-season-plan', re: /feederism season plan/i },
  { id: 'nadia-feeder-pitch', re: /RA \[Name\] and Nadia said/i },
  { id: 'nadia-feeder-pitch-you', re: /You and Nadia said/i },
  { id: 'nadia-feeder-subject', re: /Nadia needed a live subject/i },
  { id: 'nadia-feederism-study', re: /her feederism study/i },
  { id: 'classmates-softening', re: /\b[Cc]lassmates (?:look|keep|linger|posted|complaining)/ },
  { id: 'my-classmates', re: /\bmy classmates\b/i },
  { id: 'a-classmate', re: /\ba classmate\b/i },
  { id: 'class-fed-teacher', re: /Class fed\. Teacher shocked/ },
  { id: 'chubby-class-label', re: /Chubby Class/ },
  { id: 'class-only-quote', re: /"Class only,"/ },
  { id: 'classmate-spots-you', re: /Classmate Spots You/ },
  { id: 'class-size-review', re: /Class size review/ },
  { id: 'leaves-class-energized', re: /leaves class energized/ },
  { id: 'psychology-of-feederism', re: /psychology of feederism/i },
  { id: 'student-teacher', re: /student teacher/i },
  { id: 'early-childhood-ed', re: /Early Childhood Education/i },
  { id: 'psychology-grad-student', re: /psychology grad student/i },
  { id: 'excel-in-classes', re: /excel in classes/i },
  { id: 'kindergartener', re: /kindergartener/i },
  { id: 'teaching-degree', re: /teaching degree/i },
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
  /That's the spirit/i,
  /That's the spirit/i,
  /appendV2Depth\([^)]*'spirit'/,
  /appendV2Depth\([^)]*"spirit"/,
  /'spirit\.v2/,
  /"spirit\.v2/,
  /spirit\.v2\.depth/,
  /classmateWithdrawn/,
  /classmate_sighting/,
  /classmates \/ campus/,
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
