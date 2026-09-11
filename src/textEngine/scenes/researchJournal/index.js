// Nadia / feeder-focus subject journals — engine render wrappers (§9d).
import { registerPool, render } from '../../engine.js';
import { buildTextContext, wrapLeftoverLinger } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { FEEDER_SUBJECT_JOURNALS, NADIA_SUBJECT_JOURNALS } from '../../../gameData/evolvedForms.js';

for (const [archetype, entries] of Object.entries(FEEDER_SUBJECT_JOURNALS)) {
  if (!Array.isArray(entries)) continue;
  entries.forEach((text, page) => {
    if (!text) return;
    registerPool(`journal.feeder.${archetype}.s${page}`, [
      { when: {}, text: [text] },
    ]);
  });
}

for (const [archetype, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  if (!journal) continue;
  const intros = Array.isArray(journal.intro) ? journal.intro : [journal.intro];
  intros.forEach((text, level) => {
    if (!text) return;
    registerPool(`journal.nadia.${archetype}.intro.l${level}`, [
      { when: {}, text: [text] },
    ]);
  });
  (journal.entries || []).forEach((row, page) => {
    if (!row) return;
    [0, 1, 2].forEach((level) => {
      const text = row[level];
      if (!text) return;
      registerPool(`journal.nadia.${archetype}.s${page}.l${level}`, [
        { when: {}, text: [text] },
      ]);
    });
  });
}

export function renderFeederJournalEntry(archetype, page, student, week = 1, opts = {}) {
  if (!archetype || page == null) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render(`{journal.feeder.${archetype}.s${page}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return wrapLeftoverLinger(appendV2Depth(base, 'journal', ctx, opts.v2DepthChance ?? 0.22), student, week, 'journal.linger');
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
  return wrapLeftoverLinger(appendV2Depth(base, 'journal', ctx, opts.v2DepthChance ?? 0.22), student, week, 'journal.linger');
}

export const FEEDER_JOURNAL_ARCHETYPES = Object.keys(FEEDER_SUBJECT_JOURNALS);
export const NADIA_JOURNAL_ARCHETYPES = Object.keys(NADIA_SUBJECT_JOURNALS);
