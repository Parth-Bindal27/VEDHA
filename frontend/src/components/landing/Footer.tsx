"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Left — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                A
              </div>
              <div>
                <div className="text-sm font-bold tracking-[0.15em] text-white">ARGUS ECHO</div>
              </div>
            </div>
            <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs">
              Temporal Financial Intelligence.
              <br />
              Understand how networks form, evolve, and where they may move next.
            </p>
          </div>

          {/* Center — Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-slate-600 font-mono mb-4">Platform</h4>
              <div className="space-y-2.5">
                <a href="#overview" className="block text-[13px] text-slate-400 hover:text-white transition-colors">Overview</a>
                <a href="#intelligence" className="block text-[13px] text-slate-400 hover:text-white transition-colors">Intelligence</a>
                <a href="#pipeline" className="block text-[13px] text-slate-400 hover:text-white transition-colors">How It Works</a>
                <a href="#research" className="block text-[13px] text-slate-400 hover:text-white transition-colors">Research</a>
              </div>
            </div>
            <div>
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-slate-600 font-mono mb-4">Resources</h4>
              <div className="space-y-2.5">
                <a
                  href="https://github.com/Parth-Bindal27/VEDHA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[13px] text-slate-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <Link href="/console" className="block text-[13px] text-slate-400 hover:text-white transition-colors">
                  Launch Console
                </Link>
              </div>
            </div>
          </div>

          {/* Right — Status */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
              <span className="text-[11px] font-mono text-emerald-400/60">SYSTEM ONLINE</span>
            </div>
            <a
              href="https://github.com/Parth-Bindal27/VEDHA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-slate-600 font-mono">
            © 2026 ARGUS ECHO
          </span>
          <span className="text-[11px] text-slate-700 font-mono">
            Built for intelligent financial network analysis.
          </span>
        </div>
      </div>
    </footer>
  );
}
