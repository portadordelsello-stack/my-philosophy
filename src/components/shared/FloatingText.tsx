// FloatingText.tsx — theme-aware
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';

interface FloatingTextProps {
  phrases: string[];
  visible: boolean;
}

interface ActivePhrase {
  id: number;
  text: string;
  x: number;
  y: number;
  size: number;
}

export function FloatingText({ phrases, visible }: FloatingTextProps) {
  const c = useThemeColors();
  const [activeItems, setActiveItems] = useState<ActivePhrase[]>([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!visible) { setActiveItems([]); return; }

    const add = () => {
      const text = phrases[Math.floor(Math.random() * phrases.length)];
      const item: ActivePhrase = {
        id: counter + Date.now(),
        text,
        x: 10 + Math.random() * 75,
        y: 10 + Math.random() * 75,
        size: 0.65 + Math.random() * 0.25,
      };
      setActiveItems(prev => [...prev.slice(-6), item]);
      setCounter(p => p + 1);
    };

    add();
    const interval = setInterval(add, 1400);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, phrases]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }} aria-hidden="true">
      <AnimatePresence>
        {activeItems.map(item => (
          <motion.p
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.45, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: 'translate(-50%, -50%)',
              fontFamily: 'var(--font-sans)',
              fontSize: `${item.size}rem`,
              fontWeight: 300,
              color: c.textSub,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {item.text}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
