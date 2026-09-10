"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState, useEffect } from "react";

// Dynamically import react-force-graph-3d to avoid SSR issues
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function LiveGraph({ graphData, anomalies, phase = "BASELINE" }: { graphData: any; anomalies: any[]; phase?: string }) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Measure the container and update dimensions
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: Math.floor(rect.width), height: Math.floor(rect.height) });
      }
    };

    // Initial measurement after a short delay to let layout settle
    const timer = setTimeout(updateDimensions, 100);

    // ResizeObserver for subsequent changes
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(container);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Auto-fit camera when graph first gets data
  useEffect(() => {
    if (graphData.nodes.length > 0 && fgRef.current) {
      setTimeout(() => {
        try {
          fgRef.current?.zoomToFit?.(400, 50);
        } catch (e) {
          // ignore if not ready
        }
      }, 500);
    }
  }, [graphData.nodes.length > 0]); // only on first data arrival

  // Helper to check if a node is highly anomalous
  const isAnomalous = useCallback(
    (nodeId: string) => {
      const anomaly = anomalies.find((a: any) => a.node === nodeId || a.node_id === nodeId);
      return anomaly && (anomaly.score > 80 || anomaly.anomaly_score > 80);
    },
    [anomalies]
  );

  return (
    <div ref={containerRef} className="w-full h-full bg-black/40 border border-slate-800 rounded-xl overflow-hidden relative" style={{ minHeight: "400px" }}>
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="text-xs font-mono text-slate-400 bg-black/60 px-3 py-1 rounded-full border border-slate-700 w-max">
          NETWORK TOPOLOGY
        </div>
        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-800 w-max">
          PHASE: {phase}
        </div>
      </div>

      {/* Node/edge count diagnostic overlay */}
      <div className="absolute top-4 right-4 z-10 text-[10px] font-mono text-slate-500 bg-black/60 px-2 py-1 rounded border border-slate-800">
        N:{graphData.nodes.length} E:{graphData.links.length}
      </div>
      
      {/* Legend overlay for Prediction */}
      {graphData.links.some((l: any) => l.predicted) && (
        <div className="absolute bottom-4 left-4 z-10 text-[10px] font-mono text-amber-500 bg-amber-950/40 px-2 py-1 rounded border border-amber-900/50">
          -- PREDICTED NEXT EDGE --
        </div>
      )}

      {dimensions.width > 0 && dimensions.height > 0 && (
        <ForceGraph3D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          nodeColor={(node: any) => (isAnomalous(node.id) ? "rgba(239, 68, 68, 1)" : "rgba(56, 189, 248, 0.7)")}
          nodeRelSize={6}
          linkColor={(link: any) => link.predicted ? "rgba(245, 158, 11, 0.8)" : "rgba(255, 255, 255, 0.15)"}
          linkWidth={(link: any) => link.predicted ? 2 : 1}
          linkDirectionalArrowLength={(link: any) => link.predicted ? 5 : 0}
          linkDirectionalParticles={(link: any) => link.predicted ? 0 : (link.amount > 5000 ? 4 : 2)}
          linkDirectionalParticleWidth={(link: any) => link.predicted ? 0 : (link.amount > 5000 ? 2 : 1)}
          linkDirectionalParticleSpeed={0.01}
          backgroundColor="rgba(0,0,0,0)"
          enableNodeDrag={false}
        />
      )}
    </div>
  );
}
