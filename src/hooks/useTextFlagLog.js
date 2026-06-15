import { useEffect, useState } from 'react';
import { loadTextFlags, subscribeTextFlags } from '../gameData/textFlagStore.js';

/** Live count + list of persisted dialogue flags (Dialogue Lab + popup toolbar). */
export function useTextFlagLog() {
  const [flags, setFlags] = useState(() => loadTextFlags());

  useEffect(() => {
    const refresh = () => setFlags(loadTextFlags());
    refresh();
    return subscribeTextFlags(refresh);
  }, []);

  return flags;
}
