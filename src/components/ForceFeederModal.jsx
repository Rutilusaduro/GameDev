// ═══════════════════════════════════════════════════════════════
// FORCE FEEDER — Gullet Calibration event modal
// ═══════════════════════════════════════════════════════════════
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { C } from '../styles.js';
import { WEIGHT_STAGES, getStage } from '../gameData/stages.js';
import { TALIA_STUDENT_ID } from '../gameData/talia.js';
import {
  GULLET_BEAT_COUNT,
  CHOKE_MAX,
  createGulletSession,
  registerBeatHit,
  tickGulletSession,
  mistimedPress,
  emergencyRelease,
  finalizeGulletScore,
} from '../gameData/forceFeederEvent.js';
import {
  getInventionTier,
  getInventionTierLabel,
  getForceFeederBoardMods,
  availableGrowthZones,
} from '../gameData/inventionUpgrades.js';
import {
  renderForceFeederSetup,
  renderForceFeederFeed,
  renderForceFeederAftermath,
} from '../textEngine/scenes/forceFeeder/index.js';

const ACCENT = '#6a5088';
const PULSE_COLOR = '#c070a0';
const CHOKE_COLOR = '#c05040';

export function ForceFeederModal({
  state,
  students,
  labState,
  week,
  onSelectTarget,
  onComplete,
  onClose,
}) {
  const { phase, targetId, session, resultParams, prose, growthZone = 'default' } = state || {};
  const target = students.find((s) => s.id === targetId);
  const tier = getInventionTier(labState, 'feeding_mask');
  const tierLabel = getInventionTierLabel(labState, 'feeding_mask');
  const mods = getForceFeederBoardMods(labState);
  const zones = availableGrowthZones(labState);
  const [now, setNow] = useState(0);
  const [holding, setHolding] = useState(false);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const tick = useCallback(() => {
    if (!startRef.current) return;
    const elapsed = performance.now() - startRef.current;
    setNow(elapsed);
    const cur = sessionRef.current;
    if (cur && (cur.phase === 'playing' || cur.phase === 'ready')) {
      const next = tickGulletSession(cur, elapsed, labState, { holding });
      const chokeDelta = Math.abs((next.chokeMeter ?? 0) - (cur.chokeMeter ?? 0));
      if (chokeDelta > 0.25 || next.chokedOut !== cur.chokedOut || next.phase !== cur.phase) {
        onComplete({ type: 'session', session: next });
      } else {
        sessionRef.current = { ...cur, lastTickMs: elapsed, holding };
      }
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [holding, labState, onComplete]);

  useEffect(() => {
    if (phase === 'calibrate' && session) {
      if (!startRef.current) startRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
      return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }
    return undefined;
  }, [phase, session, tick]);

  const activeBeat = session?.beats?.[session.beatIndex];
  const pulseProgress = activeBeat
    ? Math.min(1, Math.max(0, 1 - Math.abs(now - activeBeat.pulseAt) / (activeBeat.windowMs * 1.4)))
    : 0;
  const chokePct = Math.min(100, Math.round(session?.chokeMeter ?? 0));

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
    if (phase !== 'calibrate' || !session || session.chokedOut) return;
    if (session.phase !== 'playing' && session.phase !== 'ready') return;
    const started = startRef.current ?? performance.now();
    if (!startRef.current) startRef.current = started;
    const elapsed = performance.now() - started;
    const active = session.beats[session.beatIndex];
    const nearPulse = active && Math.abs(elapsed - active.pulseAt) > active.windowMs * 1.4;
    let next = session.phase === 'ready'
      ? { ...session, phase: 'playing' }
      : session;
    if (nearPulse && session.phase === 'playing') {
      next = mistimedPress(next, labState);
    } else {
      next = registerBeatHit(next, elapsed, labState);
    }
    onComplete({ type: 'session', session: next });
  };

  const handleEmergency = () => {
    if (!session || !mods.emergencyRelease) return;
    onComplete({ type: 'session', session: emergencyRelease(session, labState) });
  };

  useEffect(() => {
    const down = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        setHolding(true);
        if (e.type === 'keydown' && !e.repeat) handlePulse();
      }
    };
    const up = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') setHolding(false);
    };
    if (phase === 'calibrate') {
      window.addEventListener('keydown', down);
      window.addEventListener('keyup', up);
    }
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  });

  const beatTotal = session?.beats?.length ?? GULLET_BEAT_COUNT;
  const candidates = students.filter((s) => !s.hidden || s.id === TALIA_STUDENT_ID);

  return (
    <div style={{ ...C.overlay, zIndex: 1250 }}>
      <div style={{
        ...C.modal,
        maxWidth: 660,
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
        <div style={{ fontSize: 14, fontWeight: 700, color: '#c0a8e0', marginBottom: 4 }}>
          {tierLabel}
        </div>
        <div style={{ fontSize: 9, color: '#7060a0', marginBottom: 10 }}>
          Time pulses · manage choke · efficiency + control set your tier
        </div>

        {phase === 'setup' && (
          <>
            <div style={{ fontSize: 11, color: '#9080b0', lineHeight: 1.7, marginBottom: 12, fontStyle: 'italic' }}>
              Select a target. Mistimed presses and holding too long build the Choke Meter — overflow causes spillage.
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
            {tier >= 2 && zones.length > 1 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: ACCENT, marginBottom: 6 }}>GROWTH ZONE</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {zones.map((z) => (
                    <button
                      key={z.id}
                      style={{ ...C.btn(growthZone === z.id ? ACCENT : '#1a1830'), fontSize: 9, padding: '5px 8px' }}
                      onClick={() => onComplete({ type: 'zone', growthZone: z.id })}
                    >
                      {z.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                onClick={() => onComplete({
                  type: 'start',
                  session: createGulletSession(labState, growthZone),
                })}
              >
                Begin calibration
              </button>
            </div>
          </>
        )}

        {phase === 'calibrate' && session && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 11, color: '#c0b0e0' }}>
              <span>Target: <strong>{target?.name}</strong></span>
              <span style={{ fontSize: 9, color: '#8070a0' }}>
                Pulse {Math.min(session.beatIndex + 1, beatTotal)}/{beatTotal}
              </span>
            </div>

            <div style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 9, color: CHOKE_COLOR, letterSpacing: 2, marginBottom: 3 }}>
                CHOKE METER {chokePct}/{CHOKE_MAX}
                {session.chokedOut && <span style={{ marginLeft: 8 }}>— SPILL</span>}
              </div>
              <div style={{ height: 8, background: '#1a0818', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${chokePct}%`,
                  background: chokePct > 75 ? '#e04030' : chokePct > 45 ? '#c07030' : '#804050',
                  transition: 'width 0.12s',
                }}
                />
              </div>
            </div>

            <div style={{
              height: 110,
              background: '#0a0818',
              borderRadius: 10,
              border: `1px solid ${session.chokedOut ? CHOKE_COLOR : `${PULSE_COLOR}40`}`,
              marginBottom: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
            >
              <div style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${PULSE_COLOR}${Math.round(50 + pulseProgress * 70).toString(16).padStart(2, '0')} 0%, transparent 72%)`,
                transform: `scale(${0.75 + pulseProgress * 0.55})`,
              }}
              />
              <div style={{ position: 'absolute', bottom: 8, fontSize: 8, color: '#7060a0', letterSpacing: 1 }}>
                {holding ? 'RELEASE BEFORE CHOKE BUILDS' : 'TAP / SPACE ON THE PULSE'}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
              {session.beats.map((b) => (
                <div
                  key={b.id}
                  style={{
                    flex: 1,
                    height: 5,
                    borderRadius: 2,
                    background: b.hit === 'perfect' ? '#60c080'
                      : b.hit === 'good' ? '#90b050'
                        : b.hit === 'messy' ? '#c09040'
                          : b.hit === 'miss' ? '#a04040'
                            : '#2a2040',
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                style={{ ...C.btn(PULSE_COLOR), flex: 2, fontSize: 14, padding: '12px 0', opacity: session.chokedOut ? 0.4 : 1 }}
                disabled={session.chokedOut || session.phase === 'complete'}
                onMouseDown={() => setHolding(true)}
                onMouseUp={() => setHolding(false)}
                onMouseLeave={() => setHolding(false)}
                onClick={handlePulse}
              >
                Pulse
              </button>
              {mods.emergencyRelease && (
                <button
                  style={{ ...C.btn('#503030'), flex: 1, fontSize: 10, opacity: session.emergencyUsed ? 0.35 : 1 }}
                  disabled={session.emergencyUsed || session.chokedOut}
                  onClick={handleEmergency}
                >
                  Emergency release
                </button>
              )}
            </div>
          </>
        )}

        {phase === 'aftermath' && target && (
          <>
            <div style={{ fontSize: 12, color: '#c0b0e0', marginBottom: 8, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              <span>{target.name}</span>
              {resultParams?.performanceTier && (
                <span style={{ ...C.tag(`${ACCENT}40`, '#d0c0f0'), fontSize: 9 }}>
                  {resultParams.performanceTier.toUpperCase()}
                </span>
              )}
              {resultParams?.pointsEarned > 0 && (
                <span style={{ ...C.tag('#2a483040', '#80d0a0'), fontSize: 9 }}>
                  +{resultParams.pointsEarned} INVENTION PTS
                </span>
              )}
            </div>
            {resultParams && (
              <div style={{ fontSize: 9, color: '#7060a0', marginBottom: 8 }}>
                Efficiency {resultParams.efficiencyPct ?? resultParams.scorePct ?? '?'}%
                {' · '}Choke {resultParams.chokeMeter ?? '?'}%
              </div>
            )}
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
  return {
    phase, targetId: null, session: null, resultParams: null, prose: null, growthZone: 'default',
  };
}

export function advanceForceFeederOnComplete(state, payload, target, week, labState = null) {
  if (payload.type === 'zone') {
    return { ...state, growthZone: payload.growthZone };
  }
  if (payload.type === 'start') {
    return { ...state, phase: 'calibrate', session: payload.session };
  }
  if (payload.type === 'session') {
    const session = payload.session;
    if (session.phase !== 'complete') {
      return { ...state, session };
    }
    const result = finalizeGulletScore(session, labState);
    return {
      ...state,
      phase: 'aftermath',
      session,
      resultParams: {
        performanceTier: result.tier,
        targetIsTalia: target?.id === TALIA_STUDENT_ID,
        efficiencyPct: result.efficiencyPct,
        chokeMeter: result.chokeMeter,
        chokedOut: result.chokedOut,
        scorePct: result.efficiencyPct,
        growthZone: state.growthZone || 'default',
      },
    };
  }
  return state;
}
