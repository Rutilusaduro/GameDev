// ═══════════════════════════════════════════════════════════════
// MORPHOLOGY — naive inflection rules + irregular maps, exposed as
// render filters (|past |ing |s3 |plural). One lexicon entry serves
// many grammatical positions; never duplicate a variant for tense.
// Corpus verbs are third-person singular (see moveVerbs.js), so verb
// transforms normalize through de3sg() first. Extend the irregular
// maps when a form renders wrong — the lint self-check pins behavior.
// ═══════════════════════════════════════════════════════════════

export const IRREGULAR_PAST = {
  is: 'was', are: 'were', has: 'had', have: 'had', do: 'did', go: 'went',
  come: 'came', sit: 'sat', eat: 'ate', take: 'took', give: 'gave',
  get: 'got', make: 'made', find: 'found', hold: 'held', keep: 'kept',
  leave: 'left', feel: 'felt', stand: 'stood', rise: 'rose', fall: 'fell',
  sink: 'sank', swing: 'swung', spread: 'spread', put: 'put', set: 'set',
  let: 'let', shut: 'shut', hit: 'hit', catch: 'caught', bring: 'brought',
  buy: 'bought', think: 'thought', say: 'said', see: 'saw', run: 'ran',
  begin: 'began', stride: 'strode', slide: 'slid', cling: 'clung',
  wear: 'wore', tear: 'tore', bear: 'bore', draw: 'drew', grow: 'grew',
  know: 'knew', throw: 'threw', sweep: 'swept', creep: 'crept',
  mean: 'meant', lead: 'led', read: 'read', lie: 'lay', lay: 'laid',
  win: 'won', spin: 'spun', stick: 'stuck', shake: 'shook', ride: 'rode',
};

export const IRREGULAR_PLURALS = {
  woman: 'women', man: 'men', foot: 'feet', tooth: 'teeth',
  child: 'children', person: 'people', mouse: 'mice',
  shelf: 'shelves', half: 'halves', life: 'lives', loaf: 'loaves',
};

const IRREGULAR_3SG = { be: 'is', have: 'has', do: 'does', go: 'goes' };

const VOWELS = 'aeiou';

// CVC short-verb final-consonant doubling (pat→patted), skipping w/x/y.
function doublesFinal(w) {
  if (w.length < 3 || w.length > 5) return false;
  const [a, b, c] = [w[w.length - 3], w[w.length - 2], w[w.length - 1]];
  return !VOWELS.includes(a) && VOWELS.includes(b)
    && !VOWELS.includes(c) && !'wxy'.includes(c);
}

/** "waddles"→"waddle", "crosses"→"cross", "carries"→"carry", "goes"→"go". */
export function de3sg(verb) {
  if (/(ss|sh|ch|x|z)es$/.test(verb)) return verb.slice(0, -2);
  if (/oes$/.test(verb)) return verb.slice(0, -2);
  if (/[^aeiou]ies$/.test(verb)) return verb.slice(0, -3) + 'y';
  if (verb.length >= 4 && /[^su]s$/.test(verb)) return verb.slice(0, -1);
  return verb;
}

export function pastTense(verb) {
  const raw = verb.toLowerCase();
  if (IRREGULAR_PAST[raw]) return IRREGULAR_PAST[raw]; // is/has before de3sg
  const v = de3sg(raw);
  if (IRREGULAR_PAST[v]) return IRREGULAR_PAST[v];
  if (v.endsWith('e')) return v + 'd';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ied';
  if (doublesFinal(v)) return v + v[v.length - 1] + 'ed';
  return v + 'ed';
}

export function presentParticiple(verb) {
  const v = de3sg(verb.toLowerCase());
  if (v.endsWith('ie')) return v.slice(0, -2) + 'ying';
  if (v.endsWith('e') && !v.endsWith('ee')) return v.slice(0, -1) + 'ing';
  if (doublesFinal(v)) return v + v[v.length - 1] + 'ing';
  return v + 'ing';
}

export function thirdPerson(verb) {
  const v = verb.toLowerCase();
  if (IRREGULAR_3SG[v]) return IRREGULAR_3SG[v];
  if (/(s|sh|ch|x|z)$/.test(v)) return v + 'es';
  if (/[^aeiou]y$/.test(v)) return v.slice(0, -1) + 'ies';
  return v + 's';
}

export function pluralize(noun) {
  const n = noun.toLowerCase();
  if (IRREGULAR_PLURALS[n]) return IRREGULAR_PLURALS[n];
  if (/(s|sh|ch|x|z)$/.test(n)) return n + 'es';
  if (/[^aeiou]y$/.test(n)) return n.slice(0, -1) + 'ies';
  if (/[^f]f$/.test(n) || n.endsWith('fe')) return n; // leaf-class is unreliable; extend IRREGULAR_PLURALS instead
  return n + 's';
}

function matchCase(original, transformed) {
  return /^[A-Z]/.test(original)
    ? transformed.charAt(0).toUpperCase() + transformed.slice(1)
    : transformed;
}

/** Transform the first word of a phrase (verb filters: |past |ing |s3). */
export function transformFirstWord(text, fn) {
  return text.replace(/^([A-Za-z']+)/, (w) => matchCase(w, fn(w)));
}

/** Transform the last word of a phrase (noun filters: |plural). */
export function transformLastWord(text, fn) {
  return text.replace(/([A-Za-z']+)([^A-Za-z']*)$/, (_, w, tail) => matchCase(w, fn(w)) + tail);
}
