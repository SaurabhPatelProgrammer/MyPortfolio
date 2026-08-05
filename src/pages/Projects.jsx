import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '@components/ui/ProjectCard';
import { categories, projects } from '@config/projects';
import { useModal } from '@hooks/useModal';
import { usePageMeta } from '@hooks/usePageMeta';

export default function Projects() {
  const [active, setActive] = useState('All');
  const { open } = useModal();
  const filtered = active === 'All' ? projects : projects.filter(project => project.category === active);
  usePageMeta('Selected Work — Saurabh Patel', 'Explore AI, full-stack, and creative engineering projects by Saurabh Patel.');

  return (
    <main className="pb-20 pt-32 md:pt-40">
      <section className="site-container">
        <span className="eyebrow mb-6">Selected work</span>
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-title text-balance">Products, systems,<br /><span className="text-[#7d857a]">and experiments.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="max-w-lg text-base leading-7 text-[#959c91] md:text-lg">Work across AI, full-stack engineering, and interface design — each project driven by a useful problem.</motion.p>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-2 border-y border-white/10 py-4">
          <span className="mr-3 text-xs font-semibold uppercase tracking-[0.13em] text-[#5f665d]">Filter</span>
          {categories.map(category => <button key={category} onClick={() => setActive(category)} className={`rounded-full px-4 py-2 text-xs font-semibold transition ${active === category ? 'bg-[#a78bfa] text-[#090611] shadow-[0_10px_28px_rgba(167,139,250,.2)]' : 'border border-white/10 text-[#8f968c] hover:border-[#a78bfa]/30 hover:text-white'}`}>{category}</button>)}
          <span className="ml-auto hidden font-mono text-xs text-[#5e655c] sm:block">{String(filtered.length).padStart(2, '0')} projects</span>
        </div>
      </section>

      <section className="section-space site-container">
        <motion.div layout className="grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => <ProjectCard key={project.id} project={project} index={index} large={filtered.length > 2 && index === 0} />)}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="site-container pb-12">
        <div className="panel flex flex-col items-start justify-between gap-7 p-7 md:flex-row md:items-center md:p-10">
          <div><span className="eyebrow mb-4">Next project</span><h2 className="text-3xl font-semibold md:text-4xl">Your idea could be next.</h2><p className="mt-3 text-sm text-[#8f968c]">Share the problem, even if the solution is not clear yet.</p></div>
          <button onClick={open} className="button-primary shrink-0">Start a conversation <ArrowUpRight size={16} /></button>
        </div>
      </section>
    </main>
  );
}
