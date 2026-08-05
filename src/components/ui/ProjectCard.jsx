import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, index = 0, large = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.08, 0.24), ease: [0.22, 1, 0.36, 1] }}
      className={`group panel panel-hover overflow-hidden ${large ? 'md:col-span-2' : ''}`}
    >
      <Link to={`/projects/${project.id}`} className="block">
        <div className={`relative overflow-hidden bg-[#12101d] ${large ? 'aspect-[16/8]' : 'aspect-[16/10]'}`}>
          {project.image ? (
            <img src={project.image} alt="" className="h-full w-full object-cover object-top opacity-80 transition duration-700 ease-out group-hover:scale-[1.035] group-hover:opacity-100" loading="lazy" />
          ) : (
            <div className="grid-field relative grid h-full place-items-center overflow-hidden">
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}22, transparent 52%)` }} />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 28, repeat: Infinity, ease: 'linear' }} className="absolute h-44 w-44 rounded-full border border-white/10 md:h-60 md:w-60" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 19, repeat: Infinity, ease: 'linear' }} className="absolute h-28 w-28 rotate-45 rounded-[2rem] border border-white/10 md:h-40 md:w-40" />
              <span className="relative max-w-[75%] text-center font-['Manrope'] text-3xl font-extrabold tracking-[-0.07em] text-white md:text-5xl">{project.title}<span style={{ color: project.accent }}>.</span></span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#12101d] to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md md:left-6 md:top-6">{project.status}</span>
          <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[#a78bfa] text-[#090611] opacity-0 transition duration-300 group-hover:opacity-100 md:right-6 md:top-6"><ArrowUpRight size={17} /></span>
        </div>
      </Link>

      <div className="p-5 md:p-7">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.13em] text-[#747b72]">{project.eyebrow}</span>
          <span className="font-mono text-xs text-[#5e655c]">{project.index}</span>
        </div>
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-2xl font-semibold tracking-[-0.045em] transition group-hover:text-[#a78bfa] md:text-3xl">{project.title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#92998e] md:text-base">{project.tagline}</p>
        </Link>
        <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-5">
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map(tag => <span key={tag} className="rounded-full bg-white/[0.045] px-3 py-1 text-[11px] text-[#abb1a7]">{tag}</span>)}
          </div>
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-[#8d9489] transition hover:border-white/25 hover:text-white" aria-label={`${project.title} on GitHub`}><Github size={14} /></a>}
        </div>
      </div>
    </motion.article>
  );
}
