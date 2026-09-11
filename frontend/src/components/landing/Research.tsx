"use client";

export default function Research() {
  return (
    <section id="research" className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <span className="inline-block text-xs tracking-[0.3em] uppercase font-semibold text-slate-400 mb-6">
              OUR MISSION
            </span>

            <h2 className="text-5xl font-bold tracking-tight text-white mb-8 leading-[1.2]">
              <span className="text-white">"A more transparent financial world,</span>
              <br />
              <span className="text-white">where hidden networks can't hide."</span>
            </h2>

            <div className="flex gap-12 pt-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span className="text-sm font-semibold text-white">Detect</span>
                </div>
                <p className="text-xs text-slate-400">Uncover hidden financial networks</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                  <span className="text-sm font-semibold text-white">Understand</span>
                </div>
                <p className="text-xs text-slate-400">Comprehend how they evolve</p>
              </div>
            </div>
          </div>

          {/* Right - Wavy visualization */}
          <div className="relative h-96 lg:h-[400px] flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
              {/* Wavy background lines */}
              <g opacity="0.1">
                <path d="M0,100 Q125,50 250,100 T500,100" stroke="#a78bfa" strokeWidth="2" fill="none" />
                <path d="M0,150 Q125,100 250,150 T500,150" stroke="#a78bfa" strokeWidth="2" fill="none" />
                <path d="M0,200 Q125,150 250,200 T500,200" stroke="#a78bfa" strokeWidth="2" fill="none" />
                <path d="M0,250 Q125,200 250,250 T500,250" stroke="#a78bfa" strokeWidth="2" fill="none" />
                <path d="M0,300 Q125,250 250,300 T500,300" stroke="#a78bfa" strokeWidth="2" fill="none" />
              </g>

              {/* Main wavy path */}
              <path
                d="M0,180 Q50,120 100,150 T200,120 T300,180 T400,140 T500,180 L500,400 L0,400 Z"
                fill="url(#waveGradient)"
                opacity="0.3"
              />

              {/* Wave line */}
              <path
                d="M0,180 Q50,120 100,150 T200,120 T300,180 T400,140 T500,180"
                stroke="#ec4899"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Accent dots */}
              <circle cx="100" cy="150" r="4" fill="#ec4899" opacity="0.7" />
              <circle cx="200" cy="120" r="3" fill="#a78bfa" opacity="0.6" />
              <circle cx="300" cy="180" r="4" fill="#ec4899" opacity="0.7" />
              <circle cx="400" cy="140" r="3" fill="#a78bfa" opacity="0.6" />
            </svg>

            {/* Action label */}
            <div className="absolute bottom-8 right-12 text-right">
              <div className="text-xs tracking-[0.2em] uppercase text-slate-400 font-semibold mb-1">
                Investigate
              </div>
              <div className="text-xs text-slate-500">Powered by ARGUS ECHO</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
