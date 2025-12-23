
import React from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';

const About: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-black mb-12 tracking-tighter"
          >
            We bring <br /> ideas to life.
          </motion.h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <p className="text-2xl text-zinc-300 font-medium leading-relaxed">
              Over a decade of experience handcrafting animations for brands, agencies, NGOs, and more. We believe that every frame is an opportunity to connect.
            </p>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Founded in 2014, Pigeon Studio has grown from a small collective of animators into a global powerhouse of creative storytelling. Our process is rooted in deep strategy and unbridled imagination.
            </p>
          </div>
        </header>

        {/* Story Section */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="glass p-10 rounded-3xl">
              <span className="text-blue-500 font-black text-5xl mb-4 block">10+</span>
              <h3 className="text-xl font-bold mb-2">Years of Excellence</h3>
              <p className="text-zinc-500 text-sm">Building trust with global partners across 4 continents.</p>
           </div>
           <div className="glass p-10 rounded-3xl">
              <span className="text-purple-500 font-black text-5xl mb-4 block">500+</span>
              <h3 className="text-xl font-bold mb-2">Projects Delivered</h3>
              <p className="text-zinc-500 text-sm">From viral campaign spots to deep educational series.</p>
           </div>
           <div className="glass p-10 rounded-3xl">
              <span className="text-green-500 font-black text-5xl mb-4 block">12</span>
              <h3 className="text-xl font-bold mb-2">Global Awards</h3>
              <p className="text-zinc-500 text-sm">Recognized by the industry for innovation and craft.</p>
           </div>
        </section>

        {/* Team Grid */}
        <section className="mb-40">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-bold">The Collective</h2>
            <p className="text-zinc-500 max-w-xs text-right hidden md:block">Our diverse team of specialists makes the impossible, possible.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TEAM.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="aspect-square overflow-hidden rounded-2xl mb-4 bg-zinc-900 border border-white/5">
                  <img src={member.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                </div>
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-zinc-500 text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Creative Process */}
        <section className="py-20 border-y border-white/5">
          <h2 className="text-4xl font-bold mb-16 text-center">How we fly</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
             {[
               { n: '01', t: 'Strategize', d: 'Defining the core message and audience.' },
               { n: '02', t: 'Storyboarding', d: 'Visualizing the narrative arc and style.' },
               { n: '03', t: 'Production', d: 'Where the magic happens and pixels move.' },
               { n: '04', t: 'Delivery', d: 'Refining every frame for perfection.' }
             ].map((step, idx) => (
               <div key={idx} className="relative z-10">
                 <span className="text-zinc-800 font-black text-7xl absolute -top-10 -left-4 -z-10">{step.n}</span>
                 <h4 className="text-xl font-bold mb-3 mt-4">{step.t}</h4>
                 <p className="text-zinc-500 text-sm leading-relaxed">{step.d}</p>
               </div>
             ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
