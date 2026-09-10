#!/usr/bin/env node
/** Migrate GAME_BIBLE.md (and DESIGN_BIBLE title) to Hall Pass RA dorm framing. */
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const root = join(import.meta.dirname, '..');

const REPLACEMENTS = [
  [/Professor Sim/g, 'Hall Pass'],
  [/professor-sim/g, 'hall-pass'],
  [/ProfessorSim\.jsx/g, 'HallPass.jsx'],
  [/gluttony spirit/gi, 'RA influence'],
  [/Gluttony Spirit/g, 'RA Influence'],
  [/Spirit of Scarcity/g, 'Voice of Restraint'],
  [/Spirit intro/g, 'RA orientation'],
  [/Inhabit the Professor/g, 'Begin Your Shift'],
  [/inhabit a university professor/g, 'serve as a senior resident advisor on a college dorm floor'],
  [/inhabits a university professor/g, 'is a senior redheaded curvy resident advisor'],
  [/Your class is a roster/g, 'Your roster is a floor of residents'],
  [/the class/g, 'the floor'],
  [/The class/g, 'The floor'],
  [/class roster/g, 'resident roster'],
  [/class-wide/g, 'floor-wide'],
  [/Class-wide/g, 'Floor-wide'],
  [/class student/g, 'resident'],
  [/class students/g, 'residents'],
  [/visible class student/g, 'visible resident'],
  [/classmates/g, 'residents'],
  [/Classmates/g, 'Residents'],
  [/class skill/g, 'hall lounge skill'],
  [/class skills/g, 'hall lounge skills'],
  [/Classroom Prestige/g, 'Hall Lounge Prestige'],
  [/classroom prestige/g, 'hall lounge prestige'],
  [/classroom skills/g, 'hall lounge skills'],
  [/classroom upgrade/g, 'hall lounge upgrade'],
  [/classroom/g, 'hall lounge'],
  [/Classroom/g, 'Hall lounge'],
  [/CLASS SESSION/g, 'FLOOR CHECK-IN'],
  [/Class Session/g, 'Floor Check-In'],
  [/class session/g, 'floor check-in'],
  [/Spirit level/g, 'Hall reach'],
  [/spirit level/g, 'hall reach'],
  [/Spirit skill/g, 'Influence skill'],
  [/spirit skill/g, 'influence skill'],
  [/spirit trees/g, 'influence trees'],
  [/spirit tree/g, 'influence tree'],
  [/spirit ults/g, 'influence ults'],
  [/spirit_ult/g, 'influence_ult'],
  [/spirit tiers/g, 'influence tiers'],
  [/spirit tier/g, 'influence tier'],
  [/spirit pressure/g, 'floor pressure'],
  [/spirit belt/g, 'lane captain belt'],
  [/spirit nudges/g, 'RA nudges'],
  [/spirit favor/g, 'hall cred'],
  [/Spirit favor/g, 'Hall cred'],
  [/spirit trust/g, 'floor trust'],
  [/Professor rank/g, 'RA rank'],
  [/professor ranks/g, 'RA ranks'],
  [/professor climbs/g, 'you climb'],
  [/professor POV/g, 'RA POV'],
  [/Professor-favored/g, 'RA-favored'],
  [/Professor,/g, 'RA,'],
  [/Professor"/g, 'RA"'],
  [/the professor/g, 'you'],
  [/The professor/g, 'You'],
  [/My professor/g, 'My RA'],
  [/other professors/g, 'other RAs'],
  [/peer professor/g, 'peer RA'],
  [/Faculty \(6\):/g, 'Campus staff (6):'],
  [/Dr\. Imogen Hartley/g, 'RA Imogen Hartley'],
  [/Prof\. Yuki Mori/g, 'RA Yuki Mori'],
  [/Madeline/g, 'Cassidy'],
  [/madeline/g, 'cassidy'],
  [/bookworm/g, 'swimmer'],
  [/Community Researcher/g, 'Lane Captain'],
  [/community researcher/g, 'lane captain'],
  [/Sociology/g, 'Swim Team'],
  [/sociologist/g, 'swim captain'],
  [/Sacred Gluttony/g, 'Floor Feast'],
  [/sacred gluttony/g, 'floor feast'],
  [/Spirit Hub/g, 'Influence Hub'],
  [/Spirit Ride/g, 'Resident Ride'],
  [/Spirit Embodiment/g, 'Resident Ride'],
  [/Spirit Dominion/g, 'Floor Influence'],
  [/Professor's Quarters/g, 'RA Desk'],
  [/PROFESSOR'S QUARTERS/g, 'RA DESK'],
  [/Core class \(visible day 1\)/g, 'Home hall residents (~5 at start; others unlock wk 8/12/16)'],
  [/INIT_STUDENTS/g, 'INIT_STUDENTS'],
  [/skillTrees\.js/g, 'skillTrees.js'],
  [/view \| \*\*class\*\*/g, 'view | **roster**'],
  [/\*\*class\*\* \| Roster grid/g, '**roster** | Resident grid'],
  [/Navigation tabs appear dynamically \(e\.g\. \*\*student\*\* tab when one is selected\)\./g,
    'Navigation tabs appear dynamically (e.g. **student** tab when one is selected). Start flow: pick home dorm (sporty / nerdy / socialite / weirdos), then manage ~5 home residents until hall unlocks expand the roster.'],
];

function migrate(path) {
  let text = readFileSync(path, 'utf8');
  let next = text;
  for (const [from, to] of REPLACEMENTS) next = next.replace(from, to);
  if (next !== text) {
    writeFileSync(path, next);
    return true;
  }
  return false;
}

const targets = ['GAME_BIBLE.md', 'DESIGN_BIBLE.md'];
let updated = 0;
for (const file of targets) {
  if (migrate(join(root, file))) {
    updated++;
    console.log(`updated ${file}`);
  }
}

// Manual opening block for GAME_BIBLE high concept
const biblePath = join(root, 'GAME_BIBLE.md');
let bible = readFileSync(biblePath, 'utf8');
const opening = `# Hall Pass — Game Bible

A reproduction-oriented design reference for **Hall Pass** (*hall-pass*). This document describes the game's fantasy, loop, data model, characters, systems, content catalog, and text architecture so that a developer (or LLM) could rebuild a functionally equivalent game without reading source code. Prose and dialogue are summarized by *structure and intent*, not quoted verbatim.

---

## 1. High concept

**Genre:** Narrative management / feeder simulation with RPG progression, campus exploration, and branching character arcs.

**Fantasy:** You are a **senior redheaded curvy resident advisor (RA)** starting fall semester on a college dorm floor. Your roster is young women you cultivate — through food, relationship, corruption, devices, and evolved life paths — into ever-larger embodiments of appetite and surrender. The tone blends dark comedy, indulgence, body-transformation fetish content, and slow-burn character drama.

**Core tension:** Grow your floor while managing **Action Points (AP)**, **housing scrutiny**, resident **relationships**, and hidden tracks (**corruption**, **hunger/addiction**, **psych state**). Late game opens **evolved forms** — each resident can pivot into a distinct endgame fantasy (sumo, streamer, chemist, inventor, hive queen, etc.).

**Win state:** There is no hard win; progression is open-ended across weeks, achievements, evolved paths, lab inventions, campus saturation, and narrative milestones.

---

## 2. Session structure & game loop

### 2.1 Opening

1. **RA orientation** — Lore text: appetite culture on campus; your desk is the first door residents trust.
2. Player picks a **home dorm hall** (sporty / nerdy / socialite / weirdos) → clicks **Begin Your Shift** → game begins at **Week 1**, **5 AP**, **$850**, empty skill trees with ~5 home-hall residents on roster.
3. **Hall unlocks** at weeks **8**, **12**, and **16** add residents from unpicked halls (Victory Hall also unlocks at week 8 for non-sporty starts).

### 2.2 Weekly loop`;
if (!bible.includes('home dorm hall')) {
  bible = bible.replace(
    /# Hall Pass — Game Bible[\s\S]*?### 2\.2 Weekly loop/,
    opening,
  );
  writeFileSync(biblePath, bible);
  console.log('patched GAME_BIBLE opening');
}

console.log(`done: ${updated} file(s) migrated`);
