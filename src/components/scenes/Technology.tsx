// Technology.tsx
// Technology scene — minimal caption overlay. Orbiting technology nodes
// and circles are rendered dynamically by the background GlobalCanvas.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Technology() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.technology;

  return (
    <SectionWrapper id="technology">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0 2rem', pointerEvents: 'none' }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(0.85rem, 1.8vw, 1.15rem)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: c.textSecondary,
            textAlign: 'center',
            maxWidth: '460px',
            lineHeight: 1.5,
          }}
        >
          {t.caption[lang]}
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
