import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="site-container grid min-h-[85svh] place-items-center pb-16 pt-32">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d12] px-5 py-20 text-center md:py-28">
        <div className="grid-field absolute inset-0 opacity-60" />
        <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a78bfa]/[0.1] blur-3xl" />
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} className="relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#fb7185]">Error / 404</p>
          <h1 className="mt-5 font-['Manrope'] text-[clamp(5rem,18vw,12rem)] font-bold leading-none tracking-[-0.09em]">Lost<span className="text-[#a78bfa]">.</span></h1>
          <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#8f968c]">This page moved, disappeared, or never existed. The useful parts of the portfolio are still close by.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/" className="button-primary"><ArrowLeft size={15} /> Back home</Link><Link to="/projects" className="button-secondary">Explore work <ArrowUpRight size={15} /></Link></div>
        </motion.div>
      </div>
    </main>
  );
}
