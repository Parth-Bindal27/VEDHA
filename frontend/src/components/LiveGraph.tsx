"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";

// Dynamically import react-force-graph-3d to avoid SSR issues
const ForceGraph3D = dynamic(() => import("react-force-graph-3d"), { ssr: false });

export default function LiveGraph({ graphData, anomalies }: { graphData: any; anomalies: any[] }) {
  const fgRef = useRef<any>();

  // Helper to check if a node is highly anomalous
  const isAnomalous = useCallback(
    (nodeId: string) => {
      const anomaly = anomalies.find((a: any) => a.node === nodeId);
      return anomaly && anomaly.score > 80;
    },
    [anomalies]
  );

  return (
    <div className="w-full h-full bg-black/40 border border-slate-800 rounded-xl overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10 text-xs font-mono text-slate-400 bg-black/60 px-3 py-1 rounded-full border border-slate-700">
        NETWORK TOPOLOGY
      </div>
      <ForceGraph3D
        ref={fgRef}
        graphData={graphData}
        nodeColor={(node: any) => (isAnomalous(node.id) ? "rgba(239, 68, 68, 1)" : "rgba(56, 189, 248, 0.7)")}
        nodeRelSize={6}
        linkColor={(link: any) => "rgba(255, 255, 255, 0.1)"}
        linkWidth={1}
        linkDirectionalParticles={(link: any) => (link.amount > 5000 ? 4 : 2)}
        linkDirectionalParticleWidth={(link: any) => (link.amount > 5000 ? 2 : 1)}
        linkDirectionalParticleSpeed={0.01}
        backgroundColor="#050505"
        enableNodeDrag={false}
      />
    </div>
  );
}
