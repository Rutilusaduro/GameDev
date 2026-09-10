import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { roomVisitBadge } from '../gameData/roomVisit.js';
import { StudentPortrait } from './StudentPortrait.jsx';

export function FloorHallway({ students, onVisitRoom, soundEnabled = true }) {
  const residents = [...students].sort((a, b) => a.id - b.id);
  if (!residents.length) return null;

  return (
    <div style={{ marginBottom: 18 }}>
      <p style={C.secT}>Floor hallway — visit rooms</p>
      <div style={{ fontSize: 11, color: '#6a5088', marginBottom: 10, lineHeight: 1.55 }}>
        Knock, introduce yourself, and check in after residents gain weight — new scenes unlock at their door.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(168px,1fr))', gap: 8 }}>
        {residents.map((s) => {
          const badge = roomVisitBadge(s);
          return (
            <button
              key={s.id}
              type="button"
              className="floor-door-card"
              onClick={() => { playHallPassSound('click', soundEnabled); onVisitRoom?.(s.id); }}
              style={{
                ...C.card,
                textAlign: 'left',
                cursor: 'pointer',
                border: badge ? '1px solid #6a48a080' : '1px solid #2a1848',
                background: badge ? 'rgba(80,48,120,0.15)' : C.card.background,
                padding: '10px 12px',
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <StudentPortrait student={s} size={36} showLabel={false} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#d8a8ff' }}>{s.name}</div>
                  <div style={{ fontSize: 9, color: '#605080' }}>Room {s.id}</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: '#9080a8' }}>
                {badge === 'intro' && <span style={{ color: '#ffe8a0' }}>Introduce yourself</span>}
                {badge === 'stage' && <span style={{ color: '#c0a0ff' }}>Something changed inside</span>}
                {!badge && <span>Visit room</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
