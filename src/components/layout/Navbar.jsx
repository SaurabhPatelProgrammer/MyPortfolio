import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Brain, Volume2, VolumeX } from 'lucide-react';
import { useModal } from '@hooks/useModal';

// Futuristic Sound Module
const CLICK_SOUND = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav');
CLICK_SOUND.volume = 0.15;

const NAV_LINKS = [
  { path: '/about',    label: 'About'    },
  { path: '/projects', label: 'Projects' },
  { path: '/services', label: 'Services' },
  { path: '/contact',  label: 'Contact'  },
];

export default function Navbar() {
  const { open } = useModal();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('sound_enabled') === 'true';
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem('sound_enabled', next ? 'true' : 'false');
    if (next) {
      CLICK_SOUND.play().catch(() => {});
    }
  };

  const playClick = () => {
    if (soundEnabled) {
      CLICK_SOUND.currentTime = 0;
      CLICK_SOUND.play().catch(() => {});
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-4 glass border-b border-white/8 shadow-lg shadow-[#0a0a12]/20' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" onClick={playClick} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center border border-indigo-400/30 glow-indigo group-hover:scale-105 transition-transform duration-300">
            <Terminal size={18} className="text-white" />
          </div>
          <div>
            <span className="text-white font-extrabold text-lg tracking-wider group-hover:text-indigo-400 transition-colors">SAURABH</span>
            <span className="text-indigo-400 font-mono text-[10px] block tracking-widest mt-[-2px]">AI ARCHITECT</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ path, label }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={playClick}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  active ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & CTA */}
        <div className="hidden md:flex items-center gap-4">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable sci-fi interfaces audio feedback' : 'Enable sci-fi interfaces audio feedback'}
            className="p-2.5 rounded-xl glass border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all"
          >
            {soundEnabled ? <Volume2 size={16} className="text-indigo-400" /> : <VolumeX size={16} />}
          </button>

          <button onClick={() => { playClick(); open(); }} className="btn-primary flex items-center gap-1.5 py-2.5 text-sm">
            <Brain size={15} /> Start a Project
          </button>
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg glass text-gray-400 hover:text-white"
          >
            {soundEnabled ? <Volume2 size={15} className="text-indigo-400" /> : <VolumeX size={15} />}
          </button>
          <button
            onClick={() => { playClick(); setIsOpen(!isOpen); }}
            className="p-2 rounded-lg glass text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass border-b border-white/8 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map(({ path, label }) => {
                const active = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => { playClick(); setIsOpen(false); }}
                    className={`text-lg font-medium transition-colors ${
                      active ? 'text-indigo-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
              <button
                onClick={() => { playClick(); setIsOpen(false); open(); }}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
              >
                <Brain size={16} /> Start a Project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
