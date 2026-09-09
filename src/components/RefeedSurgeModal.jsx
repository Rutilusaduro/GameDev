import { useEffect } from 'react';
import { C } from '../styles.js';
import { render } from '../textEngine/engine.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';

export function RefeedSurgeModal({ student, tapsNeeded = 3, taps = 0, onTap, onComplete, onDismiss, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('tier', soundEnabled); }, [soundEnabled, student?.id]);
  if (!student) return null;
  const memory = student.memoryMass ?? student.lbs;
  const pct = memory > 0 ? Math.min(100, Math.round((student.lbs / memory) * 100)) : 0;
  const line = render('{supernatural.refeed.surge}', {
    subject: student,
    d: { memoryMassBand: pct >= 80 ? 'high' : pct >= 50 ? 'mid' : 'low' },
  });

  return (
    <div style={{ ...C.overlay, zIndex: 8500 }}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 480, border: '1px solid #4060a0' }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: '#7090c0', marginBottom: 8 }}>✨ REFEED SURGE</div>
        <div style={{ fontSize: 13, color: '#d0d8f0', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 14 }}>
          {line || `${student.name} remembers every pound — feed the surge back into her.`}
        </div>
        <div style={{ fontSize: 11, color: '#90a8c8', marginBottom: 10 }}>
          Taps {taps}/{tapsNeeded} · memory {Math.round(memory)} lbs · ethereal {Math.round(student.etherealLbs ?? student.lbs)} lbs
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          {Array.from({ length: tapsNeeded }).map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                background: i < taps ? '#5080b0' : 'rgba(255,255,255,0.1)',
              }}
            />
          ))}
        </div>
        {taps < tapsNeeded ? (
          <button type="button" style={{ ...C.btn('#305080'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onTap(); }}>
            Feed the surge ({tapsNeeded - taps} left)
          </button>
        ) : (
          <button type="button" style={{ ...C.btn('#4060a0'), width: '100%' }} onClick={() => { playHallPassSound('confirm', soundEnabled); onComplete(); }}>
            Surge complete →
          </button>
        )}
        <button type="button" style={{ ...C.btn('#333'), width: '100%', marginTop: 8, fontSize: 10 }} onClick={() => { playHallPassSound('click', soundEnabled); onDismiss(); }}>
          Skip
        </button>
      </div>
    </div>
  );
}
