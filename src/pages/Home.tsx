// Home.tsx
// Home composition layer for V3.1 "THE TRANSLATION PROTOCOL".
// Establishes a single 950vh scroll height track, maps scroll progress to 0% -> 100%,
// hides the hardware cursor during the film, and mounts TranslationCanvas, NarrativeOverlay, and Controls.
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { TranslationCanvas } from '../components/shared/TranslationCanvas';
import { NarrativeOverlay }   from '../components/shared/NarrativeOverlay';
import { Controls }           from '../components/shared/Controls';

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const [progress, setProgress] = useState(0);
  const [isCtaHovered, setIsCtaHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [isMobile]);

  // Hide hardware cursor during film to enforce cinematic immersion
  const showCursor = progress >= 0.90;

  return (
    <div
      ref={scrollTrackRef}
      style={{
        position: 'relative',
        height: isMobile ? '450vh' : '950vh', // 450vh on mobile for short, responsive touch scrolling
        background: 'transparent',
        cursor: showCursor ? 'auto' : 'none', // hide cursor until CTA
      }}
    >
      {/* Viewport locked cinematic window */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100dvh',
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <TranslationCanvas progress={progress} isCtaHovered={isCtaHovered} />
        <NarrativeOverlay progress={progress} onCtaHoverChange={setIsCtaHovered} />
        {/* Mount controls inside the fixed viewport */}
        <Controls progress={progress} />
      </div>
    </div>
  );
}
