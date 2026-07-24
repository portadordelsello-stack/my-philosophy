// Comparison.tsx — theme-aware
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Comparison() {
  const { lang }  = useLang();
  const c         = useThemeColors();
  const t         = translations.comparison;
  const wrongPath = t.wrongPath[lang] as readonly string[];
  const rightPath = t.rightPath[lang] as readonly string[];

  return (
    <SectionWrapper id="comparison">
      <motion.div className="center-col" style={{ gap: '4rem', maxWidth: '860px' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', fontWeight: 300, letterSpacing: '-0.02em', color: c.textMid }}>{t.heading[lang]}</p>
          <p style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 300, color: c.textGhost, marginTop: '0.5rem' }}>{t.sub[lang]}</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', width: '100%', alignItems: 'start' }}>
          {/* Wrong path */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.textTrace, marginBottom: '1rem' }}>{t.wrong[lang]}</span>
            {wrongPath.map((label, i) => (
              <motion.div key={`${lang}-wrong-${label}`} initial={{ opacity: 1 }} whileInView={{ opacity: [1, 1, 0.15] }} viewport={{ once: true }} transition={{ duration: 2.5, delay: i * 0.3 + 0.5, ease: 'easeInOut' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div whileInView={{ scale: [1, 1, 0.3] }} viewport={{ once: true }} transition={{ duration: 2.5, delay: i * 0.3 + 0.5 }} style={{ width: 8, height: 8, borderRadius: '50%', background: c.wrongNode, border: `1px solid ${c.wrongBorder}` }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: c.wrongText, margin: '0.35rem 0', fontFamily: 'var(--font-sans)' }}>{label}</span>
                {i < wrongPath.length - 1 && <div style={{ width: 1, height: 16, background: c.wrongLine }} />}
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <div style={{ width: 1, minHeight: 200, background: c.border, alignSelf: 'stretch' }} />

          {/* Right path */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-15%' }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.textDim, marginBottom: '1rem' }}>{t.right[lang]}</span>
            {rightPath.map((label, i) => (
              <motion.div key={`${lang}-right-${label}`} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.15 + 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <motion.div animate={{ boxShadow: c.rightGlowPulse }} transition={{ duration: 2.5, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 8, height: 8, borderRadius: '50%', background: c.nodeActive, border: `1px solid ${c.nodeStrokeActive}` }} />
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.08em', color: c.textMuted, margin: '0.35rem 0', fontFamily: 'var(--font-sans)' }}>{label}</span>
                {i < rightPath.length - 1 && <div style={{ width: 1, height: 16, background: c.lineMid }} />}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
