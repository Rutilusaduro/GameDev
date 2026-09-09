// Mini RA portrait — redhead, curvy silhouette; shared by setup wizard + desk header.

export const RA_PORTRAIT = {
  hair: '#c44a2a',
  skin: '#f5d0b8',
  top: '#8b1a4a',
};

export function RaPortraitChip({ accent = '#c44a2a', accentSoft = 'rgba(196,74,42,0.22)', size = 88 }) {
  const headW = Math.round(size * 0.59);
  const headH = Math.round(size * 0.5);
  const hairW = Math.round(size * 0.64);
  const hairH = Math.round(size * 0.32);
  const topW = Math.round(size * 0.73);
  const topH = Math.round(size * 0.41);

  return (
    <div
      className="ra-portrait-chip"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `linear-gradient(145deg, ${RA_PORTRAIT.top}, #4a1028)`,
        border: `2px solid ${accent}`,
        boxShadow: `0 0 ${Math.round(size * 0.36)}px ${accentSoft}`,
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <div style={{
        position: 'absolute',
        top: Math.round(size * 0.09),
        left: '50%',
        transform: 'translateX(-50%)',
        width: headW,
        height: headH,
        borderRadius: '50% 50% 40% 40%',
        background: RA_PORTRAIT.skin,
      }} />
      <div style={{
        position: 'absolute',
        top: Math.round(size * 0.02),
        left: '50%',
        transform: 'translateX(-50%)',
        width: hairW,
        height: hairH,
        borderRadius: '50% 50% 0 0',
        background: RA_PORTRAIT.hair,
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: topW,
        height: topH,
        borderRadius: '40% 40% 0 0',
        background: RA_PORTRAIT.top,
      }} />
    </div>
  );
}
