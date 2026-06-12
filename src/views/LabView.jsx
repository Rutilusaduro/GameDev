// ═══════════════════════════════════════════════════════════════
// THE LAB — Talia's device workshop
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
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
import { BREAKTHROUGH_ICON, BREAKTHROUGH_LABEL } from '../gameData/labTechTree.js';
import { RecipeCostDisplay } from '../components/RecipeCostDisplay.jsx';
import { LabTechTree } from '../components/LabTechTree.jsx';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };
const ACCENT = '#4a6080';

function BlueprintCard({ recipe, labState, taliaStudent, money, onBuild }) {
  const def = DEVICES[recipe.deviceDefId];
  const researched = isBlueprintResearched(labState, recipe.blueprint);
  const buildable = isBlueprintBuildable(recipe, labState);
  const weightCost = getBuildWeightCost(recipe);
  const minLbs = getMinLbsForBuild(recipe);
  const taliaLbs = taliaStudent?.lbs ?? Infinity;
  const taliaOk = taliaLbs >= minLbs;
  const afford = canAfford(recipe, labState, money) && taliaOk;

  return (
    <div style={{ ...C.card, opacity: researched ? 1 : 0.92, marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontWeight: 700, color: '#90a8c8' }}>{def?.icon} {def?.label}</div>
        <span style={{ ...C.tag(`${RARITY_COLORS[def?.rarity || 'common']}30`, RARITY_COLORS[def?.rarity || 'common']), fontSize: 8 }}>
          tier {recipe.tier}
        </span>
      </div>
      <div style={{ fontSize: 10, color: '#5a6080', marginBottom: 8, lineHeight: 1.4 }}>{def?.desc}</div>
      <RecipeCostDisplay recipe={recipe} labState={labState} money={money} taliaLbs={taliaLbs} />
      {!researched && (
        <div style={{ fontSize: 9, color: '#806050', fontStyle: 'italic', marginBottom: 6, lineHeight: 1.45 }}>
          🔒 Locked — unlock this blueprint in the Research Tech Tree above.
        </div>
      )}
      {researched && !buildable && (
        <div style={{ fontSize: 9, color: '#a07050', fontStyle: 'italic', marginBottom: 6 }}>
          Unlock prerequisites first.
        </div>
      )}
      {buildable && (
        <button
          style={{ ...C.btn(afford ? ACCENT : '#442828'), width: '100%', fontSize: 10, opacity: afford ? 1 : 0.85 }}
          disabled={!afford}
          onClick={() => onBuild(recipe.deviceDefId)}
        >
          Build (−{weightCost} lbs Talia)
        </button>
      )}
      {buildable && !taliaOk && (
        <div style={{ fontSize: 9, color: '#e05040', marginTop: 4 }}>
          Talia needs at least {minLbs} lbs (has {Math.round(taliaLbs)}).
        </div>
      )}
    </div>
  );
}

function CategorySection({ category, labState, taliaStudent, money, onBuild, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  const recipes = category.deviceIds
    .map(id => BLUEPRINT_RECIPES[id])
    .filter(Boolean);

  return (
    <div style={{ marginBottom: 10 }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        style={{
          ...C.btn('#1a2838'),
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: open ? 8 : 0,
          border: `1px solid ${ACCENT}60`,
        }}
      >
        <span style={{ fontWeight: 700, color: '#90b8d8' }}>
          {category.icon} {category.label}
        </span>
        <span style={{ fontSize: 10, color: '#6080a0' }}>{open ? '▾' : '▸'} {recipes.length}</span>
      </button>
      {open && (
        <div style={{ paddingLeft: 4 }}>
          {recipes.map(recipe => (
            <BlueprintCard
              key={recipe.deviceDefId}
              recipe={recipe}
              labState={labState}
              taliaStudent={taliaStudent}
              money={money}
              onBuild={onBuild}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function LabView({
  labState,
  taliaStudent,
  money,
  onBuild,
  onUnlockTech,
  onOpenSession,
  ap,
}) {
  if (!labState) {
    return (
      <div style={{ fontSize: 12, color: '#5a3888', fontStyle: 'italic' }}>
        The lab is locked until Talia evolves into the Machine Goddess path.
      </div>
    );
  }

  const stageMeta = INVENTOR_PATH_STAGES.find(s => s.id === labState.stage) || INVENTOR_PATH_STAGES[0];

  return (
    <div>
      <p style={C.secT}>🔧 The Lab — {stageMeta.label}</p>
      <div style={{ ...C.card, border: `1px solid ${ACCENT}60`, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#8090b0', lineHeight: 1.6, marginBottom: 8 }}>
          {stageMeta.desc}
          {taliaStudent && (
            <div style={{ marginTop: 6 }}>
              Talia: <strong>{Math.round(taliaStudent.lbs)} lbs</strong> available as build material
              · Instability {labState.instability ?? 0}%
              · Sessions {labState.sessionsRun ?? 0}
              · {BREAKTHROUGH_ICON} {labState.breakthroughs ?? 0} {BREAKTHROUGH_LABEL}
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
        {Object.values(PARTS).map(part => {
          const qty = labState.parts?.[part.id] || 0;
          return (
            <span
              key={part.id}
              style={{
                ...C.tag(qty > 0 ? `${ACCENT}30` : '#3a202030', qty > 0 ? '#a0b8d8' : '#806060'),
                fontSize: 9,
              }}
            >
              {part.icon} {part.label} ×{qty}
            </span>
          );
        })}
      </div>

      <LabTechTree labState={labState} onUnlock={onUnlockTech} />

      <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 8 }}>BLUEPRINTS BY CATEGORY</div>
      {DEVICE_BLUEPRINT_CATEGORIES.map((cat, i) => (
        <CategorySection
          key={cat.id}
          category={cat}
          labState={labState}
          taliaStudent={taliaStudent}
          money={money}
          onBuild={onBuild}
          defaultOpen={i === 0}
        />
      ))}
    </div>
  );
}
