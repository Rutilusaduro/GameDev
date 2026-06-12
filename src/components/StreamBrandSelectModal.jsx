// ═══════════════════════════════════════════════════════════════
// STREAM BRAND CONTRACT — one-time sponsor pick for Eating Streamer
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { BRANDS } from '../gameData/streaming.js';

const BRAND_UI = {
  crunchforge: { color: '#e74c3c', bg: 'linear-gradient(135deg,#1a0808,#280c0c)' },
  fizzpeak: { color: '#38bdf8', bg: 'linear-gradient(135deg,#081018,#0c1a28)' },
  velvetmelt: { color: '#e056fd', bg: 'linear-gradient(135deg,#140818,#1e0a24)' },
  glazeco: { color: '#fbbf24', bg: 'linear-gradient(135deg,#141008,#201808)' },
};

const BRAND_BLURBS = {
  crunchforge: 'Aggressive, messy, go-hard energy. CrunchForge wants feral.',
  fizzpeak: 'Chaotic hype and speed. FizzPeak lives for insane energy.',
  velvetmelt: 'Slow, soft, sensual indulgence. VelvetMelt savors every bite.',
  glazeco: 'Teasing, bratty, luxurious. GlazeCo makes her work the camera.',
};

export function StreamBrandSelectModal({ student, onSelect, onClose, required }) {
  if (!student) return null;
  return (
    <div style={C.overlay}>
      <div style={{
        ...C.modal,
        maxWidth: 520,
        background: 'linear-gradient(165deg,#120408,#1a0810,#0c0408)',
        border: '1px solid #e74c3c55',
      }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: '#e74c3c', marginBottom: 8 }}>
          📡 SPONSOR CONTRACT
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6, lineHeight: 1.2 }}>
          Who sponsors {student.name}&apos;s stream?
        </div>
        <div style={{ fontSize: 12, color: '#c0a0a8', lineHeight: 1.7, marginBottom: 16 }}>
          {required
            ? 'Pick a brand before her first stream. This deal sticks — she\'ll stream under their banner from here on.'
            : 'Choose her sponsor. This contract is permanent for this playthrough.'}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
          {Object.values(BRANDS).map((brand) => {
            const ui = BRAND_UI[brand.id] || { color: '#e74c3c', bg: '#1a0810' };
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => onSelect(student.id, brand.id)}
                style={{
                  ...C.btn(ui.color),
                  textAlign: 'left',
                  padding: '12px 14px',
                  background: ui.bg,
                  border: `1px solid ${ui.color}66`,
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: ui.color, marginBottom: 4 }}>
                  {brand.name}
                </div>
                <div style={{ fontSize: 11, color: '#c8b0b8', lineHeight: 1.5 }}>
                  {BRAND_BLURBS[brand.id]}
                </div>
                <div style={{ fontSize: 9, color: '#908080', marginTop: 4, letterSpacing: 1 }}>
                  Favors: {brand.favStyles.join(' · ')}
                </div>
              </button>
            );
          })}
        </div>
        {!required && onClose && (
          <button type="button" style={{ ...C.btn('#301018'), width: '100%', fontSize: 11 }} onClick={onClose}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
