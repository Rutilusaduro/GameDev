// ═══════════════════════════════════════════════════════════════
// RA SETUP WIZARD — new game: meet your RA → pick style → pick hall
// ═══════════════════════════════════════════════════════════════
import { useState } from 'react';
import { C } from '../styles.js';
import { DORM_LIST } from '../gameData/dorms.js';
import { RA_APPROACH_LIST } from '../gameData/raApproaches.js';
import { CustomStudentWizard } from './CustomStudentWizard.jsx';

const RA_INTRO = [
  'Senior year. Third year as RA. Red hair, curves that draw eyes in the dining hall, and a master key that opens more doors than it should.',
  'The housing office gave you Victory Hall — or Scholar\'s Rest, Rosewood, the Annex — depending on which floor needs someone who can keep secrets. Your residents are brilliant, messy, hungry, and yours to look after.',
  'You are not faculty. You live on the floor. You sign for their deliveries, break up their parties, and know which room ordered pizza at two in the morning. What happens on your hall this semester is up to you.',
];

const RA_PORTRAIT = {
  hair: '#c44a2a',
  skin: '#f5d0b8',
  top: '#8b1a4a',
};

export function RaSetupWizard({ students, onComplete }) {
  const [step, setStep] = useState('intro');
  const [approach, setApproach] = useState(null);
  const [dorm, setDorm] = useState(null);

  const accent = dorm?.color || approach?.color || '#c44a2a';
  const accentSoft = dorm?.accentSoft || approach?.accentSoft || 'rgba(196,74,42,0.22)';

  const panelStyle = {
    ...C.modal,
    maxWidth: 760,
    width: '100%',
    background: `radial-gradient(ellipse 120% 80% at 50% -20%, ${accentSoft}, #0a0612 50%, #050308)`,
    border: `1px solid ${accent}`,
    boxShadow: `0 0 100px ${accentSoft}, 0 24px 80px rgba(0,0,0,0.6)`,
  };

  const renderRaSilhouette = () => (
    <div style={{
      width: 88, height: 88, borderRadius: '50%', margin: '0 auto 16px',
      background: `linear-gradient(145deg, ${RA_PORTRAIT.top}, #4a1028)`,
      border: `2px solid ${accent}`,
      boxShadow: `0 0 32px ${accentSoft}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 8, left: '50%', transform: 'translateX(-50%)',
        width: 52, height: 44, borderRadius: '50% 50% 40% 40%',
        background: RA_PORTRAIT.skin,
      }} />
      <div style={{
        position: 'absolute', top: 2, left: '50%', transform: 'translateX(-50%)',
        width: 56, height: 28, borderRadius: '50% 50% 0 0',
        background: RA_PORTRAIT.hair,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 64, height: 36, borderRadius: '40% 40% 0 0',
        background: RA_PORTRAIT.top,
      }} />
    </div>
  );

  return (
    <div style={{ ...C.app, alignItems: 'center', justifyContent: 'center', padding: 20, minHeight: '100vh' }}>
      <div style={panelStyle}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: accent, marginBottom: 10, fontWeight: 600 }}>
            RESIDENCE LIFE SIMULATOR
          </div>
          {renderRaSilhouette()}
          <h1 style={{ color: '#fff5f0', margin: '0 0 8px', fontSize: 28, fontWeight: 500, letterSpacing: 0.5 }}>
            Hall Pass
          </h1>
          <div style={{ color: '#a89098', fontSize: 13 }}>Your floor. Your rules. Their appetites.</div>
        </div>

        {step === 'intro' && (
          <>
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: `1px solid ${accentSoft}`,
              borderRadius: 12, padding: '20px 22px', marginBottom: 22,
            }}>
              {RA_INTRO.map((p, i) => (
                <p key={i} style={{
                  margin: i === 0 ? 0 : '14px 0 0',
                  color: i === 0 ? '#fff0e8' : '#d8c8c0',
                  fontSize: i === 0 ? 16 : 14,
                  lineHeight: 1.75,
                }}>{p}</p>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button onClick={() => setStep('approach')} style={{ ...C.btn(accent), fontSize: 14, padding: '12px 36px' }}>
                Meet the RA →
              </button>
            </div>
          </>
        )}

        {step === 'approach' && (
          <>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, textTransform: 'uppercase', marginBottom: 8, textAlign: 'center' }}>
              How do you run your hall?
            </div>
            <div style={{ color: '#8a7880', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
              Your style shapes which actions feel natural — and which residents open up fastest.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {RA_APPROACH_LIST.map((ap) => {
                const on = approach?.id === ap.id;
                return (
                  <button key={ap.id} onClick={() => setApproach(ap)}
                    style={{
                      textAlign: 'left', cursor: 'pointer', borderRadius: 10, padding: '14px 16px', fontFamily: 'inherit',
                      background: on ? ap.accentSoft : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${on ? ap.color : 'rgba(255,255,255,0.08)'}`,
                      boxShadow: on ? `0 0 24px ${ap.accentSoft}` : 'none', transition: 'all 0.15s',
                    }}>
                    <div style={{ color: ap.color, fontSize: 15, marginBottom: 4, fontWeight: 600 }}>{ap.label}</div>
                    <div style={{ color: '#b8a8a0', fontSize: 12, lineHeight: 1.5 }}>{ap.tagline}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
              <button onClick={() => setStep('intro')} style={{ ...C.smBtn, padding: '9px 18px' }}>← Back</button>
              <button disabled={!approach} onClick={() => setStep('dorm')}
                style={{ ...C.btn(accent), opacity: approach ? 1 : 0.4, fontSize: 14, padding: '11px 28px' }}>
                Choose your hall →
              </button>
            </div>
          </>
        )}

        {step === 'dorm' && approach && (
          <>
            <div style={{ fontSize: 10, letterSpacing: 3, color: accent, textTransform: 'uppercase', marginBottom: 4, textAlign: 'center' }}>
              Which hall do you take?
            </div>
            <div style={{ color: '#8a7880', fontSize: 12, textAlign: 'center', marginBottom: 16 }}>
              Five residents start on your roster. The other halls unlock as the semester deepens.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {DORM_LIST.map((d) => {
                const on = dorm?.id === d.id;
                const residentNames = d.studentIds
                  .map((id) => students.find((s) => s.id === id)?.name)
                  .filter(Boolean)
                  .join(', ');
                return (
                  <button key={d.id} onClick={() => setDorm(d)}
                    style={{
                      textAlign: 'left', cursor: 'pointer', borderRadius: 10, padding: '14px 16px', fontFamily: 'inherit',
                      background: on ? d.accentSoft : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${on ? d.color : 'rgba(255,255,255,0.08)'}`,
                      transition: 'all 0.15s',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{ fontSize: 22 }}>{d.emoji}</span>
                      <span style={{ color: '#fff0e8', fontSize: 15, fontWeight: 600 }}>{d.label}</span>
                    </div>
                    <div style={{ color: '#b8a8a0', fontSize: 11.5, lineHeight: 1.5, marginBottom: 6 }}>{d.hook}</div>
                    <div style={{ color: '#706068', fontSize: 10, lineHeight: 1.4 }}>{residentNames}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
              <button onClick={() => setStep('approach')} style={{ ...C.smBtn, padding: '9px 18px' }}>← Back</button>
              <button disabled={!dorm} onClick={() => setStep('suitemate')}
                style={{ ...C.btn(accent), opacity: dorm ? 1 : 0.4, fontSize: 14, padding: '11px 30px' }}>
                Add a suitemate →
              </button>
            </div>
          </>
        )}

        {step === 'suitemate' && approach && dorm && (
          <CustomStudentWizard
            accent={accent}
            title="Your Fifth Suitemate"
            subtitle="Every hall has a wildcard — build the girl who rounds out your floor."
            backLabel="← Pick another hall"
            onBack={() => setStep('dorm')}
            onComplete={(draft) => onComplete({ approach, dorm, customDraft: draft })}
          />
        )}
      </div>
    </div>
  );
}
