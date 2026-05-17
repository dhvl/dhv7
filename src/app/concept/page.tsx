'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import SelectedWork from '@/components/SelectedWork';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';
import InquiryModal from '@/components/InquiryModal';

import Image from 'next/image';

export default function Home() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      <Navbar onOpenInquiry={() => setIsInquiryOpen(true)} />
      
      {/* Content wrapper taking up remaining space to push footer down */}
      <main className="flex-grow pt-24">
        <Hero />
        <Expertise />
        <SelectedWork />
        <Philosophy />
        <Contact onOpenInquiry={() => setIsInquiryOpen(true)} />
      </main>
      
      {/* Premium Branded Footer */}
      <footer className="border-t border-white/5 bg-zinc-950/20 backdrop-blur-md py-12 text-zinc-500 text-sm w-full relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
          <div className="flex items-center">
            <div className="relative w-16 h-16 overflow-hidden flex items-center justify-center transition-transform hover:scale-105 duration-300">
              <Image 
                src="/assets/dhv7-logo-icon.png" 
                alt="DHV7 Logo" 
                width={64} 
                height={64} 
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <p className="text-zinc-600 text-xs">© {new Date().getFullYear()} Dhaval Vadgama. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://linkedin.com/in/dhavalvadgama" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://github.com/dhavalvadgama" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Inquiry Modal Popup */}
      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} />
    </div>
  );
}
