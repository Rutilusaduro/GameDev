// ═══════════════════════════════════════════════════════════════
// PRE-STREAM RITUAL — paginated setup UI with themed pages + pixel art
// ═══════════════════════════════════════════════════════════════
import { useState, useEffect, useMemo } from 'react';
import { C } from '../styles.js';
import {
  PRE_STREAM_ACTIONS, PRE_STREAM_CHOICES, BRANDS,
} from '../gameData/streaming.js';
import {
  PRE_STREAM_THEMES, PRE_STREAM_CHOICE_META, PRE_STREAM_INTRO,
} from '../gameData/streamPreStreamArt.js';
import { StreamPixelIcon } from './StreamPixelIcon.jsx';

function ProgressRail({ choices, accent }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16 }}>
      {PRE_STREAM_ACTIONS.map((action) => {
        const done = Boolean(choices?.[action.id]);
        const theme = PRE_STREAM_THEMES[action.id];
        return (
          <div
            key={action.id}
            title={action.label}
            style={{
              width: done ? 28 : 10,
              height: 10,
              borderRadius: 5,
              background: done ? (theme?.accent || accent) : '#ffffff12',
              border: `1px solid ${done ? theme?.accent || accent : '#ffffff20'}`,
              transition: 'width 0.25s ease, background 0.2s',
            }}
          />
        );
      })}
    </div>
  );
}

function ChoiceCard({ actionId, choice, theme, onPick, brandId }) {
  const key = `${actionId}.${choice.id}`;
  const meta = PRE_STREAM_CHOICE_META[key] || {};
  return (
    <button
      type="button"
      onClick={() => onPick(actionId, choice.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        width: '100%',
        padding: '12px 14px',
        background: `linear-gradient(135deg, ${theme.accentGlow}, #0a060c)`,
        border: `1px solid ${theme.accent}55`,
        borderRadius: 10,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        transition: 'transform 0.12s ease, border-color 0.12s, box-shadow 0.12s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = theme.accent;
        e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accentGlow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.borderColor = `${theme.accent}55`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <StreamPixelIcon spriteKey={key} size={52} glow={theme.accentGlow} brandId={brandId} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: theme.accent, marginBottom: 3 }}>
          {choice.label}
        </div>
        <div style={{ fontSize: 11, color: '#c8b0c0', lineHeight: 1.45, marginBottom: 4 }}>
          {meta.blurb || ''}
        </div>
        {meta.hint && (
          <span style={{
            fontSize: 9,
            letterSpacing: 1,
            color: theme.accentDim,
            background: `${theme.accent}18`,
            padding: '2px 7px',
            borderRadius: 4,
            border: `1px solid ${theme.accent}35`,
          }}>
            {meta.hint}
          </span>
        )}
      </div>
    </button>
  );
}

