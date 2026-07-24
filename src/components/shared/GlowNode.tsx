// GlowNode.tsx
// A single SVG circle node with a label. Can animate its glow
// when `active` is true.
import { motion } from 'framer-motion';

interface GlowNodeProps {
  label: string;
  sublabel?: string;
  active?: boolean;
  size?: number;
  delay?: number;
}

export function GlowNode({
  label,
  sublabel,
  active = false,
  size = 10,
  delay = 0,
}: GlowNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      {/* Circle */}
      <motion.div
        animate={
          active
            ? { boxShadow: ['0 0 0 0 rgba(255,255,255,0.0)', '0 0 20px 6px rgba(255,255,255,0.15)', '0 0 0 0 rgba(255,255,255,0.0)'] }
            : { boxShadow: '0 0 0 0 rgba(255,255,255,0.0)' }
        }
        transition={active ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' } : {}}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)',
          border: `1px solid ${active ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)'}`,
          transition: 'background 0.6s ease, border-color 0.6s ease',
        }}
      />
      {/* Label */}
      <span style={{
        fontSize: '0.7rem',
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
        transition: 'color 0.6s ease',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
      {sublabel && (
        <span style={{
          fontSize: '0.6rem',
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: '0.08em',
        }}>
          {sublabel}
        </span>
      )}
    </motion.div>
  );
}
