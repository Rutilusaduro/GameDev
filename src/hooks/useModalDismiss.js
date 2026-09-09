import { useEffect } from 'react';

/** Register Escape-to-close while a modal is mounted. Pass null to disable. */
export function useModalDismiss(onClose) {
  useEffect(() => {
    if (!onClose) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
}
