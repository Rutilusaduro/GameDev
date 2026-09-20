#!/usr/bin/env node
/** Top up thin wildcard pools for RA / hall / room / talk check-in prose. */
import { writeFileSync } from 'fs';

const ADDITIONS = {
  'hall.lounge.ambient': [
    'Cushions remember hips now. The lounge exhales when the door shuts.',
    'Someone left a blanket folded over the armrest — domestic, deliberate, yours to notice.',
    'The blueprint on your desk and the warmth in this room are finally the same plan.',
  ],
  'room.visit.intro.lead': [
    'You read the nameplate twice out of habit. Third week on the job and the hall still feels like a map you are drawing.',
    "Music leaks under the door — bass, laughter, the private weather of someone else's life.",
    'Housing wants intros logged. You want her to know your knock means safety, not inspection.',
  ],
  'ra.floor.briefing': [
    'The fire drill poster is still crooked. Your residents are not — they are settling into something softer.',
    'You walk the hall with keys that weigh more each week — not metal, habit.',
  ],
  'dorm.unlock.arrival': [
    'A new wing opens and the elevator sighs like it knew this was coming.',
    'Fresh nameplates, same hunger — the building learns another appetite.',
  ],
  'talk.checkin.warm': [
    `{subject.name} pats the bedspread smooth, making room that is mostly for you.`,
    `"Tell me the gossip," she says. "{ra.name}. I trust your version."`,
  ],
};

const lines = [
  '// Auto-generated — node scripts/generateRaPivotProseDepthPass.mjs',
  "import { registerPool } from '../engine.js';",
  '',
];

for (const [key, texts] of Object.entries(ADDITIONS)) {
  const escaped = texts.map((t) => `\`${t.replace(/`/g, '\\`')}\``).join(', ');
  lines.push(`registerPool('${key}', [`);
  lines.push(`  { when: {}, weight: 2, text: [${escaped}] },`);
  lines.push(`]);`);
  lines.push('');
}

const out = 'src/textEngine/scenes/raPivotProseDepthPass53.js';
writeFileSync(out, lines.join('\n'));
console.log(`Wrote ${out}`);
