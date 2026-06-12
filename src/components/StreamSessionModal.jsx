// ═══════════════════════════════════════════════════════════════
// DESTINY STREAMING — Focus Bar modal (rAF real-time gameplay)
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from 'react';
import { C } from '../styles.js';
import { createContext, render } from '../textEngine/engine.js';
import {
  BRANDS, deriveBarParams, roundDurationFor, STREAM_DEFAULT_ROUNDS, STREAM_ROUND_SECONDS,
  getBrandControlLabel, getBrandControlTier,
  getStreamMilestoneLabel, SPECIAL_OUTCOME_DEFS,
} from '../gameData/streaming.js';
import { formatMoney } from '../gameData/wallet.js';
import { StreamPreStreamPanel } from './StreamPreStreamPanel.jsx';

const RED = '#e74c3c';
const RED_DIM = '#a03030';
const BG = 'linear-gradient(160deg,#120408,#1a0810,#120408)';

let streamAudioCtx = null;
function playStreamSound(kind, enabled = true) {
  if (!enabled || typeof window === 'undefined') return;
  try {
    if (!streamAudioCtx) streamAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const ctx = streamAudioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    if (kind === 'hit') {
      osc.frequency.value = 540;
      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
    } else {
      osc.frequency.value = 160;
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    }
    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch { /* audio optional */ }
}

function EatingBurst({ tier, reducedMotion }) {
  const emoji = tier === 'excellent' || tier === 'good' ? '🍕' : tier === 'poor' || tier === 'verypoor' ? '😮‍💨' : '🍔';
  return (
    <div style={{
      textAlign: 'center', marginBottom: 10, fontSize: 28,
      animation: reducedMotion ? 'none' : 'streamEatPulse 0.9s ease-in-out infinite',
    }}>
      <style>{`
        @keyframes streamEatPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.18); opacity: 1; }
        }
      `}</style>
      {emoji} <span style={{ fontSize: 11, color: '#a08080', verticalAlign: 'middle' }}>eating…</span>
    </div>
  );
}

function tierColor(tier) {
  return ({
    excellent: '#60e080',
    good: '#a0d060',
    average: '#e0c040',
    poor: '#e08040',
    verypoor: '#e04040',
  })[tier] || '#a0a0a0';
}

function buildStreamContext(session, student, week, extra = {}) {
  const ctx = createContext({ subject: student, week });
  ctx.d.brand = session.brand;
  ctx.d.perf = extra.perf ?? session.lastRoundTier ?? 'average';
  ctx.d.challengeType = session.challenge?.category;
  ctx.d.intensity = session.challenge?.intensity;
  ctx.d.addiction = session.addiction;
  ctx.d.audienceTier = session.audienceTier;
  ctx.d.trend = extra.trend ?? session.trend;
  ctx.d.brandStreak = session.brandStreak ?? 0;
  ctx.d.brandControl = session.brandControlTier ?? getBrandControlTier(session.brandStreak ?? 0);
  ctx.d.recentPerf = session.recentPerf;
  ctx.d.streamVoice = student?.streamVoice;
  return ctx;
}

function pickChatLine(session, student, week, recentLines = []) {
  const perf = session.currentRoundTierSoFar || session.lastRoundTier || 'average';
  const weights = [
    { key: `stream.chat.perf.${perf}`, w: 50 },
    { key: `stream.chat.type.${session.challenge?.category}`, w: 15 },
  ];
  if (session.brand) {
    weights.push({ key: `stream.chat.brand.${session.brand}`, w: 15 + (session.brandStreak || 0) * 0.5 });
  }
  weights.push({ key: 'stream.chat.perf.average', w: 10 });
  if (session.audienceTier === 'early') {
    weights.push({ key: 'stream.chat.parasocial.early', w: 12 });
  }
  if (session.audienceTier === 'mid' || session.audienceTier === 'late' || session.audienceTier === 'veryLate') {
    const parasocialW = session.audienceTier === 'veryLate' ? 25 : session.audienceTier === 'late' ? 15 : 8;
    weights.push({ key: `stream.chat.parasocial.${session.audienceTier}`, w: parasocialW });
  }
  if (session.trend === 'improving' || session.trend === 'declining') {
    weights.push({ key: `stream.chat.trend.${session.trend}`, w: 10 });
  }
  const control = session.brandControlTier || getBrandControlTier(session.brandStreak);
  if (control === 'soldOut') {
    weights.push({ key: 'stream.chat.brandControl.soldOut', w: 18 });
  } else if (control === 'late') {
    weights.push({ key: 'stream.chat.brandControl.late', w: 10 });
  }
  if (session.challenge?.intensity === 'extreme') {
    weights.push({ key: 'stream.chat.rare', w: 8 });
  }
  if (perf === 'poor' || perf === 'verypoor') {
    weights.push({ key: 'stream.chat.scenario.struggling', w: 12 });
  } else if (perf === 'good' || perf === 'excellent') {
    weights.push({ key: 'stream.chat.scenario.eating', w: 10 });
  }
  weights.push({ key: 'stream.chat.scenario.teased', w: 6 });

  for (let attempt = 0; attempt < 6; attempt++) {
    const total = weights.reduce((s, x) => s + x.w, 0);
    let roll = Math.random() * total;
    let pick = weights[0];
    for (const w of weights) {
      roll -= w.w;
      if (roll <= 0) { pick = w; break; }
    }
    const ctx = buildStreamContext(session, student, week, { perf });
    const line = render(`{${pick.key}}`, ctx);
    if (line && !recentLines.includes(line)) return line;
  }
  return null;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function FocusBar({ barParams, onHit, onMiss, active, paused, reducedMotion, soundEnabled }) {
  const [pos, setPos] = useState(0.5);
  const [flash, setFlash] = useState(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const zoneCenter = 0.5;
  const speedMult = reducedMotion ? 0.55 : 1;

  useEffect(() => {
    if (!active || paused) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return undefined;
    }
    let last = performance.now();
    const tick = (now) => {
      const dt = now - last;
      last = now;
      tRef.current += dt * 0.001 * (barParams?.speed || 0.78) * speedMult;
      const p = (Math.sin(tRef.current * Math.PI * 2) + 1) / 2;
      setPos(p);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, paused, barParams?.speed, speedMult]);

  const handleClick = () => {
    if (!active || paused) return;
    const half = (barParams?.zoneSize || 0.2) / 2;
    const inZone = pos >= zoneCenter - half && pos <= zoneCenter + half;
    if (inZone) {
      const dist = Math.abs(pos - zoneCenter);
      const centerQuality = 1 - dist / half;
      setFlash('hit');
      playStreamSound('hit', soundEnabled);
      onHit(centerQuality);
    } else {
      setFlash('miss');
      playStreamSound('miss', soundEnabled);
      onMiss();
    }
    setTimeout(() => setFlash(null), 180);
  };

  const barH = 220;
  const zoneH = (barParams?.zoneSize || 0.2) * barH;
  const zoneTop = (zoneCenter - (barParams?.zoneSize || 0.2) / 2) * barH;
  const indTop = pos * barH;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') handleClick(); }}
        style={{
          position: 'relative',
          width: 48,
          height: barH,
          background: flash === 'hit' ? '#0a3010' : flash === 'miss' ? '#300a0a' : '#0a0608',
          border: `2px solid ${flash === 'hit' ? '#40c060' : flash === 'miss' ? '#c04040' : `${RED}60`}`,
          borderRadius: 8,
          cursor: active ? 'pointer' : 'default',
          transition: 'background 0.1s, border-color 0.1s',
        }}
      >
        <div style={{
          position: 'absolute', left: 4, right: 4, top: zoneTop, height: zoneH,
          background: 'rgba(60,180,80,0.35)', border: '1px solid #40a050', borderRadius: 4,
        }} />
        <div style={{
          position: 'absolute', left: 2, right: 2, top: indTop - 6, height: 12,
          background: flash === 'hit' ? '#60ff80' : flash === 'miss' ? '#ff6060' : '#fff',
          borderRadius: 3,
          boxShadow: '0 0 8px rgba(255,255,255,0.4)',
          transition: 'background 0.1s',
        }} />
      </div>
      <div style={{ fontSize: 10, color: RED_DIM }}>Click when the indicator is in the green zone</div>
    </div>
  );
}

export function StreamSessionModal({
  streamSessionState: ss,
  students,
  week,
  preStreamAction,
  selectChallenge,
  beginActiveRound,
  finishActiveRound,
  continueAfterBetweenRound,
  tapOutStream,
  wrapStream,
  closeStream,
  appendStreamChat,
  updateRoundPerf,
  tickRoundStamina,
}) {
  const student = students.find((st) => st.id === ss.studentId);
  const chatRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const soundEnabled = !reducedMotion;
  const [paused, setPaused] = useState(false);
  const [roundStats, setRoundStats] = useState({ hits: 0, misses: 0, centerQualities: [] });
  const [roundTimeLeft, setRoundTimeLeft] = useState(0);
  const roundEndingRef = useRef(false);
  const chatDedupeRef = useRef([]);
  const statsRef = useRef({ hits: 0, misses: 0, centerQualities: [] });

  const barParams = ss.phase === 'round' ? deriveBarParams({
    weightStageId: ss.weightStageId,
    addiction: ss.addiction,
    resistance: ss.resistance,
    roundIndex: ss.roundIndex,
    totalRounds: ss.totalRounds,
    challenge: ss.challenge,
  }) : null;

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [ss.chatLines?.length]);

  // roundStart → round after wind-up
  useEffect(() => {
    if (ss.phase !== 'roundStart') return undefined;
    const t = setTimeout(() => beginActiveRound(), 1800);
    return () => clearTimeout(t);
  }, [ss.phase, ss.roundIndex, beginActiveRound]);

  statsRef.current = roundStats;

  // Active round timer
  useEffect(() => {
    if (ss.phase !== 'round') {
      roundEndingRef.current = false;
      return undefined;
    }
    const dur = roundDurationFor(ss.challenge);
    setRoundTimeLeft(dur);
    const empty = { hits: 0, misses: 0, centerQualities: [] };
    setRoundStats(empty);
    statsRef.current = empty;
    roundEndingRef.current = false;
    const endAt = Date.now() + dur * 1000;

    const interval = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt - Date.now()) / 1000));
      setRoundTimeLeft(left);
      if (left <= 0 && !roundEndingRef.current) {
        roundEndingRef.current = true;
        clearInterval(interval);
        finishActiveRound(statsRef.current);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [ss.phase, ss.roundIndex, ss.challenge, finishActiveRound]);

  // Chat scheduler during active round
  useEffect(() => {
    if (ss.phase !== 'round' || !student || !appendStreamChat) return undefined;
    const tick = () => {
      const line = pickChatLine(ss, student, week, chatDedupeRef.current);
      if (line) {
        chatDedupeRef.current = [...chatDedupeRef.current.slice(-7), line];
        appendStreamChat(line);
      }
    };
    const id = setInterval(tick, 1400 + Math.random() * 800);
    return () => clearInterval(id);
  }, [ss.phase, ss.currentRoundTierSoFar, ss.trend, student, week, ss, appendStreamChat]);

  // In-round stamina drain
  useEffect(() => {
    if (ss.phase !== 'round' || !tickRoundStamina) return undefined;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      const dt = now - last;
      last = now;
      tickRoundStamina(dt);
    }, 250);
    return () => clearInterval(id);
  }, [ss.phase, tickRoundStamina]);

  const syncLivePerf = useCallback((next) => {
    if (updateRoundPerf) {
      updateRoundPerf(next.hits, next.misses, next.centerQualities);
    }
  }, [updateRoundPerf]);

  const onHit = useCallback((centerQuality) => {
    setRoundStats((prev) => {
      const next = {
        hits: prev.hits + 1,
        misses: prev.misses,
        centerQualities: [...prev.centerQualities, centerQuality],
      };
      statsRef.current = next;
      syncLivePerf(next);
      return next;
    });
  }, [syncLivePerf]);

  const onMiss = useCallback(() => {
    setRoundStats((prev) => {
      const next = {
        hits: prev.hits,
        misses: prev.misses + 1,
        centerQualities: prev.centerQualities,
      };
      statsRef.current = next;
      syncLivePerf(next);
      return next;
    });
  }, [syncLivePerf]);

  if (!student) return null;

  const staminaColor = ss.stamina > 50 ? '#60c080' : ss.stamina > 20 ? '#e0c040' : '#e04040';
  const ctx = buildStreamContext(ss, student, week);

  return (
    <div style={C.overlay} key="stream-modal">
      <div style={{ ...C.modal, maxWidth: 680, background: BG, border: `1px solid ${RED}50` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ color: RED, fontWeight: 'bold', letterSpacing: 2, fontSize: 11 }}>
            📡 LIVE — {student.name.toUpperCase()}
          </div>
          {ss.brand && (
            <div style={{ fontSize: 10, color: RED_DIM }}>
              {BRANDS[ss.brand]?.name || ss.brand}
            </div>
          )}
        </div>

        {/* PRE-STREAM */}
        {ss.phase === 'preStream' && (
          <StreamPreStreamPanel
            streamSession={ss}
            student={student}
            preStreamAction={preStreamAction}
          />
        )}

        {/* CHALLENGE SELECT */}
        {ss.phase === 'challengeSelect' && (
          <>
            <div style={{ fontSize: 9, letterSpacing: 3, color: RED, marginBottom: 6 }}>
              {ss.brand ? `${BRANDS[ss.brand]?.name?.toUpperCase()} CHALLENGE` : 'PICK A CHALLENGE'}
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.2 }}>
              What&apos;s on the menu tonight?
            </div>
            <div style={{ fontSize: 11, color: '#c0a0a8', marginBottom: 8 }}>
              Variable rounds & timing per challenge · brand-weighted offers
            </div>
            {ss.brandStreak > 0 && (
              <div style={{
                fontSize: 10, color: '#ff90a0', marginBottom: 14, padding: '6px 10px',
                background: 'rgba(80,10,20,0.4)', borderRadius: 6, border: '1px solid #e74c3c33',
              }}>
                🏷️ {getBrandControlLabel(ss.brandStreak)} · streak {ss.brandStreak}
                {(ss.brandControlTier === 'soldOut' || getBrandControlTier(ss.brandStreak) === 'soldOut') && (
                  <span style={{ color: '#ff6080' }}> · selling out hard</span>
                )}
              </div>
            )}
            {(ss.offeredChallenges || []).map((ch) => {
              const [rMin, rMax] = ch.roundCount || [STREAM_DEFAULT_ROUNDS, STREAM_DEFAULT_ROUNDS];
              const secs = ch.roundSeconds ?? STREAM_ROUND_SECONDS;
              return (
              <button key={ch.id} style={{ ...C.btn(RED_DIM), width: '100%', marginBottom: 6, textAlign: 'left', padding: '10px 12px' }}
                onClick={() => selectChallenge(ch.id)}>
                <div style={{ fontWeight: 700, fontSize: 12 }}>{ch.label}</div>
                <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>
                  {ch.category} · {ch.intensity} · {rMin === rMax ? `${rMin} rounds` : `${rMin}–${rMax} rounds`} · {secs}s
                </div>
              </button>
              );
            })}
          </>
        )}

        {/* ROUND START */}
        {ss.phase === 'roundStart' && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 10, color: RED_DIM, letterSpacing: 2, marginBottom: 8 }}>
              ROUND {ss.roundIndex + 1} / {ss.totalRounds}
            </div>
            <div style={{ fontSize: 13, color: '#e8c0c0', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 16 }}>
              {ss.roundStartLine || render('{stream.roundStart}', ctx)}
            </div>
            <div style={{ fontSize: 10, color: '#806060' }}>Starting focus bar…</div>
          </div>
        )}

        {/* ACTIVE ROUND */}
        {ss.phase === 'round' && (
          <div style={{ display: 'flex', gap: 14 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#c0a0a0', marginBottom: 6 }}>
                <span>Round {ss.roundIndex + 1}/{ss.totalRounds}</span>
                <span style={{ color: staminaColor }}>⚡ {Math.round(ss.stamina)}%</span>
                <span style={{ color: tierColor(ss.currentRoundTierSoFar || 'average') }}>
                  {(ss.currentRoundTierSoFar || 'average').toUpperCase()}
                </span>
                <span>⏱ {roundTimeLeft}s</span>
              </div>
              <div style={{ background: '#0a0608', borderRadius: 4, height: 8, marginBottom: 8 }}>
                <div style={{ background: staminaColor, width: `${ss.stamina}%`, height: '100%', borderRadius: 4, transition: 'width 0.3s' }} />
              </div>
              <FocusBar
                barParams={barParams}
                onHit={onHit}
                onMiss={onMiss}
                active={!paused}
                paused={paused}
                reducedMotion={reducedMotion}
                soundEnabled={soundEnabled}
              />
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 10, fontSize: 10, color: '#a08080' }}>
                <span style={{ color: '#60c080' }}>✓ {roundStats.hits}</span>
                <span style={{ color: '#e06060' }}>✗ {roundStats.misses}</span>
                {paused && <span style={{ color: '#e0c040' }}>⏸ Paused</span>}
              </div>
              <div style={{ fontSize: 10, color: '#705050', textAlign: 'center', marginTop: 6 }}>
                Session gain: +{Math.round(ss.sessionGain * 10) / 10} lbs
              </div>
            </div>
            <div style={{ width: 200, display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 9, color: RED_DIM, letterSpacing: 2, marginBottom: 4 }}>LIVE CHAT</div>
              <div ref={chatRef} style={{
                flex: 1, background: '#080408', border: `1px solid ${RED}25`, borderRadius: 6,
                padding: 8, maxHeight: 260, overflowY: 'auto', minHeight: 200,
              }}>
                {(ss.chatLines || []).slice(-40).map((l, i) => (
                  <div key={`${i}-${l.slice(0, 12)}`} style={{ fontSize: 9, color: '#c09090', marginBottom: 3 }}>💬 {l}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* BETWEEN ROUND */}
        {ss.phase === 'betweenRound' && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: RED_DIM }}>ROUND {ss.roundIndex + 1} COMPLETE</div>
              <div style={{
                padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 'bold',
                color: tierColor(ss.lastRoundTier), border: `1px solid ${tierColor(ss.lastRoundTier)}`,
              }}>
                {(ss.lastRoundTier || '').toUpperCase()}
              </div>
              {ss.lastRoundLbs > 0 && (
                <div style={{ fontSize: 10, color: '#80c080' }}>+{ss.lastRoundLbs} lbs</div>
              )}
            </div>
            <EatingBurst tier={ss.lastRoundTier} reducedMotion={reducedMotion} />
            <div style={{ fontSize: 12, color: '#e8c0c0', fontStyle: 'italic', lineHeight: 1.8, marginBottom: 12, whiteSpace: 'pre-line' }}>
              {ss.betweenRoundLine}
            </div>
            {ss.chatLines?.length > 0 && (
              <div style={{ background: '#080408', borderRadius: 6, padding: 8, marginBottom: 12, maxHeight: 60, overflowY: 'auto' }}>
                {ss.chatLines.slice(-4).map((l, i) => (
                  <div key={i} style={{ fontSize: 9, color: '#b09090' }}>💬 {l}</div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', gap: 8 }}>
              {!ss.tapOutCause && ss.roundIndex + 1 < ss.totalRounds && (
                <button style={{ ...C.btn(RED), flex: 1 }} onClick={continueAfterBetweenRound}>
                  Next Round →
                </button>
              )}
              {!ss.tapOutCause && ss.roundIndex + 1 >= ss.totalRounds && (
                <button style={{ ...C.btn(RED), flex: 1 }} onClick={continueAfterBetweenRound}>
                  See Results →
                </button>
              )}
              {!ss.tapOutCause && (
                <button style={{ ...C.btn('#401018'), flex: 1 }} onClick={tapOutStream}>
                  Tap Out
                </button>
              )}
              {ss.tapOutCause && (
                <button style={{ ...C.btn(RED), flex: 1 }} onClick={continueAfterBetweenRound}>
                  End Stream →
                </button>
              )}
            </div>
          </>
        )}

        {/* RESOLUTION */}
        {ss.phase === 'resolution' && ss.rewardsPreview && (
          <>
            <div style={{ fontSize: 11, color: RED_DIM, letterSpacing: 2, marginBottom: 10 }}>STREAM RESULTS</div>
            {(ss.specialOutcomes?.length > 0) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {ss.specialOutcomes.map((id) => {
                  const def = SPECIAL_OUTCOME_DEFS[id];
                  if (!def) return null;
                  return (
                    <div key={id} style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                      background: 'rgba(255,200,60,0.15)', border: '1px solid #e0c04080', color: '#ffe080',
                    }}>
                      {def.emoji} {def.label}
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ fontSize: 12, color: '#d8b0b0', lineHeight: 2, marginBottom: 16 }}>
              <div>Overall: <span style={{ color: tierColor(ss.rewardsPreview.overallTier) }}>{ss.rewardsPreview.overallTier.toUpperCase()}</span></div>
              {ss.trend && ss.trend !== 'steady' && (
                <div>Trend: <span style={{ color: ss.trend === 'improving' ? '#60c080' : '#e08060' }}>{ss.trend}</span></div>
              )}
              <div>Weight gain: <span style={{ color: '#80c080' }}>+{Math.round(ss.rewardsPreview.weightGain * 10) / 10} lbs</span></div>
              <div>Audience: +{ss.rewardsPreview.audienceGain}</div>
              {ss.brand && <div>Sponsor favor: +{ss.rewardsPreview.favorGain}</div>}
              <div>Revenue: ${ss.rewardsPreview.moneyGenerated} (your share: ${ss.rewardsPreview.playerShare})</div>
            </div>
            <button style={{ ...C.btn(RED), width: '100%' }} onClick={wrapStream}>
              Wrap Stream & Apply Rewards
            </button>
          </>
        )}

        {/* DONE */}
        {ss.phase === 'done' && (
          <>
            <div style={{ fontSize: 11, color: RED_DIM, letterSpacing: 2, marginBottom: 10 }}>STREAM WRAPPED</div>
            {((ss.milestoneFired?.length > 0) || (ss.specialOutcomes?.length > 0)) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {(ss.specialOutcomes || []).map((id) => {
                  const def = SPECIAL_OUTCOME_DEFS[id];
                  if (!def) return null;
                  return (
                    <div key={id} style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                      background: 'rgba(255,200,60,0.15)', border: '1px solid #e0c04080', color: '#ffe080',
                    }}>
                      {def.emoji} {def.label}
                    </div>
                  );
                })}
                {(ss.milestoneFired || []).map((key) => {
                  const def = getStreamMilestoneLabel(key);
                  return (
                    <div key={key} style={{
                      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700,
                      background: 'rgba(100,180,255,0.12)', border: '1px solid #60a0e080', color: '#a0d0ff',
                    }}>
                      {def.emoji} {def.label}
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ fontSize: 12, color: '#e8c0c0', fontStyle: 'italic', lineHeight: 1.9, whiteSpace: 'pre-line', marginBottom: 12 }}>
              {ss.endingText}
            </div>
            {(ss.destinyShare > 0 || ss.destinyMoneyFlavor) && (
              <div style={{ fontSize: 11, color: '#a08080', marginBottom: 12, fontStyle: 'italic' }}>
                {ss.destinyShare > 0 && (
                  <div style={{ color: '#ffe080', marginBottom: 4 }}>
                    💸 Destiny earned {formatMoney(ss.destinyShare)} this stream
                  </div>
                )}
                {ss.destinyMoneyFlavor && (
                  <div>She spent it on: {ss.destinyMoneyFlavor.replace(/^Destiny spends her (cut|share) on /i, '').replace(/\.$/, '')}</div>
                )}
              </div>
            )}
            <button style={{ ...C.btn(RED), width: '100%' }} onClick={closeStream}>Close</button>
          </>
        )}

        {ss.phase !== 'done' && ss.phase !== 'resolution' && (
          <button style={{ ...C.btn('#200810'), width: '100%', marginTop: 12, fontSize: 10 }} onClick={closeStream}>
            End Early
          </button>
        )}
      </div>
    </div>
  );
}
