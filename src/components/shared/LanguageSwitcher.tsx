// LanguageSwitcher.tsx
// A minimal, fixed language toggle that stays visually invisible
// unless hovered — preserving the cinematic atmosphere.
// Placed in the top-right corner.
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LanguageContext';

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4, duration: 1.5 }}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0',
        userSelect: 'none',
      }}
      aria-label="Language selector"
    >
      {(['es', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          style={{
            background: 'none',
            border: 'none',
            cursor: lang === l ? 'default' : 'pointer',
            padding: '0.3rem 0.5rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: lang === l
              ? 'rgba(255,255,255,0.7)'
              : 'rgba(255,255,255,0.2)',
            transition: 'color 0.4s ease',
            lineHeight: 1,
          }}
          onMouseEnter={e => {
            if (lang !== l) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
          }}
          onMouseLeave={e => {
            if (lang !== l) (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.2)';
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}

      {/* Thin separator between options */}
      <span style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '1px',
        height: '0.65rem',
        background: 'rgba(255,255,255,0.1)',
        pointerEvents: 'none',
      }} />
    </motion.div>
  );
}
