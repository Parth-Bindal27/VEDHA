"use client";

import Link from "next/link";

const stats = [
  {
    value: "100K+",
    label: "Transactions Analyzed",
    subtext: "(on simulation)",
  },
  {
    value: "5",
    label: "Intelligence Layers",
  },
  {
    value: "1",
    label: "Unified Investigation View",
  },
  {
    value: "∞",
    label: "Real-World Potential",
  },
];

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.05)_0%,transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto">
        {/* Stats section */}
        <div className="mb-24">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="text-xs tracking-[0.2em] text-slate-400 font-semibold">BUILT FOR IMPACT</span>
            </div>
            <h2 className="text-5xl font-bold tracking-tight text-white mb-4">
              More than a Tool.
              <br />
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">A Safer Financial Future.</span>
            </h2>
            <p className="text-base text-slate-400 max-w-2xl mx-auto mt-6">
              ARGUS ECHO empowers investigators, institutions and regulators with the intelligence to see beyond individual transactions and uncover the bigger picture.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass p-8 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 text-center">
                <div className="text-4xl font-bold text-pink-400 mb-3">{stat.value}</div>
                <h3 className="text-base font-semibold text-white mb-1">{stat.label}</h3>
                {stat.subtext && <p className="text-xs text-slate-400">{stat.subtext}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA section */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-8">
            The Next Transaction
            <br />
            Isn&apos;t the Signal.
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">The Network Is.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Move from transaction monitoring to temporal network intelligence.
          </p>

          <Link
            href="/console"
            className="group inline-flex items-center gap-3 px-10 py-4 text-base font-bold tracking-wider text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-400"
          >
            Launch ARGUS ECHO
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
