'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
            <Image 
              src="/assets/dhv7-logo-icon.png" 
              alt="DHV7 Logo" 
              width={40} 
              height={40} 
              className="object-contain"
              priority
            />
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <Link href="#expertise" className="hover:text-white transition-colors">Expertise</Link>
          <Link href="#philosophy" className="hover:text-white transition-colors">Philosophy</Link>
          <Link href="#work" className="hover:text-white transition-colors">Selected Work</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Link href="#contact" className="px-5 py-2.5 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white hover:text-black transition-all border border-white/5">
            Let's Collaborate
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
