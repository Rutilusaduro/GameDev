// Lightweight UI prefs (localStorage) — B2 instant text, etc.

const KEY = 'professorSim.prefs';

const DEFAULTS = {
  instantText: false,
  sceneScrollbackOpen: false,
};

function read() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

function write(prefs) {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    /* ignore quota */
  }
}

export function getPlayerPrefs() {
  return read();
}

export function setPlayerPref(key, value) {
  const next = { ...read(), [key]: value };
  write(next);
  return next;
}

export function toggleInstantText() {
  const cur = read();
  return setPlayerPref('instantText', !cur.instantText);
}
