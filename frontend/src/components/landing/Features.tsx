"use client";

import { useEffect, useRef } from "react";

const features = [
  {
    title: "Temporal Graph Intelligence",
    desc: "Model how networks interact and evolve over time.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Anomaly & Coordination Detection",
    desc: "Spot unusual behaviors and synchronized activities.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
      </svg>
    ),
  },
  {
    title: "Crime Genome",
    desc: "Fingerprints of financial crime.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1-8.313-12.454z" />
      </svg>
    ),
  },
  {
    title: "Network Surgery",
    desc: "Measure removal of entities to measure structural impact.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
      </svg>
    ),
  },
  {
    title: "Predict Next Move",
    desc: "Anticipate likely future transactions using network context.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
  },
  {
    title: "AI Investigator",
    desc: "Generate investigator briefs and SAR drafts (with human oversight).",
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
    <section id="features" ref={sectionRef} className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs tracking-[0.2em] text-slate-400 font-semibold">OUR CAPABILITIES</span>
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            More than a Tool.
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">A Safer Financial Future.</span>
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto mt-6">
            ARGUS ECHO empowers investigators, institutions and regulators with the intelligence to see beyond individual transactions and uncover the bigger picture.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="feature-card opacity-0 glass p-8 relative overflow-hidden group rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Hover glow */}
              <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl bg-pink-500/0 group-hover:bg-pink-500/10 transition-all duration-700" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 flex items-center justify-center text-pink-400 mb-6 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-white tracking-wide mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
