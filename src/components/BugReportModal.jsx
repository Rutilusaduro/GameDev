import { useState } from 'react';
import { C } from '../styles.js';
import {
  FIELD_NOTE_CATEGORIES,
  buildGameSnapshot,
  copyBugReport,
  downloadBugReport,
} from '../gameData/bugReport.js';

export function BugReportModal({ getSnapshotContext, prefillError, onClose }) {
  const [category, setCategory] = useState('other');
  const [steps, setSteps] = useState('');
  const [status, setStatus] = useState(null);

  const buildSnapshot = () => {
    const ctx = getSnapshotContext?.() || {};
    const playerNote = {
      category,
      steps: steps.trim() || null,
      prefillError: prefillError ? String(prefillError.message || prefillError) : null,
    };
    return buildGameSnapshot(ctx, playerNote);
  };

  const handleCopy = async () => {
    const ok = await copyBugReport(buildSnapshot());
    setStatus(ok ? 'Copied to clipboard.' : 'Copy failed — use download instead.');
  };

  const handleDownload = () => {
    downloadBugReport(buildSnapshot());
    setStatus('Field Note downloaded.');
  };

  return (
    <div style={{ ...C.overlay, zIndex: 400 }}>
      <div style={{ ...C.modal, maxWidth: 520, background: 'linear-gradient(165deg,#1a1410,#0f0c08)', border: '1px solid #8a704050', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: '#c9a060' }}>📋 FIELD NOTES</div>
          <button type="button" style={C.btn('#333')} onClick={onClose}>✕</button>
        </div>
        <p style={{ fontSize: 12, color: '#b8a890', lineHeight: 1.7, marginBottom: 14, fontStyle: 'italic' }}>
          The archivist keeps every note — week, weight, what you were doing when the world stuttered.
        </p>
        {prefillError && (
          <div style={{ fontSize: 10, color: '#c08060', marginBottom: 10, padding: 8, background: '#201010', borderRadius: 4 }}>
            Captured error: {String(prefillError.message || prefillError)}
          </div>
        )}
        <div style={{ fontSize: 10, color: '#888', marginBottom: 6 }}>What happened?</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
          {FIELD_NOTE_CATEGORIES.map((c) => (
            <label key={c.id} style={{ fontSize: 11, color: category === c.id ? '#e8d0b0' : '#999', cursor: 'pointer', display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="radio" name="field-category" checked={category === c.id} onChange={() => setCategory(c.id)} />
              {c.label}
            </label>
          ))}
        </div>
        <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>Steps to reproduce (optional)</div>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          placeholder="e.g. Week 14, opened Oversight, clicked Chamber…"
          rows={3}
          style={{ width: '100%', background: '#12100e', color: '#ddd', border: '1px solid #444', borderRadius: 6, padding: 8, fontSize: 11, marginBottom: 12, resize: 'vertical', boxSizing: 'border-box' }}
        />
        <div style={{ fontSize: 9, color: '#706050', marginBottom: 12, lineHeight: 1.5 }}>
          Snapshot includes week, students, opposition state, last log lines, and recent errors. No account data.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button type="button" style={{ ...C.btn('#5a4830') }} onClick={handleCopy}>Transcribe to clipboard</button>
          <button type="button" style={{ ...C.btn('#4a3828') }} onClick={handleDownload}>Seal the note (download .json)</button>
        </div>
        {status && <div style={{ fontSize: 10, color: '#80a060', marginTop: 10 }}>{status}</div>}
      </div>
    </div>
  );
}
