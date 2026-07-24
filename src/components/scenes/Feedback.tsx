// Feedback.tsx — bilingual version
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

export function Feedback() {
  const { lang } = useLang();
  const t        = translations.feedback;
  const v1Nodes  = t.nodes.v1[lang] as readonly string[];
  const v2Nodes  = t.nodes.v2[lang] as readonly string[];

  return (
    <SectionWrapper id="feedback">
      <motion.div className="center-col" style={{ gap: '4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.82)' }}>
            {t.heading[lang]}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          {/* V1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
          >
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', marginBottom: '1rem' }}>{t.v1[lang]}</span>
            {v1Nodes.map((label, i) => (
              <div key={`${lang}-v1-${label}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.15)' }}
                />
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', margin: '0.3rem 0', whiteSpace: 'nowrap' }}>{label}</span>
                {i < v1Nodes.length - 1 && <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.08)' }} />}
              </div>
            ))}
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', gap: '0.5rem' }}
          >
            <motion.div animate={{ x: [-6, 6, -6] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ color: 'rgba(255,255,255,0.2)', fontSize: '1.2rem' }}>→</motion.div>
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', whiteSpace: 'nowrap' }}>{t.learning[lang]}</span>
          </motion.div>

          {/* V2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
          >
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '1rem' }}>{t.v2[lang]}</span>
            {v2Nodes.map((label, i) => (
              <div key={`${lang}-v2-${label}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div
                  animate={{ background: ['rgba(255,255,255,0.35)', 'rgba(255,255,255,0.75)', 'rgba(255,255,255,0.35)'], boxShadow: ['0 0 0 0 rgba(255,255,255,0)', '0 0 12px 3px rgba(255,255,255,0.1)', '0 0 0 0 rgba(255,255,255,0)'] }}
                  transition={{ duration: 2, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: 6, height: 6, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.3)' }}
                />
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.55)', margin: '0.3rem 0', whiteSpace: 'nowrap' }}>{label}</span>
                {i < v2Nodes.length - 1 && <div style={{ width: 1, height: 14, background: 'rgba(255,255,255,0.15)' }} />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feedback loop line */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.div animate={{ x: [80, -80, 80] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 40, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent)' }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>{t.feedbackLoop[lang]}</span>
          <motion.div animate={{ x: [-80, 80, -80] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 40, height: 1, background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.6), transparent)' }} />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
