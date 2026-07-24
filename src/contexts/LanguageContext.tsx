// LanguageContext.tsx
// Provides the active language (ES/EN) and a toggle function
// to the entire component tree.
import { createContext, useContext, useState, useCallback } from 'react';
import type { Lang } from '../i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  toggle: () => {},
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Spanish since the user requested it
  const [lang, setLangState] = useState<Lang>('es');

  const toggle = useCallback(() => {
    setLangState(prev => (prev === 'es' ? 'en' : 'es'));
  }, []);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Convenience hook used by every scene
export function useLang(): LanguageContextValue {
  return useContext(LanguageContext);
}
