// ═══════════════════════════════════════════════════════════════
// DEVICE INVENTORY — portable built devices
// ═══════════════════════════════════════════════════════════════
import { C } from '../styles.js';
import { DEVICES, isCampusTool } from '../gameData/devices.js';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };

export function DeviceInventoryView({ deviceInventory, setDeviceTargetPicker, setEquipPicker, setAttachPicker }) {
  const owned = Object.entries(deviceInventory || {}).filter(([, qty]) => qty > 0);

  const handleUse = (def) => {
    if (def.form === 'campus_tool') return;
    if (def.form === 'consumable') {
      setDeviceTargetPicker({ def });
    } else if (def.form === 'attachment') {
      setAttachPicker({ def });
    } else {
      setEquipPicker({ def });
    }
  };

  return (
    <div>
      <p style={C.secT}>🛠 Device Inventory</p>
      {owned.length === 0 && (
        <div style={{ fontSize: 12, color: '#5a3888', fontStyle: 'italic' }}>
          No devices built yet. Craft prototypes in The Lab.
        </div>
      )}
      <div style={C.grid2}>
        {owned.map(([id, qty]) => {
          const def = DEVICES[id];
          if (!def) return null;
          const actionLabel = def.form === 'consumable' ? 'Use on…'
            : def.form === 'campus_tool' ? 'Campus tool'
            : def.form === 'attachment' ? 'Attach…' : 'Equip…';
          return (
            <div key={id} style={C.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <div style={{ fontWeight: 700, color: '#90b0d0' }}>{def.icon} {def.label}</div>
                <span style={{ ...C.tag(`${RARITY_COLORS[def.rarity]}30`, RARITY_COLORS[def.rarity]), fontSize: 8 }}>×{qty}</span>
              </div>
              <div style={{ fontSize: 10, color: '#5a6080', marginBottom: 6, lineHeight: 1.4 }}>{def.desc}</div>
              {isCampusTool(def) && (
                <div style={{ fontSize: 9, color: '#8060a0', marginBottom: 6 }}>
                  Usable during campus exploration when a device opportunity appears.
                </div>
              )}
              <div style={{ fontSize: 9, color: '#607080', marginBottom: 8 }}>
                Stability {(def.stability * 100).toFixed(0)}% · Risk {(def.risk * 100).toFixed(0)}%
              </div>
              <button
                style={{ ...C.btn(), width: '100%', opacity: def.form === 'campus_tool' ? 0.75 : 1 }}
                onClick={() => handleUse(def)}
                disabled={def.form === 'campus_tool'}
              >
                {actionLabel}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
