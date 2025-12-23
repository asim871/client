
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Instagram, Youtube, 
  ArrowUpRight, Mail, Phone, MapPin, ExternalLink, Key, ShieldCheck, AlertCircle, Sparkles
} from 'lucide-react';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Header: React.FC<{ hasKey: boolean; openPicker: () => void }> = ({ hasKey, openPicker }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 ${
      scrolled ? 'glass py-3 border-b border-white/10' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity">
            PIGEON<span className="text-blue-500">.</span>
          </Link>
          
          <button 
            onClick={openPicker}
            className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              hasKey ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500 text-white animate-pulse'
            }`}
          >
            {hasKey ? <ShieldCheck size={12} /> : <Key size={12} />}
            {hasKey ? 'Studio Key Active' : 'Select Studio Key'}
          </button>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                location.pathname === link.path ? 'text-blue-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-5 ml-4 border-l border-white/10 pl-6">
            <div className="text-[10px] font-bold text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded cursor-pointer hover:border-white transition-colors">BEHANCE</div>
            <Instagram className="w-4 h-4 cursor-pointer text-zinc-500 hover:text-white transition-colors" />
          </div>
        </div>

        <button className="md:hidden text-white w-10 h-10 flex items-center justify-center rounded-full glass" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 w-full h-screen bg-black z-40 p-12 flex flex-col justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsOpen(false)} className="text-5xl font-heading font-black text-white">
                {link.name}
              </Link>
            ))}
            <button onClick={() => { openPicker(); setIsOpen(false); }} className="mt-8 text-blue-500 font-bold uppercase tracking-widest flex items-center gap-3">
              <Key size={24} /> {hasKey ? 'Manage Keys' : 'Unlock Pro AI'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        <div className="md:col-span-5">
          <Link to="/" className="text-4xl font-black tracking-tighter text-white mb-8 block">
            PIGEON<span className="text-blue-500">.</span>
          </Link>
          <p className="text-zinc-400 text-lg max-w-sm mb-12 leading-relaxed font-medium">
            Crafting the next generation of visual narratives for brands that refuse to be ordinary.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Navigation</h4>
          <ul className="space-y-4 text-zinc-500 text-sm font-medium">
            <li><Link to="/portfolio" className="hover:text-blue-400">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-blue-400">Services</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-5">
          <h4 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-8">Studio Labs</h4>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-start gap-4">
            <AlertCircle className="text-blue-500 shrink-0" size={18} />
            <p className="text-zinc-500 text-sm italic">
              Premium video and 4K visual generation requires a valid API key from a paid GCP project. <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-blue-500 underline">Billing Documentation</a>.
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-32 pt-8 border-t border-white/5 text-[10px] text-zinc-700 font-bold uppercase tracking-widest text-center">
        <p>© 2024 Pigeon Studio Collective. All rights reserved.</p>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [hasKey, setHasKey] = useState(false);
  const [showKeyWall, setShowKeyWall] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
        // Prompt for key if not selected
        if (!selected) {
           setShowKeyWall(true);
        }
      }
    };
    checkKey();
  }, []);

  const openPicker = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      // Assume success to avoid race condition as per guidelines
      setHasKey(true);
      setShowKeyWall(false);
    }
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
        <Header hasKey={hasKey} openPicker={openPicker} />
        
        {/* Key Wall Overlay */}
        <AnimatePresence>
          {showKeyWall && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 text-center"
            >
              <div className="max-w-md">
                <div className="w-20 h-20 bg-blue-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
                  <Key size={40} className="text-blue-500" />
                </div>
                <h2 className="text-4xl font-bold mb-4">Unlock Pigeon Studio</h2>
                <p className="text-zinc-400 mb-8 leading-relaxed">
                  To experience our full Pro AI capabilities—including the Motion Reel generator and 2K storyboarding—please select an API key from a paid GCP project.
                </p>
                <button 
                  onClick={openPicker}
                  className="w-full bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20"
                >
                  Select Studio Key <Sparkles size={20} />
                </button>
                <button 
                  onClick={() => setShowKeyWall(false)} 
                  className="mt-6 text-zinc-600 hover:text-zinc-400 text-sm font-bold uppercase tracking-widest"
                >
                  Continue with Limited Features
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
