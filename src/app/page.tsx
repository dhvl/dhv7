'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, Sun, Moon, Bell, Shield, ArrowUpRight, Battery, Wifi, 
  Menu, HelpCircle, Star, Terminal, Zap, Layers, Cpu, Check, MessageCircle, AlertCircle,
  Video, Calendar, Clock, Globe, Building, Mail, User
} from 'lucide-react';
import Image from 'next/image';
import InquiryModal from '@/components/InquiryModal';
import SchedulerModal from '@/components/SchedulerModal';

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
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    'Product Strategy',
    'UI/UX Direction',
    'Applied AI & Automation',
    'Full-Stack Development',
    'Custom Brand Strategy'
  ];
  const [selectedServices, setSelectedServices] = useState<string[]>(['Product Strategy']);

  // Direct Meet Custom Booking states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', company: '', notes: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [meetLink, setMeetLink] = useState('');
  const [userTimeZone, setUserTimeZone] = useState('Asia/Kolkata');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (detected) {
          setUserTimeZone(detected);
        }
      } catch (e) {
        console.error("TimeZone detection error:", e);
      }
    }
  }, []);

  // Custom booking calendar calculations
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const yearNum = currentDate.getFullYear();
  const monthNum = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(yearNum, monthNum);
  const firstDay = getFirstDayOfMonth(yearNum, monthNum);

  // Generate days grid array
  const daysArray: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(new Date(yearNum, monthNum, d));
  }

  const getAvailableSlots = (date: Date | null) => {
    if (!date) return [];
    
    // Check if the selected date (in local browser calendar) is a weekend
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // Dhaval's native availability hours in Asia/Kolkata timezone:
    // Weekdays: 7:00 PM - 11:00 PM (19:00, 20:00, 21:00, 22:00 starting hours for 60-min slots)
    // Weekends: 11:00 AM - 11:00 PM (11:00 to 22:00 starting hours for 60-min slots)
    const kolkataHours = isWeekend 
      ? [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      : [19, 20, 21, 22];

    const slots: string[] = [];
    
    kolkataHours.forEach(hour => {
      // Construct a Date object representing the slot time in Kolkata timezone (+05:30)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hh = String(hour).padStart(2, '0');
      const isoStr = `${year}-${month}-${day}T${hh}:00:00+05:30`;
      const slotDate = new Date(isoStr);
      
      // Format to user's native timezone
      const formattedTime = slotDate.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      // Check if slot shifts day in user's timezone relative to selected browser date
      let dayBadge = '';
      if (slotDate.getDate() !== date.getDate()) {
        const diffTime = slotDate.getTime() - date.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          dayBadge = ' (+1d)';
        } else if (diffDays < 0) {
          dayBadge = ' (-1d)';
        }
      }
      
      slots.push(`${formattedTime}${dayBadge}`);
    });
    
    return slots;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.notes) return;
    setBookingStatus('submitting');
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 5) + "-" + 
                       Math.random().toString(36).substring(2, 6) + "-" + 
                       Math.random().toString(36).substring(2, 5);
      setMeetLink(`meet.google.com/${randomId}`);
      setBookingStatus('success');
    }, 1500);
  };

  const handleResetBooking = () => {
    setSelectedTime(null);
    setBookingForm({ name: '', email: '', company: '', notes: '' });
    setBookingStatus('idle');
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

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
      
      {/* 🌌 Atmospheric Scenic Lighting Backdrops (Fidelity Auroral Palette) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Top-Left Ambient Glow (Vibrant Red) */}
        <div className={`absolute top-[-15%] left-[5%] w-[60vw] h-[60vw] rounded-full filter blur-[140px] transition-all duration-500 ${isDarkMode ? 'bg-radial from-[#FF3333]/15 to-transparent' : 'bg-radial from-[#FF3333]/8 to-transparent'}`} />
        
        {/* Top-Right Ambient Glow (Golden Yellow) */}
        <div className={`absolute top-[-15%] right-[5%] w-[60vw] h-[60vw] rounded-full filter blur-[140px] transition-all duration-500 ${isDarkMode ? 'bg-radial from-[#FFE600]/10 to-transparent' : 'bg-radial from-[#FFE600]/5 to-transparent'}`} />
        
        {/* Center / Hero Transition Ambient Glow (Cyber Cyan & Magenta bleed) */}
        <div className={`absolute top-[10%] left-1/2 -translate-x-1/2 w-[70vw] h-[60vw] rounded-full filter blur-[130px] transition-all duration-500 ${isDarkMode ? 'bg-radial from-[#00C3FF]/15 via-[#FF007F]/8 to-transparent' : 'bg-radial from-[#00C3FF]/8 via-[#FF007F]/4 to-transparent'}`} />
        
        {/* Mid-page Ambient Glow (Cyber Cyan) */}
        <div className={`absolute top-[35%] right-[-10%] w-[55vw] h-[55vw] rounded-full filter blur-[150px] transition-all duration-500 ${isDarkMode ? 'bg-radial from-[#00C3FF]/12 to-transparent' : 'bg-radial from-[#00C3FF]/6 to-transparent'}`} />
        
        {/* Lower Ambient Glow (Vivid Pink/Magenta) */}
        <div className={`absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] rounded-full filter blur-[150px] transition-all duration-500 ${isDarkMode ? 'bg-radial from-[#FF007F]/12 to-transparent' : 'bg-radial from-[#FF007F]/6 to-transparent'}`} />
        
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
            <a href="#booking" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>Book a Call</a>
            <a href="#faq" className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>FAQ</a>
          </nav>

          {/* Right Interface Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF] hover:bg-white/10 shadow-[inset_0_-2px_6px_0px_rgba(0,195,255,0.2)]' : 'border-slate-200 bg-slate-100 text-cyan-600 hover:bg-slate-200'}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => setIsSchedulerOpen(true)}
              className={`h-9 px-5 py-2 rounded-full font-medium text-xs sm:text-sm tracking-tight transition-all duration-500 shadow-md ${isDarkMode ? 'bg-[#00C3FF] text-black hover:bg-[#FFE600] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
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
            <span>{totalExperience}+ YEARS OF RELENTLESS OPERATIONAL SYNERGY</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mt-6 max-w-5xl leading-[1.1] transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
          >
            Translating Chaotic Friction <br />
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-[#FF007F] via-[#FFE600] to-[#00C3FF]' : 'from-[#E60067] via-[#D9B200] to-[#0092CC]'}`}>Into Seamless Systems.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`max-w-3xl text-base sm:text-lg lg:text-xl mt-6 leading-relaxed transition-colors duration-500 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}
          >
            An obsessive digital explorer bridging the gap between premium design logic and bulletproof code execution. I don’t wait for blueprints—I design the frameworks, assemble the pipelines, and build products that demand to be noticed.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-10 z-10"
          >
            <button 
              onClick={() => setIsSchedulerOpen(true)}
              className={`h-11 px-8 rounded-full font-medium text-base tracking-wide flex items-center gap-2 duration-500 transition-all ${isDarkMode ? 'bg-[#00C3FF] text-black hover:bg-[#FFE600] hover:shadow-[#00C3FF]/20 hover:shadow-xl shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              Launch Inquiry
              <ArrowRight className="w-4 h-4" />
            </button>

            <a 
              href={`https://wa.me/918128181213?text=${encodeURIComponent('Hi, I just saw your profile on dhv7.com and would like to align on Product Strategy, Applied AI & Automation, Custom Brand Strategy')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`h-11 px-8 rounded-full font-medium text-base tracking-wide flex items-center gap-2 border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF] hover:bg-white/10 hover:border-white/20' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'}`}
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
              <div className={`w-[60%] h-[60%] rounded-full filter blur-[80px] opacity-25 ${isDarkMode ? 'bg-gradient-to-tr from-[#FF007F] via-[#FFE600] to-[#00C3FF]' : 'bg-gradient-to-tr from-[#FF007F]/30 via-[#FFE600]/20 to-[#00C3FF]/30'}`} />
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
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#00C3FF]/30 bg-zinc-900">
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

                  <div className="rounded-2xl p-4 bg-gradient-to-br from-[#FF007F] via-[#FFE600]/80 to-[#00C3FF] text-white shadow-lg relative overflow-hidden mb-5">
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
                      <svg className="w-full h-full text-[#00C3FF]" viewBox="0 0 100 40" fill="none">
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
              <span className="text-[9px] font-bold tracking-widest text-[#00C3FF] uppercase">GLOBAL METRICS</span>
              <h4 className="text-2xl font-extrabold mt-1 tracking-tight">50+ Projects</h4>
              <p className="text-[10px] text-zinc-500 mt-1 leading-normal">Successfully executed, deployed, and branded globally with 100% customer rate.</p>
            </motion.div>

          </div>
        </section>

        {/* 🎬 4. The Core Blueprint (Features Alternate Sticky-Scroll-like Showcase) */}
        <section id="showcase" className={`w-full max-w-7xl px-6 py-24 border-t transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-zinc-950/20' : 'border-slate-200 bg-slate-100/40'}`}>
          <div className="flex flex-col items-center text-center mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
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
                { title: "AI Pipeline Automation", desc: "Building autonomous systems running edge microservices to drive daily processes.", icon: (dark: boolean) => <Cpu className={`w-5 h-5 ${dark ? 'text-cyan-400' : 'text-cyan-600'}`} /> },
                { title: "Scalable Enterprise Architectures", desc: "Designing bulletproof API layers, secure database backends, and highly active CRMs.", icon: (dark: boolean) => <Layers className={`w-5 h-5 ${dark ? 'text-indigo-400' : 'text-indigo-600'}`} /> },
                { title: "High-End Visual Identity", desc: "Co-founding top creative design startups to elevate interface standards to direct premium status.", icon: (dark: boolean) => <Star className={`w-5 h-5 ${dark ? 'text-purple-400' : 'text-purple-600'}`} /> },
                { title: "IoT Alert Networks", desc: "Deploying secure, real-time alert modules keeping physical data tracking connected.", icon: (dark: boolean) => <Terminal className={`w-5 h-5 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`} /> }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-500 flex gap-4 ${activeStep === idx 
                    ? (isDarkMode ? 'border-white/10 bg-white/5 shadow-lg' : 'border-slate-300 bg-white shadow-md') 
                    : (isDarkMode ? 'border-transparent hover:bg-white/[0.02]' : 'border-transparent hover:bg-slate-200/50')}`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${activeStep === idx ? 'border-cyan-500/30 bg-cyan-500/10' : (isDarkMode ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-slate-100')}`}>
                    {item.icon(isDarkMode)}
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
                      <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                          <Terminal className={`w-4 h-4 ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`} />
                          <span>AI PIPELINE CONSOLE</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">ACTIVE</span>
                      </div>
                      <div className="flex-grow flex items-center justify-center p-6">
                        <div className={`w-full rounded-xl p-4 font-mono text-[10px] sm:text-xs space-y-1.5 overflow-hidden shadow-inner transition-colors ${isDarkMode ? 'bg-black/60 border border-white/5 text-cyan-400' : 'bg-slate-900 border border-slate-800 text-cyan-400'}`}>
                          <p className="text-zinc-500">// Initializing autonomous agent stack</p>
                          <p className="text-zinc-300">$ npx build-ai-agent-engine --domain dhv7.com</p>
                          <p className="text-emerald-400">✓ System variables loaded from secure Deno storage</p>
                          <p className="text-purple-400">🤖 Connecting vector storage models (Dolly/Deno)...</p>
                          <p className={`transition-colors ${isDarkMode ? 'text-white' : 'text-zinc-200'}`}>🚀 Agent operational. Uptime: 100%. Processing inputs...</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 1 && (
                    <motion.div 
                      key="step1" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                          <Layers className={`w-4 h-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                          <span>SYSTEM PERFORMANCE</span>
                        </div>
                        <span className={`text-[10px] font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>API STATUS: 100% OK</span>
                      </div>
                      <div className="flex-grow grid grid-cols-2 gap-4 p-6 items-center">
                        <div className={`p-4 border rounded-2xl text-center shadow-lg transition-colors ${isDarkMode ? 'bg-[#090e1a]/80 border-white/5' : 'bg-slate-50 border-slate-150'}`}>
                          <span className={`text-[10px] uppercase font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Load Speed optimization</span>
                          <h4 className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-[#00C3FF]' : 'text-cyan-600'}`}>-320ms</h4>
                          <span className={`text-[9px] block mt-1 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>✓ Turbopack Active</span>
                        </div>
                        <div className={`p-4 border rounded-2xl text-center shadow-lg transition-colors ${isDarkMode ? 'bg-[#090e1a]/80 border-white/5' : 'bg-slate-50 border-slate-150'}`}>
                          <span className={`text-[10px] uppercase font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Microservices Security</span>
                          <h4 className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>JWT / SSL</h4>
                          <span className={`text-[9px] block mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>✓ Isolated Sandbox</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 2 && (
                    <motion.div 
                      key="step2" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                          <Star className={`w-4 h-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                          <span>AGENCY IDENTITY DESIGN SYSTEM</span>
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center p-6 gap-6">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 to-indigo-600 shadow-xl flex items-center justify-center text-xl">🎨</div>
                          <span className={`text-xs font-bold mt-2 ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>Harmonious Color Preset</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-3xl shadow-xl flex flex-col justify-center items-center gap-1 border transition-colors ${isDarkMode ? 'bg-zinc-900 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Inter</span>
                            <span className={`text-[8px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Outfit</span>
                          </div>
                          <span className={`text-xs font-bold mt-2 ${isDarkMode ? 'text-zinc-300' : 'text-slate-800'}`}>Premium Type Typography</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeStep === 3 && (
                    <motion.div 
                      key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                        <div className={`flex items-center gap-2 text-xs font-semibold ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                          <Terminal className={`w-4 h-4 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`} />
                          <span>IOT ALERTS DASHBOARD</span>
                        </div>
                      </div>
                      <div className="flex-grow flex items-center justify-center p-6">
                        <div className={`w-full rounded-2xl border p-4 flex items-center justify-between shadow-lg transition-colors ${isDarkMode ? 'bg-[#090e1a]/95 border-white/5' : 'bg-slate-50 border-slate-150'}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-base">🚨</div>
                            <div className="flex flex-col">
                              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>WatchOver Incident Alert</span>
                              <span className={`text-[10px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Node ID: 5218-Secured</span>
                            </div>
                          </div>
                          <span className={`text-xs font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>RESOLVED</span>
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
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
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
                  <span className="text-[10px] text-[#00C3FF] font-bold uppercase tracking-widest">SYSTEM SPEED</span>
                  <h3 className={`text-lg sm:text-xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Data Pipelines Optimization</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">🚀</div>
              </div>
              <p className={`text-xs sm:text-sm transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Advanced static prerendering models and backend caches driving extreme performance ratios.
              </p>
              
              <div className={`mt-8 rounded-2xl p-4 border flex items-center justify-between transition-colors ${isDarkMode ? 'bg-black/35 border-white/5' : 'bg-slate-50 border-slate-150'}`}>
                <div>
                  <span className={`text-[9px] block ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>SYSTEM LOAD SCALE</span>
                  <span className={`text-xl font-bold block mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{`+450%`}</span>
                </div>
                <div>
                  <span className={`text-[9px] block ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>DB QUERY DELAY</span>
                  <span className={`text-xl font-bold block mt-0.5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{`0.02ms`}</span>
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
              
              <div className={`h-28 overflow-hidden relative border rounded-2xl p-3 shadow-inner transition-colors ${isDarkMode ? 'border-white/5 bg-black/45' : 'border-slate-200 bg-slate-900'}`}>
                <div className={`absolute inset-x-0 top-0 h-6 bg-gradient-to-b to-transparent pointer-events-none z-10 ${isDarkMode ? 'from-black' : 'from-slate-900'}`} />
                <div className={`absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t to-transparent pointer-events-none z-10 ${isDarkMode ? 'from-black' : 'from-slate-900'}`} />
                
                {/* Scrolling task marquee */}
                <div className="space-y-2 animate-[pulse_3s_infinite] font-mono text-[9px] text-zinc-400">
                  <p className="text-[#00C3FF]">✓ Deploying secured Deno edge handlers...</p>
                  <p className="text-purple-400">✓ Integrating secure Resend communication flows...</p>
                  <p className="text-emerald-400">✓ Systems calculations updated live...</p>
                  <p className={`transition-colors ${isDarkMode ? 'text-white' : 'text-zinc-200'}`}>✓ High-fidelity UI audit validated successfully...</p>
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
              
              <div className={`mt-8 border rounded-2xl p-3 flex items-center justify-between text-xs font-semibold transition-colors ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-slate-100'}`}>
                <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>Glass Saturate Factor</span>
                <span className={`font-extrabold ${isDarkMode ? 'text-[#00C3FF]' : 'text-cyan-600'}`}>180% Blur</span>
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
              <div className={`border rounded-2xl p-4 flex flex-col gap-2 mt-4 text-[10px] sm:text-xs transition-colors ${isDarkMode ? 'bg-black/35 border-white/5' : 'bg-slate-50 border-slate-150'}`}>
                <div className={`flex justify-between items-center ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
                  <span>From: Systems Consultation</span>
                  <span>To: CRM Database Flow</span>
                </div>
                <div className={`flex justify-between items-center mt-2 border-t pt-2 font-bold ${isDarkMode ? 'border-white/5 text-white' : 'border-slate-150 text-slate-800'}`}>
                  <span>$15,000 USD</span>
                  <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>✓ Transfer Completed</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 💬 6. Testimonials Section (Dual Infinite Sliding Marquees) */}
        <section id="testimonials" className={`w-full py-24 border-t transition-colors duration-500 overflow-hidden ${isDarkMode ? 'border-white/5 bg-zinc-950/20' : 'border-slate-200 bg-slate-100/40'}`}>
          <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center mb-16">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
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
            <div className={`absolute inset-y-0 left-0 w-20 md:w-48 bg-gradient-to-r pointer-events-none z-10 transition-all duration-500 ${isDarkMode ? 'from-[#020817] to-transparent' : 'from-slate-50/90 to-transparent'}`} />
            <div className={`absolute inset-y-0 right-0 w-20 md:w-48 bg-gradient-to-l pointer-events-none z-10 transition-all duration-500 ${isDarkMode ? 'from-[#020817] to-transparent' : 'from-slate-50/90 to-transparent'}`} />

            {/* Row 1 - Sliding Left */}
            <div className="overflow-hidden w-full flex items-center">
              <div className="marquee-slide-left flex gap-6">
                {[...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1, ...testimonialsRow1].map((card, idx) => (
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
              <div className="marquee-slide-right flex gap-6">
                {[...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2, ...testimonialsRow2].map((card, idx) => (
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

        {/* 📅 7. Book a Discovery Call Section (Premium Scheduler Integration) */}
        <section id="booking" className="w-full max-w-7xl px-6 py-24 flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-12">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
              <Calendar className="w-3 h-3 animate-pulse" /> DISCOVERY SESSION
            </span>
            <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight mt-4 transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Book a Discovery Call
            </h2>
            <p className={`text-sm sm:text-base mt-2 max-w-xl transition-colors ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Select an available date and time slot to establish direct systems architecture alignment via a Google Meet session.
            </p>
          </div>

          <div className={`w-full max-w-5xl rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 ${isDarkMode ? 'border-white/5 bg-[#090e1a]/80 shadow-cyan-950/20' : 'border-slate-200 bg-white shadow-slate-100'}`}>
            
            {/* Left Panel: Direct Session Context Details */}
            <div className={`p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r transition-colors relative ${
              isDarkMode 
                ? 'border-white/5 text-white bg-zinc-950/40' 
                : 'border-slate-100 text-slate-800 bg-slate-50/50'
            }`}>
              <div className="space-y-6 flex-grow">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00C3FF]">
                    <Image 
                      src="/assets/profile-picture-dhaval-sqr.png" 
                      alt="Dhaval Vadgama avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#00C3FF] tracking-wider block">Lead Systems Architect</span>
                    <h4 className="text-sm font-bold">Dhaval Vadgama</h4>
                    <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Available Online
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">60-Min Technical & Design Alignment</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    An intensive discovery workshop to map out system requirements, outline backend pipelines, evaluate UI visual fidelity benchmarks, and review project timelines.
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <Clock className="w-4 h-4 text-[#00C3FF]" />
                    <span>60 Minutes Duration</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <Video className="w-4 h-4 text-[#00C3FF]" />
                    <span>Google Meet</span>
                  </div>
                </div>

                {/* 📌 Services Checklist Multi-Selection in free space */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                    Services Required (Select Multiple)
                  </span>
                  <div className="space-y-2">
                    {services.map((service) => {
                      const isChecked = selectedServices.includes(service);
                      return (
                        <label 
                          key={service} 
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer select-none transition-all duration-300 border ${
                            isChecked
                              ? 'bg-[#00C3FF]/10 text-[#00C3FF] border-[#00C3FF]/30'
                              : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleService(service)}
                            className="rounded border-white/15 bg-zinc-900 text-[#00C3FF] focus:ring-0 focus:ring-offset-0 cursor-pointer w-4 h-4"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Confidence Building Stats / Ratings */}
              <div className="pt-6 mt-6 border-t border-white/5 w-full space-y-4">
                <div className={`p-4 rounded-2xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/[0.02] border-white/5 text-zinc-300' 
                    : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
                    <span className={`text-[10px] font-extrabold ml-1.5 px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      isDarkMode ? 'bg-[#00C3FF]/10 text-[#00C3FF]' : 'bg-slate-900/10 text-slate-800'
                    }`}>
                      4.9/5 Rating
                    </span>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    "Dhaval’s architecture workshops are incredibly dense, hyper-practical, and immediately actionable."
                  </p>
                  <span className="text-[9px] font-bold block mt-1.5 opacity-80">— Founder, Applied AI Automation</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-2xl border text-center transition-colors ${
                    isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <span className="text-lg font-black text-[#00C3FF] block tracking-tight">40+</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block mt-0.5">Systems Scaled</span>
                  </div>
                  <div className={`p-3 rounded-2xl border text-center transition-colors ${
                    isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <span className="text-lg font-black text-[#00C3FF] block tracking-tight">100%</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block mt-0.5">Direct Collaboration</span>
                  </div>
                </div>
              </div>
            </div>            {/* Right Panel: Calendar Grid & Form Step Controllers */}
            <div className="p-8 lg:p-10 lg:col-span-7 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {bookingStatus === 'idle' && (
                  <motion.div
                    key="scheduler"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {!selectedTime ? (
                      <div>
                        {/* Step 1: Calendar View */}
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C3FF] block">Step 01 of 02</span>
                            <h4 className="text-lg font-bold">Select Date & Time</h4>
                          </div>
                          
                          {/* Calendar Navigation */}
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={handlePrevMonth}
                              className={`p-2 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
                            >
                              <ChevronRight className="w-4 h-4 rotate-180" />
                            </button>
                            <span className="text-xs font-extrabold uppercase tracking-wider min-w-[90px] text-center">
                              {monthNames[monthNum]} {yearNum}
                            </span>
                            <button 
                              onClick={handleNextMonth}
                              className={`p-2 rounded-full border transition-all ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
                          {daysArray.map((dateItem, idx) => {
                            if (!dateItem) return <div key={`empty-${idx}`} />;
                            
                            const isToday = dateItem.toDateString() === new Date().toDateString();
                            const isSelected = selectedDate ? dateItem.toDateString() === selectedDate.toDateString() : false;
                            
                            // Check if date is in past
                            const todayCheck = new Date();
                            todayCheck.setHours(0, 0, 0, 0);
                            const isPastDate = dateItem.getTime() < todayCheck.getTime();
                            const isWeekend = dateItem.getDay() === 0 || dateItem.getDay() === 6;

                            return (
                              <button
                                key={`day-${idx}`}
                                disabled={isPastDate}
                                onClick={() => {
                                  setSelectedDate(dateItem);
                                  setSelectedTime(null);
                                }}
                                className={`aspect-square w-full rounded-full flex flex-col items-center justify-center text-xs font-semibold relative transition-all duration-300 ${
                                  isSelected 
                                    ? 'bg-[#00C3FF] text-black font-extrabold shadow-lg shadow-[#00C3FF]/30 scale-105' 
                                    : isPastDate 
                                      ? 'text-zinc-600 opacity-20 cursor-not-allowed' 
                                      : isDarkMode 
                                        ? 'text-white hover:bg-white/5' 
                                        : 'text-slate-800 hover:bg-slate-100'
                                }`}
                              >
                                <span>{dateItem.getDate()}</span>
                                {isToday && !isSelected && (
                                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#00C3FF]" />
                                )}
                                {isWeekend && !isPastDate && !isSelected && (
                                  <span className="absolute top-1 right-1 text-[8px] opacity-40 font-bold">WE</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Step 2: Time Slots Strip */}
                        {selectedDate && (
                          <div className="space-y-3 pt-4 border-t transition-colors border-white/5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                              Available slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </span>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[140px] overflow-y-auto pr-1">
                              {getAvailableSlots(selectedDate).map((time, i) => (
                                <button
                                  key={`slot-${i}`}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                                    isDarkMode 
                                      ? 'border-white/5 hover:border-[#00C3FF]/50 bg-white/5 text-white hover:bg-[#00C3FF]/10' 
                                      : 'border-slate-200 hover:border-cyan-500 bg-slate-50 text-slate-700 hover:bg-cyan-50/50'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Booking Details Form input overlay */
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b transition-colors border-white/5">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C3FF] block">Step 02 of 02</span>
                            <h4 className="text-lg font-bold">Guest Booking Details</h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedTime(null)}
                            className={`text-xs font-bold underline transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                          >
                            Change Date/Time
                          </button>
                        </div>

                        <div className="p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-3 transition-colors duration-300 border-dashed border-[#00C3FF]/30 bg-[#00C3FF]/5">
                          <Calendar className="w-4 h-4 text-[#00C3FF]" />
                          <div>
                            <span className="text-[9px] uppercase tracking-wider block text-zinc-400">Appointment Period</span>
                            <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {selectedTime}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold uppercase text-zinc-400">Your Full Name *</label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                              <input 
                                type="text"
                                required
                                value={bookingForm.name}
                                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                placeholder="e.g. Sterling Dynamics"
                                className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none transition-all ${
                                  isDarkMode 
                                    ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                                }`}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold uppercase text-zinc-400">Your Email Address *</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                              <input 
                                type="email"
                                required
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                placeholder="e.g. alex@dynamics.com"
                                className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none transition-all ${
                                  isDarkMode 
                                    ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase text-zinc-400">Company Name (Optional)</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                            <input 
                              type="text"
                              value={bookingForm.company}
                              onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                              placeholder="e.g. Sterling Dynamics Inc."
                              className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none transition-all ${
                                isDarkMode 
                                  ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase text-zinc-400">Brief Project Objectives *</label>
                          <textarea 
                            required
                            rows={3}
                            value={bookingForm.notes}
                            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                            placeholder="Please outline the architecture, integrations, design system goals or product timelines..."
                            className={`w-full p-3.5 rounded-xl text-xs border focus:outline-none transition-all resize-none ${
                              isDarkMode 
                                ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                            }`}
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full h-11 rounded-full font-bold text-xs sm:text-sm tracking-wide mt-4 bg-[#00C3FF] text-black hover:bg-[#FFE600] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Confirm System Call Appointment <ArrowRight className="w-4 h-4" />
                        </button>

                      </form>
                    )}
                  </motion.div>
                )}

                {bookingStatus === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[#00C3FF] animate-spin" />
                    <h4 className="text-base font-bold">Locking Appointment slot...</h4>
                    <p className="text-xs text-zinc-500">Generating direct Google Meet video routing connection details.</p>
                  </motion.div>
                )}

                {bookingStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">Discovery Call Confirmed!</h4>
                      <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
                        Simulated meeting invite dispatched. A Google Meet invitation link has been successfully generated for your technical alignment session.
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border w-full max-w-md text-left text-xs ${isDarkMode ? 'bg-zinc-950/60 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between border-b pb-2.5 transition-colors border-white/5">
                        <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider">Session Partner</span>
                        <span className="font-semibold">{bookingForm.name}</span>
                      </div>
                      <div className="flex justify-between border-b py-2.5 transition-colors border-white/5">
                        <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider">Date & Time</span>
                        <span className="font-semibold">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {selectedTime}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 py-2.5">
                        <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider block">Google Meet Room Link</span>
                        <div className="flex items-center justify-between gap-3 bg-[#00C3FF]/5 p-2 border border-[#00C3FF]/20 rounded-xl">
                          <span className="font-mono text-[#00C3FF] select-all font-bold overflow-hidden text-ellipsis whitespace-nowrap">{meetLink}</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(meetLink)}
                            className="text-[9px] font-bold uppercase px-2.5 py-1 rounded bg-[#00C3FF] text-black hover:bg-[#FFE600] transition-all"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full max-w-xs">
                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=60m+Technical+Alignment+with+Dhaval&dates=${selectedDate?.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${selectedDate?.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=Google+Meet+Discovery+Call+with+Dhaval+Vadgama`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 h-10 rounded-full font-bold text-xs flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300"
                      >
                        Add to Calendar
                      </a>
                      <button
                        onClick={handleResetBooking}
                        className="flex-1 h-10 rounded-full font-bold text-xs bg-[#00C3FF] text-black hover:bg-[#FFE600] transition-all duration-300"
                      >
                        Book Another
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* ❓ 8. Common Inquiries Section (FAQ Accordion Grid) */}
        <section id="faq" className={`w-full py-24 border-t transition-colors duration-500 ${isDarkMode ? 'border-white/5 bg-zinc-950/20' : 'border-slate-200 bg-slate-100/40'}`}>
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* FAQ Left Block */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,195,255,0.1),transparent_50%)] pointer-events-none" />
                <span className="text-xs font-extrabold uppercase text-[#00C3FF]">Can't find structural answers?</span>
                <p className="text-[11px] text-zinc-500 leading-normal">Our technical team is ready to map out a dedicated systems audit roadmap.</p>
                <button 
                  onClick={() => setIsSchedulerOpen(true)}
                  className={`h-9 w-fit px-5 py-2 rounded-full font-bold text-xs transition-all duration-500 shadow-md ${isDarkMode ? 'bg-[#00C3FF] text-black hover:bg-[#FFE600] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
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
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isDarkMode ? 'border-white/5 bg-[#090e1a]/60 shadow-[0_4px_24px_0_rgba(0,0,0,0.15)]' : 'border-slate-200 bg-white shadow-sm hover:border-slate-350'}`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className={`w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/[0.01]' : 'hover:bg-slate-50/50'}`}
                  >
                    <span className={isDarkMode ? 'text-white' : 'text-slate-800'}>{faq.question}</span>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-300 ${openFaq === index ? 'border-cyan-500/40 bg-cyan-500/10 text-[#00C3FF] rotate-90' : (isDarkMode ? 'border-white/5 bg-white/5 text-zinc-500' : 'border-slate-200 bg-slate-100 text-slate-500')}`}>
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
          <div className={`w-full rounded-3xl border p-12 text-center relative overflow-hidden backdrop-blur-md shadow-2xl ${isDarkMode ? 'border-[#00C3FF]/30 bg-black/60 shadow-cyan-500/5' : 'border-slate-200 bg-white shadow-slate-900/10'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,195,255,0.1),transparent_60%)] pointer-events-none" />
            
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF]' : 'border-slate-200 bg-slate-200 text-cyan-600'}`}>
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
                onClick={() => setIsSchedulerOpen(true)}
                className={`h-11 px-8 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 duration-500 transition-all ${isDarkMode ? 'bg-[#00C3FF] text-black hover:bg-[#FFE600] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                Inquire Collaboration
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href={`https://wa.me/918128181213?text=${encodeURIComponent('Hi, I just saw your profile on dhv7.com and would like to align on Product Strategy, Applied AI & Automation, Custom Brand Strategy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`h-11 px-8 rounded-full font-bold text-sm sm:text-base tracking-wide flex items-center gap-2 border transition-all duration-300 ${isDarkMode ? 'border-white/10 bg-white/5 text-[#00C3FF] hover:bg-white/10' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-sm'}`}
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
              <a href="https://linkedin.com/in/dhavalvadgama" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-white text-zinc-500' : 'hover:text-slate-900 text-slate-500'}`}>LinkedIn</a>
              <a href="https://github.com/dhavalvadgama" target="_blank" rel="noopener noreferrer" className={`transition-colors ${isDarkMode ? 'hover:text-white text-zinc-500' : 'hover:text-slate-900 text-slate-500'}`}>GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 🤝 Premium Inquiry Modal */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />

      {/* 📅 Premium Timezone-Aware Scheduler Modal */}
      <SchedulerModal isOpen={isSchedulerOpen} onClose={() => setIsSchedulerOpen(false)} isDarkMode={isDarkMode} />
    </div>
  );
}
