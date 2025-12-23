
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, ArrowRight, ChevronRight, Star, Video, Loader2, Wand2, X, Sparkles } from 'lucide-react';
import { PROJECTS } from '../constants';
import { GoogleGenAI } from '@google/genai';

const Home: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, 3);
  const [isVeoLoading, setIsVeoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [veoPrompt, setVeoPrompt] = useState('');
  const [status, setStatus] = useState('');

  const generateMotionReel = async () => {
    if (!veoPrompt.trim()) return;
    setIsVeoLoading(true);
    setVideoUrl(null);
    setStatus('Initializing production pipeline...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high-end cinematic animation reel for a brand named "${veoPrompt}". Professional motion design, 3D elements, sleek textures, fluid transitions, studio lighting, masterpiece quality.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      let attempts = 0;
      while (!operation.done && attempts < 60) {
        setStatus(`Rendering frames... ${attempts * 2}%`);
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
        attempts++;
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        setStatus('Finalizing video file...');
        const fetchRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const blob = await fetchRes.blob();
        setVideoUrl(URL.createObjectURL(blob));
      } else {
        throw new Error("Generation timed out or failed.");
      }
    } catch (err: any) {
      console.error("Veo failed", err);
      alert(err.message?.includes("not found") ? "Pro Video features require a Studio Key. Please click the key icon in the navigation." : "Video generation encountered an error.");
    } finally {
      setIsVeoLoading(false);
      setStatus('');
    }
  };

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-6 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0,transparent_70%)]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1 text-blue-500">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500">
                Award-Winning Motion Studio
              </span>
            </div>
            
            <h1 className="text-6xl md:text-[9rem] font-black mb-8 leading-[0.9] tracking-tighter">
              Bolder <br />
              <span className="text-gradient">Narratives.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium">
              We handcraft high-fidelity animated stories that propel ambitious brands into the cultural spotlight.
            </p>

            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex gap-4">
                <Link 
                  to="/portfolio" 
                  className="bg-white text-black px-10 py-5 rounded-full font-bold flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all shadow-2xl"
                >
                  View Showcase <Play size={18} fill="currentColor" />
                </Link>
                <Link 
                  to="/contact" 
                  className="bg-zinc-900 border border-white/5 text-white px-10 py-5 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  Contact <ArrowRight size={18} />
                </Link>
              </div>

              <div className="flex flex-col gap-2">
                <div className="glass p-2 rounded-full flex items-center gap-2 pr-4 border-blue-500/20 group focus-within:border-blue-500 transition-all">
                  <input 
                    type="text" 
                    value={veoPrompt}
                    onChange={(e) => setVeoPrompt(e.target.value)}
                    placeholder="Enter brand name..."
                    className="bg-transparent border-none focus:outline-none px-4 text-xs font-bold w-32 md:w-48 text-white placeholder-zinc-600"
                    onKeyDown={(e) => e.key === 'Enter' && generateMotionReel()}
                  />
                  <button 
                    onClick={generateMotionReel}
                    disabled={isVeoLoading || !veoPrompt.trim()}
                    className="bg-blue-500 p-3 rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 text-white flex items-center justify-center"
                    title="Generate AI Motion Reel"
                  >
                    {isVeoLoading ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                  </button>
                </div>
                {status && (
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-4 flex items-center gap-2">
                    <Sparkles size={10} className="animate-pulse" /> {status}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {videoUrl && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
            >
              <div className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.2)] bg-black">
                 <button 
                   onClick={() => setVideoUrl(null)} 
                   className="absolute top-6 right-6 z-10 p-4 rounded-full bg-black/50 hover:bg-white hover:text-black transition-all"
                 >
                   <X size={24} />
                 </button>
                 <video src={videoUrl} autoPlay loop controls className="w-full h-full object-cover" />
                 <div className="absolute bottom-6 left-6 glass px-6 py-3 rounded-2xl border-white/10">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Generated Custom Reel</p>
                    <h4 className="text-xl font-bold">{veoPrompt} Concept</h4>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2.5rem] aspect-[4/5] mb-8 bg-zinc-900 border border-white/5">
                <img 
                  src={project.thumbnail} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
              </div>
              <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">{project.category}</p>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
              <p className="text-zinc-500 text-sm font-medium">{project.client}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
