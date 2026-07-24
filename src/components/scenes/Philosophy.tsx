// Philosophy.tsx
// Philosophy scene — slow, silent, and massive breathing room. Displays the core
// manifesto message with a slow blur reveal.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';

const MANIFESTO = {
  es: {
    first: 'El software no nace del código.',
    second: 'Nace de comprender.',
  },
  en: {
    first: 'Software is not born from code.',
    second: 'It is born from understanding.',
  },
};

export function Philosophy() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const msg      = MANIFESTO[lang];

  return (
    <SectionWrapper id="philosophy">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0 2rem', boxSizing: 'border-box', textAlign: 'center', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}
        >
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '-0.03em', color: c.textBright, lineHeight: 1.15 }}>
            {msg.first}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '-0.03em', color: c.textMuted, lineHeight: 1.15 }}>
            {msg.second}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
