"use client";

import { useEffect, useRef } from "react";

const steps = [
  { num: "01", label: "Transaction Stream", desc: "Raw financial events flowing in real-time" },
  { num: "02", label: "Temporal Graph", desc: "Relationships mapped across time" },
  { num: "03", label: "Behavioural Intelligence", desc: "Feature extraction from network topology" },
  { num: "04", label: "Coordination Emergence", desc: "Detect synchronized multi-actor patterns" },
  { num: "05", label: "Network Phase Change", desc: "Identify structural state transitions" },
  { num: "06", label: "Crime Genome", desc: "Fingerprint the network's behavioral DNA" },
  { num: "07", label: "Echo Reconstruction", desc: "Rewind to first emergence of suspicious behavior" },
  { num: "08", label: "Network Surgery", desc: "Counterfactual disruption analysis" },
  { num: "09", label: "Next-Edge Prediction", desc: "Estimate the network's likely next move" },
  { num: "10", label: "AI Investigator", desc: "Generate human-reviewable case briefs" },
];

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    const children = section.querySelectorAll(".pipeline-step");
    children.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="pipeline" className="py-28 px-6 relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-[11px] tracking-[0.3em] uppercase font-mono text-cyan-500/60 mb-4 block">
            Intelligence Architecture
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            From Transaction to{" "}
            <span className="text-gradient-cyan">Decision</span>
          </h2>
        </div>

        {/* Pipeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-blue-500/20 to-violet-500/10" />

          <div className="space-y-1">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="pipeline-step opacity-0 relative flex items-start gap-6 py-4 group"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Node dot */}
                <div className="relative z-10 flex-shrink-0 mt-1">
                  <div className="w-[47px] h-[47px] rounded-xl glass flex items-center justify-center group-hover:border-cyan-500/30 transition-all duration-300">
                    <span className="text-[11px] font-mono font-bold text-cyan-400/70 group-hover:text-cyan-300 transition-colors">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 glass-card px-6 py-4 group-hover:border-cyan-500/15 transition-all duration-300">
                  <h3 className="text-sm font-bold text-white tracking-wide mb-1">{step.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}

            {/* Final: Human Decision */}
            <div className="pipeline-step opacity-0 relative flex items-start gap-6 py-4" style={{ animationDelay: "0.85s" }}>
              <div className="relative z-10 flex-shrink-0 mt-1">
                <div className="w-[47px] h-[47px] rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-600/5 border border-cyan-400/15">
                <h3 className="text-sm font-bold text-cyan-300 tracking-wide mb-1">Human Decision</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  All intelligence is reviewed by qualified investigators. ARGUS ECHO assists — never decides.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
