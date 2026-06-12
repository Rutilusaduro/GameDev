import { C } from '../styles.js';
import { COMPOUNDS, COMPOUND_CATEGORIES, getCompoundCategory } from '../gameData/pharmacist.js';

const CATEGORY_ORDER = ['control', 'cult', 'growth'];
const CATEGORY_HINT = {
  control: 'Manages dependency — use carefully on addicted students.',
  cult: 'Circle-grade compounds — stronger attachment effects.',
  growth: 'Appetite, pleasure, and metabolic tools.',
};

export function CompoundFeedModal({
  student,
  unlockedCompoundIds = [],
  compoundInventory = {},
  feedLabel,
  onConfirm,
  onCancel,
  studentAddiction = 0,
}) {
  const compounds = unlockedCompoundIds
    .map(id => COMPOUNDS[id])
    .filter(Boolean);

  const byCategory = { control: [], cult: [], growth: [] };
  compounds.forEach(c => {
    const cat = getCompoundCategory(c.id);
    byCategory[cat].push(c);
  });

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', zIndex: 8500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ ...C.modal, maxWidth: 480, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ fontSize: 10, color: '#508878', letterSpacing: 2, marginBottom: 8 }}>LACE INTO FOOD</div>
        <div style={{ fontSize: 14, color: '#c8e0d8', marginBottom: 6 }}>{feedLabel}</div>
        <div style={{ fontSize: 12, color: '#88a898', marginBottom: 14, fontStyle: 'italic' }}>
          Compounds must be delivered through food. Optional for {student?.name}.
          {studentAddiction >= 3 && (
            <span style={{ display: 'block', color: '#c0a080', marginTop: 6 }}>
              High addiction — consider Dependency Reset or Maintenance under Control.
            </span>
          )}
        </div>
        <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
          <button type="button" style={{ ...C.btn('#284838'), width: '100%' }} onClick={() => onConfirm(null)}>
            Feed without compound
          </button>
          {CATEGORY_ORDER.map(cat => {
            const list = byCategory[cat];
            if (!list.length) return null;
            return (
              <div key={cat}>
                <div style={{ fontSize: 9, color: '#608878', letterSpacing: 2, margin: '8px 0 4px' }}>
                  {COMPOUND_CATEGORIES[cat].label.toUpperCase()}
                </div>
                <div style={{ fontSize: 9, color: '#506860', marginBottom: 6, fontStyle: 'italic' }}>{CATEGORY_HINT[cat]}</div>
                {list.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    style={{
                      ...C.btn(cat === 'control' ? '#3a2848' : cat === 'cult' ? '#2a2040' : '#1a3848'),
                      width: '100%',
                      textAlign: 'left',
                      marginBottom: 6,
                    }}
                    onClick={() => onConfirm(c.id)}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontWeight: 700, color: cat === 'control' ? '#d0b0e0' : '#90d8c8' }}>{c.label}</span>
                      <span style={{ fontSize: 10, color: '#68a888' }}>×{compoundInventory[c.id] ?? 0} doses</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#88a0a0', lineHeight: 1.5, fontStyle: 'italic' }}>{c.flavor}</div>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
        <button type="button" style={{ ...C.btn('#333'), width: '100%' }} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
