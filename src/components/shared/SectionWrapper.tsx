// SectionWrapper.tsx
// Wraps each scene with intersection-based visibility tracking.
// Children receive an `isVisible` context prop so animations
// only play when the section is in the viewport.
import { useRef, useEffect, useState } from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
}

export function SectionWrapper({
  children,
  className = '',
  id,
  threshold = 0.15,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        // Once revealed, keep it visible (no hiding on scroll past)
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <section
      ref={ref}
      id={id}
      className={`scene ${className}`}
      aria-hidden={!visible}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease' }}
    >
      {children}
    </section>
  );
}
