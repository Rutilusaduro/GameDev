// ═══════════════════════════════════════════════════════════════
// PHARMACIST CHEMISTRY — stage-specific synthesis UI
// Corporate theft → Wellness brand → Cult distribution → Ascension
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { COMPOUNDS, PHARMACIST_STAGES, compoundsForStage } from '../gameData/pharmacist.js';
import {
  ACQUISITION_BY_STAGE,
  formatIngredientBag,
  recipeCostLabel,
  canAffordRecipe,
  spendRecipe,
  toggleBrewInPlan,
} from '../gameData/pharmacistIngredients.js';

const STAGE_CHROME = {
  1: { accent: '#3d5a80', label: 'CORPORATE LAB', sub: 'Shift synthesis — acquire stock, brew quietly.' },
  2: { accent: '#2e6b5a', label: 'WELLNESS LAB', sub: 'Brand-backed chemistry — campus trials fund the work.' },
  3: { accent: '#6b4a8a', label: 'CULT SUPPLY', sub: 'Distribution network — the circle feeds the circle.' },
  4: { accent: '#8a6040', label: 'ASCENSION CHAMBER', sub: 'Mass-scale brewing — regional consequences.' },
};

function IngredientRow({ bag }) {
  const items = formatIngredientBag(bag);
  if (!items.length) {
    return <div style={{ fontSize: 10, color: '#607070', fontStyle: 'italic' }}>No ingredients in pool.</div>;
  }
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map(item => (
        <span key={item.id} style={{ ...C.tag('rgba(46,107,90,0.2)', '#8ad4b0'), fontSize: 9 }}>
          {item.icon} {item.label} ×{item.qty}
        </span>
      ))}
    </div>
  );
}

