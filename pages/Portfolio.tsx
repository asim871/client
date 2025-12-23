
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');

  const categories = ['All', ...Object.values(ProjectCategory)];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto min-h-screen">
      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black mb-6">Our Work</h1>
        <p className="text-zinc-500 text-xl max-w-2xl">
          From 3D product visualisations to character-led storytelling, explore our diverse body of work across different industries.
        </p>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
              filter === cat 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-video mb-6 bg-zinc-900 border border-white/5">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex flex-col justify-end">
                   <p className="text-blue-400 font-bold text-sm mb-2 uppercase tracking-widest">{project.category}</p>
                   <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                   <p className="text-zinc-300 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h4 className="font-bold text-lg">{project.client}</h4>
                  <p className="text-zinc-600 text-sm italic">{project.result}</p>
                </div>
                <span className="text-zinc-700 font-bold">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Portfolio;
