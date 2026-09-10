"use client";

import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number; // 0=normal, 1=weak, 2=suspicious, 3=hub
  opacity: number;
  pulseOffset: number;
}

interface Edge {
  from: number;
  to: number;
  opacity: number;
  particlePos: number;
  predicted: boolean;
}

export default function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = rect?.width || 800;
      h = rect?.height || 600;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // Generate deterministic nodes
    const seed = (s: number) => {
      let x = Math.sin(s) * 10000;
      return x - Math.floor(x);
    };

    const nodeCount = 55;
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const s = seed(i * 7 + 3);
      const s2 = seed(i * 13 + 7);
      let phase = 0;
      if (i < 5) phase = 3;       // hub cluster
      else if (i < 12) phase = 2;  // suspicious
      else if (i < 20) phase = 1;  // weak signal
      nodes.push({
        x: 0.15 * w + s * 0.7 * w,
        y: 0.15 * h + s2 * 0.7 * h,
        vx: (seed(i * 3) - 0.5) * 0.15,
        vy: (seed(i * 5) - 0.5) * 0.15,
        r: phase === 3 ? 4 : phase === 2 ? 3.5 : 2.5,
        phase,
        opacity: phase >= 2 ? 0.9 : 0.4 + seed(i) * 0.3,
        pulseOffset: seed(i * 11) * Math.PI * 2,
      });
    }

    // Generate edges
    const edges: Edge[] = [];
    // Hub connections
    for (let i = 1; i < 5; i++) {
      edges.push({ from: 0, to: i, opacity: 0.6, particlePos: seed(i) * 1, predicted: false });
    }
    // Suspicious → hub
    for (let i = 5; i < 12; i++) {
      const target = i % 5;
      edges.push({ from: i, to: target, opacity: 0.45, particlePos: seed(i * 2), predicted: false });
    }
    // Weak signal sparse
    for (let i = 12; i < 20; i++) {
      const target = 5 + (i % 7);
      edges.push({ from: i, to: target, opacity: 0.2, particlePos: seed(i * 3), predicted: false });
    }
    // Normal background mesh
    for (let i = 20; i < nodeCount; i++) {
      const target = 20 + Math.floor(seed(i * 17) * (nodeCount - 20));
      if (target !== i) {
        edges.push({ from: i, to: target, opacity: 0.08, particlePos: seed(i * 4), predicted: false });
      }
    }
    // Predicted edges
    edges.push({ from: 0, to: 20, opacity: 0.5, particlePos: 0, predicted: true });
    edges.push({ from: 2, to: 25, opacity: 0.4, particlePos: 0.3, predicted: true });

    let time = 0;

    const draw = () => {
      time += 0.004;
      ctx.clearRect(0, 0, w, h);

      // Subtle radial gradient background glow around hub
      const hubX = nodes[0].x, hubY = nodes[0].y;
      const grad = ctx.createRadialGradient(hubX, hubY, 0, hubX, hubY, 200);
      grad.addColorStop(0, "rgba(34, 211, 238, 0.04)");
      grad.addColorStop(0.5, "rgba(99, 102, 241, 0.02)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Move nodes slowly
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // Soft boundary bounce
        if (n.x < 40 || n.x > w - 40) n.vx *= -1;
        if (n.y < 40 || n.y > h - 40) n.vy *= -1;
        // Subtle drift variation
        n.vx += (seed(time * 100 + n.x) - 0.5) * 0.002;
        n.vy += (seed(time * 100 + n.y) - 0.5) * 0.002;
        // Damping
        n.vx *= 0.999;
        n.vy *= 0.999;
      }

      // Draw edges
      for (const e of edges) {
        const a = nodes[e.from], b = nodes[e.to];
        if (!a || !b) continue;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        if (e.predicted) {
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.3 + Math.sin(time * 3) * 0.15})`;
          ctx.setLineDash([4, 6]);
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = `rgba(56, 189, 248, ${e.opacity * 0.5})`;
          ctx.setLineDash([]);
          ctx.lineWidth = 0.6;
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated particle on edge
        e.particlePos = (e.particlePos + 0.002) % 1;
        const px = a.x + (b.x - a.x) * e.particlePos;
        const py = a.y + (b.y - a.y) * e.particlePos;
        const pSize = e.predicted ? 2.5 : 1.2;
        const pColor = e.predicted ? "rgba(245, 158, 11, 0.8)" : `rgba(34, 211, 238, ${e.opacity})`;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = Math.sin(time * 2 + n.pulseOffset) * 0.3 + 0.7;

        // Glow for suspicious/hub
        if (n.phase >= 2) {
          const glowR = n.r * 5;
          const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
          const glowColor = n.phase === 3 ? "rgba(239, 68, 68," : "rgba(34, 211, 238,";
          glow.addColorStop(0, `${glowColor}${0.15 * pulse})`);
          glow.addColorStop(1, `${glowColor}0)`);
          ctx.fillStyle = glow;
          ctx.fillRect(n.x - glowR, n.y - glowR, glowR * 2, glowR * 2);
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        if (n.phase === 3) {
          ctx.fillStyle = `rgba(239, 68, 68, ${n.opacity * pulse})`;
        } else if (n.phase === 2) {
          ctx.fillStyle = `rgba(34, 211, 238, ${n.opacity * pulse})`;
        } else if (n.phase === 1) {
          ctx.fillStyle = `rgba(56, 189, 248, ${n.opacity * 0.6})`;
        } else {
          ctx.fillStyle = `rgba(148, 163, 184, ${n.opacity * 0.3})`;
        }
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
}
