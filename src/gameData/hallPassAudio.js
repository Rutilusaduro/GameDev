// Lightweight UI feedback — Web Audio, no asset files.
let audioCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

/** @param {'unlock'|'week'|'click'|'confirm'|'tier'|'session'} kind */
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
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392, t);
      osc.frequency.exponentialRampToValueAtTime(523, t + 0.1);
      osc.frequency.exponentialRampToValueAtTime(659, t + 0.22);
      gain.gain.setValueAtTime(0.05, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.34);
      osc.start(t);
      osc.stop(t + 0.34);
    } else if (kind === 'week') {
      osc.frequency.value = 262;
      gain.gain.setValueAtTime(0.035, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc.start(t);
      osc.stop(t + 0.16);
    } else if (kind === 'click') {
      osc.type = 'triangle';
      osc.frequency.value = 520;
      gain.gain.setValueAtTime(0.022, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (kind === 'confirm') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(660, t + 0.09);
      gain.gain.setValueAtTime(0.032, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.start(t);
      osc.stop(t + 0.18);
    } else if (kind === 'tier') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, t);
      osc.frequency.exponentialRampToValueAtTime(494, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(587, t + 0.26);
      gain.gain.setValueAtTime(0.042, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      osc.start(t);
      osc.stop(t + 0.38);
    } else if (kind === 'session') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(294, t);
      osc.frequency.exponentialRampToValueAtTime(392, t + 0.14);
      gain.gain.setValueAtTime(0.028, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
      osc.start(t);
      osc.stop(t + 0.24);
    }
  } catch {
    /* audio optional */
  }
}