export function StreamPreStreamPanel({ streamSession, student, preStreamAction }) {
  const choices = streamSession.preStreamChoices || {};
  const doneCount = Object.keys(choices).length;
  const allDone = doneCount >= PRE_STREAM_ACTIONS.length;

  const [screen, setScreen] = useState('intro');
  const [vignetteActionId, setVignetteActionId] = useState(null);

  const currentAction = useMemo(
    () => PRE_STREAM_ACTIONS.find((a) => !choices[a.id]),
    [choices],
  );

  useEffect(() => {
    if (streamSession.phase === 'preStream') {
      setScreen('intro');
      setVignetteActionId(null);
    }
  }, [streamSession.studentId, streamSession.phase]);

  const handlePick = (actionId, choiceId) => {
    preStreamAction(actionId, choiceId);
    setVignetteActionId(actionId);
    setScreen('vignette');
  };

  const handleVignetteContinue = () => {
    setVignetteActionId(null);
    const count = Object.keys(streamSession.preStreamChoices || {}).length;
    setScreen(count >= PRE_STREAM_ACTIONS.length ? 'complete' : 'step');
  };

  const vignetteAction = vignetteActionId
    ? PRE_STREAM_ACTIONS.find((a) => a.id === vignetteActionId)
    : null;
  const vignetteTheme = vignetteActionId ? PRE_STREAM_THEMES[vignetteActionId] : null;
  const vignetteText = vignetteActionId
    ? streamSession.preStreamVignettes?.[vignetteActionId]
    : null;

  // ── INTRO ──────────────────────────────────────────────────────
  if (screen === 'intro') {
    return (
      <div style={{
        textAlign: 'center',
        padding: '8px 4px 4px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(231,76,60,0.12), transparent 55%)',
        borderRadius: 10,
      }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#e74c3c', marginBottom: 12 }}>
          📡 PRE-STREAM RITUAL
        </div>
        <div style={{
          fontSize: 26,
          fontWeight: 800,
          color: '#fff',
          lineHeight: 1.15,
          marginBottom: 10,
          textShadow: '0 0 30px rgba(231,76,60,0.35)',
        }}>
          {PRE_STREAM_INTRO.headline}
        </div>
        <div style={{ fontSize: 12, color: '#c0a0a8', lineHeight: 1.75, maxWidth: 420, margin: '0 auto 20px' }}>
          {PRE_STREAM_INTRO.sub}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 20 }}>
          {PRE_STREAM_ACTIONS.map((a) => {
            const t = PRE_STREAM_THEMES[a.id];
            return (
              <span key={a.id} style={{
                fontSize: 9,
                letterSpacing: 1,
                padding: '4px 10px',
                borderRadius: 20,
                color: t.accent,
                border: `1px solid ${t.accent}44`,
                background: `${t.accent}12`,
              }}>
                {a.emoji} {t.tag}
              </span>
            );
          })}
        </div>
        <button
          type="button"
          style={{ ...C.btn('#e74c3c'), width: '100%', fontSize: 14, padding: '12px 16px' }}
          onClick={() => setScreen('step')}
        >
          {PRE_STREAM_INTRO.cta} →
        </button>
      </div>
    );
  }

  // ── COMPLETE / RECAP ───────────────────────────────────────────
  if (screen === 'complete' || (allDone && screen !== 'vignette')) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#60e080', marginBottom: 8 }}>
          SETUP COMPLETE
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          Stream&apos;s ready.
        </div>
        <div style={{ fontSize: 11, color: '#a08090', marginBottom: 16 }}>
          {student.name} is prepped. Pick a challenge and go live.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18, textAlign: 'left' }}>
          {PRE_STREAM_ACTIONS.map((action) => {
            const t = PRE_STREAM_THEMES[action.id];
            const choiceId = choices[action.id];
            const choiceLabel = PRE_STREAM_CHOICES[action.id]?.find((c) => c.id === choiceId)?.label;
            const spriteKey = choiceId ? `${action.id}.${choiceId}` : null;
            return (
              <div key={action.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                background: '#0a060c',
                borderRadius: 8,
                border: `1px solid ${t.accent}33`,
              }}>
                {spriteKey && <StreamPixelIcon spriteKey={spriteKey} size={36} glow={t.accentGlow} brandId={student?.brand} />}
                <div>
                  <div style={{ fontSize: 9, letterSpacing: 2, color: t.accent }}>{t.tag}</div>
                  <div style={{ fontSize: 11, color: '#e0c8d0' }}>{choiceLabel || '—'}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          style={{ ...C.btn('#e74c3c'), width: '100%', fontSize: 14, padding: '12px' }}
          onClick={() => preStreamAction('__done__')}
        >
          Pick a Challenge →
        </button>
      </div>
    );
  }

  // ── VIGNETTE REVEAL ────────────────────────────────────────────
  if (screen === 'vignette' && vignetteAction && vignetteTheme) {
    const choiceId = choices[vignetteActionId];
    const choiceLabel = PRE_STREAM_CHOICES[vignetteActionId]?.find((c) => c.id === choiceId)?.label;
    return (
      <div style={{
        background: vignetteTheme.bg,
        borderRadius: 12,
        border: `1px solid ${vignetteTheme.border}`,
        padding: '16px 14px',
        boxShadow: `inset 0 0 40px ${vignetteTheme.accentGlow}`,
      }}>
        <ProgressRail choices={choices} accent={vignetteTheme.accent} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          {choiceId && (
            <StreamPixelIcon
              spriteKey={`${vignetteActionId}.${choiceId}`}
              size={56}
              glow={vignetteTheme.accentGlow}
              brandId={student?.brand}
            />
          )}
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: vignetteTheme.accent }}>{vignetteTheme.tag}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{choiceLabel}</div>
          </div>
        </div>
        <div style={{
          fontSize: 12,
          color: '#e8d0d8',
          lineHeight: 1.9,
          whiteSpace: 'pre-line',
          marginBottom: 16,
          padding: '12px 10px',
          background: 'rgba(0,0,0,0.35)',
          borderRadius: 8,
          borderLeft: `3px solid ${vignetteTheme.accent}`,
        }}>
          {vignetteText || '…'}
        </div>
        <button
          type="button"
          style={{ ...C.btn(vignetteTheme.accentDim), width: '100%', fontSize: 13 }}
          onClick={handleVignetteContinue}
        >
          Continue →
        </button>
      </div>
    );
  }

  // ── CATEGORY STEP ──────────────────────────────────────────────
  const action = currentAction || PRE_STREAM_ACTIONS[0];
  const theme = PRE_STREAM_THEMES[action.id];
  const stepIndex = PRE_STREAM_ACTIONS.findIndex((a) => a.id === action.id);
  const choiceList = PRE_STREAM_CHOICES[action.id] || [];

  return (
    <div style={{
      background: theme.bg,
      borderRadius: 12,
      border: `1px solid ${theme.border}`,
      padding: '14px 12px 12px',
      boxShadow: `inset 0 0 50px ${theme.accentGlow}`,
    }}>
      <ProgressRail choices={choices} accent={theme.accent} />

      <div style={{ fontSize: 9, letterSpacing: 3, color: theme.accent, marginBottom: 6 }}>
        STEP {stepIndex + 1} / {PRE_STREAM_ACTIONS.length} · {theme.tag}
      </div>
      <div style={{
        fontSize: 22,
        fontWeight: 800,
        color: '#fff',
        lineHeight: 1.2,
        marginBottom: 6,
        textShadow: `0 0 24px ${theme.accentGlow}`,
      }}>
        {theme.headline}
      </div>
      <div style={{ fontSize: 12, color: '#b8a0b0', marginBottom: 16, lineHeight: 1.6 }}>
        {theme.question}
      </div>

      {streamSession.brand && action.id === 'outfit' && (
        <div style={{
          fontSize: 10,
          color: theme.accent,
          marginBottom: 12,
          padding: '6px 10px',
          background: `${theme.accent}10`,
          borderRadius: 6,
          border: `1px dashed ${theme.accent}44`,
        }}>
          Sponsored by {BRANDS[streamSession.brand]?.name || streamSession.brand}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {choiceList.map((c) => (
          <ChoiceCard
            key={c.id}
            actionId={action.id}
            choice={c}
            theme={theme}
            onPick={handlePick}
            brandId={streamSession.brand}
          />
        ))}
      </div>

      {stepIndex > 0 && (
        <button
          type="button"
          style={{
            ...C.btn('#201018'),
            width: '100%',
            marginTop: 12,
            fontSize: 10,
            opacity: 0.7,
          }}
          onClick={() => setScreen('intro')}
        >
          ← Back to overview
        </button>
      )}
    </div>
  );
}
