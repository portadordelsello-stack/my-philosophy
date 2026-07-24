// GlobalCanvas.tsx
// Persistent background 2D canvas that coordinates the visual universe
// of particles, nodes, and connections across all 14 scenes.
// Integrates with GSAP ScrollTriggers in Home.tsx via activeScene/progress tracking.
import { useEffect, useRef } from 'react';
import { useThemeColors } from '../../hooks/useThemeColors';
import { useLang } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface GlobalCanvasProps {
  activeScene: number;
  sceneProgress: number;
}

// Particle/Node structure
interface CanvasNode {
  // Current interpolated values
  x: number;          // pixels relative to center
  y: number;          // pixels relative to center
  r: number;          // radius in pixels
  opacity: number;    // 0 to 1
  color: string;      // RGB color string
  label: string;

  // Target values to ease towards
  targetX: number;
  targetY: number;
  targetR: number;
  targetOpacity: number;
  targetColor: string;
  targetLabel: string;

  // Orbit parameters
  isOrbiting: boolean;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  orbitCenterX: number;
  orbitCenterY: number;
}

interface Connection {
  from: number;
  to: number;
  opacity: number;
  targetOpacity: number;
  color: string;
}

export function GlobalCanvas({ activeScene, sceneProgress }: GlobalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const c = useThemeColors();
  const { lang } = useLang();
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  // Keep colors updated for RAF loop
  const colorsRef = useRef(c);
  useEffect(() => {
    colorsRef.current = c;
  }, [c]);

  // Keep activeState updated
  const stateRef = useRef({ activeScene, sceneProgress });
  useEffect(() => {
    stateRef.current = { activeScene, sceneProgress };
  }, [activeScene, sceneProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node count
    const NODE_COUNT = 90;
    const nodes: CanvasNode[] = [];
    const connections: Connection[] = [];

    // Initialize node pool
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * width,
        y: (Math.random() - 0.5) * height,
        r: 2,
        opacity: 0,
        color: c.textSecondary,
        label: '',

        targetX: 0,
        targetY: 0,
        targetR: 2,
        targetOpacity: 0,
        targetColor: c.textSecondary,
        targetLabel: '',

        isOrbiting: false,
        orbitRadius: 0,
        orbitSpeed: 0,
        orbitAngle: 0,
        orbitCenterX: 0,
        orbitCenterY: 0,
      });
    }

    // Set up window resize listener
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId = 0;
    let pulseTime = 0;

    // Helper to calculate target positions based on scene and progress
    const updateTargets = (scene: number, progress: number) => {
      const activeColors = colorsRef.current;

      // Reset default targets
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes[i].targetR = 2;
        nodes[i].targetOpacity = 0.05;
        nodes[i].targetColor = activeColors.textSecondary;
        nodes[i].targetLabel = '';
        nodes[i].isOrbiting = false;
      }
      connections.length = 0; // Clear connections

      // Set scene-specific configurations
      switch (scene) {
        case 0: // Hero
          // Scattered particles floating slowly
          for (let i = 0; i < NODE_COUNT; i++) {
            if (i >= 20) {
              nodes[i].targetOpacity = 0.12;
              // Drifting circle coords
              const angle = (i * 13) % 360;
              nodes[i].targetX = Math.cos(angle) * (width * 0.25);
              nodes[i].targetY = Math.sin(angle) * (height * 0.25);
            }
          }
          break;

        case 1: // Listening
          // Ideas float in chaotically and begin grouping into 3 clusters
          // Cluster 1 (Left)
          for (let i = 0; i < NODE_COUNT; i++) {
            if (i >= 20) {
              nodes[i].targetOpacity = 0.18;
              const angle = (i * 23) % 360;
              const clusterIndex = i % 3;

              let cx = -width * 0.2;
              let cy = 0;
              if (clusterIndex === 1) cx = width * 0.2;
              if (clusterIndex === 2) { cx = 0; cy = height * 0.25; }

              // As progress goes 0 -> 1, pull from absolute chaos into cluster center
              const chaosX = Math.cos(angle) * (width * 0.4);
              const chaosY = Math.sin(angle) * (height * 0.4);
              nodes[i].targetX = chaosX + (cx - chaosX) * progress;
              nodes[i].targetY = chaosY + (cy - chaosY) * progress;

              // Draw connecting lines within clusters as they group
              if (progress > 0.5 && i % 4 === 0) {
                const nextNeighbor = i + clusterIndex + 1;
                if (nextNeighbor < NODE_COUNT) {
                  connections.push({
                    from: i,
                    to: nextNeighbor,
                    opacity: (progress - 0.5) * 2 * 0.12,
                    targetOpacity: 0.12,
                    color: activeColors.line,
                  });
                }
              }
            }
          }
          break;

        case 2: // Thoughts
          // Clusters connect to form neural network
          for (let i = 0; i < NODE_COUNT; i++) {
            if (i >= 20) {
              nodes[i].targetOpacity = 0.22;
              const clusterIndex = i % 3;
              let cx = -width * 0.25;
              let cy = -height * 0.1;
              if (clusterIndex === 1) { cx = width * 0.25; cy = -height * 0.1; }
              if (clusterIndex === 2) { cx = 0; cy = height * 0.18; }

              const angle = (i * 23) % 360;
              const rDist = 60 + (i % 8) * 10;
              nodes[i].targetX = cx + Math.cos(angle) * rDist;
              nodes[i].targetY = cy + Math.sin(angle) * rDist;

              // Inter-cluster connections
              if (i % 6 === 0) {
                connections.push({
                  from: i,
                  to: (i + 15) % NODE_COUNT,
                  opacity: 0.15,
                  targetOpacity: 0.15,
                  color: activeColors.lineMid,
                });
              }
            }
          }
          break;

        case 3: // Priority
          // Important nodes (0-4) gather in vertical center, others orbit
          const labelsPriority = lang === 'es' 
            ? ['Problema', 'Proceso', 'Personas', 'Negocio', 'Tecnología']
            : ['Problem', 'Process', 'People', 'Business', 'Technology'];

          for (let i = 0; i < 5; i++) {
            nodes[i].targetR = i === 4 ? 9 : 6;
            nodes[i].targetOpacity = 0.9;
            nodes[i].targetX = 0;
            nodes[i].targetY = -120 + i * 65;
            nodes[i].targetColor = i === 4 ? activeColors.textBright : activeColors.textDim;
            nodes[i].targetLabel = labelsPriority[i];

            if (i < 4) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.3,
                targetOpacity: 0.3,
                color: activeColors.lineStrong,
              });
            }
          }
          // Secondary nodes orbit them
          for (let i = 5; i < 20; i++) {
            nodes[i].targetOpacity = 0.25;
            nodes[i].isOrbiting = true;
            nodes[i].orbitRadius = 140 + (i % 4) * 35;
            nodes[i].orbitSpeed = 0.005 * (i % 2 === 0 ? 1 : -1);
            nodes[i].orbitAngle = i * 25;
          }
          break;

        case 4: // Workflow
          // Clean vertical pipeline (nodes 0-5)
          const labelsWorkflow = lang === 'es'
            ? ['Recepción', 'Diagnóstico', 'Cotización', 'Aprobación', 'Reparación', 'Entrega']
            : ['Receiving', 'Diagnosis', 'Quotation', 'Approval', 'Repair', 'Delivery'];

          for (let i = 0; i < 6; i++) {
            nodes[i].targetR = 6;
            nodes[i].targetOpacity = 0.85;
            nodes[i].targetX = 0;
            nodes[i].targetY = -180 + i * 72;
            nodes[i].targetLabel = labelsWorkflow[i];

            if (i < 5) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.35,
                targetOpacity: 0.35,
                color: activeColors.lineStrong,
              });
            }
          }
          break;

        case 5: // People
          // Workflow stays + branching role nodes (6-9)
          const labelsRoles = lang === 'es'
            ? ['Cliente', 'Administrador', 'Técnico', 'Logística']
            : ['Customer', 'Administrator', 'Technician', 'Logistics'];

          // Draw pipeline
          for (let i = 0; i < 6; i++) {
            nodes[i].targetR = 5;
            nodes[i].targetOpacity = 0.6;
            nodes[i].targetX = 0;
            nodes[i].targetY = -180 + i * 72;

            if (i < 5) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.2,
                targetOpacity: 0.2,
                color: activeColors.lineMid,
              });
            }
          }
          // Roles branch out
          const roleX = [120, -120, 120, -120];
          const roleY = [-180, -100, 36, 180];
          const roleConnects = [0, 2, 4, 5]; // Node indices they branch from

          for (let i = 0; i < 4; i++) {
            const nodeIdx = 6 + i;
            nodes[nodeIdx].targetR = 6;
            nodes[nodeIdx].targetOpacity = 0.85;
            nodes[nodeIdx].targetX = roleX[i];
            nodes[nodeIdx].targetY = roleY[i];
            nodes[nodeIdx].targetLabel = labelsRoles[i];
            nodes[nodeIdx].targetColor = activeColors.textPrimary;

            // Connection to workflow node
            connections.push({
              from: roleConnects[i],
              to: nodeIdx,
              opacity: 0.35,
              targetOpacity: 0.35,
              color: activeColors.lineStrong,
            });
          }
          break;

        case 6: // Product
          // All collapse to center into a single product node
          nodes[0].targetR = 14;
          nodes[0].targetOpacity = 0.95;
          nodes[0].targetX = 0;
          nodes[0].targetY = 0;
          nodes[0].targetLabel = lang === 'es' ? 'PRODUCTO' : 'PRODUCT';
          nodes[0].targetColor = activeColors.textBright;
          break;

        case 7: // Code
          // Product node stays, code is shown in foreground
          nodes[0].targetR = 10;
          nodes[0].targetOpacity = 0.8;
          nodes[0].targetX = width > 768 ? -180 : 0;
          nodes[0].targetY = width > 768 ? 0 : -150;
          nodes[0].targetColor = activeColors.textSecondary;
          break;

        case 8: // Technology
          // Product center + tech labels orbiting
          nodes[0].targetR = 10;
          nodes[0].targetOpacity = 0.85;
          nodes[0].targetX = 0;
          nodes[0].targetY = 0;
          nodes[0].targetLabel = lang === 'es' ? 'PRODUCTO' : 'PRODUCT';

          const techLabels = ['React', 'TS', 'Firebase', 'Vercel', 'Node', 'Python', 'Supabase', 'AWS', 'OpenAI', 'Vite'];
          for (let i = 0; i < techLabels.length; i++) {
            const nodeIdx = 6 + i;
            nodes[nodeIdx].targetR = 3;
            nodes[nodeIdx].targetOpacity = 0.7;
            nodes[nodeIdx].isOrbiting = true;
            nodes[nodeIdx].orbitRadius = 100 + Math.floor(i / 3) * 55;
            nodes[nodeIdx].orbitSpeed = 0.003 * (i % 2 === 0 ? 1 : -1);
            nodes[nodeIdx].orbitAngle = i * 40;
            nodes[nodeIdx].targetLabel = techLabels[i];
            nodes[nodeIdx].targetColor = activeColors.textMuted;
          }
          break;

        case 9: // FlowAlive
          // Pipeline setup
          for (let i = 0; i < 6; i++) {
            nodes[i].targetR = 5;
            nodes[i].targetOpacity = 0.7;
            nodes[i].targetX = 0;
            nodes[i].targetY = -180 + i * 72;

            if (i < 5) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.2,
                targetOpacity: 0.2,
                color: activeColors.lineMid,
              });
            }
          }
          break;

        case 10: // Feedback
          // v1 (6 nodes) shifts structure to v2 (7 nodes)
          const nodesV2Count = 7;
          for (let i = 0; i < nodesV2Count; i++) {
            nodes[i].targetR = 5;
            nodes[i].targetOpacity = 0.8;
            // Introduce a curved layout for V2
            const angle = -Math.PI / 2 + (i / (nodesV2Count - 1)) * Math.PI;
            nodes[i].targetX = Math.cos(angle) * 80;
            nodes[i].targetY = -160 + i * 55;

            if (i < nodesV2Count - 1) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.25,
                targetOpacity: 0.25,
                color: activeColors.lineMid,
              });
            }
          }
          break;

        case 11: // Comparison
          // Split left (collapse red) vs right (stable white)
          // Left (wrong)
          for (let i = 0; i < 4; i++) {
            nodes[i].targetR = 4;
            nodes[i].targetOpacity = 0.15;
            nodes[i].targetX = -width * 0.22;
            // Collapse vertically close together
            nodes[i].targetY = -40 + i * 25;
            nodes[i].targetColor = activeColors.wrongNode;

            if (i < 3) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.12,
                targetOpacity: 0.12,
                color: activeColors.wrongLine,
              });
            }
          }
          // Right (correct)
          for (let i = 4; i < 12; i++) {
            const idx = i - 4;
            nodes[i].targetR = 6;
            nodes[i].targetOpacity = 0.85;
            nodes[i].targetX = width * 0.22;
            nodes[i].targetY = -140 + idx * 45;
            nodes[i].targetColor = activeColors.textPrimary;

            if (idx < 7) {
              connections.push({
                from: i,
                to: i + 1,
                opacity: 0.35,
                targetOpacity: 0.35,
                color: activeColors.lineStrong,
              });
            }
          }
          break;

        case 12: // Philosophy
          // Drifting minimal starfield
          for (let i = 0; i < NODE_COUNT; i++) {
            nodes[i].targetOpacity = 0.08;
            const angle = (i * 17) % 360;
            nodes[i].targetX = Math.cos(angle) * (width * 0.35);
            nodes[i].targetY = Math.sin(angle) * (height * 0.35);
          }
          break;

        case 13: // Final
          // Tree structure branching out at the end
          // Root node
          nodes[0].targetR = 8;
          nodes[0].targetOpacity = 0.9;
          nodes[0].targetX = 0;
          nodes[0].targetY = -180;
          nodes[0].targetLabel = lang === 'es' ? 'Usuario' : 'User';

          // First branch layer
          for (let i = 1; i <= 3; i++) {
            nodes[i].targetR = 6;
            nodes[i].targetOpacity = 0.8;
            nodes[i].targetX = -120 + (i - 1) * 120;
            nodes[i].targetY = -80;
            nodes[i].targetLabel = i === 1 ? (lang === 'es' ? 'Proceso' : 'Process') : i === 2 ? (lang === 'es' ? 'Producto' : 'Product') : (lang === 'es' ? 'Software' : 'Software');

            connections.push({
              from: 0,
              to: i,
              opacity: 0.3,
              targetOpacity: 0.3,
              color: activeColors.lineMid,
            });
          }

          // Second branch layer
          const secondRowX = [-180, -60, 60, 180];
          const secondRowLabels = lang === 'es' ? ['Descubrimiento', 'Iteración', 'Métrica', 'Feedback'] : ['Discovery', 'Iteration', 'Metrics', 'Feedback'];
          for (let i = 0; i < 4; i++) {
            const nodeIdx = 4 + i;
            nodes[nodeIdx].targetR = 5;
            nodes[nodeIdx].targetOpacity = 0.75;
            nodes[nodeIdx].targetX = secondRowX[i];
            nodes[nodeIdx].targetY = 20;
            nodes[nodeIdx].targetLabel = secondRowLabels[i];

            // Link to parents
            const parentIdx = i < 2 ? 1 : 2;
            connections.push({
              from: parentIdx,
              to: nodeIdx,
              opacity: 0.25,
              targetOpacity: 0.25,
              color: activeColors.lineWeak,
            });
          }
          break;
      }
    };

    // Render loop
    const tick = () => {
      const activeColors = colorsRef.current;
      const state = stateRef.current;

      // Clear canvas with theme color
      ctx.fillStyle = activeColors.bg;
      ctx.fillRect(0, 0, width, height);

      // Translate coordinates to viewport center
      ctx.save();
      ctx.translate(width / 2, height / 2);

      // Increment pulse/orbit angles
      pulseTime += 0.015;

      // 1. Update target values based on ScrollTrigger progress
      updateTargets(state.activeScene, state.sceneProgress);

      // 2. Interpolate node states (Dampening / Ease lerp)
      const ease = reducedMotion ? 1.0 : 0.085; // Jump instantly if reduced motion

      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];

        if (node.isOrbiting) {
          node.orbitAngle += node.orbitSpeed;
          const targetOrbitX = Math.cos(node.orbitAngle) * node.orbitRadius;
          const targetOrbitY = Math.sin(node.orbitAngle) * node.orbitRadius;

          node.x += (targetOrbitX - node.x) * ease;
          node.y += (targetOrbitY - node.y) * ease;
        } else {
          node.x += (node.targetX - node.x) * ease;
          node.y += (node.targetY - node.y) * ease;
        }

        node.r += (node.targetR - node.r) * ease;
        node.opacity += (node.targetOpacity - node.opacity) * ease;
        node.label = node.targetLabel; // instant switch labels to avoid layout artifacts
      }

      // 3. Draw connection lines
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        const opacity = fromNode.opacity * toNode.opacity * conn.opacity * 4;

        if (opacity > 0.01) {
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
          ctx.strokeStyle = conn.color;
          ctx.globalAlpha = Math.min(1, opacity);
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
      ctx.globalAlpha = 1;

      // 4. Draw active flow pulses in Scene 9 (FlowAlive) and 10 (Feedback)
      if (state.activeScene === 9 || state.activeScene === 10) {
        const pipelineStages = state.activeScene === 9 ? 6 : 7;
        const pulseProgress = (pulseTime * 0.25) % 1;

        // Find index of current pipeline stage based on travel progress
        const stageIndex = Math.floor(pulseProgress * (pipelineStages - 1));
        const nextStageIndex = stageIndex + 1;
        const localProgress = (pulseProgress * (pipelineStages - 1)) % 1;

        const p1 = nodes[stageIndex];
        const p2 = nodes[nextStageIndex];

        if (p1 && p2) {
          const pulseX = p1.x + (p2.x - p1.x) * localProgress;
          const pulseY = p1.y + (p2.y - p1.y) * localProgress;

          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
          ctx.fillStyle = activeColors.textBright;
          ctx.shadowBlur = 10;
          ctx.shadowColor = activeColors.textPrimary;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // 5. Draw Nodes & Labels
      for (let i = 0; i < NODE_COUNT; i++) {
        const node = nodes[i];
        if (node.opacity < 0.01) continue;

        ctx.globalAlpha = node.opacity;

        // Inner solid circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.targetColor;
        ctx.fill();

        // Glowing outer halo for the Product node (Scene 6)
        if (state.activeScene === 6 && i === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.r + 12 + Math.sin(pulseTime * 2.5) * 4, 0, Math.PI * 2);
          ctx.strokeStyle = activeColors.lineStrong;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Render label if present
        if (node.label) {
          ctx.fillStyle = activeColors.textPrimary;
          ctx.font = '500 9px var(--font-sans)';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            node.label.toUpperCase(),
            node.x + node.r + 12,
            node.y
          );
        }
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, theme]);

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
