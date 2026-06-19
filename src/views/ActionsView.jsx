import { C, LUXE } from '../styles.js';
import { MotionCard } from '../components/Luxe.jsx';

export function ActionsView({ ap, doClass, effectiveClassActions, famineWeek = false }) {
  const sortedActions = [...effectiveClassActions].sort((a, b) => {
    if (famineWeek && a.id === 'refeast_ritual') return -1;
    if (famineWeek && b.id === 'refeast_ritual') return 1;
    return 0;
  });

  return (
    <div>
      {famineWeek && (
        <div style={{ ...C.infoBox('rgba(80,20,20,.35)'), border: '1px solid #80202050', fontSize: 12, color: '#f0a0a0', lineHeight: 1.7, marginBottom: 16 }}>
          🕯️ <strong>Famine Week</strong> - the semester is frozen until you complete a <strong>Refeast Ritual</strong> (4 AP below). Next Week is disabled until scarcity eases.
        </div>
      )}

      <div style={{ ...C.card, cursor: 'default', marginBottom: 14, padding: '14px 16px' }}>
        <p style={{ ...C.secT, marginBottom: 6 }}>Class-Wide Actions</p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <div style={{ fontSize: 24, color: LUXE.cream, fontWeight: 700 }}>{ap} AP</div>
          <div style={{ fontSize: 12, color: '#c8a078' }}>available for the week</div>
        </div>
      </div>

      <div style={C.grid2}>
        {sortedActions.map((a) => {
          const affordable = ap >= a.cost;
          const urgent = famineWeek && a.id === 'refeast_ritual';
          return (
            <MotionCard
              key={a.id}
              disabled={!affordable}
              style={{
                ...C.card,
                opacity: affordable ? 1 : 0.42,
                cursor: affordable ? 'default' : 'not-allowed',
                border: urgent ? '1px solid rgba(232,96,96,0.55)' : C.card.border,
                background: urgent
                  ? 'linear-gradient(155deg, rgba(92,24,34,0.74), rgba(24,8,14,0.84))'
                  : C.card.background,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'flex-start', marginBottom: 6 }}>
                <div style={{ fontWeight: 800, color: urgent ? '#ffb0a0' : LUXE.cream, fontSize: 14 }}>{a.label}</div>
                <span style={{ ...C.tag(affordable ? 'rgba(217,160,77,0.18)' : 'rgba(120,84,99,0.18)', affordable ? LUXE.gold2 : '#8e6a76') }}>
                  {a.cost === 0 ? 'FREE' : `${a.cost} AP`}
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#b897aa', marginBottom: 10, lineHeight: 1.5 }}>{a.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 10, fontSize: 10, color: '#d5a868' }}>
                <span>+{(a.cal[0] / 1000).toFixed(0)}k-{(a.cal[1] / 1000).toFixed(0)}k cal</span>
                <span>{a.full} fullness</span>
              </div>
              <button
                style={{ ...C.btn(urgent ? '#7d2b3a' : '#6b2447'), width: '100%', opacity: affordable ? 1 : 0.55 }}
                disabled={!affordable}
                onClick={() => doClass(a)}
              >
                Use Action
              </button>
            </MotionCard>
          );
        })}
      </div>
    </div>
  );
}
