// Dinner log line styling — dialogue/narrative vs system messages.

const SYSTEM_PREFIX = /^[🍴🚫🎒🫆😤😵👀]/;

export function isDinnerDialogueLine(line) {
  if (!line || typeof line !== 'string') return false;
  return line.startsWith('💬') || line.startsWith('👀') || !SYSTEM_PREFIX.test(line);
}

export function dinnerLogDisplayText(line) {
  if (line.startsWith('💬') || line.startsWith('👀')) return line.slice(2).trim();
  return line;
}

export function getDinnerLogLineStyle(line, showGap = false) {
  if (isDinnerDialogueLine(line)) {
    return {
      fontSize: 15,
      color: '#f8ead8',
      lineHeight: 1.85,
      fontWeight: 400,
      padding: '10px 12px',
      marginBottom: showGap ? 8 : 0,
      background: 'rgba(48, 24, 72, 0.72)',
      borderRadius: 8,
      borderLeft: '3px solid #c898ff',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
    };
  }
  const color = line.startsWith('🍴') ? '#e8c878'
    : line.startsWith('😤') ? '#f08060'
    : line.startsWith('😵') ? '#f06040'
    : line.startsWith('👀') ? '#d8a8c8'
    : '#9a78b8';
  return {
    fontSize: 11,
    color,
    lineHeight: 1.5,
    paddingBottom: showGap ? 4 : 0,
    marginBottom: showGap ? 4 : 0,
    borderBottom: showGap ? '1px solid rgba(80,20,120,0.12)' : 'none',
    opacity: 0.92,
  };
}

export const DINNER_LOG_PANEL_STYLE = {
  background: 'rgba(12, 4, 24, 0.92)',
  border: '1px solid #3a1860',
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  maxHeight: 240,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
};
