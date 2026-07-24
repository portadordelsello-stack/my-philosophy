// Orbit.tsx — theme-aware
import { motion } from 'framer-motion';
import { useThemeColors } from '../../hooks/useThemeColors';

interface OrbitItem {
  label: string;
  radius: number;
  duration: number;
  startAngle: number;
}

interface OrbitProps {
  center: string;
  items: OrbitItem[];
  size?: number;
}

export function Orbit({ center, items, size = 480 }: OrbitProps) {
  const c = useThemeColors();

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={`${center} orbit diagram`}>
      {/* Orbit rings */}
      {[110, 165, 210].map(r => (
        <div key={r} style={{ position: 'absolute', width: r * 2, height: r * 2, borderRadius: '50%', border: `1px solid ${c.lineWeak}` }} />
      ))}

      {/* Center label */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
        <motion.div animate={{ boxShadow: [`0 0 0 0 ${c.lineWeak}`, `0 0 24px 8px ${c.lineMid}`, `0 0 0 0 ${c.lineWeak}`] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 14, height: 14, borderRadius: '50%', background: c.nodeActive, border: `1px solid ${c.nodeStrokeActive}` }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: c.textDim }}>{center}</span>
      </div>

      {/* Orbiting items */}
      {items.map(item => (
        <motion.div
          key={item.label}
          animate={{ rotate: 360 }}
          transition={{ duration: item.duration, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', width: item.radius * 2, height: item.radius * 2, borderRadius: '50%', rotate: item.startAngle }}
        >
          <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: c.dotDim, border: `1px solid ${c.nodeStrokeIdle}` }} />
            <motion.span
              animate={{ rotate: -360 }}
              transition={{ duration: item.duration, repeat: Infinity, ease: 'linear' }}
              style={{ fontFamily: 'var(--font-sans)', fontSize: '0.58rem', letterSpacing: '0.1em', color: c.orbitText, whiteSpace: 'nowrap', userSelect: 'none' }}
            >
              {item.label}
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
