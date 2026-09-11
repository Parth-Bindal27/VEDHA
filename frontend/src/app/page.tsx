"use client";

import Link from "next/link";
import { Play, Zap, Shield, FileText, ArrowUpRight, AlertTriangle, Network, Search, GitGraph, Scissors, BarChart3, Fingerprint } from "lucide-react";
import { useEffect, useRef } from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070512] text-white font-sans overflow-x-hidden selection:bg-fuchsia-500/30">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-fuchsia-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[60%] left-[20%] w-[60%] h-[40%] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center bg-white/5 relative overflow-hidden">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-fuchsia-400">
               <path d="M12 2L22 22H2L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
               <circle cx="12" cy="7" r="1.5" fill="currentColor" />
               <circle cx="6" cy="18" r="1.5" fill="currentColor" />
               <circle cx="18" cy="18" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span className="font-semibold tracking-widest text-sm">ARGUS ECHO</span>
        </div>
        
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] rounded-full p-1 backdrop-blur-md">
          <a href="#" className="px-5 py-2 rounded-full bg-white/10 text-sm font-medium">Home</a>
          <a href="#how-it-works" className="px-5 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="px-5 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-colors">Features</a>
          <a href="#mission" className="px-5 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-colors">Mission</a>
          <a href="#impact" className="px-5 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-colors">Impact</a>
        </div>
        
        <Link href="/console" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(232,121,249,0.3)] transition-all">
          Launch App
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-8">
        
        {/* Hero Section */}
        <section id="how-it-works" className="pt-24 pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-3 px-1 py-1 rounded-full mb-8">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/50">AI POWERED <span className="text-white/20 mx-2">•</span> NETWORK INTELLIGENCE <span className="text-white/20 mx-2">•</span> HUMAN IN THE LOOP</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              From Transactions<br />
              to <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">Truth</span>
            </h1>
            
            <p className="text-lg text-white/60 max-w-lg mb-10 leading-relaxed">
              ARGUS ECHO detects hidden financial networks by understanding how transactions, people and patterns evolve over time.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <Link href="/console" className="px-8 py-3.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-fuchsia-600 text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(232,121,249,0.3)] transition-all">
                Launch Investigation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              
              <button className="px-6 py-3.5 rounded-full border border-white/20 text-sm font-semibold flex items-center gap-3 hover:bg-white/5 transition-colors">
                <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 ml-0.5" fill="currentColor" />
                </div>
                Watch Demo
              </button>
            </div>
            
            <div className="border-t border-white/10 pt-8 mt-12 relative">
              <div className="absolute -top-[1px] left-0 w-24 h-[1px] bg-gradient-to-r from-fuchsia-500 to-transparent" />
              <p className="text-sm text-white/40 mb-8">Trusted for a safer, more transparent financial future.</p>
              
              <div className="flex flex-wrap items-center gap-x-12 gap-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-white/80"><Zap className="w-5 h-5" fill="currentColor" /></div>
                  <div>
                    <h4 className="text-sm font-semibold">Real-time</h4>
                    <p className="text-[11px] text-white/50">Network Analysis</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 relative before:content-[''] before:absolute before:-left-6 before:top-1 before:bottom-1 before:w-[1px] before:bg-white/10">
                  <div className="text-white/80"><Network className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-semibold">Multi-Signal</h4>
                    <p className="text-[11px] text-white/50">Intelligence Engine</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 relative before:content-[''] before:absolute before:-left-6 before:top-1 before:bottom-1 before:w-[1px] before:bg-white/10">
                  <div className="text-white/80"><Shield className="w-5 h-5" /></div>
                  <div>
                    <h4 className="text-sm font-semibold">Human-in-the-Loop</h4>
                    <p className="text-[11px] text-white/50">Investigation Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative h-[600px] flex items-center justify-center">
             {/* The glowing orb */}
             <div className="absolute w-[400px] h-[400px] rounded-full border border-white/[0.05] bg-gradient-to-b from-blue-900/20 to-transparent flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full bg-blue-900/20 blur-[30px]" />
                <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/4b/World_map_blank_gmt.png')] bg-cover opacity-10 rounded-full grayscale mix-blend-overlay" />
                
                {/* SVG Network on globe */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  {/* Lines */}
                  <line x1="150" y1="120" x2="220" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="220" y1="180" x2="280" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="220" y1="180" x2="190" y2="260" stroke="rgba(232,121,249,0.5)" strokeWidth="2" />
                  <line x1="190" y1="260" x2="260" y2="280" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="150" y1="120" x2="90" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="90" y1="160" x2="120" y2="220" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  
                  {/* Nodes */}
                  <circle cx="150" cy="120" r="4" fill="#fff" />
                  <circle cx="220" cy="180" r="6" fill="#e879f9" className="drop-shadow-[0_0_8px_#e879f9]" />
                  <circle cx="280" cy="150" r="4" fill="#fff" />
                  <circle cx="190" cy="260" r="5" fill="#e879f9" className="drop-shadow-[0_0_8px_#e879f9]" />
                  <circle cx="260" cy="280" r="3" fill="#fff" />
                  <circle cx="90" cy="160" r="3" fill="#fff" />
                  <circle cx="120" cy="220" r="4" fill="#fff" />
                </svg>
             </div>
             
             {/* Floating UI Cards */}
             <div className="absolute top-[10%] left-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex gap-3 shadow-2xl items-center transform -translate-x-10 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-indigo-400">
                  <Network className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Network Detected</h5>
                  <p className="text-[10px] text-white/50">Hidden relationships<br/>emerging over time.</p>
                </div>
             </div>

             <div className="absolute top-[20%] right-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex gap-3 shadow-2xl items-center transform translate-x-4 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-pink-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Anomaly Detected</h5>
                  <p className="text-[10px] text-white/50">Unusual transaction<br/>behaviour identified.</p>
                </div>
             </div>

             <div className="absolute bottom-[40%] left-[-5%] bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex gap-3 shadow-2xl items-center hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-purple-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Pattern Recognised</h5>
                  <p className="text-[10px] text-white/50">Structural fingerprint<br/>matches known typologies.</p>
                </div>
             </div>
             
             <div className="absolute bottom-[20%] right-[10%] bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-3 flex gap-3 shadow-2xl items-center hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-blue-400">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-white">Prediction Generated</h5>
                  <p className="text-[10px] text-white/50">Likely next movement<br/>inferred from network.</p>
                </div>
             </div>
             
             <div className="absolute bottom-[10%] right-[-10%] opacity-60">
               <span className="font-['Caveat',cursive] italic text-2xl text-white transform -rotate-6 inline-block">
                 See<br/>the connections<br/>others miss.
               </span>
             </div>
          </div>
        </section>

        {/* Features Row */}
        <section id="features" className="py-20">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: <GitGraph className="w-5 h-5 text-blue-400"/>, title: "Temporal Graph Intelligence", desc: "Model how accounts interact and evolve over time." },
              { icon: <AlertTriangle className="w-5 h-5 text-pink-400"/>, title: "Anomaly & Coordination Detection", desc: "Spot unusual behaviour and synchronized activities." },
              { icon: <Fingerprint className="w-5 h-5 text-fuchsia-400"/>, title: "Crime Genome", desc: "Identify structural fingerprints of financial crime." },
              { icon: <Scissors className="w-5 h-5 text-teal-400"/>, title: "Network Surgery", desc: "Simulate removal of entities to measure structural impact." },
              { icon: <ArrowUpRight className="w-5 h-5 text-emerald-400"/>, title: "Predict Next Move", desc: "Anticipate likely future transactions using network context." },
              { icon: <FileText className="w-5 h-5 text-indigo-400"/>, title: "AI Investigator", desc: "Generate investigator briefs and SAR drafts (with human oversight)." }
            ].map((feature, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 hover:bg-white/[0.04] transition-colors relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h4 className="text-sm font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-[11px] text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-20 relative">
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-[2rem] p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
            <div className="flex-1 relative z-10">
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white/40 mb-6 block">OUR MISSION</span>
              <h2 className="text-3xl lg:text-4xl font-light leading-snug mb-8">
                "A more transparent financial world, where hidden networks can't hide."
              </h2>
              <div className="text-sm font-semibold tracking-widest text-white/60">ARGUS ECHO</div>
            </div>
            
            <div className="flex-1 relative h-64 w-full flex items-center justify-end">
               {/* Abstract wave SVG */}
               <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
                 <path d="M0,100 C100,50 150,150 250,100 C350,50 400,150 400,100 L400,200 L0,200 Z" fill="url(#grad1)" opacity="0.3" />
                 <path d="M0,120 C100,180 180,20 280,100 C380,180 400,100 400,100 L400,200 L0,200 Z" fill="url(#grad2)" opacity="0.5" />
                 <defs>
                   <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#4f46e5" />
                     <stop offset="100%" stopColor="#e879f9" />
                   </linearGradient>
                   <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="#3b82f6" />
                     <stop offset="100%" stopColor="#8b5cf6" />
                   </linearGradient>
                 </defs>
               </svg>
               
               <div className="relative z-10 flex flex-col gap-4 text-sm text-white/80 pr-10">
                 <div className="flex items-center gap-3 justify-end">
                   <span>Detect</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                 </div>
                 <div className="flex items-center gap-3 justify-end">
                   <span>Understand</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                 </div>
                 <div className="flex items-center gap-3 justify-end">
                   <span>Investigate</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                 </div>
               </div>
            </div>
          </div>
        </section>
        
        {/* Built for Impact */}
        <section id="impact" className="py-24 text-center">
           <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] tracking-[0.2em] uppercase font-semibold text-white/60 mb-8">
             BUILT FOR IMPACT
           </div>
           
           <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
             More than a Tool.<br/>
             A <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-pink-500">Safer</span> Financial Future.
           </h2>
           
           <p className="text-base text-white/50 max-w-2xl mx-auto mb-20 leading-relaxed">
             ARGUS ECHO empowers investigators, institutions and regulators with the intelligence to see beyond individual transactions and uncover the bigger picture.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-left">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-fuchsia-400 shrink-0">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 </svg>
               </div>
               <div>
                 <h4 className="text-2xl font-bold">100K+</h4>
                 <p className="text-[11px] text-white/50">Transactions Analyzed<br/>(in simulation)</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 border-l border-white/10 pl-8">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-blue-400 shrink-0">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                 </svg>
               </div>
               <div>
                 <h4 className="text-2xl font-bold">5</h4>
                 <p className="text-[11px] text-white/50">Intelligence Layers</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 border-l border-white/10 pl-8">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-teal-400 shrink-0">
                 <Search className="w-5 h-5" />
               </div>
               <div>
                 <h4 className="text-2xl font-bold">1</h4>
                 <p className="text-[11px] text-white/50">Unified Investigation View</p>
               </div>
             </div>
             
             <div className="flex items-center gap-4 border-l border-white/10 pl-8">
               <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-indigo-400 shrink-0">
                 <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8-4.585 0-4.584 8 0 8 5.606 0 7.644-8 12.74-8z"/>
                 </svg>
               </div>
               <div>
                 <h4 className="text-2xl font-bold">∞</h4>
                 <p className="text-[11px] text-white/50">Real-World Potential</p>
               </div>
             </div>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.05] mt-10">
         <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
           
           <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded border border-white/10 flex items-center justify-center bg-white/5">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-fuchsia-400">
                  <path d="M12 2L22 22H2L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                </svg>
             </div>
             <div>
               <div className="font-semibold tracking-widest text-sm">ARGUS ECHO</div>
               <div className="text-[10px] text-white/40">Seeing the Bigger Financial Picture</div>
             </div>
           </div>
           
           <div className="flex items-center gap-8">
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Home</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">How It Works</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Features</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">Demo</Link>
              <Link href="#" className="text-xs text-white/60 hover:text-white transition-colors">About</Link>
           </div>
           
           <div className="flex items-center gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
           </div>
         </div>
         
         <div className="border-t border-white/[0.05]">
           <div className="max-w-7xl mx-auto px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-white/40">
             <div>© 2025 ARGUS ECHO. All rights reserved.</div>
             <div className="flex items-center gap-2">
                <span>Detect</span> <span>•</span>
                <span>Understand</span> <span>•</span>
                <span>Investigate</span> <span>•</span>
                <span>For a safer financial future.</span>
             </div>
           </div>
         </div>
      </footer>
    </div>
  );
}
