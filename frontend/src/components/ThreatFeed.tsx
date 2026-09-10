import { AlertCircle, ArrowRight } from "lucide-react";

export default function ThreatFeed({ transactions, anomalies }: { transactions: any[]; anomalies: any[] }) {
  // Get recent 10 transactions
  const recentTxs = [...transactions].reverse().slice(0, 10);

  return (
    <div className="h-full flex flex-col bg-black/40 border border-slate-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-sm font-semibold text-slate-200 tracking-wider flex items-center gap-2">
          <AlertCircle size={16} className="text-red-500" />
          THREAT FEED
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {anomalies.map((a: any, i: number) => (
          <div key={`anom-${i}`} className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="text-red-400 font-mono text-xs">DETECTED ANOMALY</span>
              <span className="text-red-500 text-xs font-bold">{a.score}% RISK</span>
            </div>
            <p className="text-sm text-slate-300 font-mono">Entity: {a.node}</p>
          </div>
        ))}
        
        <div className="pt-4 pb-2">
          <span className="text-xs text-slate-500 font-mono">LIVE STREAM</span>
        </div>

        {recentTxs.map((tx: any, i: number) => (
          <div key={tx.id} className="p-2 border-l-2 border-slate-700 bg-slate-800/20 text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="truncate w-20">{tx.source}</span>
              <ArrowRight size={12} />
              <span className="truncate w-20">{tx.dest}</span>
            </div>
            <div className="text-emerald-400 mt-1">${tx.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
