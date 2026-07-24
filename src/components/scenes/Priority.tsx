// Priority.tsx — theme-aware
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

const BASE_DELAYS = [0.2, 0.9, 1.6, 2.3, 3.2];

export function Priority() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.priority;
  const words    = t.words[lang] as readonly string[];

  return (
    <SectionWrapper id="priority">
      <motion.div className="center-col" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 0.5 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {words.map((word, i) => {
          const isLast = i === words.length - 1;
          return (
            <motion.div key={`${lang}-${word}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10%' }} transition={{ duration: 1.2, delay: BASE_DELAYS[i], ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: isLast ? 'clamp(2rem, 5vw, 3.6rem)' : 'clamp(1.6rem, 4vw, 2.8rem)', letterSpacing: '-0.03em', color: isLast ? c.textPrimary : c.textDim, lineHeight: 1.15 }}>
                {word}
              </p>
              {!isLast && (
                <motion.span initial={{ opacity: 0, scaleY: 0 }} whileInView={{ opacity: 1, scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: BASE_DELAYS[i] + 0.5 }} style={{ display: 'block', color: c.textHint, fontSize: '1rem', padding: '0.3rem 0' }}>
                  ↓
                </motion.span>
              )}
            </motion.div>
          );
        })}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 4.2 }} style={{ marginTop: '2rem', fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', letterSpacing: '0.2em', textTransform: 'uppercase', color: c.textLabel }}>
          {t.caption[lang]}
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
