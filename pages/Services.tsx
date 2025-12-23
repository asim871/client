
import React, { useState } from 'react';
// Fix: Added missing AnimatePresence import
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '../constants';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Send, Loader2 } from 'lucide-react';

const Services: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBrainstorm = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setAiResponse(null);

    try {
      // Fix: Initializing GoogleGenAI right before making the API call to ensure fresh configuration
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a creative director at Pigeon Studio, an animation agency. 
        A client wants a creative concept for: "${prompt}". 
        Provide a short, punchy 3-step animation concept (Hook, Story, Visual Style) that uses modern motion design trends.`,
        config: {
          temperature: 0.8,
          // Fix: Removed maxOutputTokens to avoid issues with thinking budget consuming the token limit
        }
      });
      // Fix: Accessing .text as a property, providing a fallback for undefined values
      setAiResponse(response.text || "No response generated.");
    } catch (error) {
      console.error(error);
      setAiResponse("Uh oh, the creative wires got crossed. Try again or contact our human directors!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="px-6 pt-32 pb-20 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-black mb-8">What we do.</h1>
        <p className="text-2xl text-zinc-500 max-w-3xl leading-relaxed">
          We combine artistic expression with technical precision to build visual worlds that captivate and convert.
        </p>
      </section>

      {/* Service Cards */}
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
                <p className="text-xl text-zinc-400 leading-relaxed mb-8">
                  {service.description}
                </p>
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

      {/* AI Concept Generator */}
      <section className="px-6 py-40">
        <div className="max-w-4xl mx-auto glass p-12 rounded-[2rem] border-blue-500/30 border-2">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-blue-500" />
            <h2 className="text-3xl font-bold">Creative Concept Lab</h2>
          </div>
          <p className="text-zinc-400 mb-8">
            Need an immediate spark? Tell our AI-powered Creative Director what your brand does, and we'll generate a quick animation concept for you.
          </p>
          
          <div className="relative mb-6">
            <input 
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A sustainable energy brand launching a new smart grid..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all pr-16"
            />
            <button 
              onClick={handleBrainstorm}
              disabled={isLoading}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
            </button>
          </div>

          <AnimatePresence>
            {aiResponse && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-zinc-900 rounded-2xl p-8 border border-white/5"
              >
                <div className="prose prose-invert max-w-none text-zinc-300 whitespace-pre-line font-medium leading-relaxed">
                  {aiResponse}
                </div>
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">Generated by Pigeon AI Brainstormer</span>
                  <button className="text-blue-400 text-sm font-bold hover:underline">Download Concept PDF</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Services;
