// App.tsx — Root: Lenis + Language + Theme + Home
import { useLenis }         from './hooks/useLenis';
import { Home }             from './pages/Home';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider }    from './contexts/ThemeContext';

export default function App() {
  useLenis();

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    </ThemeProvider>
  );
}
