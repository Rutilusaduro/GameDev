// ═══════════════════════════════════════════════════════════════
// NETWORK GRAPH — Stage 2 Automator / Stage 3 Nexus control
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { INVENTOR_PATH_STAGES } from '../gameData/talia.js';
import {
  NODE_TYPES,
  DEPLOYMENT_AREAS,
  nodeTypeMeta,
  networkSummary,
} from '../gameData/networkState.js';
import { NETWORK_EXPERIMENTS, experimentsAvailable } from '../gameData/networkExperiments.js';

const ACCENT = '#30d0f0';
const MAP_W = 480;
const MAP_H = 320;
const px = (x) => (x / 100) * MAP_W;
const py = (y) => (y / 100) * MAP_H;

function StatBar({ label, value, max = 100, color = ACCENT, warn }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div style={{ marginBottom: 6 }}>
      <div style={{ fontSize: 9, color: warn ? '#e08050' : '#6080a0', marginBottom: 2, display: 'flex', justifyContent: 'space-between' }}>
        <span>{label}</span>
        <span>{value}{max === 100 ? '%' : ''}</span>
      </div>
      <div style={{ background: '#0a1420', borderRadius: 3, height: 6, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

function NetworkGraph({ network, selectedId, onSelect }) {
  const nodes = network?.nodes || [];
  const edges = network?.edges || [];
  return (
    <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      style={{ width: '100%', maxWidth: 560, background: 'rgba(4,10,18,0.85)', border: `1px solid ${ACCENT}40`, borderRadius: 12 }}>
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {edges.map((e, i) => {
        const a = nodes.find(n => n.id === e.from);
        const b = nodes.find(n => n.id === e.to);
        if (!a || !b) return null;
        const weak = !a.active || !b.active;
        return (
          <line key={i}
            x1={px(a.x)} y1={py(a.y)} x2={px(b.x)} y2={py(b.y)}
            stroke={weak ? '#804020' : ACCENT}
            strokeWidth={weak ? 1 : 1.6}
            strokeDasharray={weak ? '4 3' : 'none'}
            opacity={weak ? 0.45 : 0.75}
          />
        );
      })}
      {nodes.map(n => {
        const meta = nodeTypeMeta(n.type);
        const isSel = n.id === selectedId;
        const r = isSel ? 16 : 13;
        return (
          <g key={n.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(n.id)} filter={n.active ? 'url(#glow)' : undefined}>
            {isSel && <circle cx={px(n.x)} cy={py(n.y)} r={20} fill="none" stroke={ACCENT} strokeWidth={1} opacity={0.35} />}
            <circle cx={px(n.x)} cy={py(n.y)} r={r}
              fill={n.active ? `${meta?.color || ACCENT}55` : '#1a2030'}
              stroke={isSel ? '#fff' : meta?.color || ACCENT}
              strokeWidth={isSel ? 2 : 1.2}
              opacity={n.active ? 1 : 0.5}
            />
            <text x={px(n.x)} y={py(n.y) + 4} textAnchor="middle" fontSize={isSel ? 12 : 10}>{meta?.icon || '⬡'}</text>
            <text x={px(n.x)} y={py(n.y) - 18} textAnchor="middle" fontSize="7" fill="#80c0e0">{meta?.label?.split(' ')[0] || n.type}</text>
          </g>
        );
      })}
    </svg>
  );
}

function InfluenceWeb({ network, students }) {
  const connected = network?.connectedSubjects || {};
  const entries = Object.entries(connected)
    .map(([id, data]) => {
      const st = students.find(s => String(s.id) === String(id));
      if (!st) return null;
      return { student: st, ...data };
    })
    .filter(Boolean)
    .sort((a, b) => (b.influence ?? 0) - (a.influence ?? 0));
  if (!entries.length) {
    return <div style={{ fontSize: 10, color: '#506070', fontStyle: 'italic' }}>No subjects linked yet — expand coverage and slot experiments.</div>;
  }
  return (
    <div style={{ maxHeight: 200, overflowY: 'auto' }}>
      {entries.map(({ student, influence, conditioned, backlashRisk }) => (
        <div key={student.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, padding: '4px 0', borderBottom: '1px solid #1a2838' }}>
          <span style={{ color: conditioned ? '#a0e0ff' : '#8090a8' }}>{student.name}</span>
          <span style={{ color: backlashRisk ? '#e07050' : '#60c0e0' }}>
            Influence {influence}{conditioned ? ' · conditioned' : ''}{backlashRisk ? ' · backlash risk' : ''}
          </span>
        </div>
      ))}
    </div>
  );
}

export function NetworkView({
  labState,
  deviceInventory,
  students,
  onAddNode,
  onSlotExperiment,
  onClearSlot,
  onUpgradeNode,
  onSetAutomation,
  onExpandArea,
  onApproveProposal,
  onDenyProposal,
  onAdjustIntegration,
  onUpgradeNexus,
}) {
  const [tab, setTab] = useState('graph');
  const [selectedId, setSelectedId] = useState(null);
  const network = labState?.network;
  const stage = labState?.stage ?? 1;
  const stageMeta = INVENTOR_PATH_STAGES.find(s => s.id === stage);
  const summary = networkSummary(labState);
  const selected = network?.nodes?.find(n => n.id === selectedId);
  const palette = experimentsAvailable(labState, deviceInventory);

  if (!network || stage < 2) {
    return (
      <div style={{ fontSize: 12, color: '#5a6080', fontStyle: 'italic' }}>
        Network systems unlock at inventor stage 2 — The Automator. Run more lab sessions.
      </div>
    );
  }

  const tabs = [
    ['graph', 'Network Graph'],
    ['deploy', 'Deployment'],
    ...(stage >= 3 ? [['nexus', 'Nexus Control'], ['influence', 'Influence Web']] : []),
  ];

  return (
    <div>
      <p style={C.secT}>⚙️ Device Network — {stageMeta?.label}</p>
      <div style={{ ...C.card, border: `1px solid ${ACCENT}50`, marginBottom: 12, padding: '12px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 10 }}>
          <StatBar label="Stability" value={summary.stability} color="#40c080" warn={summary.stability < 40} />
          <StatBar label="Detection Risk" value={summary.detectionRisk} color="#e07040" warn={summary.detectionRisk > 50} />
          <StatBar label="Automation" value={summary.automation} max={3} color={ACCENT} />
          <StatBar label="Coverage" value={summary.coverage} max={10} color="#6080c0" />
          {stage >= 3 && <StatBar label="Integration" value={summary.integration} color="#a060e0" />}
        </div>
        <div style={{ fontSize: 9, color: '#506070' }}>
          {summary.nodeCount} nodes · {summary.areaCount} zones · maintenance load {summary.maintenanceCost}/wk
          {summary.caloricBonus > 0 && ` · +${Math.round(summary.caloricBonus * 100)}% caloric routing`}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {tabs.map(([id, label]) => (
          <button key={id} style={{ ...C.smBtn, background: tab === id ? `${ACCENT}30` : undefined, borderColor: tab === id ? ACCENT : undefined }} onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'graph' && (
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <NetworkGraph network={network} selectedId={selectedId} onSelect={setSelectedId} />
            <div style={{ fontSize: 9, color: '#406080', marginTop: 6 }}>Click nodes to inspect. Weak links flicker orange when offline.</div>
            <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.values(NODE_TYPES).filter(t => (t.unlockStage ?? 2) <= stage).map(t => (
                <button key={t.id} style={{ ...C.smBtn, fontSize: 9 }} onClick={() => onAddNode(t.id)}>
                  + {t.icon} {t.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 260px', ...C.card, borderColor: `${ACCENT}40` }}>
            {!selected && <div style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>Select a node.</div>}
            {selected && (
              <>
                <div style={{ fontWeight: 700, color: '#90d8f0', marginBottom: 6 }}>{nodeTypeMeta(selected.type)?.label} (Lv {selected.level})</div>
                <div style={{ fontSize: 10, color: '#608090', marginBottom: 8 }}>
                  Zone: {selected.areaId} · Automation {selected.automation ?? 0}/3 · {selected.active ? 'online' : 'OFFLINE'}
                </div>
                <div style={{ fontSize: 9, letterSpacing: 1, color: ACCENT, marginBottom: 6 }}>EXPERIMENT SLOTS</div>
                {(selected.slots || []).map((expId, idx) => {
                  const exp = expId ? NETWORK_EXPERIMENTS[expId] : null;
                  return (
                    <div key={idx} style={{ marginBottom: 8, padding: '6px 8px', background: '#0a1420', borderRadius: 6 }}>
                      <div style={{ fontSize: 10, color: exp ? '#a0d0f0' : '#506070' }}>
                        Slot {idx + 1}: {exp ? `${exp.icon} ${exp.label}` : 'empty'}
                      </div>
                      {exp && (
                        <button style={{ ...C.smBtn, fontSize: 8, marginTop: 4 }} onClick={() => onClearSlot(selected.id, idx)}>Clear</button>
                      )}
                      {!exp && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                          {palette.filter(e => !e.nodeTypes || e.nodeTypes.includes(selected.type)).slice(0, 6).map(e => (
                            <button key={e.id} style={{ ...C.smBtn, fontSize: 8 }} onClick={() => onSlotExperiment(selected.id, idx, e.id)}>
                              {e.icon} {e.label.slice(0, 14)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                  <button style={{ ...C.smBtn, flex: 1 }} onClick={() => onUpgradeNode(selected.id)}>Upgrade</button>
                  <button style={{ ...C.smBtn, flex: 1 }} onClick={() => onSetAutomation(selected.id, Math.min(3, (selected.automation ?? 0) + 1))}>+ Auto</button>
                </div>
              </>
            )}
            <div style={{ marginTop: 14, fontSize: 9, letterSpacing: 1, color: ACCENT }}>PALETTE</div>
            <div style={{ maxHeight: 120, overflowY: 'auto', marginTop: 4 }}>
              {palette.length === 0 && <div style={{ fontSize: 9, color: '#666', fontStyle: 'italic' }}>Build devices to unlock experiments.</div>}
              {palette.map(e => (
                <div key={e.id} style={{ fontSize: 9, color: '#7090a8', marginBottom: 3 }}>{e.icon} {e.label}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'deploy' && (
        <div style={C.grid2}>
          {DEPLOYMENT_AREAS.filter(a => (a.unlockStage ?? 2) <= stage).map(area => {
            const deployed = network.deployedAreas?.includes(area.id);
            return (
              <div key={area.id} style={{ ...C.card, opacity: deployed ? 1 : 0.85 }}>
                <div style={{ fontWeight: 700, color: '#90c8e0' }}>{area.emoji} {area.label}</div>
                <div style={{ fontSize: 10, color: '#608090', margin: '6px 0' }}>Base detection pressure: {area.baseDetection}</div>
                {deployed ? (
                  <span style={{ ...C.tag(`${ACCENT}30`, ACCENT), fontSize: 9 }}>DEPLOYED</span>
                ) : (
                  <button style={{ ...C.btn(ACCENT), width: '100%', fontSize: 10 }} onClick={() => onExpandArea(area.id)}>Expand network here</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'nexus' && stage >= 3 && (
        <div>
          <div style={{ ...C.card, marginBottom: 10 }}>
            <div style={{ fontWeight: 700, color: '#b090f0', marginBottom: 8 }}>Central Nexus — Level {network.nexus?.level ?? 1}</div>
            <StatBar label="Personal Integration" value={network.nexus?.integration ?? 0} color="#a060e0" />
            <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
              <button style={{ ...C.smBtn, flex: 1 }} onClick={() => onAdjustIntegration(5)}>Deepen integration (+5)</button>
              <button style={{ ...C.smBtn, flex: 1 }} onClick={() => onAdjustIntegration(-5)}>Pull back (−5)</button>
              <button style={{ ...C.smBtn, flex: 1 }} onClick={onUpgradeNexus}>Upgrade Nexus</button>
            </div>
          </div>
          <div style={{ fontSize: 9, letterSpacing: 1, color: '#a080d0', marginBottom: 6 }}>AUTONOMOUS PROPOSALS</div>
          {(network.proposals || []).length === 0 && (
            <div style={{ fontSize: 10, color: '#606080', fontStyle: 'italic' }}>The mesh will propose optimizations as it matures.</div>
          )}
          {(network.proposals || []).map(p => (
            <div key={p.id} style={{ ...C.card, marginBottom: 8, borderColor: '#4a3060' }}>
              <div style={{ fontSize: 11, color: '#d0b0f0', marginBottom: 4 }}>{p.label}</div>
              {p.line && <div style={{ fontSize: 10, color: '#9080a8', marginBottom: 8, fontStyle: 'italic' }}>{p.line}</div>}
              <div style={{ fontSize: 9, color: '#706080', marginBottom: 8 }}>Risk ~{p.risk}% · Reward ~{p.reward}%</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{ ...C.btn('#3a2050'), flex: 1, fontSize: 10 }} onClick={() => onApproveProposal(p.id)}>Approve</button>
                <button style={{ ...C.btn('#333'), flex: 1, fontSize: 10 }} onClick={() => onDenyProposal(p.id)}>Deny</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'influence' && stage >= 3 && (
        <div style={{ ...C.card }}>
          <div style={{ fontSize: 9, letterSpacing: 1, color: '#a080d0', marginBottom: 8 }}>CONNECTED SUBJECTS</div>
          <InfluenceWeb network={network} students={students} />
        </div>
      )}
    </div>
  );
}
