#!/usr/bin/env node
/** Pass 10 — hall/class display prose + resident-influence voice in text engine */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const TEXT_ENGINE = 'src/textEngine';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.js', '.jsx'].includes(extname(p))) out.push(p);
  }
  return out;
}

const EXTRA = [
  'src/HallPass.jsx',
  'src/views/OversightView.jsx',
  'src/gameData/students.js',
  'src/gameData/content.js',
  'src/gameData/opposition.js',
  'src/gameData/communityResearcher.js',
  'src/gameData/classEvents.js',
  'src/gameData/scrutinyConsequences.js',
  'src/components/MayaHiveModal.jsx',
];

const FILES = [...new Set([...walk(TEXT_ENGINE), ...EXTRA])];

const REPLACEMENTS = [
  // class → hall (player prose)
  ['the class', 'the hall'],
  ['The class', 'The hall'],
  ['this class demonstrates', 'this hall demonstrates'],
  ['one hungry class', 'one hungry hall'],
  ['class mass on the chart', 'hall mass on the chart'],
  ['linked class hungers', 'linked floor hungers'],
  ['After class she', 'After floor rounds she'],
  ['After class:', 'After floor rounds:'],
  ['before class starts', 'before hall check-in'],
  ['walk to class', 'walk the hall'],
  ['in class.', 'on the floor.'],
  ['in class now', 'on the floor now'],
  ['looks in class', 'looks on the floor'],
  ['how it looks in class', 'how it looks on the floor'],
  ['extra snacks to class', 'extra snacks to hall meetings'],
  ['testing something for the class', 'testing something for the floor'],
  ['class action', 'hall action'],
  ['Class Actions', 'Hall Actions'],
  ['class feasts', 'hall feasts'],
  ['whole class meal', 'whole hall meal'],
  ['public class feasts', 'public hall feasts'],
  ['class session', 'hall session'],
  ['class registers', 'hall registers'],
  ['ambient class awareness', 'ambient hall awareness'],
  ['class ecology', 'hall ecology'],
  ['class test subject', 'floor volunteer'],
  ['can no longer come to class', 'can no longer come to hall'],
  ['bring class to her', 'bring the floor to her'],
  ['class relationship', 'hall relationship'],
  ['Class: +', 'Hall: +'],
  ['spirit pressure', 'resonance pressure'],
  ['gluttony-spirit pressure', 'hive resonance pressure'],
  // Nadia role
  ['role:"Psychology PhD"', 'role:"Psychology grad"'],
  ['PhD track, notebook always open, the one who watches from the back of the room', 'Grad track, notebook always open, the one who watches from the back of the common room'],
  // Cassidy field note
  ['The committee will ask about this session', 'The panel will ask about this session'],
  // spirit → influence (prose only — not skill ids)
  ['The spirit drinks the room', 'The influence saturates the room'],
  ['the spirit drinks the room', 'the influence saturates the room'],
  ['the spirit drinks the harmony', 'the resonance drinks the harmony'],
  ['the spirit drinks restraint', 'influence drinks restraint'],
  ['the spirit drinks the moment', 'influence deepens through the moment'],
  ['The spirit drinks the moment', 'Influence deepens through the moment'],
  ['The spirit hums through her ribs', 'Resonance hums through her ribs'],
  ['The spirit nests behind her eyes', 'Influence nests behind her eyes'],
  ['The spirit nests in her appetite', 'Influence nests in her appetite'],
  ['The spirit takes the wheel behind her ribs', 'Influence takes the wheel behind her ribs'],
  ['The spirit slides through her like warm honey', 'Influence slides through her like warm honey'],
  ['the spirit pleased', 'resonance pleased'],
  ['spirit pleased', 'resonance pleased'],
  ['The spirit is satisfied', 'The resonance is satisfied'],
  ['the spirit is satisfied', 'the resonance is satisfied'],
  ['the spirit sated on spectacle', 'influence sated on spectacle'],
  ['body and spirit', 'body and resonance'],
  ['Campus spirit now includes', 'Campus culture now includes'],
  ['Campus spirit includes', 'Campus culture includes'],
  ['skips the gym in spirit', 'skips the gym in principle'],
  ['Good spirits, open hands', 'Good mood, open hands'],
];

let touched = 0;
for (const file of FILES) {
  let src = readFileSync(file, 'utf8');
  let next = src;
  for (const [from, to] of REPLACEMENTS) {
    if (from === to || !next.includes(from)) continue;
    next = next.split(from).join(to);
  }
  if (next !== src) {
    writeFileSync(file, next);
    touched++;
    console.log('updated:', file);
  }
}
console.log(`pass10: ${touched} files updated`);
