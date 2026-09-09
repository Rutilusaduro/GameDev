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
  'f': '#f8e8f4',
  'x': '#1a1028',
  'o': '#ffffff55',
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
  immobile: [
    '..########..',
    '.##########.',
    '############',
    '############',
    '############',
    '############',
    '############',
    '.##########.',
  ],
};

/** Per-student hair overlay — rows 0–2; h=hair, a=accent highlight, .=body shows through. */
const STUDENT_HAIR = {
  0: ['..hhhhhh..', '.hhhhhhhh.', '..ha..ah..'],
  1: ['.hhhhhhhh.', '..hhhhhh..', '...hhhh...'],
  2: ['..ha....ah.', '.hhhhhhhh.', '..hhhhhh..'],
  3: ['...hhhhhh.', '..hhhhhhhh.', '.hhhhhhhh.'],
  4: ['.hhhhhhhh.', '..hhhhhh..', '...hhhh...'],
  5: ['..hhhhhh..', '.hhhhhhhh.', '..hhhhhh..'],
  6: ['...hhhhhh.', '..hhhhhhhh.', '.hhhhhhhh.'],
  7: ['.hhhhhhhh.', '..hhhhhh..', '...hhhh...'],
  8: ['..hhhhhh..', '.hhhhhhhh.', '..ha..ah..'],
  9: ['.hhhhhhhh.', '..hhhhhh..', '...hhhh...'],
  10: ['..hhhhhh..', '.hhhhhhhh.', '..hhhhhh..'],
  11: ['...hhhhhh.', '..hhhhhhhh.', '.hhhhhhhh.'],
  12: ['.hhhhhhhh.', '..hhhhhh..', '...hhhh...'],
  13: ['..ha..ah..', '.hhhhhhhh.', '..hhhhhh..'],
  14: ['..hhhhhh..', '.hhhhhhhh.', '..hhhhhh..'],
  15: ['hhhhhhhhhh', '.hhhhhhhh.', '..hhhhhh..'],
  16: ['.hhhhhhhh.', '..hhhhhh..', '...hhhh...'],
  17: ['..hhhhhh..', '.hhhhhhhh.', '..ha..ah..'],
  18: ['...hhhhhh.', '..hhhhhhhh.', '.hhhhhhhh.'],
};

/** Per-student face/accessory overlay — rows 0–2; f=feature, x=dark accent, o=highlight. */
const STUDENT_FEATURES = {
  0: ['....ff....', '...ffff...', null],           // Brittany — bow
  1: [null, '..xxxx..', null],                      // Cassidy — glasses
  2: ['..o..o..', '.ffffffff.', null],              // Kylie — glam frame
  3: ['.bbbbbbb.', '..bbbbbb..', null],             // Serena — headband
  4: ['..o....o..', null, null],                     // Fiona — earrings
  5: ['bbbbbbbbbb', null, null],                    // Destiny — headphones
  6: ['.ffffffff.', '..ff..ff..', null],            // Tiffany — polished waves
  7: ['...ffff...', '..ffffff..', null],            // Priya — neat bun
  8: ['hhhhhhhhhh', '.hhhhhhhh.', null],            // Maya — hood
  9: ['..oooooo..', '.oooooooo.', null],            // Chloé — scarf
  10: ['..ffffff..', '.ffffffff.', null],           // Reneé — chef toque hint
  11: ['...ffff...', '..ff..ff..', null],            // Kaylee — cap brim
  12: [null, '..xxxx..', null],                     // Nadia — glasses
  13: ['....ff....', '...ffff...', null],            // Daisy — hair bow
  14: ['oooooooooo', '..oooooo..', null],            // Mary Jane — sun hat
  15: ['f..f..f..f', '.xxxxxxxx.', null],          // Lilith — horns / veil
  16: [null, '..xxxx..', '.xx..xx.'],               // Sophia — goggles
  17: ['oooooooooo', '..oooooo..', null],            // Indiana — fedora
  18: [null, '..xxxx..', '.xx..xx.'],               // Talia — lab goggles
};

function mergeHairRow(bodyRow, hairRow) {
  if (!hairRow) return bodyRow;
  return bodyRow.split('').map((ch, i) => {
    const h = hairRow[i];
    if (h === 'h' || h === 'a') return h;
    return ch;
  }).join('');
}

