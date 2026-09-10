import { AlertCircle, ArrowRight, Activity, GitCommit, Eye, Database, Globe } from "lucide-react";
import { useMemo } from "react";

export default function ThreatFeed({ transactions, anomalies, invCase }: { transactions: any[]; anomalies: any[]; invCase?: any }) {
  const recentTxs = [...transactions].reverse().slice(0, 10);
  
  // Synthesize events
  const events = useMemo(() => {
    const evs = [];
    if (invCase) {
      if (invCase.investigation_priority > 60) {
        evs.push({ type: "INVESTIGATION ESCALATED", msg: `Priority: ${invCase.investigation_priority.toFixed(1)}/100`, icon: <AlertCircle size={14} className="text-red-500" />, time: "Just now" });
      }
      if (invCase.predicted_next_edges && invCase.predicted_next_edges.length > 0) {
        evs.push({ type: "NEXT EDGE PREDICTED", msg: `${invCase.predicted_next_edges[0].source} → ${invCase.predicted_next_edges[0].target}`, icon: <Eye size={14} className="text-amber-500" />, time: "Recent" });
      }
      if (invCase.network_surgery) {
        evs.push({ type: "STRUCTURAL SURGERY", msg: "Counterfactual analysis available", icon: <GitCommit size={14} className="text-purple-500" />, time: "Recent" });
      }
      if (invCase.echo_reconstruction) {
        evs.push({ type: "NETWORK FIRST EMERGED", msg: "Historical reconstruction complete", icon: <Database size={14} className="text-blue-500" />, time: "Recent" });
      }
      if (invCase.crime_genome) {
        evs.push({ type: "CRIME GENOME DETECTED", msg: "Structural fingerprint matched", icon: <Globe size={14} className="text-emerald-500" />, time: "Recent" });
      }
      if (invCase.network_phase_change) {
        evs.push({ type: "NETWORK PHASE CHANGE", msg: `Phase: ${invCase.network_phase_change}`, icon: <Activity size={14} className="text-cyan-500" />, time: "Recent" });
      }
    }
    
    // Add anomalies
    anomalies.slice(0, 3).forEach((a) => {
       const score = a.score || a.anomaly_score || a.risk_score;
       evs.push({ type: "BEHAVIOURAL ANOMALY", msg: `Entity ${a.node || a.node_id} at ${score?.toFixed(1)}% risk`, icon: <AlertCircle size={14} className="text-red-400" />, time: "Recent" });
    });
    
    return evs;
  }, [invCase, anomalies]);

  return (
    <div className="h-full flex flex-col bg-black/40 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-sm font-semibold text-slate-200 tracking-wider flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500" />
          THREAT FEED
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {events.map((ev, i) => (
          <div key={`ev-${i}`} className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg flex items-start gap-3">
             <div className="mt-1">{ev.icon}</div>
             <div>
               <div className="text-[10px] font-mono text-slate-500 mb-1">{ev.type}</div>
               <div className="text-xs text-slate-300 font-mono">{ev.msg}</div>
             </div>
          </div>
        ))}
        
        <div className="pt-4 pb-2 border-t border-slate-800 mt-4">
          <span className="text-xs text-slate-500 font-mono">LIVE STREAM</span>
        </div>

        {recentTxs.map((tx: any) => (
          <div key={tx.transaction_id || tx.id} className="p-2 border-l-2 border-slate-700 bg-slate-800/20 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="truncate w-20">{tx.sender || tx.source}</span>
              <ArrowRight size={12} />
              <span className="truncate w-20">{tx.receiver || tx.dest}</span>
            </div>
            <div className="text-emerald-400 mt-1">${(tx.amount || 0).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
