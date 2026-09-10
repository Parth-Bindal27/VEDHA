"use client";

import { useEffect, useState, useRef } from "react";
import LiveGraph from "../components/LiveGraph";
import ThreatFeed from "../components/ThreatFeed";
import InvestigationPanel from "../components/InvestigationPanel";

export default function Dashboard() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [currentPhase, setCurrentPhase] = useState<number>(0);
  const [investigationCase, setInvestigationCase] = useState<any>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:8000/ws/stream");

    wsRef.current.onopen = () => {
      console.log("WebSocket connected.");
      wsRef.current?.send("start");
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === "reset") {
        setGraphData({ nodes: [], links: [] });
        setTransactions([]);
        setAnomalies([]);
        setCurrentPhase(0);
        setInvestigationCase(null);
      } else if (data.type === "transaction" && data.transaction_event) {
        setGraphData({ nodes: data.graph.nodes, links: data.graph.edges });
        setTransactions((prev) => [...prev, data.transaction_event.transaction]);
        setCurrentPhase(data.transaction_event.metadata.phase);
        
        if (data.intelligence) {
          setAnomalies(data.intelligence.top_suspicious_nodes || []);
          if (data.intelligence.investigation_case) {
            setInvestigationCase(data.intelligence.investigation_case);
          }
        }
      }
    };

    return () => {
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="h-screen w-full bg-black text-slate-200 p-4 font-sans flex flex-col gap-4">
      <header className="flex items-center justify-between px-2">
        <h1 className="text-xl font-bold tracking-widest text-slate-100">ARGUS ECHO</h1>
        <div className="flex items-center gap-4 text-sm font-mono bg-slate-900 px-4 py-1.5 rounded border border-slate-700">
          <span>STATUS: <span className="text-emerald-400 font-bold">LIVE</span></span>
          <span className="text-slate-500">|</span>
          <span>PHASE: <span className="text-blue-400 font-bold">{currentPhase}</span></span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-3">
          <ThreatFeed transactions={transactions} anomalies={anomalies} />
        </div>
        <div className="col-span-6">
          <LiveGraph graphData={graphData} anomalies={anomalies} />
        </div>
        <div className="col-span-3">
          <InvestigationPanel anomalies={anomalies} invCase={investigationCase} />
        </div>
      </div>
    </div>
  );
}
