// ═══════════════════════════════════════════════════════════════
// LILITH PIXEL ART — procedural sprite grids, slim through Blob
// Grids are generated once at module load from composed ellipses so
// every tier keeps her round, soft, and consistent. Blob tier echoes
// the classic "filled the room" composition: one enormous pale belly,
// a small head riding the top of the mass, stretched top, peeking feet.
// ═══════════════════════════════════════════════════════════════

export const LILITH_PALETTE = {
  H: "#181020", // hair — black with a violet depth
  h: "#2e1c40", // hair sheen
  S: "#e9c9b5", // skin
  D: "#caa08c", // skin shadow
  B: "#f4ddc8", // belly highlight
  R: "#7a1430", // top — deep wine red
  r: "#a02844", // top highlight
  P: "#2a1034", // skirt / dark
  E: "#43c8f0", // eyes — pale ice
  L: "#c03858", // lips
  n: "#b98f7c", // navel
};

const W = 32, H = 32;

const blank = () => Array.from({ length: H }, () => Array(W).fill("."));

const ell = (g, cx, cy, rx, ry, ch) => {
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry;
    if (dx * dx + dy * dy <= 1) g[y][x] = ch;
  }
};

// shade the lower-right rim of an ellipse (keeps the round read)
const rim = (g, cx, cy, rx, ry, ch, from = 0.72) => {
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const dx = (x - cx) / rx, dy = (y - cy) / ry;
    const d = dx * dx + dy * dy;
    if (d <= 1 && d >= from && (dx > 0.15 || dy > 0.25) && g[y][x] !== ".") g[y][x] = ch;
  }
};

const put = (g, x, y, ch) => {
  const xi = Math.round(x), yi = Math.round(y);
  if (yi >= 0 && yi < H && xi >= 0 && xi < W) g[yi][xi] = ch;
};

// head + face; hx,hy = head centre, r = head radius
const head = (g, hx, hy, r = 3) => {
  ell(g, hx, hy, r + 0.4, r + 0.4, "S");
  // hair: cap over the top, long fall behind shoulders
  ell(g, hx, hy - 1.2, r + 1.2, r * 0.95, "H");
  ell(g, hx - r - 0.6, hy + 1.2, 1.3, r + 0.6, "H");
  ell(g, hx + r + 0.6, hy + 1.2, 1.3, r + 0.6, "H");
  ell(g, hx, hy - 1.7, r * 0.8, r * 0.45, "h");
  // face window back over the hair fringe
  ell(g, hx, hy + 0.8, r - 0.6, r - 0.7, "S");
  put(g, hx - 1, hy + 1, "E"); put(g, hx + 1, hy + 1, "E");
  put(g, hx, hy + 2, "L");
  // neck
  ell(g, hx, hy + r + 0.9, 1.1, 1.2, "S");
};

const stamp = (g) => g.map(row => row.join(""));

// ── Tier 0 — slim (stages 0-1) ────────────────────────────────
const t0 = () => {
  const g = blank();
  // legs
  ell(g, 14.5, 25, 1.4, 5, "S"); ell(g, 17.5, 25, 1.4, 5, "S");
  rim(g, 14.5, 25, 1.4, 5, "D"); rim(g, 17.5, 25, 1.4, 5, "D");
  // waist + torso in top
  ell(g, 16, 14.5, 3.0, 3.6, "R");
  ell(g, 16, 12.6, 3.6, 1.9, "R"); // bust line
  ell(g, 14.8, 12.3, 1.4, 1.1, "r");
  // hips + skirt
  ell(g, 16, 19.5, 4.2, 2.8, "P");
  // arms
  ell(g, 11.6, 15, 1.0, 3.4, "S"); ell(g, 20.4, 15, 1.0, 3.4, "S");
  head(g, 16, 6.5, 3);
  return stamp(g);
};

// ── Tier 1 — soft (stages 2-3) ────────────────────────────────
const t1 = () => {
  const g = blank();
  ell(g, 14, 25.5, 1.8, 4.6, "S"); ell(g, 18, 25.5, 1.8, 4.6, "S");
  rim(g, 14, 25.5, 1.8, 4.6, "D"); rim(g, 18, 25.5, 1.8, 4.6, "D");
  ell(g, 16, 14.6, 4.0, 3.8, "R");
  ell(g, 16, 19.8, 5.4, 3.2, "P");
  // a soft tummy peeks below the hem
  ell(g, 16, 17.2, 3.0, 1.7, "S"); rim(g, 16, 17.2, 3.0, 1.7, "D");
  ell(g, 16, 12.4, 4.4, 2.1, "R");
  ell(g, 14.4, 12.1, 1.6, 1.2, "r");
  ell(g, 10.9, 15, 1.2, 3.6, "S"); ell(g, 21.1, 15, 1.2, 3.6, "S");
  head(g, 16, 6.5, 3);
  return stamp(g);
};

