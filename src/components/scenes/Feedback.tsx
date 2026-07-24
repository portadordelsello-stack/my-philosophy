// Feedback.tsx — theme-aware
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Feedback() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.feedback;
  const v1Nodes  = t.nodes.v1[lang] as readonly string[];
  const v2Nodes  = t.nodes.v2[lang] as readonly string[];

  return (
    <SectionWrapper id="feedback">
      <motion.div className="center-col" style={{ gap: '4rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: c.textStrong }}>{t.heading[lang]}</p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: c.textFaint, marginTop: '0.5rem' }}>{t.sub[lang]}</p>
        </motion.div>

        <div style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
          {/* V1 */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: c.textTrace, marginBottom: '1rem' }}>{t.v1[lang]}</span>
            {v1Nodes.map((label, i) => (
              <div key={`${lang}-v1-${label}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: c.dotDim, border: `1px solid ${c.nodeStrokeIdle}` }} />
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: c.textGhost, margin: '0.3rem 0', whiteSpace: 'nowrap' }}>{label}</span>
                {i < v1Nodes.length - 1 && <div style={{ width: 1, height: 14, background: c.lineWeak }} />}
              </div>
            ))}
          </motion.div>

          {/* Arrow */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '2rem', gap: '0.5rem' }}>
            <motion.div animate={{ x: [-6, 6, -6] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ color: c.textLabel, fontSize: '1.2rem' }}>→</motion.div>
            <span style={{ fontSize: '0.5rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: c.textHint, whiteSpace: 'nowrap' }}>{t.learning[lang]}</span>
          </motion.div>

          {/* V2 */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: c.textDim, marginBottom: '1rem' }}>{t.v2[lang]}</span>
            {v2Nodes.map((label, i) => (
              <div key={`${lang}-v2-${label}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div animate={{ background: c.ringPulse, boxShadow: c.v2GlowPulse }} transition={{ duration: 2, delay: i * 0.12, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 6, height: 6, borderRadius: '50%', border: `1px solid ${c.nodeStrokeMid}` }} />
                <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: c.textMuted, margin: '0.3rem 0', whiteSpace: 'nowrap' }}>{label}</span>
                {i < v2Nodes.length - 1 && <div style={{ width: 1, height: 14, background: c.lineMid }} />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feedback loop line */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.div animate={{ x: [80, -80, 80] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${c.dot}, transparent)` }} />
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: c.textLabel }}>{t.feedbackLoop[lang]}</span>
          <motion.div animate={{ x: [-80, 80, -80] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 40, height: 1, background: `linear-gradient(to left, transparent, ${c.dot}, transparent)` }} />
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
