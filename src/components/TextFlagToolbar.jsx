import { useState } from 'react';
import { C } from '../styles.js';
import { getStage } from '../gameData/stages.js';
import { formatTextFlagExport, proseToFlagNodes, traceToFlagNodes, buildStateLine } from '../textEngine/textFlagFormat.js';
import { addTextFlag } from '../gameData/textFlagStore.js';
import { useTextFlags } from '../contexts/TextFlagContext.jsx';

const inputStyle = {
  background: '#181820',
  color: '#e0e0e0',
  border: '1px solid #555',
  borderRadius: 4,
  padding: '4px 6px',
  fontSize: 11,
  flex: 1,
};

function NodeAnnotator({ node, idx, anno, setAnno }) {
  const checked = idx in anno.notes;
  const editing = anno.open === idx;
  const toggle = () => {
    setAnno((a) => {
      const notes = { ...a.notes };
      if (checked) {
        delete notes[idx];
        return { ...a, notes, open: a.open === idx ? null : a.open };
      }
      notes[idx] = notes[idx] || '';
      return { ...a, notes, open: idx };
    });
  };
  return (
    <div style={{ marginBottom: 4 }}>
      <label style={{ display: 'flex', gap: 6, alignItems: 'flex-start', fontSize: 11, color: checked ? '#e0c090' : '#b0a890', cursor: 'pointer' }}>
        <input type="checkbox" checked={checked} onChange={toggle} style={{ marginTop: 2 }} />
        <span><span style={{ color: '#7aa', fontSize: 9.5 }}>[{node.key}]</span> {node.text}</span>
      </label>
      {editing && (
        <div style={{ display: 'flex', gap: 6, margin: '4px 0 4px 22px' }}>
          <input
            autoFocus
            style={inputStyle}
            placeholder={`What's the problem with [${node.key}]?`}
            value={anno.notes[idx] || ''}
            onChange={(e) => setAnno((a) => ({ ...a, notes: { ...a.notes, [idx]: e.target.value } }))}
            onKeyDown={(e) => { if (e.key === 'Enter') setAnno((a) => ({ ...a, open: null })); }}
          />
          <button type="button" style={C.smBtn} onClick={() => setAnno((a) => ({ ...a, open: null }))}>Okay</button>
        </div>
      )}
      {checked && !editing && anno.notes[idx] && (
        <div style={{ margin: '2px 0 2px 22px', fontSize: 10, color: '#e0a050', fontStyle: 'italic' }}>→ {anno.notes[idx]}</div>
      )}
    </div>
  );
}

/**
 * Inline Dialogue-Lab-style flag UI for any prose popup.
 * On by default (including gh-pages); toggle off in Debug panel.
 */
export function TextFlagToolbar({
  section,
  stateLine,
  text,
  trace,
  nodes: nodesProp,
}) {
  const { enabled } = useTextFlags();
  const [open, setOpen] = useState(false);
  const [anno, setAnno] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!enabled || !text?.trim()) return null;

  const nodes = nodesProp?.length
    ? nodesProp
    : traceToFlagNodes(trace).length
      ? traceToFlagNodes(trace)
      : proseToFlagNodes(text);

  const startFlag = () => {
    setOpen(true);
    setAnno({ notes: {}, open: null });
  };

  const saveAndCopy = () => {
    const problems = Object.entries(anno?.notes || {}).map(([idx, note]) => ({
      key: nodes[idx]?.key || `line:${idx}`,
      text: nodes[idx]?.text || '',
      note: String(note || '').trim(),
    }));
    const entry = {
      id: `${section}_${Date.now()}`,
      section,
      stateLine,
      text,
      problems,
    };
    addTextFlag(entry);
    const payload = formatTextFlagExport([entry]);
    navigator.clipboard?.writeText(payload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setAnno(null);
    setOpen(false);
  };

  return (
    <div style={{ marginTop: 10, borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8 }}>
      {!open ? (
        <button type="button" style={{ ...C.smBtn, background: 'rgba(120,80,40,0.35)', fontSize: 10 }} onClick={startFlag}>
          🚩 Flag text
        </button>
      ) : (
        <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 6, padding: 8 }}>
          <div style={{ fontSize: 10, color: '#a09070', marginBottom: 6, letterSpacing: 1 }}>
            CHECK FRAGMENTS THAT DON&apos;T WORK
          </div>
          {nodes.length ? nodes.map((node, idx) => (
            <NodeAnnotator key={`${node.key}_${idx}`} node={node} idx={idx} anno={anno} setAnno={setAnno} />
          )) : (
            <div style={{ fontSize: 11, color: '#908070', fontStyle: 'italic', marginBottom: 6 }}>
              No trace nodes — flag the full text in commentary on the first line.
            </div>
          )}
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <button
              type="button"
              style={{ ...C.smBtn, background: 'rgba(40,100,60,0.45)' }}
              disabled={!anno || !Object.keys(anno.notes).length}
              onClick={saveAndCopy}
            >
              {copied ? '✓ Copied' : saved ? '✓ Saved' : '📋 Save & copy'}
            </button>
            <button type="button" style={C.smBtn} onClick={() => { setOpen(false); setAnno(null); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Prose block + dev flag toolbar — use on any modal that shows narrative text. */
export function FlaggedProse({
  section,
  text,
  student = null,
  week,
  stateLine: stateLineProp,
  traceNodes,
  style,
  children,
}) {
  if (!text?.trim()) return children ?? null;
  const stateLine = stateLineProp ?? (student
    ? buildStateLine(student, { week, stageLabel: getStage(student.lbs).label })
    : week ? `week ${week}` : '—');
  return (
    <>
      {children ?? <div style={style}>{text}</div>}
      <TextFlagToolbar section={section} stateLine={stateLine} text={text} nodes={traceNodes} />
    </>
  );
}
