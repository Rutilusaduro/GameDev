// ═══════════════════════════════════════════════════════════════
// THE LAB — Workshop + Research Terminal
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
import {
  RESEARCH_BRANCHES,
  nodesForBranch,
  canResearchNode,
  researchPrereqsMet,
  EXPERIMENT_SESSION_COST,
} from '../gameData/researchTree.js';
import {
  getUpgradeLevel,
  nextUpgradeDef,
  canPurchaseUpgrade,
} from '../gameData/inventionUpgrades.js';
import { isForceFeederInstalled } from '../gameData/forceFeederEvent.js';
import { RecipeCostDisplay } from '../components/RecipeCostDisplay.jsx';
import { summarizeDeviceEffect } from '../gameData/deviceQuery.js';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };
const ACCENT = '#4a6080';
const RESEARCH_ACCENT = '#5090c8';
const TERMINAL_ACCENT = '#6a5088';

function blueprintStatus(recipe, labState, money, taliaLbs) {
  const researched = isBlueprintResearched(labState, recipe.blueprint);
  const buildable = isBlueprintBuildable(recipe, labState);
  const afford = canAfford(recipe, labState, money) && taliaLbs >= getMinLbsForBuild(recipe);
  if (!researched) return { label: 'Needs research', color: RESEARCH_ACCENT };
  if (!buildable) return { label: 'Locked', color: '#806060' };
  if (!afford) return { label: 'Need resources', color: '#a07050' };
  return { label: 'Craftable', color: '#4a9a5a' };
}

function BlueprintGridCard({ recipe, selected, onSelect, labState, money, taliaLbs }) {
  const def = DEVICES[recipe.deviceDefId];
  const status = blueprintStatus(recipe, labState, money, taliaLbs);
  const rarityColor = RARITY_COLORS[def?.rarity || 'common'];
  const installed = labState?.installedInventions?.[recipe.deviceDefId];

  return (
    <div
      style={{ ...C.card, cursor: 'pointer', borderColor: selected ? ACCENT : undefined, marginBottom: 0 }}
      onClick={() => onSelect(recipe)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontWeight: 700, color: '#90a8c8', fontSize: 12 }}>{def?.icon} {def?.label}</div>
        <span style={{ ...C.tag(`${rarityColor}30`, rarityColor), fontSize: 8 }}>T{recipe.tier}</span>
      </div>
      <div style={{ fontSize: 9, color: status.color, marginBottom: 4 }}>
        {installed ? 'Installed in lab' : status.label}
      </div>
      <div style={{ fontSize: 9, color: '#5a6080', lineHeight: 1.35 }}>{summarizeDeviceEffect(def)}</div>
    </div>
  );
}

