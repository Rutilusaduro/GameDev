import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { WEIGHT_STAGES } from '../gameData/stages.js';
import { TextFlagToolbar } from './TextFlagToolbar.jsx';
import { buildStateLine } from '../textEngine/textFlagFormat.js';

const TIER_COLORS = {
  minor: '#8a8a7a',
  moderate: '#c8860a',
  major: '#c05030',
  critical: '#a02050',
};

export function DeviceTickPopup({ queue, onAdvance, onDismissAll, soundEnabled = true }) {
  const { events, index } = queue || {};
  const event = events?.[index];
  useEffect(() => {
    if (event) playHallPassSound(event.isMalfunction ? 'alert' : 'session', soundEnabled);
  }, [soundEnabled, index, event?.deviceId, event?.kind, event?.isMalfunction]);
  if (!queue?.events?.length || !event) return null;

  const isGrowthScene = event.kind === 'growth_scene';
  const isMalf = event.isMalfunction && !isGrowthScene;
  const tierColor = isGrowthScene
    ? (TIER_COLORS[event.malfunction?.tier] || '#5090b8')
    : isMalf
      ? (TIER_COLORS[event.malfunction?.tier] || '#c8860a')
      : '#4a8090';
  const progress = `${index + 1} / ${events.length}`;
  const startLabel = WEIGHT_STAGES[event.startStage]?.label || '';
  const endLabel = WEIGHT_STAGES[event.endStage]?.label || '';
  const prose = event.prose || '';
  const flagSection = isGrowthScene
    ? `growth.${event.causeType || 'scene'}`
    : `device.tick.${event.deviceId || 'unknown'}`;
  const flagState = buildStateLine(
    { id: event.studentId, name: event.studentName, lbs: event.endLbs ?? 0 },
    { stageLabel: endLabel, extra: isGrowthScene && startLabel ? `${startLabel} → ${endLabel}` : event.deviceLabel },
  );
  const displayProse = isMalf && event.malfunction?.text
    ? `${prose}\n\n${event.malfunction.text}`
    : prose;

  return (
    <div style={C.overlay}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: isGrowthScene ? 560 : 480, border: `1px solid ${tierColor}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: tierColor }}>
            {isGrowthScene ? '🌊 GROWTH EVENT' : isMalf ? '⚠️ DEVICE MALFUNCTION' : '⚙️ DEVICE TICK'}
          </div>
          <div style={{ fontSize: 10, color: '#708090', fontWeight: 600 }}>{progress}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 28 }}>{event.deviceIcon}</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#a0c0e0' }}>{event.deviceLabel}</div>
            <div style={{ fontSize: 10, color: '#708090' }}>
              {event.studentName}
              {!isGrowthScene && event.slot && <span> · {event.slot}</span>}
              {isGrowthScene && startLabel && endLabel && (
                <span> · {startLabel} → {endLabel}</span>
              )}
              {event.gainLbs > 0 && <span style={{ color: '#60a060' }}> · +{event.gainLbs} lbs</span>}
            </div>
          </div>
        </div>
        <div style={{
          fontSize: 12,
          color: '#c8d4e0',
          lineHeight: 1.75,
          fontStyle: isGrowthScene ? 'normal' : 'italic',
          whiteSpace: isGrowthScene ? 'pre-line' : 'normal',
          marginBottom: 8,
          minHeight: 48,
        }}>
          {prose}
        </div>
        <TextFlagToolbar
          section={flagSection}
          stateLine={flagState}
          text={displayProse}
          nodes={event.traceNodes}
        />
        {event.malfunction?.text && isMalf && (
          <div style={{ fontSize: 11, color: tierColor, marginBottom: 12, lineHeight: 1.6 }}>
            {event.malfunction.text}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button
            style={{ ...C.btn(tierColor), flex: 1 }}
            onClick={() => { playHallPassSound('click', soundEnabled); (index + 1 < events.length ? onAdvance() : onDismissAll()); }}
          >
            {index + 1 < events.length ? (isGrowthScene ? 'Next event →' : 'Next device →') : 'Done'}
          </button>
          {events.length > 1 && (
            <button style={{ ...C.btn('#333'), flex: 0 }} onClick={() => { playHallPassSound('click', soundEnabled); onDismissAll(); }}>
              Skip all
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
