// Interactive floor blueprint — click a wing to filter upgrades.
import { useState } from 'react';
import { C } from '../styles.js';
import {
  HALL_ROOMS,
  HALL_ROOM_ADJACENCY,
  countOwnedInRoom,
  roomDevelopmentTier,
  listActiveSynergies,
} from '../gameData/hallBlueprint.js';
import { computeHallAmbianceMeters, ambianceSummaryLine } from '../gameData/hallAmbiance.js';

const GRID_LAYOUT = {
  common_lounge: { row: 1, col: 1, rowSpan: 2, colSpan: 2 },
  kitchen_pantry: { row: 1, col: 3, rowSpan: 1, colSpan: 2 },
  social_salon: { row: 2, col: 3, rowSpan: 1, colSpan: 2 },
  ra_office: { row: 3, col: 1, rowSpan: 1, colSpan: 2 },
  wellness_nook: { row: 3, col: 3, rowSpan: 1, colSpan: 2 },
  grand_atrium: { row: 4, col: 1, rowSpan: 1, colSpan: 4 },
};

function adjacencySet(roomId) {
  const set = new Set();
  HALL_ROOM_ADJACENCY.forEach(([a, b]) => {
    if (a === roomId) set.add(b);
    if (b === roomId) set.add(a);
  });
  return set;
}

function RoomCell({ room, owned, selected, highlighted, onSelect }) {
  const tier = roomDevelopmentTier(owned, room.id);
  const count = countOwnedInRoom(owned, room.id);
  const layout = GRID_LAYOUT[room.id];
  const active = selected === room.id;
  const glow = tier >= 2 ? '0 0 18px rgba(120,200,255,0.35)' : tier >= 1 ? '0 0 10px rgba(120,200,255,0.15)' : 'none';

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={`${room.label}, ${count} upgrades`}
      onClick={() => onSelect(room.id)}
      style={{
        gridRow: `${layout.row} / span ${layout.rowSpan}`,
        gridColumn: `${layout.col} / span ${layout.colSpan}`,
        margin: 0,
        padding: '10px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        fontFamily: 'inherit',
        borderRadius: 6,
        border: active
          ? '2px solid #7ec8ff'
          : highlighted
            ? '1px solid #5a90c8'
            : '1px dashed rgba(126,200,255,0.35)',
        background: active
          ? 'linear-gradient(145deg, rgba(30,60,90,0.55), rgba(12,24,40,0.75))'
          : 'rgba(8,20,36,0.55)',
        boxShadow: glow,
        transition: 'border-color 0.15s, box-shadow 0.15s',
        minHeight: layout.rowSpan > 1 ? 88 : 64,
      }}
    >
      <div style={{ fontSize: 9, color: '#6a9cc0', letterSpacing: 1.2, textTransform: 'uppercase' }}>
        Wing · T{tier}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#d8eeff', marginTop: 2 }}>
        {room.emoji} {room.short}
      </div>
      <div style={{ fontSize: 9, color: '#7a98b0', marginTop: 4, lineHeight: 1.4 }}>
        {count} installed
      </div>
    </button>
  );
}

export function HallBlueprint({ ownedHallSkills = {}, selectedRoomId, onSelectRoom }) {
  const [internalRoom, setInternalRoom] = useState('common_lounge');
  const selected = selectedRoomId ?? internalRoom;
  const setSelected = onSelectRoom || setInternalRoom;
  const owned = ownedHallSkills || {};
  const synergies = listActiveSynergies(owned);
  const meters = computeHallAmbianceMeters(owned);
  const neighbors = adjacencySet(selected);

  return (
    <div style={{ ...C.card, borderColor: '#1a4060', marginBottom: 14, padding: '12px 14px', background: 'linear-gradient(180deg, rgba(6,18,32,0.9), rgba(4,10,20,0.95))' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
        <div style={{ fontSize: 10, color: '#7ec8ff', letterSpacing: 1.5 }}>FLOOR BLUEPRINT</div>
        <div style={{ fontSize: 9, color: '#5080a0' }}>Click a wing · install upgrades below</div>
      </div>
      <p style={{ fontSize: 10, color: '#90b0c8', lineHeight: 1.55, margin: '0 0 10px' }}>
        {ambianceSummaryLine(owned)}
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, minmax(56px, auto))',
          gap: 6,
          padding: 10,
          borderRadius: 8,
          border: '1px solid rgba(126,200,255,0.2)',
          backgroundImage: `
            linear-gradient(rgba(126,200,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(126,200,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '16px 16px',
        }}
      >
        {HALL_ROOMS.map((room) => (
          <RoomCell
            key={room.id}
            room={room}
            owned={owned}
            selected={selected}
            highlighted={neighbors.has(room.id)}
            onSelect={setSelected}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
        {Object.entries(meters).map(([id, val]) => {
          const meta = { comfort: 'Comfort', appetite: 'Appetite', logistics: 'Logistics', socialHeat: 'Social', intimacy: 'Intimacy', prestige: 'Prestige' };
          return (
            <div key={id} style={{ fontSize: 8, color: '#6088a8', minWidth: 72 }}>
              {meta[id] || id}
              <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.08)', marginTop: 2 }}>
                <div style={{ width: `${val}%`, height: '100%', borderRadius: 2, background: '#6ab0e8' }} />
              </div>
            </div>
          );
        })}
      </div>
      {synergies.length > 0 && (
        <p style={{ fontSize: 9, color: '#88c8a0', margin: '10px 0 0', lineHeight: 1.45 }}>
          Resonant wings: {synergies.map((s) => `${s.a.short}↔${s.b.short}`).join(' · ')} (+{synergies.length * 2}% gains)
        </p>
      )}
      {getHallRoomBlurb(selected)}
    </div>
  );
}

function getHallRoomBlurb(roomId) {
  const room = HALL_ROOMS.find((r) => r.id === roomId);
  if (!room) return null;
  return (
    <p style={{ fontSize: 10, color: '#a0c0d8', margin: '8px 0 0', fontStyle: 'italic', lineHeight: 1.5 }}>
      {room.label}: {room.blurb}
    </p>
  );
}
