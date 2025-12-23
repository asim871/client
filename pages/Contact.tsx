
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, Calendar, MessageSquare, Sparkles, Loader2, RefreshCw, Mic, Square } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: 'Under $10k'
  });

  const [isSent, setIsSent] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = processVoiceBrief;
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Mic access denied", err);
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  const processVoiceBrief = async () => {
    setIsRefining(true);
    try {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = (reader.result as string).split(',')[1];
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: [
            {
              parts: [
                { inlineData: { data: base64Audio, mimeType: 'audio/webm' } },
                { text: "Transcribe this project brief and rewrite it to be a professional 100-word animation project inquiry." }
              ]
            }
          ]
        });
        if (response.text) {
          setFormState(prev => ({ ...prev, project: response.text || prev.project }));
        }
        setIsRefining(false);
      };
    } catch (error) {
      console.error(error);
      setIsRefining(false);
    }
  };

  const handleRefineBrief = async () => {
    if (!formState.project.trim()) return;
    setIsRefining(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Rewrite the following animation project brief to be more professional, clear, and focused for an animation studio. Keep it under 100 words: "${formState.project}"`,
      });
      if (response.text) {
        setFormState(prev => ({ ...prev, project: response.text || prev.project }));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="min-h-screen pt-20 pb-40 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <section>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl md:text-8xl font-black mb-12">Let's <br /> talk.</h1>
            <p className="text-2xl text-zinc-400 mb-12 max-w-md">
              Whether you have a fully-formed brief or just an initial spark, we're ready to explore.
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-blue-500">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">New Projects</h4>
                  <p className="text-zinc-500 font-medium">hello@pigeon.studio</p>
                  <p className="text-zinc-500 font-medium">+1 (555) 000-1234</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-purple-500">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Book a Session</h4>
                  <p className="text-zinc-500 font-medium">Schedule a 15-minute intro call to discuss your goals.</p>
                  <button className="text-blue-500 font-bold mt-2 hover:underline">Pick a time</button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="John Doe" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="john@example.com" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex justify-between">
                Project Brief
                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`${isRecording ? 'text-red-500 animate-pulse' : 'text-zinc-500'} hover:text-white text-[10px] flex items-center gap-1 transition-colors`}
                  >
                    {isRecording ? <Square size={10} /> : <Mic size={10} />}
                    {isRecording ? 'Recording...' : 'Voice Brief'}
                  </button>
                  <button 
                    type="button" 
                    onClick={handleRefineBrief}
                    disabled={isRefining || !formState.project}
                    className="text-blue-500 hover:text-blue-400 text-[10px] flex items-center gap-1 transition-colors disabled:opacity-30"
                  >
                    {isRefining ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />}
                    Refine with AI
                  </button>
                </div>
              </label>
              <div className="relative">
                <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-medium text-zinc-300" placeholder="Tell us about your project or record a voice note..." value={formState.project} onChange={(e) => setFormState({...formState, project: e.target.value})} />
                <AnimatePresence>
                  {isRefining && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                      <div className="flex items-center gap-3 text-blue-400">
                        <RefreshCw className="animate-spin" size={18} />
                        <span className="font-bold text-xs uppercase tracking-widest">Processing...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Estimated Budget</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium" value={formState.budget} onChange={(e) => setFormState({...formState, budget: e.target.value})}>
                <option className="bg-zinc-900">Under $10k</option>
                <option className="bg-zinc-900">$10k - $25k</option>
                <option className="bg-zinc-900">$25k - $50k</option>
                <option className="bg-zinc-900">$50k+</option>
              </select>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20">
              Send Inquiry <Send size={20} />
            </button>

            {isSent && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-green-500 font-bold">
                Message sent successfully! We'll get back to you shortly.
              </motion.p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
