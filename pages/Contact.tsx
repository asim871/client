
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, Calendar, MessageSquare, Sparkles, Loader2, RefreshCw, Mic, Square, AlertCircle, Upload } from 'lucide-react';
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
  const [isAnalyzingFile, setIsAnalyzingFile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => audioChunks.current.push(e.data);
      mediaRecorder.current.onstop = processVoiceBrief;
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      setError("Microphone access is required for the Voice Brief feature.");
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
          model: 'gemini-2.5-flash-native-audio-preview-09-2025',
          contents: {
            parts: [
              { inlineData: { data: base64Audio, mimeType: 'audio/webm' } },
              { text: "Extract the core project details from this audio and rewrite them as a formal animation production brief for a creative agency." }
            ]
          }
        });
        if (response.text) {
          setFormState(prev => ({ ...prev, project: response.text }));
        }
        setIsRefining(false);
      };
    } catch (error: any) {
      setError("Audio analysis requires a Studio Key. Please verify your connection.");
      setIsRefining(false);
    }
  };

  const handleRefineBrief = async () => {
    if (!formState.project.trim()) return;
    setIsRefining(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [{ text: `Act as a senior creative strategist. Refine the following project brief to be more professional, structured, and clear for a production team. Maintain the original core intent but improve the terminology: "${formState.project}"` }] },
      });
      if (response.text) {
        setFormState(prev => ({ ...prev, project: response.text }));
      }
    } catch (error) {
      setError("AI refinement encountered an issue. Please ensure your Studio Key is active.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsAnalyzingFile(true);
    setError(null);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const text = event.target?.result as string;
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: { parts: [{ text: `Analyze the following uploaded document text and summarize the key project requirements for an animation studio: "${text.substring(0, 2000)}"` }] }
        });
        if (response.text) {
          setFormState(prev => ({ ...prev, project: response.text }));
        }
        setIsAnalyzingFile(false);
      };
      reader.readAsText(file);
    } catch (err) {
      setError("Failed to analyze the uploaded file.");
      setIsAnalyzingFile(false);
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
            <p className="text-2xl text-zinc-400 mb-12 max-w-md font-medium leading-relaxed">
              Start your journey with Pigeon Studio. Use our AI-enhanced pipeline to refine your vision.
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
                  <p className="text-zinc-500 font-medium">Schedule a quick intro call with our creative leads.</p>
                  <button className="text-blue-500 font-bold mt-2 hover:underline">Select a time slot</button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex gap-3 items-center">
                <AlertCircle size={14} /> {error}
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Full Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Email Address</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex justify-between items-center">
                Project Details
                <div className="flex gap-4">
                  <button type="button" onClick={isRecording ? stopRecording : startRecording} className={`${isRecording ? 'text-red-500 animate-pulse' : 'text-zinc-500'} hover:text-white transition-colors flex items-center gap-1`}>
                    {isRecording ? <Square size={10} /> : <Mic size={10} />} {isRecording ? 'Stop' : 'Voice'}
                  </button>
                  <label className="cursor-pointer text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                    {isAnalyzingFile ? <Loader2 size={10} className="animate-spin" /> : <Upload size={10} />} Brief
                    <input type="file" className="hidden" accept=".txt,.pdf" onChange={handleFileUpload} />
                  </label>
                  <button type="button" onClick={handleRefineBrief} disabled={isRefining || !formState.project} className="text-blue-500 hover:text-blue-400 flex items-center gap-1 disabled:opacity-30 transition-all">
                    {isRefining ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />} Refine
                  </button>
                </div>
              </label>
              <div className="relative">
                <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-medium text-zinc-300 placeholder-zinc-700" placeholder="Type your ideas or use AI tools to generate a brief..." value={formState.project} onChange={(e) => setFormState({...formState, project: e.target.value})} />
                <AnimatePresence>
                  {(isRefining || isAnalyzingFile) && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
                      <div className="flex items-center gap-2 text-blue-400">
                        <RefreshCw className="animate-spin" size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Strategist at work...</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Estimated Budget</label>
               <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 text-white font-medium appearance-none" value={formState.budget} onChange={(e) => setFormState({...formState, budget: e.target.value})}>
                 <option className="bg-zinc-900">$5k - $10k</option>
                 <option className="bg-zinc-900">$10k - $25k</option>
                 <option className="bg-zinc-900">$25k - $50k</option>
                 <option className="bg-zinc-900">$50k+</option>
               </select>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98]">
              Send Inquiry <Send size={18} />
            </button>

            {isSent && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 text-center font-bold">
                Inquiry received. We'll fly back to you soon!
              </motion.div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
