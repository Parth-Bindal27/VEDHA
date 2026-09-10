import { ShieldAlert, Activity, GitCommit, Clock } from "lucide-react";

export default function InvestigationPanel({ anomalies, invCase }: { anomalies: any[]; invCase: any }) {
  const topAnomaly = anomalies.sort((a: any, b: any) => b.score - a.score)[0];

  if (!invCase && (!topAnomaly || topAnomaly.score < 80)) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-black/40 border border-slate-800 rounded-xl p-6 text-center">
        <Activity size={32} className="text-slate-600 mb-4" />
        <h3 className="text-slate-400 font-mono text-sm">System Normal</h3>
        <p className="text-slate-600 text-xs mt-2">No critical structural anomalies detected in the current window.</p>
      </div>
    );
  }

  const action = invCase?.recommended_action || "MONITOR";
  
  const genome = invCase?.crime_genome;
  const surgery = invCase?.network_surgery;
  const echo = invCase?.echo_reconstruction;

  return (
    <div className="h-full flex flex-col bg-black/40 border border-red-900/40 rounded-xl overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse"></div>
      <div className="p-4 border-b border-slate-800 bg-red-950/20 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-red-400 tracking-wider flex items-center gap-2">
            <ShieldAlert size={16} />
            AI INVESTIGATOR
          </h2>
          <span className="text-xs font-mono bg-red-500/20 text-red-400 px-2 py-1 rounded">{action}</span>
        </div>
        <div className="flex items-center justify-between">
           <span className="text-xs text-slate-400 font-mono">INVESTIGATION PRIORITY</span>
           <span className="text-lg text-red-400 font-bold font-mono">{invCase.investigation_priority.toFixed(1)}/100</span>
        </div>
      </div>
      
      <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
        {/* ECHO TIMELINE */}
        {echo && (
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-2"><Clock size={12}/> ECHO RECONSTRUCTION</h3>
            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400">First Emergence:</span>
                <span className="text-xs text-red-400 font-mono">{echo.first_emergence}</span>
              </div>
              <div className="flex gap-1 h-8 items-end">
                 {echo.timeline.map((pt: any, i: number) => (
                    <div key={i} className="flex-1 bg-red-500/40 hover:bg-red-500 transition-colors" style={{height: `${Math.max(10, pt.score)}%`}} title={`${pt.state}: ${pt.score}`} />
                 ))}
              </div>
              <div className="mt-2 text-xs text-slate-400">
                {echo.evidence.map((e: string, i: number) => <div key={i}>• {e}</div>)}
              </div>
            </div>
          </div>
        )}

        {/* CRIME GENOME */}
        {genome && (
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 font-mono mb-2">CRIME GENOME</h3>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg">
               <div className="text-center mb-3">
                 <div className="text-2xl text-red-400 font-bold">{genome.overall_score.toFixed(0)}</div>
                 <div className="text-xs text-slate-500">BEHAVIOURAL RISK</div>
               </div>
               <div className="space-y-2 text-xs font-mono">
                 <div className="flex justify-between"><span>FAN-IN</span><span className="text-slate-300">{genome.signals.fan_in.toFixed(0)}</span></div>
                 <div className="flex justify-between"><span>FAN-OUT</span><span className="text-slate-300">{genome.signals.fan_out.toFixed(0)}</span></div>
                 <div className="flex justify-between"><span>LAYERING</span><span className="text-slate-300">{genome.signals.layering.toFixed(0)}</span></div>
                 <div className="flex justify-between"><span>INTERMEDIARY REUSE</span><span className="text-slate-300">{genome.signals.intermediary_reuse.toFixed(0)}</span></div>
                 <div className="flex justify-between"><span>TEMPORAL SYNC</span><span className="text-slate-300">{genome.signals.temporal_synchrony.toFixed(0)}</span></div>
               </div>
            </div>
          </div>
        )}

        {/* NETWORK SURGERY */}
        {surgery && surgery.candidates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-2"><GitCommit size={12}/> NETWORK SURGERY</h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg overflow-hidden">
               <table className="w-full text-xs font-mono text-left">
                 <thead className="bg-slate-800 text-slate-400">
                   <tr>
                     <th className="p-2">Candidate</th>
                     <th className="p-2 text-right">Disruption Impact</th>
                   </tr>
                 </thead>
                 <tbody>
                   {surgery.candidates.slice(0,3).map((c: any, i: number) => (
                     <tr key={i} className="border-b border-slate-800/50 last:border-0">
                       <td className="p-2 text-slate-300">{c.node_id}</td>
                       <td className="p-2 text-right text-red-400">{c.disruption_impact.toFixed(1)}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              {surgery.candidates[0].evidence.map((e: string, i: number) => <div key={i}>• {e}</div>)}
            </div>
          </div>
        )}
        {/* PREDICTION */}
        {invCase?.predicted_next_edges && invCase.predicted_next_edges.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 font-mono mb-2">NEXT-EDGE PREDICTION</h3>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
               <div className="text-xs font-mono text-slate-400 mb-1">LIKELY NEXT MOVEMENT</div>
               <div className="text-sm font-bold text-red-400 mb-2">
                 {invCase.predicted_next_edges[0].source} → {invCase.predicted_next_edges[0].target}
               </div>
               <div className="flex justify-between text-xs font-mono mb-2">
                 <span>Score: <span className="text-slate-300">{invCase.predicted_next_edges[0].prediction_score.toFixed(1)}</span></span>
                 <span>Amt: <span className="text-slate-300">${invCase.predicted_next_edges[0].estimated_amount_range.min} - ${invCase.predicted_next_edges[0].estimated_amount_range.max}</span></span>
               </div>
               <div className="text-xs text-slate-500">
                 {invCase.predicted_next_edges[0].evidence.map((e: string, i: number) => <div key={i}>• {e}</div>)}
               </div>
            </div>
          </div>
        )}

        {/* INVESTIGATOR REPORT */}
        {invCase?.investigator_report && (
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 font-mono mb-2">INVESTIGATOR BRIEF</h3>
            <div className="bg-red-950/20 border border-red-900/40 rounded-lg p-4 text-xs font-mono text-slate-300 space-y-3">
              <div><strong className="text-red-400">SUMMARY:</strong> {invCase.investigator_report.summary}</div>
              <div>
                <strong className="text-red-400">KEY FINDINGS:</strong>
                {invCase.investigator_report.key_findings.map((f: string, i: number) => <div key={i} className="ml-2">• {f}</div>)}
              </div>
              <div className="bg-red-500/10 p-2 border border-red-500/20 mt-3 text-center">
                 <div className="text-red-400 font-bold tracking-widest">{invCase.investigator_report.recommended_action}</div>
                 {invCase.investigator_report.human_review_required && <div className="text-[10px] text-red-500/70 mt-1">HUMAN REVIEW REQUIRED</div>}
              </div>
              
              {invCase.investigator_report.sar_draft && (
                <div className="mt-4 border-t border-slate-800/50 pt-3">
                  <div className="text-xs font-mono text-red-500 mb-2">SAR DRAFT PREVIEW:</div>
                  <div className="bg-black/50 p-3 rounded text-[10px] text-slate-400 font-mono whitespace-pre-wrap">
                    {invCase.investigator_report.sar_draft}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
