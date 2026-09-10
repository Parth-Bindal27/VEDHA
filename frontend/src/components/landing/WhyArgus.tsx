"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    num: "01",
    title: "Static Rules",
    desc: "Thresholds and predefined patterns. Flag individual transactions that exceed limits.",
    accent: "rgba(100, 116, 139, 0.3)",
  },
  {
    num: "02",
    title: "ARGUS ECHO",
    desc: "Behavior + topology + temporal coordination. Observe how relationships evolve across time.",
    accent: "rgba(34, 211, 238, 0.3)",
    highlight: true,
  },
  {
    num: "03",
    title: "Early Intelligence",
    desc: "Understand how suspicious networks form and where they may move next — before they execute.",
    accent: "rgba(99, 102, 241, 0.3)",
  },
];

export default function WhyArgus() {
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
      { threshold: 0.15 }
    );
    const children = section.querySelectorAll(".reveal");
    children.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="intelligence" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="reveal opacity-0 text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            Rules Detect Events.
            <br />
            <span className="text-gradient-cyan">ARGUS ECHO Detects Emergence.</span>
          </h2>
          <p className="reveal opacity-0 delay-200 max-w-2xl mx-auto text-base text-slate-400 leading-relaxed">
            Traditional transaction monitoring evaluates isolated events or predefined patterns.
            ARGUS ECHO observes how relationships evolve through time.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={card.num}
              className={`reveal opacity-0 glass-card p-8 relative overflow-hidden group ${
                card.highlight ? "border-cyan-500/20" : ""
              }`}
              style={{ animationDelay: `${0.2 + i * 0.15}s` }}
            >
              {/* Background glow */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: card.accent }}
              />

              <div className="relative z-10">
                <span className="text-[11px] font-mono tracking-[0.2em] text-slate-600">{card.num}</span>
                <h3 className={`text-xl font-bold mt-3 mb-4 ${card.highlight ? "text-gradient-cyan" : "text-white"}`}>
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{card.desc}</p>
              </div>

              {/* Subtle animated graph lines (decorative) */}
              <svg className="absolute bottom-0 right-0 w-32 h-24 opacity-[0.04]" viewBox="0 0 128 96">
                <path d="M10 80 L40 50 L70 65 L100 30 L120 40" stroke="currentColor" fill="none" strokeWidth="1.5" />
                <circle cx="40" cy="50" r="3" fill="currentColor" />
                <circle cx="70" cy="65" r="2" fill="currentColor" />
                <circle cx="100" cy="30" r="3" fill="currentColor" />
              </svg>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
