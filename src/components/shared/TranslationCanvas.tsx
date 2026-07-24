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

export function TranslationCanvas({ progress }: TranslationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const c = useThemeColors();
  const { lang } = useLang();
  const reducedMotion = useReducedMotion();

  // Keep progress and colors updated for RAF loop
  const progressRef = useRef(progress);
  useEffect(() => { progressRef.current = progress; }, [progress]);

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
        // Act IV: Monospace Code Block
        const codeLines = [
          'function syncDiagnostics(equipment) {',
          '  return db.tickets',
          '    .filter(t => t.id === equipment.id)',
          '    .map(t => t.status);',
          '}',
        ];

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = activeColors.monoCode;
        ctx.textAlign = 'left';

        codeLines.forEach((line, idx) => {
          ctx.fillText(line, -160, -40 + idx * 18);
        });

        // Particles line up next to characters
        particles.forEach((p, i) => {
          const lineIdx = i % 5;
          const charIdx = (i * 3) % codeLines[lineIdx].length;
          const tx = -160 + charIdx * 6;
          const ty = -36 + lineIdx * 18;

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (0.5 - p.opacity) * ease;
          p.r = 1.2;
        });
      } else if (actProgress >= 0.75 && actProgress < 0.90) {
        // Act V: Dashboard Widget (Scaled up 15%)
        const wX = 0;
        const wY = 0;
        const wW = 300; // 15% increase (260 * 1.15 ~ 300)
        const wH = 172; // 15% increase (150 * 1.15 ~ 172)

        ctx.strokeStyle = activeColors.lineStrong;
        ctx.lineWidth = 1;
        ctx.fillStyle = activeColors.nodeIdle;

        // Draw widget box
        ctx.beginPath();
        ctx.rect(wX - wW / 2, wY - wH / 2, wW, wH);
        ctx.fill();
        ctx.stroke();

        // Widget titles (15% scaled font: 10px)
        ctx.font = '10px "Inter", sans-serif';
        ctx.fillStyle = activeColors.textPrimary;
        ctx.textAlign = 'left';
        ctx.fillText('DIAGNOSTIC PIPELINE ACTIVE', wX - wW / 2 + 15, wY - wH / 2 + 22);

        // Value text (15% scaled font: 28px)
        ctx.font = '28px "Inter", sans-serif';
        ctx.fillText('94.8%', wX - wW / 2 + 15, wY - wH / 2 + 58);

        // Draw line chart inside widget (width scaled dynamically)
        ctx.beginPath();
        ctx.strokeStyle = activeColors.lineStrong;
        ctx.lineWidth = 1.5;
        for (let j = 0; j <= 150; j += 10) {
          const cx = wX - wW / 2 + 125 + j;
          const cy = wY + 22 + Math.sin(j * 0.13 - time * 2) * 15;
          if (j === 0) ctx.moveTo(cx, cy);
          else ctx.lineTo(cx, cy);
        }
        ctx.stroke();

        // Pulsating dot on chart
        const dotX = wX - wW / 2 + 275;
        const dotY = wY + 22 + Math.sin(150 * 0.13 - time * 2) * 15;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 4, 0, Math.PI * 2);
        ctx.fillStyle = activeColors.textBright;
        ctx.fill();

        // Particles flow like active metrics inside the chart
        particles.forEach((p, i) => {
          const progressLocal = ((i * 0.05 + time * 0.25) % 1.0);
          const tx = wX - wW / 2 + 125 + progressLocal * 150;
          const ty = wY + 22 + Math.sin((progressLocal * 150) * 0.13 - time * 2) * 15;

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (0.8 - p.opacity) * ease;
          p.r = 1.8;
          p.color = activeColors.textBright;
        });
      } else {
        // Act VI: Fades out completely to CTA
        particles.forEach((p) => {
          p.opacity += (0 - p.opacity) * ease;
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
