import { C } from '../styles.js';
import {
  LAB_TECH_NODES,
  TECH_CATEGORIES,
  isTechUnlocked,
  canUnlockTech,
  BREAKTHROUGH_ICON,
  BREAKTHROUGH_LABEL,
} from '../gameData/labTechTree.js';

const ACCENT = '#4a6080';
const UNLOCKED = '#50a070';
const LOCKED = '#506070';
const SHORT = '#e05040';

function TechNodeCard({ node, labState, onUnlock }) {
  const owned = isTechUnlocked(labState, node.id);
  const check = canUnlockTech(labState, node.id);
  const canBuy = check.ok;
  const stageBlocked = (labState?.stage ?? 1) < (node.stageMin ?? 1);
  const prereqBlocked = check.reason === 'prereqs';
  const costBlocked = check.reason === 'cost';

  return (
    <div
      style={{
        ...C.card,
        padding: '8px 10px',
        marginBottom: 6,
        borderColor: owned ? `${UNLOCKED}80` : canBuy ? `${ACCENT}80` : '#2a3040',
        opacity: stageBlocked && !owned ? 0.55 : 1,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: owned ? '#90d0a8' : '#90a8c8', fontSize: 11 }}>
            {node.icon} {node.label}
            {owned && <span style={{ color: UNLOCKED, fontSize: 9, marginLeft: 6 }}>✓ unlocked</span>}
          </div>
          <div style={{ fontSize: 9, color: '#607090', lineHeight: 1.45, marginTop: 4 }}>{node.desc}</div>
          {node.blueprint && (
            <div style={{ fontSize: 8, color: '#5080a0', marginTop: 4 }}>
              Unlocks blueprint: {node.blueprint.replace('bp_', '').replace(/_/g, ' ')}
            </div>
          )}
          {stageBlocked && !owned && (
            <div style={{ fontSize: 8, color: '#a08050', marginTop: 4 }}>Requires inventor stage {node.stageMin}</div>
          )}
          {prereqBlocked && !owned && !stageBlocked && (
            <div style={{ fontSize: 8, color: '#806050', marginTop: 4 }}>Complete prerequisites first</div>
          )}
        </div>
        {!owned && node.cost > 0 && (
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: costBlocked ? SHORT : '#c0a060' }}>
              {BREAKTHROUGH_ICON} {node.cost}
            </div>
          </div>
        )}
      </div>
      {!owned && canBuy && (
        <button
          style={{ ...C.btn(UNLOCKED), width: '100%', marginTop: 8, fontSize: 10, fontWeight: 700 }}
          onClick={() => onUnlock(node.id)}
        >
          Unlock ({node.cost} {BREAKTHROUGH_LABEL})
        </button>
      )}
    </div>
  );
}

export function LabTechTree({ labState, onUnlock }) {
  const breakthroughs = labState?.breakthroughs ?? 0;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT }}>RESEARCH TECH TREE</div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#c0a060' }}>
          {BREAKTHROUGH_ICON} {breakthroughs} {BREAKTHROUGH_LABEL}
        </div>
      </div>
      <div style={{ fontSize: 9, color: '#607090', marginBottom: 10, lineHeight: 1.5 }}>
        Talia earns breakthroughs from lab sessions. Spend them here to unlock blueprints before building.
      </div>
      {TECH_CATEGORIES.map(cat => {
        const nodes = LAB_TECH_NODES.filter(n => n.category === cat.id);
        if (!nodes.length) return null;
        return (
          <div key={cat.id} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 9, color: LOCKED, letterSpacing: 1.5, marginBottom: 6 }}>
              {cat.icon} {cat.label.toUpperCase()}
            </div>
            {nodes.map(node => (
              <TechNodeCard key={node.id} node={node} labState={labState} onUnlock={onUnlock} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
