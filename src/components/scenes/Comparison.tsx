// Comparison.tsx
// Comparison scene — processes comparison overlay. The visual pipelines,
// wrong (red collapsing) and right (white expanding), are drawn by the background canvas.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Comparison() {
  const { lang }  = useLang();
  const c         = useThemeColors();
  const t         = translations.comparison;

  return (
    <SectionWrapper id="comparison">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0 2rem', gap: '3rem', width: '100%', boxSizing: 'border-box' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', color: c.textMid }}>
            {t.heading[lang]}
          </p>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 300, color: c.textGhost, marginTop: '0.5rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        {/* Aligned column headers corresponding to the canvas split coordinates */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', width: '100%', maxWidth: '860px', pointerEvents: 'none' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.wrongText, fontWeight: 500 }}>
              {t.wrong[lang]}
            </span>
          </div>

          <div style={{ width: '1px' }} />

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.textSecondary, fontWeight: 500 }}>
              {t.right[lang]}
            </span>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
