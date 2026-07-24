// NodeGraph.tsx
// A vertical chain of connected SVG nodes with labels.
// The path draws itself based on `progress` (0–1).
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface GraphNode {
  label: string;
  sublabel?: string;
}

interface NodeGraphProps {
  nodes: GraphNode[];
  progress?: number;           // 0–1 draws the connecting line
  activeIndex?: number;        // which node glows
  nodeSpacing?: number;        // px between nodes
  orientation?: 'vertical' | 'horizontal';
}

const NODE_R = 6;             // circle radius
const NODE_SPACING = 80;      // default px between nodes

export function NodeGraph({
  nodes,
  progress = 1,
  activeIndex = -1,
  nodeSpacing = NODE_SPACING,
  orientation = 'vertical',
}: NodeGraphProps) {
  const pathRef = useRef<SVGPathElement>(null);

  const isVertical = orientation === 'vertical';
  const count = nodes.length;
  const totalLength = (count - 1) * nodeSpacing;

  // SVG dimensions
  const svgW = isVertical ? 120 : totalLength + 120;
  const svgH = isVertical ? totalLength + 80 : 120;
  const cx   = isVertical ? 60 : undefined;
  const cy   = isVertical ? undefined : 60;

  // Build path data: straight line through all node centers
  const pathD = isVertical
    ? `M ${cx} ${40} L ${cx} ${40 + totalLength}`
    : `M 60 ${cy} L ${60 + totalLength} ${cy}`;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray  = `${len}`;
    path.style.strokeDashoffset = `${len * (1 - progress)}`;
  }, [progress]);

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      width={svgW}
      height={svgH}
      overflow="visible"
      aria-hidden="true"
    >
      {/* Connecting line */}
      <path
        ref={pathRef}
        d={pathD}
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />

      {/* Nodes */}
      {nodes.map((node, i) => {
        const nx = isVertical ? (cx ?? 60) : 60 + i * nodeSpacing;
        const ny = isVertical ? 40 + i * nodeSpacing : (cy ?? 60);
        const isActive = i <= activeIndex;

        return (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.12 + 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Glow ring */}
            {isActive && (
              <motion.circle
                cx={nx} cy={ny} r={NODE_R + 6}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                animate={{ r: [NODE_R + 4, NODE_R + 10, NODE_R + 4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {/* Main circle */}
            <circle
              cx={nx} cy={ny} r={NODE_R}
              fill={isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.05)'}
              stroke={isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
              strokeWidth="1"
              style={{ transition: 'fill 0.6s ease, stroke 0.6s ease' }}
            />
            {/* Label */}
            <text
              x={isVertical ? nx + 18 : nx}
              y={isVertical ? ny + 4 : ny + 22}
              fill={isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.3)'}
              fontSize="9"
              fontFamily="var(--font-sans)"
              letterSpacing="1.5"
              textAnchor={isVertical ? 'start' : 'middle'}
              style={{ textTransform: 'uppercase', transition: 'fill 0.6s ease' }}
            >
              {node.label}
            </text>
            {/* Sublabel */}
            {node.sublabel && (
              <text
                x={isVertical ? nx + 18 : nx}
                y={isVertical ? ny + 16 : ny + 32}
                fill="rgba(255,255,255,0.18)"
                fontSize="7.5"
                fontFamily="var(--font-sans)"
                letterSpacing="0.5"
                textAnchor={isVertical ? 'start' : 'middle'}
              >
                {node.sublabel}
              </text>
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
