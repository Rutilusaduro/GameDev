// B2 — beat-by-beat scene presentation layer for text-engine prose.
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { useTextFlags } from '../contexts/TextFlagContext.jsx';
import {
  CHOICE_INTENTS,
  inferChoiceIntent,
  mapTraceNodesToBeats,
  splitProseToBeats,
} from '../utils/sceneStage.js';
import { getPlayerPrefs } from '../gameData/playerPrefs.js';

function StageChip({ student }) {
  const st = getStage(student?.lbs ?? 130);
  return (
    <span
      title={`${st.label} · ${Math.round(student?.lbs ?? 0)} lbs`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: `${st.color}33`,
        border: `2px solid ${st.color}`,
        fontSize: 10,
        fontWeight: 700,
        color: st.color,
        flexShrink: 0,
      }}
    >
      {st.id}
    </span>
  );
}

function BeatParagraph({
  beat,
  visible,
  reducedMotion,
  onLongPress,
  onDevTap,
  devMode,
}) {
  const pressTimer = useRef(null);
  const [devSlot, setDevSlot] = useState(null);

  const clearPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const startPress = () => {
    clearPress();
    pressTimer.current = setTimeout(() => {
      onLongPress?.(beat.text, beat.index);
      pressTimer.current = null;
    }, 650);
  };

  const handleClick = () => {
    if (devMode && beat.nodes?.length) {
      const node = beat.nodes[0];
      setDevSlot(node.key);
      onDevTap?.(node);
      return;
    }
    if (devMode) onDevTap?.({ key: `beat:${beat.index + 1}`, text: beat.text });
  };

  return (
    <p
      role="button"
      tabIndex={visible ? 0 : -1}
      onClick={handleClick}
      onTouchStart={startPress}
      onTouchEnd={clearPress}
      onTouchCancel={clearPress}
      onMouseDown={startPress}
      onMouseUp={clearPress}
      onMouseLeave={clearPress}
      onContextMenu={(e) => {
        e.preventDefault();
        onLongPress?.(beat.text, beat.index);
      }}
      style={{
        fontSize: 13,
        color: '#e8d8c0',
        lineHeight: 1.85,
        margin: '0 0 12px',
        fontStyle: 'italic',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(6px)',
        transition: reducedMotion ? 'none' : 'opacity 0.28s ease, transform 0.28s ease',
        cursor: devMode ? 'pointer' : 'default',
      }}
    >
      {beat.text}
      {devSlot && (
        <span style={{ display: 'block', fontSize: 9, color: '#70a0c0', fontStyle: 'normal', marginTop: 4 }}>
          [{devSlot}]
        </span>
      )}
    </p>
  );
}

