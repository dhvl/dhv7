'use client';
import { motion } from 'framer-motion';

const principles = [
  {
    num: "01",
    title: "Engineering First, Design Always",
    desc: "A beautiful UI is meaningless if the underlying architecture crashes under load. I build with extreme technical rigor while ensuring the presentation layer is nothing short of breathtaking."
  },
  {
    num: "02",
    title: "AI as a Force Multiplier",
    desc: "I don't just build with AI; I build for an AI-first world. Intelligent agents and automation should enhance the human experience, not complicate it."
  },
  {
    num: "03",
    title: "Radical Simplicity",
    desc: "Complexity is the enemy of execution. Whether it's a backend microservice or a frontend user flow, I relentlessly strip away the unnecessary until only the essential remains."
  }
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-32 px-6 relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] border border-white/5 rounded-[100%] rotate-12 pointer-events-none opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] border border-white/5 rounded-[100%] -rotate-12 pointer-events-none opacity-20" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">The Operating <br /><span className="text-zinc-500">System</span></h2>
          <p className="text-xl text-zinc-400">The core principles that drive my work.</p>
        </motion.div>

        <div className="space-y-16">
          {principles.map((p, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-6 md:gap-16 group"
            >
              <div className="text-3xl md:text-5xl font-serif text-zinc-800 font-bold group-hover:brand-gradient transition-colors duration-500">
                {p.num}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4 text-white">{p.title}</h3>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
