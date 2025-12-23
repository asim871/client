
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ChevronRight, Star } from 'lucide-react';
import { PROJECTS } from '../constants';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050505]">
        {/* Abstract Motion Background */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)] animate-pulse" />
           <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08)_0,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1 text-blue-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500">
                Premium Motion Agency
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black mb-8 leading-[0.9] tracking-tighter">
              Bolder <br />
              <span className="text-gradient">Narratives.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium">
              We handcraft high-fidelity animated stories that propel ambitious brands into the cultural spotlight.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link 
                to="/portfolio" 
                className="bg-white text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all duration-500 shadow-2xl shadow-white/5"
              >
                View Showcase <Play size={18} fill="currentColor" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-zinc-900 border border-white/5 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3"
              >
                Start a Brief <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements for visual depth */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-20 hidden lg:block glass p-6 rounded-3xl border-white/10 rotate-3"
        >
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse" />
             <div>
               <p className="text-xs font-bold text-zinc-300">New Release</p>
               <p className="text-[10px] text-zinc-500 uppercase font-black">Neon Odyssey v2</p>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Grid */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">The Gallery.</h2>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">A meticulous collection of visual experiments and brand transformations.</p>
          </div>
          <Link to="/portfolio" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
            See All Work <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500 transition-colors"><ChevronRight size={16} /></div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-8 bg-zinc-900 border border-white/5">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 w-fit px-6 py-2 rounded-full text-xs font-bold mb-4">
                    Explore Case
                  </span>
                </div>
              </div>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{project.category}</p>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-sm font-medium">{project.client}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto glass p-12 md:p-32 rounded-[4rem] text-center relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-transparent">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] -ml-32 -mb-32" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-8xl font-black mb-10 leading-tight tracking-tighter">Your vision, <br /> elevated.</h2>
            <p className="text-zinc-400 mb-16 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
              We're currently taking on new projects for Q3 & Q4 2024. Let's build something that stays in motion.
            </p>
            <Link to="/contact" className="inline-block bg-white text-black px-16 py-6 rounded-full font-bold text-xl hover:bg-blue-500 hover:text-white transition-all hover:scale-105 shadow-2xl shadow-blue-500/20">
              Inquire Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;