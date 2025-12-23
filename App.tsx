
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Instagram, Facebook, Github, 
  ArrowUpRight, Mail, Phone, MapPin 
} from 'lucide-react';

import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Services from './pages/Services';
import Industries from './pages/Industries';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Industries', path: '/industries' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white hover:opacity-80 transition-opacity">
          PIGEON<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path ? 'text-blue-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-4">
            <Instagram className="w-4 h-4 cursor-pointer hover:text-blue-400" />
            <Github className="w-4 h-4 cursor-pointer hover:text-blue-400" />
          </div>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full glass p-8 flex flex-col gap-6 md:hidden border-b border-white/10"
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-xl font-heading font-bold text-white">
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-bold tracking-tighter text-white mb-6 block">
            PIGEON<span className="text-blue-500">.</span>
          </Link>
          <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
            We handcraft animated stories that move brands and audiences. Based globally, working locally with visionaries.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
              <Instagram size={18} />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
              <Facebook size={18} />
            </div>
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer">
              <Github size={18} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Explore</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/portfolio" className="hover:text-blue-400 transition-colors">Projects</Link></li>
            <li><Link to="/services" className="hover:text-blue-400 transition-colors">What we do</Link></li>
            <li><Link to="/industries" className="hover:text-blue-400 transition-colors">Our focus</Link></li>
            <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Studio News</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Say Hello</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center gap-2"><Mail size={14} /> hello@pigeon.studio</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +1 (555) 000-1234</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Brooklyn, NY / Global</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 gap-4">
        <p>© 2024 Pigeon Studio. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col selection:bg-blue-500 selection:text-white">
        <Header />
        <main className="flex-grow pt-20">
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
