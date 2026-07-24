// Controls.tsx
// Fixed top-right panel combining language (ES/EN) and theme (☀/◐) toggles.
// Appears subtly after the hero sequence, doesn't interrupt the story.
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColors } from '../../hooks/useThemeColors';

// Minimal sun icon for light mode
function SunIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
      {[0,45,90,135,180,225,270,315].map(angle => {
        const r = 4.5;
        const rad = (angle * Math.PI) / 180;
        return <line key={angle} x1={6 + Math.cos(rad)*3.2} y1={6 + Math.sin(rad)*3.2} x2={6 + Math.cos(rad)*r} y2={6 + Math.sin(rad)*r} stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

// Minimal half-moon icon for dark mode
function MoonIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M9 6.5A3.5 3.5 0 1 1 5.5 3a2.5 2.5 0 0 0 3.5 3.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    </svg>
  );
}

export function Controls() {
  const { lang, setLang } = useLang();
  const { theme, setTheme } = useTheme();
  const c = useThemeColors();

  const btnStyle = (active: boolean): React.CSSProperties => ({
    background: 'none',
    border: 'none',
    cursor: active ? 'default' : 'pointer',
    padding: '0.3rem 0.45rem',
    fontFamily: 'var(--font-sans)',
    fontSize: '0.58rem',
    fontWeight: 500,
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    color: active ? c.textSecondary : c.textTrace,
    transition: 'color 0.4s ease',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const sepStyle: React.CSSProperties = {
    width: '1px',
    height: '0.6rem',
    background: c.border,
    flexShrink: 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4.5, duration: 1.5 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        userSelect: 'none',
        border: `1px solid ${c.border}`,
        borderRadius: '6px',
        padding: '0.1rem',
        backdropFilter: 'blur(8px)',
        background: theme === 'light' ? 'rgba(245,245,243,0.7)' : 'rgba(5,5,5,0.6)',
        transition: 'background 0.5s ease, border-color 0.5s ease',
      }}
      aria-label="Site controls"
    >
      {/* Theme toggle */}
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        style={btnStyle(false)}
        aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
      </button>

      <div style={sepStyle} />

      {/* Language toggle */}
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={btnStyle(lang === l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </motion.div>
  );
}
