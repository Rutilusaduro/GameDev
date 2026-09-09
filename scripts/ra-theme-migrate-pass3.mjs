#!/usr/bin/env node
/** Pass 3 — Cassidy sweep + player-facing professor/spirit/class prose */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');
const DIRS = [
  join(ROOT, 'textEngine'),
  join(ROOT, 'gameData'),
  join(ROOT, 'components'),
  join(ROOT, 'views'),
];
const EXT = new Set(['.js', '.jsx']);
const SKIP_FILES = new Set(['spirits.js', 'raApproaches.js', 'dorms.js', 'communityResearcher.js']);

const REPLACEMENTS = [
  [/Madeline/g, 'Cassidy'],
  [/madeline/g, 'cassidy'],
  [/bookworm: The self-study/gi, 'swimmer: lane discipline'],
  [/── 1 · Madeline/g, '── 1 · Cassidy'],
  [/── 1 Madeline/g, '── 1 Cassidy'],
  [/1 · Madeline/g, '1 · Cassidy'],
  [/Madeline — bookworm/g, 'Cassidy — swimmer'],
  [/bookworm — bookworm/g, 'swimmer'],
  [/The professor and Nadia/g, 'You and Nadia'],
  [/the professor and Nadia/g, 'you and Nadia'],
  [/The professor /g, 'You '],
  [/the professor /g, 'you '],
  [/The professor\./g, 'You.'],
  [/the professor\./g, 'you.'],
  [/the professor,/g, 'you,'],
  [/the professor"/g, 'you"'],
  [/the professor'/g, "you'"],
  [/My professor /g, 'My RA '],
  [/other professors/g, 'other RAs'],
  [/peer professor/g, 'peer RA'],
  [/Professor-directed/g, 'RA-directed'],
  [/professor observes/g, 'you watch'],
  [/professor watched/g, 'you watched'],
  [/professor observes/g, 'you watch'],
  [/the professor observes/g, 'you watch'],
  [/professor POV/g, 'RA POV'],
  [/professor gave/g, 'the instructor gave'],
  [/if the professor approves/g, 'if you approve'],
  [/Return to Professor/g, 'Return to RA Desk'],
  [/Sacred Gluttony/g, 'Floor Feast'],
  [/sacred gluttony/g, 'floor feast'],
  [/spirit purr/g, 'satisfaction hum'],
  [/Spirit Ride/g, 'Resident Ride'],
  [/spirit ride/g, 'resident ride'],
  [/Spirit Embodiment/g, 'Resident Ride'],
  [/spirit embodiment/g, 'resident ride'],
  [/Spirit Dominion/g, 'Floor Influence'],
  [/spirit trust/g, 'floor trust'],
  [/Spirit favor/g, 'Hall cred'],
  [/spirit favor/g, 'hall cred'],
  [/Spirit level/g, 'Hall reach'],
  [/spirit level/g, 'hall reach'],
  [/Spirit Hub/g, 'Influence Hub'],
  [/after class/g, 'after floor check-in'],
  [/stops you after class/g, 'stops you in the hall'],
  [/CLASS SESSION/g, 'FLOOR CHECK-IN'],
  [/Class Session/g, 'Floor Check-In'],
  [/class session/g, 'floor check-in'],
  [/Classroom Prestige/g, 'Hall Lounge Prestige'],
  [/CLASSROOM PRESTIGE/g, 'HALL LOUNGE PRESTIGE'],
  [/classroom upgrade/g, 'hall lounge upgrade'],
  [/the professor as someone/g, 'you as someone'],
  [/Leave the your body/g, 'Slip out of your RA routine and'],
  [/inhabit a student/g, 'ride along with a resident'],
  [/inhabit students/g, 'ride along with residents'],
  [/gluttony-spirit/g, 'hunger-pressure'],
  [/Gluttony Spirit/g, 'RA influence'],
  [/Spirit of Scarcity/g, 'Voice of Restraint'],
  [/Professor Sim/g, 'Hall Pass'],
  [/Professor's Quarters/g, 'RA Desk'],
  [/PROFESSOR'S QUARTERS/g, 'RA DESK'],
  [/Sociology/g, 'Swim Team'],
  [/sociologist/g, 'swim captain'],
  [/Community Researcher/g, 'Lane Captain'],
  [/community researcher/g, 'lane captain'],
  [/glasses up/g, 'cap back'],
  [/pushes her glasses/g, 'pushes her swim cap'],
  [/margin of notes/g, 'lane splits on her phone'],
  [/scholar's composure/g, "captain's composure"],
  [/scholarly/g, 'athletic'],
  [/research into appetite/g, 'training into appetite'],
  [/\bthesis approved\b/g, 'captain review approved'],
  [/\bthesis rejected\b/g, 'captain review rejected'],
];

function walk(dir, files = []) {
  if (!statSync(dir).isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (EXT.has(extname(name)) && !SKIP_FILES.has(name)) files.push(p);
  }
  return files;
}

let n = 0;
for (const dir of DIRS) {
  for (const file of walk(dir)) {
    if (file.endsWith('ProfessorSim.jsx')) continue; // manual pass
    let text = readFileSync(file, 'utf8');
    let next = text;
    for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
    if (next !== text) {
      writeFileSync(file, next);
      n++;
    }
  }
}
console.log(`pass3: ${n} files updated`);
