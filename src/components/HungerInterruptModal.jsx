import { C } from '../styles.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../textEngine/scenes/hungerInterrupt.js';

export function HungerInterruptModal({
  student,
  week,
  pharmacistState,
  onFeed,
  onCompound,
  onDeny,
  onTalk,
}) {
  const s = student;
  const hasCompounds = (pharmacistState?.unlockedCompounds || []).some(
    id => (pharmacistState?.compoundInventory?.[id] ?? 0) > 0
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.72)", zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ ...C.modal, maxWidth: 520, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ fontSize: 10, color: "#a05050", letterSpacing: 2, marginBottom: 8 }}>INTERRUPTION</div>
        <div style={{ fontSize: 14, color: "#e8d8c8", lineHeight: 1.85, fontStyle: "italic", marginBottom: 18 }}>
          {renderHungerInterrupt(s, week)}
        </div>
        <div style={{ display: "grid", gap: 8 }}>
          <button type="button" style={{ ...C.btn("#5818a8"), width: "100%" }} onClick={onFeed}>Feed her</button>
          {hasCompounds && (
            <button type="button" style={{ ...C.btn("#2a5070"), width: "100%" }} onClick={onCompound}>Give her a compound (in food)</button>
          )}
          <button type="button" style={{ ...C.btn("#3a3060"), width: "100%" }} onClick={onTalk}>Talk to her / calm her down</button>
          <button type="button" style={{ ...C.btn("#502030"), width: "100%" }} onClick={onDeny}>Turn her away</button>
        </div>
      </div>
    </div>
  );
}

export function HungerOutcomeBanner({ student, action, week }) {
  if (!action || !student) return null;
  return (
    <div style={{ fontSize: 13, color: "#d8c8a8", fontStyle: "italic", lineHeight: 1.75, marginTop: 10 }}>
      {renderHungerOutcome(student, action, week)}
    </div>
  );
}
