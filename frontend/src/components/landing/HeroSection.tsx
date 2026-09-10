"use client";

import Link from "next/link";
import NetworkVisualization from "./NetworkVisualization";

export default function HeroSection() {
  return (
    <section id="overview" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#050520] to-[#050510]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.03)_0%,transparent_70%)]" />

      {/* Network canvas */}
      <div className="absolute inset-0 pointer-events-none">
        <NetworkVisualization />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-[11px] tracking-[0.25em] text-cyan-400/80 font-mono uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse-glow" />
          Temporal Intelligence Engine
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          <span className="text-white">See the </span>
          <span className="text-gradient-cyan">Network</span>
          <br />
          <span className="text-white">Before It Becomes a </span>
          <span className="text-gradient-cyan">Threat.</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up delay-200 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed mb-10">
          ARGUS ECHO detects behavioral anomalies, reconstructs emerging networks,
          and predicts their next structural movement — before conventional rules catch up.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Link
            href="/console"
            className="group px-8 py-3.5 text-[13px] font-semibold tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-400 flex items-center gap-2"
          >
            Enter Intelligence Console
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="#research"
            className="px-8 py-3.5 text-[13px] font-semibold tracking-wider text-slate-300 glass rounded-full hover:border-slate-500 transition-all duration-300"
          >
            Explore the Research
          </a>
        </div>

        {/* Badges */}
        <div className="animate-fade-in-up delay-400 flex items-center justify-center gap-3 text-[10px] tracking-[0.3em] text-slate-600 font-mono uppercase">
          <span>Unsupervised</span>
          <span className="text-cyan-700">•</span>
          <span>Temporal</span>
          <span className="text-cyan-700">•</span>
          <span>Explainable</span>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent" />
    </section>
  );
}
