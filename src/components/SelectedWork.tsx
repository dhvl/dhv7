'use client';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: "CCB Group UK",
    category: "Corporate & Web Experience",
    description: "A premium corporate presence engineered for high-performance and absolute conversion. Designed with responsive grids and high-fidelity structural layouts.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS", "SEO Architecture"],
    image: "/projects/ccbgroupuk.png",
    link: "https://ccbgroupuk.com/"
  },
  {
    title: "Decibel Designs",
    category: "Creative Branding & Acoustic Studio",
    description: "An immersive digital showcase designed for India's premium studio soundproofing brand. Merges tactile high-end design aesthetics with optimized UX routing.",
    tech: ["React.js", "Tactile Micro-interactions", "Tailwind CSS", "UI/UX Systems"],
    image: "/projects/decibeldesigns.png",
    link: "https://decibeldesigns.in/"
  },
  {
    title: "WatchOver India",
    category: "Enterprise Product Interface",
    description: "High-security digital interface and web application designed for a premier real-time security firm. Strong layout structures built for trust and operational speed.",
    tech: ["Next.js App Router", "Custom UI Components", "Interactive UX", "Branding Design"],
    image: "/projects/watchoverindia.png",
    link: "https://watchoverindia.com/"
  }
];

export default function SelectedWork() {
  return (
    <section id="work" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-24 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Real-World <span className="text-zinc-500">Products</span></h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            A selection of live, production-grade applications that demonstrate the seamless convergence of premium UI/UX, conversion branding, and high-performance engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.a 
              key={idx}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="group flex flex-col justify-between p-6 rounded-[32px] border border-white/5 glass-panel hover:border-white/20 hover:bg-white/[0.02] hover:-translate-y-1 transition-all duration-500"
            >
              <div>
                {/* Browser Mockup Shell */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl bg-zinc-950">
                  {/* Mockup Header bar */}
                  <div className="h-6 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-1.5 relative z-20">
                    <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    <div className="absolute inset-x-0 mx-auto text-[9px] text-zinc-600 text-center select-none truncate max-w-[50%]">
                      {project.link.replace('https://', '')}
                    </div>
                  </div>
                  
                  {/* Real Screen Capture */}
                  <div className="relative w-full h-[calc(100%-24px)] overflow-hidden">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill
                      sizes="(max-w-768px) 100vw, 400px"
                      className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity z-10" />
                  </div>
                </div>

                <span className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">
                  {project.category}
                </span>
                
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                  {project.title} 
                  <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                </h3>
                
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-[10px] font-medium text-zinc-500 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/5">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
