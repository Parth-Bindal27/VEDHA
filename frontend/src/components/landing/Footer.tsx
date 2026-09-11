"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Left — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <div>
                <div className="text-base font-bold tracking-[0.1em] text-white">ARGUS ECHO</div>
                <div className="text-xs text-slate-500 tracking-[0.05em]">Seizing the Bigger Financial Picture</div>
              </div>
            </div>
          </div>

          {/* Center — Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs tracking-[0.15em] uppercase text-slate-500 font-semibold mb-4">Navigation</h4>
              <div className="space-y-3">
                <a href="#home" className="block text-sm text-slate-400 hover:text-white transition-colors">Home</a>
                <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">How It Works</a>
                <a href="#features" className="block text-sm text-slate-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Demo</a>
              </div>
            </div>
            <div>
              <h4 className="text-xs tracking-[0.15em] uppercase text-slate-500 font-semibold mb-4">Resources</h4>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Documentation</a>
                <a href="#" className="block text-sm text-slate-400 hover:text-white transition-colors">Blog</a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-400 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>

          {/* Right — Social */}
          <div className="flex flex-col items-start lg:items-end">
            <h4 className="text-xs tracking-[0.15em] uppercase text-slate-500 font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h14m-.5 1.5h-13a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5z" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7" />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 font-mono">
            © 2025 ARGUS ECHO. All rights reserved.
          </span>
          <span className="text-xs text-slate-500 font-mono">
            Detect · Understand · Investigate · For a safer financial future.
          </span>
        </div>
      </div>
    </footer>
  );
}
