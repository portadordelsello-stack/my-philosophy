// FlowAlive.tsx — bilingual version
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

export function FlowAlive() {
  const { lang } = useLang();
  const t        = translations.flowAlive;
  const roles    = t.roles[lang] as readonly string[];

  return (
    <SectionWrapper id="flow-alive">
      <motion.div className="center-col" style={{ gap: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.82)' }}>
            {t.heading[lang]}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {roles.map((role, i) => (
            <motion.div key={`${lang}-${role}-${i}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: i * 0.12, duration: 0.8 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                <motion.div
                  animate={{
                    background: ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.12)'],
                    boxShadow:  ['0 0 0 0 rgba(255,255,255,0)', '0 0 16px 4px rgba(255,255,255,0.12)', '0 0 0 0 rgba(255,255,255,0)'],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                  style={{ width: 10, height: 10, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}
                />
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>
                  {role}
                </span>
              </div>

              {i < roles.length - 1 && (
                <div style={{ position: 'relative', width: 60, height: 1 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.08)' }} />
                  <motion.div
                    animate={{ x: [-4, 64, -4] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                    style={{ position: 'absolute', top: -3, left: 0, width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.7)' }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.2, delay: 0.8 }}
          style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', fontWeight: 300, color: 'rgba(255,255,255,0.25)', textAlign: 'center', maxWidth: '480px' }}
        >
          {t.caption[lang]}
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
