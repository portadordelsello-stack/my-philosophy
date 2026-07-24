// Listening.tsx
// Listening scene — chaotic thoughts drift in, then pull towards order as you scroll.
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const CHAOS_WORDS = {
  es: ['Necesito una app', 'Tengo muchas ideas', 'Debe ser simple', 'Quiero pagos', 'Usuarios', 'Reportes', 'Dashboard', 'Fácil de usar'],
  en: ['Need an app', 'Too many ideas', 'Must be simple', 'Want payments', 'Users', 'Reports', 'Dashboard', 'Easy to use'],
};

// Preset offsets to guarantee deterministic layout (no hydration mismatch)
const POSITION_PRESETS = [
  { x: -160, y: -120 },
  { x: 180, y: -100 },
  { x: -140, y: 80 },
  { x: 160, y: 100 },
  { x: -80, y: -150 },
  { x: 100, y: 140 },
  { x: -180, y: 20 },
  { x: 120, y: -40 },
];

export function Listening() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const sectionRef = useRef<HTMLElement>(null);
  const progress   = useScrollProgress(sectionRef as React.RefObject<Element>);

  const words = CHAOS_WORDS[lang];

  return (
    <SectionWrapper id="listening">
      <div style={{ position: 'relative', width: '100%', height: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Floating chaotic words that pull to the center on scroll */}
        {words.map((word, i) => {
          const preset = POSITION_PRESETS[i % POSITION_PRESETS.length];
          // As progress goes from 0 to 0.8, pull coordinates to 0,0
          const px = preset.x * (1 - Math.min(1, progress * 1.3));
          const py = preset.y * (1 - Math.min(1, progress * 1.3));
          const op = 1 - Math.max(0, (progress - 0.6) * 2.5); // fade out at the end

          return (
            <div
              key={word}
              style={{
                position: 'absolute',
                transform: `translate(${px}px, ${py}px)`,
                opacity: op,
                color: c.textSecondary,
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.8rem, 2vw, 1.1rem)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                transition: 'transform 0.1s ease-out, opacity 0.2s ease-out',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {word}
            </div>
          );
        })}

        {/* Narrative transition text */}
        <motion.div
          initial={{ opacity: 0 }}
          style={{
            opacity: progress > 0.6 ? (progress - 0.6) * 2.5 : 0,
            textAlign: 'center',
            position: 'absolute',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 300, color: c.textPrimary, letterSpacing: '-0.02em', maxWidth: '420px', lineHeight: 1.4 }}>
            {lang === 'es' ? 'Escuchando el caos del mundo real...' : 'Listening to the chaos of the real world...'}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