function ResearchNodeCard({ node, labState, taliaStudent, selected, onSelect }) {
  const researched = isBlueprintResearched(labState, node.blueprint);
  const prereqs = researchPrereqsMet(node, labState, taliaStudent);
  const affordable = canResearchNode(node, labState, taliaStudent);
  const statusColor = researched ? '#4a9a5a' : affordable ? RESEARCH_ACCENT : prereqs ? '#a07050' : '#806060';
  const statusLabel = researched ? 'Unlocked' : affordable ? 'Experiment ready' : prereqs ? 'Need abundance/materials' : 'Locked';

  return (
    <div
      style={{ ...C.card, cursor: 'pointer', borderColor: selected ? TERMINAL_ACCENT : undefined, marginBottom: 0 }}
      onClick={() => onSelect(node)}
    >
      <div style={{ fontWeight: 700, color: '#b0a0d0', fontSize: 11, marginBottom: 4 }}>{node.label}</div>
      <div style={{ fontSize: 9, color: statusColor }}>{statusLabel}</div>
      {!researched && (
        <div style={{ fontSize: 8, color: '#7060a0', marginTop: 4 }}>
          {node.experimentCost + EXPERIMENT_SESSION_COST.abundance} abundance · risk {(node.riskChance * 100).toFixed(0)}%
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
  onResearch,
  onExperiment,
  onPurchaseUpgrade,
  onUseForceFeeder,
  onOpenSession,
  labStage = 1,
  ap,
}) {
  const [labTab, setLabTab] = useState('workshop');
  const [categoryId, setCategoryId] = useState('equipable');
  const [branchId, setBranchId] = useState('feeding_force');
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  if (!labState) {
    return (
      <div style={{ fontSize: 12, color: '#5a3888', fontStyle: 'italic' }}>
        The lab is locked until Talia evolves into the Inventor path.
      </div>
    );
  }

  const stageMeta = INVENTOR_PATH_STAGES.find((s) => s.id === labState.stage) || INVENTOR_PATH_STAGES[0];
  const taliaLbs = taliaStudent?.lbs ?? Infinity;
  const category = DEVICE_BLUEPRINT_CATEGORIES.find((c) => c.id === categoryId) || DEVICE_BLUEPRINT_CATEGORIES[0];
  const forceFeederInstalled = isForceFeederInstalled(labState);
  const ffUpgradeLevel = getUpgradeLevel(labState, 'feeding_mask');
  const ffNextUpgrade = nextUpgradeDef('feeding_mask', ffUpgradeLevel);

  const recipes = useMemo(() => {
    let list = category.deviceIds.map((id) => BLUEPRINT_RECIPES[id]).filter(Boolean);
    if (tierFilter !== 'all') list = list.filter((r) => r.tier === Number(tierFilter));
    if (onlyCraftable) {
      list = list.filter((r) => {
        const researched = isBlueprintResearched(labState, r.blueprint);
        const buildable = isBlueprintBuildable(r, labState);
        const afford = canAfford(r, labState, money) && taliaLbs >= getMinLbsForBuild(r);
        return researched && buildable && afford;
      });
    }
    if (onlyResearched) list = list.filter((r) => isBlueprintResearched(labState, r.blueprint));
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter((r) => {
        const def = DEVICES[r.deviceDefId];
        return `${def?.label} ${def?.desc}`.toLowerCase().includes(q);
      });
    }
    return list;
  }, [category, tierFilter, onlyCraftable, onlyResearched, search, labState, money, taliaLbs]);

  const branchNodes = useMemo(() => nodesForBranch(branchId), [branchId]);
  const preview = selectedRecipe || recipes[0] || null;
  const previewDef = preview ? DEVICES[preview.deviceDefId] : null;
  const previewResearched = preview && isBlueprintResearched(labState, preview.blueprint);
  const previewBuildable = preview && isBlueprintBuildable(preview, labState);
  const previewAfford = preview && canAfford(preview, labState, money) && taliaLbs >= getMinLbsForBuild(preview);
  const previewInstalled = preview && labState.installedInventions?.[preview.deviceDefId];
  const nodePreview = selectedNode || branchNodes[0] || null;
  const nodeResearched = nodePreview && isBlueprintResearched(labState, nodePreview.blueprint);
  const nodeCanExperiment = nodePreview && canResearchNode(nodePreview, labState, taliaStudent);

  return (
    <div>
      <p style={C.secT}>🔧 Talia&apos;s Lab — {stageMeta.label}</p>

      <div style={{ ...C.card, border: `1px solid ${ACCENT}60`, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#8090b0', lineHeight: 1.6, marginBottom: 8 }}>
          {stageMeta.desc}
          {taliaStudent && (
            <div style={{ marginTop: 6 }}>
              Talia: <strong>{Math.round(taliaStudent.lbs)} lbs</strong> build material
              · Abundance <strong>{labState.abundancePoints ?? 0}</strong>
              · Instability {labState.instability ?? 0}%
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <button
            style={{ ...C.btn(labTab === 'workshop' ? ACCENT : '#1a2030'), flex: 1 }}
            onClick={() => setLabTab('workshop')}
          >
            🔩 Workshop
          </button>
          <button
            style={{ ...C.btn(labTab === 'terminal' ? TERMINAL_ACCENT : '#1a2030'), flex: 1 }}
            onClick={() => setLabTab('terminal')}
          >
            🖥 Research Terminal
          </button>
        </div>
        <button
          style={{ ...C.btn(ACCENT), width: '100%', opacity: ap < 1 ? 0.45 : 1 }}
          onClick={onOpenSession}
        >
          Gather Parts (1 AP) — +2 Abundance
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

      {labTab === 'workshop' && (
        <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 6 }}>CATEGORIES</div>
            {DEVICE_BLUEPRINT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                style={{ ...C.btn(categoryId === cat.id ? ACCENT : '#1a2030'), width: '100%', textAlign: 'left', marginBottom: 4, fontSize: 10 }}
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
                  />
                ))}
              </div>
              {preview && previewDef && (
                <div style={{ ...C.card, border: `1px solid ${ACCENT}`, position: 'sticky', top: 0 }}>
                  <div style={{ fontWeight: 700, color: '#90b0d0', marginBottom: 6 }}>{previewDef.icon} {previewDef.label}</div>
                  <div style={{ fontSize: 10, color: '#8090a8', lineHeight: 1.5, marginBottom: 8 }}>{previewDef.desc}</div>
                  <RecipeCostDisplay recipe={preview} labState={labState} money={money} taliaLbs={taliaLbs} />
                  {!previewResearched && (
                    <div style={{ fontSize: 9, color: RESEARCH_ACCENT, marginTop: 8, fontStyle: 'italic' }}>
                      Unlock via Research Terminal first.
                    </div>
                  )}
                  {previewResearched && previewBuildable && !previewInstalled && (
                    <button
                      style={{ ...C.btn(previewAfford ? ACCENT : '#442828'), width: '100%', marginTop: 8 }}
                      disabled={!previewAfford}
                      onClick={() => onBuild(preview.deviceDefId)}
                    >
                      {previewDef.inventionKind === 'event' ? 'Install in lab' : 'Build'}
                      {' '}(−{getBuildWeightCost(preview)} lbs Talia)
                    </button>
                  )}
                  {previewInstalled && (
                    <div style={{ fontSize: 9, color: '#4a9a5a', marginTop: 8 }}>Already installed / built.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {labTab === 'terminal' && (
        <div>
          {forceFeederInstalled && (
            <div style={{ ...C.card, border: `1px solid ${TERMINAL_ACCENT}60`, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, color: '#c0a8e0', marginBottom: 6 }}>🎭 Force Feeder — installed</div>
              <div style={{ fontSize: 10, color: '#9080b0', marginBottom: 8 }}>
                Upgrade tier {ffUpgradeLevel}/3
                {ffNextUpgrade && ` · Next: ${ffNextUpgrade.label}`}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button style={{ ...C.btn(TERMINAL_ACCENT), flex: 1, minWidth: 140 }} onClick={onUseForceFeeder}>
                  Use Force Feeder
                </button>
                {ffNextUpgrade && (
                  <button
                    style={{ ...C.btn(canPurchaseUpgrade(labState, 'feeding_mask') ? '#4a6080' : '#302030'), flex: 1, minWidth: 140 }}
                    disabled={!canPurchaseUpgrade(labState, 'feeding_mask')}
                    onClick={() => onPurchaseUpgrade('feeding_mask')}
                  >
                    Upgrade: {ffNextUpgrade.label}
                  </button>
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: TERMINAL_ACCENT, marginBottom: 6 }}>BRANCHES</div>
              {RESEARCH_BRANCHES.map((branch) => (
                <button
                  key={branch.id}
                  style={{ ...C.btn(branchId === branch.id ? TERMINAL_ACCENT : '#1a1830'), width: '100%', textAlign: 'left', marginBottom: 4, fontSize: 10 }}
                  onClick={() => { setBranchId(branch.id); setSelectedNode(null); }}
                >
                  {branch.icon} {branch.label}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, color: '#8070a0', marginBottom: 8, lineHeight: 1.5 }}>
                {RESEARCH_BRANCHES.find((b) => b.id === branchId)?.desc}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 10 }}>
                <div style={C.grid2}>
                  {branchNodes.map((node) => (
                    <ResearchNodeCard
                      key={node.id}
                      node={node}
                      labState={labState}
                      taliaStudent={taliaStudent}
                      selected={nodePreview?.id === node.id}
                      onSelect={setSelectedNode}
                    />
                  ))}
                </div>
                {nodePreview && (
                  <div style={{ ...C.card, border: `1px solid ${TERMINAL_ACCENT}`, position: 'sticky', top: 0 }}>
                    <div style={{ fontWeight: 700, color: '#c0b0e0', marginBottom: 6 }}>{nodePreview.label}</div>
                    <div style={{ fontSize: 9, color: '#8070a0', marginBottom: 8 }}>
                      Experiment session: {EXPERIMENT_SESSION_COST.ap} AP + {nodePreview.experimentCost + EXPERIMENT_SESSION_COST.abundance} abundance
                    </div>
                    {nodeResearched ? (
                      <div style={{ fontSize: 9, color: '#4a9a5a' }}>Blueprint unlocked — build in Workshop.</div>
                    ) : (
                      <button
                        style={{ ...C.btn(nodeCanExperiment && ap >= EXPERIMENT_SESSION_COST.ap ? TERMINAL_ACCENT : '#302030'), width: '100%' }}
                        disabled={!nodeCanExperiment || ap < EXPERIMENT_SESSION_COST.ap}
                        onClick={() => onExperiment(nodePreview.blueprint)}
                      >
                        Run experiment
                      </button>
                    )}
                    {!nodeResearched && (
                      <button
                        style={{ ...C.btn(RESEARCH_ACCENT), width: '100%', marginTop: 6, opacity: isBlueprintResearched(labState, nodePreview.blueprint) ? 0.4 : 1 }}
                        onClick={() => onResearch(nodePreview.blueprint)}
                      >
                        Quick research (no experiment)
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
