// ═══════════════════════════════════════════════════════════════
// THE LAB — Talia's device workshop (sidebar + card grid)
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { DEVICES } from '../gameData/devices.js';
import {
  BLUEPRINT_RECIPES,
  isBlueprintBuildable,
  isBlueprintResearched,
  canAfford,
  getBuildWeightCost,
  getMinLbsForBuild,
  PARTS,
} from '../gameData/labParts.js';
import { DEVICE_BLUEPRINT_CATEGORIES } from '../gameData/deviceCategories.js';
import { INVENTOR_PATH_STAGES, LAB_BUILD_CONFIG } from '../gameData/talia.js';
import { RecipeCostDisplay } from '../components/RecipeCostDisplay.jsx';
import { summarizeDeviceEffect } from '../gameData/deviceQuery.js';
import { isPlayerRecipeUnlocked, playerRecipeForDevice } from '../gameData/playerRecipes.js';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };
const ACCENT = '#4a6080';
const RESEARCH_ACCENT = '#5090c8';

const LAB_SIDEBAR_CATEGORIES = [
  ...DEVICE_BLUEPRINT_CATEGORIES,
  { id: 'attachments', label: 'Attachments', icon: '🔗', deviceIds: ['liquid_fat_infuser', 'calorie_paste_printer', 'predator_capture_module'] },
  { id: 'consumables', label: 'Consumables', icon: '💉', deviceIds: ['growth_serum_injector'] },
  { id: 'campus', label: 'Campus Tools', icon: '📡', deviceIds: ['remote_feeding_system', 'regression_ray'] },
  { id: 'installed', label: 'Installed', icon: '⚙️', deviceIds: ['sleep_feeding_system', 'feeding_mask', 'weight_redistribution_rig', 'living_furniture_rig'] },
  { id: 'player', label: 'Player Inventions', icon: '🎓', deviceIds: [] },
  { id: 'research', label: 'Research', icon: '📐', deviceIds: [] },
];

function blueprintStatus(recipe, labState, money, taliaLbs, unlockCtx) {
  const def = DEVICES[recipe.deviceDefId];
  const playerRecipe = playerRecipeForDevice(recipe.deviceDefId);
  if (playerRecipe && !isPlayerRecipeUnlocked(playerRecipe.id, unlockCtx?.player, unlockCtx)) {
    return { label: 'Locked (recipe)', color: '#806060' };
  }
  const researched = isBlueprintResearched(labState, recipe.blueprint);
  const buildable = isBlueprintBuildable(recipe, labState);
  const afford = canAfford(recipe, labState, money) && taliaLbs >= getMinLbsForBuild(recipe);
  if (!researched) return { label: 'Research available', color: RESEARCH_ACCENT };
  if (!buildable) return { label: 'Locked', color: '#806060' };
  if (!afford) return { label: 'Need resources', color: '#a07050' };
  return { label: 'Craftable', color: '#4a9a5a' };
}

function BlueprintGridCard({ recipe, selected, onSelect, labState, money, taliaLbs, unlockCtx }) {
  const def = DEVICES[recipe.deviceDefId];
  const status = blueprintStatus(recipe, labState, money, taliaLbs, unlockCtx);
  const rarityColor = RARITY_COLORS[def?.rarity || 'common'];

  return (
    <div
      style={{
        ...C.card,
        cursor: 'pointer',
        borderColor: selected ? ACCENT : undefined,
        marginBottom: 0,
      }}
      onClick={() => onSelect(recipe)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontWeight: 700, color: '#90a8c8', fontSize: 12 }}>{def?.icon} {def?.label}</div>
        <span style={{ ...C.tag(`${rarityColor}30`, rarityColor), fontSize: 8 }}>T{recipe.tier}</span>
      </div>
      <div style={{ fontSize: 9, color: status.color, marginBottom: 4 }}>{status.label}</div>
      <div style={{ fontSize: 9, color: '#5a6080', lineHeight: 1.35 }}>
        {summarizeDeviceEffect(def)}
      </div>
    </div>
  );
}

