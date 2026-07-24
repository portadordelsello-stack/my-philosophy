// Orbit.tsx
// Renders text labels orbiting around a central label.
// Each item has its own radius and speed.
import { motion } from 'framer-motion';

interface OrbitItem {
  label: string;
  radius: number;     // px
  duration: number;   // seconds per revolution
  startAngle?: number; // degrees offset
}

interface OrbitProps {
  center: string;
  items: OrbitItem[];
  size?: number;
}

export function Orbit({ center, items, size = 480 }: OrbitProps) {

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label={`${center} surrounded by orbiting technologies`}
    >
      {/* Center label */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          fontSize: 'clamp(1rem, 2vw, 1.4rem)',
          fontWeight: 300,
          letterSpacing: '-0.02em',
          color: 'rgba(255,255,255,0.9)',
          fontFamily: 'var(--font-sans)',
          zIndex: 2,
        }}
      >
        {center}
      </motion.div>

      {/* Orbit rings (decorative) */}
      {[...new Set(items.map(i => i.radius))].map(r => (
        <div
          key={r}
          style={{
            position: 'absolute',
            width:  r * 2,
            height: r * 2,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
            top:  '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        />
      ))}

      {/* Orbiting items */}
      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.15 + 0.5, duration: 1 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
            width: 24,
            height: 24,
          }}
        >
          {/* Rotating wrapper */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: (item.startAngle ?? (i * 37)) / 360 * item.duration,
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -1,
              marginLeft: -1,
              transformOrigin: `${item.radius}px 0`,
              width: 2,
              height: 2,
            }}
          >
            {/* Counter-rotate the text label so it stays upright */}
            <motion.span
              animate={{ rotate: -360 }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: (item.startAngle ?? (i * 37)) / 360 * item.duration,
              }}
              style={{
                position: 'absolute',
                left: item.radius - 4,
                top: -10,
                whiteSpace: 'nowrap',
                fontSize: '0.62rem',
                fontFamily: 'var(--font-sans)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)',
                userSelect: 'none',
              }}
            >
              {item.label}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
