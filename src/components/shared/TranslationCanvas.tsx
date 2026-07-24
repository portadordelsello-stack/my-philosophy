// TranslationCanvas.tsx
// Background coordinate grid and particle engine. Handles the morphing
// of text/search states, raw customer quotes, database boxes, code functions,
// and dashboard widgets based on scroll progress.
import { useEffect, useRef } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLang } from '../../contexts/LanguageContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface TranslationCanvasProps {
  progress: number;
  isCtaHovered?: boolean;
}

interface Particle {
  // Current values
  x: number;
  y: number;
  r: number;
  opacity: number;
  color: string;

  // Easing velocities
  vx: number;
  vy: number;
}

export function TranslationCanvas({ progress, isCtaHovered = false }: TranslationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const c = useThemeColors();
  const { lang } = useLang();
  const reducedMotion = useReducedMotion();

  // Keep progress and colors updated for RAF loop
  const progressRef = useRef(progress);
  useEffect(() => { progressRef.current = progress; }, [progress]);

  const isCtaHoveredRef = useRef(isCtaHovered);
  useEffect(() => { isCtaHoveredRef.current = isCtaHovered; }, [isCtaHovered]);

  const colorsRef = useRef(c);
  useEffect(() => { colorsRef.current = c; }, [c]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Coordinate pool
    const PARTICLE_COUNT = 150;
    const particles: Particle[] = [];
    const getLayoutScale = (w: number) => Math.min(1.0, w / 620);
    const initialScale = getLayoutScale(width);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * (width / initialScale),
        y: (Math.random() - 0.5) * (height / initialScale),
        r: 1.5,
        opacity: 0,
        color: c.textSecondary,
        vx: 0,
        vy: 0,
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId = 0;
    let time = 0;

    const tick = () => {
      time += 0.02;
      const actProgress = progressRef.current;
      const activeColors = colorsRef.current;

      // ── Clean canvas ──
      ctx.fillStyle = activeColors.bg;
      ctx.fillRect(0, 0, width, height);

      // ── Draw background blueprint grid ──
      ctx.save();
      ctx.strokeStyle = activeColors.lineWeak;
      ctx.lineWidth = 0.5;

      const gridSize = 50;
      // Parallax grid scroll based on progress
      const scrollOffset = actProgress * 150;

      for (let x = -gridSize; x < width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = -gridSize; y < height + gridSize; y += gridSize) {
        const offset = (y + scrollOffset) % height;
        ctx.beginPath();
        ctx.moveTo(0, offset);
        ctx.lineTo(width, offset);
        ctx.stroke();
      }
      ctx.restore();

      // Translate coordinates to screen center for visual components
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Apply responsive layout scale to keep visualization within screen bounds
      const layoutScale = Math.min(1.0, width / 620);
      ctx.scale(layoutScale, layoutScale);

      // ── Render States ──
      const ease = reducedMotion ? 1.0 : 0.08;

      if (actProgress < 0.15) {
        // Act I: Ambient shifting keywords (representing looking for tools)
        const keywords = ['React', 'Fullstack', 'AI', 'Automation', 'ERP', 'CRM'];
        const totalKeywords = keywords.length;
        
        const keywordIdx = Math.min(
          totalKeywords - 1,
          Math.floor((actProgress / 0.11) * totalKeywords)
        );
        const term = keywords[keywordIdx];

        ctx.font = '300 24px "Inter", sans-serif';
        ctx.fillStyle = activeColors.textSecondary;
        ctx.textAlign = 'center';
        ctx.fillText(term, 0, 0);

        const crossLength = Math.max(0, (actProgress - 0.11) / 0.035); // cross out final word from 11% to 14.5%
        if (crossLength > 0) {
          const textWidth = ctx.measureText(term).width;
          ctx.beginPath();
          ctx.moveTo(-textWidth / 2 - 4, -8);
          ctx.lineTo(-textWidth / 2 - 4 + (textWidth + 8) * Math.min(1, crossLength), -8);
          ctx.strokeStyle = '#ff6464';
          ctx.lineWidth = 2.0;
          ctx.stroke();
        }

        // Keep particles faint and floating
        particles.forEach((p, i) => {
          const angle = (i * 13) % 360;
          p.x += (Math.cos(angle) * 120 - p.x) * ease;
          p.y += (Math.sin(angle) * 120 - p.y) * ease;
          p.opacity += (0.08 - p.opacity) * ease;
        });
      } else if (actProgress >= 0.15 && actProgress < 0.35) {
        // Act II: Messy customer quotes float and accumulate sequentially
        const showQuote1 = actProgress >= 0.15 && actProgress < 0.35;
        const showQuote2 = actProgress >= 0.23 && actProgress < 0.35;

        ctx.font = '400 19px "Inter", sans-serif';
        ctx.fillStyle = activeColors.textSecondary;
        ctx.textAlign = 'center';

        if (showQuote1) {
          const q1 = lang === 'es' ? 'La adopción nunca ocurrió.' : 'Adoption never happened.';
          const drift1 = Math.sin(time) * 6;
          ctx.fillText(q1, 0, -30 + drift1);
        }

        if (showQuote2) {
          const q2 = lang === 'es' ? 'El software cambió. Los hábitos no.' : "The software changed. The habits didn't.";
          const drift2 = Math.sin(time + 1) * 6;
          ctx.fillText(q2, 0, 30 + drift2);
        }

        // Particles gather dynamically around active quotes
        particles.forEach((p, i) => {
          const angle = i * 2.4;
          let tx = 0;
          let ty = 0;
          let targetOpacity = 0.08;

          if (showQuote2) {
            // Split particles between the two active quotes
            const targetY = (i % 2 === 0) ? -30 : 30;
            tx = Math.cos(angle) * 180 + (Math.sin(time + i) * 12);
            ty = targetY + (Math.cos(time + i) * 6);
            targetOpacity = 0.16;
          } else if (showQuote1) {
            // Gather all particles around the first quote
            tx = Math.cos(angle) * 180 + (Math.sin(time + i) * 12);
            ty = -30 + (Math.cos(time + i) * 6);
            targetOpacity = 0.16;
          } else {
            tx = Math.cos(angle) * 110 + (Math.sin(time + i) * 8);
            ty = Math.sin(angle) * 110 + (Math.cos(time + i) * 8);
            targetOpacity = 0.10;
          }

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (targetOpacity - p.opacity) * ease;
        });
      } else if (actProgress >= 0.35 && actProgress < 0.55) {
        // Act III: Blueprint / Database boxes (Organic Transition Timeline)
        const act3Progress = (actProgress - 0.35) / 0.20; // local progress (0.0 to 1.0)
        const boxLabels = ['equipment', 'diagnosis', 'ticket'];
        const boxW = 115;
        const boxH = 69;

        // Label drift offsets in Phase 1 (Floating far away)
        const driftEqX = -190 + Math.sin(time * 0.8) * 15;
        const driftEqY = -80 + Math.cos(time * 0.8) * 15;

        const driftDiagX = 20 + Math.cos(time * 0.7) * 20;
        const driftDiagY = 60 + Math.sin(time * 0.7) * 15;

        const driftTickX = 190 + Math.sin(time * 0.9) * 15;
        const driftTickY = -100 + Math.cos(time * 0.9) * 20;

        // Final aligned positions
        const finalX = [-160, 0, 160];
        const finalY = -30;

        // Phase local triggers
        const textEqOpacity = Math.max(0, Math.min(1, act3Progress / 0.12));
        const textDiagOpacity = Math.max(0, Math.min(1, (act3Progress - 0.12) / 0.12));
        const textTickOpacity = Math.max(0, Math.min(1, (act3Progress - 0.24) / 0.12));
        const labelOpacities = [textEqOpacity, textDiagOpacity, textTickOpacity];

        // Lerp progress for alignment (0.45 to 0.70)
        const alignProgress = Math.max(0, Math.min(1, (act3Progress - 0.45) / 0.25));

        // Compute current coordinates
        const currentX = [
          finalX[0] * alignProgress + driftEqX * (1 - alignProgress),
          finalX[1] * alignProgress + driftDiagX * (1 - alignProgress),
          finalX[2] * alignProgress + driftTickX * (1 - alignProgress),
        ];

        const currentY = [
          finalY * alignProgress + driftEqY * (1 - alignProgress),
          finalY * alignProgress + driftDiagY * (1 - alignProgress),
          finalY * alignProgress + driftTickY * (1 - alignProgress),
        ];

        // Opacity for the cards and connections in Phase 3 (0.70 to 1.0)
        const cardOpacity = Math.max(0, Math.min(1, (act3Progress - 0.70) / 0.30));

        // Draw database card structures (only as they materialize)
        if (cardOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = cardOpacity;
          ctx.strokeStyle = activeColors.lineStrong;
          ctx.lineWidth = 1;
          ctx.fillStyle = activeColors.nodeIdle;

          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.rect(currentX[i] - boxW / 2, currentY[i] - boxH / 2, boxW, boxH);
            ctx.fill();
            ctx.stroke();

            // Lines
            ctx.font = '7px "JetBrains Mono", monospace';
            ctx.fillStyle = activeColors.textSecondary;
            ctx.textAlign = 'center';
            ctx.fillText('id: UUID', currentX[i], currentY[i] + 2);
            ctx.fillText('status: STR', currentX[i], currentY[i] + 13);
          }

          // Draw connections between boxes
          ctx.beginPath();
          ctx.moveTo(currentX[0] + boxW / 2, currentY[0]);
          ctx.lineTo(currentX[1] - boxW / 2, currentY[1]);
          ctx.moveTo(currentX[1] + boxW / 2, currentY[1]);
          ctx.lineTo(currentX[2] - boxW / 2, currentY[2]);
          ctx.strokeStyle = activeColors.lineStrong;
          ctx.stroke();
          ctx.restore();
        }

        // Draw the 3 text labels
        for (let i = 0; i < 3; i++) {
          if (labelOpacities[i] > 0.01) {
            ctx.save();
            ctx.globalAlpha = labelOpacities[i];
            ctx.font = '9px "Inter", sans-serif';
            ctx.fillStyle = activeColors.textPrimary;
            ctx.textAlign = 'center';
            
            // Slide title up to header position as card outlines fade in
            const titleYOffset = -14 * cardOpacity;
            ctx.fillText(boxLabels[i], currentX[i], currentY[i] + titleYOffset);
            ctx.restore();
          }
        }

        // Particles snap to borders of the boxes or orbit the drifting labels
        particles.forEach((p, i) => {
          const boxIdx = i % 3;
          const edge = i % 4;

          let tx = currentX[boxIdx];
          let ty = currentY[boxIdx];

          if (cardOpacity > 0.1) {
            if (edge === 0 || edge === 1) {
              const localOffset = ((i * 17) % (boxW - 10)) - (boxW - 10) / 2;
              tx += localOffset;
              ty += edge === 0 ? -boxH / 2 : boxH / 2;
            } else {
              const localOffset = ((i * 17) % (boxH - 10)) - (boxH - 10) / 2;
              tx += edge === 2 ? -boxW / 2 : boxW / 2;
              ty += localOffset;
            }
          } else {
            const angle = i * 2.4;
            tx += Math.cos(angle) * 45;
            ty += Math.sin(angle) * 45;
          }

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += ((0.45 * labelOpacities[boxIdx]) - p.opacity) * ease;
          p.r = 1.0;
        });
      } else if (actProgress >= 0.55 && actProgress < 0.75) {
        // Act IV: Code morphing and reorganization (The Structure Condenses)
        const act4Progress = (actProgress - 0.55) / 0.20; // 0.0 to 1.0
        
        // Morph progress (0.0 to 0.3)
        const morphProgress = Math.min(1, act4Progress / 0.30);
        
        // Swap progress (0.40 to 0.65)
        const swapProgress = Math.max(0, Math.min(1, (act4Progress - 0.40) / 0.25));

        // DB card dimensions for morphing
        const boxW = 115 * (1 - morphProgress);
        const boxH = 69 * (1 - morphProgress);

        // Card positions from Act III
        const startX = [-160, 0, 160];
        const startY = -30;

        // Target positions inside the code block
        const eqTargetY = -15 + 15 * swapProgress;       // slides from -15 to 0
        const diagTargetY = 0 - 15 * swapProgress;       // slides from 0 to -15
        const tickTargetY = 15;

        // Interpolated positions for the properties
        const eqX = startX[0] * (1 - morphProgress) - 50 * morphProgress;
        const eqY = startY * (1 - morphProgress) + eqTargetY * morphProgress;

        const diagX = startX[1] * (1 - morphProgress) - 50 * morphProgress;
        const diagY = startY * (1 - morphProgress) + diagTargetY * morphProgress;

        const tickX = startX[2] * (1 - morphProgress) - 50 * morphProgress;
        const tickY = startY * (1 - morphProgress) + tickTargetY * morphProgress;

        // Draw collapsing DB borders
        if (morphProgress < 0.99) {
          ctx.save();
          ctx.globalAlpha = 1 - morphProgress;
          ctx.strokeStyle = activeColors.lineStrong;
          ctx.lineWidth = 1;
          for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            const cx = startX[i] * (1 - morphProgress) - 50 * morphProgress;
            const cy = startY * (1 - morphProgress) + (i === 0 ? eqTargetY : i === 1 ? diagTargetY : tickTargetY) * morphProgress;
            ctx.rect(cx - boxW / 2, cy - boxH / 2, boxW, boxH);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Draw the TS interface syntax fading in
        const syntaxOpacity = Math.max(0, (act4Progress - 0.20) / 0.20);
        if (syntaxOpacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = syntaxOpacity;
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = activeColors.textSecondary;
          ctx.textAlign = 'left';

          // Outer syntax
          ctx.fillText('interface Pipeline {', -70, -30);
          ctx.fillText('}', -70, 30);

          // Type declarations
          ctx.fillStyle = activeColors.monoCode;
          ctx.fillText(': UUID;', 25, eqY);
          ctx.fillText(': UUID;', 25, tickY);

          // Living type changes based on swapProgress
          const diagType = swapProgress > 0.7 ? ': Diagnostics;' : swapProgress > 0.2 ? ': Analysis;' : ': string;';
          ctx.fillText(diagType, 25, diagY);
          ctx.restore();
        }

        // Draw the property labels (the condensed structure names)
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = activeColors.monoCode;
        ctx.textAlign = 'left';
        ctx.fillText('  equipment', eqX, eqY);
        ctx.fillText('  diagnosis', diagX, diagY);
        ctx.fillText('  ticket', tickX, tickY);

        // Particles flow from DB positions to line up with the code text
        particles.forEach((p, i) => {
          const idx = i % 3;
          let tx = idx === 0 ? eqX : idx === 1 ? diagX : tickX;
          let ty = idx === 0 ? eqY : idx === 1 ? diagY : tickY;

          tx += 40 + (i % 8) * 8;

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (0.25 - p.opacity) * ease;
          p.r = 1.0;
        });
      } else if (actProgress >= 0.75 && actProgress < 0.90) {
        // Act V: System Engine (Abstract data pipeline, non-SaaS)
        ctx.strokeStyle = activeColors.line;
        ctx.lineWidth = 0.5;
        
        // Inner blueprint ring
        ctx.beginPath();
        ctx.arc(0, 0, 60, 0, Math.PI * 2);
        ctx.stroke();

        // Outer blueprint ring
        ctx.beginPath();
        ctx.arc(0, 0, 110, 0, Math.PI * 2);
        ctx.stroke();

        // Pulsing central system core
        const corePulse = 6 + Math.sin(time * 3.5) * 1.8;
        ctx.beginPath();
        ctx.arc(0, 0, corePulse, 0, Math.PI * 2);
        ctx.fillStyle = activeColors.textPrimary;
        ctx.fill();

        ctx.font = '7px "JetBrains Mono", monospace';
        ctx.fillStyle = activeColors.textSecondary;
        ctx.textAlign = 'center';
        ctx.fillText('system_core', 0, 15);

        // Calculate orbital node coordinates
        const n1x = Math.cos(time * 0.5) * 60;
        const n1y = Math.sin(time * 0.5) * 60;

        const n2x = Math.cos(time * 0.5 + Math.PI) * 60;
        const n2y = Math.sin(time * 0.5 + Math.PI) * 60;

        const n3x = Math.cos(-time * 0.25) * 110;
        const n3y = Math.sin(-time * 0.25) * 110;

        const n4x = Math.cos(-time * 0.25 + Math.PI) * 110;
        const n4y = Math.sin(-time * 0.25 + Math.PI) * 110;

        // Dotted connection lines between core and nodes
        ctx.save();
        ctx.setLineDash([2, 4]);
        ctx.strokeStyle = activeColors.lineStrong;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, 0); ctx.lineTo(n1x, n1y);
        ctx.moveTo(0, 0); ctx.lineTo(n2x, n2y);
        ctx.moveTo(0, 0); ctx.lineTo(n3x, n3y);
        ctx.moveTo(0, 0); ctx.lineTo(n4x, n4y);
        ctx.stroke();
        ctx.restore();

        // Draw system nodes and small metadata labels
        const nodes = [
          [n1x, n1y, 'node.01'],
          [n2x, n2y, 'node.02'],
          [n3x, n3y, 'tx.rate: 94.8%'],
          [n4x, n4y, 'state: active']
        ];

        nodes.forEach(([nx, ny, label]) => {
          ctx.beginPath();
          ctx.arc(nx as number, ny as number, 3, 0, Math.PI * 2);
          ctx.fillStyle = activeColors.textPrimary;
          ctx.fill();

          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.fillStyle = activeColors.textSecondary;
          ctx.textAlign = 'left';
          ctx.fillText(label as string, (nx as number) + 6, (ny as number) + 2);
        });

        // Particles flow dynamically along inner and outer orbits
        particles.forEach((p, i) => {
          const orbitIdx = i % 2;
          const radius = orbitIdx === 0 ? 60 : 110;
          const speedFactor = orbitIdx === 0 ? 0.5 : -0.25;
          const offsetAngle = (i * 12) % 360;

          const angle = time * speedFactor + offsetAngle * (Math.PI / 180);
          const tx = Math.cos(angle) * radius + (Math.sin(time + i) * 6);
          const ty = Math.sin(angle) * radius + (Math.cos(time + i) * 6);

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (0.28 - p.opacity) * ease;
          p.r = 1.0;
        });
      } else {
        // Act VI: Fades out completely to CTA (particles react to hover)
        const isHovered = isCtaHoveredRef.current;
        
        particles.forEach((p, i) => {
          const angle = i * 2.4 + time * (isHovered ? 2.5 : 0.2); // rotates fast on hover
          const radius = isHovered ? (60 + (i % 5) * 10) : (180 + (i % 8) * 15);
          
          // Orbit center: (0, 45) if hovered (around the button), (0, 0) if not
          const cx = 0;
          const cy = isHovered ? 45 : 0;
          
          const tx = cx + Math.cos(angle) * radius;
          const ty = cy + Math.sin(angle) * radius;
          const targetOpacity = isHovered ? 0.60 : 0.05;

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (targetOpacity - p.opacity) * ease;
          p.r = isHovered ? 1.5 : 1.0;
        });
      }

      // Draw all active particles
      particles.forEach((p) => {
        if (p.opacity > 0.01) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.color || activeColors.textSecondary;
          ctx.globalAlpha = p.opacity;
          ctx.fill();
        }
      });

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
  }, [lang, reducedMotion]);

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