function mergeFeatureRow(row, featureRow) {
  if (!featureRow) return row;
  return row.split('').map((ch, i) => {
    const f = featureRow[i];
    if (f && f !== '.') return f;
    return ch;
  }).join('');
}

function applyHair(grid, studentId) {
  const hair = STUDENT_HAIR[studentId];
  if (!hair) return grid;
  return grid.map((row, i) => mergeHairRow(row, hair[i]));
}

function applyFeatures(grid, studentId) {
  const feats = STUDENT_FEATURES[studentId];
  if (!feats) return grid;
  return grid.map((row, i) => mergeFeatureRow(row, feats[i]));
}

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
  1: (rows) => rows.map((row, i) => (i <= 2 ? narrowRow(row, 1) : row)),
  2: (rows) => rows.map((row, i) => (i >= 1 && i <= 3 ? widenRow(row, 1) : row)),
  3: (rows) => rows.map((row, i) => (i <= 3 ? narrowRow(row, 1) : i >= 5 ? widenRow(row, 1) : row)),
  4: (rows) => rows.map((row, i) => (i <= 2 ? narrowRow(row, 1) : row)),
  5: (rows) => rows.map((row, i) => (i >= 2 && i <= 5 ? widenRow(row, 1) : row)),
  6: (rows) => rows.map((row, i) => (i >= 1 && i <= 4 ? widenRow(row, 1) : row)),
  7: (rows) => rows.map((row) => narrowRow(row, 1)),
  8: (rows) => rows.map((row, i) => (i >= 4 ? widenRow(row, 1) : row)),
  9: (rows) => rows.map((row, i) => (i >= 2 && i <= 5 ? widenRow(row, 1) : row)),
  10: (rows) => rows.map((row) => widenRow(row, 1)),
  11: (rows) => rows.map((row, i) => (i >= 3 ? widenRow(row, 1) : row)),
  12: (rows) => rows.map((row, i) => (i >= 1 && i <= 3 ? widenRow(row, 1) : row)),
  13: (rows) => rows.map((row, i) => (i >= 4 ? widenRow(row, 1) : row)),
  14: (rows) => rows.map((row, i) => (i >= 2 && i <= 5 ? widenRow(row, 1) : row)),
  15: (rows) => rows.map((row, i) => (i <= 2 ? narrowRow(row, 1) : i >= 5 ? widenRow(row, 1) : row)),
  16: (rows) => rows.map((row, i) => (i >= 3 && i <= 5 ? widenRow(row, 1) : row)),
  17: (rows) => rows.map((row, i) => (i <= 2 ? narrowRow(row, 1) : row)),
  18: (rows) => rows.map((row, i) => (i >= 3 && i <= 5 ? widenRow(row, 1) : row)),
};

/** Archetype rim glow for evolved / supernatural students. */
export const ARCHETYPE_PORTRAIT_GLOW = {
  cheerleader: '#e05090',
  bookworm: '#7090d0',
  influencer: '#f070b0',
  athlete: '#50c070',
  artsy: '#c080e0',
  gamer: '#6080c0',
  sorority: '#e8a0c8',
  overachiever: '#4080c0',
  quiet: '#a070c0',
  transfer: '#d04080',
  culinary: '#d08040',
  nursing: '#e07090',
  psych: '#6060a0',
  eced: '#c47a2a',
  farm_girl: '#d0a050',
  predator: '#402050',
  pharmacy_grad: '#50a0a0',
  explorer: '#a08040',
  inventor: '#4088a0',
};

export function portraitTier(stageId) {
  if (stageId >= 10) return 'immobile';
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
  grid = applyHair(grid, studentId);
  grid = applyFeatures(grid, studentId);
  grid = grid.map((row) => row.replace(/#/g, 'S'));
  return {
    grid,
    accent,
    bodyType,
    tier,
    flip: STUDENT_PORTRAIT_FLIP.has(studentId),
  };
}

export function getArchetypeGlow(archetype) {
  return ARCHETYPE_PORTRAIT_GLOW[archetype] || null;
}

export const PORTRAIT_TIER_LABELS = {
  slim: 'Slender',
  soft: 'Softening',
  chubby: 'Rounded',
  heavy: 'Heavy',
  fat: 'Vast',
  vast: 'Monumental',
  immobile: 'Immobile',
};
