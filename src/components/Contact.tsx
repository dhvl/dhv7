'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Main Call to Action (Left) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col justify-between p-10 md:p-14 rounded-[32px] border border-white/5 glass-panel relative overflow-hidden"
          >
            {/* Soft Ambient Radial Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none -z-10" />
            
            <div>
              <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4 block">Let's Connect</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
                Let’s build the <br />
                <span className="brand-gradient">Next Big Vibe.</span>
              </h2>
              <p className="text-base md:text-lg text-zinc-400 max-w-xl mb-12 leading-relaxed">
                Whether you need senior product management, an outstanding branding and UI/UX refresh, or cutting-edge AI implementation, let's architect it together.
              </p>
            </div>
            
            <div>
              <a 
                href="mailto:dhavalvadgama@gmail.com" 
                className="inline-flex items-center gap-3 px-8 py-5 bg-white text-black font-semibold rounded-full text-base hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
              >
                Launch an Inquiry
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
          
          {/* Information Bento Grid (Right) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Card 1: Email */}
            <a 
              href="mailto:dhavalvadgama@gmail.com" 
              className="p-8 rounded-[32px] border border-white/5 glass-panel hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 transition-colors">
                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 block mb-1">Email Me Directly</span>
                <span className="text-sm md:text-base font-semibold text-white truncate block">dhavalvadgama@gmail.com</span>
              </div>
            </a>
            
            {/* Card 2: Phone */}
            <a 
              href="tel:+918128181213" 
              className="p-8 rounded-[32px] border border-white/5 glass-panel hover:border-white/20 transition-all flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-purple-500/20 group-hover:border-purple-500/30 transition-colors">
                <Phone className="w-5 h-5 text-zinc-400 group-hover:text-purple-400 transition-colors" />
              </div>
              <div>
                <span className="text-xs text-zinc-500 block mb-1">Call / WhatsApp</span>
                <span className="text-sm md:text-base font-semibold text-white block">+91 8128181213</span>
              </div>
            </a>

            {/* Card 3: Location */}
            <div className="p-8 rounded-[32px] border border-white/5 glass-panel sm:col-span-2 flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-colors">
                  <MapPin className="w-5 h-5 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block">Current Base</span>
                  <span className="text-sm md:text-base font-semibold text-white">Bengaluru, India / Global</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-zinc-400 font-semibold tracking-wider uppercase">
                <Globe className="w-3.5 h-3.5 text-emerald-500 animate-spin-slow" />
                Remote Active
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
