
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, FileText, Calendar, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: 'Under $10k'
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <div className="min-h-screen pt-20 pb-40 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Left Side Info */}
        <section>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
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
                  <p className="text-zinc-500">hello@pigeon.studio</p>
                  <p className="text-zinc-500">+1 (555) 000-1234</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-purple-500">
                  <Calendar size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Book a Session</h4>
                  <p className="text-zinc-500">Schedule a 15-minute intro call to discuss your goals.</p>
                  <button className="text-blue-500 font-bold mt-2 hover:underline">Pick a time</button>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 glass rounded-xl flex items-center justify-center text-green-500">
                  <FileText size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Join the Team</h4>
                  <p className="text-zinc-500">We are always looking for creative talent.</p>
                  <p className="text-zinc-500">jobs@pigeon.studio</p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Right Side Form */}
        <section className="bg-zinc-950 p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="John Doe"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="john@example.com"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Company / Brand</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Acme Corp"
                value={formState.company}
                onChange={(e) => setFormState({...formState, company: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Project Brief</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Tell us about your project..."
                value={formState.project}
                onChange={(e) => setFormState({...formState, project: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Estimated Budget</label>
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={formState.budget}
                onChange={(e) => setFormState({...formState, budget: e.target.value})}
              >
                <option className="bg-zinc-900">Under $10k</option>
                <option className="bg-zinc-900">$10k - $25k</option>
                <option className="bg-zinc-900">$25k - $50k</option>
                <option className="bg-zinc-900">$50k+</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-500/20"
            >
              Send Inquiry <Send size={20} />
            </button>

            {isSent && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-center text-green-500 font-bold"
              >
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
