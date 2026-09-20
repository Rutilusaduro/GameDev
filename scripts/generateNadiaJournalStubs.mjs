#!/usr/bin/env node
/** MIGRATION step 6 pilot — NADIA_SUBJECT_JOURNALS monolith → RA-frame stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NADIA_SUBJECT_JOURNALS } from '../src/gameData/nadiaSubjectJournals.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/nadiaSubjectJournals.js');

const INTRO_ANCHOR = {
  swimmer: `Dear Journal,\n\nI've started my private hall log on appetite dynamics for my hall log. There's something fascinating about picking a resident like her — cerebral, disconnected from her body. I want to see how her mind reacts when that flat figure softens.\n\n— Nadia`,
  athlete: `Dear Journal,\n\nI've chosen a dedicated athlete for my hall log — strong, athletic resident, still disciplined and toned. I want to explore what happens when that strength disappears under soft fat.\n\n— Nadia`,
  sorority: `Dear Journal,\n\nI've officially started my private hall log with a bubbly sorority resident for my hall log — social, top-heavy, still energetic. I can't wait to watch her grow heavy in my place.\n\n— Nadia`,
  gamer: `Dear Journal,\n\nI picked Destiny for this project because she's the ultimate gamer resident — lazy, sarcastic, apple-shaped, perfect for clear measurable results for my hall log.\n\n— Nadia`,
  farm_girl: `Dear Journal,\n\nI chose Mary Jane because she's a perfect country-resident type — hardworking, nurturing, voluptuous, built for gaining. This hall log needs strong data.\n\n— Nadia`,
  eced: `Dear Journal,\n\nSession notes for my hall log — I chose a nurturing resident; I love watching this nurturing resident grow heavy in my place. The observation stays professional on paper.\n\n— Nadia`,
};

function stubCell(archetype, kind, stageIdx, levelIdx) {
  if (kind === 'intro' && levelIdx === 0 && INTRO_ANCHOR[archetype]) {
    return INTRO_ANCHOR[archetype];
  }
  if (kind === 'intro') {
    return `Dear Journal,\n\nHall log intro level ${levelIdx} — ${archetype} focus resident. Modular journal slots carry late-semester voice.\n\n— Nadia`;
  }
  return `Hall log beat — ${archetype} stage ${stageIdx + 1}, depth ${levelIdx}. Feeding session logged for my hall log; body change noted.\n\n— Nadia`;
}

const stubbed = {};
for (const [archetype, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  const intro = (journal.intro || []).map((_, li) => stubCell(archetype, 'intro', 0, li));
  const entries = (journal.entries || []).map((row, si) =>
    row.map((_, li) => stubCell(archetype, 'entry', si, li)),
  );
  stubbed[archetype] = { intro, entries };
}

const body = `// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// Nadia feeder-focus subject journals (psych_researcher path).
// Nadia journal stub migration (step 6 pilot) — bridge cells; journalFragments @ week 20+.
// Structure: intro[nadiaLevel], entries[subjectStageIdx][nadiaLevel]
// @migrate diary.nadia.subject.* — decomposition deferred (monolithic journal cells).

export const NADIA_SUBJECT_JOURNALS = ${JSON.stringify(stubbed)};
`;

fs.writeFileSync(OUT, body);
console.log(`generateNadiaJournalStubs: ${Object.keys(stubbed).length} archetypes → ${OUT}`);
