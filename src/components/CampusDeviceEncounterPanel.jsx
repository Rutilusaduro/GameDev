import { C } from '../styles.js';
import { DEVICES } from '../gameData/devices.js';
import { getDeviceModesForCampus } from '../gameData/campusDeviceEncounters.js';

export function CampusDeviceEncounterPanel({
  encounter,
  deviceInventory,
  onUseDevice,
  onDismiss,
}) {
  if (!encounter) return null;
  const { target, allowedDevices } = encounter;

  return (
    <div style={{ ...C.card, borderColor: '#4a3060', marginBottom: 8, padding: '12px 14px' }}>
      <div style={{ fontSize: 9, letterSpacing: 2, color: '#a080c0', marginBottom: 6 }}>DEVICE OPPORTUNITY</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#d0b0f0', marginBottom: 4 }}>
        {target.emoji || '🎯'} {target.name}
        {target.type === 'npc' && (
          <span style={{ fontSize: 10, color: '#9080a0', fontWeight: 400, marginLeft: 6 }}>
            ({target.role}) · ~{Math.round(target.lbs)} lbs
          </span>
        )}
        {target.type === 'student' && (
          <span style={{ fontSize: 10, color: '#9080a0', fontWeight: 400, marginLeft: 6 }}>
            roster · ~{Math.round(target.lbs)} lbs
          </span>
        )}
      </div>
      <div style={{ fontSize: 10, color: '#7a6a90', marginBottom: 10, lineHeight: 1.5 }}>
        Talia&apos;s devices are in range. Choose a tool and mode — discovery risk varies.
      </div>
      {allowedDevices.length === 0 && (
        <div style={{ fontSize: 11, color: '#c8860a', marginBottom: 8 }}>
          No campus-ready devices in inventory. Build remote tools or masks in The Lab.
        </div>
      )}
      {allowedDevices.map(deviceId => {
        const def = DEVICES[deviceId];
        if (!def) return null;
        const modes = getDeviceModesForCampus(deviceId, deviceInventory);
        return (
          <div key={deviceId} style={{ marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #2a2030' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#b0a0d0', marginBottom: 6 }}>
              {def.icon} {def.label}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {modes.map(mode => (
                <button
                  key={mode.id}
                  style={{ ...C.smBtn, fontSize: 10 }}
                  onClick={() => onUseDevice(encounter, deviceId, mode.id)}
                >
                  {mode.label}
                  {mode.discoveryRisk != null && (
                    <span style={{ color: '#a08060', marginLeft: 4 }}>
                      ({Math.round((mode.discoveryRisk || 0) * 100)}% risk)
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        );
      })}
      <button style={{ ...C.btn('#333'), width: '100%', marginTop: 4 }} onClick={onDismiss}>
        Let them go
      </button>
    </div>
  );
}
