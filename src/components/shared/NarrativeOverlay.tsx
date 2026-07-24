// NarrativeOverlay.tsx
// Overlay that displays minimal, high-end narrative statements at exact scroll percentages.
// Enforces the strict under-120-word limit and handles language selection.
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';

interface NarrativeOverlayProps {
  progress: number;
}

const NARRATIVE = {
  es: [
    { start: 0.06, end: 0.14, text: 'Todo comienza sin forma.' },
    { start: 0.14, end: 0.26, text: 'Toda idea llega como ruido.' },
    { start: 0.26, end: 0.38, text: 'El entendimiento comienza con las relaciones.' },
    { start: 0.38, end: 0.50, text: 'La claridad crea gravedad.' },
    { start: 0.50, end: 0.64, text: 'La arquitectura es entendimiento congelado.' },
    { start: 0.64, end: 0.78, text: 'El código es solo el residuo visible del entendimiento.' },
    { start: 0.78, end: 0.90, text: 'Un producto es una estructura que aprendió a servir.' },
    { start: 0.90, end: 0.96, text: 'El software nunca fue el principio.\nFue la consecuencia.' },
  ],
  en: [
    { start: 0.06, end: 0.14, text: 'Everything begins without form.' },
    { start: 0.14, end: 0.26, text: 'Every idea arrives as noise.' },
    { start: 0.26, end: 0.38, text: 'Understanding begins with relationships.' },
    { start: 0.38, end: 0.50, text: 'Clarity creates gravity.' },
    { start: 0.50, end: 0.64, text: 'Architecture is frozen understanding.' },
    { start: 0.64, end: 0.78, text: 'Code is only the visible residue of understanding.' },
    { start: 0.78, end: 0.90, text: 'A product is a structure that learned how to serve.' },
    { start: 0.90, end: 0.96, text: 'The software was never the beginning.\nIt was the consequence.' },
  ],
};

const CHAOS_WORDS = [
  { text: 'payments', x: '18%', y: '25%', delay: 0.1 },
  { text: 'users', x: '78%', y: '30%', delay: 0.3 },
  { text: 'dashboard', x: '15%', y: '70%', delay: 0.2 },
  { text: 'reports', x: '82%', y: '68%', delay: 0.5 },
  { text: 'mobile', x: '48%', y: '18%', delay: 0.4 },
  { text: 'automation', x: '25%', y: '50%', delay: 0.6 },
  { text: 'integrations', x: '70%', y: '50%', delay: 0.7 },
];

export function NarrativeOverlay({ progress }: NarrativeOverlayProps) {
  const { lang } = useLang();
  const c = useThemeColors();

  const lines = NARRATIVE[lang];
  const activeLine = lines.find((line) => progress >= line.start && progress < line.end);

  const isChaos = progress >= 0.14 && progress < 0.26;
  const isFinal = progress >= 0.96;

  const ctaTitle = lang === 'es' ? '¿En qué podría convertirse tu idea?' : 'What could your idea become?';
  const ctaButton = lang === 'es' ? 'Comienza la siguiente transformación.' : 'Begin the next transformation.';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isFinal ? 'auto' : 'none', // click passes through unless CTA
        zIndex: 5,
        boxSizing: 'border-box',
        padding: '0 2rem',
      }}
    >
      {/* ── Main Narrative Text Lines ── */}
      <AnimatePresence mode="wait">
        {activeLine && (
          <motion.p
            key={`${lang}-${activeLine.text}`}
            initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: 'clamp(1.4rem, 4.5vw, 2.2rem)',
              letterSpacing: '-0.02em',
              color: c.textPrimary,
              textAlign: 'center',
              maxWidth: '680px',
              lineHeight: 1.35,
              whiteSpace: 'pre-line',
            }}
          >
            {activeLine.text}
          </motion.p>
        )}
      </AnimatePresence>

      {/* ── Act III: Floating dissolving words ── */}
      <AnimatePresence>
        {isChaos && (
          <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
            {CHAOS_WORDS.map((w) => (
              <motion.span
                key={w.text}
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
                animate={{ opacity: [0, 0.35, 0], scale: [0.9, 1.05, 1], filter: ['blur(4px)', 'blur(0px)', 'blur(6px)'] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: w.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  left: w.x,
                  top: w.y,
                  transform: 'translate(-50%, -50%)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.95rem)',
                  color: c.textMuted,
                  letterSpacing: '0.04em',
                }}
              >
                {w.text}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* ── Act X: Premium CTA Invitation ── */}
      <AnimatePresence>
        {isFinal && (
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2.5rem',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
                letterSpacing: '-0.03em',
                color: c.textPrimary,
                lineHeight: 1.25,
              }}
            >
              {ctaTitle}
            </p>

            <button
              onClick={() => {
                window.location.href = 'mailto:hello@philosophy-site.com';
              }}
              style={{
                background: 'none',
                border: `1px solid ${c.borderMid}`,
                borderRadius: '24px',
                padding: '0.75rem 2rem',
                color: c.textSecondary,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'border-color 0.4s ease, color 0.4s ease, background-color 0.4s ease',
                outline: 'none',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = c.textPrimary;
                el.style.color = c.textPrimary;
                el.style.backgroundColor = c.nodeIdle;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = c.borderMid;
                el.style.color = c.textSecondary;
                el.style.backgroundColor = 'transparent';
              }}
            >
              {ctaButton}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
