// App.tsx
// Root component — initializes Lenis smooth scroll, provides the
// language context, and renders the narrative + language switcher.
import { useLenis }            from './hooks/useLenis';
import { Home }                from './pages/Home';
import { LanguageProvider }    from './contexts/LanguageContext';
import { LanguageSwitcher }    from './components/shared/LanguageSwitcher';

export default function App() {
  useLenis();

  return (
    <LanguageProvider>
      {/* Fixed language toggle — top right, always accessible */}
      <LanguageSwitcher />
      <Home />
    </LanguageProvider>
  );
}
