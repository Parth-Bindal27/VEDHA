"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import LiveGraph from "../../components/LiveGraph";
import ThreatFeed from "../../components/ThreatFeed";
import InvestigationPanel from "../../components/InvestigationPanel";
import ControlBar from "../../components/ControlBar";

export default function Dashboard() {
  const [graphData, setGraphData] = useState<{nodes: any[], links: any[]}>({ nodes: [], links: [] });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [investigationCase, setInvestigationCase] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let wsUrl = process.env.NEXT_PUBLIC_WS_URL;
    if (!wsUrl) {
       // fallback for local dev if env not set
       const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
       const host = window.location.hostname === "localhost" ? "localhost:8000" : window.location.host;
       wsUrl = `${protocol}//${host}/ws/stream`;
    }
    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      console.log("WebSocket connected.");
      wsRef.current?.send("start");
    };

    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.type === "reset") {
          setGraphData({ nodes: [], links: [] });
          setTransactions([]);
          setAnomalies([]);
          setCurrentPhase(0);
          setInvestigationCase(null);
        } else if (data.type === "transaction" && data.transaction_event) {
          // Build the links array from edges + predicted edges
          const edges = data.graph?.edges || [];
          const links = edges.map((e: any) => ({
            source: e.source,
            target: e.target,
            transaction_count: e.transaction_count,
            total_amount: e.total_amount,
            predicted: false,
          }));

          // Add predicted edges if available
          if (data.intelligence?.predictions) {
            data.intelligence.predictions.forEach((p: any) => {
              links.push({
                source: p.source,
                target: p.target,
                predicted: true,
                total_amount: 0,
                transaction_count: 0,
              });
            });
          }

          const nodes = (data.graph?.nodes || []).map((n: any) => ({
            id: n.id,
            transaction_count: n.transaction_count,
            total_sent: n.total_sent,
            total_received: n.total_received,
          }));

          console.log(`[ARGUS] Graph update: ${nodes.length} nodes, ${links.length} links`);

          setGraphData({ nodes, links });
          setTransactions((prev) => [...prev, data.transaction_event.transaction]);
          setCurrentPhase(data.transaction_event.metadata?.phase ?? 0);
          
          if (data.intelligence) {
            setAnomalies(data.intelligence.top_suspicious_nodes || []);
            if (data.intelligence.investigation_case) {
              setInvestigationCase(data.intelligence.investigation_case);
            }
          }
        }
      } catch (err) {
        console.error("[ARGUS] Error parsing WebSocket message:", err);
      }
    };

    wsRef.current.onerror = (err) => {
      console.error("[ARGUS] WebSocket error:", err);
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black text-slate-200 p-4 font-sans flex flex-col gap-4 overflow-hidden">
      <header className="flex items-center justify-between px-2 shrink-0">
        <h1 className="text-xl font-bold tracking-widest text-slate-100">ARGUS ECHO</h1>
        <ControlBar wsRef={wsRef} />
        <div className="flex items-center gap-4 text-sm font-mono bg-slate-900 px-4 py-1.5 rounded border border-slate-700">
          <span>STATUS: <span className="text-emerald-400 font-bold">LIVE</span></span>
          <span className="text-slate-500">|</span>
          <span>PHASE: <span className="text-blue-400 font-bold">{currentPhase}</span></span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 overflow-hidden">
        <div className="col-span-3 overflow-y-auto">
          <ThreatFeed transactions={transactions} anomalies={anomalies} invCase={investigationCase} />
        </div>
        <div className="col-span-6 min-h-0 h-full">
          <LiveGraph graphData={graphData} anomalies={anomalies} phase={
            currentPhase === 0 ? "BASELINE" :
            currentPhase === 1 ? "WEAK SIGNAL" :
            currentPhase === 2 ? "COORDINATION" :
            currentPhase === 3 ? "LAYERING" :
            currentPhase === 4 ? "EXPANSION" :
            "PREDICTION TARGET"
          } />
        </div>
        <div className="col-span-3 overflow-y-auto">
          <InvestigationPanel anomalies={anomalies} invCase={investigationCase} />
        </div>
      </div>
    </div>
  );
}
