#!/usr/bin/env node
/** Remove Cassidy name from bookworm journal block (Cassidy is swimmer archetype). */
import { readFileSync, writeFileSync } from 'fs';

const path = 'src/gameData/nadiaSubjectJournals.js';
const lines = readFileSync(path, 'utf8').split('\n');
let inBookworm = false;
const out = lines.map((line) => {
  if (line.includes('  bookworm: {')) inBookworm = true;
  else if (inBookworm && /^  [a-z_]+: \{/.test(line) && !line.includes('bookworm')) inBookworm = false;
  if (!inBookworm) return line;
  return line
    .replace(/chosen Cassidy as/g, 'chosen her as')
    .replace(/chosen Cassidy as/g, 'chosen her as')
    .replace(/Cassidy's/g, "Her")
    .replace(/Cassidy/g, 'she')
    .replace(/\bshe came\b/g, 'She came')
    .replace(/\bshe has\b/g, 'She has')
    .replace(/\bshe is\b/g, 'She is')
    .replace(/\bshe looks\b/g, 'She looks')
    .replace(/\bshe moves\b/g, 'She moves')
    .replace(/\bshe waddles\b/g, 'She waddles')
    .replace(/\bshe visited\b/g, 'She visited')
    .replace(/\bshe returned\b/g, 'She returned')
    .replace(/\bshe's\b/g, "She's")
    .replace(/\bshe was\b/g, 'She was')
    .replace(/\bshe still\b/g, 'She still')
    .replace(/\bshe handles\b/g, 'She handles')
    .replace(/\bshe made\b/g, 'She made')
    .replace(/\bshe squashed\b/g, 'She squashed')
    .replace(/\bshe feels\b/g, 'She feels')
    .replace(/\bshe gasped\b/g, 'She gasped')
    .replace(/\bshe trembled\b/g, 'She trembled')
    .replace(/\bshe whimpered\b/g, 'She whimpered')
    .replace(/\bshe leaves\b/g, 'She leaves')
    .replace(/\bshe said\b/g, 'She said')
    .replace(/\bshe pushes\b/g, 'She pushes')
    .replace(/\bshe smelled\b/g, 'She smelled')
    .replace(/\bshe blushed\b/g, 'She blushed')
    .replace(/\bshe ate\b/g, 'She ate')
    .replace(/\bshe climbed\b/g, 'She climbed')
    .replace(/\bshe had\b/g, 'She had')
    .replace(/\bshe kept\b/g, 'She kept')
    .replace(/\bshe fed\b/g, 'She fed')
    .replace(/\bshe's starting\b/g, "She's starting")
    .replace(/\bshe's become\b/g, "She's become")
    .replace(/\bshe's grown\b/g, "She's grown")
    .replace(/\bshe's getting\b/g, "She's getting")
    .replace(/\bshe's looking\b/g, "She's looking")
    .replace(/\bshe's still\b/g, "She's still")
    .replace(/\bshe's starting\b/g, "She's starting")
    .replace(/swim cap/g, 'glasses')
    .replace(/team hoodie/g, 'oversized sweater');
});

writeFileSync(path, out.join('\n'));
console.log('fixed bookworm journal Cassidy references');
