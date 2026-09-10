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
               <div className="text-center mb-4">
                 <div className="text-2xl text-red-400 font-bold">{genome.overall_score.toFixed(0)}</div>
                 <div className="text-xs text-slate-500">STRUCTURAL RISK FINGERPRINT</div>
               </div>
               <div className="space-y-3 text-xs font-mono">
                 {[
                   { label: "FAN-IN", value: genome.signals.fan_in },
                   { label: "FAN-OUT", value: genome.signals.fan_out },
                   { label: "LAYERING", value: genome.signals.layering },
                   { label: "INTERMEDIARY REUSE", value: genome.signals.intermediary_reuse },
                   { label: "TEMPORAL SYNC", value: genome.signals.temporal_synchrony }
                 ].map((sig, i) => (
                   <div key={i}>
                     <div className="flex justify-between mb-1">
                       <span className="text-slate-400">{sig.label}</span>
                       <span className="text-slate-300">{sig.value.toFixed(0)}</span>
                     </div>
                     <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, sig.value)}%` }}></div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}

        {/* NETWORK SURGERY */}
        {surgery && surgery.candidates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs text-slate-500 font-mono mb-2 flex items-center gap-2"><GitCommit size={12}/> NETWORK SURGERY</h3>
            <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-lg overflow-hidden">
               <div className="text-[10px] text-slate-500 font-mono mb-3 uppercase">Structural Analysis — Not Causal Proof</div>
               <div className="flex justify-between items-center bg-black/40 border border-slate-800 p-3 rounded mb-3">
                 <div className="text-center">
                   <div className="text-slate-500 text-[10px] mb-1 font-mono">BEFORE</div>
                   <div className="w-8 h-8 rounded-full border-2 border-red-500 mx-auto flex items-center justify-center opacity-80 bg-red-900/20"><GitCommit size={14} className="text-red-400"/></div>
                 </div>
                 <div className="text-slate-600">→</div>
                 <div className="text-center">
                   <div className="text-slate-500 text-[10px] mb-1 font-mono">SURGERY</div>
                   <div className="text-xs font-mono text-purple-400">Remove {surgery.candidates[0].node_id}</div>
                 </div>
                 <div className="text-slate-600">→</div>
                 <div className="text-center">
                   <div className="text-slate-500 text-[10px] mb-1 font-mono">AFTER</div>
                   <div className="w-8 h-8 rounded-full border-2 border-slate-700 border-dashed mx-auto flex items-center justify-center opacity-30"><GitCommit size={14} className="text-slate-600"/></div>
                 </div>
               </div>
               
               <div className="flex justify-between items-center text-xs font-mono px-1">
                 <span className="text-slate-400">Disruption Impact:</span>
                 <span className="text-purple-400 font-bold">{surgery.candidates[0].disruption_impact.toFixed(1)}</span>
               </div>
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
