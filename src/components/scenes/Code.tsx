// Code.tsx
// Code scene — monospace functions cascade emerging. Accommodates the central
// product node which slides to the left/top in the background GlobalCanvas.
import { motion } from 'framer-motion';
import { SectionWrapper } from '../shared/SectionWrapper';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Code() {
  const { lang }  = useLang();
  const c         = useThemeColors();
  const t         = translations.code;
  const functions = t.functions[lang] as readonly { name: string; comment: string }[];

  return (
    <SectionWrapper id="code">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        padding: '0 2rem',
        boxSizing: 'border-box',
      }}>
        {/* On desktop, push the content to the right side (flex-end) to balance with canvas */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'stretch',
          alignItems: 'flex-start',
          maxWidth: '520px',
          marginLeft: 'auto', // pushes to right
          width: '100%',
        }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1 }}
            style={{
              fontSize: 'clamp(0.6rem, 1vw, 0.7rem)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: c.textTrace,
              marginBottom: '2.5rem',
            }}
          >
            {t.caption[lang]}
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0' }}>
            {functions.map((fn, i) => (
              <motion.div
                key={`${lang}-${fn.name}`}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1.2rem',
                  padding: '0.6rem 0',
                  borderBottom: `1px solid ${c.border}`,
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: c.monoLineNum, minWidth: '1.5rem', textAlign: 'right', userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)', fontWeight: 400, color: c.monoCode, letterSpacing: '-0.01em', flex: 1 }}>
                  {fn.name}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.58rem, 1.1vw, 0.72rem)', color: c.monoComment, letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                  {fn.comment}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
