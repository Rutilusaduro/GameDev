// ═══════════════════════════════════════════════════════════════
// WEEKLY RÉSUMÉ MODAL — end-of-week reel (B3) + mover cards (existing).
// ═══════════════════════════════════════════════════════════════
import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from './ModalOverlay.jsx';

const EXTRA_BORDER = {
  psych: '#a05090',
  garment: '#c05030',
  quiet: '#506080',
};

export function WeekRecapModal({ weekRecap, onClose, onSelectResident, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('week', soundEnabled); }, [soundEnabled, weekRecap?.week]);
  const { week, movers = [], extras = [] } = weekRecap;
  const totalCards = movers.length + extras.length;

  const renderCard = (key, name, label, prose, borderColor, studentId, cardIndex = 0) => {
    const tappable = !!onSelectResident && studentId != null;
    return (
      <div
        key={key}
        className="week-recap-card-in"
        onClick={tappable ? () => onSelectResident(studentId) : undefined}
        role={tappable ? 'button' : undefined}
        style={{
          ...C.card,
          cursor: tappable ? 'pointer' : 'default',
          borderLeft: `3px solid ${borderColor}`,
          animationDelay: `${cardIndex * 55}ms`,
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
    <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); onClose(); }} soundEnabled={soundEnabled}>
      <div
        className="hall-pass-modal-in week-recap-modal"
        style={{
          ...C.modal,
          maxWidth: 480,
          border: '1px solid #6030a060',
        }}
      >
        <div style={{ fontSize: 9, letterSpacing: 3, color: '#9050c8', marginBottom: 4 }}>THE WEEK IN REVIEW</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2, flexWrap: 'wrap' }}>
          <span className="week-recap-week-badge">Wk {week}</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#c090e8' }}>What the week made of them</span>
        </div>
        <div style={{ fontSize: 11, color: '#5a3888', marginBottom: 12 }}>
          {totalCards} {totalCards === 1 ? 'card' : 'cards'} from this week&apos;s ledger.
        </div>
        <div style={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {movers.map((m, cardIndex) => {
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
                  cardIndex,
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
          {extras.map((ex, i) => renderCard(ex.id, ex.name, ex.label, ex.prose, EXTRA_BORDER[ex.type] || '#5a3888', ex.studentId, movers.length + i))}
          {totalCards === 0 && (
            <div style={{ fontSize: 12, color: '#706090', fontStyle: 'italic' }}>A quiet week — the campus still breathes.</div>
          )}
        </div>
        <button
          type="button"
          className="week-recap-cta"
          style={{ ...C.btn(), width: '100%' }}
          onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}
        >
          Begin Week {week}
        </button>
      </div>
    </ModalOverlay>
  );
}