// ── Tier 2 — heavy (stages 4-5) ───────────────────────────────
const t2 = () => {
  const g = blank();
  ell(g, 13.5, 26, 2.2, 4.2, "S"); ell(g, 18.5, 26, 2.2, 4.2, "S");
  rim(g, 13.5, 26, 2.2, 4.2, "D"); rim(g, 18.5, 26, 2.2, 4.2, "D");
  ell(g, 16, 20.6, 6.6, 3.6, "P");
  // round belly, proudly past the hem
  ell(g, 16, 17.6, 5.0, 3.4, "S");
  ell(g, 14.6, 16.4, 2.2, 1.4, "B");
  rim(g, 16, 17.6, 5.0, 3.4, "D");
  put(g, 16, 18, "n");
  // bust
  ell(g, 16, 12.6, 5.2, 2.7, "R");
  ell(g, 14.2, 12.2, 1.9, 1.4, "r");
  ell(g, 10.0, 15.4, 1.4, 3.8, "S"); ell(g, 22.0, 15.4, 1.4, 3.8, "S");
  head(g, 16, 6.3, 3);
  return stamp(g);
};

// ── Tier 3 — massive (stages 6-7) ─────────────────────────────
const t3 = () => {
  const g = blank();
  ell(g, 13, 27, 2.6, 3.4, "S"); ell(g, 19, 27, 2.6, 3.4, "S");
  rim(g, 13, 27, 2.6, 3.4, "D"); rim(g, 19, 27, 2.6, 3.4, "D");
  ell(g, 16, 22.4, 8.2, 3.8, "P");
  // the belly is the figure now
  ell(g, 16, 18.4, 7.2, 4.8, "S");
  ell(g, 13.8, 16.6, 3.0, 1.9, "B");
  rim(g, 16, 18.4, 7.2, 4.8, "D");
  put(g, 16, 19, "n"); put(g, 17, 19, "n");
  ell(g, 16, 12.4, 6.6, 3.1, "R");
  ell(g, 13.6, 11.9, 2.3, 1.6, "r");
  ell(g, 8.6, 15.6, 1.7, 4.0, "S"); ell(g, 23.4, 15.6, 1.7, 4.0, "S");
  head(g, 16, 6.0, 3);
  return stamp(g);
};

// ── Tier 4 — immense (stages 8-9), grounded ───────────────────
const t4 = () => {
  const g = blank();
  // one great seated mass
  ell(g, 16, 20.5, 10.4, 8.2, "S");
  ell(g, 12.6, 16.6, 4.4, 3.2, "B");
  rim(g, 16, 20.5, 10.4, 8.2, "D", 0.8);
  put(g, 16, 21, "n"); put(g, 17, 21, "n");
  // feet peeking from under the mass
  ell(g, 10, 28.6, 2.0, 1.2, "D"); ell(g, 22, 28.6, 2.0, 1.2, "D");
  // the top, stretched over the upper slope
  ell(g, 16, 12.6, 7.6, 3.4, "R");
  ell(g, 13.2, 12.0, 2.6, 1.7, "r");
  // small arms resting on the sides of the bulk
  ell(g, 7.4, 16.4, 1.8, 3.0, "S"); ell(g, 24.6, 16.4, 1.8, 3.0, "S");
  head(g, 16, 6.0, 3);
  return stamp(g);
};

// ── Tier 5 — BLOB (stage 10+), the reference composition ──────
const t5 = () => {
  const g = blank();
  // the mass fills the canvas: a vast teardrop, widest at the base
  ell(g, 16, 22, 14.4, 9.4, "S");
  ell(g, 16, 16.5, 11.6, 7.2, "S");
  // enormous pale belly front
  ell(g, 17, 21.5, 9.6, 6.4, "B");
  rim(g, 16, 22, 14.4, 9.4, "D", 0.82);
  // navel, low and central on the great curve
  put(g, 17, 23, "n"); put(g, 18, 23, "n");
  // stretched wine-red top clinging to the upper slope, fighting for coverage
  ell(g, 13.5, 11.8, 8.0, 3.6, "R");
  ell(g, 10.8, 11.0, 2.8, 1.8, "r");
  ell(g, 17.5, 13.4, 4.4, 2.2, "R"); // riding up over the swell
  // tiny hands resting on top of her own expanse
  ell(g, 4.6, 17.2, 1.5, 2.0, "S"); ell(g, 27.4, 17.2, 1.5, 2.0, "S");
  rim(g, 4.6, 17.2, 1.5, 2.0, "D", 0.5); rim(g, 27.4, 17.2, 1.5, 2.0, "D", 0.5);
  // feet: small, far apart, peeking from under the base
  ell(g, 7.5, 30.2, 2.0, 1.1, "D"); ell(g, 24.5, 30.2, 2.0, 1.1, "D");
  // small head riding atop the mass, slightly left — like the reference
  head(g, 13, 5.4, 2.8);
  return stamp(g);
};

export const LILITH_SPRITES = [t0(), t1(), t2(), t3(), t4(), t5()];

// stage id (0-11) → sprite tier index
export const lilithSpriteTier = (stageId) =>
  stageId <= 1 ? 0 : stageId <= 3 ? 1 : stageId <= 5 ? 2 : stageId <= 7 ? 3 : stageId <= 9 ? 4 : 5;

export const LILITH_TIER_LABELS = ["Slim", "Soft", "Heavy", "Massive", "Immense", "Blob"];
