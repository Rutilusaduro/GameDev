import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { getOriginDeck } from '../gameData/origins/index.js';

const AXES = [
  ['fixation', 'Fixation'],
  ['obsession', 'Obsession'],
  ['dependence', 'Dependence'],
  ['shame', 'Shame'],
];

export function OriginPickModal({ student, onPick, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('tier', soundEnabled); }, [soundEnabled, student?.id]);
  if (!student) return null;
  const deck = getOriginDeck(student);
  if (!deck.length) return null;

  return (
    <div style={{ ...C.overlay, zIndex: 470 }} role="dialog" aria-modal="true" aria-labelledby="origin-title">
      <div className="hall-pass-modal-in origin-pick-modal" style={{ ...C.modal, maxWidth: 680, background: 'linear-gradient(160deg,#080412,#140920,#080412)' }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#a878ff', marginBottom: 4 }}>ORIGIN DECK</div>
        <h2 id="origin-title" style={{ margin: '0 0 6px', color: '#ead8ff' }}>{student.name}: first meaningful contact</h2>
        <p style={{ color: '#a890c0', fontSize: 12, lineHeight: 1.7, margin: '0 0 14px' }}>
          Pick the backstory that colors her first semester. This choice locks for the run.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 10 }}>
          {deck.map((card) => (
            <button
              key={card.id}
              type="button"
              onClick={() => { playHallPassSound('confirm', soundEnabled); onPick(card.id); }}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                borderRadius: 12,
                padding: 14,
                fontFamily: 'inherit',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(168,120,255,0.45)',
                color: '#ead8ff',
                minHeight: 44,
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, color: '#d8c0ff', marginBottom: 5 }}>{card.label}</div>
              <div style={{ fontSize: 12, color: '#cbb8df', fontStyle: 'italic', lineHeight: 1.6, marginBottom: 10 }}>{card.voiceLine}</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 10, color: '#9c86b8' }}>
                {AXES.map(([key, label]) => (
                  <span key={key}>{label}: {card.psych[key]}</span>
                ))}
              </div>
              <div style={{ marginTop: 8, fontSize: 10, color: '#80d0ff' }}>
                Starts {card.gainStance}; register: {card.register.replace(/_/g, ' ')}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
