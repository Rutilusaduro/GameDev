// ═══════════════════════════════════════════════════════════════
// CIRCUIT BOARD MODAL — visual skill tree on a PCB layout
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
  getNodeLayout,
  getBoardEdges,
} from '../gameData/inventionUpgrades.js';

const ACCENT = '#6a5088';
// Real-PCB palette: green soldermask substrate, gold/copper traces.
const PCB_GREEN = '#0c3a1f';
const GOLD = '#e6c34a';
const GOLD_DIM = '#8a7220';
const LINE_BRANCH = '#b8941f';

export function CircuitBoardModal({ deviceDefId, labState, students = [], onUnlockNode, onClose }) {
  const board = CIRCUIT_BOARDS[deviceDefId];
  const [selectedId, setSelectedId] = useState(null);

  if (!board || !labState) return null;

  const cb = getCircuitBoard(labState, deviceDefId);
  const tier = getInventionTier(labState, deviceDefId);
  const tierLabel = getInventionTierLabel(labState, deviceDefId);
  const nodes = allCircuitNodes(deviceDefId);
  const edges = getBoardEdges(deviceDefId);
  const selected = nodes.find((n) => n.id === selectedId) || null;

  const nodeColor = (node) => {
    const unlocked = hasCircuitNode(labState, deviceDefId, node.id);
    const canBuy = canUnlockCircuitNode(labState, deviceDefId, node.id, students);
    if (unlocked) return { bg: '#14401f', border: GOLD, text: '#ffe9a0' };
    if (canBuy) return { bg: '#2a2410', border: '#caa030', text: '#ffd98a' };
    return { bg: '#0a2614', border: GOLD_DIM, text: '#7fa088' };
  };

  return (
    <div style={{ ...C.overlay, zIndex: 1240 }}>
      <div style={{
        ...C.modal,
        maxWidth: 720,
        width: '95%',
        background: 'linear-gradient(165deg,#06050c,#0e0a18,#06050c)',
        border: `1px solid ${ACCENT}70`,
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: 18,
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>CIRCUIT BOARD</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#d0c0f0' }}>{board.label}</div>
            <div style={{ fontSize: 10, color: '#8070a0', marginTop: 4 }}>{tierLabel}</div>
          </div>
          <button style={{ ...C.btn('#302030'), fontSize: 10, padding: '4px 10px' }} onClick={onClose}>✕</button>
        </div>

        <div style={{ fontSize: 10, color: '#9080b0', marginBottom: 12 }}>
          Invention Points: <strong style={{ color: '#d0c0f0' }}>{cb.inventionPoints ?? 0}</strong>
          {' · '}Main path {cb.mainPathPoints ?? 0}/9
          {' · '}Sessions {cb.totalUses ?? 0}
        </div>

        <div style={{
          position: 'relative',
          height: 420,
          background: `repeating-linear-gradient(0deg, transparent, transparent 19px, ${GOLD}12 19px, ${GOLD}12 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, ${GOLD}12 19px, ${GOLD}12 20px), radial-gradient(circle at 50% 38%, #11492a 0%, ${PCB_GREEN} 55%, #07260f 100%)`,
          borderRadius: 10,
          border: `1px solid ${GOLD}55`,
          boxShadow: `inset 0 0 60px #00000080`,
          marginBottom: 12,
          overflow: 'hidden',
        }}
        >
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {edges.map((e) => {
              const from = getNodeLayout(deviceDefId, e.from);
              const to = getNodeLayout(deviceDefId, e.to);
              const unlocked = hasCircuitNode(labState, deviceDefId, e.from)
                && hasCircuitNode(labState, deviceDefId, e.to);
              return (
                <line
                  key={`${e.from}-${e.to}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke={unlocked ? (e.kind === 'main' ? GOLD : LINE_BRANCH) : (e.kind === 'main' ? `${GOLD}40` : `${GOLD_DIM}55`)}
                  strokeWidth={e.kind === 'main' ? 2.5 : 1.5}
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const pos = getNodeLayout(deviceDefId, node.id);
            const colors = nodeColor(node);
            const isMain = node.branchId === 'main';
            const branchLocked = node.branchId !== 'main'
              && board.branches[node.branchId]?.requiresTier
              && tier < board.branches[node.branchId].requiresTier;
            return (
              <button
                key={node.id}
                title={node.label}
                onClick={() => setSelectedId(node.id)}
                style={{
                  position: 'absolute',
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: isMain ? 36 : 28,
                  height: isMain ? 36 : 28,
                  borderRadius: isMain ? 6 : '50%',
                  background: colors.bg,
                  border: `2px solid ${selectedId === node.id ? '#e0d0ff' : colors.border}`,
                  boxShadow: selectedId === node.id ? `0 0 12px ${ACCENT}80` : 'none',
                  cursor: 'pointer',
                  opacity: branchLocked ? 0.35 : 1,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isMain ? 9 : 8,
                  fontWeight: 700,
                  color: colors.text,
                }}
              >
                {node.milestone ? `T${node.milestone}` : node.cost}
              </button>
            );
          })}

          <div style={{ position: 'absolute', left: 8, bottom: 8, fontSize: 8, color: '#504060', letterSpacing: 1 }}>
            MAIN PATH ↑ · SIDE NODES · TAP TO INSPECT
          </div>
        </div>

        {selected ? (
          <div style={{ background: '#0a0818', borderRadius: 8, padding: 12, border: `1px solid ${ACCENT}40` }}>
            <div style={{ fontSize: 8, color: '#7060a0', marginBottom: 2 }}>{selected.branchLabel}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#d0c0f0', marginBottom: 4 }}>
              {selected.label}
              {selected.milestone && <span style={{ fontSize: 9, color: '#c0a040', marginLeft: 6 }}>Tier {selected.milestone} milestone</span>}
            </div>
            <div style={{ fontSize: 10, color: '#9080b0', lineHeight: 1.55, marginBottom: 10 }}>{selected.desc}</div>
            {hasCircuitNode(labState, deviceDefId, selected.id) ? (
              <div style={{ fontSize: 9, color: '#4a9a5a' }}>✓ Node installed on circuit board</div>
            ) : (
              <button
                style={{ ...C.btn(canUnlockCircuitNode(labState, deviceDefId, selected.id, students) ? ACCENT : '#302030'), width: '100%' }}
                disabled={!canUnlockCircuitNode(labState, deviceDefId, selected.id, students)}
                onClick={() => onUnlockNode(deviceDefId, selected.id)}
              >
                Install node ({selected.cost} invention pt{selected.cost !== 1 ? 's' : ''})
              </button>
            )}
          </div>
        ) : (
          <div style={{ fontSize: 10, color: '#605070', fontStyle: 'italic', textAlign: 'center' }}>
            Tap a node on the board to view upgrades. Earn points by running calibrations.
          </div>
        )}
      </div>
    </div>
  );
}
