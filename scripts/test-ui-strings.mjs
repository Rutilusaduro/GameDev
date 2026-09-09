#!/usr/bin/env node
/** Player-facing UI labels — setup wizard, nav, view titles, ranks, dorm hooks. */
import assert from 'assert';
import { readFileSync } from 'fs';
import { DORM_LIST } from '../src/gameData/dorms.js';
import { RA_APPROACH_LIST } from '../src/gameData/raApproaches.js';
import { RA_RANKS } from '../src/gameData/content.js';

const BANNED = [
  /Professor Sim/i,
  /spirit-possessed/i,
  /\bMadeline\b/,
  /\bField Notes\b/i,
  /\bFIELD NOTES\b/,
  /Leave a Field Note/i,
  /Back to Class/i,
  /Chubby Class/i,
  /Class Banquet/i,
  /Present Thesis/i,
  /Spirit Hub/i,
  /Department budget/i,
  /Athletics Department/i,
  /future of the department/i,
  /\bnew students\b/i,
  /\bEach student gains\b/i,
  /\bper student\b/i,
  /\bUse on student\b/i,
  /\bchoose a student\b/i,
  /\bAddicted students\b/i,
  /\bEvolved students\b/i,
  /\bEvolved Student Operation\b/i,
  /\bstudent panel\b/i,
  /\bEquip to Student\b/i,
  /\bfeed a student\b/i,
  /\bAny student reaches\b/i,
  /\bAll students reach\b/i,
  /\bthe student body\b/i,
  /\bstudent voice session\b/i,
  /\bStudent Removal Hearing\b/i,
  /\bdevoted student testify\b/i,
  /\bRESEARCH SUBJECT\b/,
  /\bSelect a Subject\b/,
  /\beligible subjects\b/i,
  /\bRecruit Subject\b/,
  /\bPlace selected girl\b/i,
  /\bSelect a girl below\b/i,
  /\bSELECT GIRLS\b/i,
  /\bgirls to take to dinner\b/i,
  /\bgirl bristles\b/i,
  /\bgirls bristle\b/i,
  /\bacross \d+ girls\b/i,
  /\bbuild the girl who\b/i,
  /\btalking with the girls\b/i,
  /\ball girls\b/i,
  /\bArm 1 girl\b/i,
  /\b1\/girl\/week\b/i,
  /\b2 girls simultaneously\b/i,
  /\b3 girls, evening-long\b/i,
  /\bThree girls at\b/i,
];

function assertClean(text, label) {
  for (const re of BANNED) {
    assert(!re.test(text), `${label} must not match ${re}`);
  }
}

