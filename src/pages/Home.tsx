// Home.tsx
// Narrative layer that orchestrates the single continuous universe of the landing page.
// Sets up vertical ScrollTriggers for all 14 scenes to update background GlobalCanvas coordinates.
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { GlobalCanvas } from '../components/shared/GlobalCanvas';
import { Hero }         from '../components/scenes/Hero';
import { Listening }    from '../components/scenes/Listening';
import { Thoughts }     from '../components/scenes/Thoughts';
import { Priority }     from '../components/scenes/Priority';
import { Workflow }     from '../components/scenes/Workflow';
import { People }       from '../components/scenes/People';
import { Product }      from '../components/scenes/Product';
import { Code }         from '../components/scenes/Code';
import { Technology }   from '../components/scenes/Technology';
import { FlowAlive }    from '../components/scenes/FlowAlive';
import { Feedback }     from '../components/scenes/Feedback';
import { Comparison }   from '../components/scenes/Comparison';
import { Philosophy }   from '../components/scenes/Philosophy';
import { Final }        from '../components/scenes/Final';

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  'hero',
  'listening',
  'thoughts',
  'priority',
  'workflow',
  'people',
  'product',
  'code',
  'technology',
  'flow-alive',
  'feedback',
  'comparison',
  'philosophy',
  'final',
];

export function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    SCENES.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: index === 0 ? 'top top' : 'top center',
        end: index === SCENES.length - 1 ? 'bottom bottom' : 'bottom center',
        scrub: true,
        onToggle: (self) => {
          if (self.isActive) {
            setActiveScene(index);
          }
        },
        onUpdate: (self) => {
          if (self.isActive) {
            setSceneProgress(self.progress);
          }
        },
      });

      triggers.push(trigger);
    });

    // Refresh ScrollTrigger to calculate correct layout offsets
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <main aria-label="Philosophy — Software starts with people" style={{ position: 'relative' }}>
      {/* Persistent Background Visual Universe */}
      <GlobalCanvas activeScene={activeScene} sceneProgress={sceneProgress} />

      {/* Narrative steps in foreground */}
      <Hero />
      <Listening />
      <Thoughts />
      <Priority />
      <Workflow />
      <People />
      <Product />
      <Code />
      <Technology />
      <FlowAlive />
      <Feedback />
      <Comparison />
      <Philosophy />
      <Final />
    </main>
  );
}
