// Philosophy.tsx — theme-aware
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Philosophy() {
  const { lang }  = useLang();
  const c         = useThemeColors();
  const sentences = translations.philosophy.sentences[lang] as readonly { a: string; b: string | null }[];
  const [index, setIndex]   = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setIndex(0); }, [lang]);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % sentences.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [visible, sentences.length]);

  const current = sentences[Math.min(index, sentences.length - 1)];

  return (
    <SectionWrapper id="philosophy" threshold={0.3}>
      <motion.div style={{ position: 'absolute', inset: 0 }} onViewportEnter={() => setVisible(true)} onViewportLeave={() => setVisible(false)} viewport={{ margin: '-20%' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '0 2rem', maxWidth: '800px', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div key={`${lang}-${index}`} initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(2rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', color: c.textBright, lineHeight: 1.1 }}>
              {current.a}
            </p>
            {current.b && (
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 'clamp(2rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', color: c.textMuted, lineHeight: 1.1 }}>
                {current.b}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ position: 'absolute', bottom: '-3rem', display: 'flex', gap: '0.4rem' }}>
          {sentences.map((_, i) => (
            <motion.div key={i} animate={{ background: i === index ? c.textSecondary : c.textHint, width: i === index ? 20 : 4 }} transition={{ duration: 0.4 }} style={{ height: 2, width: 4, borderRadius: 2 }} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
