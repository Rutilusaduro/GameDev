// ═══════════════════════════════════════════════════════════════
// CIRCUIT BOARD PANEL — invention point skill tree UI
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import {
  CIRCUIT_BOARDS,
  getCircuitBoard,
  getInventionTier,
  getInventionTierLabel,
  hasCircuitNode,
  canUnlockCircuitNode,
  allCircuitNodes,
} from '../gameData/inventionUpgrades.js';

const ACCENT = '#6a5088';

export function CircuitBoardPanel({ deviceDefId, labState, onUnlockNode }) {
  const board = CIRCUIT_BOARDS[deviceDefId];
  const [branchId, setBranchId] = useState('main');
  const [selectedId, setSelectedId] = useState(null);

  if (!board || !labState) return null;

  const cb = getCircuitBoard(labState, deviceDefId);
  const tier = getInventionTier(labState, deviceDefId);
  const tierLabel = getInventionTierLabel(labState, deviceDefId);
  const nodes = branchId === 'main'
    ? board.mainPath.map((n) => ({ ...n, branchId: 'main', branchLabel: 'Main Path' }))
    : (board.branches[branchId]?.nodes || []).map((n) => ({
      ...n,
      branchId,
      branchLabel: board.branches[branchId]?.label,
    }));
  const selected = selectedId
    ? allCircuitNodes(deviceDefId).find((n) => n.id === selectedId)
    : nodes[0];

  const branchList = [
    { id: 'main', label: 'Main Path', icon: '⬆️' },
    ...Object.values(board.branches).map((b) => ({ id: b.id, label: b.label, icon: '🔀' })),
  ];

  return (
    <div style={{ ...C.card, border: `1px solid ${ACCENT}50`, marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <div style={{ fontWeight: 700, color: '#c0a8e0', fontSize: 12 }}>
          🔌 Circuit Board — {board.label}
        </div>
        <span style={{ ...C.tag(`${ACCENT}40`, '#d0c0f0'), fontSize: 9 }}>
          {tierLabel}
        </span>
      </div>
      <div style={{ fontSize: 10, color: '#9080b0', marginBottom: 10 }}>
        Invention Points: <strong style={{ color: '#d0c0f0' }}>{cb.inventionPoints ?? 0}</strong>
        {' · '}Main path: {cb.mainPathPoints ?? 0}/9
        {' · '}Uses: {cb.totalUses ?? 0}
        {tier < 3 && (
          <span style={{ color: '#7060a0' }}>
            {' '}· Tier {tier + 1} at {tier === 1 ? 4 : 9} main-path pts
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 10 }}>
        <div>
          {branchList.map((b) => (
            <button
              key={b.id}
              style={{
                ...C.btn(branchId === b.id ? ACCENT : '#1a1830'),
                width: '100%',
                textAlign: 'left',
                marginBottom: 3,
                fontSize: 9,
                opacity: board.branches[b.id]?.requiresTier && tier < board.branches[b.id].requiresTier ? 0.45 : 1,
              }}
              onClick={() => { setBranchId(b.id); setSelectedId(null); }}
            >
              {b.icon} {b.label}
            </button>
          ))}
        </div>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 8 }}>
            {nodes.map((node) => {
              const unlocked = hasCircuitNode(labState, deviceDefId, node.id);
              const canBuy = canUnlockCircuitNode(labState, deviceDefId, node.id);
              return (
                <button
                  key={node.id}
                  style={{
                    ...C.btn(selected?.id === node.id ? ACCENT : unlocked ? '#1a2830' : '#141020'),
                    textAlign: 'left',
                    padding: 8,
                    border: unlocked ? '1px solid #4a9a5a40' : canBuy ? `1px solid ${ACCENT}60` : '1px solid transparent',
                    opacity: board.branches[branchId]?.requiresTier && tier < board.branches[branchId].requiresTier ? 0.4 : 1,
                  }}
                  onClick={() => setSelectedId(node.id)}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, color: unlocked ? '#80d0a0' : '#c0b0e0' }}>
                    {node.label}
                    {node.milestone && <span style={{ fontSize: 8, color: '#c0a040', marginLeft: 4 }}>T{node.milestone}</span>}
                  </div>
                  <div style={{ fontSize: 8, color: '#7060a0' }}>{node.cost} pt{node.cost !== 1 ? 's' : ''}</div>
                </button>
              );
            })}
          </div>
          {selected && (
            <div style={{ background: '#0a0818', borderRadius: 8, padding: 10, border: `1px solid ${ACCENT}30` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#d0c0f0', marginBottom: 4 }}>{selected.label}</div>
              <div style={{ fontSize: 10, color: '#9080b0', lineHeight: 1.5, marginBottom: 8 }}>{selected.desc}</div>
              {hasCircuitNode(labState, deviceDefId, selected.id) ? (
                <div style={{ fontSize: 9, color: '#4a9a5a' }}>Installed on circuit board.</div>
              ) : (
                <button
                  style={{ ...C.btn(canUnlockCircuitNode(labState, deviceDefId, selected.id) ? ACCENT : '#302030'), width: '100%' }}
                  disabled={!canUnlockCircuitNode(labState, deviceDefId, selected.id)}
                  onClick={() => onUnlockNode(deviceDefId, selected.id)}
                >
                  Install node ({selected.cost} pt{selected.cost !== 1 ? 's' : ''})
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
