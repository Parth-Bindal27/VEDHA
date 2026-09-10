"use client";

const capabilities = [
  "Real-Time",
  "Temporal Graph",
  "Unsupervised ML",
  "Counterfactual Analysis",
  "Next-Edge Prediction",
  "AI Investigator",
];

export default function TrustStrip() {
  return (
    <section className="relative py-6 border-y border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {capabilities.map((cap, i) => (
            <div key={cap} className="flex items-center gap-2.5">
              <span className="w-1 h-1 rounded-full bg-cyan-500/40" />
              <span className="text-[11px] tracking-[0.2em] uppercase font-mono text-slate-500">
                {cap}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
