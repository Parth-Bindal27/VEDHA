"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    title: "Crime Genome",
    desc: "Fingerprint the structural behavior of an emerging network. Quantify fan-in, layering, intermediary reuse, and temporal synchrony into a unified behavioral score.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
        <path d="M17 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
      </svg>
    ),
  },
  {
    title: "Echo Reconstruction",
    desc: "Rewind the network through historical snapshots and identify the precise moment when suspicious behavior first emerged from normal activity.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Network Surgery",
    desc: "Remove suspected nodes in a counterfactual sandbox to measure structural disruption. Understand which actors are structurally critical.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
  {
    title: "Next-Edge Prediction",
    desc: "Estimate the most likely future relationship from observed topology, behavioral velocity, and structural momentum. See where the network may move next.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
  {
    title: "AI Investigator",
    desc: "Transform machine-generated evidence into a human-reviewable investigation brief. Generate SAR draft narratives from structured intelligence. Always requires human review.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("animate-fade-in-up");
        });
      },
      { threshold: 0.1 }
    );
    section.querySelectorAll(".feature-card").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            From Anomaly
            <br />
            to <span className="text-gradient-cyan">Explanation.</span>
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Five intelligence modules that turn raw behavioral signals into actionable, explainable evidence.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`feature-card opacity-0 glass-card p-7 relative overflow-hidden group ${
                i >= 3 ? "sm:col-span-1 lg:col-span-1" : ""
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all duration-700" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl glass flex items-center justify-center text-cyan-400/70 mb-5 group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-all duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-base font-bold text-white tracking-wide mb-3">{feature.title}</h3>
                <p className="text-[13px] text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>

              {/* Bottom decoration */}
              <div className="absolute bottom-3 right-3 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <svg width="48" height="48" viewBox="0 0 48 48">
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                  <circle cx="36" cy="12" r="2" fill="currentColor" />
                  <circle cx="24" cy="36" r="3" fill="currentColor" />
                  <line x1="12" y1="12" x2="36" y2="12" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="36" y1="12" x2="24" y2="36" stroke="currentColor" strokeWidth="0.5" />
                  <line x1="24" y1="36" x2="12" y2="12" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
