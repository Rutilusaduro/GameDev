// Lightweight UI feedback — Web Audio, no asset files.
let audioCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

/** @param {'unlock'|'week'} kind */
export function playHallPassSound(kind, enabled = true) {
  if (!enabled) return;
  const ctx = getCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;
    if (kind === 'unlock') {
      osc.frequency.setValueAtTime(392, t);
      osc.frequency.exponentialRampToValueAtTime(587, t + 0.14);
      gain.gain.setValueAtTime(0.055, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.start(t);
      osc.stop(t + 0.28);
    } else if (kind === 'week') {
      osc.frequency.value = 262;
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.start(t);
      osc.stop(t + 0.16);
    }
  } catch {
    /* audio optional */
  }
}
