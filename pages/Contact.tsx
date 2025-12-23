
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, FileText, Calendar, MessageSquare, Sparkles, Loader2, RefreshCw, Mic, Square, AlertCircle } from 'lucide-react';
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
      setError("Microphone access is required for Voice Brief.");
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
          contents: [
            {
              parts: [
                { inlineData: { data: base64Audio, mimeType: 'audio/webm' } },
                { text: "Transcribe the project details from this audio and format them as a professional creative agency project brief." }
              ]
            }
          ]
        });
        if (response.text) {
          setFormState(prev => ({ ...prev, project: response.text }));
        }
        setIsRefining(false);
      };
    } catch (error: any) {
      setError("AI Studio Key required for audio processing.");
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
        contents: `Refine this project brief for an animation studio: "${formState.project}"`,
      });
      if (response.text) {
        setFormState(prev => ({ ...prev, project: response.text }));
      }
    } catch (error) {
      setError("AI Refinement failed. Please check your Studio Key.");
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
            <p className="text-2xl text-zinc-400 mb-12 max-w-md font-medium">
              Start your journey with Pigeon Studio. Use our AI tools to craft the perfect brief.
            </p>
            
            <div className="space-y-12">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-blue-500">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">New Projects</h4>
                  <p className="text-zinc-500 font-medium">hello@pigeon.studio</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex gap-3 items-center">
                <AlertCircle size={14} /> {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500" value={formState.name} onChange={(e) => setFormState({...formState, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500" value={formState.email} onChange={(e) => setFormState({...formState, email: e.target.value})} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest flex justify-between">
                Project Details
                <div className="flex gap-4">
                  <button type="button" onClick={isRecording ? stopRecording : startRecording} className={`${isRecording ? 'text-red-500 animate-pulse' : 'text-zinc-500'} hover:text-white text-[10px] flex items-center gap-1`}>
                    {isRecording ? <Square size={10} /> : <Mic size={10} />} {isRecording ? 'Stop Recording' : 'Voice Brief'}
                  </button>
                  <button type="button" onClick={handleRefineBrief} disabled={isRefining || !formState.project} className="text-blue-500 hover:text-blue-400 text-[10px] flex items-center gap-1 disabled:opacity-30">
                    {isRefining ? <Loader2 className="animate-spin" size={10} /> : <Sparkles size={10} />} Refine Brief
                  </button>
                </div>
              </label>
              <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none font-medium text-zinc-300" placeholder="Type or use Voice Brief..." value={formState.project} onChange={(e) => setFormState({...formState, project: e.target.value})} />
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all">
              Send Inquiry <Send size={20} />
            </button>

            {isSent && <p className="text-center text-green-500 font-bold">Inquiry Sent!</p>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
