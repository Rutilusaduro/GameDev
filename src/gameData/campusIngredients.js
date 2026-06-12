// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — ingredients & special food finds
// ═══════════════════════════════════════════════════════════════
import { INGREDIENTS } from './pharmacistIngredients.js';
import { ITEMS } from './items.js';

export const INGREDIENT_TIERS = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  corrupted: 'Corrupted',
};

const ITEM_BY_ID = Object.fromEntries(ITEMS.map(i => [i.id, i]));

/** Exploration finds — pharmacist ingredients and/or pantry food. */
export const EXPLORATION_FINDS = [
  { id: 'wild_mint', label: 'Wild Mint', icon: '🌿', tier: 'common', grants: { extracts: 1 },
    text: 'You pocket a handful of wild mint from an untended planter.' },
  { id: 'campus_berries', label: 'Campus Berries', icon: '🫐', tier: 'common', grants: { extracts: 1 },
    text: 'Late-season berries along the path — sweet, slightly crushed in your palm.' },
  { id: 'spilled_reagents', label: 'Spilled Reagent Vials', icon: '🧪', tier: 'common', grants: { reagents: 1 },
    text: 'Someone dropped a lab kit near the walkway. You salvage what you can.' },
  { id: 'union_samples', label: 'Wellness Sample Packets', icon: '💊', tier: 'common', grants: { branding: 1 },
    text: 'Abandoned sample packets from a campus wellness table — still sealed.' },
  { id: 'greenhouse_resin', label: 'Greenhouse Resin', icon: '🌱', tier: 'uncommon', grants: { extracts: 2 },
    text: 'Amber resin scraped from an old greenhouse bench — potent carrier for appetite compounds.' },
  { id: 'theater_costume_dye', label: 'Theater Dye Pigment', icon: '🎭', tier: 'uncommon', grants: { reagents: 2 },
    text: 'Pigment tins in a costume closet — chemical-grade, oddly useful.' },
  { id: 'science_precursor_jar', label: 'Mislabeled Precursor Jar', icon: '⚗️', tier: 'uncommon', grants: { precursors: 2 },
    text: 'A jar marked "SUGAR TRIAL" that absolutely is not sugar.' },
  { id: 'gym_recovery_powder', label: 'Recovery Powder', icon: '🏋️', tier: 'uncommon', grants: { extracts: 2, branding: 1 },
    text: 'Bulk recovery powder behind the juice bar — appetite-forward, unlabeled.' },
  { id: 'archive_herb', label: 'Pressed Archive Herb', icon: '📜', tier: 'rare', grants: { extracts: 3, reagents: 1 },
    text: 'A pressed specimen from a forgotten archive — still aromatic after decades.' },
  { id: 'tunnel_fungus', label: 'Tunnel Fungus', icon: '🍄', tier: 'rare', grants: { precursors: 2, extracts: 2 },
    text: 'Bioluminescent fungus from maintenance tunnels — unstable, valuable.' },
  { id: 'basement_relic', label: 'Basement Relic Shard', icon: '🏺', tier: 'rare', grants: { precursors: 3, reagents: 2 },
    text: 'A ceramic shard with campus insignia predating the current buildings.' },
  { id: 'cult_tithe_jar', label: 'Cult Tithe Jar', icon: '🕯️', tier: 'corrupted', grants: { supply: 3, extracts: 2 },
    text: 'A jar left at a hidden feeding spot — residue still warm, devotion still sticky.' },
  { id: 'saturated_extract', label: 'Saturated Campus Extract', icon: '👑', tier: 'corrupted', grants: { catalyst: 1, extracts: 3 },
    text: 'Condensed "wellness runoff" from a saturated gathering site. The air tastes sweet.' },
  // special food (pantry)
  { id: 'find_honey_tart', label: 'Greenhouse Honey Tart', icon: '🍯', tier: 'uncommon', grants: { foodId: 'greenhouse_honey_tart' },
    text: 'A honey tart cools on a greenhouse bench — whoever left it is gone. You are not.' },
  { id: 'find_comfort_loaf', label: 'Cellar Comfort Loaf', icon: '🍞', tier: 'uncommon', grants: { foodId: 'cellar_comfort_loaf' },
    text: 'A wrapped loaf waits in a brick cellar niche, still faintly warm from someone\'s batch bake.' },
  { id: 'find_trail_ration', label: 'Trail Ration', icon: '🥾', tier: 'uncommon', grants: { foodId: 'trail_ration' },
    text: 'A field ration pack — nuts, fruit leather, and a calorie bar marked with archaeology club initials.' },
  { id: 'find_mushroom_stew', label: 'Tunnel Mushroom Stew', icon: '🍄', tier: 'rare', grants: { foodId: 'tunnel_mushroom_stew' },
    text: 'Someone left a thermos of mushroom stew by a tunnel grate. It glows faintly. You take it anyway.' },
  { id: 'find_seed_bread', label: 'Archives Seed Bread', icon: '🌾', tier: 'rare', grants: { foodId: 'archives_seed_bread' },
    text: 'Seed bread from a misfiled archive recipe — crust crackling, crumb impossibly soft.' },
  { id: 'find_wellness_plate', label: 'Wellness Sample Plate', icon: '🕯️', tier: 'corrupted', grants: { foodId: 'wellness_sample_plate' },
    text: 'A wellness sample plate abandoned at a feeding nook — portions too generous to be accidental.' },
];

const FIND_BY_ID = Object.fromEntries(EXPLORATION_FINDS.map(f => [f.id, f]));

export function getExplorationFind(id) {
  return FIND_BY_ID[id] || null;
}

export function getExplorationFoodItem(foodId) {
  return ITEM_BY_ID[foodId] || null;
}

export function formatExplorationGrant(grants) {
  const parts = [];
  for (const [k, v] of Object.entries(grants || {})) {
    if (!v) continue;
    if (k === 'foodId') {
      const item = ITEM_BY_ID[v];
      parts.push(item ? `${item.emoji} ${item.label}` : v);
    } else if (INGREDIENTS[k]) {
      parts.push(`${INGREDIENTS[k].icon}${v} ${INGREDIENTS[k].label}`);
    }
  }
  return parts.join(' · ');
}

export function pickExplorationFind(pool, rng = Math.random) {
  if (!pool?.length) return null;
  return pool[Math.floor(rng() * pool.length)];
}

/** Travel/search loot pools — ingredients and special foods. */
export function travelFindPool(nodeId, campusTier) {
  const pool = ['wild_mint', 'campus_berries', 'spilled_reagents', 'find_honey_tart', 'find_trail_ration'];
  if (campusTier >= 1) pool.push('union_samples', 'find_comfort_loaf');
  const byNode = {
    garden: ['greenhouse_resin', 'find_honey_tart'],
    theater: ['theater_costume_dye'],
    science_wing: ['science_precursor_jar'],
    gym: ['gym_recovery_powder', 'find_mushroom_stew'],
    library: ['archive_herb', 'find_seed_bread'],
    dining_hall: ['find_comfort_loaf'],
    student_union: ['find_wellness_plate'],
  };
  pool.push(...(byNode[nodeId] || []));
  if (campusTier >= 2) pool.push('cult_tithe_jar', 'find_wellness_plate');
  if (campusTier >= 3) pool.push('saturated_extract');
  return pool;
}
