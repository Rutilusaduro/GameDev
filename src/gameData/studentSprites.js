// ═══════════════════════════════════════════════════════════════
// STUDENT PORTRAITS — pixel silhouettes by weight tier
// ═══════════════════════════════════════════════════════════════

export const PORTRAIT_PALETTE = {
  '#': '#2a1a30',
  's': '#c8a0b8',
  'S': '#e8c8d8',
  'h': '#8a6080',
  'b': '#6a4868',
  'w': '#f0e8f0',
  '.': 'transparent',
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

export function getStudentSprite(stageId) {
  const tier = portraitTier(stageId);
  const base = TIER_SILHOUETTES[tier];
  return base.map((row) =>
    row.replace(/#/g, 'S').replace(/\./g, '.'),
  );
}

export const PORTRAIT_TIER_LABELS = {
  slim: 'Slender',
  soft: 'Softening',
  chubby: 'Rounded',
  heavy: 'Heavy',
  fat: 'Vast',
  vast: 'Monumental',
};