export function SceneStage({
  prose = '',
  traceNodes = [],
  student = null,
  week = 1,
  locale = null,
  choices = [],
  onPinBeat = null,
  section = 'scene',
  stateLine = '',
  accentColor = '#9050c8',
  instantText: instantTextProp,
  scrollback = [],
  onScrollbackPush = null,
  children = null,
  footer = null,
}) {
  const { enabled: devMode } = useTextFlags();
  const [prefs] = useState(() => getPlayerPrefs());
  const instantText = instantTextProp ?? prefs.instantText;
  const [revealed, setRevealed] = useState(instantText ? Infinity : 0);
  const [scrollOpen, setScrollOpen] = useState(false);
  const [pinnedToast, setPinnedToast] = useState(null);
  const holdRef = useRef(null);
  const scrollPushedRef = useRef(false);
  const reducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  const beats = useMemo(
    () => mapTraceNodesToBeats(splitProseToBeats(prose), traceNodes),
    [prose, traceNodes],
  );

  const allRevealed = revealed >= beats.length;
  const visibleCount = instantText ? beats.length : Math.min(revealed, beats.length);

  useEffect(() => {
    if (instantText) setRevealed(Infinity);
  }, [instantText, prose]);

  useEffect(() => {
    scrollPushedRef.current = false;
  }, [prose]);

  useEffect(() => {
    if (allRevealed && prose?.trim() && onScrollbackPush && !scrollPushedRef.current) {
      scrollPushedRef.current = true;
      onScrollbackPush({
        week,
        studentName: student?.name,
        locale: locale?.label,
        excerpt: prose.slice(0, 280),
        full: prose,
      });
    }
  }, [allRevealed, prose, week, student?.name, locale?.label, onScrollbackPush]);

  const revealNext = useCallback(() => {
    setRevealed((r) => (r >= beats.length ? r : r + 1));
  }, [beats.length]);

  const revealAll = useCallback(() => {
    setRevealed(Infinity);
  }, []);

  const startHold = () => {
    if (instantText) return;
    holdRef.current = setInterval(() => {
      setRevealed((r) => {
        if (r >= beats.length) {
          clearInterval(holdRef.current);
          return r;
        }
        return r + 1;
      });
    }, reducedMotion ? 0 : 90);
  };

  const endHold = () => {
    if (holdRef.current) {
      clearInterval(holdRef.current);
      holdRef.current = null;
    }
  };

  const handlePin = (text, beatIndex) => {
    if (!onPinBeat) return;
    onPinBeat({ excerpt: text, beatIndex, week, sceneId: section });
    setPinnedToast('Pinned to dossier');
    setTimeout(() => setPinnedToast(null), 1800);
  };

  return (
    <div>
      {/* State header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 10,
          padding: '6px 8px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {locale?.glyph && <span style={{ fontSize: 16 }} title={locale.label}>{locale.glyph}</span>}
        <span style={{ fontSize: 10, color: '#7060a0', letterSpacing: 1 }}>W{week}</span>
        {student && <StageChip student={student} />}
        {student && (
          <span style={{ fontSize: 10, color: '#9080a8', flex: 1 }}>
            {student.name} · {getStage(student.lbs).label}
          </span>
        )}
        {scrollback?.length > 0 && (
          <button
            type="button"
            style={{ ...C.smBtn, margin: 0, fontSize: 9 }}
            onClick={() => setScrollOpen((o) => !o)}
          >
            {scrollOpen ? 'Hide' : 'Transcript'}
          </button>
        )}
      </div>

      {scrollOpen && scrollback.length > 0 && (
        <div
          style={{
            maxHeight: 120,
            overflowY: 'auto',
            marginBottom: 10,
            padding: 8,
            background: 'rgba(0,0,0,0.25)',
            borderRadius: 6,
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {scrollback.slice().reverse().map((entry, i) => (
            <div key={`${entry.week}-${i}`} style={{ fontSize: 10, color: '#9080a8', marginBottom: 6, lineHeight: 1.5 }}>
              <span style={{ color: '#6050a0' }}>W{entry.week}</span>
              {entry.studentName && <span> · {entry.studentName}</span>}
              <div style={{ fontStyle: 'italic', color: '#b0a090' }}>{entry.excerpt}</div>
            </div>
          ))}
        </div>
      )}

      {/* Beats */}
      <div style={{ marginBottom: 8, minHeight: beats.length ? undefined : 8 }}>
        {beats.map((beat, i) => (
          <BeatParagraph
            key={`${beat.index}-${beat.text.slice(0, 24)}`}
            beat={beat}
            visible={i < visibleCount}
            reducedMotion={reducedMotion || instantText}
            onLongPress={onPinBeat ? handlePin : null}
            devMode={devMode}
          />
        ))}
      </div>

      {!allRevealed && beats.length > 0 && (
        <button
          type="button"
          style={{
            ...C.smBtn,
            width: '100%',
            marginBottom: 10,
            borderColor: `${accentColor}60`,
            color: accentColor,
          }}
          onClick={revealNext}
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
        >
          Tap for next beat · hold to fast-forward
        </button>
      )}

      {allRevealed && choices.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
          {choices.map((ch) => {
            const intent = inferChoiceIntent(ch.label, ch.intent);
            const meta = CHOICE_INTENTS[intent] || CHOICE_INTENTS.press;
            return (
              <button
                key={ch.id || ch.label}
                type="button"
                disabled={ch.disabled}
                style={{
                  ...C.btn(ch.disabled ? '#2a2a2a' : accentColor),
                  width: '100%',
                  textAlign: 'left',
                  padding: '9px 14px',
                  opacity: ch.disabled ? 0.45 : 1,
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
                onClick={ch.onClick}
              >
                <span style={{ fontSize: 16, lineHeight: 1.2 }} title={meta.label}>{meta.icon}</span>
                <span style={{ flex: 1, fontSize: 12, lineHeight: 1.5 }}>{ch.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {allRevealed && children}
      {allRevealed && footer}

      {pinnedToast && (
        <div style={{ fontSize: 10, color: '#60c090', marginTop: 6, textAlign: 'center' }}>{pinnedToast}</div>
      )}

      {allRevealed && prose?.trim() && (
        <TextFlagToolbar section={section} stateLine={stateLine} text={prose} nodes={traceNodes} />
      )}
    </div>
  );
}
