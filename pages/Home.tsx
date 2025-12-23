
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
        {/* Background Video/Animation Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
          <img 
            src="https://picsum.photos/seed/studio/1920/1080" 
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000" 
            alt="Hero Background"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
              Award Winning Studio
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none max-w-4xl">
              Handcrafting stories <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                that move brands.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
              We bring ideas to life through high-end animation, motion design, and strategic storytelling for global visionaries.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/portfolio" 
                className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all group"
              >
                View Reel <Play size={18} fill="currentColor" />
              </Link>
              <Link 
                to="/contact" 
                className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/5 transition-all flex items-center gap-2 group"
              >
                Get a Quote <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">Selected Works</h2>
            <p className="text-zinc-500 max-w-lg">A glimpse into our recent collaborations with industry leaders.</p>
          </div>
          <Link to="/portfolio" className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            All Case Studies <ChevronRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-6 border border-white/5">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold scale-90 group-hover:scale-100 transition-transform">
                    View Project
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-zinc-500 text-sm uppercase tracking-widest">{project.category}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto glass p-12 md:p-24 rounded-[3rem] text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 blur-[100px] -ml-32 -mb-32" />
          
          <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to bring your <br /> ideas to life?</h2>
          <p className="text-gray-400 mb-12 text-lg max-w-xl mx-auto">
            Our team is waiting to turn your vision into a visual masterpiece. Let's create something unforgettable together.
          </p>
          <Link to="/contact" className="inline-block bg-white text-black px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-500 hover:text-white transition-all hover:scale-105 active:scale-95">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
