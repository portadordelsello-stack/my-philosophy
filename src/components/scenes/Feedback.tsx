// Feedback.tsx
// Feedback scene — minimal text headers. Evolving pipeline stages (v1 -> v2)
// and feedback loops are drawn dynamically by the background GlobalCanvas.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Feedback() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.feedback;

  return (
    <SectionWrapper id="feedback">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0 2rem', textAlign: 'center', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: c.textStrong }}>
            {t.heading[lang]}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: c.textFaint, marginTop: '0.5rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
