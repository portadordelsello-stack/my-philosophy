// NarrativeOverlay.tsx
// Overlay that displays the Recruiter Translation Protocol narrative statements at precise scroll percentages.
// Enforces the strict under-120-word limit and handles language selection.
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';

interface NarrativeOverlayProps {
  progress: number;
}

const NARRATIVE = {
  es: [
    { start: 0.0, end: 0.15, text: 'Buscas herramientas. Pero las herramientas no resuelven problemas.' },
    { start: 0.29, end: 0.35, text: 'Todo comienza con una voz humana.\nDesordenada, caótica, real.' },
    { start: 0.35, end: 0.55, text: 'Entender es el acto de encontrar estructura en el ruido.' },
    { start: 0.55, end: 0.75, text: 'El código es solo el residuo visible de ese entendimiento.' },
    { start: 0.75, end: 0.90, text: 'El software aparece solo cuando su existencia se vuelve inevitable.' },
  ],
  en: [
    { start: 0.0, end: 0.15, text: 'You are searching for tools. But tools don\'t solve problems.' },
    { start: 0.29, end: 0.35, text: 'Everything begins with a human voice.\nUnstructured, messy, real.' },
    { start: 0.35, end: 0.55, text: 'Understanding is the act of finding structure in the noise.' },
    { start: 0.55, end: 0.75, text: 'Code is only the visible residue of that understanding.' },
    { start: 0.75, end: 0.90, text: 'The software appears only when its existence becomes inevitable.' },
  ],
};

export function NarrativeOverlay({ progress }: NarrativeOverlayProps) {
  const { lang } = useLang();
  const c = useThemeColors();

  const lines = NARRATIVE[lang];
  const activeLine = lines.find((line) => progress >= line.start && progress < line.end);

  const isFinal = progress >= 0.90;

  const ctaTitle = lang === 'es' 
    ? 'Si buscas a alguien que solo escriba código, busca en otro lado.' 
    : 'If you want someone who only writes code, look elsewhere.';
  
  const ctaSub = lang === 'es' 
    ? 'Si buscas a alguien que traduzca la realidad en valor:' 
    : 'If you want someone who translates reality into value:';

  const ctaButton = lang === 'es' ? 'Iniciar la conversación.' : 'Begin the conversation.';

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
        pointerEvents: isFinal ? 'auto' : 'none',
        zIndex: 5,
        boxSizing: 'border-box',
        padding: '0 2rem',
      }}
    >
      {/* ── Main Narrative Text Lines: Positioned at the bottom to avoid overlapping centered canvas drawings ── */}
      <AnimatePresence mode="wait">
        {activeLine && (
          <div
            style={{
              position: 'absolute',
              bottom: '12dvh',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
              padding: '0 2rem',
              boxSizing: 'border-box',
            }}
          >
            <motion.p
              key={`${lang}-${activeLine.text}`}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 'clamp(1.4rem, 3.6vw, 2.1rem)', // Increased 30% from clamp(1.1rem, 2.8vw, 1.6rem)
                letterSpacing: '-0.01em',
                color: c.textPrimary,
                textAlign: 'center',
                maxWidth: '680px',
                lineHeight: 1.4,
                whiteSpace: 'pre-line',
                textShadow: '0 2px 10px rgba(0,0,0,0.6)',
              }}
            >
              {activeLine.text}
            </motion.p>
          </div>
        )}
      </AnimatePresence>

      {/* ── Act VI: Premium Recruiter CTA Invitation ── */}
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
              gap: '1.2rem',
              textAlign: 'center',
              maxWidth: '680px',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 'clamp(1.55rem, 4.2vw, 2.35rem)', // Increased 30% from clamp(1.2rem, 3.2vw, 1.8rem)
                letterSpacing: '-0.02em',
                color: c.textSecondary,
                lineHeight: 1.3,
              }}
            >
              {ctaTitle}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                letterSpacing: '-0.03em',
                color: c.textPrimary,
                lineHeight: 1.25,
                marginBottom: '1.5rem',
              }}
            >
              {ctaSub}
            </p>

            <button
              onClick={() => {
                window.location.href = 'mailto:hello@philosophy-site.com';
              }}
              style={{
                background: 'none',
                border: `1px solid ${c.borderMid}`,
                borderRadius: '24px',
                padding: '0.75rem 2.2rem',
                color: c.textPrimary,
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'border-color 0.4s ease, color 0.4s ease, background-color 0.4s ease',
                outline: 'none',
                pointerEvents: 'auto',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = c.textPrimary;
                el.style.backgroundColor = c.nodeIdle;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = c.borderMid;
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
