import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Command, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigation, siteConfig } from '@config/meta';
import { useModal } from '@hooks/useModal';

function CommandMenu({ open, onClose }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = event => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const go = path => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/70 px-4 pt-[15vh] backdrop-blur-md"
          onMouseDown={event => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            role="dialog" aria-modal="true" aria-label="Quick navigation"
            initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="w-full max-w-lg overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#11141b] p-2 shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3 text-sm text-[#949b90]">
              <Command size={16} /> Quick navigation <span className="ml-auto rounded-md border border-white/10 px-2 py-1 text-[10px]">ESC</span>
            </div>
            <div className="p-2">
              {navigation.map((item, index) => (
                <button key={item.path} onClick={() => go(item.path)} className="group flex w-full items-center rounded-xl px-3 py-3 text-left text-sm text-[#c5cbc0] transition hover:bg-white/[0.06] hover:text-white">
                  <span className="mr-3 font-mono text-[10px] text-[#60665e]">0{index + 1}</span>
                  {item.label}
                  <ArrowUpRight size={14} className="ml-auto opacity-0 transition group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { pathname } = useLocation();
  const { open } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);

  useEffect(() => {
    const onShortcut = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCommandOpen(value => !value);
      }
    };
    window.addEventListener('keydown', onShortcut);
    return () => window.removeEventListener('keydown', onShortcut);
  }, []);

  const isActive = path => path === '/' ? pathname === '/' : pathname.startsWith(path);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <div className={`site-container flex h-14 items-center justify-between rounded-full border px-3 transition-all duration-300 ${scrolled ? 'border-white/10 bg-[#0b0d12]/85 shadow-2xl shadow-black/30 backdrop-blur-xl' : 'border-transparent bg-transparent'}`}>
          <Link to="/" className="flex items-center gap-3 rounded-full px-2" aria-label={`${siteConfig.name} home`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#a78bfa] font-['Manrope'] text-sm font-extrabold text-[#090611] shadow-[0_0_28px_rgba(167,139,250,.24)]">SP</span>
            <span className="hidden font-['Manrope'] text-sm font-bold tracking-[-0.03em] text-white sm:block">Saurabh Patel</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navigation.map(item => (
              <Link key={item.path} to={item.path} className={`relative rounded-full px-4 py-2 text-sm transition ${isActive(item.path) ? 'text-white' : 'text-[#8f968c] hover:text-white'}`}>
                {item.label}
                {isActive(item.path) && <motion.span layoutId="nav-active" className="absolute inset-x-4 -bottom-0.5 h-px bg-[#fb7185] shadow-[0_0_12px_rgba(251,113,133,.5)]" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button onClick={() => setCommandOpen(true)} className="hidden h-9 items-center gap-2 rounded-full border border-white/10 px-3 text-[11px] font-semibold text-[#8f968c] transition hover:border-white/20 hover:text-white md:flex" aria-label="Open quick navigation">
              <Command size={13} /> <span>Ctrl K</span>
            </button>
            <button onClick={open} className="button-primary hidden min-h-9 px-4 py-2 text-xs sm:inline-flex">Let&apos;s talk <ArrowUpRight size={14} /></button>
            <button onClick={() => setMenuOpen(value => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] lg:hidden" aria-expanded={menuOpen} aria-label="Toggle navigation">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-[#0a0912] px-5 pb-8 pt-28 lg:hidden">
            <nav className="site-container flex h-full flex-col" aria-label="Mobile navigation">
              <div className="flex flex-col">
                {navigation.map((item, index) => (
                  <Link key={item.path} to={item.path} className="group flex items-center border-b border-white/10 py-5 font-['Manrope'] text-3xl font-semibold tracking-[-0.05em] text-white">
                    <span className="mr-5 font-mono text-xs font-normal text-[#746c88]">0{index + 1}</span>{item.label}<ArrowUpRight className="ml-auto text-[#746c88] transition group-hover:text-[#fb7185]" />
                  </Link>
                ))}
              </div>
              <div className="mt-auto rounded-3xl border border-white/10 bg-white/[0.035] p-5">
                <div className="mb-4 flex items-center gap-2 text-sm text-[#aab0a6]"><span className="status-dot" /> {siteConfig.availability}</div>
                <button onClick={() => { setMenuOpen(false); open(); }} className="button-primary w-full">Start a conversation <ArrowUpRight size={16} /></button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CommandMenu open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
}
