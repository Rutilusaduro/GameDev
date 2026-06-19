import { motion } from 'framer-motion';
import { LUXE } from '../styles.js';

export function Bar({ val, max = 1100, color = '#8030d0', height = 8 }) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (val / max) * 100)) : 0;

  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(5,3,5,0.9), rgba(32,12,20,0.82))',
        border: `1px solid ${LUXE.line}`,
        borderRadius: 999,
        height: Math.max(height, 8),
        overflow: 'hidden',
        margin: '5px 0',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.65)',
        position: 'relative',
      }}
    >
      <motion.div
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ type: 'spring', stiffness: 82, damping: 18, mass: 0.8 }}
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color}, ${LUXE.gold2})`,
          borderRadius: 999,
          boxShadow: `0 0 18px ${color}66, inset 0 1px 0 rgba(255,255,255,0.22)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.16), transparent 46%, rgba(0,0,0,0.18))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export function StageTag({ stage }) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${stage.color}, rgba(76,22,43,0.88))`,
        color: '#fff8ea',
        borderRadius: 999,
        padding: '3px 10px',
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 0.8,
        whiteSpace: 'nowrap',
        border: '1px solid rgba(255,238,204,0.2)',
        boxShadow: `0 0 16px ${stage.color}44, inset 0 1px 0 rgba(255,255,255,0.16)`,
      }}
    >
      {stage.label.toUpperCase()}
    </span>
  );
}

export function MoodBadge({ mood }) {
  const m = {
    happy: '😊',
    focused: '📖',
    excited: '⚡',
    competitive: '🏆',
    dreamy: '🌙',
    dry: '😑',
    social: '🥂',
    driven: '📊',
    observant: '👁',
    curious: '🔍',
    content: '☁️',
    tired: '😴',
    stressed: '😰',
    nervous: '😬',
  };
  return <span style={{ fontSize: 12, color: '#e8c79a', whiteSpace: 'nowrap' }}>{m[mood] || '😐'} {mood}</span>;
}
