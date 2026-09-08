// ═══════════════════════════════════════════════════════════════
// STUDENT PORTRAITS — pixel silhouettes by weight tier + per-girl accent
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

export function getStudentSprite(stageId, studentId) {
  const tier = portraitTier(stageId);
  const base = TIER_SILHOUETTES[tier];
  const accent = getStudentAccent(studentId);
  // Map accent into palette slot 'a' for this render
  return {
    grid: base.map((row) => row.replace(/#/g, 'S').replace(/\./g, '.')),
    accent,
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
