import { AnimatePresence, motion } from 'framer-motion';
import { C, LUXE } from '../styles.js';

export function LuxeAmbient() {
  return <div className="luxe-ambient" aria-hidden="true" />;
}

export function MotionCard({ children, style, className = '', disabled = false, ...props }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.99 }}
      whileHover={disabled ? undefined : { y: -2 }}
      transition={{ type: 'spring', stiffness: 210, damping: 25, mass: 0.8 }}
      className={`luxe-card-hover ${className}`}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function LuxeButton({ children, style, bg, ...props }) {
  return (
    <motion.button
      whileHover={props.disabled ? undefined : { y: -1 }}
      whileTap={props.disabled ? undefined : { scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      className="luxe-button-hover"
      style={{ ...C.btn(bg), ...style }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function ViewStage({ children, viewKey }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={viewKey}
        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -8, filter: 'blur(3px)' }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function LuxeLogLine({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22 }}
      style={C.logE}
    >
      {children}
    </motion.div>
  );
}

export function LuxeModalFrame({ children, style }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 210, damping: 24 }}
      style={{ ...C.modal, ...style }}
    >
      {children}
    </motion.div>
  );
}

export function LuxeKicker({ children, color = LUXE.gold }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 3, color, textTransform: 'uppercase', marginBottom: 6 }}>
      {children}
    </div>
  );
}
