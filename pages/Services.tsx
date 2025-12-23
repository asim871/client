
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Loader2, Image as ImageIcon, FileText, AlertCircle, Maximize2 } from 'lucide-react';

const Services: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleBrainstorm = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setAiResponse(null);
    setAiImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setLoadingStep('Crafting narrative strategy...');
      const textResponse = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: { parts: [{ text: `You are a legendary Creative Director. Provide a cinematic animation brief for: "${prompt}". Include: Hook, Narrative Summary, and Visual Language (lighting, palette, motion feel).` }] },
        config: { 
          thinkingConfig: { thinkingBudget: 8000 }
        },
      });
      
      const conceptText = textResponse.text;
      if (!conceptText) throw new Error("Could not generate concept.");
      setAiResponse(conceptText);

      setLoadingStep('Rendering 2K visual keyframe...');
      try {
        const imageResponse = await ai.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: {
            parts: [
              { text: `High-fidelity 3D cinematic animation keyframe. Concept: ${prompt}. Visual Style: ${conceptText}. Professional studio lighting, photorealistic, 8k resolution, octane render, masterpiece, no text.` }
            ]
          },
          config: {
            imageConfig: { aspectRatio: "16:9", imageSize: "1K" }
          }
        });

        const parts = imageResponse.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(p => p.inlineData);
        if (imagePart?.inlineData) {
          setAiImage(`data:image/png;base64,${imagePart.inlineData.data}`);
        }
      } catch (imgErr: any) {
        if (imgErr.message?.includes("not found")) {
           setError("Premium Visuals requires a Studio Key. Please click the key icon in the navigation.");
        }
        console.warn("Visual generation skipped:", imgErr);
      }

    } catch (err: any) {
      setError("The creative wires got crossed. Please ensure your Studio Key is active.");
      console.error(err);
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="min-h-screen">
      <section className="px-6 pt-32 pb-20 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black mb-8">What we do.</h1>
        <p className="text-2xl text-zinc-500 max-w-3xl leading-relaxed">
          We combine artistic expression with technical precision to build visual worlds that captivate and convert.
        </p>
      </section>

      <section className="px-6 py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-32">
          {SERVICES.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="flex-1">
                <span className="text-4xl mb-6 block">{service.icon}</span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">{service.title}</h2>
                <p className="text-xl text-zinc-400 leading-relaxed mb-8">{service.description}</p>
                <ul className="space-y-4 text-zinc-500 border-l-2 border-blue-500/20 pl-6">
                  <li>Custom visual metaphors</li>
                  <li>Industry-specific storytelling</li>
                  <li>Sound design integration</li>
                </ul>
              </div>
              <div className="flex-1 w-full h-[400px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl bg-zinc-900">
                <img 
                  src={service.image} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" 
                  alt={service.title}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 py-40 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="glass p-12 rounded-[3rem] border-blue-500/30 border-2 shadow-[0_0_50px_rgba(59,130,246,0.1)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="text-blue-500 animate-pulse" />
                  <h2 className="text-4xl font-bold">Director's Concept Lab</h2>
                </div>
                <p className="text-zinc-400 text-lg max-w-xl">
                  Input your core message and our Pro AI Director will storyboard a cinematic 2K concept.
                </p>
              </div>
              
              <div className="w-full md:w-auto relative group">
                <input 
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A digital bank for Mars..."
                  className="w-full md:w-96 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-16 text-white"
                  onKeyDown={(e) => e.key === 'Enter' && handleBrainstorm()}
                />
                <button 
                  onClick={handleBrainstorm}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                <AlertCircle size={18} />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-20 text-center"
                >
                  <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
                  <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">{loadingStep}</p>
                </motion.div>
              )}

              {(aiResponse || aiImage) && !isLoading && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                  <div className="space-y-8 bg-black/40 p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      <FileText size={14} /> Narrative Brief
                    </div>
                    <div className="text-zinc-300 whitespace-pre-line leading-relaxed italic text-sm">
                      {aiResponse}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      <ImageIcon size={14} /> 2K Keyframe Visual
                    </div>
                    <div className="aspect-video bg-zinc-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                      {aiImage ? (
                        <>
                          <img src={aiImage} alt="AI Concept" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <a href={aiImage} download="concept.png" className="bg-white text-black p-4 rounded-full shadow-2xl"><Maximize2 size={20} /></a>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600 gap-4">
                          <ImageIcon size={40} strokeWidth={1} />
                          <p className="italic text-sm">Rendering visual output...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
