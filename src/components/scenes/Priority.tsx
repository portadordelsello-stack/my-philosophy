// Priority.tsx
// Priority scene — minimal text overlay. The heavy listing of node collapsing,
// scaling, and orbiting is executed by the background canvas.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Priority() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.priority;

  return (
    <SectionWrapper id="priority">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0 2rem', pointerEvents: 'none' }}>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
            fontWeight: 300,
            color: c.textSecondary,
            letterSpacing: '-0.01em',
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