function BrewPicker({ session, setSession, pharmacistState }) {
  const pool = session.pool || {};
  const plan = session.brewPlan || [];
  let displayPool = { ...pool };
  for (const id of plan) displayPool = spendRecipe(displayPool, id, pharmacistState);
  const unlocked = compoundsForStage(session.stageId).map(c => c.id);

  return (
    <div>
      <div style={{ fontSize: 10, color: '#508070', marginBottom: 8 }}>
        Select up to {session.maxBrews} compounds to brew ({plan.length}/{session.maxBrews}).
      </div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 9, color: '#406858', marginBottom: 4 }}>Ingredients after queued brews:</div>
        <IngredientRow bag={displayPool} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        {unlocked.map(id => {
          const c = COMPOUNDS[id];
          const inPlan = plan.includes(id);
          const canAdd = !inPlan && plan.length < session.maxBrews && canAffordRecipe(displayPool, id, pharmacistState);
          const affordNow = canAffordRecipe(pool, id, pharmacistState);
          return (
            <button
              key={id}
              type="button"
              style={{
                ...C.btn(inPlan ? '#1a4038' : canAdd ? '#2a5048' : '#222'),
                width: '100%',
                textAlign: 'left',
                padding: '10px 12px',
                opacity: affordNow || inPlan ? 1 : 0.45,
                border: inPlan ? '1px solid #6ab89a' : '1px solid transparent',
              }}
              onClick={() => setSession(prev => toggleBrewInPlan(prev, id, pharmacistState))}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ color: '#8ad4b0', fontWeight: 700, fontSize: 12 }}>{c.label}</span>
                <span style={{ fontSize: 9, color: '#608878' }}>{recipeCostLabel(id, pharmacistState)}</span>
              </div>
              <div style={{ fontSize: 9, color: '#507060', marginTop: 4, lineHeight: 1.4 }}>
                {inPlan ? '✓ Queued for brewing' : canAdd ? 'Click to queue' : plan.length >= session.maxBrews ? 'Brew limit reached' : 'Insufficient ingredients'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function PharmacistChemModal({
  student,
  chemSession,
  setChemSession,
  pharmacistState,
  onConfirm,
  onCancel,
  finalizeBrewPlan,
  applyAcquisitionChoice,
  skipAcquisition,
}) {
  if (!chemSession || !student) return null;
  const stageId = chemSession.stageId ?? 1;
  const chrome = STAGE_CHROME[stageId] || STAGE_CHROME[1];
  const stageMeta = PHARMACIST_STAGES.find(s => s.id === stageId);
  const options = ACQUISITION_BY_STAGE[stageId] || ACQUISITION_BY_STAGE[1];

  const wrap = children => (
    <div style={{ ...C.overlay, zIndex: 8200 }}>
      <div style={{
        ...C.modal,
        maxWidth: 520,
        background: 'linear-gradient(160deg,#060f0c,#0a1814,#060f0c)',
        border: `1px solid ${chrome.accent}80`,
      }}>
        {children}
      </div>
    </div>
  );

  if (chemSession.phase === 'acquire') {
    return wrap(
      <>
        <div style={{ fontSize: 9, letterSpacing: 4, color: chrome.accent, marginBottom: 4 }}>🧪 {chrome.label}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#8ad4b0', marginBottom: 4 }}>{student.name} — {stageMeta?.label}</div>
        <div style={{ fontSize: 11, color: '#508070', marginBottom: 12, fontStyle: 'italic' }}>{chrome.sub}</div>
        <div style={{ fontSize: 9, color: '#406858', marginBottom: 6 }}>Session stock (allotted + saved):</div>
        <div style={{ marginBottom: 14 }}><IngredientRow bag={chemSession.pool} /></div>
        <div style={{ fontSize: 11, color: '#8ab0a0', marginBottom: 10, fontWeight: 600 }}>Acquire resources before brewing:</div>
        {options.map(opt => (
          <button
            key={opt.id}
            type="button"
            style={{ ...C.btn('#1a3028'), width: '100%', marginBottom: 8, textAlign: 'left', padding: '10px 14px' }}
            onClick={() => setChemSession(applyAcquisitionChoice(chemSession, opt.id))}
          >
            <div style={{ color: '#8ad4b0', fontWeight: 700, fontSize: 12, marginBottom: 3 }}>{opt.label}</div>
            <div style={{ color: '#608878', fontSize: 10, lineHeight: 1.45, marginBottom: 4 }}>{opt.desc}</div>
            <div style={{ color: opt.exposure > 15 ? '#c08060' : '#507060', fontSize: 9 }}>
              {opt.exposure > 0 ? `+${opt.exposure}% exposure risk` : 'No added exposure'}
            </div>
          </button>
        ))}
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <button type="button" style={C.btn('#333')} onClick={onCancel}>Cancel</button>
          <button type="button" style={{ ...C.btn(chrome.accent), flex: 1 }} onClick={() => setChemSession(skipAcquisition(chemSession))}>
            Brew with allotted stock only →
          </button>
        </div>
      </>,
    );
  }

  if (chemSession.phase === 'craft') {
    return wrap(
      <>
        <div style={{ fontSize: 9, letterSpacing: 4, color: chrome.accent, marginBottom: 4 }}>🧪 BREWING BENCH</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#8ad4b0', marginBottom: 8 }}>{stageMeta?.label}</div>
        {(chemSession.acquisitionLog || []).map((line, i) => (
          <div key={i} style={{ fontSize: 11, color: '#709888', fontStyle: 'italic', lineHeight: 1.65, marginBottom: 8 }}>{line}</div>
        ))}
        <BrewPicker session={chemSession} setSession={setChemSession} pharmacistState={pharmacistState} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" style={C.btn('#333')} onClick={() => setChemSession({ ...chemSession, phase: 'acquire', brewPlan: [] })}>← Resources</button>
          <button
            type="button"
            style={{ ...C.btn(chrome.accent), flex: 1 }}
            onClick={() => setChemSession(finalizeBrewPlan(chemSession, pharmacistState))}
          >
            Finish brewing →
          </button>
        </div>
      </>,
    );
  }

  if (chemSession.phase === 'summary') {
    const granted = chemSession.granted || [];
    const counts = {};
    granted.forEach(id => { counts[id] = (counts[id] || 0) + 1; });
    return wrap(
      <>
        <div style={{ fontSize: 9, letterSpacing: 4, color: chrome.accent, marginBottom: 4 }}>🧪 SESSION COMPLETE</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#8ad4b0', marginBottom: 8 }}>{student.name}</div>
        {(chemSession.acquisitionLog || []).slice(-1).map((line, i) => (
          <div key={i} style={{ fontSize: 11, color: '#709888', fontStyle: 'italic', lineHeight: 1.65, marginBottom: 10 }}>{line}</div>
        ))}
        <div style={{ background: 'rgba(8,24,18,0.6)', borderRadius: 8, padding: '10px 12px', marginBottom: 12 }}>
          <div style={{ fontSize: 9, color: '#406858', marginBottom: 6 }}>Brewed this session:</div>
          {granted.length === 0 ? (
            <div style={{ fontSize: 11, color: '#a07050' }}>No compounds brewed — ingredients saved for next time.</div>
          ) : (
            Object.entries(counts).map(([id, n]) => (
              <div key={id} style={{ fontSize: 11, color: '#8ad4b0', marginBottom: 4 }}>
                {COMPOUNDS[id]?.label || id} ×{n}
              </div>
            ))
          )}
          {chemSession.exposureGained > 0 && (
            <div style={{ fontSize: 10, color: '#c08060', marginTop: 8 }}>
              Acquisition exposure: +{chemSession.exposureGained}%
            </div>
          )}
        </div>
        <div style={{ fontSize: 9, color: '#406858', marginBottom: 4 }}>Leftover ingredients (saved):</div>
        <div style={{ marginBottom: 14 }}><IngredientRow bag={chemSession.poolAfter || {}} /></div>
        <button type="button" style={{ ...C.btn(chrome.accent), width: '100%' }} onClick={onConfirm}>Close lab & apply results ✓</button>
      </>,
    );
  }

  return null;
}
