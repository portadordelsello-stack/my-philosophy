// App.tsx — Root: Lenis + Language + Theme + Controls + Home
import { useLenis }         from './hooks/useLenis';
import { Home }             from './pages/Home';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider }    from './contexts/ThemeContext';
import { Controls }         from './components/shared/Controls';

export default function App() {
  useLenis();

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Fixed controls: theme toggle + language toggle */}
        <Controls />
        <Home />
      </LanguageProvider>
    </ThemeProvider>
  );
}
