#!/usr/bin/env node
/** Pass 11 — remaining influence/resonance voice in v2 embodiment, rituals, dreams, resonance */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const TARGETS = new Set([
  'src/textEngine/scenes/v2/embodiment/depth.js',
  'src/textEngine/scenes/v2/embodiment/index.js',
  'src/textEngine/scenes/v2/embodiment/campusWalk.js',
  'src/textEngine/scenes/v2/resonance/index.js',
  'src/textEngine/scenes/v2/resonance/depth.js',
  'src/textEngine/scenes/v2/rituals/index.js',
  'src/textEngine/scenes/v2/rituals/depth.js',
  'src/textEngine/scenes/v2/dreams/index.js',
  'src/textEngine/scenes/v2/dreams/depth.js',
  'src/textEngine/scenes/npcReactions.js',
  'src/gameData/unlockScenes.js',
  'src/textEngine/scenes/growthEvent/personas.js',
  'src/textEngine/scenes/researchJournal/swimmerDepth.js',
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (['.js', '.jsx'].includes(extname(p))) out.push(p);
  }
  return out;
}

const REPLACEMENTS = [
  ['The spirit whispers:', 'Influence whispers:'],
  ['The spirit hums approval through her ribs', 'Resonance hums approval through her ribs'],
  ['The spirit hums through her ribs', 'Resonance hums through her ribs'],
  ['The spirit lifts out', 'Influence lifts out'],
  ['The spirit smiles without a face', 'Influence smiles without a face'],
  ['The spirit prickles:', 'Resonance prickles:'],
  ['The spirit drinks every swallowed warmth', 'Influence deepens with every swallowed warmth'],
  ['The spirit drinks the harmony', 'Resonance deepens through the harmony'],
  ['The spirit drinks restraint from the air', 'restraint dissolves from the air'],
  ['the spirit drinking restraint from the air', 'influence drinking restraint from the air'],
  ['the spirit drinking the room dry of restraint', 'influence saturating the room, drinking restraint dry'],
  ['The spirit walks the corridors of her appetite', 'Influence walks the corridors of her appetite'],
  ['The spirit walks her subconscious like a familiar hallway', 'Influence walks her subconscious like a familiar hallway'],
  ['The spirit is not surprised', 'Influence is not surprised'],
  ['The spirit enters where waking politeness cannot follow', 'Influence enters where waking politeness cannot follow'],
  ['campus observers and professor voice', 'campus observers and RA voice'],
  ['Cassidy — bookworm, analytical', 'Cassidy — swimmer, analytical'],
  ['generated from bookworm variants', 'generated from swimmer variants'],
  ['Cassidy — bookworm: academic self-documentation', 'Cassidy — swimmer: training-log self-documentation'],
  ['"Interesting," she murmurs, fingers pressed to her waist. "Faster than projected. Logged."', '"Interesting," she murmurs, fingers pressed to her waist. "Faster than projected on the meal log."'],
  ['"The experiment continues." She sounds pleased. "I intend to continue it. Indefinitely."', '"The training block continues." She sounds pleased. "I intend to continue it. Indefinitely."'],
  ['"I am the result," she says, with precision. "No longer the researcher. I am the result."', '"I am the result," she says, with precision. "No longer the lane captain. I am the result."'],
  ['"Publishable," she breathes, hands spread on her vast belly. "All of it."', '"Board-ready," she breathes, hands spread on her vast belly. "All of it."'],
  ['Cassidy studies everything, including the way the granola bar stopped being enough around Tuesday. So she writes it down. She underlines it. Somewhere in the margin of her own careful notes, she has started taking yours.', 'Cassidy logs everything — laps, macros, the way the post-practice snack stopped being optional around Tuesday. She writes it in her meal journal. She underlines it. Somewhere in the margin of her own careful notes, she has started taking yours.'],
  ["crosses into the spirit's reach", "crosses into hall reach"],
];

const FILES = walk('src').filter((f) => TARGETS.has(f));

let touched = 0;
for (const file of FILES) {
  let src = readFileSync(file, 'utf8');
  let next = src;
  for (const [from, to] of REPLACEMENTS) {
    if (!next.includes(from)) continue;
    next = next.split(from).join(to);
  }
  if (next !== src) {
    writeFileSync(file, next);
    touched++;
    console.log('updated:', file);
  }
}
console.log(`pass11: ${touched} files updated`);
