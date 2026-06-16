// ═══════════════════════════════════════════════════════════════
// DEVICE INVENTORY — catalog, equipped, modified, player inventions
// ═══════════════════════════════════════════════════════════════
import { useMemo, useState } from 'react';
import { C } from '../styles.js';
import { DEVICES } from '../gameData/devices.js';
import { renderDeviceFlavor } from '../textEngine/scenes/deviceFlavor.js';
import {
  countOwnedDevices,
  countEquippedAcrossStudents,
  devicesCatalogUnlocked,
  deviceStatusBadge,
  filterDevices,
  listEquippedEntries,
  summarizeDeviceEffect,
} from '../gameData/deviceQuery.js';
import { MOD_COMPONENTS } from '../gameData/deviceMods.js';
import { applyModification } from '../gameData/deviceEffects.js';

const RARITY_COLORS = { common: '#8a8a7a', uncommon: '#4a9a5a', rare: '#c8860a' };
const ACCENT = '#4a6080';

const SUB_TABS = [
  { id: 'catalog', label: 'Catalog' },
  { id: 'equipped', label: 'Equipped' },
  { id: 'modified', label: 'Modified' },
];

const FORM_OPTIONS = [
  { value: 'all', label: 'All forms' },
  { value: 'worn', label: 'Worn' },
  { value: 'installed', label: 'Installed' },
  { value: 'attachment', label: 'Attachments' },
  { value: 'consumable', label: 'Consumables' },
  { value: 'campus_tool', label: 'Campus tools' },
  { value: 'stationary', label: 'Stationary' },
];

function deviceCatalogLine(def, student, week) {
  if (student) {
    const flavor = renderDeviceFlavor(def.id, student, week);
    if (flavor) return flavor;
  }
  return def.desc || '';
}

function DeviceDetailPanel({ def, statusCtx, flavorStudent, week, onClose, onEquipStudent, onQuickUse }) {
  if (!def) return null;
  const badge = deviceStatusBadge(def.id, statusCtx);
  const malfCount = def.malfunctions?.length ?? 0;

  return (
    <div style={{
      ...C.card,
      marginTop: 10,
      border: `1px solid ${ACCENT}`,
      background: 'rgba(12,18,28,0.95)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#90b0d0' }}>{def.icon} {def.label}</div>
          <div style={{ fontSize: 10, color: badge.color, marginTop: 4 }}>{badge.label}</div>
        </div>
        <button style={C.smBtn} onClick={onClose}>✕</button>
      </div>
      <div style={{ fontSize: 11, color: '#8090a8', lineHeight: 1.6, marginBottom: 10 }}>{deviceCatalogLine(def, flavorStudent, week)}</div>
      <div style={{ fontSize: 10, color: '#607080', marginBottom: 8 }}>
        Tier {def.tier} · {def.rarity} · Stability {(def.stability * 100).toFixed(0)}% · Risk {(def.risk * 100).toFixed(0)}%
      </div>
      <div style={{ fontSize: 10, color: '#70a0b0', marginBottom: 8 }}>
        <strong>Effect:</strong> {summarizeDeviceEffect(def)}
      </div>
      {def.weeklyEffect && (
        <div style={{ fontSize: 10, color: '#8090a0', marginBottom: 6 }}>
          Weekly: {summarizeDeviceEffect(def)}
        </div>
      )}
      {malfCount > 0 && (
        <div style={{ fontSize: 10, color: '#a07050', marginBottom: 8 }}>
          Malfunctions: {malfCount} tiers defined
        </div>
      )}
      <div style={{ fontSize: 10, color: '#506070', marginBottom: 10 }}>
        Slot: {def.slot || def.attachSlot || '—'} · Form: {def.form}
        {def.inventionKind === 'equipable' && ' · Equipable'}
        {def.inventionKind === 'event' && ' · Event invention'}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {!def.playerInvention && def.form !== 'campus_tool' && def.form !== 'stationary' && def.form !== 'consumable' && (
          <button style={C.btn(ACCENT)} onClick={() => onEquipStudent(def)}>
            Equip to Student…
          </button>
        )}
        {(def.form === 'consumable' || def.form === 'stationary' || def.form === 'campus_tool') && (
          <button style={C.btn('#333')} onClick={() => onQuickUse(def)}>Use on student…</button>
        )}
      </div>
    </div>
  );
}

