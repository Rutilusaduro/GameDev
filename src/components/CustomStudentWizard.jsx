import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import {
  CUSTOM_BODY_OPTIONS,
  CUSTOM_GARMENT_OPTIONS,
  CUSTOM_PSYCH_AXES,
  CUSTOM_STANCE_PRESETS,
  CUSTOM_VOICE_PRESETS,
  CUSTOM_WEIGHT_PRESETS,
  customDraftPointSpend,
  defaultCustomDraft,
} from '../gameData/customStudent/index.js';
import {
  renderCustomBodyDesc,
  renderCustomStanceDesc,
  renderCustomVoiceDesc,
  renderCustomWeightDesc,
} from '../textEngine/scenes/overhaul/leftoverSystems.js';

const MAX_POINTS = 4;

function ChoiceButton({ active, children, onClick, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        textAlign: 'left',
        cursor: 'pointer',
        borderRadius: 10,
        padding: '10px 12px',
        fontFamily: 'inherit',
        background: active ? 'rgba(255,255,255,0.09)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${active ? accent : 'rgba(255,255,255,0.08)'}`,
        color: '#dbc8ef',
        minHeight: 44,
      }}
    >
      {children}
    </button>
  );
}

export function CustomStudentWizard({
  accent = '#8a4be0',
  title: wizardTitle,
  subtitle,
  backLabel,
  onBack,
  onComplete,
}) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(defaultCustomDraft);
  const spent = customDraftPointSpend(draft);
  const voice = CUSTOM_VOICE_PRESETS[draft.voicePreset] || CUSTOM_VOICE_PRESETS.clinical;
  const weight = CUSTOM_WEIGHT_PRESETS.find((p) => p.id === draft.weightPreset) || CUSTOM_WEIGHT_PRESETS[1];
  const title = ['Identity', 'Body', 'Stance', 'Voice', 'Wardrobe'][step];
  const canNext = draft.name.trim().length > 0 && spent <= MAX_POINTS;

  const selectedGarments = useMemo(() => (
    ['top', 'bottom', 'waist'].map((slot) => (
      CUSTOM_GARMENT_OPTIONS[slot].find((g) => g.id === draft.wardrobe[slot])?.name
    )).filter(Boolean).join(' · ')
  ), [draft]);

  const patch = (part) => setDraft((prev) => ({ ...prev, ...part }));
  const patchWardrobe = (part) => setDraft((prev) => ({ ...prev, wardrobe: { ...prev.wardrobe, ...part } }));

  return (
    <>
      <div style={{ fontSize: 10, letterSpacing: 3, color: accent, textTransform: 'uppercase', marginBottom: 4, textAlign: 'center' }}>
        {wizardTitle || 'Resident'} · {step + 1}/5
      </div>
      {subtitle && (
        <div style={{ color: '#8a7880', fontSize: 12, textAlign: 'center', marginBottom: 12 }}>{subtitle}</div>
      )}
      <h2 style={{ textAlign: 'center', color: '#ead8ff', margin: '0 0 10px', fontSize: 21 }}>{title}</h2>

      {step === 0 && (
        <div style={{ display: 'grid', gap: 10 }}>
          <label style={{ display: 'grid', gap: 5, color: '#cbb8df', fontSize: 12 }}>
            Name
            <input
              value={draft.name}
              maxLength={32}
              onChange={(e) => patch({ name: e.target.value })}
              style={{ background: '#0b0618', color: '#ead8ff', border: `1px solid ${accent}`, borderRadius: 8, padding: '9px 10px', fontFamily: 'inherit' }}
            />
          </label>
          <div style={C.infoBox('rgba(255,255,255,0.035)')}>
            <b>Archetype: Inventor</b>
            <div style={{ fontSize: 12, color: '#bba8d0', marginTop: 4 }}>
              v1 keeps the lab/prototype arc intact and lets the player tune the resident who sits there.
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 8 }}>
            {CUSTOM_BODY_OPTIONS.map((opt) => (
              <ChoiceButton key={opt.id} active={draft.bodyType === opt.id} accent={accent} onClick={() => patch({ bodyType: opt.id })}>
                <b>{opt.label}</b><div style={{ fontSize: 11, color: '#a894c0' }}>{renderCustomBodyDesc(opt.id) || opt.desc}</div>
              </ChoiceButton>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
            {CUSTOM_WEIGHT_PRESETS.map((opt) => (
              <ChoiceButton key={opt.id} active={draft.weightPreset === opt.id} accent={accent} onClick={() => patch({ weightPreset: opt.id })}>
                <b>{opt.label}</b>
                <div style={{ fontSize: 11, color: '#a894c0' }}>{opt.lbs} lbs</div>
                <div style={{ fontSize: 10, color: '#8c789e', marginTop: 3 }}>{renderCustomWeightDesc(opt.id)}</div>
              </ChoiceButton>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 8 }}>
            {Object.entries(CUSTOM_STANCE_PRESETS).map(([id, opt]) => (
              <ChoiceButton key={id} active={draft.gainStance === id} accent={accent} onClick={() => patch({ gainStance: id, psychBuys: {} })}>
                <b>{opt.label}</b><div style={{ fontSize: 11, color: '#a894c0' }}>{renderCustomStanceDesc(id) || opt.desc}</div>
              </ChoiceButton>
            ))}
          </div>
          <div style={{ ...C.infoBox('rgba(255,255,255,0.035)'), marginBottom: 0 }}>
            <div style={{ fontSize: 10, color: spent > MAX_POINTS ? '#e07050' : '#cbb8df', marginBottom: 6 }}>
              Psych budget: {spent}/{MAX_POINTS}
            </div>
            {CUSTOM_PSYCH_AXES.map((axis) => (
              <div key={axis.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5px 0' }}>
                <span>{axis.label}</span>
                <span>
                  {[0, 1, 2].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setDraft((prev) => ({ ...prev, psychBuys: { ...prev.psychBuys, [axis.id]: n } }))}
                      style={{ ...C.smBtn, background: (draft.psychBuys[axis.id] || 0) === n ? accent : C.smBtn.background }}
                    >
                      +{n}
                    </button>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))', gap: 8 }}>
          {Object.entries(CUSTOM_VOICE_PRESETS).map(([id, opt]) => (
            <ChoiceButton key={id} active={draft.voicePreset === id} accent={accent} onClick={() => patch({ voicePreset: id })}>
              <b>{opt.label}</b>
              <div style={{ fontSize: 11, color: '#a894c0', margin: '4px 0' }}>{renderCustomVoiceDesc(id) || opt.desc}</div>
              <div style={{ fontSize: 10, color: '#8c789e' }}>{opt.owned.join(' · ')}</div>
            </ChoiceButton>
          ))}
        </div>
      )}

      {step === 4 && (
        <div style={{ display: 'grid', gap: 10 }}>
          {['top', 'bottom', 'waist'].map((slot) => (
            <div key={slot}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 5 }}>{slot}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {CUSTOM_GARMENT_OPTIONS[slot].map((g) => (
                  <button key={g.id} type="button" style={{ ...C.smBtn, background: draft.wardrobe[slot] === g.id ? accent : C.smBtn.background }} onClick={() => patchWardrobe({ [slot]: g.id })}>
                    {g.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6 }}>
            {['snug', 'fitted', 'relaxed'].map((fit) => (
              <button key={fit} type="button" style={{ ...C.smBtn, background: draft.wardrobe.fit === fit ? accent : C.smBtn.background }} onClick={() => patchWardrobe({ fit })}>
                {fit}
              </button>
            ))}
          </div>
          <div style={C.infoBox('rgba(255,255,255,0.035)')}>
            <b>{draft.name || 'The resident'}</b> · {weight.lbs} lbs · {draft.bodyType} · {CUSTOM_STANCE_PRESETS[draft.gainStance].label}<br />
            Voice: {voice.label} · Wardrobe: {selectedGarments}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 18 }}>
        <button type="button" onClick={() => (step === 0 ? onBack() : setStep(step - 1))} style={{ ...C.smBtn, padding: '9px 18px' }}>
          ← {step === 0 && backLabel ? backLabel.replace(/^←\s*/, '') : 'Back'}
        </button>
        {step < 4 ? (
          <button type="button" disabled={!canNext} onClick={() => setStep(step + 1)} style={{ ...C.btn(accent), opacity: canNext ? 1 : 0.4, fontSize: 14, padding: '11px 28px' }}>
            Next →
          </button>
        ) : (
          <button type="button" disabled={!canNext} onClick={() => onComplete(draft)} style={{ ...C.btn(accent), opacity: canNext ? 1 : 0.4, fontSize: 14, padding: '11px 28px' }}>
            Seat her
          </button>
        )}
      </div>
    </>
  );
}
