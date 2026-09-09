import { useEffect, useState } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { ModalOverlay } from './ModalOverlay.jsx';
import { SALON_GUESTS, SALON_COURSES, SALON_SERVICE_CHOICES } from '../gameData/chloeSalon.js';

const ACCENT = '#8b2942';
const GOLD = '#c9a227';

export function SalonAppetitModal({
  salonState,
  students,
  onClose,
  onStartSession,
  onPickMenu,
  onService,
  onDigestif,
  soundEnabled = true,
}) {
  const session = salonState?.session;
  const chloe = students.find((s) => s.id === salonState?.chloeStudentId);
  const [pickedGuests, setPickedGuests] = useState([]);
  useEffect(() => {
    playHallPassSound('confirm', soundEnabled);
  }, [soundEnabled, session?.phase, salonState?.chloeStudentId]);

  const toggleGuest = (id) => {
    setPickedGuests((prev) => {
      if (prev.includes(id)) return prev.filter((g) => g !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const closeSalon = () => { playHallPassSound('click', soundEnabled); onClose(); };

  if (!session) {
    const available = SALON_GUESTS.filter((g) => salonState.prestige >= g.unlockPrestige);
    return (
      <ModalOverlay onClose={closeSalon} soundEnabled={soundEnabled} style={{ zIndex: 360 }}>
        <div className="hall-pass-modal-in salon-modal" style={{ ...C.modal, maxWidth: 560, background: '#12080c', border: `1px solid ${ACCENT}55`, maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: GOLD, marginBottom: 8 }}>🥂 SALON DE L'APPÉTIT</div>
          <div style={{ fontSize: 12, color: '#e8d0d8', lineHeight: 1.7, marginBottom: 12 }}>
            Prestige {salonState.prestige} · Evenings {salonState.eveningsHosted} · Indulgence {salonState.indulgence}
          </div>
          <div style={{ fontSize: 11, color: '#b89098', marginBottom: 10 }}>Select up to 3 guests (click to toggle):</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {available.map((g) => {
              const on = pickedGuests.includes(g.id);
              return (
                <button
                  key={g.id}
                  type="button"
                  className="salon-choice-row"
                  style={{ ...C.btn(on ? ACCENT : '#3a2030'), textAlign: 'left', fontSize: 12 }}
                  onClick={() => toggleGuest(g.id)}
                >
                  {g.name}{g.scandal ? ' ⚠️' : ''}{g.faculty ? ' · staff' : ''}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            style={{ ...C.btn(ACCENT), width: '100%', opacity: pickedGuests.length ? 1 : 0.45 }}
            disabled={!pickedGuests.length}
            onClick={() => onStartSession(pickedGuests)}
          >
            Begin the soirée → (2 AP)
          </button>
          <button type="button" style={{ ...C.btn('#444'), width: '100%', marginTop: 8 }} onClick={closeSalon}>Close</button>
        </div>
      </ModalOverlay>
    );
  }

  if (session.phase === 'menu') {
    return (
      <div style={{ ...C.overlay, zIndex: 360 }}>
        <div className="hall-pass-modal-in salon-modal" style={{ ...C.modal, maxWidth: 520, background: '#12080c', border: `1px solid ${GOLD}44` }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: GOLD }}>MENU DU SOIR ({session.menuPicks.length}/4)</div>
          <p style={{ fontSize: 12, color: '#dcc', lineHeight: 1.6 }}>Chloé plans four courses. {chloe ? `${Math.round(chloe.lbs)} lbs` : ''} and hungry for spectacle.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SALON_COURSES.map((c) => (
              <button key={c.id} type="button" className="salon-choice-row" style={{ ...C.btn('#4a2838'), textAlign: 'left', fontSize: 12 }} onClick={() => onPickMenu(c.id)}>
                {c.label} <span style={{ color: GOLD, fontSize: 10 }}>+{c.lbs} lbs · prestige +{c.prestige}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (session.phase === 'service') {
    const course = session.menuPicks[Math.min(session.round, session.menuPicks.length - 1)];
    return (
      <div style={{ ...C.overlay, zIndex: 360 }}>
        <div className="hall-pass-modal-in salon-modal" style={{ ...C.modal, maxWidth: 520, background: '#12080c', border: `1px solid ${ACCENT}55` }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>SERVICE — Round {session.round + 1}/4</div>
          <p style={{ fontSize: 12, color: '#ecc', marginBottom: 10 }}>{course?.label || 'Course'} is served.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {SALON_SERVICE_CHOICES.map((c) => (
              <button key={c.id} type="button" className="salon-choice-row" style={{ ...C.btn('#5a3040'), textAlign: 'left', fontSize: 12 }} onClick={() => onService(c.id)}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (session.phase === 'digestif') {
    return (
      <div style={{ ...C.overlay, zIndex: 360 }}>
        <div className="hall-pass-modal-in salon-modal" style={{ ...C.modal, maxWidth: 480, background: '#12080c', border: `1px solid ${GOLD}66` }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: GOLD }}>LE DIGESTIF</div>
          <p style={{ fontSize: 12, color: '#eed', lineHeight: 1.7 }}>
            Guests fade. Chloé stays — silk, candlelight, one more plate. "*Encore,*" she breathes. You encourage the final indulgence.
          </p>
          {session.log.slice(-3).map((line, i) => (
            <div key={i} style={{ fontSize: 11, color: '#b8a0a8', marginBottom: 4 }}>{line}</div>
          ))}
          <button type="button" style={{ ...C.btn(GOLD), width: '100%', marginTop: 12 }} onClick={() => { playHallPassSound('confirm', soundEnabled); onDigestif(); }}>Finish the evening ✓</button>
        </div>
      </div>
    );
  }

  return null;
}
