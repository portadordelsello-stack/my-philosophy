// Product.tsx — bilingual version
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

const LINE_DELAYS = [0.6, 1.2, 1.8];

export function Product() {
  const { lang } = useLang();
  const t        = translations.product;
  const lines    = t.lines[lang] as readonly string[];

  return (
    <SectionWrapper id="product">
      <motion.div className="center-col" style={{ gap: '3rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}
        >
          <motion.div
            animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0.0)', '0 0 40px 12px rgba(255,255,255,0.07)', '0 0 0 0 rgba(255,255,255,0.0)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(255,255,255,0.5)' }}
          />
          <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 300, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.9)', lineHeight: 1 }}>
            {t.label[lang]}
          </h2>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 300, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.3)' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2.5rem', maxWidth: '400px', width: '100%' }}>
          {lines.map((line, i) => (
            <motion.p key={`${lang}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ duration: 1, delay: LINE_DELAYS[i], ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: 'rgba(255,255,255,0.55)', letterSpacing: '-0.01em', textAlign: 'center' }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
