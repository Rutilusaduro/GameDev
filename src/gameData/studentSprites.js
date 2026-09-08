// ═══════════════════════════════════════════════════════════════
// STUDENT PORTRAITS — pixel silhouettes by weight tier + body type
// ═══════════════════════════════════════════════════════════════

export const PORTRAIT_PALETTE = {
  '#': '#2a1a30',
  's': '#c8a0b8',
  'S': '#e8c8d8',
  'h': '#8a6080',
  'b': '#6a4868',
  'w': '#f0e8f0',
  'a': '#8a4be0',
  '.': 'transparent',
};

/** Per-student accent (hair / glow) keyed by roster id. */
export const STUDENT_PORTRAIT_ACCENT = {
  0: '#e05090', 1: '#7090d0', 2: '#f070b0', 3: '#50a870', 4: '#c080e0',
  5: '#8090a0', 6: '#e8a0c8', 7: '#4080c0', 8: '#a070c0', 9: '#c04060',
  10: '#d08040', 11: '#e07090', 12: '#6060a0', 13: '#d0a050', 14: '#80b050',
  15: '#402050', 16: '#50a0a0', 17: '#a08040', 18: '#4088a0',
};

const TIER_SILHOUETTES = {
  slim: [
    '....####....',
    '...######...',
    '..########..',
    '.##########.',
    '..########..',
    '...######...',
    '....####....',
    '.....##.....',
  ],
  soft: [
    '....####....',
    '...######...',
    '..########..',
    '.##########.',
    '.##########.',
    '..########..',
    '...######...',
    '....####....',
  ],
  chubby: [
    '...######...',
    '..########..',
    '.##########.',
    '############',
    '############',
    '.##########.',
    '..########..',
    '...######...',
  ],
  heavy: [
    '..########..',
    '.##########.',
    '############',
    '############',
    '############',
    '.##########.',
    '..########..',
    '...######...',
  ],
  fat: [
    '.##########.',
    '############',
    '############',
    '############',
    '############',
    '.##########.',
    '..########..',
    '..########..',
  ],
  vast: [
    '############',
    '############',
    '############',
    '############',
    '############',
    '############',
    '.##########.',
    '.##########.',
  ],
};

/** Body-type silhouette modifiers — widen/narrow specific row bands. */
const BODY_TYPE_MODIFIERS = {
  pear: (rows) => rows.map((row, i) => (i >= 4 ? widenRow(row, 1) : row)),
  hourglass: (rows) => rows.map((row, i) => {
    if (i === 2 || i === 3) return narrowRow(row, 1);
    if (i >= 5) return widenRow(row, 1);
    return row;
  }),
  apple: (rows) => rows.map((row, i) => (i >= 2 && i <= 5 ? widenRow(row, 1) : row)),
  athletic: (rows) => rows.map((row, i) => (i <= 2 ? narrowRow(row, 1) : row)),
  straight: (rows) => rows,
  rotund: (rows) => rows.map((row) => widenRow(row, 1)),
  fertility_goddess: (rows) => rows.map((row, i) => {
    if (i >= 1 && i <= 4) return widenRow(row, 2);
    if (i >= 5) return widenRow(row, 1);
    return row;
  }),
  voluptuous: (rows) => rows.map((row, i) => {
    if (i >= 1 && i <= 3) return widenRow(row, 1);
    if (i >= 5) return widenRow(row, 1);
    return row;
  }),
  mom_bod: (rows) => rows.map((row, i) => (i >= 3 ? widenRow(row, 1) : row)),
};

function widenRow(row, amount = 1) {
  const dots = row.match(/^(\.*)/)?.[1]?.length || 0;
  const body = row.slice(dots);
  const hashCount = (body.match(/#/g) || []).length;
  const newHash = Math.min(12, hashCount + amount * 2);
  const pad = Math.max(0, Math.floor((12 - newHash) / 2));
  return '.'.repeat(pad) + '#'.repeat(newHash) + '.'.repeat(Math.max(0, 12 - pad - newHash));
}

function narrowRow(row, amount = 1) {
  const dots = row.match(/^(\.*)/)?.[1]?.length || 0;
  const body = row.slice(dots);
  const hashCount = (body.match(/#/g) || []).length;
  const newHash = Math.max(4, hashCount - amount * 2);
  const pad = Math.max(0, Math.floor((12 - newHash) / 2));
  return '.'.repeat(pad) + '#'.repeat(newHash) + '.'.repeat(Math.max(0, 12 - pad - newHash));
}

/** Student ids whose portrait is mirrored for visual variety. */
export const STUDENT_PORTRAIT_FLIP = new Set([1, 3, 5, 8, 11, 14, 17]);

/** Per-student row tweaks on top of body-type modifier. */
const STUDENT_SPRITE_TWEAKS = {
  0: (rows) => rows.map((row, i) => (i >= 5 ? widenRow(row, 1) : row)),
  2: (rows) => rows.map((row, i) => (i >= 1 && i <= 3 ? widenRow(row, 1) : row)),
  4: (rows) => rows.map((row, i) => (i <= 2 ? narrowRow(row, 1) : row)),
  7: (rows) => rows.map((row) => narrowRow(row, 1)),
  10: (rows) => rows.map((row) => widenRow(row, 1)),
  13: (rows) => rows.map((row, i) => (i >= 4 ? widenRow(row, 1) : row)),
  16: (rows) => rows.map((row, i) => (i >= 3 && i <= 5 ? widenRow(row, 1) : row)),
};

export function portraitTier(stageId) {
  if (stageId >= 9) return 'vast';
  if (stageId >= 7) return 'fat';
  if (stageId >= 5) return 'heavy';
  if (stageId >= 3) return 'chubby';
  if (stageId >= 1) return 'soft';
  return 'slim';
}

export function getStudentAccent(studentId) {
  return STUDENT_PORTRAIT_ACCENT[studentId] || '#8a4be0';
}

export function getStudentSprite(stageId, studentId, bodyType = 'straight') {
  const tier = portraitTier(stageId);
  const base = TIER_SILHOUETTES[tier];
  const bodyMod = BODY_TYPE_MODIFIERS[bodyType] || BODY_TYPE_MODIFIERS.straight;
  const studentTweak = STUDENT_SPRITE_TWEAKS[studentId];
  const accent = getStudentAccent(studentId);
  let grid = bodyMod(base);
  if (studentTweak) grid = studentTweak(grid);
  grid = grid.map((row) => row.replace(/#/g, 'S'));
  return {
    grid,
    accent,
    bodyType,
    tier,
    flip: STUDENT_PORTRAIT_FLIP.has(studentId),
  };
}

export const PORTRAIT_TIER_LABELS = {
  slim: 'Slender',
  soft: 'Softening',
  chubby: 'Rounded',
  heavy: 'Heavy',
  fat: 'Vast',
  vast: 'Monumental',
};
