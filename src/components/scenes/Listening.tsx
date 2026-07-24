// Listening.tsx — bilingual version
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

function HumanIcon({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 64 96" fill="none" aria-hidden="true">
      <circle cx="32" cy="16" r="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
      <line x1="32" y1="28" x2="32" y2="60" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="38" x2="14" y2="52" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="38" x2="50" y2="52" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="60" x2="20" y2="84" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
      <line x1="32" y1="60" x2="44" y2="84" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function Listening() {
  const { lang } = useLang();
  const t        = translations.listening;
  const sectionRef = useRef<HTMLElement>(null);
  const progress   = useScrollProgress(sectionRef as React.RefObject<Element>);
  const lineHeight = Math.min(300, progress * 500);

  return (
    <SectionWrapper id="listening">
      <motion.div
        className="center-col"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}
      >
        <HumanIcon size={52} />
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: 'clamp(0.6rem, 1vw, 0.75rem)',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.35)', marginBottom: '1rem',
          }}>
            {t.label[lang]}
          </p>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)', fontWeight: 300,
            color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', maxWidth: '340px',
          }}>
            {t.subtitle[lang]}
          </p>
        </div>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: lineHeight, opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '1px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0))', minHeight: 0 }}
        />
      </motion.div>
    </SectionWrapper>
  );
}
