// Code.tsx — bilingual version
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

export function Code() {
  const { lang }  = useLang();
  const t         = translations.code;
  const functions = t.functions[lang] as readonly { name: string; comment: string }[];

  return (
    <SectionWrapper id="code">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '680px', padding: '0 2rem', gap: '0' }}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1 }}
          style={{ fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '3rem' }}
        >
          {t.caption[lang]}
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0' }}>
          {functions.map((fn, i) => (
            <motion.div key={`${lang}-${fn.name}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 0.9, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'rgba(255,255,255,0.12)', minWidth: '1.5rem', textAlign: 'right', userSelect: 'none' }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <motion.span
                whileInView={{ textShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 16px rgba(255,255,255,0.15)', '0 0 0 rgba(255,255,255,0)'] }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.14 + 0.4 }}
                style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', fontWeight: 400, color: 'rgba(255,255,255,0.82)', letterSpacing: '-0.01em', flex: 1 }}
              >
                {fn.name}
              </motion.span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                {fn.comment}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
