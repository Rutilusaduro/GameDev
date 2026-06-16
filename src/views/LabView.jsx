// ═══════════════════════════════════════════════════════════════
// THE LAB — Workshop + Research Terminal + Inventions
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
import { INVENTOR_PATH_STAGES } from '../gameData/talia.js';
import { BREAKTHROUGH_ICON, BREAKTHROUGH_LABEL } from '../gameData/labTechTree.js';
import { RecipeCostDisplay } from '../components/RecipeCostDisplay.jsx';
import { LabTechTree } from '../components/LabTechTree.jsx';
import { CircuitBoardModal } from '../components/CircuitBoardModal.jsx';
import { CIRCUIT_BOARDS } from '../gameData/inventionUpgrades.js';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };
const ACCENT = '#4a6080';

function BlueprintCard({ recipe, labState, taliaStudent, money, onBuild, onOpenCircuit }) {
  const def = DEVICES[recipe.deviceDefId];
  const taliaLbs = taliaStudent?.lbs ?? Infinity;
  const researched = isBlueprintResearched(labState, recipe.blueprint);
  const buildable = isBlueprintBuildable(recipe, labState);
  const afford = canAfford(recipe, labState, money) && taliaLbs >= getMinLbsForBuild(recipe);
  const weightCost = getBuildWeightCost(recipe);
  const minLbs = getMinLbsForBuild(recipe);
  const taliaOk = taliaLbs >= minLbs;
  const rarityColor = RARITY_COLORS[def?.rarity || 'common'];
  const installed = labState?.installedInventions?.[recipe.deviceDefId];
  const hasBoard = !!CIRCUIT_BOARDS[recipe.deviceDefId];

  return (
    <div style={{ ...C.card, marginBottom: 8, opacity: researched ? 1 : 0.55 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontWeight: 700, color: '#90a8c8', fontSize: 12 }}>
          {def?.icon} {def?.label}
          {installed && <span style={{ fontSize: 9, color: '#4a9a5a', marginLeft: 6 }}>✓ built</span>}
        </div>
        <span style={{ ...C.tag(`${rarityColor}30`, rarityColor), fontSize: 8 }}>T{recipe.tier}</span>
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
      {buildable && !installed && (
        <button
          type="button"
          style={{ ...C.btn(afford && taliaOk ? ACCENT : '#442828'), width: '100%', fontSize: 10, marginTop: 6 }}
          disabled={!afford || !taliaOk}
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
      {installed && hasBoard && (
        <button
          type="button"
          style={{ ...C.btn('#6a5088'), width: '100%', fontSize: 10, marginTop: 6 }}
          onClick={() => onOpenCircuit(recipe.deviceDefId)}
        >
          ⚡ Circuit Board
        </button>
      )}
    </div>
  );
}

function CategorySection({ category, labState, taliaStudent, money, onBuild, onOpenCircuit, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  const recipes = category.deviceIds
    .map((id) => BLUEPRINT_RECIPES[id])
    .filter(Boolean);

  return (
    <div style={{ marginBottom: 10 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
          {recipes.map((recipe) => (
            <BlueprintCard
              key={recipe.deviceDefId}
              recipe={recipe}
              labState={labState}
              taliaStudent={taliaStudent}
              money={money}
              onBuild={onBuild}
              onOpenCircuit={onOpenCircuit}
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
  onUnlockCircuit,
  onOpenSession,
  onOpenForceFeeder,
  ap,
  students = [],
}) {
  const [circuitDevice, setCircuitDevice] = useState(null);

  if (!labState) {
    return (
      <div style={{ fontSize: 12, color: '#5a3888', fontStyle: 'italic' }}>
        The lab is locked until Talia evolves into the Inventor path.
      </div>
    );
  }

  const stageMeta = INVENTOR_PATH_STAGES.find((s) => s.id === labState.stage) || INVENTOR_PATH_STAGES[0];

  const installedDeviceIds = useMemo(
    () => Object.entries(labState.installedInventions || {})
      .filter(([, v]) => v)
      .map(([id]) => id),
    [labState.installedInventions],
  );

  return (
    <div>
      <p style={C.secT}>🔧 Talia&apos;s Lab — {stageMeta.label}</p>

      <div style={{ ...C.card, border: `1px solid ${ACCENT}60`, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#8090b0', lineHeight: 1.6, marginBottom: 8 }}>
          {stageMeta.desc}
          {taliaStudent && (
            <div style={{ marginTop: 6 }}>
              Talia: <strong>{Math.round(taliaStudent.lbs)} lbs</strong> build material
              · Instability {labState.instability ?? 0}%
              · Sessions {labState.sessionsRun ?? 0}
              · {BREAKTHROUGH_ICON} {labState.breakthroughs ?? 0} {BREAKTHROUGH_LABEL}
            </div>
          )}
        </div>
        <button
          type="button"
          style={{ ...C.btn(ACCENT), width: '100%', opacity: ap < 1 ? 0.45 : 1 }}
          onClick={onOpenSession}
        >
          Gather Parts (1 AP)
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

      <LabTechTree labState={labState} taliaStudent={taliaStudent} onUnlock={onUnlockTech} />

      {installedDeviceIds.length > 0 && (
        <div style={{ fontSize: 9, letterSpacing: 2, color: '#6a5088', marginBottom: 8, marginTop: 12 }}>
          INSTALLED — MASTERY BOARDS
        </div>
      )}
      {installedDeviceIds.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {installedDeviceIds.filter((id) => CIRCUIT_BOARDS[id]).map((id) => (
            <button
              key={id}
              type="button"
              style={{ ...C.btn('#3a2850'), fontSize: 10 }}
              onClick={() => setCircuitDevice(id)}
            >
              {DEVICES[id]?.icon} {DEVICES[id]?.label || id} Board
            </button>
          ))}
        </div>
      )}

      <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 8 }}>BLUEPRINTS BY CATEGORY</div>
      {DEVICE_BLUEPRINT_CATEGORIES.map((cat, i) => (
        <CategorySection
          key={cat.id}
          category={cat}
          labState={labState}
          taliaStudent={taliaStudent}
          money={money}
          onBuild={onBuild}
          onOpenCircuit={setCircuitDevice}
          defaultOpen={i === 0}
        />
      ))}

      {labState?.installedInventions?.feeding_mask && onOpenForceFeeder && (
        <button
          type="button"
          style={{ ...C.btn('#5818a8'), width: '100%', fontSize: 11, marginBottom: 12 }}
          onClick={onOpenForceFeeder}
        >
          🎭 Run Force Feeder Session
        </button>
      )}

      {circuitDevice && (
        <CircuitBoardModal
          deviceDefId={circuitDevice}
          labState={labState}
          students={students}
          onUnlockNode={onUnlockCircuit}
          onClose={() => setCircuitDevice(null)}
        />
      )}
    </div>
  );
}
