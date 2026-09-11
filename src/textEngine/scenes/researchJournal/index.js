// Nadia / feeder-focus subject journals — engine render wrappers (§9d).
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { depthNarrativeAppendChance } from '../../../gameData/mechanicsDepthLayer.js';
import { FEEDER_SUBJECT_JOURNALS, NADIA_SUBJECT_JOURNALS } from '../../../gameData/evolvedForms.js';
import { journalTailBeat } from '../evolved/proseTails.js';

function registerJournalPage(poolKey, prose, seed = poolKey) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const slot = (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : text;
  };
  registerPool(poolKey, [
    {
      when: {},
      weight: 2,
      text: [
        slot,
        journalTailBeat(seed, 0),
        journalTailBeat(seed, 1),
        journalTailBeat(seed, 2),
      ],
    },
  ]);
}

for (const [archetype, entries] of Object.entries(FEEDER_SUBJECT_JOURNALS)) {
  if (!Array.isArray(entries)) continue;
  entries.forEach((text, page) => {
    if (!text) return;
    registerJournalPage(`journal.feeder.${archetype}.s${page}`, text);
  });
}

for (const [archetype, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  if (!journal) continue;
  const intros = Array.isArray(journal.intro) ? journal.intro : [journal.intro];
  intros.forEach((text, level) => {
    if (!text) return;
    registerJournalPage(`journal.nadia.${archetype}.intro.l${level}`, text);
  });
  (journal.entries || []).forEach((row, page) => {
    if (!row) return;
    [0, 1, 2].forEach((level) => {
      const text = row[level];
      if (!text) return;
      registerJournalPage(`journal.nadia.${archetype}.s${page}.l${level}`, text);
    });
  });
}

export function renderFeederJournalEntry(archetype, page, student, week = 1, opts = {}) {
  if (!archetype || page == null) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render(`{journal.feeder.${archetype}.s${page}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'journal', ctx, opts.v2DepthChance ?? depthNarrativeAppendChance(0.22));
}

export function renderNadiaJournalEntry(archetype, page, nadiaLevel, student, week = 1, opts = {}) {
  if (!archetype) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { nadiaLevel: nadiaLevel ?? 0, ...(opts.globals || {}) },
    ...opts,
  });
  let base = '';
  if (page === -1) {
    base = render(`{journal.nadia.${archetype}.intro.l${nadiaLevel ?? 0}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  } else {
    base = render(`{journal.nadia.${archetype}.s${page}.l${nadiaLevel ?? 0}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  }
  return appendV2Depth(base, 'journal', ctx, opts.v2DepthChance ?? depthNarrativeAppendChance(0.22));
}

export const FEEDER_JOURNAL_ARCHETYPES = Object.keys(FEEDER_SUBJECT_JOURNALS);
export const NADIA_JOURNAL_ARCHETYPES = Object.keys(NADIA_SUBJECT_JOURNALS);
