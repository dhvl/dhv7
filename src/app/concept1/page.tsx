'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, Sun, Moon, Bell, Shield, ArrowUpRight, Battery, Wifi, 
  Menu, HelpCircle, Star, Terminal, Zap, Layers, Cpu, Check, MessageCircle, AlertCircle
} from 'lucide-react';
import Image from 'next/image';
import InquiryModal from '@/components/InquiryModal';

// --- Static Testimonials Data ---
const testimonialsRow1 = [
  {
    name: "Alex Sterling",
    handle: "@alex_sterling",
    role: "CEO, Sterling Dynamics",
    avatar: "/assets/profile-picture-dhaval-sqr.png", // reusing avatar for aesthetic layout
    rating: 5,
    text: "Dhaval completely overhauled our operational architecture. Uptime went to 99.99% and automation pipelines eliminated weeks of manual tasks.",
    platform: "twitter"
  },
  {
    name: "Clara Vance",
    handle: "@claravance",
    role: "Co-founder, Decibel Designs",
    avatar: "/assets/profile-picture-dhaval-sqr.png",
    rating: 5,
    text: "The absolute master of high-end frontend visual designs. Our brand launch was highly praised by tech agencies across the industry.",
    platform: "reddit"
  },
  {
    name: "Vikram Mehta",
    handle: "@vikmehta_ops",
    role: "Director of Engineering, WATCHOVER",
    avatar: "/assets/profile-picture-dhaval-sqr.png",
    rating: 5,
    text: "Integrating secure IoT alert microservices was seamless. He brings true executive guidance and pure coding prowess.",
    platform: "twitter"
  }
];

const testimonialsRow2 = [
  {
    name: "Sarah Jenkins",
    handle: "@sjenkins_tech",
    role: "Product VP, CCB Group UK",
    avatar: "/assets/profile-picture-dhaval-sqr.png",
    rating: 5,
    text: "Fractional leadership at its finest. He successfully bridged our product objectives with a robust, automated CRM flow.",
    platform: "twitter"
  },
  {
    name: "Rajesh Kooth",
    handle: "@raj_kooth",
    role: "Founder, BluScanner Engine",
    avatar: "/assets/profile-picture-dhaval-sqr.png",
    rating: 5,
    text: "The ML-driven brain integration was flawlessly executed. True systems thinker who understands branding depth.",
    platform: "reddit"
  },
  {
    name: "Marcus Aurelius",
    handle: "@marcus_devops",
    role: "Lead Architect, CloudSec",
    avatar: "/assets/profile-picture-dhaval-sqr.png",
    rating: 5,
    text: "Cleanest Next.js + Tailwind execution I have audited. His architectural blueprints are incredibly detailed.",
    platform: "twitter"
  }
];

// --- Static FAQ Data ---
const faqData = [
  {
    question: "What is your typical systems consulting engagement duration?",
    answer: "Typically, standard engagements range from 4-week dedicated sprints (perfect for core database migrations, AI integrations, or branding launches) to ongoing 6-month fractional CTO advisory retainers for scale operations."
  },
  {
    question: "How do you guarantee visual fidelity match for design frameworks?",
    answer: "We adhere strictly to our Fidelity-First visual workflow—utilizing grid deconstruction, atmospheric backdrop recreations, and side-by-side local verification audits to make sure the compiled interface matches your reference designs perfectly."
  },
  {
    question: "Can you integrate advanced AI pipelines into existing legacy databases?",
    answer: "Yes. We engineer isolated edge pipelines (using secure microservices, JWT layers, and robust REST/GraphQL adapters) to seamlessly automate legacy data flows without breaking core active operations."
  },
  {
    question: "What is your role as a fractional branding and UI/UX strategist?",
    answer: "Having co-founded top-10 creative agencies, I don't just write code. I actively guide and shape your visual identity, copy metrics, user flow models, and positioning assets to maximize customer lifetime values."
  },
  {
    question: "How do we launch a collaborative inquiry session?",
    answer: "Simply launch an inquiry using our collaboration modal, or message directly via the quick-chat WhatsApp link. We will review your systems goals and map out a comprehensive technical blueprint within 48 hours."
  }
];

