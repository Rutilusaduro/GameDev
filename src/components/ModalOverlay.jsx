import { C } from '../styles.js';
import { playHallPassSound } from '../gameData/hallPassAudio.js';
import { useModalDismiss } from '../hooks/useModalDismiss.js';

export function ModalOverlay({
  onClose,
  dismissible = true,
  soundEnabled = true,
  style,
  children,
}) {
  const canDismiss = dismissible && onClose;
  useModalDismiss(canDismiss ? onClose : null);

  const overlayProps = canDismiss
    ? {
        onClick: (e) => {
          if (e.target === e.currentTarget) {
            playHallPassSound('click', soundEnabled);
            onClose();
          }
        },
      }
    : {};

  return (
    <div className="hall-pass-overlay-in" style={{ ...C.overlay, ...style }} {...overlayProps}>
      {children}
    </div>
  );
}
