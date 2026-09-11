"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "How It Works", href: "#pipeline" },
    { label: "Features", href: "#features" },
    { label: "Demo", href: "#demo" },
    { label: "About", href: "#about" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#050510]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto w-full">
        {/* Left — Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-sm font-bold tracking-wider shadow-lg shadow-pink-500/20">
            A
          </div>
          <div className="hidden sm:block">
            <div className="text-lg font-bold tracking-[0.1em] text-white leading-none">ARGUS ECHO</div>
          </div>
        </Link>

        {/* Center — Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-0 py-2 text-sm text-slate-300 hover:text-white transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right — CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/console"
            className="px-6 py-2 text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
          >
            Launch App →
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M5 5L15 15M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden px-8 pb-4 pt-1 border-t border-white/5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
