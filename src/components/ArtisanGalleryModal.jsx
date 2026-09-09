import { useEffect } from 'react';
import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { FIELD_LOCATIONS, GALLERY_MOTIFS, GALLERY_MEDIUMS, STUDIO_ACTIONS } from '../gameData/fionaGallery.js';

const ACCENT = '#c47a2a';
const CREAM = '#f5e6d3';

export function ArtisanGalleryModal({
  galleryState,
  students,
  onClose,
  onEnroll,
  onOpenSubjectPicker,
  onStartStudio,
  onStudioAction,
  onFieldShoot,
  onExhibition,
  onConfirmEnroll,
  soundEnabled = true,
}) {
  const fiona = students.find((s) => s.id === galleryState?.fionaStudentId);
  const session = galleryState?.session;
  useEffect(() => {
    playHallPassSound('confirm', soundEnabled);
  }, [soundEnabled, session?.type, session?.round, galleryState?.subjectPickerOpen, galleryState?.fionaStudentId]);

  if (galleryState?.subjectPickerOpen) {
    const enrolled = new Set(galleryState.subjects.map((s) => s.studentId));
    const candidates = students.filter((s) => !s.hidden && s.id !== galleryState.fionaStudentId && !enrolled.has(s.id));
    return (
      <div style={{ ...C.overlay, zIndex: 360 }}>
        <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 480, background: '#1a1410', border: `1px solid ${ACCENT}55` }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>ENROLL SUBJECT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
            {candidates.map((s) => (
              <button key={s.id} type="button" style={{ ...C.btn('#3a3028'), textAlign: 'left', fontSize: 12 }} onClick={() => onConfirmEnroll(s.id, s.name)}>
                {s.name} · {Math.round(s.lbs)} lbs · rel {s.relationship}
              </button>
            ))}
          </div>
          <button type="button" style={{ ...C.btn('#555'), width: '100%', marginTop: 10 }} onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}>Cancel</button>
        </div>
      </div>
    );
  }

  if (session?.type === 'studio') {
    return (
      <div style={{ ...C.overlay, zIndex: 360 }}>
        <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 520, background: '#1a1410', border: `1px solid ${ACCENT}55` }}>
          <div style={{ fontSize: 9, letterSpacing: 3, color: ACCENT }}>STUDIO — Round {session.round + 1}/3</div>
          <p style={{ fontSize: 12, color: CREAM, lineHeight: 1.6 }}>Feed & frame. Fiona shoots while the subject eats.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {STUDIO_ACTIONS.map((a) => (
              <button key={a.id} type="button" style={{ ...C.btn('#4a3a28'), textAlign: 'left', fontSize: 12 }} onClick={() => onStudioAction(a.id)}>
                {a.label} <span style={{ fontSize: 10, color: '#c9a87c' }}>subject +{a.subjectLbs}{a.fionaLbs ? ` · Fiona +${a.fionaLbs}` : ''}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...C.overlay, zIndex: 360 }}>
      <div className="hall-pass-modal-in" style={{ ...C.modal, maxWidth: 600, background: '#1a1410', border: `1px solid ${ACCENT}44`, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: ACCENT }}>🖼 ARTISAN GALLERY</div>
        <div style={{ fontSize: 12, color: CREAM, marginBottom: 12, lineHeight: 1.6 }}>
          Patrons {galleryState.patrons} · Archive {galleryState.fieldArchive.length} · Exhibitions {galleryState.exhibitionsHeld}
          {fiona && <><br />Fiona · {Math.round(fiona.lbs)} lbs</>}
        </div>

        <div style={{ fontSize: 10, color: '#a89078', marginBottom: 6 }}>SUBJECTS ({galleryState.subjects.length}/3)</div>
        {galleryState.subjects.map((sub) => (
          <div key={sub.studentId} style={{ fontSize: 11, color: '#dcc8b0', marginBottom: 4, display: 'flex', gap: 8, alignItems: 'center' }}>
            <span>{sub.name} — {sub.sessions} sessions · {sub.photos.length} frames</span>
            <button type="button" style={{ ...C.btn(ACCENT), fontSize: 10, padding: '4px 8px' }} onClick={() => onStartStudio(sub.studentId)}>Studio</button>
          </div>
        ))}
        {galleryState.subjects.length < 3 && (
          <button type="button" style={{ ...C.btn('#4a3a30'), width: '100%', marginBottom: 12, fontSize: 12 }} onClick={onOpenSubjectPicker}>+ Enroll subject</button>
        )}

        <div style={{ fontSize: 10, color: '#a89078', marginBottom: 6 }}>FIELD SHOOT (1 AP)</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginBottom: 12 }}>
          {FIELD_LOCATIONS.map((loc) => (
            <button key={loc.id} type="button" style={{ ...C.btn('#3a3028'), fontSize: 11 }} onClick={() => onFieldShoot(loc.id)}>{loc.label}</button>
          ))}
        </div>

        <button type="button" style={{ ...C.btn(ACCENT), width: '100%', marginBottom: 8 }} onClick={() => onExhibition('celebratory')} disabled={galleryState.fieldArchive.length < 4}>
          Mount Exhibition (2 AP){galleryState.fieldArchive.length < 4 ? ' — need 4+ prints' : ''}
        </button>
        <button type="button" style={{ ...C.btn('#5a4030'), width: '100%', marginBottom: 8 }} onClick={() => onExhibition('confrontational')} disabled={galleryState.fieldArchive.length < 4}>
          Confrontational Opening (+scrutiny)
        </button>
        <button type="button" style={{ ...C.btn('#444'), width: '100%' }} onClick={() => { playHallPassSound('click', soundEnabled); onClose(); }}>Close gallery</button>

        {galleryState.lastCritic && (
          <div style={{ marginTop: 10, fontSize: 11, color: '#c9a87c' }}>Last critic: {galleryState.lastCritic}</div>
        )}
      </div>
    </div>
  );
}
