'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
      
      {/* Background Grid Lines & Radiant Ambient Glow */}
      <div className="absolute inset-0 z-[-1] bg-[url('/grid.svg')] bg-center opacity-[0.15] pointer-events-none [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      
      {/* Profile Picture with Custom Gradient Glow */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-32 h-32 md:w-36 md:h-36 mb-10 rounded-full p-[2px] bg-gradient-to-tr from-blue-500 via-purple-500 to-indigo-500 shadow-2xl shadow-purple-500/20"
      >
        <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
          <Image 
            src="/assets/profile-picture-dhaval-sqr.png" 
            alt="Dhaval Vadgama" 
            fill
            sizes="(max-w-768px) 128px, 144px"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            priority
          />
        </div>
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-dashed border-white/20 -z-10 scale-110"
        />
      </motion.div>

      {/* Status Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 glass-panel text-xs text-zinc-400 mb-8"
      >
        <div className="flex items-center gap-2">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </div>
          <span className="uppercase tracking-widest font-semibold">Available for selective consultation</span>
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 max-w-5xl text-gradient leading-[1.15]"
      >
        Architecting Systems. <br className="hidden md:block" />
        Guiding <span className="brand-gradient">Products & UI/UX.</span>
      </motion.h1>

      {/* Subheadline Copy (CV Infused) */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-3xl mb-12 leading-relaxed"
      >
        I'm <strong className="text-white font-medium">Dhaval Vadgama</strong>. Over <strong className="text-white font-medium">11+ years</strong> of driving product lifecycle execution, leading high-growth scaling strategies, building top-10 award-winning UI/UX agencies, and engineering modern AI-powered systems.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-5 z-10"
      >
        <a href="#work" className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium text-base hover:bg-zinc-200 transition-colors">
          Explore Selected Works
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#expertise" className="group flex items-center gap-2 px-8 py-4 glass-panel text-white rounded-full font-medium text-base hover:bg-white/10 transition-colors">
          Unpack Capabilities
          <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}
