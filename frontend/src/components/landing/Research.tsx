"use client";

import { useEffect, useRef } from "react";

const methodologies = [
  "Temporal Graph Analysis",
  "Unsupervised Anomaly Detection",
  "Coordination Emergence",
  "Counterfactual Network Analysis",
  "Temporal Edge Prediction",
  "AI-Assisted Investigation",
];

export default function Research() {
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
      { threshold: 0.15 }
    );
    section.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="research" className="py-28 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.04)_0%,transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="reveal opacity-0 inline-block text-[11px] tracking-[0.3em] uppercase font-mono text-violet-400/60 mb-6">
          Academic Foundation
        </span>

        <h2 className="reveal opacity-0 delay-100 text-4xl sm:text-5xl font-bold tracking-tight text-white mb-8">
          Built as a{" "}
          <span className="text-gradient-cyan">Research Platform.</span>
        </h2>

        <p className="reveal opacity-0 delay-200 text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12">
          ARGUS ECHO combines established techniques from graph theory, unsupervised machine learning,
          and temporal network analysis into a unified investigative intelligence pipeline.
        </p>

        {/* Methodology grid */}
        <div className="reveal opacity-0 delay-300 grid grid-cols-2 sm:grid-cols-3 gap-3 mb-12 max-w-2xl mx-auto">
          {methodologies.map((m, i) => (
            <div
              key={m}
              className="glass-card px-4 py-3 text-[12px] text-slate-300 font-medium tracking-wide text-center"
            >
              {m}
            </div>
          ))}
        </div>

        {/* Badge */}
        <div className="reveal opacity-0 delay-400 inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8">
          <svg className="w-4 h-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <span className="text-[11px] tracking-[0.15em] uppercase text-cyan-300/80 font-mono">
            Research-Ready Architecture
          </span>
        </div>

        <div className="reveal opacity-0 delay-500 block">
          <a
            href="#pipeline"
            className="px-8 py-3.5 text-[13px] font-semibold tracking-wider text-slate-300 glass rounded-full hover:border-slate-500 transition-all duration-300 inline-block"
          >
            View Methodology →
          </a>
        </div>
      </div>
    </section>
  );
}
