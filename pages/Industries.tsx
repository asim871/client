
import React from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES } from '../constants';

const Industries: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32 text-center">
          <h1 className="text-5xl md:text-8xl font-black mb-8">Expertise across <br /> sectors.</h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
            Animation is a universal language, but every industry needs a unique dialect. We specialize in translating complex value props into motion.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INDUSTRIES.map((industry, idx) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-12 rounded-[2rem] border-white/5 hover:border-blue-500/30 transition-all group"
            >
              <div className="text-5xl mb-8 group-hover:scale-110 transition-transform origin-left">{industry.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{industry.name}</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                {industry.description}
              </p>
              <div className="pt-8 border-t border-white/5 space-y-4">
                 <h4 className="text-xs font-bold text-zinc-600 uppercase tracking-widest">Key Benefits</h4>
                 <ul className="text-sm text-zinc-500 list-disc list-inside space-y-2">
                    <li>Improved user onboarding experience</li>
                    <li>Simplified technical documentation</li>
                    <li>Emotional connection through character work</li>
                 </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <section className="mt-40 text-center">
           <h2 className="text-4xl font-bold mb-12">Don't see your sector?</h2>
           <p className="text-zinc-500 mb-8 max-w-xl mx-auto">Our craft is adaptable. We love diving into new challenges and creating visual solutions for emerging markets.</p>
           <button className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all">Let's Explore</button>
        </section>
      </div>
    </div>
  );
};

export default Industries;
