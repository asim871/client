
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Loader2, Image as ImageIcon, FileText } from 'lucide-react';

const Services: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiImage, setAiImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');

  const handleBrainstorm = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setAiResponse(null);
    setAiImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Step 1: Generate Narrative Concept
      setLoadingStep('Crafting narrative strategy...');
      const textModel = 'gemini-3-flash-preview';
      const textResponse = await ai.models.generateContent({
        model: textModel,
        contents: `You are a world-class Creative Director at Pigeon Studio. 
        A client wants an animation concept for: "${prompt}". 
        Provide a punchy 3-part brief: 
        1. THE HOOK: A 1-sentence opening.
        2. THE NARRATIVE: A short summary of the story.
        3. VISUAL DIRECTION: A detailed description of the art style (colors, lighting, motion feel).`,
        config: { temperature: 0.8 }
      });
      
      const conceptText = textResponse.text || "Concept generated.";
      setAiResponse(conceptText);

      // Step 2: Generate Visual Keyframe
      setLoadingStep('Generating visual keyframe...');
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { text: `A high-end cinematic animation storyboard keyframe. Concept: ${prompt}. Visual Style: ${conceptText}. No text in image, 4k, artistic, motion blur, professional studio quality.` }
          ]
        },
        config: {
          imageConfig: { aspectRatio: "16:9" }
        }
      });

      for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setAiImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error(error);
      setAiResponse("The creative wires got crossed. Please try a different prompt!");
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
              <div className="flex-1 w-full h-[400px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl">
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

      {/* Upgraded AI Lab */}
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
                  Input your core message and our AI Creative Director will visualize a cinematic concept for your brand.
                </p>
              </div>
              
              <div className="w-full md:w-auto relative group">
                <input 
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A digital bank for Mars colonists..."
                  className="w-full md:w-96 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-16"
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

            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div 
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                  <div className="space-y-8 bg-black/40 p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      <FileText size={14} /> Narrative Brief
                    </div>
                    <div className="prose prose-invert max-w-none text-zinc-300 whitespace-pre-line font-medium leading-relaxed">
                      {aiResponse}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                      <ImageIcon size={14} /> Visual Keyframe
                    </div>
                    <div className="aspect-video bg-zinc-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
                      {aiImage ? (
                        <img src={aiImage} alt="AI Concept" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-600 italic">
                          Visualizing style...
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                        <button className="text-white text-xs font-bold flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          Enlarge Concept
                        </button>
                      </div>
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
