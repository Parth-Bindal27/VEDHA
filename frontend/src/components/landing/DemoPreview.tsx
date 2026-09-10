"use client";

import Link from "next/link";

export default function DemoPreview() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
            When the Network Changes,
            <br />
            <span className="text-gradient-cyan">ARGUS ECHO Shows You Why.</span>
          </h2>
        </div>

        {/* Console preview container */}
        <div className="glass-card p-1 glow-cyan relative overflow-hidden">
          {/* Mock titlebar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.04]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] font-mono text-slate-600 ml-3">ARGUS ECHO — Intelligence Console</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              <span className="text-[10px] font-mono text-emerald-400/60">STREAMING</span>
            </div>
          </div>

          {/* Mock console layout */}
          <div className="grid grid-cols-12 gap-0.5 p-0.5 min-h-[340px]">
            {/* Threat Feed mock */}
            <div className="col-span-3 bg-slate-950/80 rounded-lg p-4">
              <div className="text-[10px] font-mono text-slate-600 tracking-wider mb-3">THREAT FEED</div>
              <div className="space-y-2">
                {[
                  { label: "ACC_082 → ACC_015", risk: "low" },
                  { label: "SMURF_01 → HUB_01", risk: "high" },
                  { label: "ACC_044 → ACC_036", risk: "low" },
                  { label: "SMURF_03 → HUB_01", risk: "high" },
                  { label: "HUB_01 → LAYER_1", risk: "critical" },
                  { label: "ACC_071 → ACC_029", risk: "low" },
                  { label: "LAYER_1 → DEST_X", risk: "high" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                    <span className={`w-1 h-1 rounded-full ${
                      tx.risk === "critical" ? "bg-red-500" :
                      tx.risk === "high" ? "bg-amber-500" : "bg-slate-600"
                    }`} />
                    <span className="text-slate-500 truncate">{tx.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Graph preview mock */}
            <div className="col-span-6 bg-slate-950/80 rounded-lg p-4 relative overflow-hidden flex items-center justify-center">
              <div className="absolute top-3 left-3 text-[9px] font-mono text-slate-700 tracking-wider">NETWORK TOPOLOGY</div>
              <div className="absolute top-3 right-3 text-[9px] font-mono text-cyan-600">PHASE: COORDINATION</div>

              {/* Decorative mini graph */}
              <svg viewBox="0 0 240 160" className="w-full max-w-[240px] opacity-40">
                {/* Edges */}
                <line x1="60" y1="80" x2="120" y2="50" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
                <line x1="60" y1="80" x2="100" y2="110" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
                <line x1="120" y1="50" x2="180" y2="70" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
                <line x1="180" y1="70" x2="200" y2="40" stroke="rgba(245,158,11,0.4)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="100" y1="110" x2="160" y2="120" stroke="rgba(34,211,238,0.2)" strokeWidth="0.5" />
                <line x1="120" y1="50" x2="100" y2="110" stroke="rgba(34,211,238,0.3)" strokeWidth="0.5" />
                {/* Nodes */}
                <circle cx="60" cy="80" r="4" fill="rgba(56,189,248,0.5)" />
                <circle cx="120" cy="50" r="6" fill="rgba(239,68,68,0.7)" />
                <circle cx="100" cy="110" r="3" fill="rgba(56,189,248,0.4)" />
                <circle cx="180" cy="70" r="5" fill="rgba(34,211,238,0.6)" />
                <circle cx="200" cy="40" r="3" fill="rgba(245,158,11,0.5)" />
                <circle cx="160" cy="120" r="3" fill="rgba(56,189,248,0.3)" />
                <circle cx="40" cy="50" r="2" fill="rgba(148,163,184,0.2)" />
                <circle cx="200" cy="120" r="2" fill="rgba(148,163,184,0.2)" />
              </svg>
            </div>

            {/* Investigation panel mock */}
            <div className="col-span-3 bg-slate-950/80 rounded-lg p-4">
              <div className="text-[10px] font-mono text-slate-600 tracking-wider mb-3">INVESTIGATION</div>
              <div className="space-y-3">
                <div>
                  <div className="text-[9px] font-mono text-slate-600 mb-1">PRIORITY</div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full" style={{ width: "78%" }} />
                  </div>
                  <div className="text-[10px] font-mono text-amber-400 mt-1">78.4</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-600 mb-1">PHASE CHANGE</div>
                  <div className="text-[10px] font-mono text-cyan-400">COORDINATION</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-600 mb-1">GENOME SCORE</div>
                  <div className="text-[10px] font-mono text-violet-400">0.73</div>
                </div>
                <div>
                  <div className="text-[9px] font-mono text-slate-600 mb-1">PREDICTED EDGE</div>
                  <div className="text-[10px] font-mono text-amber-400">HUB → NEW_DEST</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/console"
            className="group inline-flex items-center gap-2 px-8 py-3.5 text-[13px] font-semibold tracking-wider text-white bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-400/25 rounded-full hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-400"
          >
            Open Live Console
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
