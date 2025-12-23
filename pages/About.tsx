
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TEAM } from '../constants';
import { GoogleGenAI, Modality } from "@google/genai";
import { Volume2, Loader2, PlayCircle } from 'lucide-react';

const About: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playDirectorVoice = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const missionText = "Over a decade of experience handcrafting animations for brands and agencies. At Pigeon Studio, we believe that every frame is an opportunity to connect. We bring your boldest ideas to life through motion and storytelling.";
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Say with a professional, creative, and inspiring tone: ${missionText}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const audioData = decode(base64Audio);
        const buffer = await decodeAudioData(audioData, audioCtx, 24000, 1);
        const source = audioCtx.createBufferSource();
        source.buffer = buffer;
        source.connect(audioCtx.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
      }
    } catch (error) {
      console.error("Audio failed", error);
      setIsPlaying(false);
    }
  };

  // Audio Utils
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <p className="text-2xl text-zinc-300 font-medium leading-relaxed">
                Over a decade of experience handcrafting animations for brands, agencies, NGOs, and more. We believe that every frame is an opportunity to connect.
              </p>
              <button 
                onClick={playDirectorVoice}
                disabled={isPlaying}
                className="flex items-center gap-4 glass px-8 py-4 rounded-2xl hover:bg-white/5 transition-all text-blue-400 group"
              >
                {isPlaying ? <Loader2 className="animate-spin" /> : <Volume2 className="group-hover:scale-110 transition-transform" />}
                <span className="font-bold uppercase tracking-widest text-xs">Listen to Director's Mission</span>
              </button>
            </div>
            <p className="text-lg text-zinc-500 leading-relaxed">
              Founded in 2014, Pigeon Studio has grown from a small collective of animators into a global powerhouse of creative storytelling. Our process is rooted in deep strategy and unbridled imagination. We don't just move pixels; we move audiences.
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
            <p className="text-zinc-500 max-w-xs text-right hidden md:block font-medium">Our diverse team of specialists makes the impossible, possible.</p>
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
