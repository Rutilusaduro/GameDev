// Lightweight UI feedback — Web Audio, no asset files.
let audioCtx = null;

const MASTER_GAIN = 1;

function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function ensureCtx() {
  const ctx = getCtx();
  if (!ctx) return null;
  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

function amp(value) {
  return value * MASTER_GAIN;
}

/** Prime audio after first user gesture (browser autoplay policy). */
export function warmupHallPassAudio() {
  ensureCtx();
}

/** @param {'unlock'|'week'|'click'|'nav'|'confirm'|'tier'|'session'|'weigh'|'alert'} kind */
export function playHallPassSound(kind, enabled = true) {
  if (!enabled) return;
  const ctx = ensureCtx();
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
      gain.gain.setValueAtTime(amp(0.048), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.34);
      osc.start(t);
      osc.stop(t + 0.34);
    } else if (kind === 'week') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(262, t);
      osc.frequency.exponentialRampToValueAtTime(330, t + 0.08);
      gain.gain.setValueAtTime(amp(0.032), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.start(t);
      osc.stop(t + 0.18);
    } else if (kind === 'click') {
      osc.type = 'triangle';
      osc.frequency.value = 520;
      gain.gain.setValueAtTime(amp(0.02), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.start(t);
      osc.stop(t + 0.05);
    } else if (kind === 'nav') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(392, t);
      osc.frequency.exponentialRampToValueAtTime(494, t + 0.07);
      gain.gain.setValueAtTime(amp(0.018), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.start(t);
      osc.stop(t + 0.1);
    } else if (kind === 'confirm') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(660, t + 0.09);
      gain.gain.setValueAtTime(amp(0.03), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
      osc.start(t);
      osc.stop(t + 0.18);
    } else if (kind === 'tier') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, t);
      osc.frequency.exponentialRampToValueAtTime(494, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(587, t + 0.26);
      gain.gain.setValueAtTime(amp(0.036), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
      osc.start(t);
      osc.stop(t + 0.38);
    } else if (kind === 'session') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(294, t);
      osc.frequency.exponentialRampToValueAtTime(392, t + 0.14);
      gain.gain.setValueAtTime(amp(0.026), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);
      osc.start(t);
      osc.stop(t + 0.24);
    } else if (kind === 'weigh') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);
      gain.gain.setValueAtTime(amp(0.034), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.start(t);
      osc.stop(t + 0.2);
    } else if (kind === 'alert') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(165, t + 0.18);
      gain.gain.setValueAtTime(amp(0.03), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
      osc.start(t);
      osc.stop(t + 0.28);
    }
  } catch {
    /* audio optional */
  }
}
