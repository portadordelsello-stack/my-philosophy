// useScrollProgress.ts
// Returns a normalized 0–1 progress value as the user scrolls
// through a given element ref.
import { useEffect, useRef, useState } from 'react';

export function useScrollProgress(
  ref: React.RefObject<Element | null>
): number {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 when element enters bottom, 1 when it leaves top
        const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        setProgress(p);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial call
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);

  return progress;
}