const hallPass = readFileSync('src/HallPass.jsx', 'utf8');
assert(
  /\[\["roster","📋 Roster"\],\["hall-lounge","🏠 Hall Lounge"\],\["influence","✨ Influence"\]/.test(hallPass),
  'main nav must use Roster / Hall Lounge / Influence labels',
);
assert(hallPass.includes('RA DESK'), 'header must say RA DESK');
assertClean(hallPass, 'HallPass.jsx');

const viteConfig = readFileSync('vite.config.js', 'utf8');
assert(viteConfig.includes('name: "Hall Pass"'), 'PWA manifest name must be Hall Pass');
assert(!/Professor's Quarters|Prof Sim/i.test(viteConfig), 'PWA manifest must not reference Professor Sim');

const indexHtml = readFileSync('index.html', 'utf8');
assert(indexHtml.includes('<title>Hall Pass</title>'), 'index.html title must be Hall Pass');

const wizard = readFileSync('src/components/RaSetupWizard.jsx', 'utf8');
assert(wizard.includes('Hall Pass'), 'setup wizard title must be Hall Pass');
assert(wizard.includes('RESIDENCE LIFE SIMULATOR'), 'setup wizard genre tag required');
assert(wizard.includes('Your floor. Your rules.'), 'setup wizard tagline required');
assertClean(wizard, 'RaSetupWizard.jsx');

const influence = readFileSync('src/views/InfluenceView.jsx', 'utf8');
assert(influence.includes('Floor Influence'), 'InfluenceView title must be Floor Influence');
assert.match(influence, /export function InfluenceView/);
assertClean(influence, 'InfluenceView.jsx');

const roster = readFileSync('src/views/RosterView.jsx', 'utf8');
assert(roster.includes('Residents —'), 'RosterView must label roster Residents');
assert(roster.includes('effectiveUnlockWeek'), 'RosterView must use effectiveUnlockWeek for hall gates');
assert.match(roster, /export function RosterView/);
assertClean(roster, 'RosterView.jsx');

const deviceInv = readFileSync('src/views/DeviceInventoryView.jsx', 'utf8');
assert(deviceInv.includes('Equip to Resident'), 'DeviceInventoryView must say Equip to Resident');
assertClean(deviceInv, 'DeviceInventoryView.jsx');

const lounge = readFileSync('src/views/HallLoungeView.jsx', 'utf8');
assert(lounge.includes('HALL LOUNGE'), 'HallLoungeView must say HALL LOUNGE');
assert.match(lounge, /export function HallLoungeView/);
assertClean(lounge, 'HallLoungeView.jsx');

for (const r of RA_RANKS) {
  assert(r.label, 'rank needs label');
  assert(!/professor/i.test(r.label), `rank label must not say professor: ${r.label}`);
}

for (const d of DORM_LIST) {
  assert(d.label && d.hook, `dorm ${d.id} needs label + hook`);
  assertClean(d.hook, `dorm ${d.id} hook`);
}

for (const a of RA_APPROACH_LIST) {
  assert(a.label && a.tagline, `approach ${a.id} needs label + tagline`);
  assertClean(`${a.label} ${a.tagline}`, `approach ${a.id}`);
}

const weighIn = readFileSync('src/components/WeighInModal.jsx', 'utf8');
assert(weighIn.includes('HALL · SCALE'), 'WeighInModal analog scale must say HALL · SCALE');
assert(weighIn.includes('HALL · INDUSTRIAL'), 'WeighInModal digital scale must say HALL · INDUSTRIAL');
assert(!/PROF · SCALE|PROF · INDUSTRIAL/i.test(weighIn), 'WeighInModal must not say PROF on scale labels');

const homeroom = readFileSync('src/components/HomeroomQueenModal.jsx', 'utf8');
assert(homeroom.includes('+{ch.classGain} floor'), 'HomeroomQueenModal must label classGain as floor');
assert(!/\+\{ch\.classGain\} class/.test(homeroom), 'HomeroomQueenModal must not show +N class');
assert(homeroom.includes('FLOOR RESIDENTS · tap to conference'), 'HomeroomQueenModal must say floor residents');
assert(!/STUDENTS · tap to conference/.test(homeroom), 'HomeroomQueenModal must not say students');

const campusView = readFileSync('src/views/CampusView.jsx', 'utf8');
assert(campusView.includes('Heavier new residents'), 'CampusView saturation hint must say residents');
assertClean(campusView, 'CampusView.jsx');

const oversight = readFileSync('src/views/OversightView.jsx', 'utf8');
assert(oversight.includes('Evolved Resident Op'), 'OversightView must say Evolved Resident Op');
assertClean(oversight, 'OversightView.jsx');

const sessions = readFileSync('src/gameData/sessions.js', 'utf8');
assert(sessions.includes('feed a resident for the first time'), 'achievements must say resident');
assertClean(sessions, 'sessions.js');

const weekPlanner = readFileSync('src/components/WeekPlannerModal.jsx', 'utf8');
assert(weekPlanner.includes('Place selected resident here'), 'WeekPlannerModal must say resident');
assertClean(weekPlanner, 'WeekPlannerModal.jsx');

const opposition = readFileSync('src/gameData/oppositionHearings.js', 'utf8');
assert(opposition.includes('Resident Removal Hearing'), 'opposition must say Resident Removal Hearing');
assertClean(opposition, 'oppositionHearings.js');

const hallSkills = readFileSync('src/gameData/skills.js', 'utf8');
assert(hallSkills.includes('for all residents'), 'skills must say residents not students');
assertClean(hallSkills, 'skills.js');

const skillTrees = readFileSync('src/gameData/skillTrees.js', 'utf8');
assert(skillTrees.includes('for all residents'), 'skillTrees must say residents not girls');
assertClean(skillTrees, 'skillTrees.js');

const skillTreeView = readFileSync('src/views/SkillTreeView.jsx', 'utf8');
assert(skillTreeView.includes('as residents grow'), 'SkillTreeView must say residents grow');
assertClean(skillTreeView, 'SkillTreeView.jsx');

const settling = readFileSync('src/views/SettlingView.jsx', 'utf8');
assert(settling.includes('When a resident grows past mobility'), 'SettlingView must say resident');
assertClean(settling, 'SettlingView.jsx');

const bugReport = readFileSync('src/components/BugReportModal.jsx', 'utf8');
assert(bugReport.includes('SHIFT LOG'), 'BugReportModal must say SHIFT LOG');
assert(bugReport.includes('Shift log downloaded'), 'BugReportModal download status must say shift log');
assertClean(bugReport, 'BugReportModal.jsx');

const errorBoundary = readFileSync('src/components/GameErrorBoundary.jsx', 'utf8');
assert(errorBoundary.includes('SHIFT LOG — INTERRUPTION'), 'GameErrorBoundary must say SHIFT LOG');
assert(errorBoundary.includes('Log this issue'), 'GameErrorBoundary must say Log this issue');
assertClean(errorBoundary, 'GameErrorBoundary.jsx');

assert(hallPass.includes('Something wrong? Shift Log'), 'HallPass hall log must link to Shift Log');
assert(hallPass.includes('Each resident gains'), 'HallPass floor check-in must say Each resident gains');

console.log('ui-strings: setup wizard, nav, views, ranks, dorm hooks, weigh-in, homeroom, achievements, resident framing OK');
