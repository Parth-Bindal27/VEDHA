"use client";

import Link from "next/link";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px glow-line" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-8">
          The Next Transaction
          <br />
          Isn&apos;t the Signal.
          <br />
          <span className="text-gradient-cyan">The Network Is.</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
          Move from transaction monitoring to temporal network intelligence.
        </p>

        <Link
          href="/console"
          className="group inline-flex items-center gap-3 px-10 py-4 text-[14px] font-bold tracking-wider text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-400"
        >
          Launch ARGUS ECHO
          <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
