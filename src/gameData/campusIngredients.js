// ═══════════════════════════════════════════════════════════════
// CAMPUS EXPLORATION — ingredient finds (feeds pharmacist stash)
// ═══════════════════════════════════════════════════════════════
import { INGREDIENTS } from './pharmacistIngredients.js';

export const INGREDIENT_TIERS = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  corrupted: 'Corrupted',
};

/** Exploration finds map to pharmacist ingredient keys. */
export const EXPLORATION_FINDS = [
  // common — many locations
  { id: 'wild_mint', label: 'Wild Mint', icon: '🌿', tier: 'common', grants: { extracts: 1 },
    text: 'You pocket a handful of wild mint from an untended planter.' },
  { id: 'campus_berries', label: 'Campus Berries', icon: '🫐', tier: 'common', grants: { extracts: 1 },
    text: 'Late-season berries along the path — sweet, slightly crushed in your palm.' },
  { id: 'spilled_reagents', label: 'Spilled Reagent Vials', icon: '🧪', tier: 'common', grants: { reagents: 1 },
    text: 'Someone dropped a lab kit near the walkway. You salvage what you can.' },
  { id: 'union_samples', label: 'Wellness Sample Packets', icon: '💊', tier: 'common', grants: { branding: 1 },
    text: 'Abandoned sample packets from a campus wellness table — still sealed.' },
  // uncommon — location-tagged in exploration pools
  { id: 'greenhouse_resin', label: 'Greenhouse Resin', icon: '🌱', tier: 'uncommon', grants: { extracts: 2 },
    text: 'Amber resin scraped from an old greenhouse bench — potent carrier for appetite compounds.' },
  { id: 'theater_costume_dye', label: 'Theater Dye Pigment', icon: '🎭', tier: 'uncommon', grants: { reagents: 2 },
    text: 'Pigment tins in a costume closet — chemical-grade, oddly useful.' },
  { id: 'science_precursor_jar', label: 'Mislabeled Precursor Jar', icon: '⚗️', tier: 'uncommon', grants: { precursors: 2 },
    text: 'A jar marked "SUGAR TRIAL" that absolutely is not sugar.' },
  { id: 'gym_recovery_powder', label: 'Recovery Powder', icon: '🏋️', tier: 'uncommon', grants: { extracts: 2, branding: 1 },
    text: 'Bulk recovery powder behind the juice bar — appetite-forward, unlabeled.' },
  // rare — secrets and quests
  { id: 'archive_herb', label: 'Pressed Archive Herb', icon: '📜', tier: 'rare', grants: { extracts: 3, reagents: 1 },
    text: 'A pressed specimen from a forgotten archive — still aromatic after decades.' },
  { id: 'tunnel_fungus', label: 'Tunnel Fungus', icon: '🍄', tier: 'rare', grants: { precursors: 2, extracts: 2 },
    text: 'Bioluminescent fungus from maintenance tunnels — unstable, valuable.' },
  { id: 'basement_relic', label: 'Basement Relic Shard', icon: '🏺', tier: 'rare', grants: { precursors: 3, reagents: 2 },
    text: 'A ceramic shard with campus insignia predating the current buildings.' },
  // corrupted — high campus impact
  { id: 'cult_tithe_jar', label: 'Cult Tithe Jar', icon: '🕯️', tier: 'corrupted', grants: { supply: 3, extracts: 2 },
    text: 'A jar left at a hidden feeding spot — residue still warm, devotion still sticky.' },
  { id: 'saturated_extract', label: 'Saturated Campus Extract', icon: '👑', tier: 'corrupted', grants: { catalyst: 1, extracts: 3 },
    text: 'Condensed "wellness runoff" from a saturated gathering site. The air tastes sweet.' },
];

const FIND_BY_ID = Object.fromEntries(EXPLORATION_FINDS.map(f => [f.id, f]));

export function getExplorationFind(id) {
  return FIND_BY_ID[id] || null;
}

export function formatExplorationGrant(grants) {
  return Object.entries(grants || {})
    .filter(([, n]) => n > 0)
    .map(([k, n]) => `${INGREDIENTS[k]?.icon || '•'}${n} ${INGREDIENTS[k]?.label || k}`)
    .join(' · ');
}

export function pickExplorationFind(pool, rng = Math.random) {
  if (!pool?.length) return null;
  return pool[Math.floor(rng() * pool.length)];
}

/** Default travel/search pools by tier and campus narrative tier. */
export function travelFindPool(nodeId, campusTier) {
  const common = ['wild_mint', 'campus_berries', 'spilled_reagents'];
  if (campusTier >= 1) common.push('union_samples');
  const byNode = {
    garden: ['greenhouse_resin'],
    theater: ['theater_costume_dye'],
    science_wing: ['science_precursor_jar'],
    gym: ['gym_recovery_powder'],
    library: ['archive_herb'],
  };
  const pool = [...common, ...(byNode[nodeId] || [])];
  if (campusTier >= 2) pool.push('cult_tithe_jar');
  if (campusTier >= 3) pool.push('saturated_extract');
  return pool;
}
