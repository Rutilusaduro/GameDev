// ═══════════════════════════════════════════════════════════════
// V2 MODALS — Feast Ritual, Dream, Echo
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../../styles.js';
import { FEAST_RITUALS, getAvailableRituals } from '../../gameData/v2/feastRituals.js';
import { DREAM_CHOICES, pickDreamScenario } from '../../gameData/v2/appetiteDreams.js';
import { ECHO_TYPES, echoDepthTier } from '../../gameData/v2/bodyEcho.js';
import { createContext } from '../../textEngine/engine.js';
import { renderRitual } from '../../textEngine/scenes/v2/rituals/index.js';
import { renderDreamOpen, renderDreamScenario, renderDreamWake } from '../../textEngine/scenes/v2/dreams/index.js';
import { renderEchoReplay } from '../../textEngine/scenes/v2/echo/index.js';
import { StudentPortrait } from '../StudentPortrait.jsx';

export function FeastRitualModal({ students, ownedSkills, ownedClassSkills, onRun, onClose }) {
  const [selected, setSelected] = useState([]);
  const [ritualId, setRitualId] = useState(null);
  const available = getAvailableRituals({ ownedSkills, ownedClassSkills, students });
  const ritual = FEAST_RITUALS.find((r) => r.id === ritualId);

  const toggle = (id) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleRun = () => {
    if (!ritual) return;
    const ctx = createContext({ group: selected.map((id) => students.find((s) => s.id === id)).filter(Boolean) });
    const text = renderRitual(ritualId, ctx);
    onRun?.(ritualId, selected, text);
  };

  return (
    <div style={C.modalOverlay}>
      <div style={{ ...C.modal, maxWidth: 480 }}>
        <p style={C.secT}>Feast Rituals</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {available.map((r) => (
            <button key={r.id} type="button" style={{ ...C.btn(ritualId === r.id ? '#8a4020' : '#3a2818'), fontSize: 11, textAlign: 'left' }}
              onClick={() => { setRitualId(r.id); setSelected([]); }}>
              {r.icon} {r.label} — {r.apCost} AP
              <span style={{ display: 'block', fontSize: 9, color: '#a08060' }}>{r.desc}</span>
            </button>
          ))}
        </div>
        {ritual && (
          <>
            <p style={{ fontSize: 10, color: '#8090a0' }}>Select {ritual.minStudents}–{ritual.maxStudents} students</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {students.filter((s) => !s.hidden).map((s) => (
                <button key={s.id} type="button"
                  style={{ ...C.smBtn, background: selected.includes(s.id) ? '#4a3020' : undefined }}
                  onClick={() => toggle(s.id)}>
                  {s.name}
                </button>
              ))}
            </div>
            <button type="button" style={{ ...C.btn('#8a4020'), width: '100%' }}
              disabled={selected.length < ritual.minStudents || selected.length > ritual.maxStudents}
              onClick={handleRun}>
              Begin Ritual
            </button>
          </>
        )}
        <button type="button" style={{ ...C.smBtn, width: '100%', marginTop: 8 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function DreamModal({ student, onChoice, onClose }) {
  const [phase, setPhase] = useState('open');
  const [scenario, setScenario] = useState(null);
  const ctx = createContext({ subject: student });

  const startDream = () => {
    const sc = pickDreamScenario(student);
    setScenario(sc);
    setPhase('dream');
  };

  const choices = scenario ? (DREAM_CHOICES[scenario.id] || DREAM_CHOICES.endless_buffet) : [];

  return (
    <div style={C.modalOverlay}>
      <div style={{ ...C.modal, maxWidth: 440 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <StudentPortrait student={student} size={64} />
          <p style={{ ...C.secT, margin: 0, color: '#6090c8' }}>Appetite Dream</p>
        </div>
        {phase === 'open' && (
          <>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: '#b0c0d8' }}>{renderDreamOpen(ctx)}</p>
            <button type="button" style={{ ...C.btn('#3060a0'), width: '100%' }} onClick={startDream}>Enter the Dream</button>
          </>
        )}
        {phase === 'dream' && scenario && (
          <>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: '#b0c0d8', marginBottom: 12 }}>
              {renderDreamScenario(scenario.id, ctx)}
            </p>
            {choices.map((ch) => (
              <button key={ch.id} type="button" style={{ ...C.btn('#284868'), width: '100%', marginBottom: 6, fontSize: 11 }}
                onClick={() => { onChoice?.(scenario, ch, renderDreamWake(ctx)); onClose?.(); }}>
                {ch.label}
              </button>
            ))}
          </>
        )}
        <button type="button" style={{ ...C.smBtn, width: '100%', marginTop: 8 }} onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export function EchoArchivePanel({ student, echoesState, ownedSkills, ownedClassSkills, onReplay, onResonate }) {
  const echoes = (echoesState?.moments || []).filter((m) => m.studentId === student?.id);
  if (!echoes.length) {
    return <p style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>No echoes captured yet. Milestones will preserve themselves here.</p>;
  }
  const ctx = createContext({ subject: student });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {echoes.map((echo) => {
        const meta = ECHO_TYPES[echo.type] || { label: echo.type, icon: '📜' };
        const depth = echoDepthTier(echo.replayCount || 0);
        return (
          <div key={echo.id} style={{ ...C.card, padding: 8 }}>
            <div style={{ fontSize: 10, color: '#80a0b8' }}>{meta.icon} {meta.label} — Week {echo.week}</div>
            <button type="button" style={{ ...C.smBtn, marginTop: 4, fontSize: 9 }}
              onClick={() => onReplay?.(echo, renderEchoReplay(echo.type, depth, ctx))}>
              Replay (depth {depth})
            </button>
            {!echo.resonated && (
              <button type="button" style={{ ...C.smBtn, marginTop: 4, marginLeft: 4, fontSize: 9 }}
                onClick={() => onResonate?.(echo)}>
                Resonate
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