export function LabView({
  labState,
  taliaStudent,
  money,
  onBuild,
  onResearch,
  onOpenSession,
  ap,
  player,
  students,
  pharmacistState,
  campusState,
}) {
  const [categoryId, setCategoryId] = useState('feeding');
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [onlyCraftable, setOnlyCraftable] = useState(false);
  const [onlyResearched, setOnlyResearched] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  if (!labState) {
    return (
      <div style={{ fontSize: 12, color: '#5a3888', fontStyle: 'italic' }}>
        The lab is locked until Talia evolves into the Machine Goddess path.
      </div>
    );
  }

  const stageMeta = INVENTOR_PATH_STAGES.find((s) => s.id === labState.stage) || INVENTOR_PATH_STAGES[0];
  const taliaLbs = taliaStudent?.lbs ?? Infinity;
  const unlockCtx = { player, students, labState, pharmacistState, campusState };
  const category = LAB_SIDEBAR_CATEGORIES.find((c) => c.id === categoryId) || LAB_SIDEBAR_CATEGORIES[0];

  const recipes = useMemo(() => {
    let list = category.deviceIds.map((id) => BLUEPRINT_RECIPES[id]).filter(Boolean);
    if (categoryId === 'player') {
      list = Object.values(BLUEPRINT_RECIPES).filter((r) => DEVICES[r.deviceDefId]?.playerInvention);
    }
    if (categoryId === 'research') {
      list = Object.values(BLUEPRINT_RECIPES).filter((r) => !isBlueprintResearched(labState, r.blueprint));
    }
    if (tierFilter !== 'all') {
      list = list.filter((r) => r.tier === Number(tierFilter));
    }
    if (onlyCraftable) {
      list = list.filter((r) => {
        const researched = isBlueprintResearched(labState, r.blueprint);
        const buildable = isBlueprintBuildable(r, labState);
        const afford = canAfford(r, labState, money) && taliaLbs >= getMinLbsForBuild(r);
        return researched && buildable && afford;
      });
    }
    if (onlyResearched) {
      list = list.filter((r) => isBlueprintResearched(labState, r.blueprint));
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((r) => {
        const def = DEVICES[r.deviceDefId];
        return `${def?.label} ${def?.desc}`.toLowerCase().includes(q);
      });
    }
    return list;
  }, [category, categoryId, tierFilter, onlyCraftable, onlyResearched, search, labState, money, taliaLbs]);

  const preview = selectedRecipe || recipes[0] || null;
  const previewDef = preview ? DEVICES[preview.deviceDefId] : null;
  const previewResearched = preview && isBlueprintResearched(labState, preview.blueprint);
  const previewBuildable = preview && isBlueprintBuildable(preview, labState);
  const previewAfford = preview && canAfford(preview, labState, money) && taliaLbs >= getMinLbsForBuild(preview);

  return (
    <div>
      <p style={C.secT}>🔧 The Lab — {stageMeta.label}</p>

      <div style={{ ...C.card, border: `1px solid ${ACCENT}60`, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#8090b0', lineHeight: 1.6, marginBottom: 8 }}>
          {stageMeta.desc}
          {taliaStudent && (
            <div style={{ marginTop: 6 }}>
              Talia: <strong>{Math.round(taliaStudent.lbs)} lbs</strong> build material
              · Instability {labState.instability ?? 0}%
              · Sessions {labState.sessionsRun ?? 0}
            </div>
          )}
        </div>
        <button
          style={{ ...C.btn(ACCENT), width: '100%', opacity: ap < LAB_BUILD_CONFIG.apCost ? 0.45 : 1 }}
          onClick={onOpenSession}
        >
          Run Lab Session ({LAB_BUILD_CONFIG.apCost} AP)
        </button>
      </div>

      <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 6 }}>PARTS INVENTORY</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {Object.values(PARTS).map((part) => {
          const qty = labState.parts?.[part.id] || 0;
          return (
            <span key={part.id} style={{ ...C.tag(qty > 0 ? `${ACCENT}30` : '#3a202030', qty > 0 ? '#a0b8d8' : '#806060'), fontSize: 9 }}>
              {part.icon} {part.label} ×{qty}
            </span>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 6 }}>CATEGORIES</div>
          {LAB_SIDEBAR_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              style={{
                ...C.btn(categoryId === cat.id ? ACCENT : '#1a2030'),
                width: '100%',
                textAlign: 'left',
                marginBottom: 4,
                fontSize: 10,
              }}
              onClick={() => { setCategoryId(cat.id); setSelectedRecipe(null); }}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>

        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
            <input
              type="search"
              placeholder="Search blueprints…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 120, background: '#0a1020', border: '1px solid #304050', borderRadius: 6, color: '#a0b0c0', padding: '6px 10px', fontSize: 11, fontFamily: 'inherit' }}
            />
            <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)} style={{ ...C.btn('#1a2030'), fontSize: 10 }}>
              <option value="all">All tiers</option>
              {[1, 2, 3].map((t) => <option key={t} value={t}>Tier {t}</option>)}
            </select>
            <label style={{ fontSize: 10, color: '#8090a0', display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="checkbox" checked={onlyCraftable} onChange={(e) => setOnlyCraftable(e.target.checked)} />
              Only craftable
            </label>
            <label style={{ fontSize: 10, color: '#8090a0', display: 'flex', alignItems: 'center', gap: 4 }}>
              <input type="checkbox" checked={onlyResearched} onChange={(e) => setOnlyResearched(e.target.checked)} />
              Only researched
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 10 }}>
            <div style={C.grid2}>
              {recipes.map((recipe) => (
                <BlueprintGridCard
                  key={recipe.deviceDefId}
                  recipe={recipe}
                  selected={preview?.deviceDefId === recipe.deviceDefId}
                  onSelect={setSelectedRecipe}
                  labState={labState}
                  money={money}
                  taliaLbs={taliaLbs}
                  unlockCtx={unlockCtx}
                />
              ))}
              {recipes.length === 0 && (
                <div style={{ fontSize: 11, color: '#5a3888', fontStyle: 'italic', gridColumn: '1 / -1' }}>
                  {categoryId === 'player' ? 'Player inventions unlock via progression recipes.' : 'No blueprints in this category.'}
                </div>
              )}
            </div>

            {preview && previewDef && (
              <div style={{ ...C.card, border: `1px solid ${ACCENT}`, position: 'sticky', top: 0 }}>
                <div style={{ fontWeight: 700, color: '#90b0d0', marginBottom: 6 }}>{previewDef.icon} {previewDef.label}</div>
                <div style={{ fontSize: 10, color: '#8090a8', lineHeight: 1.5, marginBottom: 8 }}>{previewDef.desc}</div>
                <RecipeCostDisplay recipe={preview} labState={labState} money={money} taliaLbs={taliaLbs} />
                {!previewResearched && (
                  <button style={{ ...C.btn(RESEARCH_ACCENT), width: '100%', marginTop: 8 }} onClick={() => onResearch(preview.blueprint)}>
                    📐 Research blueprint
                  </button>
                )}
                {previewResearched && previewBuildable && (
                  <button
                    style={{ ...C.btn(previewAfford ? ACCENT : '#442828'), width: '100%', marginTop: 8 }}
                    disabled={!previewAfford}
                    onClick={() => onBuild(preview.deviceDefId)}
                  >
                    Build (−{getBuildWeightCost(preview)} lbs Talia)
                  </button>
                )}
                {previewResearched && !previewBuildable && (
                  <div style={{ fontSize: 9, color: '#a07050', marginTop: 8, fontStyle: 'italic' }}>Unlock prerequisites first.</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
