// Unique extras for Phase D diary parent hubs. Existing keys only.
// Run: node scripts/generatePhaseDParentUpgrade.mjs
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/diaryPhaseD.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const OUT = 'src/textEngine/scenes/diaryPhaseDParentUpgrade.js';

const FORM = {
  competitive_gainer: {
    5: 'I pinned the gap after dinner and left Brittany under me on the board.',
    6: 'Leaderboard night. I sat wider and called the chair friction a metric.',
    7: 'I moved a pin up and felt the desk meet belly first. Satisfactory.',
    8: 'First place is a posture now. I eat to defend the column.',
    9: 'The corkboard leans from the paper. So do I. Still winning.',
    10: 'I write from the chair I no longer leave. The numbers still climb.',
    11: 'Stationary, ahead, hungry. The file stays open on purpose.',
  },
  machine_goddess: {
    5: 'Workshop log: belt hummed, belly answered, clean run, printout kept.',
    6: 'I built the loop to be honest. Pressure in, volume out.',
    7: 'Feeder arm online. I ate through calibration and kept the grease.',
    8: 'Strap tighter, waistband looser, same hour. Repeatable.',
    9: 'I am the test jig. The jig is thriving and the fan is loud.',
    10: 'The bench is sticky with success. I am stickier. Log closed? No.',
    11: 'Machine and mouth, dual intake. I keep the hardware on.',
  },
  salon_appetit: {
    5: 'I hosted myself. Guest list: one plate and the girl who finished it.',
    6: 'Candle, wine, second bottle already sweating. I stayed seated.',
    7: 'The extra chair was warm before anyone else arrived. Correct.',
    8: 'The room came to me. I approved the seating with another plate.',
    9: 'I hold court from the good chair. Plates travel. I do not.',
    10: 'Salon as nest. I am the centerpiece and the appetite.',
    11: 'The guest book is my waistband. Full. Still taking names.',
  },
  artisan_gallery: {
    5: 'I hung the work at belly height so nobody could miss the thesis.',
    6: 'Consent ink, dinner smell, the subject still chewing in the frame.',
    7: 'Light meter kissing skin. I am the installation and the mouth.',
    8: 'Viewers look up. I painted the overflow, then became it.',
    9: 'The hang is permanent. So is the softness under the print.',
    10: 'Gallery as body. I fill the room the way the work asked.',
    11: 'Last label: appetite, life-size, not for sale. Still hungry.',
  },
  pharmacist: {
    5: 'Dose logged. Side effect: I wanted the second scoop. Wrote that too.',
    6: 'Batch two still warm. I am the proof and the pipette.',
    7: 'Label glue on my thumb, extra helping cooling. I took both.',
    8: 'The compound worked. I keep taking the proof home.',
    9: 'Timer ignored. Yield obvious. Notes still neat.',
    10: 'I write from a wider chair. The formula does not need revision.',
    11: 'Stationary subject, open file, appetite current. Dose continues.',
  },
};

const keys = _registryEntries()
  .map(([k]) => k)
  .filter((k) => /^diary\.(competitive_gainer|machine_goddess|salon_appetit|artisan_gallery|pharmacist)\.s\d+$/.test(k));

const lines = [
  '// The Squad — Lead: A2 Psych | Support: A5 Editor',
  '// Auto-generated — run: node scripts/generatePhaseDParentUpgrade.mjs',
  "import { registerModuleVariants } from '../engine.js';",
  '',
];

let n = 0;
for (const key of keys) {
  const m = key.match(/diary\.([a-z_]+)\.s(\d+)/);
  if (!m) continue;
  const text = FORM[m[1]]?.[Number(m[2])];
  if (!text) continue;
  lines.push(`registerModuleVariants(${JSON.stringify(key)}, [{ when: {}, weight: 5, text: [${JSON.stringify(text)}] }]);`);
  n += 1;
}

writeFileSync(OUT, `${lines.join('\n')}\n`);
console.log(`generatePhaseDParentUpgrade: ${n} pools → ${OUT}`);
