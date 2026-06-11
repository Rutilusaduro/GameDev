import { C } from '../styles.js';
import { COMPOUNDS } from '../gameData/pharmacist.js';

export function CompoundFeedModal({
  student,
  unlockedCompoundIds = [],
  compoundInventory = {},
  feedLabel,
  onConfirm,
  onCancel,
}) {
  const compounds = unlockedCompoundIds
    .map(id => COMPOUNDS[id])
    .filter(Boolean);

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 8500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ ...C.modal, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, color: '#508878', letterSpacing: 2, marginBottom: 8 }}>LACE INTO FOOD</div>
        <div style={{ fontSize: 14, color: '#c8e0d8', marginBottom: 6 }}>{feedLabel}</div>
        <div style={{ fontSize: 12, color: '#88a898', marginBottom: 14, fontStyle: 'italic' }}>
          Compounds must be delivered through food. Optional for {student?.name}.
        </div>
        <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
          <button type="button" style={{ ...C.btn('#284838'), width: '100%' }} onClick={() => onConfirm(null)}>
            Feed without compound
          </button>
          {compounds.map(c => (
            <button
              key={c.id}
              type="button"
              style={{ ...C.btn('#1a3848'), width: '100%', textAlign: 'left' }}
              onClick={() => onConfirm(c.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                <span style={{ fontWeight: 700, color: '#90d8c8' }}>{c.label}</span>
                <span style={{ fontSize: 10, color: '#68a888' }}>×{compoundInventory[c.id] ?? 0} doses</span>
              </div>
              <div style={{ fontSize: 11, color: '#88a0a0', lineHeight: 1.5, fontStyle: 'italic' }}>{c.flavor}</div>
            </button>
          ))}
        </div>
        <button type="button" style={{ ...C.btn('#333'), width: '100%' }} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
