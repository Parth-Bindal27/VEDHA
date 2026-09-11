"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0520] to-[#050510]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)]" />

      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute bottom-40 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />

      {/* Content wrapper */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="text-xs tracking-[0.2em] text-white font-semibold">AI POWERED</span>
              <span className="text-white/40">•</span>
              <span className="text-xs tracking-[0.2em] text-white font-semibold">NETWORK INTELLIGENCE</span>
              <span className="text-white/40">•</span>
              <span className="text-xs tracking-[0.2em] text-white font-semibold">HUMAN IN THE LOOP</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              <span className="text-white">From Transactions</span>
              <br />
              <span className="to-purple-500 from-pink-500 bg-gradient-to-r bg-clip-text text-transparent">to Truth</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
              ARGUS ECHO detects hidden financial networks by understanding how transactions, people and patterns evolve over time.
            </p>

            {/* Trusted badge */}
            <div className="text-sm text-slate-400 mb-8 font-medium">
              Trusted for a safer, more transparent financial future
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/console"
                className="group px-8 py-3 text-base font-semibold tracking-wider text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:shadow-2xl hover:shadow-pink-500/30 transition-all duration-300 flex items-center gap-2"
              >
                Launch Investigation
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <button className="group px-8 py-3 text-base font-semibold tracking-wider text-white border border-white/30 rounded-full hover:bg-white/5 transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right - Globe with annotations */}
          <div className="relative h-96 lg:h-[500px] flex items-center justify-center">
            {/* Animated globe SVG */}
            <div className="relative w-full h-full max-w-md">
              {/* Globe */}
              <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="globeGradient" cx="35%" cy="35%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.1" />
                  </radialGradient>
                </defs>
                {/* Main globe circle */}
                <circle cx="200" cy="200" r="160" fill="url(#globeGradient)" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                {/* Glow circle */}
                <circle cx="200" cy="200" r="160" fill="none" stroke="#a78bfa" strokeWidth="2" opacity="0.2" />
                
                {/* Network points and lines */}
                <circle cx="200" cy="140" r="8" fill="#ec4899" opacity="0.8" />
                <circle cx="250" cy="200" r="8" fill="#ec4899" opacity="0.7" />
                <circle cx="200" cy="260" r="8" fill="#06b6d4" opacity="0.6" />
                <circle cx="150" cy="200" r="8" fill="#06b6d4" opacity="0.5" />
                
                {/* Lines connecting points */}
                <line x1="200" y1="140" x2="250" y2="200" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                <line x1="250" y1="200" x2="200" y2="260" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                <line x1="200" y1="260" x2="150" y2="200" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                <line x1="150" y1="200" x2="200" y2="140" stroke="#a78bfa" strokeWidth="1" opacity="0.3" />
                
                {/* Extra nodes */}
                <circle cx="220" cy="160" r="4" fill="#60a5fa" opacity="0.5" />
                <circle cx="240" cy="230" r="5" fill="#ec4899" opacity="0.4" />
                <circle cx="170" cy="240" r="4" fill="#06b6d4" opacity="0.5" />
              </svg>

              {/* Floating annotation boxes */}
              {/* Network Detected */}
              <div className="absolute top-8 right-12 bg-slate-900/80 backdrop-blur border border-white/10 rounded-lg px-3 py-2 w-40">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white">Network Detected</div>
                    <div className="text-xs text-slate-400">Hidden relationships identified</div>
                  </div>
                </div>
              </div>

              {/* Anomaly Detected */}
              <div className="absolute top-24 right-0 bg-slate-900/80 backdrop-blur border border-white/10 rounded-lg px-3 py-2 w-40">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 9v2m0 4v2m0-12a9 9 0 110 18 9 9 0 010-18z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white">Anomaly Detected</div>
                    <div className="text-xs text-slate-400">Unusual transaction behavior identified</div>
                  </div>
                </div>
              </div>

              {/* Pattern Recognised */}
              <div className="absolute bottom-32 right-8 bg-slate-900/80 backdrop-blur border border-white/10 rounded-lg px-3 py-2 w-40">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white">Pattern Recognised</div>
                    <div className="text-xs text-slate-400">Structural fingerprint of financial crime</div>
                  </div>
                </div>
              </div>

              {/* Prediction Generated */}
              <div className="absolute bottom-16 left-12 bg-slate-900/80 backdrop-blur border border-white/10 rounded-lg px-3 py-2 w-40">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold text-white">Prediction Generated</div>
                    <div className="text-xs text-slate-400">Likely next movement predicted from network</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent" />
    </section>
  );
}
