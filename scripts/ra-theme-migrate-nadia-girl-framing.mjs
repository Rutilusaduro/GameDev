#!/usr/bin/env node
/** Pass 124 — Nadia subject journals: narrator girl/girls → resident framing. */
import { readFileSync, writeFileSync } from 'fs';

const FILE = 'src/gameData/nadiaSubjectJournals.js';

const REPLACEMENTS = [
  [/slowly changing a girl like her/gi, 'slowly changing a resident like her'],
  [/picking a girl like her/gi, 'picking a resident like her'],
  [/picking a girl who notices/gi, 'picking a resident who notices'],
  [/watching a girl who makes money/gi, 'watching a resident who makes money'],
  [/watching a girl who hosted/gi, 'watching a resident who hosted'],
  [/taking a girl who already looks/gi, 'taking a resident who already looks'],
  [/taking a girl who spends her days/gi, 'taking a resident who spends her days'],
  [/about a girl who lives/gi, 'about a resident who lives'],
  [/too lean for a girl who belongs/gi, 'too lean for a resident who belongs'],
  [/the girl who used to fit in my arms/gi, 'the resident who used to fit in my arms'],
  [/The quiet girl who used to disappear/gi, 'The quiet resident who used to disappear'],
  [/The quiet girl who used to watch/gi, 'The quiet resident who used to watch'],
  [/bookish, flat girl/gi, 'bookish, flat resident'],
  [/image-obsessed girl/gi, 'image-obsessed resident'],
  [/disciplined girl/gi, 'disciplined resident'],
  [/strong, athletic girl/gi, 'strong, athletic resident'],
  [/The strong, athletic girl/gi, 'The strong, athletic resident'],
  [/this athletic girl's/gi, "this athletic resident's"],
  [/this athletic girl/gi, 'this athletic resident'],
  [/once-athletic girl/gi, 'once-athletic resident'],
  [/artistic, flat girl/gi, 'artistic, flat resident'],
  [/flat, artistic girl/gi, 'flat, artistic resident'],
  [/creative girl/gi, 'creative resident'],
  [/The flat, straight artsy girl/gi, 'The flat, straight artsy resident'],
  [/flat, straight artsy girl/gi, 'flat, straight artsy resident'],
  [/once-flat artsy girl/gi, 'once-flat artsy resident'],
  [/the flat artsy girl/gi, 'the flat artsy resident'],
  [/flat artsy girl/gi, 'flat artsy resident'],
  [/straight artistic girl/gi, 'straight artistic resident'],
  [/artsy, creative girl/gi, 'artsy, creative resident'],
  [/party-loving sorority girl/gi, 'party-loving sorority resident'],
  [/classic sorority girl/gi, 'classic sorority resident'],
  [/bubbly sorority girl/gi, 'bubbly sorority resident'],
  [/topheavy sorority girl/gi, 'topheavy sorority resident'],
  [/party sorority girl/gi, 'party sorority resident'],
  [/sorority girl/gi, 'sorority resident'],
  [/flat, driven girl/gi, 'flat, driven resident'],
  [/ultimate gamer girl/gi, 'ultimate gamer resident'],
  [/farm-girl type/gi, 'country-resident type'],
  [/once-strong farm-girl/gi, 'once-strong country-resident'],
  [/once hardworking farm-girl/gi, 'once hardworking country-resident'],
  [/voluptuous farm-girl/gi, 'voluptuous country-resident'],
  [/farm-girl body/gi, 'country-resident body'],
  [/perfect voluptuous farm girl/gi, 'perfect voluptuous country resident'],
  [/voluptuous farm girl/gi, 'voluptuous country resident'],
  [/strong farm girl/gi, 'strong country resident'],
  [/plump farm girl/gi, 'plump country resident'],
  [/hardworking country girl/gi, 'hardworking country resident'],
  [/sweet, strong country girl/gi, 'sweet, strong country resident'],
  [/sweet country girl/gi, 'sweet country resident'],
  [/sweet, nurturing, caring girl/gi, 'sweet, nurturing, caring resident'],
  [/The sweet, nurturing girl/gi, 'The sweet, nurturing resident'],
  [/sweet, nurturing girl/gi, 'sweet, nurturing resident'],
  [/nurturing girl/gi, 'nurturing resident'],
  [/once-rotund kitchen girl/gi, 'once-rotund kitchen resident'],
  [/kitchen girl/gi, 'kitchen resident'],
  [/flour-dusted, sensory culinary girl/gi, 'flour-dusted, sensory culinary resident'],
  [/sensory culinary girl/gi, 'sensory culinary resident'],
  [/Turning this flat girl/gi, 'Turning this flat resident'],
  [/such a good, greedy girl/gi, 'such a good, greedy resident'],
  [/such a good girl/gi, 'such a good resident'],
  [/Turning this flat girl/gi, 'Turning this flat resident'],
];

let src = readFileSync(FILE, 'utf8');
const before = src;
for (const [re, rep] of REPLACEMENTS) {
  src = src.replace(re, rep);
}
if (src === before) {
  console.log('no nadia girl-framing changes needed');
} else {
  writeFileSync(FILE, src);
  const left = (src.match(/\b(girl|girls)\b/gi) || []).length;
  console.log(`nadia journals girl-framing migrated; girl/girls remaining: ${left}`);
  if (left > 0) {
    const re = /\b(girl|girls)\b/gi;
    let m;
    while ((m = re.exec(src))) {
      const ctx = src.slice(Math.max(0, m.index - 50), m.index + 50).replace(/\n/g, ' ');
      console.log('  leftover:', ctx);
    }
  }
}
