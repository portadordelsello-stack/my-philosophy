// Thoughts.tsx — bilingual version
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingText } from '../shared/FloatingText';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

export function Thoughts() {
  const { lang } = useLang();
  const t        = translations.thoughts;
  const [active, setActive] = useState(false);

  return (
    <SectionWrapper id="thoughts" threshold={0.3}>
      <motion.div
        style={{ position: 'absolute', inset: 0 }}
        onViewportEnter={() => setActive(true)}
        onViewportLeave={() => setActive(false)}
        viewport={{ margin: '-20%' }}
      />

      <FloatingText phrases={t.phrases[lang] as unknown as string[]} visible={active} />

      <motion.div
        className="center-col"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-25%' }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <p style={{
          fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '1.5rem',
        }}>
          {t.label[lang]}
        </p>
        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300,
          letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.55)',
          maxWidth: '480px', lineHeight: 1.5, textAlign: 'center',
        }}>
          {t.heading[lang]}<br />
          <span style={{ color: 'rgba(255,255,255,0.85)' }}>{t.sub[lang]}</span>
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
