// ═══════════════════════════════════════════════════════════════
// THE LAB — Talia's device workshop
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { DEVICES } from '../gameData/devices.js';
import {
  BLUEPRINT_RECIPES,
  formatPartsBag,
  isBlueprintBuildable,
  isBlueprintResearched,
  recipeLabel,
  canAfford,
  getBuildWeightCost,
  getMinLbsForBuild,
} from '../gameData/labParts.js';
import { INVENTOR_PATH_STAGES, LAB_BUILD_CONFIG } from '../gameData/talia.js';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };
const ACCENT = '#4a6080';

export function LabView({
  labState,
  taliaStudent,
  money,
  onBuild,
  onResearch,
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
  const parts = formatPartsBag(labState.parts || {});
  const recipes = Object.values(BLUEPRINT_RECIPES);

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
        {parts.length === 0 ? (
          <span style={{ fontSize: 10, color: '#666', fontStyle: 'italic' }}>No parts — run a lab session.</span>
        ) : parts.map(p => (
          <span key={p.id} style={{ ...C.tag(`${ACCENT}30`, '#a0b8d8'), fontSize: 9 }}>
            {p.icon} {p.label} ×{p.qty}
          </span>
        ))}
      </div>

      <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 8 }}>BLUEPRINTS</div>
      <div style={C.grid2}>
        {recipes.map(recipe => {
          const def = DEVICES[recipe.deviceDefId];
          const researched = isBlueprintResearched(labState, recipe.blueprint);
          const buildable = isBlueprintBuildable(recipe, labState);
          const weightCost = getBuildWeightCost(recipe);
          const minLbs = getMinLbsForBuild(recipe);
          const taliaOk = !taliaStudent || taliaStudent.lbs >= minLbs;
          const afford = canAfford(recipe, labState, money) && taliaOk;
          return (
            <div key={recipe.deviceDefId} style={{ ...C.card, opacity: researched ? 1 : 0.55 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontWeight: 700, color: '#90a8c8' }}>{def?.icon} {def?.label}</div>
                <span style={{ ...C.tag(`${RARITY_COLORS[def?.rarity || 'common']}30`, RARITY_COLORS[def?.rarity || 'common']), fontSize: 8 }}>
                  tier {recipe.tier}
                </span>
              </div>
              <div style={{ fontSize: 10, color: '#5a6080', marginBottom: 8, lineHeight: 1.4 }}>{def?.desc}</div>
              <div style={{ fontSize: 9, color: '#708090', marginBottom: 8 }}>{recipeLabel(recipe)}</div>
              {!researched && (
                <button style={{ ...C.btn('#333'), width: '100%', fontSize: 10, marginBottom: 4 }} onClick={() => onResearch(recipe.blueprint)}>
                  Research blueprint
                </button>
              )}
              {researched && !buildable && (
                <div style={{ fontSize: 9, color: '#a07050', fontStyle: 'italic', marginBottom: 6 }}>
                  Unlock prerequisites first.
                </div>
              )}
              {buildable && (
                <button
                  style={{ ...C.btn(afford ? ACCENT : '#333'), width: '100%', fontSize: 10, opacity: afford ? 1 : 0.5 }}
                  disabled={!afford}
                  onClick={() => onBuild(recipe.deviceDefId)}
                >
                  Build (−{weightCost} lbs Talia)
                </button>
              )}
              {buildable && !taliaOk && (
                <div style={{ fontSize: 9, color: '#c05030', marginTop: 4 }}>
                  Talia needs at least {minLbs} lbs to build this.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
