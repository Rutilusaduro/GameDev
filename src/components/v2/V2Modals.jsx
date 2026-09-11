// ═══════════════════════════════════════════════════════════════
// V2 MODALS — Feast Ritual, Dream, Echo
// ═══════════════════════════════════════════════════════════════
import { useEffect, useState } from 'react';
import { C } from '../../styles.js';
import { playHallPassSound } from '../../gameData/hallPassAudio.js';
import { FEAST_RITUALS, getAvailableRituals } from '../../gameData/v2/feastRituals.js';
import { DREAM_CHOICES, pickDreamScenario, DREAM_SCENARIOS, getDreamChoices } from '../../gameData/v2/appetiteDreams.js';
import { ECHO_TYPES, echoDepthTier } from '../../gameData/v2/bodyEcho.js';
import { createContext } from '../../textEngine/engine.js';
import { renderRitual } from '../../textEngine/scenes/v2/rituals/index.js';
import { renderDreamOpen, renderDreamScenario, renderDreamWake } from '../../textEngine/scenes/v2/dreams/index.js';
import { renderEchoReplay } from '../../textEngine/scenes/v2/echo/index.js';
import { StudentPortrait } from '../StudentPortrait.jsx';
import { SceneBackdrop } from './SceneBackdrop.jsx';
import { ModalOverlay } from '../ModalOverlay.jsx';

export function FeastRitualModal({ students, ownedSkills, ownedHallSkills, week = 1, reachLevel = 1, onRun, onClose, soundEnabled = true }) {
  const [selected, setSelected] = useState([]);
  const [ritualId, setRitualId] = useState(null);
  useEffect(() => { playHallPassSound('confirm', soundEnabled); }, [soundEnabled, ritualId]);
  const available = getAvailableRituals({ ownedSkills, ownedHallSkills, students, week, reachLevel });
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
    <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); onClose(); }} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in feast-ritual-modal" style={{ ...C.modal, maxWidth: 480 }}>
        <SceneBackdrop variant="feast" />
        <p style={C.secT}>Feast Rituals</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
          {available.map((r) => (
            <button key={r.id} type="button" className="feast-ritual-choice-row" style={{ ...C.btn(ritualId === r.id ? '#8a4020' : '#3a2818'), fontSize: 11, textAlign: 'left' }}
              onClick={() => { playHallPassSound('click', soundEnabled); setRitualId(r.id); setSelected([]); }}>
              {r.icon} {r.label} — {r.apCost} AP
              <span style={{ display: 'block', fontSize: 9, color: '#a08060' }}>{r.desc}</span>
            </button>
          ))}
        </div>
        {ritual && (
          <>
            <p style={{ fontSize: 10, color: '#8090a0' }}>Select {ritual.minStudents}–{ritual.maxStudents} residents</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {students.filter((s) => !s.hidden).map((s) => (
                <button key={s.id} type="button" className="feast-ritual-choice-row"
                  style={{ ...C.smBtn, background: selected.includes(s.id) ? '#4a3020' : undefined }}
                  onClick={() => toggle(s.id)}>
                  {s.name}
                </button>
              ))}
            </div>
            <button type="button" className="feast-ritual-choice-row" style={{ ...C.btn('#8a4020'), width: '100%' }}
              disabled={selected.length < ritual.minStudents || selected.length > ritual.maxStudents}
              onClick={() => { playHallPassSound('confirm', soundEnabled); handleRun(); }}>
              Begin Ritual
            </button>
          </>
        )}
        <button type="button" className="feast-ritual-choice-row" style={{ ...C.smBtn, width: '100%', marginTop: 8 }} onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}>Close</button>
      </div>
    </ModalOverlay>
  );
}

export function DreamModal({ student, week = 1, presetScenarioId, lucidUnlocked, onChoice, onClose, soundEnabled = true }) {
  const [phase, setPhase] = useState(presetScenarioId ? 'dream' : 'open');
  useEffect(() => { playHallPassSound('session', soundEnabled); }, [soundEnabled, student?.id, phase, presetScenarioId]);
  const [scenario, setScenario] = useState(() => {
    if (!presetScenarioId || !student) return null;
    return DREAM_SCENARIOS.find((d) => d.id === presetScenarioId) || null;
  });
  const ctx = createContext({ subject: student, week });

  const startDream = () => {
    const sc = pickDreamScenario(student, week);
    setScenario(sc);
    setPhase('dream');
  };

  const choices = scenario ? getDreamChoices(scenario.id, lucidUnlocked) : [];

  return (
    <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); onClose(); }} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in dream-modal" style={{ ...C.modal, maxWidth: 440 }}>
        <SceneBackdrop variant="dream" />
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <StudentPortrait student={student} size={64} />
          <p style={{ ...C.secT, margin: 0, color: '#6090c8' }}>Appetite Dream</p>
        </div>
        {phase === 'open' && (
          <>
            <p style={{ fontSize: 12, lineHeight: 1.6, color: '#b0c0d8' }}>{renderDreamOpen(ctx)}</p>
            <button type="button" className="dream-choice-row" style={{ ...C.btn('#3060a0'), width: '100%' }} onClick={() => { playHallPassSound('confirm', soundEnabled); startDream(); }}>Enter the Dream</button>
          </>
        )}
        {phase === 'dream' && scenario && (
          <>
            {lucidUnlocked && (
              <p style={{ fontSize: 10, color: '#90c8e8', marginBottom: 8 }}>Lucid dream — you steer the outcome.</p>
            )}
            <p style={{ fontSize: 12, lineHeight: 1.6, color: '#b0c0d8', marginBottom: 12 }}>
              {renderDreamScenario(scenario.id, ctx)}
            </p>
            {choices.map((ch) => (
              <button key={ch.id} type="button" className="dream-choice-row"
                style={{ ...C.btn(ch.lucidOnly || ch.id.startsWith('lucid_') ? '#406888' : '#284868'), width: '100%', marginBottom: 6, fontSize: 11 }}
                onClick={() => { playHallPassSound('click', soundEnabled); onChoice?.(scenario, ch, renderDreamWake(ctx)); onClose?.(); }}>
                {ch.label}
              </button>
            ))}
          </>
        )}
        <button type="button" className="dream-choice-row" style={{ ...C.smBtn, width: '100%', marginTop: 8 }} onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}>Close</button>
      </div>
    </ModalOverlay>
  );
}

