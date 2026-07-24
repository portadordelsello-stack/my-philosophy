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
        // Act I: Search query React Developer
        const term = '> SEARCH: REACT DEVELOPER / FULLSTACK';
        const crossLength = Math.max(0, (actProgress - 0.07) / 0.08); // cross out triggers at 7%

        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = activeColors.textSecondary;
        ctx.textAlign = 'center';
        ctx.fillText(term, 0, 0);

        if (crossLength > 0) {
          ctx.beginPath();
          ctx.moveTo(-150, -4);
          ctx.lineTo(-150 + 300 * Math.min(1, crossLength), -4);
          ctx.strokeStyle = '#ff6464';
          ctx.lineWidth = 1.5;
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
        // Act II: Messy customer quotes float (Scaled up further to 22px)
        const quotes = lang === 'es' ? [
          'La adopción nunca ocurrió. El sistema terminó siendo reemplazado por las herramientas de siempre',
          'Cuatro meses después, el equipo había vuelto a Excel y a sus procesos de siempre',
          'El software cambió. Los hábitos no',
        ] : [
          'Adoption never happened. The system ended up replaced by the same old tools',
          'Four months later, the team had returned to Excel and their usual processes',
          'The software changed. Habits didn\'t',
        ];

        ctx.font = '300 19px "Inter", sans-serif';
        ctx.fillStyle = activeColors.textMuted;
        ctx.textAlign = 'center';

        quotes.forEach((q, idx) => {
          const drift = Math.sin(time + idx) * 8;
          ctx.fillText(q, 0, -55 + idx * 55 + drift);
        });

        // Particles gather around text areas
        particles.forEach((p, i) => {
          const qIdx = i % 3;
          const angle = i * 2.4;
          const tx = Math.cos(angle) * 180 + (Math.sin(time + i) * 12);
          const ty = -55 + qIdx * 55 + (Math.cos(time + i) * 6);
          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (0.16 - p.opacity) * ease;
        });
      } else if (actProgress >= 0.35 && actProgress < 0.55) {
        // Act III: Blueprint / Database boxes (Scaled up 15%)
        // Draw 3 schematic boxes
        const boxLabels = ['EQUIPMENT', 'DIAGNOSIS', 'TICKET'];
        const boxX = [-160, 0, 160];
        const boxY = -30;
        const boxW = 115; // 15% increase (100 * 1.15)
        const boxH = 69;  // 15% increase (60 * 1.15)

        ctx.strokeStyle = activeColors.lineStrong;
        ctx.lineWidth = 1;
        ctx.fillStyle = activeColors.nodeIdle;

        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.rect(boxX[i] - boxW / 2, boxY - boxH / 2, boxW, boxH);
          ctx.fill();
          ctx.stroke();

          // Title (15% scaled font: 9px)
          ctx.font = '9px "Inter", sans-serif';
          ctx.fillStyle = activeColors.textPrimary;
          ctx.textAlign = 'center';
          ctx.fillText(boxLabels[i], boxX[i], boxY - 14);

          // Lines (15% scaled font: 7px)
          ctx.font = '7px "JetBrains Mono", monospace';
          ctx.fillStyle = activeColors.textSecondary;
          ctx.fillText('id: UUID', boxX[i], boxY + 2);
          ctx.fillText('status: STR', boxX[i], boxY + 13);
        }

        // Draw connections between boxes
        ctx.beginPath();
        ctx.moveTo(boxX[0] + boxW / 2, boxY);
        ctx.lineTo(boxX[1] - boxW / 2, boxY);
        ctx.moveTo(boxX[1] + boxW / 2, boxY);
        ctx.lineTo(boxX[2] - boxW / 2, boxY);
        ctx.strokeStyle = activeColors.lineStrong;
        ctx.stroke();

        // Particles snap dynamically to borders of the boxes
        particles.forEach((p, i) => {
          const boxIdx = i % 3;
          const edge = i % 4;

          let tx = boxX[boxIdx];
          let ty = boxY;

          if (edge === 0 || edge === 1) {
            const localOffset = ((i * 17) % (boxW - 10)) - (boxW - 10) / 2;
            tx += localOffset;
            ty += edge === 0 ? -boxH / 2 : boxH / 2;
          } else {
            const localOffset = ((i * 17) % (boxH - 10)) - (boxH - 10) / 2;
            tx += edge === 2 ? -boxW / 2 : boxW / 2;
            ty += localOffset;
          }

          p.x += (tx - p.x) * ease;
          p.y += (ty - p.y) * ease;
          p.opacity += (0.45 - p.opacity) * ease;
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
