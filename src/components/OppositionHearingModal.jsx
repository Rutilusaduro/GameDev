import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { REMOVAL_HEARING, EMERGENCY_HEARING, pickHearingEnding } from '../gameData/oppositionHearings.js';
import { getSupernaturalHearingFlags } from '../gameData/supernaturalForms.js';
import { renderHearingPhase } from '../textEngine/scenes/opposition/index.js';

export function OppositionHearingModal({
  hearingState,
  students,
  opposition,
  week = 1,
  onChoice,
  onClose,
  soundEnabled = true,
}) {
  useEffect(() => { playHallPassSound('alert', soundEnabled); }, [soundEnabled, hearingState?.type, hearingState?.phaseIdx]);
  if (!hearingState) return null;
  const def = hearingState.type === 'emergency' ? EMERGENCY_HEARING : REMOVAL_HEARING;
  const student = hearingState.studentId != null ? students.find((s) => s.id === hearingState.studentId) : null;
  const done = hearingState.done;
  const phase = !done ? def.phases[hearingState.phaseIdx] : null;
  const hearingType = hearingState.type === 'emergency' ? 'emergency' : 'removal';
  const phaseText = phase && !done
    ? renderHearingPhase(hearingType, hearingState.phaseIdx, student, week)
    : null;
  const hearingFlags = getSupernaturalHearingFlags(students);
  const hasDiscreditPath = students.some((s) => s.evolvedForm === 'community_researcher' || s.evolvedForm === 'eating_streamer')
    || hearingFlags.hasArchivistDiscredit;
  const advocate = opposition?.aib?.rotatingAdvocate;
  const hasAdvocatePath = advocate && ['neutral', 'compromised', 'wavering'].includes(advocate.stance);
  const testifyWitness = students.find((s) => s.id !== hearingState.studentId && !s.hidden && (s.relationship || 0) >= 70);
  const visibleChoices = phase?.choices?.filter((ch) => {
    if (ch.id === 'discredit' && !hasDiscreditPath) return false;
    if (ch.id === 'advocate' && !hasAdvocatePath) return false;
    if (ch.id === 'spirit' && !hearingFlags.hasSpiritPath) return false;
    if (ch.id === 'hive' && !students.some((s) => s.evolvedForm === 'delivery_hive')) return false;
    return true;
  }) ?? [];

  return (
    <div style={{ ...C.overlay, zIndex: 380 }}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 580, background: 'linear-gradient(160deg,#0a0408,#1a0810,#0a0408)', border: '1px solid #8b304050', maxHeight: '88vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#c44', marginBottom: 6 }}>👁 {def.title.toUpperCase()}</div>
        {advocate && hasAdvocatePath && !done && (
          <div style={{ fontSize: 10, color: '#8090a8', marginBottom: 8 }}>
            Rotating seat: {advocate.name} ({advocate.stance}) may intervene.
          </div>
        )}
        {hearingState.log?.map((line, i) => (
          <div key={i} style={{ fontSize: 11, color: '#a08090', fontStyle: 'italic', marginBottom: 6, paddingLeft: 8, borderLeft: '2px solid #8b304030' }}>{line}</div>
        ))}
        <div style={{ fontSize: 12, color: '#e8d0d8', lineHeight: 1.85, marginBottom: 14 }}>
          {done ? hearingState.endingText : phaseText}
        </div>
        {!done && phase && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {visibleChoices.map((ch) => {
              const locked = ch.id === 'testify'
                ? !testifyWitness
                : !!(ch.relReq && (!student || student.relationship < ch.relReq));
              return (
                <button
                  key={ch.id}
                  type="button"
                  disabled={locked}
                  style={{ ...C.btn(locked ? '#2a1820' : '#6a2838'), textAlign: 'left', fontSize: 12, opacity: locked ? 0.4 : 1 }}
                  onClick={() => onChoice(ch.id)}
                >
                  {ch.label}
                </button>
              );
            })}
          </div>
        )}
        {done && (
          <button type="button" style={{ ...C.btn('#6a2838'), width: '100%', marginTop: 8 }} onClick={onClose}>Continue ✓</button>
        )}
      </div>
    </div>
  );
}

export { pickHearingEnding, REMOVAL_HEARING, EMERGENCY_HEARING };
