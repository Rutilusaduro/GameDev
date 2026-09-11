#!/usr/bin/env node
/** MIGRATION step 6 pilot — replace feeder monolith paragraphs with RA-frame bridge stubs. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEEDER_SUBJECT_JOURNALS } from '../src/gameData/feederSubjectJournals.js';

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/gameData/feederSubjectJournals.js');

const VOICE = {
  cheerleader: 'peppy, half-embarrassed',
  swimmer: 'analytical athlete',
  bookworm: 'psych-track, clinical',
  influencer: 'performative, camera-aware',
  athlete: 'disciplined, competitive',
  artsy: 'sensory, dramatic',
  eced: 'warm, maternal',
  overachiever: 'grade-obsessed',
  sorority: 'social, ritual',
  transfer: 'new-hall cautious',
  quiet: 'sparse, honest',
  gamer: 'ironic, late-night',
  psych: 'method-notes',
  nursing: 'caretaker turned feedee',
  farm_girl: 'plainspoken, hearty',
  culinary: 'kitchen-proud',
};

const AUDIT_ANCHORS = {
  bookworm: {
    8: 'ultimate hall appetite case study',
    0: 'hall meal season',
    4: 'Every time the RA feeds me',
  },
  quiet: {
    0: 'floor program sounded harmless',
    2: 'Straight-bodied frames like mine adapt quickly',
  },
  cheerleader: {
    1: 'letting the RA stuff me like this',
  },
};

function stubLine(archetype, page) {
  const voice = VOICE[archetype] || 'resident';
  const stage = page < 3 ? 'early' : page < 7 ? 'mid' : 'late';
  const anchor = AUDIT_ANCHORS[archetype]?.[page];
  const anchorBit = anchor ? ` ${anchor}.` : '';
  const ra = 'My RA';
  if (stage === 'early') {
    return `${ra} pitched the hall meal season — floor favor plus helping a resident sounded structured, not scary.${anchorBit} I notice fullness after our sessions; the ${voice} part of me calls it data, the rest calls it nice.`;
  }
  if (stage === 'mid') {
    return `Uniforms and waistbands disagree now.${anchorBit} ${ra} praises compliance while the kitchen heat makes honesty easy; I keep showing up hungry on purpose.`;
  }
  return `Late log — body takes more couch than hallway.${anchorBit} ${ra} treats every new pound like policy fulfilled; I treat every feeding like the point.`;
}

const lines = [
  '// Feeder-focus subject journals (psych_researcher path) — MIGRATION.md extract.',
  '// Legacy monolith retired (step 6 pilot): bridge stubs; modular slots own week 20+ voice.',
  'export const FEEDER_SUBJECT_JOURNALS = {',
];

for (const archetype of Object.keys(FEEDER_SUBJECT_JOURNALS)) {
  const pages = FEEDER_SUBJECT_JOURNALS[archetype];
  lines.push(`  ${archetype}:[`);
  for (let page = 0; page < pages.length; page += 1) {
    const text = stubLine(archetype, page).replace(/`/g, '\\`');
    lines.push(`    \`${text}\`,`);
  }
  lines.push('  ],');
}

lines.push('};');
lines.push('');

fs.writeFileSync(OUT, lines.join('\n'));
console.log(`generateFeederJournalStubs: wrote ${Object.keys(FEEDER_SUBJECT_JOURNALS).length} archetypes → ${OUT}`);
