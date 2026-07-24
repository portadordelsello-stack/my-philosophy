// Workflow.tsx — bilingual version
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

const NODE_R  = 7;
const SPACING = 80;
const SVG_W   = 160;

export function Workflow() {
  const { lang }   = useLang();
  const t          = translations.workflow;
  const NODES      = t.nodes[lang] as readonly { label: string; sub: string }[];
  const sectionRef = useRef<HTMLElement>(null);
  const progress   = useScrollProgress(sectionRef as React.RefObject<Element>);
  const totalH     = (NODES.length - 1) * SPACING;
  const svgH       = totalH + 80;
  const cx         = SVG_W / 2;
  const activeIndex = Math.floor(progress * (NODES.length + 1)) - 1;

  return (
    <SectionWrapper id="workflow">
      <div style={{ position: 'relative', width: '100%', maxWidth: '900px', padding: '0 2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <p style={{
            fontSize: 'clamp(0.6rem, 1vw, 0.7rem)', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: '0.8rem',
          }}>
            {t.label[lang]}
          </p>
          <p style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.4rem)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.8)' }}>
            {t.heading[lang]}
          </p>
          <p style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)', fontWeight: 300, color: 'rgba(255,255,255,0.35)', marginTop: '0.5rem' }}>
            {t.sub[lang]}
          </p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <svg width={SVG_W} height={svgH} viewBox={`0 0 ${SVG_W} ${svgH}`} overflow="visible" aria-label="Workflow diagram">
            <motion.line
              x1={cx} y1={40} x2={cx} y2={40 + totalH}
              stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            />
            {NODES.map((node, i) => {
              const ny = 40 + i * SPACING;
              const isActive = i <= activeIndex;
              return (
                <motion.g key={`${lang}-${node.label}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-5%' }}
                  transition={{ delay: 0.4 + i * 0.18, duration: 0.8 }}
                >
                  {isActive && (
                    <motion.circle cx={cx} cy={ny} r={NODE_R + 8}
                      fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"
                      animate={{ r: [NODE_R + 5, NODE_R + 12, NODE_R + 5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <motion.circle cx={cx} cy={ny} r={NODE_R}
                    fill={isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.04)'}
                    stroke={isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.15)'}
                    strokeWidth="1"
                    animate={{ fill: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.04)' }}
                    transition={{ duration: 0.8 }}
                  />
                  <text x={cx + 20} y={ny + 3}
                    fill={isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.25)'}
                    fontSize="9" fontFamily="var(--font-sans)" letterSpacing="1.5"
                    style={{ textTransform: 'uppercase', transition: 'fill 0.6s ease' }}
                  >
                    {node.label}
                  </text>
                  <text x={cx + 20} y={ny + 15}
                    fill="rgba(255,255,255,0.15)" fontSize="7.5" fontFamily="var(--font-sans)" letterSpacing="0.3"
                  >
                    {node.sub}
                  </text>
                </motion.g>
              );
            })}
          </svg>
        </div>
      </div>
    </SectionWrapper>
  );
}
