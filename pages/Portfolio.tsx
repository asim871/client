
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';
import { GoogleGenAI } from '@google/genai';
import { Search, Loader2, ExternalLink, Sparkles } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [trendResults, setTrendResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendText, setTrendText] = useState('');

  const categories = ['All', ...Object.values(ProjectCategory)];
  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const handleTrendSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTrendResults([]);
    setTrendText('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: `Provide an analysis of the latest 2024 motion design and animation trends for: "${searchQuery}". Focus on visual styles, color palettes, and notable award-winning examples.` }] },
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      setTrendText(response.text || "");
      // Correctly extract grounding chunks for display
      setTrendResults(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (error) {
      console.error(error);
      setTrendText("Failed to retrieve live industry trends. Please verify your Studio Key.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="px-6 py-20 max-w-7xl mx-auto min-h-screen">
      <header className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black mb-6">Our Work</h1>
        <p className="text-zinc-500 text-xl max-w-2xl mb-12">
          From 3D product visualisations to character-led storytelling, explore our diverse body of work across different industries.
        </p>

        {/* Live Trend Tool */}
        <div className="glass p-8 rounded-3xl border-blue-500/20 border mb-20 bg-gradient-to-br from-blue-500/5 to-transparent shadow-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-blue-500 w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-300">Industry Inspiration Hub</h3>
          </div>
          <form onSubmit={handleTrendSearch} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live trends (e.g., 'Modern 2D character styles')"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all font-medium"
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-xl shadow-blue-500/20"
            >
              {isSearching ? <Loader2 className="animate-spin" size={18} /> : 'Search Live Trends'}
            </button>
          </form>

          <AnimatePresence>
            {trendText && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-black/20 p-6 rounded-2xl border border-white/5"
              >
                <div className="prose prose-invert prose-sm max-w-none text-zinc-400 mb-6 leading-relaxed">
                  {trendText}
                </div>
                {trendResults.length > 0 && (
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                    {trendResults.map((chunk: any, i: number) => (
                      chunk.web?.uri && (
                        <a 
                          key={i} 
                          href={chunk.web.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] text-blue-400 hover:text-white font-black uppercase tracking-widest flex items-center gap-2 bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/20 transition-all hover:bg-blue-500"
                        >
                          {chunk.web.title || 'Source'} <ExternalLink size={10} />
                        </a>
                      )
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-16">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat as any)}
            className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${
              filter === cat 
                ? 'bg-white text-black border-white' 
                : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

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
