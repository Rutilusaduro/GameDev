// ═══════════════════════════════════════════════════════════════
// PHARMACIST CULT — distribution & circle supply UI (stage 3+)
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { CULT_DISTRIBUTION_ROUTES } from '../gameData/pharmacistCult.js';

const PURPLE = '#6b4a8a';
const LILAC = '#b090d8';

export function PharmacistCultModal({
  student,
  cultSession,
  pharmacistState,
  ap,
  onSelectRoute,
  onConfirm,
  onCancel,
}) {
  if (!cultSession || !student) return null;
  const cult = pharmacistState?.cult || {};

  const wrap = children => (
    <div style={{ ...C.overlay, zIndex: 8250 }}>
      <div style={{
        ...C.modal,
        maxWidth: 520,
        background: 'linear-gradient(160deg,#0a0614,#140a20,#0a0614)',
        border: `1px solid ${PURPLE}80`,
      }}>
        {children}
      </div>
    </div>
  );

  if (cultSession.phase === 'route') {
    return wrap(
      <>
        <div style={{ fontSize: 9, letterSpacing: 4, color: PURPLE, marginBottom: 4 }}>🕯️ CULT DISTRIBUTION</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: LILAC, marginBottom: 4 }}>{student.name} — Supply the Circle</div>
        <div style={{ fontSize: 10, color: '#8060a0', marginBottom: 10, lineHeight: 1.6 }}>
          Circle: {cult.circleSize ?? 0} devotees · Devotion {cult.devotion ?? 0}% · Supply stock {cult.supplyReservoir ?? 0}
          {cult.bulkProductionUnlocked ? ' · Bulk production unlocked' : ''}
        </div>
        <div style={{ fontSize: 11, color: '#a080c0', marginBottom: 12, fontStyle: 'italic' }}>
          Route this week's wellness supply. The area gets fatter when distribution runs.
        </div>
        {CULT_DISTRIBUTION_ROUTES.map(route => (
          <button
            key={route.id}
            type="button"
            disabled={ap < route.apCost}
            style={{
              ...C.btn(ap >= route.apCost ? '#1a1028' : '#222'),
              width: '100%',
              marginBottom: 8,
              textAlign: 'left',
              padding: '10px 14px',
              opacity: ap >= route.apCost ? 1 : 0.45,
            }}
            onClick={() => onSelectRoute(route.id)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 3 }}>
              <span style={{ color: LILAC, fontWeight: 700, fontSize: 12 }}>{route.label}</span>
              <span style={{ fontSize: 9, color: '#8060a0' }}>{route.apCost} AP</span>
            </div>
            <div style={{ fontSize: 10, color: '#9070b0', lineHeight: 1.45, marginBottom: 4 }}>{route.desc}</div>
            <div style={{ fontSize: 9, color: route.exposure > 10 ? '#c08060' : '#605080' }}>
              +{route.exposure}% exposure{route.scrutiny ? ` · +${route.scrutiny} scrutiny` : ''}
            </div>
          </button>
        ))}
        <button type="button" style={{ ...C.btn('#333'), width: '100%', marginTop: 6 }} onClick={onCancel}>Cancel</button>
      </>,
    );
  }

  if (cultSession.phase === 'summary' && cultSession.outcome) {
    const o = cultSession.outcome;
    return wrap(
      <>
        <div style={{ fontSize: 9, letterSpacing: 4, color: PURPLE, marginBottom: 4 }}>🕯️ DISTRIBUTION COMPLETE</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: LILAC, marginBottom: 10 }}>{student.name}</div>
        <div style={{ fontSize: 11, color: '#a090c0', fontStyle: 'italic', lineHeight: 1.75, marginBottom: 12 }}>{o.flavor}</div>
        <div style={{ background: 'rgba(20,10,32,0.6)', borderRadius: 8, padding: '10px 12px', marginBottom: 14, fontSize: 11 }}>
          {o.circleDelta > 0 && <div style={{ color: LILAC, marginBottom: 4 }}>Circle +{o.circleDelta} devotees</div>}
          {o.supplyDelta > 0 && <div style={{ color: '#90c0a8', marginBottom: 4 }}>Supply stock +{o.supplyDelta}</div>}
          {o.devotionDelta > 0 && <div style={{ color: '#c0a0e0', marginBottom: 4 }}>Devotion +{o.devotionDelta}%</div>}
          {(o.classGainApplied > 0 || o.addictedGainApplied > 0) && (
            <div style={{ color: '#e0c0a0', marginTop: 6 }}>
              {o.classGainApplied > 0 && `Class-wide softening +${o.classGainApplied} lbs each. `}
              {o.addictedGainApplied > 0 && `Addicted students +${o.addictedGainApplied} lbs.`}
            </div>
          )}
        </div>
        <button type="button" style={{ ...C.btn(PURPLE), width: '100%' }} onClick={onConfirm}>Done ✓</button>
      </>,
    );
  }

  return null;
}
