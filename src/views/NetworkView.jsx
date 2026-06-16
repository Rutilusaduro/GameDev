// ═══════════════════════════════════════════════════════════════
// TALIA NETWORK — stage 2+ mesh control panel
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { INVENTOR_PATH_STAGES } from '../gameData/talia.js';
import {
  NETWORK_NODE_TYPES,
  DEPLOYMENT_AREAS,
  NETWORK_EXPERIMENTS,
  automationThreshold,
} from '../gameData/networkState.js';

const ACCENT = '#1a5068';

function StatBar({ label, value, max = 100, color = ACCENT }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#6080a0', marginBottom: 3 }}>
        <span>{label}</span>
        <span>{value}/{max}</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: '100%', background: color, transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

export function NetworkView({
  labState,
  taliaStudent,
  onAddNode,
  onUpgradeNode,
  onSetAutomation,
  onSlotExperiment,
  onClearSlot,
  onExpandDeployment,
  onApproveProposal,
  onDenyProposal,
  onAdjustIntegration,
  onUpgradeNexus,
}) {
  if (!labState || (labState.stage ?? 1) < 2) {
    return (
      <div style={{ fontSize: 12, color: '#5a7080', fontStyle: 'italic', lineHeight: 1.6 }}>
        The campus mesh unlocks when Talia advances to Integrator (8 lab sessions).
      </div>
    );
  }

  const network = labState.network || {};
  const stageMeta = INVENTOR_PATH_STAGES.find((s) => s.id === labState.stage) || INVENTOR_PATH_STAGES[1];
  const nodes = network.nodes || [];
  const automationTotal = nodes.reduce((a, n) => a + (n.automation ?? 0), 0)
    + nodes.reduce((a, n) => a + (n.slots || []).filter(Boolean).length * 4, 0);
  const threshold = automationThreshold(network);
  const deployed = new Set(network.deploymentAreas || []);
  const pendingProposals = (network.proposals || []).filter((p) => !p.resolved);
  const parts = labState.parts || {};

  return (
    <div>
      <p style={C.secT}>Campus Mesh — {stageMeta.label}</p>
      <div style={{ ...C.card, borderColor: `${ACCENT}80`, marginBottom: 12 }}>
        <div style={{ fontSize: 11, color: '#90b8d8', lineHeight: 1.6, marginBottom: 10 }}>
          {stageMeta.desc}
          {taliaStudent && (
            <div style={{ marginTop: 6, fontSize: 10, color: '#6080a0' }}>
              Talia: {Math.round(taliaStudent.lbs)} lbs · Instability {labState.instability ?? 0}%
            </div>
          )}
        </div>
        <StatBar label="Integration" value={network.integration ?? 45} color="#3a8090" />
        <StatBar label="Detection Risk" value={network.detectionRisk ?? 0} color="#a05040" />
        <div style={{ fontSize: 10, color: automationTotal >= threshold ? '#70c090' : '#8090a0', marginTop: 4 }}>
          Automation {automationTotal} / {threshold} — {automationTotal >= threshold ? 'weekly drip active' : 'raise automation to trigger passive routing'}
        </div>
        <div style={{ fontSize: 9, color: '#506070', marginTop: 6 }}>
          Nexus Lv.{network.nexusLevel ?? 1} · Parts: {parts.scrap ?? 0} scrap · {parts.circuits ?? 0} circuits
        </div>
      </div>

      <div style={{ ...C.card, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#80a8c8', marginBottom: 8, letterSpacing: 1 }}>NEXUS</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          <button type="button" style={{ ...C.btn('#2a4860'), fontSize: 10 }} onClick={() => onAdjustIntegration(5)}>
            Deepen (+5 integration)
          </button>
          <button type="button" style={{ ...C.btn('#283848'), fontSize: 10 }} onClick={() => onAdjustIntegration(-5)}>
            Pull Back (−5)
          </button>
          <button type="button" style={{ ...C.btn(ACCENT), fontSize: 10 }} onClick={onUpgradeNexus}>
            Upgrade Nexus (3 circuits, 2 scrap)
          </button>
        </div>
      </div>

      <div style={{ ...C.card, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#80a8c8', marginBottom: 8, letterSpacing: 1 }}>ADD NODE</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {NETWORK_NODE_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              title={type.desc}
              style={{ ...C.btn('#1a3848'), fontSize: 10, flex: '1 1 140px' }}
              onClick={() => onAddNode(type.id)}
            >
              + {type.label}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 9, color: '#506070', marginTop: 6 }}>Cost: 2 scrap + 1 circuit per node</div>
      </div>

      {nodes.length > 0 && (
        <div style={{ ...C.card, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#80a8c8', marginBottom: 8, letterSpacing: 1 }}>NODES ({nodes.length})</div>
          {nodes.map((node) => {
            const typeMeta = NETWORK_NODE_TYPES.find((t) => t.id === node.typeId) || { label: node.typeId };
            const slots = node.slots || [null, null];
            return (
              <div key={node.id} style={{ ...C.card, marginBottom: 8, padding: 10, borderColor: '#2a4050' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#a0c0e0' }}>{typeMeta.label} · Lv.{node.level ?? 1}</span>
                  <span style={{ fontSize: 9, color: '#6080a0' }}>auto {node.automation ?? 0}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                  {[0, 25, 50, 75].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      style={{
                        ...C.smBtn,
                        fontSize: 9,
                        background: (node.automation ?? 0) === lvl ? '#2a6080' : undefined,
                      }}
                      onClick={() => onSetAutomation(node.id, lvl)}
                    >
                      {lvl}%
                    </button>
                  ))}
                  <button type="button" style={{ ...C.smBtn, fontSize: 9 }} onClick={() => onUpgradeNode(node.id)}>
                    Upgrade (2 circuits)
                  </button>
                </div>
                <div style={{ fontSize: 9, color: '#506070', marginBottom: 4 }}>Experiment slots</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {slots.map((slot, idx) => (
                    <div key={idx} style={{ flex: '1 1 120px' }}>
                      {slot ? (
                        <button type="button" style={{ ...C.btn('#3a2848'), width: '100%', fontSize: 9 }} onClick={() => onClearSlot(node.id, idx)}>
                          Clear {NETWORK_EXPERIMENTS.find((e) => e.id === slot)?.label || slot}
                        </button>
                      ) : (
                        <select
                          style={{ width: '100%', fontSize: 9, background: '#0c1420', color: '#90a8c8', border: '1px solid #2a4050', borderRadius: 4, padding: 4 }}
                          defaultValue=""
                          onChange={(e) => {
                            if (e.target.value) onSlotExperiment(node.id, idx, e.target.value);
                            e.target.value = '';
                          }}
                        >
                          <option value="">Slot experiment…</option>
                          {NETWORK_EXPERIMENTS.map((exp) => (
                            <option key={exp.id} value={exp.id}>{exp.label}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ ...C.card, marginBottom: 12 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: '#80a8c8', marginBottom: 8, letterSpacing: 1 }}>DEPLOYMENT AREAS</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {DEPLOYMENT_AREAS.map((area) => (
            <button
              key={area.id}
              type="button"
              disabled={deployed.has(area.id)}
              style={{
                ...C.btn(deployed.has(area.id) ? '#1a3020' : '#1a3848'),
                fontSize: 10,
                opacity: deployed.has(area.id) ? 0.6 : 1,
              }}
              onClick={() => onExpandDeployment(area.id)}
            >
              {area.emoji} {deployed.has(area.id) ? `${area.label} ✓` : `Deploy ${area.label}`}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 9, color: '#806050', marginTop: 6 }}>Each deployment raises detection risk and scrutiny pressure.</div>
      </div>

      {pendingProposals.length > 0 && (
        <div style={{ ...C.card, marginBottom: 12, borderColor: '#4a6080' }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#a0c0e0', marginBottom: 8, letterSpacing: 1 }}>PROPOSALS</div>
          {pendingProposals.map((prop) => (
            <div key={prop.id} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, color: '#90b0d0', marginBottom: 6, lineHeight: 1.5 }}>{prop.label}</div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button type="button" style={{ ...C.btn('#2a6040'), fontSize: 10, flex: 1 }} onClick={() => onApproveProposal(prop.id)}>
                  Approve
                </button>
                <button type="button" style={{ ...C.btn('#4a2830'), fontSize: 10, flex: 1 }} onClick={() => onDenyProposal(prop.id)}>
                  Deny
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
