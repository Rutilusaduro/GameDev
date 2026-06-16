// Generate intimacy/personas.js from legacy voice dicts.
// Run: node scripts/generateIntimacyPersonas.mjs
import { writeFileSync } from 'fs';
import {
  INTIMACY_ARCHETYPE_LINES,
  INTIMACY_STUDENT_LINES,
} from './legacyIntimacy.snapshot.js';

const W_PERSONA = 4;
const W_ARCH = 2;

/** Legacy snapshot ids → current roster ids (AUTHORING.md §3). */
const LEGACY_TO_CURRENT = {
  0: 0, 1: 2, 2: 6, 3: 1, 4: 3, 5: 8, 6: 4, 7: 5, 8: 7, 9: 9,
  10: 10, 11: 7, 12: 3, 13: 8, 14: 2,
};

/** Students with no legacy intimacy lines — voice from AUTHORING.md. */
const EXTRA_STUDENT_LINES = {
  11: {
    reaction: [
      `"Vitals are elevated," she murmurs, already clinical about herself. "That's expected."`,
      `She checks your hands the way she'd check a chart — careful, warm, unhurried.`,
    ],
    resistance: `"I should document the baseline first — oh. Never mind the baseline."`,
    encourages: `"Continue. I'm noting everything. Please don't stop."`,
    during: `Soft, measured sounds — she treats pleasure like good charting.`,
    end: `"Aggressive self-care," she says eventually, pleased with the data.`,
  },
  12: {
    reaction: [
      `"You're watching me watch you," she says. "That's the whole dynamic, isn't it?"`,
      `She holds your gaze with unsettling calm. "I've been curious about this."`,
    ],
    resistance: `"I want to name what's happening before we — no. After. We'll name it after."`,
    encourages: `"Tell me what you're perceiving. I want the full subjective report."`,
    during: `She narrates the experience aloud until the analysis dissolves into feeling.`,
    end: `"Fascinating," she breathes. "I have follow-up questions. Later."`,
  },
  13: {
    reaction: [
      `"Well bless your heart," she says warmly, settling in like she's always belonged here.`,
      `She curls close with practiced southern ease. "There you are, sugar."`,
    ],
    resistance: `"Baby, let me just — there. That's better. Don't you dare stop now."`,
    encourages: `"More, honey. I want all of it. You're doing so good."`,
    during: `A long, warm hum — comfort offered and received in equal measure.`,
    end: `"You stay," she says softly. "We don't have anywhere better to be."`,
  },
  14: {
    reaction: [
      `"Feels like harvest season," she says, amused. "All this abundance."`,
      `She leans in with country certainty. "Been thinking about this, honest."`,
    ],
    resistance: `"Hold on — let me catch my breath — okay. Okay, come here."`,
    encourages: `"Like that. Yes. Don't go easy on me."`,
    during: `Breathless, generous sounds — appetite for closeness without apology.`,
    end: `"Worth the wait," she says, satisfied. "Every bit of it."`,
  },
  15: {
    reaction: [
      `She watches you without blinking. "Soon," she says. It isn't a threat.`,
      `A small, amused sound. She already knows how this ends.`,
    ],
    resistance: `She turns her face once — not away. Measuring. Then she doesn't resist.`,
    encourages: `She guides your hand with absolute precision. No words required.`,
    during: `Silence. Then the faintest sound — enough to undo you.`,
    end: `"Good," she says. One word. She sounds like she means you.`,
  },
  16: {
    reaction: [
      `"Heart rate's up," she whispers. "Mine, I mean. I double-checked."`,
      `She adjusts her glasses, then leaves them off. Significant.`,
    ],
    resistance: `"I should verify the dosage — I mean the pacing — oh."`,
    encourages: `"Please continue. The wellness outcomes are favorable."`,
    during: `Precision falls away in layers until only warmth remains.`,
    end: `"No adverse effects," she says, flushed. "I'd like to repeat the trial."`,
  },
  17: {
    reaction: [
      `"Uncharted territory," he says, grinning. "My favorite kind."`,
      `He maps your reaction like a new dig site — delighted, thorough.`,
    ],
    resistance: `"Give me a second to — alright. Lead on, professor."`,
    encourages: `"Keep going. I want the full expedition."`,
    during: `Breathless laughter gives way to something quieter and more honest.`,
    end: `"Worth documenting," he says. "Definitely worth documenting."`,
  },
};

const POOLS = [
  { key: 'intimacy.approach', field: 'reaction', multi: true },
  { key: 'intimacy.resistance', field: 'resistance', multi: false },
  { key: 'intimacy.encourages', field: 'encourages', multi: false },
  { key: 'intimacy.psychVoice', field: 'during', multi: false },
  { key: 'intimacy.climax', field: 'end', multi: false },
];

function esc(s) {
  return JSON.stringify(s);
}

function asTextArray(val) {
  return Array.isArray(val) ? val : [val];
}

function emitVariant(when, texts) {
  return `  { when: ${esc(when)}, weight: ${when.studentId != null ? W_PERSONA : W_ARCH}, text: ${esc(texts)} }`;
}

function buildStudentVariants(pool) {
  const byStudent = new Map();
  for (const [legacyId, lines] of Object.entries(INTIMACY_STUDENT_LINES)) {
    const studentId = LEGACY_TO_CURRENT[Number(legacyId)];
    if (studentId == null) continue;
    const val = lines[pool.field];
    if (!val) continue;
    const texts = asTextArray(val);
    if (!byStudent.has(studentId)) byStudent.set(studentId, []);
    byStudent.get(studentId).push(...texts);
  }
  for (const [studentId, lines] of Object.entries(EXTRA_STUDENT_LINES)) {
    const val = lines[pool.field];
    if (!val) continue;
    const texts = asTextArray(val);
    if (!byStudent.has(Number(studentId))) byStudent.set(Number(studentId), []);
    byStudent.get(Number(studentId)).push(...texts);
  }
  return [...byStudent.entries()].map(([studentId, texts]) =>
    emitVariant({ studentId: [studentId] }, texts),
  );
}

function buildArchetypeVariants(pool) {
  return Object.entries(INTIMACY_ARCHETYPE_LINES).map(([archetype, lines]) => {
    const val = lines[pool.field];
    const texts = asTextArray(val);
    return emitVariant({ archetype: [archetype] }, texts);
  });
}

const blocks = POOLS.map((pool) => {
  const variants = [...buildArchetypeVariants(pool), ...buildStudentVariants(pool)];
  return `registerModuleVariants('${pool.key}', [\n${variants.join(',\n')},\n]);`;
});

const out = [
  '// The Squad — Lead: A2 Psych | Support: A7 Artisan',
  '// Intimacy per-girl + archetype voice — mined from legacyIntimacy.snapshot.js.',
  '// Regenerate: node scripts/generateIntimacyPersonas.mjs',
  "import { registerModuleVariants } from '../../engine.js';",
  "import './depth.js';",
  "import './selectors.js';",
  '',
  ...blocks,
  '',
].join('\n');

writeFileSync('src/textEngine/scenes/intimacy/personas.js', `${out}\n`);
console.log(`generateIntimacyPersonas: wrote personas.js (${POOLS.length} pools)`);
