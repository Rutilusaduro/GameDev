import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'ps_text_flags';

function readEnabled() {
  if (typeof import.meta !== 'undefined' && import.meta.env?.DEV) return true;
  try {
    return localStorage.getItem(STORAGE_KEY) !== '0';
  } catch {
    return true;
  }
}

const TextFlagContext = createContext({
  enabled: true,
  setEnabled: () => {},
});

export function TextFlagProvider({ children }) {
  const [enabled, setEnabled] = useState(readEnabled);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, enabled ? '1' : '0');
    } catch {
      // private browsing — in-memory only
    }
  }, [enabled]);

  const effective = enabled || (typeof import.meta !== 'undefined' && import.meta.env?.DEV);

  return (
    <TextFlagContext.Provider value={{ enabled: effective, setEnabled }}>
      {children}
    </TextFlagContext.Provider>
  );
}

export function useTextFlags() {
  return useContext(TextFlagContext);
}
