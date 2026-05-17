'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Sun, Moon, Bell, Shield, ArrowUpRight, Battery, Wifi, Menu, HelpCircle } from 'lucide-react';
import Image from 'next/image';
import InquiryModal from '@/components/InquiryModal';

export default function Concept1() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Dynamic experience calculation
  const totalExperience = new Date().getFullYear() - 2011;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${isDarkMode ? 'bg-[#020817] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 🌌 Atmospheric Scenic Lighting Backdrops */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Ambient Top Glow (Cyan / Purple mesh) */}
        <div className={`absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full filter blur-[120px] opacity-[0.25] transition-colors duration-500 ${isDarkMode ? 'bg-radial from-[#1eb8ce] via-purple-600 to-transparent' : 'bg-radial from-cyan-300 via-violet-300 to-transparent'}`} />
        
        {/* Soft Left Ambient Glow */}
        <div className={`absolute top-[40%] left-[-10%] w-[40vw] h-[40vw] rounded-full filter blur-[150px] opacity-[0.15] ${isDarkMode ? 'bg-[#1eb8ce]' : 'bg-cyan-200'}`} />
        
        {/* SVG Ambient Grid Overlay */}
        <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.07] ${isDarkMode ? 'invert-0' : 'invert'}`} />
      </div>

      {/* 🚀 1. Capsule Frosted Header & Navbar */}
      <header className="sticky top-0 z-50 flex h-20 w-full items-end justify-center px-4 sm:px-6 lg:px-8">
        <div className={`relative flex h-14 w-full max-w-7xl items-center justify-between gap-4 rounded-full border px-4 transition-all duration-500 sm:px-6 lg:px-8 backdrop-blur-xl ${isDarkMode ? 'border-white/10 bg-black/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]' : 'border-slate-200 bg-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]'}`}>
          
          {/* Brand Logo Group */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <Image 
                src={isDarkMode ? "/assets/dhv7-logo-icon.png" : "/assets/dhv7-logo-icon-dark.png"} 
                alt="DHV7 Brand Icon" 
                width={40} 
                height={40} 
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#philosophy" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Philosophy</a>
            <a href="#expertise" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Expertise</a>
            <a href="#work" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Selected Work</a>
          </nav>

          {/* Right Interface Controls */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle Capsule Circle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce] hover:bg-white/10 shadow-[inset_0_-2px_6px_0px_rgba(30,184,206,0.2)]' : 'border-slate-200 bg-slate-100 text-cyan-600 hover:bg-slate-200'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Premium CTA Let's Collaborate Capsule Button */}
            <button 
              onClick={() => setIsInquiryOpen(true)}
              className={`h-9 px-5 py-2 rounded-full font-medium text-xs sm:text-sm tracking-tight transition-all duration-500 shadow-md ${isDarkMode ? 'bg-[#1eb8ce] text-black hover:bg-cyan-400 shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              Let's Collaborate
            </button>
          </div>
        </div>
      </header>

      {/* 📢 2. Centered Typography Hero Section */}
      <main className="flex-grow flex flex-col items-center">
        <section className="relative w-full max-w-7xl px-6 pt-16 md:pt-24 flex flex-col items-center text-center">
          
          {/* Top Security/Status Dynamic Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide shadow-sm transition-colors duration-300 ${isDarkMode ? 'border-white/5 bg-white/5 text-zinc-300' : 'border-slate-200 bg-slate-100 text-slate-700'}`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>{totalExperience}+ YEARS OF SYSTEMS EXECUTION SECURED</span>
          </motion.div>

          {/* Huge Main Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mt-6 max-w-5xl leading-[1.1] transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Architecting <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 via-indigo-400 to-purple-400' : 'from-cyan-600 via-indigo-600 to-purple-600'}`}>Scalable Systems.</span> <br />
            Guiding Products & UI/UX.
          </motion.h1>

          {/* Narrative Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`max-w-3xl text-base sm:text-lg lg:text-xl mt-6 leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}
          >
            Co-founded top-10 award-winning UI/UX agencies, automated next-gen technical infrastructures with Deno/Dolly architectures, and spearheaded cross-functional systems that bridge high-growth product operations.
          </motion.p>

          {/* Action CTAs Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 z-10"
          >
            <button 
              onClick={() => setIsInquiryOpen(true)}
              className={`h-11 px-8 rounded-full font-medium text-base tracking-wide flex items-center gap-2 duration-500 transition-all ${isDarkMode ? 'bg-[#1eb8ce] text-black hover:bg-cyan-400 hover:shadow-cyan-400/20 hover:shadow-xl shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              Launch Inquiry
              <ArrowRight className="w-4 h-4" />
            </button>
            <a 
              href="https://wa.me/918128181213?text=Hi%2C%20I%20just%20saw%20your%20profile%20on%20dhv7.com%20and"
              target="_blank"
              rel="noopener noreferrer"
              className={`h-11 px-8 rounded-full font-medium text-base tracking-wide flex items-center gap-2 border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce] hover:bg-white/10 hover:border-white/20' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'}`}
            >
              Direct Chat
              <ChevronRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>

        {/* 📱 3. High-Fidelity Smartphone & Absolute Floating Widgets Block */}
        <section className="relative w-full max-w-7xl px-6 pt-24 pb-32 flex flex-col items-center">
          
          {/* Main Visual Arena Grid wrapper */}
          <div className="relative w-full max-w-4xl aspect-[4/3] flex items-end justify-center">
            
            {/* Ambient Background Lights specifically for device viewport */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className={`w-[60%] h-[60%] rounded-full filter blur-[80px] opacity-25 ${isDarkMode ? 'bg-cyan-500' : 'bg-cyan-200'}`} />
            </div>

            {/* 📱 3A. Real, Fully-Crafted HTML/CSS Smartphone Mockup UI */}
            <motion.div 
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 w-[280px] sm:w-[320px] aspect-[9/18.5] rounded-[48px] border-[10px] p-3 shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-zinc-950 border-zinc-800 shadow-cyan-500/10' : 'bg-white border-slate-300 shadow-slate-900/10'}`}
            >
              {/* Apple Dynamic Island / Speaker notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-30 flex items-center justify-between px-3.5">
                {/* Camera dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
                {/* Status indicator LED */}
                <div className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Smartphone Inner Viewport Display Area */}
              <div className={`w-full h-full rounded-[38px] overflow-hidden relative flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#090e1a]' : 'bg-slate-100'}`}>
                
                {/* Simulated Phone Status Bar */}
                <div className="h-10 px-6 flex items-center justify-between text-[11px] font-semibold text-zinc-500 pt-3 relative z-20">
                  <span>9:30</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Dashboard Inner Scrollable Window */}
                <div className="flex-grow overflow-y-auto px-4 pb-6 scrollbar-none pt-2 relative z-10">
                  
                  {/* Dynamic Profile Header card */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#1eb8ce]/30 bg-zinc-900">
                        <Image 
                          src="/assets/profile-picture-dhaval-sqr.png" 
                          alt="Dhaval Avatar" 
                          fill
                          sizes="32px"
                          className="object-cover grayscale"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500">System Core</span>
                        <span className={`text-[12px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Hi, Dhaval</span>
                      </div>
                    </div>
                    <button className={`w-7 h-7 rounded-full flex items-center justify-center border transition-colors ${isDarkMode ? 'border-white/5 bg-white/5 text-zinc-400 hover:text-white' : 'border-slate-200 bg-white text-slate-600'}`}>
                      <Bell className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Dynamic Primary Analytics Wallet Card */}
                  <div className="rounded-2xl p-4 bg-gradient-to-br from-[#1eb8ce]/90 to-indigo-600 text-white shadow-lg relative overflow-hidden mb-5">
                    {/* Visual mesh overlay */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-cover opacity-10 pointer-events-none" />
                    
                    <span className="text-[9px] font-semibold tracking-widest uppercase opacity-75">ORCHESTRATED EFFICIENCY</span>
                    <h3 className="text-xl font-bold mt-1 tracking-tight">+450%</h3>
                    
                    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                      <div>
                        <span className="text-[8px] opacity-75 block">SYSTEM UPTIME</span>
                        <span className="text-[11px] font-bold mt-0.5 block">99.99%</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] opacity-75 block">ACTIVE AGENTS</span>
                        <span className="text-[11px] font-bold mt-0.5 block">24 / 7</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated SVG Graph Line Vector */}
                  <div className={`rounded-xl p-3 border mb-5 transition-colors ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-zinc-500 font-medium">Growth Index</span>
                      <span className="text-[10px] text-emerald-400 font-bold">+28.4%</span>
                    </div>
                    <div className="h-16 w-full flex items-end">
                      {/* Interactive mock SVG chart */}
                      <svg className="w-full h-full text-[#1eb8ce]" viewBox="0 0 100 40" fill="none">
                        <defs>
                          <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0,35 Q15,28 30,22 T60,10 T80,18 T100,2" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round"
                        />
                        <path 
                          d="M0,35 Q15,28 30,22 T60,10 T80,18 T100,2 L100,40 L0,40 Z" 
                          fill="url(#gradient-chart)"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Real, Beautiful Dynamic Projects List */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-zinc-500 font-semibold tracking-wider block uppercase">Recent Orchestrations</span>
                    
                    {/* Project Item 1 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${isDarkMode ? 'border-white/5 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-[11px]">🎨</div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Decibel Designs</span>
                          <span className="text-[9px] text-zinc-500">Creative Brand Studio</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400">Deployed</span>
                    </div>

                    {/* Project Item 2 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${isDarkMode ? 'border-white/5 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[11px]">⚙️</div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CCB Group UK</span>
                          <span className="text-[9px] text-zinc-500">Operational CRM Flow</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-400">Architected</span>
                    </div>

                    {/* Project Item 3 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${isDarkMode ? 'border-white/5 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-[11px]">🔒</div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>WatchOver India</span>
                          <span className="text-[9px] text-zinc-500">IoT Active Tracker</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400">Live</span>
                    </div>

                  </div>

                </div>

                {/* Apple bottom task indicator line */}
                <div className="h-6 w-full flex items-center justify-center pb-2 relative z-20">
                  <div className="w-24 h-1 rounded-full bg-zinc-700/50" />
                </div>
              </div>
            </motion.div>

            {/* 📍 3B. Absolute Floating Widget Cards (Recreating Swipe Geometry exactly) */}

            {/* Card Widget 1: AWS Systems (Top Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: -20, rotate: 10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`absolute top-[12%] left-[4%] md:left-[14%] z-20 rounded-2xl border p-4 shadow-xl backdrop-blur-md max-w-[210px] hidden sm:block ${isDarkMode ? 'border-white/10 bg-black/70 text-white shadow-cyan-500/5' : 'border-slate-200 bg-white/90 text-slate-800 shadow-slate-400/10'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🛠️</span>
                <span className="text-xs font-semibold tracking-wide uppercase opacity-75">Cloud Systems</span>
              </div>
              <h4 className="text-sm font-extrabold mt-2 tracking-tight">AWS Cloud Architecture</h4>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Orchestrating high-availability microservices and secured API networks.</p>
            </motion.div>

            {/* Card Widget 2: AI Agent Alert Banner (Middle Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -60, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className={`absolute bottom-[24%] left-[-4%] md:left-[3%] z-20 rounded-full border px-4 py-2.5 flex items-center gap-3 shadow-lg backdrop-blur-md hidden sm:flex ${isDarkMode ? 'border-white/10 bg-black/80 text-white shadow-cyan-500/5' : 'border-slate-200 bg-white/90 text-slate-800'}`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                <span className="text-[10px] text-emerald-400">●</span>
              </div>
              <span className="text-xs font-bold tracking-tight">Next-Gen AI Orchestrator Active 🤖</span>
            </motion.div>

            {/* Card Widget 3: Metrics Dashboard (Top Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: -20, rotate: -10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`absolute top-[8%] right-[4%] md:right-[12%] z-20 rounded-2xl border p-4 shadow-xl backdrop-blur-md max-w-[210px] hidden sm:block ${isDarkMode ? 'border-white/10 bg-black/70 text-white shadow-purple-500/5' : 'border-slate-200 bg-white/90 text-slate-800'}`}
            >
              <span className="text-[9px] font-bold tracking-widest text-[#1eb8ce] uppercase">GLOBAL METRICS</span>
              <h4 className="text-2xl font-extrabold mt-1 tracking-tight">50+ Projects</h4>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Successfully executed, deployed, and branded globally with 100% customer rate.</p>
              <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full w-fit">
                <ArrowUpRight className="w-3 h-3" />
                <span>Exponential Growth</span>
              </div>
            </motion.div>

            {/* Card Widget 4: Achievement Sticker / Badge (Middle Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 60, y: 30, rotate: 0 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 12 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className={`absolute bottom-[28%] right-[-2%] md:right-[2%] z-20 rounded-2xl border p-4 shadow-xl backdrop-blur-md max-w-[190px] hidden sm:block ${isDarkMode ? 'border-white/10 bg-black/85 text-white shadow-cyan-500/5' : 'border-slate-200 bg-white/95 text-slate-800'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🏆</span>
                <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase">UX Co-founder</span>
              </div>
              <p className="text-[11px] font-semibold text-zinc-400 mt-2 leading-relaxed">Built a **Top 10 Indian UI/UX Agency** serving global brands.</p>
            </motion.div>

          </div>

          {/* 🌊 4. Hero Bottom Transition Fade Overlay */}
          <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t to-transparent z-20 transition-colors duration-500 ${isDarkMode ? 'from-[#020817]' : 'from-slate-50'}`} />

        </section>
      </main>

      {/* 🤝 Premium Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