export function EchoArchivePanel({ student, echoesState, ownedSkills, ownedHallSkills, onOpenEcho, onResonate, week = 1 }) {
  const echoes = (echoesState?.moments || []).filter((m) => m.studentId === student?.id);
  if (!echoes.length) {
    return <p style={{ fontSize: 11, color: '#607080', fontStyle: 'italic' }}>No echoes captured yet. Milestones will preserve themselves here.</p>;
  }
  const ctx = createContext({ subject: student, week });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {echoes.map((echo) => {
        const meta = ECHO_TYPES[echo.type] || { label: echo.type, icon: '📜' };
        const depth = echoDepthTier(echo.replayCount || 0);
        const preview = renderEchoReplay(echo.type, depth, ctx);
        return (
          <div key={echo.id} style={{ ...C.card, padding: 8 }}>
            <div style={{ fontSize: 10, color: '#80a0b8', marginBottom: 4 }}>
              {meta.icon} {meta.label} — Week {echo.week}
              {echo.resonated && <span style={{ color: '#70c090', marginLeft: 6 }}>✦ resonated</span>}
            </div>
            <p style={{ fontSize: 10, color: '#9080a8', lineHeight: 1.5, margin: '0 0 6px', fontStyle: 'italic' }}>
              {preview.slice(0, 120)}{preview.length > 120 ? '…' : ''}
            </p>
            <button type="button" className="echo-choice-row" style={{ ...C.smBtn, fontSize: 9 }}
              onClick={() => onOpenEcho?.(echo, preview, depth)}>
              Open Echo (depth {depth})
            </button>
            {!echo.resonated && (
              <button type="button" className="echo-choice-row" style={{ ...C.smBtn, marginLeft: 4, fontSize: 9 }}
                onClick={() => onResonate?.(echo)}>
                Resonate (1 AP)
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function EchoArchiveModal({ student, echo, prose, depth, onClose, onResonate, resonated, soundEnabled = true }) {
  useEffect(() => { playHallPassSound('tier', soundEnabled); }, [soundEnabled, echo?.id, student?.id]);
  if (!echo || !student) return null;
  const meta = ECHO_TYPES[echo.type] || { label: echo.type, icon: '📜' };
  return (
    <ModalOverlay onClose={() => { playHallPassSound('click', soundEnabled); onClose(); }} soundEnabled={soundEnabled}>
      <div className="hall-pass-modal-in echo-modal" style={{ ...C.modal, maxWidth: 520, borderColor: '#6080a060' }}>
        <SceneBackdrop variant="echo" />
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12 }}>
          <StudentPortrait student={student} size={64} />
          <div>
            <p style={{ ...C.secT, margin: 0, color: '#90b0c8' }}>Body Echo Archive</p>
            <p style={{ fontSize: 10, color: '#708090', margin: '4px 0 0' }}>
              {meta.icon} {meta.label} — Week {echo.week} · Depth {depth}
            </p>
          </div>
        </div>
        <div style={{ ...C.card, marginBottom: 12, maxHeight: 280, overflowY: 'auto' }}>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: '#d8e0e8', fontStyle: 'italic', margin: 0, whiteSpace: 'pre-wrap' }}>
            {prose}
          </p>
        </div>
        {!resonated && (
          <button type="button" className="echo-choice-row" style={{ ...C.btn('#3060a0'), width: '100%', marginBottom: 8 }}
            onClick={() => { playHallPassSound('confirm', soundEnabled); onResonate?.(echo); onClose?.(); }}>
            Resonate — deepen her growth permanently (1 AP)
          </button>
        )}
        <button type="button" className="echo-choice-row" style={{ ...C.smBtn, width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}>Close</button>
      </div>
    </ModalOverlay>
  );
}
