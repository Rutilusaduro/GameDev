// ═══════════════════════════════════════════════════════════════
// FORCE FEEDER — Gullet Calibration event modal
// ═══════════════════════════════════════════════════════════════
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { C } from '../styles.js';
import { WEIGHT_STAGES, getStage } from '../gameData/stages.js';
import { TALIA_STUDENT_ID } from '../gameData/talia.js';
import {
  GULLET_BEAT_COUNT,
  createGulletSession,
  registerBeatHit,
  finalizeGulletScore,
} from '../gameData/forceFeederEvent.js';
import { getUpgradeLevel } from '../gameData/inventionUpgrades.js';
import {
  renderForceFeederSetup,
  renderForceFeederFeed,
  renderForceFeederAftermath,
} from '../textEngine/scenes/forceFeeder/index.js';

const ACCENT = '#6a5088';
const PULSE_COLOR = '#c070a0';

export function ForceFeederModal({
  state,
  students,
  labState,
  week,
  onSelectTarget,
  onComplete,
  onClose,
}) {
  const { phase, targetId, session, resultParams, prose } = state || {};
  const target = students.find((s) => s.id === targetId);
  const upgradeLevel = getUpgradeLevel(labState, 'feeding_mask');
  const [now, setNow] = useState(0);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  const tick = useCallback(() => {
    if (!startRef.current) return;
    setNow(performance.now() - startRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (phase === 'calibrate' && session?.phase === 'ready') {
      startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }
    return undefined;
  }, [phase, session?.phase, tick]);

  const activeBeat = session?.beats?.[session.beatIndex];
  const pulseProgress = activeBeat && startRef.current != null
    ? Math.min(1, Math.max(0, (now - (activeBeat.pulseAt - startRef.current)) / 600))
    : 0;

  const setupProse = useMemo(() => {
    if (!target || phase !== 'setup') return '';
    return renderForceFeederSetup(target, week, {
      targetIsTalia: target.id === TALIA_STUDENT_ID,
    });
  }, [target, phase, week]);

  const aftermathProse = useMemo(() => {
    if (!target || phase !== 'aftermath' || !resultParams) return prose || '';
    if (prose) return prose;
    const feed = renderForceFeederFeed(target, week, resultParams);
    const close = renderForceFeederAftermath(target, week, resultParams);
    return [feed, close].filter(Boolean).join('\n\n');
  }, [target, phase, resultParams, prose, week]);

  if (!state) return null;

  const handlePulse = () => {
    if (phase !== 'calibrate' || !session || session.phase !== 'playing' && session.phase !== 'ready') return;
    const started = startRef.current ?? performance.now();
    if (!startRef.current) startRef.current = started;
    const elapsed = performance.now() - started;
    const next = registerBeatHit(
      session.phase === 'ready' ? { ...session, phase: 'playing' } : session,
      elapsed,
    );
    onComplete({ type: 'session', session: next });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handlePulse();
      }
    };
    if (phase === 'calibrate') window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const candidates = students.filter((s) => !s.hidden || s.id === TALIA_STUDENT_ID);

  return (
    <div style={{ ...C.overlay, zIndex: 1250 }}>
      <div style={{
        ...C.modal,
        maxWidth: 640,
        background: 'linear-gradient(160deg,#0a0814,#14102a,#0a0814)',
        border: `1px solid ${ACCENT}60`,
        maxHeight: '92vh',
        overflowY: 'auto',
        padding: 20,
      }}
      >
        <div style={{ fontSize: 9, letterSpacing: 4, color: ACCENT, marginBottom: 4 }}>
          GULLET CALIBRATION
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#c0a8e0', marginBottom: 8 }}>
          Force Feeder
        </div>

        {phase === 'setup' && (
          <>
            <div style={{ fontSize: 11, color: '#9080b0', lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>
              Select a target. The pump advances them one weight stage — timing determines efficiency and mess.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {candidates.map((s) => {
                const stage = getStage(s.lbs);
                const next = WEIGHT_STAGES[Math.min(WEIGHT_STAGES.length - 1, stage.id + 1)];
                return (
                  <button
                    key={s.id}
                    style={{ ...C.btn(targetId === s.id ? ACCENT : '#1a1830'), textAlign: 'left', padding: 10 }}
                    onClick={() => onSelectTarget(s.id)}
                  >
                    <div style={{ fontWeight: 700, color: '#d0c0f0', fontSize: 12 }}>{s.name}</div>
                    <div style={{ fontSize: 9, color: '#8070a0' }}>
                      {stage.label} → {next?.label || 'max'}
                    </div>
                  </button>
                );
              })}
            </div>
            {target && setupProse && (
              <div style={{ fontSize: 11, color: '#b0a0d0', lineHeight: 1.8, fontStyle: 'italic', marginBottom: 12 }}>
                {setupProse}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ ...C.btn('#302030'), flex: 1 }} onClick={onClose}>Cancel</button>
              <button
                style={{ ...C.btn(target ? ACCENT : '#302030'), flex: 2, opacity: target ? 1 : 0.45 }}
                disabled={!target}
                onClick={() => onComplete({ type: 'start', session: createGulletSession(upgradeLevel) })}
              >
                Begin calibration
              </button>
            </div>
          </>
        )}

        {phase === 'calibrate' && session && (
          <>
            <div style={{ fontSize: 12, color: '#c0b0e0', marginBottom: 6 }}>
              Target: <strong>{target?.name}</strong>
              <span style={{ fontSize: 9, color: '#8070a0', marginLeft: 8 }}>
                Beat {Math.min(session.beatIndex + 1, GULLET_BEAT_COUNT)}/{GULLET_BEAT_COUNT}
              </span>
            </div>
            <div style={{
              height: 120,
              background: '#0a0818',
              borderRadius: 10,
              border: `1px solid ${PULSE_COLOR}40`,
              marginBottom: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
            >
              <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${PULSE_COLOR}${Math.round(40 + pulseProgress * 80).toString(16).padStart(2, '0')} 0%, transparent 70%)`,
                transform: `scale(${0.8 + pulseProgress * 0.5})`,
                transition: 'transform 0.08s linear',
              }}
              />
              <div style={{ position: 'absolute', bottom: 8, fontSize: 9, color: '#7060a0', letterSpacing: 2 }}>
                TAP OR SPACE ON THE PULSE
              </div>
            </div>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {session.beats.map((b) => (
                <div
                  key={b.id}
                  style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    background: b.hit === 'perfect' ? '#60c080'
                      : b.hit === 'good' ? '#90b050'
                        : b.hit === 'messy' ? '#c09040'
                          : b.hit === 'miss' ? '#a04040'
                            : '#2a2040',
                  }}
                />
              ))}
            </div>
            <button style={{ ...C.btn(PULSE_COLOR), width: '100%', fontSize: 14, padding: '12px 0' }} onClick={handlePulse}>
              Pulse
            </button>
          </>
        )}

        {phase === 'aftermath' && target && (
          <>
            <div style={{ fontSize: 12, color: '#c0b0e0', marginBottom: 8 }}>
              {target.name}
              {resultParams?.performanceTier && (
                <span style={{ ...C.tag(`${ACCENT}40`, '#d0c0f0'), marginLeft: 8, fontSize: 9 }}>
                  {resultParams.performanceTier.toUpperCase()}
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: '#d8cce8', lineHeight: 1.9, fontStyle: 'italic', marginBottom: 16, whiteSpace: 'pre-line' }}>
              {aftermathProse}
            </div>
            <button style={{ ...C.btn(ACCENT), width: '100%' }} onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function buildForceFeederModalState(phase = 'setup') {
  return { phase, targetId: null, session: null, resultParams: null, prose: null };
}

export function advanceForceFeederOnComplete(state, payload, target, week) {
  if (payload.type === 'start') {
    return { ...state, phase: 'calibrate', session: payload.session };
  }
  if (payload.type === 'session') {
    const session = payload.session;
    if (session.phase !== 'complete') {
      return { ...state, session };
    }
    const { scorePct, tier } = finalizeGulletScore(session);
    return {
      ...state,
      phase: 'aftermath',
      session,
      scorePct,
      resultParams: {
        performanceTier: tier,
        targetIsTalia: target?.id === TALIA_STUDENT_ID,
        scorePct,
      },
    };
  }
  return state;
}
