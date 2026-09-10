// RA display name — how residents address the player in prose/UI.

export function getRaDisplayName(raProfile) {
  const raw = raProfile?.displayName?.trim() || raProfile?.name?.trim();
  if (!raw || raw === 'You') return 'RA';
  return raw;
}