function DeviceCard({ def, qty, statusCtx, flavorStudent, week, selected, onSelect, onQuickUse }) {
  const badge = deviceStatusBadge(def.id, statusCtx);
  const rarityColor = RARITY_COLORS[def.rarity] || RARITY_COLORS.common;

  return (
    <div
      style={{
        ...C.card,
        cursor: 'pointer',
        borderColor: selected ? ACCENT : undefined,
        boxShadow: selected ? `0 0 8px ${ACCENT}40` : undefined,
      }}
      onClick={() => onSelect(def.id)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <div style={{ fontWeight: 700, color: '#90b0d0', fontSize: 12 }}>{def.icon} {def.label}</div>
        {qty > 0 && (
          <span style={{ ...C.tag(`${rarityColor}30`, rarityColor), fontSize: 8 }}>×{qty}</span>
        )}
      </div>
      <div style={{ fontSize: 9, color: '#5a6080', marginBottom: 6, lineHeight: 1.4, minHeight: 32 }}>
        {(() => {
          const line = deviceCatalogLine(def, flavorStudent, week);
          return line.length > 90 ? `${line.slice(0, 90)}…` : line;
        })()}
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
        <span style={{ ...C.tag(`${rarityColor}25`, rarityColor), fontSize: 8 }}>T{def.tier}</span>
        <span style={{ ...C.tag(`${badge.color}25`, badge.color), fontSize: 8 }}>{badge.label}</span>
      </div>
      <div style={{ fontSize: 9, color: '#607080', marginBottom: 6 }}>{summarizeDeviceEffect(def)}</div>
      <button
        style={{ ...C.btn(), width: '100%', fontSize: 9, padding: '4px 8px' }}
        onClick={(e) => { e.stopPropagation(); onQuickUse(def); }}
      >
        {def.form === 'attachment' ? 'Attach…' : def.form === 'consumable' ? 'Use…' : 'Manage'}
      </button>
    </div>
  );
}

export function DeviceInventoryView({
  deviceInventory,
  students = [],
  week = 1,
  player,
  labState,
  setStudents,
  setPlayer,
  setDeviceTargetPicker,
  setEquipPicker,
  setAttachPicker,
  openEquipModal,
  pushLog,
}) {
  const [subTab, setSubTab] = useState('catalog');
  const [formFilter, setFormFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const statusCtx = useMemo(
    () => ({ deviceInventory, students, player }),
    [deviceInventory, students, player],
  );

  const flavorStudent = useMemo(
    () => students.find((s) => Object.keys(s.equip || {}).length > 0) || students[0] || null,
    [students],
  );

  const handleApplyMod = (row, componentId) => {
    if (row.holderType === 'player' || !row.slot || !row.holderId) return;
    const student = students.find((s) => s.id === row.holderId);
    if (!student) return;
    const qty = player?.modInventory?.[componentId] ?? 0;
    if (qty < 1) {
      pushLog?.('⚠️ No mod components in inventory.');
      return;
    }
    const result = applyModification(student, row.slot, componentId);
    if (!result.ok) {
      pushLog?.('⚠️ Could not apply modification.');
      return;
    }
    setStudents?.((prev) => prev.map((s) => (s.id === student.id ? result.student : s)));
    setPlayer?.((p) => ({
      ...p,
      modInventory: {
        ...p.modInventory,
        [componentId]: Math.max(0, (p.modInventory?.[componentId] ?? 0) - 1),
      },
    }));
    pushLog?.(`🔧 Applied ${MOD_COMPONENTS[componentId]?.label || componentId} to ${row.def?.label}.`);
  };

  const availableMods = Object.entries(player?.modInventory || {}).filter(([, q]) => q > 0);
  const ownedCount = countOwnedDevices(deviceInventory);
  const equippedCount = countEquippedAcrossStudents(students, player);
  const catalogUnlocked = devicesCatalogUnlocked(deviceInventory, students, player, labState);

  const catalogDevices = useMemo(() => filterDevices({
    form: formFilter,
    tier: tierFilter,
    search,
    deviceInventory,
    ownedOnly: catalogUnlocked,
  }), [formFilter, tierFilter, search, deviceInventory, catalogUnlocked]);

  const equippedRows = useMemo(
    () => listEquippedEntries(students, player),
    [students, player],
  );

  const modifiedRows = equippedRows.filter((r) => r.modified);

  const selectedDef = selectedId ? DEVICES[selectedId] : null;

  const handleQuickUse = (def) => {
    if (!def) return;
    if (def.form === 'consumable' || def.form === 'stationary') setDeviceTargetPicker({ def });
    else if (def.form === 'attachment') setAttachPicker({ def });
    else setEquipPicker({ def });
  };

  const handleEquipStudent = (def) => {
    if (!def) return;
    setEquipPicker?.({ def });
  };

  const renderCatalogGrid = (devices) => (
    <div style={C.grid2}>
      {devices.map((def) => (
        <DeviceCard
          key={def.id}
          def={def}
          qty={deviceInventory[def.id] || 0}
          statusCtx={statusCtx}
          flavorStudent={flavorStudent}
          week={week}
          selected={selectedId === def.id}
          onSelect={setSelectedId}
          onQuickUse={handleQuickUse}
        />
      ))}
      {devices.length === 0 && (
        <div style={{ fontSize: 11, color: '#5a3888', fontStyle: 'italic', gridColumn: '1 / -1' }}>
          No devices match these filters.
        </div>
      )}
    </div>
  );

  return (
    <div>
      <p style={C.secT}>🛠 Devices & Inventions</p>

      {!catalogUnlocked ? (
        <div style={{ ...C.card, border: `1px solid ${ACCENT}40` }}>
          <div style={{ fontSize: 12, color: '#8090b0', lineHeight: 1.7 }}>
            The device catalog stays locked until you build your first invention in The Lab.
            Research a blueprint, gather parts, and complete a build — then owned devices appear here.
          </div>
        </div>
      ) : (
        <>
      <div style={{ ...C.card, marginBottom: 10, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ fontSize: 11, color: '#8090b0' }}>
          <strong style={{ color: '#a0c0e0' }}>{ownedCount}</strong> owned
        </div>
        <div style={{ fontSize: 11, color: '#8090b0' }}>
          <strong style={{ color: '#90c0a0' }}>{equippedCount}</strong> equipped
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
        {SUB_TABS.map((t) => (
          <button key={t.id} style={C.navB(subTab === t.id)} onClick={() => { setSubTab(t.id); setSelectedId(null); }}>
            {t.label}
          </button>
        ))}
      </div>

      {(subTab === 'catalog') && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {subTab === 'catalog' && (
            <select
              value={formFilter}
              onChange={(e) => setFormFilter(e.target.value)}
              style={{ ...C.btn('#1a2030'), fontSize: 10 }}
            >
              {FORM_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          )}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            style={{ ...C.btn('#1a2030'), fontSize: 10 }}
          >
            <option value="all">All tiers</option>
            {[1, 2, 3].map((t) => (
              <option key={t} value={t}>Tier {t}</option>
            ))}
          </select>
          <input
            type="search"
            placeholder="Search devices…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: 140,
              background: '#0a1020',
              border: '1px solid #304050',
              borderRadius: 6,
              color: '#a0b0c0',
              padding: '6px 10px',
              fontSize: 11,
              fontFamily: 'inherit',
            }}
          />
        </div>
      )}

      {subTab === 'catalog' && renderCatalogGrid(catalogDevices)}

      {subTab === 'equipped' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {equippedRows.length === 0 && (
            <div style={{ fontSize: 11, color: '#5a3888', fontStyle: 'italic' }}>Nothing equipped yet.</div>
          )}
          {equippedRows.map((row, i) => (
            <div key={`${row.holder}-${row.defId}-${i}`} style={C.card}>
              <div style={{ fontWeight: 700, color: '#90b0d0' }}>{row.def?.icon} {row.def?.label}</div>
              <div style={{ fontSize: 10, color: '#607080' }}>
                on {row.holder} · {row.slot}
                {row.modified && <span style={{ color: '#c8860a' }}> · modified</span>}
              </div>
              {row.holderType === 'student' && (
                <button
                  style={{ ...C.smBtn, marginTop: 6, fontSize: 9 }}
                  onClick={() => openEquipModal?.(row.holderId)}
                >
                  Manage equipment
                </button>
              )}
              {row.holderType === 'student' && availableMods.length > 0 && (
                <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {availableMods.map(([modId]) => (
                    <button
                      key={modId}
                      style={{ ...C.smBtn, fontSize: 8 }}
                      onClick={() => handleApplyMod(row, modId)}
                    >
                      + {MOD_COMPONENTS[modId]?.icon} {MOD_COMPONENTS[modId]?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {subTab === 'modified' && (
        <div>
          {modifiedRows.length === 0 ? (
            <div style={{ fontSize: 11, color: '#5a3888', fontStyle: 'italic' }}>
              No modified devices yet. Apply components from the Equipped tab.
            </div>
          ) : (
            modifiedRows.map((row, i) => (
              <div key={i} style={{ ...C.card, marginBottom: 6 }}>
                {row.def?.icon} {row.def?.label} on {row.holder}
              </div>
            ))
          )}
        </div>
      )}

      {selectedDef && (
        <DeviceDetailPanel
          def={selectedDef}
          statusCtx={statusCtx}
          flavorStudent={flavorStudent}
          week={week}
          onClose={() => setSelectedId(null)}
          onEquipStudent={handleEquipStudent}
          onQuickUse={handleQuickUse}
        />
      )}
        </>
      )}
    </div>
  );
}
