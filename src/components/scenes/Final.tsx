// Final.tsx — bilingual version
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';

export function Final() {
  const { lang } = useLang();
  const t        = translations.final;
  const closing  = t.closing[lang] as readonly { text: string; size: string; color: string; delay: number }[];
  const chain    = t.chain[lang] as readonly string[];

  return (
    <section
      id="final"
      style={{
        minHeight: '200dvh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        paddingTop: '20dvh', background: 'var(--bg)', overflow: 'hidden',
      }}
      aria-label="Closing narrative"
    >
      {/* Closing words */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem', textAlign: 'center', padding: '0 2rem', maxWidth: '700px', marginBottom: '8rem' }}>
        {closing.map((line) => (
          <motion.p
            key={`${lang}-${line.text}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ duration: 1.4, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-sans)', fontWeight: 300,
              fontSize: line.size === 'large' ? 'clamp(1.8rem, 5vw, 3.5rem)' : 'clamp(0.9rem, 1.8vw, 1.1rem)',
              letterSpacing: line.size === 'large' ? '-0.03em' : '-0.01em',
              color: line.color, lineHeight: 1.15,
            }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      {/* Eternal chain */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 1.5, delay: 6 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}
      >
        {chain.map((label, i) => (
          <motion.div key={`${lang}-${label}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 6.2 + i * 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <motion.div
              animate={{ background: ['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.55)', 'rgba(255,255,255,0.2)'] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 5, height: 5, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' }}
            />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0.4rem 0', fontFamily: 'var(--font-sans)' }}>
              {label}
            </span>
            <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.04))' }} />
          </motion.div>
        ))}

        {/* Line into darkness */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: '40dvh', opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 7.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 1, background: 'linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0))' }}
        />
      </motion.div>
    </section>
  );
}
