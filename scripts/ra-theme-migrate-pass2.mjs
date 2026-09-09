#!/usr/bin/env node
/** Second-pass RA theme migration for gameData + key UI strings */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const ROOT = join(import.meta.dirname, '..', 'src');
const TARGETS = [
  join(ROOT, 'gameData'),
  join(ROOT, 'views'),
  join(ROOT, 'components'),
  join(ROOT, 'textEngine', 'scenes', 'v2'),
];

const EXT = new Set(['.js', '.jsx']);
const SKIP = new Set(['spirits.js', 'raApproaches.js', 'dorms.js']);

const REPLACEMENTS = [
  [/Madeline/g, 'Cassidy'],
  [/getMadelineTier/g, 'getSwimmerTier'],
  [/Faculty Lounge/g, 'Staff Lounge'],
  [/FACULTY LOUNGE/g, 'STAFF LOUNGE'],
  [/faculty lounge/g, 'staff lounge'],
  [/Faculty lounge/g, 'Staff lounge'],
  [/Your colleagues/g, 'Your coworkers in housing'],
  [/fellow teachers/g, 'fellow RAs and campus staff'],
  [/fellow faculty/g, 'fellow staff'],
  [/Professor\./g, 'RA.'],
  [/Professor,/g, 'RA,'],
  [/Professor"/g, 'RA"'],
  [/Professor'/g, "RA'"],
  [/Professor /g, 'RA '],
  [/the Professor/g, 'you'],
  [/The Professor/g, 'You'],
  [/Professor's/g, "Your"],
  [/professor's body/g, 'your body'],
  [/professor's eyes/g, 'your eyes'],
  [/professor's/g, 'your'],
  [/Spirit Dominion/g, 'Floor Influence'],
  [/Spirit Embodiment/g, 'Resident Ride'],
  [/Spirit Ride/g, 'Resident Ride'],
  [/spirit ride/g, 'resident ride'],
  [/SPIRIT EMBODIMENT/g, 'RESIDENT RIDE'],
  [/CAMPUS PILOT — SPIRIT EMBODIMENT/g, 'CAMPUS PILOT — RESIDENT RIDE'],
  [/Spirit Hub/g, 'Influence Hub'],
  [/spirit hub/g, 'influence hub'],
  [/spirit-hub/g, 'influence-hub'],
  [/Text the Professor/g, 'Text the RA'],
  [/text_professor/g, 'text_ra'],
  [/text the professor/g, 'text the RA'],
  [/CLASSROOM PRESTIGE/g, 'HALL LOUNGE PRESTIGE'],
  [/Classroom Prestige/g, 'Hall Lounge Prestige'],
  [/classroom prestige/g, 'hall lounge prestige'],
  [/classroom upgrade/g, 'hall lounge upgrade'],
  [/Classroom upgrade/g, 'Hall lounge upgrade'],
  [/Ritual Kitchen classroom/g, 'Ritual Kitchen hall lounge'],
  [/Dream Chamber classroom/g, 'Dream Chamber hall lounge'],
  [/Spend cumulative class weight/g, 'Spend cumulative hall weight'],
  [/cumulative class weight/g, 'cumulative hall weight'],
  [/The spirit's grip/g, "Your grip"],
  [/spirit riding the professor/g, 'RA running the floor'],
  [/Leave the professor's body/g, 'Slip into a resident'],
  [/inhabit a student/g, 'ride along with a resident'],
  [/Spirit favor/g, 'Hall cred'],
  [/spirit favor/g, 'hall cred'],
  [/Sacred gluttony/g, 'Floor feast'],
  [/sacred gluttony/g, 'floor feast'],
  [/gluttony spirit/g, 'RA influence'],
  [/Gluttony Spirit/g, 'RA influence'],
  [/Spirit of Scarcity/g, 'Voice of Restraint'],
  [/Nineteenth Chair/g, 'Suitemate'],
  [/nineteenth chair/g, 'suitemate'],
  [/Sociology PhD/g, 'Varsity Swimmer'],
  [/Department of Sociology/g, 'Athletics Department'],
  [/Community Researcher/g, 'Lane Captain'],
  [/community researcher/g, 'lane captain'],
  [/class session/g, 'floor check-in'],
  [/Class session/g, 'Floor check-in'],
  [/CLASS SESSION/g, 'FLOOR CHECK-IN'],
  [/Professor Sim/g, 'Hall Pass'],
  [/Professor's Quarters/g, 'RA Desk'],
  [/PROFESSOR'S QUARTERS/g, 'RA DESK'],
  [/faculty liaison/g, 'RA sponsor'],
  [/There he is/g, 'There you are'],
  [/There she is/g, 'There you are'],
];

function walk(dir, files = []) {
  if (!statSync(dir).isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (EXT.has(extname(name)) && !SKIP.has(name)) files.push(p);
  }
  return files;
}

let changed = 0;
for (const dir of TARGETS) {
  for (const file of walk(dir)) {
    let text = readFileSync(file, 'utf8');
    let next = text;
    for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
    if (next !== text) {
      writeFileSync(file, next);
      changed++;
      console.log('updated', file.replace(join(ROOT, '..') + '/', ''));
    }
  }
}

// Add swimmer journal block from bookworm if missing
const nadiaPath = join(ROOT, 'gameData', 'nadiaSubjectJournals.js');
let nadia = readFileSync(nadiaPath, 'utf8');
if (!nadia.includes('swimmer:') && nadia.includes('bookworm:')) {
  const bookwormBlock = nadia.match(/bookworm:\s*\{[\s\S]*?\n  \},/);
  if (bookwormBlock) {
    let swimmerBlock = bookwormBlock[0]
      .replace(/^bookworm:/, 'swimmer:')
      .replace(/bookworm/g, 'swimmer')
      .replace(/Madeline/g, 'Cassidy')
      .replace(/novels/g, 'lap times')
      .replace(/library/g, 'pool deck')
      .replace(/research/g, 'training')
      .replace(/thesis/g, 'season plan')
      .replace(/study/g, 'practice');
    nadia = nadia.replace('bookworm:', `swimmer:${swimmerBlock.slice('swimmer:'.length)}\n  bookworm:`);
    writeFileSync(nadiaPath, nadia);
    console.log('added swimmer journals from bookworm template');
    changed++;
  }
}

// communityResearcher alias
const crPath = join(ROOT, 'gameData', 'communityResearcher.js');
let cr = readFileSync(crPath, 'utf8');
if (!cr.includes('export function getSwimmerTier')) {
  cr = cr.replace(
    'export function getMadelineTier(stageId)',
    'export function getSwimmerTier(stageId)',
  );
  cr += '\n/** @deprecated use getSwimmerTier */\nexport const getMadelineTier = getSwimmerTier;\n';
  writeFileSync(crPath, cr);
  changed++;
}

console.log(`Done — ${changed} file updates.`);
