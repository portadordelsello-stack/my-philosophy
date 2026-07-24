// AnimatedLine.tsx
// An SVG vertical or path line that draws itself based on `progress` (0-1).
// Uses stroke-dashoffset technique for smooth path reveal.
import { useEffect, useRef } from 'react';

interface AnimatedLineProps {
  progress?: number;        // 0–1, externally controlled
  height?: number;          // pixel height for straight lines
  width?: number;
  strokeColor?: string;
  strokeWidth?: number;
  animate?: boolean;        // auto-animate (CSS)
  duration?: number;        // seconds for CSS animation
}

export function AnimatedLine({
  progress,
  height = 200,
  width = 1,
  strokeColor = 'rgba(255,255,255,0.25)',
  strokeWidth = 1,
  animate = false,
  duration = 2,
}: AnimatedLineProps) {
  const pathRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength?.() ?? height;

    path.style.strokeDasharray = `${len}`;

    if (progress !== undefined) {
      // Externally driven
      path.style.strokeDashoffset = `${len * (1 - progress)}`;
    } else if (animate) {
      // CSS-driven animation
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = `stroke-dashoffset ${duration}s cubic-bezier(0.16,1,0.3,1)`;
      requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
      });
    }
  }, [progress, animate, height, duration]);

  return (
    <svg
      width={width + strokeWidth * 2}
      height={height}
      overflow="visible"
      aria-hidden="true"
    >
      <line
        ref={pathRef as React.RefObject<SVGLineElement>}
        x1={(width + strokeWidth * 2) / 2}
        y1={0}
        x2={(width + strokeWidth * 2) / 2}
        y2={height}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
