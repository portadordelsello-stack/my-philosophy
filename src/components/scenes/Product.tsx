// Product.tsx
// Product scene — minimal narrative statements. The central glowing node
// is rendered in the background GlobalCanvas.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

const LINE_DELAYS = [0.2, 0.8, 1.4];

export function Product() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.product;
  const lines    = t.lines[lang] as readonly string[];

  return (
    <SectionWrapper id="product">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', padding: '0 2rem', gap: '2rem', pointerEvents: 'none' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.03em', color: c.textPrimary, lineHeight: 1 }}>
            {t.label[lang]}
          </h2>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 300, letterSpacing: '-0.01em', color: c.textFaint, marginTop: '0.4rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem', borderTop: `1px solid ${c.border}`, paddingTop: '2rem', maxWidth: '360px', width: '100%' }}>
          {lines.map((line, i) => (
            <motion.p
              key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 1, delay: LINE_DELAYS[i], ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)', fontWeight: 300, color: c.textMuted, letterSpacing: '-0.01em', textAlign: 'center' }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