export default function Concept1() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Dynamic experience calculation
  const totalExperience = new Date().getFullYear() - 2011;

  // Auto alternating features/steps showcase simulated scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${isDarkMode ? 'bg-[#020817] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 🌌 Atmospheric Scenic Lighting Backdrops */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className={`absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[50vw] rounded-full filter blur-[120px] opacity-[0.25] transition-colors duration-500 ${isDarkMode ? 'bg-radial from-[#1eb8ce] via-purple-600 to-transparent' : 'bg-radial from-cyan-300 via-violet-300 to-transparent'}`} />
        
        {/* Mid-page Ambient Glow */}
        <div className={`absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[150px] opacity-[0.12] ${isDarkMode ? 'bg-purple-600/60' : 'bg-violet-300/40'}`} />
        
        {/* Lower Ambient Glow */}
        <div className={`absolute bottom-[10%] left-[-10%] w-[45vw] h-[45vw] rounded-full filter blur-[150px] opacity-[0.15] ${isDarkMode ? 'bg-cyan-500/50' : 'bg-cyan-200'}`} />
        
        {/* SVG Ambient Grid Overlay */}
        <div className={`absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.06] ${isDarkMode ? 'invert-0' : 'invert'}`} />
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
            <a href="#showcase" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Showcase</a>
            <a href="#capabilities" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Capabilities</a>
            <a href="#testimonials" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Testimonials</a>
            <a href="#retainers" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Retainers</a>
            <a href="#faq" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>FAQ</a>
          </nav>

          {/* Right Interface Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce] hover:bg-white/10 shadow-[inset_0_-2px_6px_0px_rgba(30,184,206,0.2)]' : 'border-slate-200 bg-slate-100 text-cyan-600 hover:bg-slate-200'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

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

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mt-6 max-w-5xl leading-[1.1] transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Architecting <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 via-indigo-400 to-purple-400' : 'from-cyan-600 via-indigo-600 to-purple-600'}`}>Scalable Systems.</span> <br />
            Guiding Products & UI/UX.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`max-w-3xl text-base sm:text-lg lg:text-xl mt-6 leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}
          >
            Co-founded top-10 award-winning UI/UX agencies, automated next-gen technical infrastructures with Deno/Dolly architectures, and spearheaded cross-functional systems that bridge high-growth product operations.
          </motion.p>

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
        <section className="relative w-full max-w-7xl px-6 pt-24 pb-20 flex flex-col items-center">
          <div className="relative w-full max-w-4xl aspect-[4/3] flex items-end justify-center">
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className={`w-[60%] h-[60%] rounded-full filter blur-[80px] opacity-25 ${isDarkMode ? 'bg-cyan-500' : 'bg-cyan-200'}`} />
            </div>

            {/* 📱 3A. Smartphone Mockup UI */}
            <motion.div 
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`relative z-10 w-[280px] sm:w-[320px] aspect-[9/18.5] rounded-[48px] border-[10px] p-3 shadow-2xl transition-all duration-500 ${isDarkMode ? 'bg-zinc-950 border-zinc-800 shadow-cyan-500/10' : 'bg-white border-slate-300 shadow-slate-900/10'}`}
            >
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-5 rounded-full bg-black z-30 flex items-center justify-between px-3.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
                <div className="w-1 h-1 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              <div className={`w-full h-full rounded-[38px] overflow-hidden relative flex flex-col transition-colors duration-500 ${isDarkMode ? 'bg-[#090e1a]' : 'bg-slate-100'}`}>
                
                <div className="h-10 px-6 flex items-center justify-between text-[11px] font-semibold text-zinc-500 pt-3 relative z-20">
                  <span>9:30</span>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto px-4 pb-6 scrollbar-none pt-2 relative z-10">
                  
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

                  <div className="rounded-2xl p-4 bg-gradient-to-br from-[#1eb8ce]/90 to-indigo-600 text-white shadow-lg relative overflow-hidden mb-5">
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

                  <div className={`rounded-xl p-3 border mb-5 transition-colors ${isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] text-zinc-500 font-medium">Growth Index</span>
                      <span className="text-[10px] text-emerald-400 font-bold">+28.4%</span>
                    </div>
                    <div className="h-16 w-full flex items-end">
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

                  <div className="space-y-3">
                    <span className="text-[10px] text-zinc-500 font-semibold tracking-wider block uppercase">Recent Projects</span>
                    
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

                    <div className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${isDarkMode ? 'border-white/5 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-white hover:bg-slate-50'}`}>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[11px]">⚙️</div>
                        <div className="flex flex-col">
                          <span className={`text-[11px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CCB Group UK</span>
                          <span className="text-[9px] text-zinc-500">CRM Workflow</span>
                        </div>
                      </div>
                      <span className="text-[9px] font-bold text-indigo-400">Architected</span>
                    </div>
                  </div>

                </div>

                <div className="h-6 w-full flex items-center justify-center pb-2 relative z-20">
                  <div className="w-24 h-1 rounded-full bg-zinc-700/50" />
                </div>
              </div>
            </motion.div>

            {/* 📍 3B. Absolute Floating Widget Cards */}
            <motion.div 
              initial={{ opacity: 0, x: -50, y: -20, rotate: 10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`absolute top-[12%] left-[4%] md:left-[14%] z-20 rounded-2xl border p-4 shadow-xl backdrop-blur-md max-w-[210px] hidden sm:block ${isDarkMode ? 'border-white/10 bg-black/70 text-white' : 'border-slate-200 bg-white/90 text-slate-800 shadow-slate-400/10'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">🛠️</span>
                <span className="text-xs font-semibold tracking-wide uppercase opacity-75">Cloud Systems</span>
              </div>
              <h4 className="text-sm font-extrabold mt-2 tracking-tight">AWS Cloud Architecture</h4>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Orchestrating high-availability microservices and secured API networks.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -60, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className={`absolute bottom-[24%] left-[-4%] md:left-[3%] z-20 rounded-full border px-4 py-2.5 flex items-center gap-3 shadow-lg backdrop-blur-md hidden sm:flex ${isDarkMode ? 'border-white/10 bg-black/80 text-white' : 'border-slate-200 bg-white/90 text-slate-800'}`}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/25">
                <span className="text-[10px] text-emerald-400">●</span>
              </div>
              <span className="text-xs font-bold tracking-tight">Next-Gen AI Orchestrator Active 🤖</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50, y: -20, rotate: -10 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className={`absolute top-[8%] right-[4%] md:right-[12%] z-20 rounded-2xl border p-4 shadow-xl backdrop-blur-md max-w-[210px] hidden sm:block ${isDarkMode ? 'border-white/10 bg-black/70 text-white' : 'border-slate-200 bg-white/90 text-slate-800'}`}
            >
              <span className="text-[9px] font-bold tracking-widest text-[#1eb8ce] uppercase">GLOBAL METRICS</span>
              <h4 className="text-2xl font-extrabold mt-1 tracking-tight">50+ Projects</h4>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Successfully executed, deployed, and branded globally with 100% customer rate.</p>
            </motion.div>

          </div>
        </section>

        {/* 🎬 4. The Core Blueprint (Features Alternate Sticky-Scroll-like Showcase) */}
        <section id="showcase" className={`w-full max-w-7xl px-6 py-24 border-t transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-zinc-950/20' : 'border-slate-200 bg-slate-100/40'}`}>
          <div className="flex flex-col items-center text-center mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
              <Zap className="w-3 h-3" /> Core Pillars
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight mt-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              High-Fidelity Project Execution
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Discover how we implement robust technical system architectures and premium visual layers in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text selection items */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { title: "AI Pipeline Automation", desc: "Building autonomous systems running edge microservices to drive daily processes.", icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
                { title: "Scalable Enterprise Architectures", desc: "Designing bulletproof API layers, secure database backends, and highly active CRMs.", icon: <Layers className="w-5 h-5 text-indigo-400" /> },
                { title: "High-End Visual Identity", desc: "Co-founding top creative design startups to elevate interface standards to direct premium status.", icon: <Star className="w-5 h-5 text-purple-400" /> },
                { title: "IoT Alert Networks", desc: "Deploying secure, real-time alert modules keeping physical data tracking connected.", icon: <Terminal className="w-5 h-5 text-emerald-400" /> }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 flex gap-4 ${activeStep === idx 
                    ? (isDarkMode ? 'border-white/10 bg-white/5 shadow-lg' : 'border-slate-300 bg-white shadow-md') 
                    : (isDarkMode ? 'border-transparent hover:bg-white/[0.02]' : 'border-transparent hover:bg-slate-200/50')}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeStep === idx ? 'border-cyan-500/30 bg-cyan-500/10' : 'border-white/5 bg-white/5'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.title}</h3>
                    <p className={`text-xs sm:text-sm mt-1 leading-relaxed transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right side Visual Mock placeholder frame (Accelerated workflow image mockup rule applied) */}
            <div className="lg:col-span-7 flex justify-center">
              <div className={`w-full max-w-[550px] aspect-[4/3] rounded-3xl border p-4 shadow-2xl relative overflow-hidden transition-all duration-500 backdrop-blur-md ${isDarkMode ? 'border-white/10 bg-zinc-950/80' : 'border-slate-200 bg-white/80'}`}>
                {/* Background mesh glow inside active preview frame */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(30,184,206,0.1),transparent_60%)] pointer-events-none" />
                
                <AnimatePresence mode="wait">
                  {activeStep === 0 && (
                    <motion.div 
                      key="step0" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                          <Terminal className="w-4 h-4 text-cyan-400" />
                          <span>AI PIPELINE CONSOLE</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">ACTIVE</span>
                      </div>
                      <div className="flex-grow flex items-center justify-center p-6">
                        <div className="w-full bg-black/60 rounded-xl p-4 border border-white/5 font-mono text-[10px] sm:text-xs text-cyan-400 space-y-1.5 overflow-hidden shadow-inner">
                          <p className="text-zinc-600">// Initializing autonomous agent stack</p>
                          <p className="text-zinc-300">$ npx build-ai-agent-engine --domain dhv7.com</p>
                          <p className="text-emerald-400">✓ System variables loaded from secure Deno storage</p>
                          <p className="text-purple-400">🤖 Connecting vector storage models (Dolly/Deno)...</p>
                          <p className="text-white">🚀 Agent operational. Uptime: 100%. Processing inputs...</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div 
                      key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                          <Layers className="w-4 h-4 text-indigo-400" />
                          <span>SYSTEM PERFORMANCE</span>
                        </div>
                        <span className="text-[10px] text-zinc-500 font-bold">API STATUS: 100% OK</span>
                      </div>
                      <div className="flex-grow grid grid-cols-2 gap-4 p-6 items-center">
                        <div className="bg-[#090e1a]/80 p-4 border border-white/5 rounded-2xl text-center shadow-lg">
                          <span className="text-[10px] text-zinc-500 uppercase font-semibold">Load Speed optimization</span>
                          <h4 className="text-2xl font-bold mt-1 text-[#1eb8ce]">-320ms</h4>
                          <span className="text-[9px] text-emerald-400 block mt-1">✓ Turbopack Active</span>
                        </div>
                        <div className="bg-[#090e1a]/80 p-4 border border-white/5 rounded-2xl text-center shadow-lg">
                          <span className="text-[10px] text-zinc-500 uppercase font-semibold">Microservices Security</span>
                          <h4 className="text-2xl font-bold mt-1 text-purple-400">JWT / SSL</h4>
                          <span className="text-[9px] text-zinc-500 block mt-1">✓ Isolated Sandbox</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div 
                      key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                          <Star className="w-4 h-4 text-purple-400" />
                          <span>AGENCY IDENTITY DESIGN SYSTEM</span>
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center p-6 gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 to-indigo-600 shadow-xl flex items-center justify-center text-xl">🎨</div>
                          <span className="text-xs font-bold mt-2">Harmonious Color Preset</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-3xl bg-zinc-900 border border-white/10 shadow-xl flex flex-col justify-center items-center gap-1">
                            <span className="text-xs font-bold text-white">Inter</span>
                            <span className="text-[8px] text-zinc-500">Outfit</span>
                          </div>
                          <span className="text-xs font-bold mt-2">Premium Type Typography</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div 
                      key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span>IOT ALERTS DASHBOARD</span>
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center p-6">
                        <div className="w-full bg-[#090e1a]/95 rounded-2xl border border-white/5 p-4 flex items-center justify-between shadow-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-base">🚨</div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold">WatchOver Incident Alert</span>
                              <span className="text-[10px] text-zinc-500">Node ID: 5218-Secured</span>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400">RESOLVED</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </section>

        {/* 🎛️ 5. Key Capabilities Bento Grid Section */}
        <section id="capabilities" className="w-full max-w-7xl px-6 py-24 flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
              <Layers className="w-3 h-3" /> Capabilities
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight mt-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              High-Performance Systems & Interfaces
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Recreating Bento-Grid widgets showcasing technical load scales and system integration efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
            
            {/* Card 1: Unified Data Architectures */}
            <div className={`rounded-3xl border p-6 shadow-lg relative overflow-hidden backdrop-blur-md ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60' : 'border-slate-200 bg-white/70'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-[#1eb8ce] font-bold uppercase tracking-widest">SYSTEM SPEED</span>
                  <h3 className={`text-lg sm:text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Data Pipelines Optimization</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">🚀</div>
              </div>
              <p className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Advanced static prerendering models and backend caches driving extreme performance ratios.
              </p>
              
              <div className="mt-8 bg-black/35 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-zinc-500 block">SYSTEM LOAD SCALE</span>
                  <span className="text-xl font-bold text-white block mt-0.5">+450%</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block">DB QUERY DELAY</span>
                  <span className="text-xl font-bold text-emerald-400 block mt-0.5">0.02ms</span>
                </div>
              </div>
            </div>

            {/* Card 2: Autonomous Agents Log (Animated marquee vertical list) */}
            <div className={`rounded-3xl border p-6 shadow-lg relative overflow-hidden backdrop-blur-md ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60' : 'border-slate-200 bg-white/70'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">AI AGENTS</span>
                  <h3 className={`text-lg sm:text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Autonomous Automation</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">🤖</div>
              </div>
              
              <div className="h-28 overflow-hidden relative border border-white/5 rounded-2xl bg-black/45 p-3 shadow-inner">
                <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
                <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
                
                {/* Scrolling task marquee */}
                <div className="space-y-2 animate-[pulse_3s_infinite] font-mono text-[9px] text-zinc-400">
                  <p className="text-[#1eb8ce]">✓ Deploying secured Deno edge handlers...</p>
                  <p className="text-purple-400">✓ Integrating secure Resend communication flows...</p>
                  <p className="text-emerald-400">✓ Systems calculations updated live...</p>
                  <p className="text-white">✓ High-fidelity UI audit validated successfully...</p>
                </div>
              </div>
            </div>

            {/* Card 3: Frosted Glass UI Mockup */}
            <div className={`rounded-3xl border p-6 shadow-lg relative overflow-hidden backdrop-blur-md ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60' : 'border-slate-200 bg-white/70'}`}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">INTERFACE FOUNDRY</span>
                  <h3 className={`text-lg sm:text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Dynamic Premium Styling</h3>
                </div>
              </div>
              <p className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Recreating the high-end glassmorphic navbar with customizable backdrop saturation levels.
              </p>
              
              <div className="mt-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md p-3 flex items-center justify-between text-xs font-semibold">
                <span className="text-zinc-300">Glass Saturate Factor</span>
                <span className="text-[#1eb8ce] font-extrabold">180% Blur</span>
              </div>
            </div>

            {/* Card 4: Currency Exchange / CRM Integration */}
            <div className={`rounded-3xl border p-6 shadow-lg relative overflow-hidden backdrop-blur-md ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60' : 'border-slate-200 bg-white/70'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">CRM OPERATIONS</span>
                  <h3 className={`text-lg sm:text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Unified Workflow Transits</h3>
                </div>
              </div>

              {/* CRM Mock Completed Transfer Card Widget */}
              <div className="bg-black/35 border border-white/5 rounded-2xl p-4 flex flex-col gap-2 mt-4 text-[10px] sm:text-xs">
                <div className="flex justify-between items-center text-zinc-500">
                  <span>From: Systems Consultation</span>
                  <span>To: CRM Database Flow</span>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-2 font-bold">
                  <span className="text-white">$15,000 USD</span>
                  <span className="text-emerald-400">✓ Transfer Completed</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 💬 6. Testimonials Section (Dual Infinite Sliding Marquees) */}
        <section id="testimonials" className={`w-full py-24 border-t transition-colors duration-500 overflow-hidden ${isDarkMode ? 'border-white/5 bg-zinc-950/20' : 'border-slate-200 bg-slate-100/40'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
              <Star className="w-3 h-3" /> Testimonials
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight mt-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Trusted by Leading Tech Founders
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Hear directly from structural architects and brand strategists who have collaborated with us globally.
            </p>
          </div>

          {/* Testimonial Infinite Sliding Rails */}
          <div className="flex flex-col gap-6 w-full relative">
            
            {/* Fade Out Overlays Left & Right */}
            <div className="absolute inset-y-0 left-0 w-20 md:w-48 bg-gradient-to-r from-[#020817] to-transparent pointer-events-none z-10 transition-colors" />
            <div className="absolute inset-y-0 right-0 w-20 md:w-48 bg-gradient-to-l from-[#020817] to-transparent pointer-events-none z-10 transition-colors" />

            {/* Row 1 - Sliding Left */}
            <div className="overflow-hidden w-full flex items-center">
              <div className="animate-marquee-left flex gap-6">
                {[...testimonialsRow1, ...testimonialsRow1].map((card, idx) => (
                  <div 
                    key={idx}
                    className={`w-[290px] sm:w-[350px] p-6 rounded-2xl border backdrop-blur-md flex flex-col justify-between shrink-0 shadow-md ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60 text-white' : 'border-slate-200 bg-white text-slate-800'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-0.5">
                          {Array.from({ length: card.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-zinc-600 text-xs font-semibold uppercase">{card.platform}</span>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                        "{card.text}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                        <Image src={card.avatar} alt={card.name} fill className="object-cover grayscale" />
                      </div>
                      <div className="flex flex-col text-[11px]">
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{card.name}</span>
                        <span className="text-zinc-500">{card.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2 - Sliding Right */}
            <div className="overflow-hidden w-full flex items-center">
              <div className="animate-marquee-right flex gap-6">
                {[...testimonialsRow2, ...testimonialsRow2].map((card, idx) => (
                  <div 
                    key={idx}
                    className={`w-[290px] sm:w-[350px] p-6 rounded-2xl border backdrop-blur-md flex flex-col justify-between shrink-0 shadow-md ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60 text-white' : 'border-slate-200 bg-white text-slate-800'}`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-0.5">
                          {Array.from({ length: card.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-zinc-600 text-xs font-semibold uppercase">{card.platform}</span>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                        "{card.text}"
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3 border-t border-white/5 pt-4 mt-6">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 bg-zinc-800">
                        <Image src={card.avatar} alt={card.name} fill className="object-cover grayscale" />
                      </div>
                      <div className="flex flex-col text-[11px]">
                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{card.name}</span>
                        <span className="text-zinc-500">{card.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 💵 7. Engagement Tiers Section (Pricing Replication) */}
        <section id="retainers" className="w-full max-w-7xl px-6 py-24 flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
              <Layers className="w-3 h-3" /> RETAINERS
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight mt-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Flexible Engagement Retainers
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Choose the perfect tier to launch technical systems architecture and premium brand design operations.
            </p>

            {/* Retainer Cycle toggle */}
            <div className="flex items-center gap-3 border border-white/10 rounded-full p-1 bg-white/5 backdrop-blur-md mt-8 shadow-sm">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-[#1eb8ce] text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
              >
                Monthly Plan
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${billingCycle === 'yearly' ? 'bg-[#1eb8ce] text-black shadow-sm' : 'text-zinc-400 hover:text-white'}`}
              >
                Annual Retention <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full ml-1 font-bold">SAVE 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl items-stretch">
            
            {/* Basic Plan: Systems Blueprint */}
            <div className={`rounded-3xl border p-8 flex flex-col justify-between backdrop-blur-md shadow-md transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60 text-white' : 'border-slate-200 bg-white text-slate-800'}`}>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Tier 01</span>
                <h3 className="text-xl font-bold">Systems Audit & Blueprint</h3>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">Perfect for cataloging code bottlenecks, DB structures, and charting design system assets.</p>
                
                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {billingCycle === 'monthly' ? '$4,999' : '$3,999'}
                  </span>
                  <span className="text-zinc-500 text-xs font-semibold">/ month</span>
                </div>

                <ul className="space-y-3.5 border-t border-white/5 pt-6 text-xs sm:text-sm">
                  {["System Architecture Mapping", "UI/UX Visual Brand Audits", "AI Automation Readiness Report", "Direct Slack Core Channel Support"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-zinc-400">
                      <Check className="w-4 h-4 text-[#1eb8ce]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsInquiryOpen(true)}
                className={`w-full h-11 rounded-full font-bold text-xs sm:text-sm tracking-wide mt-8 border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Inquire Details
              </button>
            </div>

            {/* Premium Plan: Dedicated Sprint Operations */}
            <div className={`rounded-3xl border-[2.5px] p-8 flex flex-col justify-between backdrop-blur-md shadow-2xl relative transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'border-[#1eb8ce]/40 bg-[#090e1a]/85 text-white shadow-cyan-500/5' : 'border-cyan-500/40 bg-white text-slate-800'}`}>
              <div className="absolute top-4 right-4 bg-[#1eb8ce]/25 border border-[#1eb8ce]/30 text-[#1eb8ce] text-[9px] font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
                MOST POPULAR
              </div>

              <div>
                <span className="text-[10px] text-[#1eb8ce] font-bold uppercase tracking-wider block mb-2">Tier 02</span>
                <h3 className="text-xl font-bold">Dedicated Sprint Operations</h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">Fully committed code execution. Active database migrations, AI routing systems, and high-fidelity launch UI pages.</p>
                
                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {billingCycle === 'monthly' ? '$9,999' : '$7,999'}
                  </span>
                  <span className="text-zinc-400 text-xs font-semibold">/ month</span>
                </div>

                <ul className="space-y-3.5 border-t border-white/10 pt-6 text-xs sm:text-sm">
                  {["Everything inside Tier 01", "Active Infrastructure Overhauls", "Full UI/UX Interface Production", "Autonomous AI Agents Launch", "24/7 Server Status Surveillance"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-zinc-300">
                      <Check className="w-4 h-4 text-[#1eb8ce]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsInquiryOpen(true)}
                className="w-full h-11 rounded-full font-bold text-xs sm:text-sm tracking-wide mt-8 bg-[#1eb8ce] text-black hover:bg-cyan-400 shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)] transition-all duration-300"
              >
                Secure Retainer
              </button>
            </div>

            {/* Pro Plan: Fractional CTO Retention */}
            <div className={`rounded-3xl border p-8 flex flex-col justify-between backdrop-blur-md shadow-md transition-all duration-300 hover:scale-[1.02] ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60 text-white' : 'border-slate-200 bg-white text-slate-800'}`}>
              <div>
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-2">Tier 03</span>
                <h3 className="text-xl font-bold">Fractional CTO Retention</h3>
                <p className="text-xs text-zinc-500 mt-2 leading-relaxed">Dedicated system oversight, engineering leadership roadmap, and ongoing backend protection retainers.</p>
                
                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {billingCycle === 'monthly' ? '$14,999' : '$11,999'}
                  </span>
                  <span className="text-zinc-500 text-xs font-semibold">/ month</span>
                </div>

                <ul className="space-y-3.5 border-t border-white/5 pt-6 text-xs sm:text-sm">
                  {["Everything inside Tier 02", "Engineering Hiring Roadmap Guidance", "Enterprise System Threat Audits", "Custom Operational CRM Management", "Bi-weekly Board Advisory Calls"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-zinc-400">
                      <Check className="w-4 h-4 text-[#1eb8ce]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setIsInquiryOpen(true)}
                className={`w-full h-11 rounded-full font-bold text-xs sm:text-sm tracking-wide mt-8 border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-white hover:bg-white/10' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                Inquire Partnership
              </button>
            </div>

          </div>
        </section>

        {/* ❓ 8. Common Inquiries Section (FAQ Accordion Grid) */}
        <section id="faq" className={`w-full py-24 border-t transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-zinc-950/20' : 'border-slate-200 bg-slate-100/40'}`}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* FAQ Left Block */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
                  <HelpCircle className="w-3 h-3" /> FAQ
                </span>
                <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight mt-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Frequently Answered Inquiries
                </h2>
                <p className={`text-xs sm:text-sm mt-3 leading-relaxed transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Find quick architectural resolutions addressing integration periods, design verification, and partnership retainer cycles.
                </p>
              </div>

              {/* FAQ Help CTA Card widget */}
              <div className={`p-6 border rounded-2xl mt-8 flex flex-col gap-4 relative overflow-hidden ${isDarkMode ? 'border-white/5 bg-black/60 shadow-[0_8px_32px_0px_rgba(0,0,0,0.3)]' : 'border-slate-200 bg-white shadow-[0_8px_32px_0px_rgba(31,38,135,0.04)]'}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(30,184,206,0.1),transparent_50%)] pointer-events-none" />
                <span className="text-xs font-extrabold uppercase text-[#1eb8ce]">Can't find structural answers?</span>
                <p className="text-[11px] text-zinc-500 leading-normal">Our technical team is ready to map out a dedicated systems audit roadmap.</p>
                <button 
                  onClick={() => setIsInquiryOpen(true)}
                  className={`h-9 w-fit px-5 py-2 rounded-full font-bold text-xs transition-all duration-500 shadow-md ${isDarkMode ? 'bg-[#1eb8ce] text-black hover:bg-cyan-400 shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* FAQ Accordion Stack (Right) */}
            <div className="lg:col-span-7 space-y-4">
              {faqData.map((faq, index) => (
                <div 
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60 shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]' : 'border-slate-200 bg-white shadow-sm'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer"
                  >
                    <span className={isDarkMode ? 'text-white' : 'text-slate-800'}>{faq.question}</span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${openFaq === index ? 'border-cyan-500/40 bg-cyan-500/10 text-[#1eb8ce] rotate-90' : 'border-white/5 bg-white/5 text-zinc-500'}`}>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className={`px-6 pb-6 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 🌟 9. Grand Finale Bottom CTA Banner */}
        <section className="w-full max-w-5xl px-6 py-20 relative flex flex-col items-center">
          <div className={`w-full rounded-3xl border p-12 text-center relative overflow-hidden backdrop-blur-md shadow-2xl ${isDarkMode ? 'border-[#1eb8ce]/30 bg-black/60 shadow-cyan-500/5' : 'border-slate-200 bg-white shadow-slate-900/10'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(30,184,206,0.1),transparent_60%)] pointer-events-none" />
            
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
              ● Ready to scale?
            </span>
            
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight mt-6 leading-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Let's Build the Future of Your System Architecture
            </h2>
            <p className={`text-sm sm:text-base mt-4 max-w-xl mx-auto transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Submit a detailed collaboration request to align on structural blueprints, AI agent strategies, and premium layouts.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 z-10 relative">
              <button 
                onClick={() => setIsInquiryOpen(true)}
                className={`h-11 px-8 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 duration-500 transition-all ${isDarkMode ? 'bg-[#1eb8ce] text-black hover:bg-cyan-400 shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                Inquire Collaboration
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="https://wa.me/918128181213?text=Hi%2C%20I%20just%20saw%20your%20profile%20on%20dhv7.com%20and"
                target="_blank"
                rel="noopener noreferrer"
                className={`h-11 px-8 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#1eb8ce] hover:bg-white/10' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'}`}
              >
                Chat on WhatsApp
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 🤝 Premium Branded Footer */}
      <footer className={`border-t py-12 text-xs sm:text-sm w-full relative z-10 transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-zinc-950/20 text-zinc-500' : 'border-slate-200 bg-white text-slate-600 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
          <div className="flex items-center">
            <div className="relative w-16 h-16 overflow-hidden flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <Image 
                src={isDarkMode ? "/assets/dhv7-logo-icon.png" : "/assets/dhv7-logo-icon-dark.png"} 
                alt="DHV7 Logo" 
                width={64} 
                height={64} 
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <p className="text-[11px] text-zinc-500">© {new Date().getFullYear()} Dhaval Vadgama. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://linkedin.com/in/dhavalvadgama" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com/dhavalvadgama" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 🤝 Premium Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
