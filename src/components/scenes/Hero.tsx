// Hero.tsx — theme-aware
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useLang } from '../../contexts/LanguageContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { translations } from '../../i18n/translations';

const COMMANDS = ['npm create vite', 'npx create-next-app', 'bun create'];

export function Hero() {
  const { lang }  = useLang();
  const c         = useThemeColors();
  const t         = translations.hero.thesis[lang];
  const [typed, setTyped]         = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [thesisIndex, setThesisIndex] = useState(-1);
  const [done, setDone]           = useState(false);
  const tlRef                     = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    tlRef.current?.kill();
    setTyped(''); setShowCursor(true); setThesisIndex(-1); setDone(false);

    const obj = { text: '' };
    const tl  = gsap.timeline({ defaults: { ease: 'none' } });
    tlRef.current = tl;

    COMMANDS.forEach(cmd => {
      tl.to(obj, { duration: cmd.length * 0.06, text: cmd, onUpdate: () => setTyped(obj.text) });
      tl.to({}, { duration: 0.9 });
      tl.to(obj, { duration: cmd.length * 0.04, text: '', onUpdate: () => setTyped(obj.text) });
      tl.to({}, { duration: 0.4 });
    });

    tl.to({}, { duration: 1.6 });
    tl.call(() => setShowCursor(false));
    t.forEach((_, i) => {
      tl.to({}, { duration: 0.2 });
      tl.call(() => setThesisIndex(i));
      tl.to({}, { duration: i === t.length - 1 ? 1.8 : 1.5 });
    });
    tl.call(() => setDone(true));

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: c.bg, overflow: 'hidden', transition: 'background 0.5s ease' }} aria-label="Opening sequence">
      <AnimatePresence>
        {thesisIndex === -1 && (
          <motion.div key="typing" exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: c.textMuted, letterSpacing: '0.04em' }}>
              {typed}
            </span>
            {showCursor && (
              <span style={{ display: 'inline-block', width: '2px', height: '1.2em', background: c.cursor, animation: 'cursorBlink 1s step-end infinite' }} />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', textAlign: 'center', padding: '0 2rem', maxWidth: '720px' }}>
        {t.map((line, i) => (
          <AnimatePresence key={`${lang}-${i}`}>
            {thesisIndex >= i && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  fontFamily: 'var(--font-sans)', fontWeight: 300,
                  fontSize: i === 0 ? 'clamp(3rem, 8vw, 5.5rem)' : i === 1 ? 'clamp(1rem, 2.5vw, 1.4rem)' : 'clamp(1.1rem, 2.8vw, 1.6rem)',
                  letterSpacing: i === 0 ? '-0.04em' : '-0.01em',
                  color: i === 0 ? c.textPrimary : i === 1 ? c.textDim : c.textMid,
                  lineHeight: 1.1,
                }}
              >
                {line}
              </motion.p>
            )}
          </AnimatePresence>
        ))}
      </div>

      <AnimatePresence>
        {done && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={{ scaleY: [0, 1, 0], y: [0, 0, 8] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '1px', height: '40px', background: c.scrollLine, transformOrigin: 'top' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
