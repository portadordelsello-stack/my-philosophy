// Final.tsx
// Final scene — closing narrative, delegating the final organized tree structure
// to the background GlobalCanvas, and culminating in a minimal premium CTA.
import { motion } from 'framer-motion';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

export function Final() {
  const { lang } = useLang();
  const c        = useThemeColors();
  const t        = translations.final;
  const closing  = t.closing[lang] as readonly { text: string; size: string; color: string; delay: number }[];

  const themeColor = (origColor: string): string => {
    if (origColor.includes('0.9'))  return c.textPrimary;
    if (origColor.includes('0.55')) return c.textSub;
    if (origColor.includes('0.75')) return c.textMid;
    if (origColor.includes('0.3'))  return c.textFaint;
    if (origColor.includes('0.2'))  return c.textLabel;
    return origColor;
  };

  const ctaText = lang === 'es' ? 'Construyamos la siguiente.' : "Let's build the next one.";

  return (
    <section
      id="final"
      style={{
        minHeight: '180dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '25dvh',
        background: 'transparent', // Let parent canvas handle background
        overflow: 'hidden',
        boxSizing: 'border-box',
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
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: line.size === 'large' ? 'clamp(1.8rem, 5vw, 3.5rem)' : 'clamp(0.9rem, 1.8vw, 1.1rem)',
              letterSpacing: line.size === 'large' ? '-0.03em' : '-0.01em',
              color: themeColor(line.color),
              lineHeight: 1.15,
            }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      {/* CTA Button — fades in slowly after narrative is complete */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 4.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <button
          style={{
            background: 'none',
            border: `1px solid ${c.borderMid}`,
            borderRadius: '24px',
            padding: '0.75rem 2rem',
            color: c.textPrimary,
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            fontWeight: 400,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            transition: 'border-color 0.4s ease, color 0.4s ease, background-color 0.4s ease',
            outline: 'none',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget;
            el.style.borderColor = c.textPrimary;
            el.style.backgroundColor = c.nodeIdle;
          }}
          onMouseLeave={e => {
            const el = e.currentTarget;
            el.style.borderColor = c.borderMid;
            el.style.backgroundColor = 'transparent';
          }}
          onClick={() => {
            window.location.href = 'mailto:hello@philosophy-site.com'; // subtle contact CTA action
          }}
        >
          {ctaText}
        </button>
      </motion.div>
    </section>
  );
}
