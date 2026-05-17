'use client';
import { motion } from 'framer-motion';
import { Layers, Briefcase, Cpu } from 'lucide-react';

const skills = [
  {
    icon: <Briefcase className="w-6 h-6 text-blue-400" />,
    title: "Product & Project Strategy",
    subtitle: `${new Date().getFullYear() - 2011}+ Years of Leadership`,
    description: "End-to-end product execution, roadmap scoping, and scaling operations. Veteran in managing multi-disciplinary teams, aligning cross-functional workflows, and bridging engineering with market growth.",
    bgClass: "from-blue-500/10 to-transparent",
    borderClass: "border-blue-500/20"
  },
  {
    icon: <Layers className="w-6 h-6 text-purple-400" />,
    title: "UI/UX & Creative Direction",
    subtitle: "Award-Winning Systems",
    description: "Co-founded a Top 10 Indian UI/UX Startup serving 60+ global clients. Blending high-end aesthetics, responsive bento grids, tactile micro-animations, and meticulous branding systems.",
    bgClass: "from-purple-500/10 to-transparent",
    borderClass: "border-purple-500/20"
  },
  {
    icon: <Cpu className="w-6 h-6 text-emerald-400" />,
    title: "Applied AI & Tech Ops",
    subtitle: "Next-Gen Engineering",
    description: "Automating systems utilizing advanced language models and agent orchestration. Bridging code, system configurations, APIs, and modern frontends with state-of-the-art frameworks.",
    bgClass: "from-emerald-500/10 to-transparent",
    borderClass: "border-emerald-500/20"
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="py-32 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Expertise <span className="text-zinc-500">Unpacked</span></h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto">
            True digital impact lives at the intersection of robust execution structure, premium visual craftsmanship, and next-generation technical innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`glass-panel p-10 relative overflow-hidden group hover:border-white/20 transition-colors`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${skill.bgClass} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl glass-panel border ${skill.borderClass} flex items-center justify-center mb-8`}>
                  {skill.icon}
                </div>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 block">{skill.subtitle}</span>
                <h3 className="text-2xl font-bold mb-4">{skill.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  {skill.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
