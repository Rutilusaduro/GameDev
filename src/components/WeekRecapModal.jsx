// ═══════════════════════════════════════════════════════════════
// WEEKLY RÉSUMÉ MODAL — end-of-week reel (B3) + mover cards (existing).
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';

const EXTRA_BORDER = {
  psych: '#a05090',
  garment: '#c05030',
  quiet: '#506080',
};

export function WeekRecapModal({ weekRecap, onClose, onSelectGirl }) {
  const { week, movers = [], extras = [] } = weekRecap;
  const totalCards = movers.length + extras.length;

  const renderCard = (key, name, label, prose, borderColor, studentId) => {
    const tappable = !!onSelectGirl && studentId != null;
    return (
      <div
        key={key}
        onClick={tappable ? () => onSelectGirl(studentId) : undefined}
        role={tappable ? 'button' : undefined}
        style={{
          ...C.card,
          cursor: tappable ? 'pointer' : 'default',
          borderLeft: `3px solid ${borderColor}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, color: '#c090e8' }}>
            {name}
            {tappable && <span style={{ color: '#7050a0', fontWeight: 400, fontSize: 11 }}> ›</span>}
          </div>
          {label && <span style={C.tag(`${borderColor}22`, borderColor)}>{label}</span>}
        </div>
        <div style={{ fontSize: 12.5, color: '#caa8e8', lineHeight: 1.5 }}>{prose}</div>
      </div>
    );
  };

  return (
    <div style={C.overlay}>
      <div style={{ ...C.modal, maxWidth: 480 }}>
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#9050c8', marginBottom: 4 }}>THE WEEK IN REVIEW</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#c090e8', marginBottom: 2 }}>Week {week} — what the week made of them</div>
        <div style={{ fontSize: 11, color: '#5a3888', marginBottom: 12 }}>
          {totalCards} {totalCards === 1 ? 'card' : 'cards'} from this week&apos;s ledger.
        </div>
        <div style={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {movers.map((m) => {
            const journey = m.totalGained > 0
              ? `Up ${m.totalGained} lbs since you began${m.journeyStages > 0 && m.startStageLabel && m.stageLabel ? ` · ${m.startStageLabel} → ${m.stageLabel}` : ''}`
              : null;
            return (
              <div key={m.id}>
                {renderCard(
                  m.id,
                  m.name,
                  null,
                  m.prose,
                  m.stagedUp ? '#c8860a' : m.stuffed ? '#b04880' : '#5a3888',
                  m.id,
                )}
                {m.memoryProse && (
                  <div style={{ margin: '-4px 0 8px 12px', fontSize: 11.5, color: '#9a7ac0', lineHeight: 1.45 }}>{m.memoryProse}</div>
                )}
                {journey && (
                  <div style={{ margin: '-4px 0 8px 12px', fontSize: 10.5, color: '#8a6ab0', fontStyle: 'italic' }}>{journey}</div>
                )}
              </div>
            );
          })}
          {extras.map((ex) => renderCard(ex.id, ex.name, ex.label, ex.prose, EXTRA_BORDER[ex.type] || '#5a3888', ex.studentId))}
          {totalCards === 0 && (
            <div style={{ fontSize: 12, color: '#706090', fontStyle: 'italic' }}>A quiet week — the campus still breathes.</div>
          )}
        </div>
        <button type="button" style={{ ...C.btn(), width: '100%' }} onClick={onClose}>Begin Week {week}</button>
      </div>
    </div>
  );
}
