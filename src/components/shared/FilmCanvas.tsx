// FilmCanvas.tsx
// Viewport-filling Canvas that executes the continuous visual morphing of Matter
// from Act I (caotic organic cloud) through Act VI (crystallized geometry) to Act X.
// Driven entirely by the overall scroll progress (0 to 1).
import { useEffect, useRef } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FilmCanvasProps {
  progress: number;
}

interface CanvasNode {
  // Current values
  x: number;
  y: number;
  r: number;
  opacity: number;

  // Base random coordinates for chaos
  chaosX: number;
  chaosY: number;

  // Base geometric coordinates for crystallization
  geomX: number;
  geomY: number;

  // Orbit properties
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
}

export function FilmCanvas({ progress }: FilmCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const c = useThemeColors();
  const reducedMotion = useReducedMotion();

  // Keep colors updated for RAF loop
  const colorsRef = useRef(c);
  useEffect(() => {
    colorsRef.current = c;
  }, [c]);

  // Keep progress updated
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const NODE_COUNT = 110;
    const nodes: CanvasNode[] = [];

    // Precalculate target coords
    for (let i = 0; i < NODE_COUNT; i++) {
      // 1. Chaotic positions
      const chaosAngle = Math.random() * Math.PI * 2;
      const chaosDist = 50 + Math.random() * 250;

      // 2. Geometric structure positions (Crystallization)
      // We arrange nodes in a neat symmetric isometric structure: a grid of lines
      const row = i % 8;
      const col = Math.floor(i / 8) % 8;
      // Isometric grid coordinates
      const geomX = (col - row) * 36;
      const geomY = (col + row) * 18 - 80;

      nodes.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        r: 2,
        opacity: 0,
        chaosX: Math.cos(chaosAngle) * chaosDist,
        chaosY: Math.sin(chaosAngle) * chaosDist,
        geomX,
        geomY,
        orbitRadius: 40 + (i % 6) * 30,
        orbitSpeed: 0.008 * (i % 2 === 0 ? 1 : -1),
        orbitAngle: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId = 0;
    let time = 0;

    // Fluid waves array for Act II
    const disturbances: { radius: number; opacity: number }[] = [];
    let lastDisturbanceTime = 0;

    // Main animation loop
    const tick = () => {
      time += 0.015;
      const actProgress = progressRef.current;
      const activeColors = colorsRef.current;

      // Clean canvas with active background color
      ctx.fillStyle = activeColors.bg;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Define Camera Zoom / Pan based on scroll progress
      let zoom = 1.0;
      let panX = 0;
      let panY = 0;

      if (actProgress >= 0.38 && actProgress < 0.50) {
        // Act V (Gravity): Camera starts zooming in
        const local = (actProgress - 0.38) / 0.12;
        zoom = 1.0 + local * 0.15;
      } else if (actProgress >= 0.50 && actProgress < 0.64) {
        // Act VI (Crystallization): Camera flies through
        const local = (actProgress - 0.50) / 0.14;
        zoom = 1.15 + local * 0.25;
        panX = local * 60;
        panY = local * -30;
      } else if (actProgress >= 0.64 && actProgress < 0.78) {
        // Act VII (Construction): zoom stabilizes
        zoom = 1.4;
        panX = 60;
        panY = -30;
      } else if (actProgress >= 0.78 && actProgress < 0.90) {
        // Act VIII (Life): Camera zooms out slowly
        const local = (actProgress - 0.78) / 0.12;
        zoom = 1.4 - local * 0.4;
        panX = 60 * (1 - local);
        panY = -30 * (1 - local);
      } else if (actProgress >= 0.90) {
        zoom = 1.0;
      }

      ctx.scale(zoom, zoom);
      ctx.translate(panX, panY);

      // ── Act II: Spawn periodic wave disturbances ──
      if (actProgress >= 0.06 && actProgress < 0.14) {
        const currentTime = Date.now();
        if (currentTime - lastDisturbanceTime > 1800) {
          disturbances.push({ radius: 10, opacity: 0.35 });
          lastDisturbanceTime = currentTime;
        }
      }

      // Update and draw wave disturbances
      disturbances.forEach((d, idx) => {
        d.radius += 1.8;
        d.opacity -= 0.0035;
        if (d.opacity <= 0) {
          disturbances.splice(idx, 1);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, d.radius, 0, Math.PI * 2);
          ctx.strokeStyle = activeColors.lineWeak;
          ctx.globalAlpha = d.opacity;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1.0;

      // ── Process matter / node targets for each Act ──
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        let targetX = 0;
        let targetY = 0;
        let targetR = 2.0;
        let targetOpacity = 0.12;
        let targetColor = activeColors.textSecondary;

        // Evolving physical simulation
        if (actProgress < 0.06) {
          // Act I (Before Form): Organic cloud breathing slowly
          const breathe = 1.0 + Math.sin(time * 0.5) * 0.35;
          const angle = (i * 27) % (Math.PI * 2);
          const dist = (i % 6) * 5 * breathe;
          targetX = Math.cos(angle) * dist;
          targetY = Math.sin(angle) * dist;
          targetOpacity = 0.15;
          targetR = 1.5;
        } else if (actProgress >= 0.06 && actProgress < 0.14) {
          // Act II (First Disturbance): Same cloud, but ripple perturbation
          const local = (actProgress - 0.06) / 0.08;
          const breathe = 1.0 + Math.sin(time * 0.5) * 0.35;
          const angle = (i * 27) % (Math.PI * 2);
          const dist = (i % 6) * 5 * breathe;
          // Add small ripple offsets
          const ripple = Math.sin(time * 2 + i) * 3 * local;
          targetX = Math.cos(angle) * (dist + ripple);
          targetY = Math.sin(angle) * (dist + ripple);
          targetOpacity = 0.18;
        } else if (actProgress >= 0.14 && actProgress < 0.26) {
          // Act III (Chaos): Explode out into chaos
          const local = (actProgress - 0.14) / 0.12;
          const startX = Math.cos((i * 27) % (Math.PI * 2)) * ((i % 6) * 5);
          const startY = Math.sin((i * 27) % (Math.PI * 2)) * ((i % 6) * 5);
          targetX = startX + (node.chaosX - startX) * local;
          targetY = startY + (node.chaosY - startY) * local;
          targetOpacity = 0.22;
          targetR = 1.8;
        } else if (actProgress >= 0.26 && actProgress < 0.38) {
          // Act IV (Relationship): Group into 4 orbiting clusters
          const local = (actProgress - 0.26) / 0.12;
          const clusterIndex = i % 4;
          let cx = -140;
          let cy = -70;
          if (clusterIndex === 1) { cx = 140; cy = -70; }
          if (clusterIndex === 2) { cx = -80; cy = 100; }
          if (clusterIndex === 3) { cx = 80; cy = 100; }

          const angle = (i * 17) % (Math.PI * 2);
          const dist = 30 + (i % 5) * 10;
          const targetClusterX = cx + Math.cos(angle) * dist;
          const targetClusterY = cy + Math.sin(angle) * dist;

          targetX = node.chaosX + (targetClusterX - node.chaosX) * local;
          targetY = node.chaosY + (targetClusterY - node.chaosY) * local;
          targetOpacity = 0.25;

          // Draw soft relationships fields
          if (i % 6 === 0 && local > 0.4) {
            const nextIdx = (i + 15) % NODE_COUNT;
            const nextNode = nodes[nextIdx];
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nextNode.x, nextNode.y);
            ctx.strokeStyle = activeColors.lineWeak;
            ctx.globalAlpha = 0.12 * local;
            ctx.stroke();
          }
        } else if (actProgress >= 0.38 && actProgress < 0.50) {
          // Act V (Gravity): Pulled to central dense nucleus
          const local = (actProgress - 0.38) / 0.12;
          const clusterIndex = i % 4;
          let cx = -140;
          let cy = -70;
          if (clusterIndex === 1) { cx = 140; cy = -70; }
          if (clusterIndex === 2) { cx = -80; cy = 100; }
          if (clusterIndex === 3) { cx = 80; cy = 100; }

          const angle = (i * 17) % (Math.PI * 2);
          const dist = 30 + (i % 5) * 10;
          const startX = cx + Math.cos(angle) * dist;
          const startY = cy + Math.sin(angle) * dist;

          // Target: center, but orbit close
          node.orbitAngle += node.orbitSpeed;
          const orbitX = Math.cos(node.orbitAngle) * (20 + (i % 4) * 12);
          const orbitY = Math.sin(node.orbitAngle) * (20 + (i % 4) * 12);

          targetX = startX + (orbitX - startX) * local;
          targetY = startY + (orbitY - startY) * local;
          targetOpacity = 0.35;
          targetR = i % 10 === 0 ? 5 : 2; // Gaining gravity
          if (i === 0) {
            targetX = 0; targetY = 0; targetR = 10; targetOpacity = 0.9;
            targetColor = activeColors.textBright;
          }
        } else if (actProgress >= 0.50 && actProgress < 0.64) {
          // Act VI (Crystallization): SNAP to geometric grid
          const local = (actProgress - 0.50) / 0.14;

          node.orbitAngle += node.orbitSpeed;
          const startX = Math.cos(node.orbitAngle) * (20 + (i % 4) * 12);
          const startY = Math.sin(node.orbitAngle) * (20 + (i % 4) * 12);
          const finalX = i === 0 ? 0 : startX;
          const finalY = i === 0 ? 0 : startY;

          // Interpolate to geometry
          targetX = finalX + (node.geomX - finalX) * local;
          targetY = finalY + (node.geomY - finalY) * local;
          targetOpacity = 0.45;
          targetR = i % 8 === 0 ? 4.5 : 2;

          // Connect structural elements in crystallised state
          if (local > 0.2) {
            const row = i % 8;
            const col = Math.floor(i / 8) % 8;
            if (row < 7) {
              const nextIdx = i + 1;
              if (nextIdx < NODE_COUNT) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(nodes[nextIdx].x, nodes[nextIdx].y);
                ctx.strokeStyle = activeColors.line;
                ctx.globalAlpha = 0.18 * local;
                ctx.stroke();
              }
            }
            if (col < 7) {
              const nextIdx = i + 8;
              if (nextIdx < NODE_COUNT) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(nodes[nextIdx].x, nodes[nextIdx].y);
                ctx.strokeStyle = activeColors.line;
                ctx.globalAlpha = 0.18 * local;
                ctx.stroke();
              }
            }
          }
        } else if (actProgress >= 0.64 && actProgress < 0.78) {
          // Act VII (Construction): Symmetric code paths emerge
          const local = (actProgress - 0.64) / 0.14;
          targetX = node.geomX;
          targetY = node.geomY;
          targetOpacity = 0.55;
          targetR = i % 8 === 0 ? 4.5 : 2;

          // Draw perfect double grid connections
          const row = i % 8;
          const col = Math.floor(i / 8) % 8;
          if (row < 7) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
            ctx.strokeStyle = activeColors.lineStrong;
            ctx.globalAlpha = 0.25;
            ctx.stroke();
          }
          if (col < 7) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[i + 8].x, nodes[i + 8].y);
            ctx.strokeStyle = activeColors.lineStrong;
            ctx.globalAlpha = 0.25;
            ctx.stroke();
          }

          // Subtle ticks along lines representing code materialization
          if (i % 12 === 0 && local > 0.3) {
            ctx.fillStyle = activeColors.textSecondary;
            ctx.font = '5px var(--font-mono)';
            ctx.fillText('101', node.x + 8, node.y + 2);
          }
        } else if (actProgress >= 0.78 && actProgress < 0.90) {
          // Act VIII (Life): Pulse travels, camera zooms out
          targetX = node.geomX;
          targetY = node.geomY;
          targetOpacity = 0.5;
          targetR = i % 8 === 0 ? 4.5 : 2;

          // Draw grid
          const row = i % 8;
          const col = Math.floor(i / 8) % 8;
          if (row < 7) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
            ctx.strokeStyle = activeColors.line;
            ctx.globalAlpha = 0.2;
            ctx.stroke();
          }
          if (col < 7) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[i + 8].x, nodes[i + 8].y);
            ctx.strokeStyle = activeColors.line;
            ctx.globalAlpha = 0.2;
            ctx.stroke();
          }

          // Pulse flow along vertical lines
          const pulseProgress = (time * 0.4) % 1;
          const colToPulse = Math.floor(time) % 8;
          if (col === colToPulse) {
            const activeRowIdx = Math.floor(pulseProgress * 8);
            const activeNodeIdx = col * 8 + activeRowIdx;
            if (activeNodeIdx === i) {
              targetR = 6;
              targetColor = activeColors.textBright;
              targetOpacity = 0.95;
            }
          }
        } else if (actProgress >= 0.90 && actProgress < 0.96) {
          // Act IX (Reflection): Active motion slows, glowing steadily
          targetX = node.geomX;
          targetY = node.geomY;
          targetOpacity = 0.45;
          targetR = i % 8 === 0 ? 4 : 2;

          const row = i % 8;
          const col = Math.floor(i / 8) % 8;
          if (row < 7) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[i + 1].x, nodes[i + 1].y);
            ctx.strokeStyle = activeColors.lineWeak;
            ctx.globalAlpha = 0.15;
            ctx.stroke();
          }
          if (col < 7) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[i + 8].x, nodes[i + 8].y);
            ctx.strokeStyle = activeColors.lineWeak;
            ctx.globalAlpha = 0.15;
            ctx.stroke();
          }
        } else if (actProgress >= 0.96) {
          // Act X (Invitation): Fade back to central organic breathing cloud
          const local = (actProgress - 0.96) / 0.04;
          const breathe = 1.0 + Math.sin(time * 0.5) * 0.35;
          const angle = (i * 27) % (Math.PI * 2);
          const cloudDist = (i % 6) * 5 * breathe;

          const cloudX = Math.cos(angle) * cloudDist;
          const cloudY = Math.sin(angle) * cloudDist;

          targetX = node.geomX + (cloudX - node.geomX) * local;
          targetY = node.geomY + (cloudY - node.geomY) * local;
          targetOpacity = 0.45 - local * 0.3; // fade to cloud opacity
          targetR = 2.0;

          if (i === 0) {
            // Nucleus breathing in center
            targetX = 0; targetY = 0; targetR = 5; targetOpacity = 0.8;
            targetColor = activeColors.textSecondary;
          }
        }

        // Apply interpolation
        const ease = reducedMotion ? 1.0 : 0.085;
        node.x += (targetX - node.x) * ease;
        node.y += (targetY - node.y) * ease;
        node.r += (targetR - node.r) * ease;
        node.opacity += (targetOpacity - node.opacity) * ease;

        // Draw node
        if (node.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
          ctx.fillStyle = targetColor;
          ctx.globalAlpha = node.opacity;
          ctx.fill();
        }
      }

      ctx.restore();
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
