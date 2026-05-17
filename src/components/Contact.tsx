'use client';
import { motion } from 'framer-motion';
import { Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';

interface ContactProps {
  onOpenInquiry: () => void;
}

export default function Contact({ onOpenInquiry }: ContactProps) {
  const whatsappUrl = "https://wa.me/918128181213?text=Hi%2C%20I%20just%20saw%20your%20profile%20on%20dhv7.com%20and";

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
              <button 
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-3 px-8 py-5 bg-white text-black font-semibold rounded-full text-base hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 cursor-pointer"
              >
                Launch an Inquiry
                <ArrowUpRight className="w-5 h-5" />
              </button>
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
            {/* Card 1: WhatsApp Inquiry */}
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 rounded-[32px] border border-white/5 glass-panel hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:bg-[#25D366]/20 group-hover:border-[#25D366]/30 transition-colors">
                <svg 
                  className="w-5 h-5 text-zinc-400 group-hover:text-[#25D366] transition-colors" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                </svg>
              </div>
              <div>
                <span className="text-xs text-zinc-500 block mb-1">WhatsApp Inquiry</span>
                <span className="text-sm md:text-base font-semibold text-[#25D366] block">Chat Instantly</span>
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
                <span className="text-xs text-zinc-500 block mb-1">Direct Call</span>
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
