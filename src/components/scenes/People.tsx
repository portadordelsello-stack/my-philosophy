// People.tsx — bilingual version
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

const ANGLES  = [-60, 20, 100, 190];
const RADII   = [160, 170, 160, 155];

function polarToCart(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * r, y: Math.sin(rad) * r };
}

export function People() {
  const { lang } = useLang();
  const t        = translations.people;
  const roles    = t.roles[lang] as readonly string[];

  return (
    <SectionWrapper id="people">
      <motion.div className="center-col" style={{ position: 'relative', height: '100dvh', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', top: '12%', textAlign: 'center', zIndex: 2 }}
        >
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.8)' }}>
            {t.heading[lang]}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.2rem)', fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 60, height: 60 }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ position: 'absolute', width: 60, height: 60, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)' }}
          />
          <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(255,255,255,0.8)' }} />

          {roles.map((role, i) => {
            const pos = polarToCart(ANGLES[i], RADII[i]);
            return (
              <motion.div key={`${lang}-${role}`}
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x: pos.x, y: pos.y }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 1.4, delay: 0.2 + i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}
              >
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.2)' }} />
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap', fontFamily: 'var(--font-sans)' }}>
                  {role}
                </span>
              </motion.div>
            );
          })}

          <svg style={{ position: 'absolute', overflow: 'visible', pointerEvents: 'none' }} width="1" height="1" aria-hidden="true">
            {roles.map((role, i) => {
              const pos = polarToCart(ANGLES[i], RADII[i]);
              return (
                <motion.line key={`${lang}-line-${role}`}
                  x1={0} y1={0} x2={pos.x} y2={pos.y}
                  stroke="rgba(255,255,255,0.08)" strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.18 }}
                />
              );
            })}
          </svg>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
