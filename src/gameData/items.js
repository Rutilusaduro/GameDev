// ═══════════════════════════════════════════════════════════════
// INVENTORY — foods & items usable on the girls (basic form)
// Items feed through the stomach model: calories + fullness.
// The pantry restocks with a few random finds each week.
// ═══════════════════════════════════════════════════════════════

export const ITEMS = [
  { id:"protein_shake",  label:"Weight-Gain Shake",   emoji:"🥤", cal:2400,  full:10, rarity:"common",
    desc:"Dense, drinkable, deceptively easy. Slides in under the fullness she'd notice from real food." },
  { id:"donut_box",      label:"Box of a Dozen",      emoji:"🍩", cal:3600,  full:22, rarity:"common",
    desc:"A dozen glazed. Nobody has ever eaten just one, and nobody offered this box intends them to." },
  { id:"family_lasagna", label:"Family-Size Lasagna", emoji:"🫕", cal:5200,  full:34, rarity:"common",
    desc:"Serves six, allegedly. The serving suggestion is a coward's document." },
  { id:"cake_whole",     label:"Whole Celebration Cake", emoji:"🎂", cal:7800, full:42, rarity:"uncommon",
    desc:"Three layers, real buttercream. Cutting a slice is optional; a fork works straight in." },
  { id:"butter_coffee",  label:"Heavy Cream Latte",   emoji:"☕", cal:1400,  full:6,  rarity:"common",
    desc:"Coffee in the technical sense. Cream in every other sense." },
  { id:"snack_crate",    label:"Gourmet Snack Crate", emoji:"📦", cal:4600,  full:26, rarity:"uncommon",
    desc:"An entire subscription box, opened and arranged invitingly. Grazing fuel for a whole afternoon." },
  { id:"feast_platter",  label:"Banquet Platter",     emoji:"🍗", cal:9800,  full:55, rarity:"rare",
    desc:"Catering surplus, officially. A centerpiece feast for one, actually." },
  { id:"gainer_fudge",   label:"Double-Cream Fudge",  emoji:"🍫", cal:6400,  full:18, rarity:"rare",
    desc:"A recipe traded quietly between feeders. Absurd density, almost no bulk. She won't know what hit her." },
  // exploration-only finds (campus secrets & travel)
  { id:"greenhouse_honey_tart", label:"Greenhouse Honey Tart", emoji:"🍯", cal:2200, full:12, rarity:"uncommon", exploration:true,
    desc:"Still warm from a hidden greenhouse bench. Honey forward, buttery, impossible to eat just one slice." },
  { id:"cellar_comfort_loaf", label:"Cellar Comfort Loaf", emoji:"🍞", cal:3400, full:20, rarity:"uncommon", exploration:true,
    desc:"Pre-renovation dining cellar recipe — dense, sweet, cut thick. Feeds a study group or one very committed girl." },
  { id:"trail_ration", label:"Relic Hunter Trail Ration", emoji:"🥾", cal:1800, full:8, rarity:"uncommon", exploration:true,
    desc:"Indiana's preferred field snack: nuts, dried fruit, and a bar that somehow packs diner-level calories." },
  { id:"tunnel_mushroom_stew", label:"Tunnel Mushroom Stew", emoji:"🍄", cal:4100, full:24, rarity:"rare", exploration:true,
    desc:"Bioluminescent fungus simmered with cream. Tastes illegal. Digests enthusiastically." },
  { id:"archives_seed_bread", label:"Archives Seed Bread", emoji:"🌾", cal:2900, full:16, rarity:"rare", exploration:true,
    desc:"Pressed herbs baked into a loaf from a forgotten archive recipe. Crust crackles. Crumb surrenders." },
  { id:"wellness_sample_plate", label:"Wellness Sample Plate", emoji:"🕯️", cal:3600, full:14, rarity:"rare", exploration:true,
    desc:"Corporate wellness branding on the label. The portions are not corporate. Neither is the appetite it awakens." },
];

export const ITEM_RARITY_WEIGHTS = { common: 60, uncommon: 30, rare: 10 };

export const INVENTORY_CONFIG = {
  weeklyDrops: [2, 3],   // items found per week (min, max)
  startingItems: { protein_shake: 2, donut_box: 1, family_lasagna: 1 },
  maxStack: 9,
};

export const rollWeeklyItem = (rng = Math.random) => {
  const total = Object.values(ITEM_RARITY_WEIGHTS).reduce((a, b) => a + b, 0);
  let r = rng() * total;
  let rarity = "common";
  for (const [k, w] of Object.entries(ITEM_RARITY_WEIGHTS)) {
    if (r < w) { rarity = k; break; }
    r -= w;
  }
  const pool = ITEMS.filter(i => i.rarity === rarity);
  return pool[Math.floor(rng() * pool.length)];
};

export const ITEM_USE_LINES = [
  (s, item) => `You produce the ${item.label.toLowerCase()}. ${s.name}'s attention arrives before her objections do.`,
  (s, item) => `"Is that for me?" ${s.name} asks, already reaching. The ${item.label.toLowerCase()} does not survive the hour.`,
  (s, item) => `You leave the ${item.label.toLowerCase()} where ${s.name} will find it. She finds it.`,
];
