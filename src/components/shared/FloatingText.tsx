// FloatingText.tsx
// Renders ephemeral phrases that float in and out at randomized
// positions within the container. Used in the Thoughts scene.
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface FloatingTextProps {
  phrases: string[];
  visible?: boolean;
}

// Seeded pseudo-random positions for consistent layout
const POSITIONS = [
  { x: '15%',  y: '20%' },
  { x: '65%',  y: '15%' },
  { x: '80%',  y: '40%' },
  { x: '10%',  y: '55%' },
  { x: '50%',  y: '65%' },
  { x: '78%',  y: '70%' },
  { x: '25%',  y: '75%' },
  { x: '40%',  y: '30%' },
];

export function FloatingText({ phrases, visible = true }: FloatingTextProps) {
  const [active, setActive] = useState<Array<{ phrase: string; pos: typeof POSITIONS[number]; key: number }>>([]);
  const keyRef = { current: 0 };

  useEffect(() => {
    if (!visible) { setActive([]); return; }

    // Stagger phrase appearances
    const timers: ReturnType<typeof setTimeout>[] = [];

    phrases.forEach((phrase, i) => {
      const pos = POSITIONS[i % POSITIONS.length];
      const showDelay = i * 900 + 300;
      const hideDelay = showDelay + 4200;

      const showTimer = setTimeout(() => {
        const key = ++keyRef.current;
        setActive(prev => [...prev, { phrase, pos, key }]);

        const hideTimer = setTimeout(() => {
          setActive(prev => prev.filter(p => p.key !== key));
        }, hideDelay - showDelay);
        timers.push(hideTimer);
      }, showDelay);

      timers.push(showTimer);
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, [visible, phrases]);

  return (
    <div
      role="presentation"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {active.map(({ phrase, pos, key }) => (
          <motion.p
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.45, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: pos.x,
              top:  pos.y,
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.75rem, 1.2vw, 0.9rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            "{phrase}"
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
