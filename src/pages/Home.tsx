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
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track) return;

    const trigger = ScrollTrigger.create({
      trigger: track,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Hide hardware cursor during film to enforce cinematic immersion
  const showCursor = progress >= 0.90;

  return (
    <div
      ref={scrollTrackRef}
      style={{
        position: 'relative',
        height: '950vh', // long scroll track for smooth scrollytelling pacing
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
