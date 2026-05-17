import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import SelectedWork from '@/components/SelectedWork';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <Expertise />
      <SelectedWork />
      <Philosophy />
      <Contact />
      
      {/* Premium Branded Footer */}
      <footer className="border-t border-white/5 bg-zinc-950/20 backdrop-blur-md py-12 text-zinc-500 text-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-heading font-bold text-lg text-white tracking-widest">DHV7</span>
            <p className="text-xs text-zinc-600">Built with next-generation design systems and absolute technical alignment.</p>
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
    </main>
  );
}
