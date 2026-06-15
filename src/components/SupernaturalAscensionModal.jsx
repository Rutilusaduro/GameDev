import { C } from '../styles.js';
import { SUPERNATURAL_FORMS } from '../gameData/supernaturalForms.js';

export function SupernaturalAscensionModal({ students, opposition, onAscend, onDismiss }) {
  const eligible = students.filter((s) => s.evolvedForm && !s.supernaturalForm && SUPERNATURAL_FORMS[s.archetype]);
  return (
    <div style={{ ...C.overlay, zIndex: 400 }}>
      <div style={{ ...C.modal, maxWidth: 560, background: 'linear-gradient(160deg,#050208,#120818,#050208)', border: '1px solid #6040a080' }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#a080d0', marginBottom: 8 }}>👻 THE SUPERNATURAL ACT</div>
        <p style={{ fontSize: 12, color: '#d0c0e8', lineHeight: 1.8, marginBottom: 14 }}>
          Week {opposition?.supernatural?.actWeek}: stomachs flutter empty, then hunger without mass. A voice of scarcity:
          <em> "You may have their bodies. You may not have their hunger."</em>
          {' '}Evolved students may ascend to thin supernatural forms — memory of every pound, hung on frames that look like they never ate.
        </p>
        <div style={{ fontSize: 10, color: '#9080b0', marginBottom: 10 }}>
          Scarcity pressure: {opposition?.supernatural?.scarcityPressure ?? 0}/100
        </div>
        {eligible.length ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
            {eligible.map((s) => {
              const form = SUPERNATURAL_FORMS[s.archetype];
              return (
                <button
                  key={s.id}
                  type="button"
                  style={{ ...C.btn('#4a2860'), textAlign: 'left', fontSize: 12 }}
                  onClick={() => onAscend(s.id, form.id)}
                >
                  {s.name} → {form.label}
                  <span style={{ color: '#c0a0e0', fontSize: 10, marginLeft: 8 }}>gain ×{form.gainMult}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <p style={{ fontSize: 11, color: '#8070a0', marginBottom: 12 }}>No evolved students ready for ascension this week.</p>
        )}
        <button type="button" style={{ ...C.btn('#444'), width: '100%' }} onClick={onDismiss}>Acknowledge — the act has begun</button>
      </div>
    </div>
  );
}
