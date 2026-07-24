// FlowAlive.tsx — theme-aware
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function FlowAlive() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.flowAlive;
  const roles    = t.roles[lang] as readonly string[];

  return (
    <SectionWrapper id="flow-alive">
      <motion.div className="center-col" style={{ gap: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)', fontWeight: 300, letterSpacing: '-0.02em', color: c.textStrong }}>{t.heading[lang]}</p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: c.textFaint, marginTop: '0.5rem' }}>{t.sub[lang]}</p>
        </motion.div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
          {roles.map((role, i) => (
            <motion.div key={`${lang}-${role}-${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-10%' }} transition={{ delay: i * 0.12, duration: 0.8 }} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
                <motion.div
                  animate={{ background: c.nodePulse, boxShadow: c.dotGlowPulse }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
                  style={{ width: 10, height: 10, borderRadius: '50%', border: `1px solid ${c.nodeStrokeMid}` }}
                />
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.textDim, whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>{role}</span>
              </div>
              {i < roles.length - 1 && (
                <div style={{ position: 'relative', width: 60, height: 1 }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: c.lineWeak }} />
                  <motion.div animate={{ x: [-4, 64, -4] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }} style={{ position: 'absolute', top: -3, left: 0, width: 4, height: 4, borderRadius: '50%', background: c.dot }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 1.2, delay: 0.8 }} style={{ fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)', fontWeight: 300, color: c.textGhost, textAlign: 'center', maxWidth: '480px' }}>
          {t.caption[lang]}
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
