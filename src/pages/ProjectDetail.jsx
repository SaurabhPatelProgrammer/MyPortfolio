import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, CheckCircle2, Github } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { projects } from '@config/projects';
import { useModal } from '@hooks/useModal';

export default function ProjectDetail() {
  const { id } = useParams();
  const { open } = useModal();
  const project = projects.find(item => item.id === id);
  const projectIndex = projects.findIndex(item => item.id === id);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  useEffect(() => {
    if (!project) return undefined;
    const previous = document.title;
    document.title = `${project.title} — Saurabh Patel`;
    return () => { document.title = previous; };
  }, [project]);

  if (!project) {
    return <main className="site-container grid min-h-[80vh] place-items-center pt-28 text-center"><div><p className="font-mono text-xs text-[#fb7185]">404 / PROJECT</p><h1 className="mt-4 text-4xl font-semibold">Project not found.</h1><Link to="/projects" className="button-secondary mt-7"><ArrowLeft size={15} /> Back to work</Link></div></main>;
  }

  return (
    <main className="pb-20 pt-28 md:pt-36">
      <section className="site-container">
        <Link to="/projects" className="button-quiet mb-10 gap-2"><ArrowLeft size={15} /> All projects</Link>
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="eyebrow mb-6">{project.eyebrow}</span>
            <h1 className="page-title text-balance">{project.title}<span style={{ color: project.accent }}>.</span></h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <p className="text-base leading-7 text-[#9ba197] md:text-lg">{project.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs text-[#777e75]"><span className="flex items-center gap-2"><Calendar size={13} /> {project.year}</span><span>·</span><span>{project.category}</span><span>·</span><span>{project.status}</span></div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="panel relative mt-14 aspect-[16/9] overflow-hidden bg-[#12101d] md:aspect-[16/7]">
          {project.image ? <img src={project.image} alt={`${project.title} interface`} className="h-full w-full object-cover object-top" /> : <div className="grid-field relative grid h-full place-items-center"><div className="absolute inset-0" style={{ background: `radial-gradient(circle, ${project.accent}25, transparent 55%)` }} /><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 32, ease: 'linear' }} className="absolute h-64 w-64 rounded-full border border-white/10 md:h-96 md:w-96" /><span className="relative max-w-[80%] text-center font-['Manrope'] text-4xl font-extrabold tracking-[-0.08em] md:text-7xl">{project.title}<span style={{ color: project.accent }}>.</span></span></div>}
        </motion.div>
      </section>

      <section className="section-space site-container grid gap-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
        <div>
          <span className="eyebrow mb-5">Overview</span>
          <div className="flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#9ba197]">{tag}</span>)}</div>
          <div className="mt-8 flex gap-3">{project.github && <a href={project.github} target="_blank" rel="noreferrer" className="button-secondary"><Github size={15} /> Source</a>}{project.demo && <a href={project.demo} className="button-primary">Visit project <ArrowUpRight size={15} /></a>}</div>
        </div>
        <div>
          <p className="text-2xl font-medium leading-9 text-[#dce0d8] md:text-3xl md:leading-[1.45]">{project.description}</p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#100e19]">
        <div className="site-container grid gap-px bg-white/10 md:grid-cols-3">
          {[['The challenge', project.challenge], ['The approach', project.solution], ['The outcome', project.outcome]].map(([title, copy], index) => (
            <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="bg-[#100e19] px-5 py-12 md:px-8 md:py-16"><span className="font-mono text-xs text-[#fb7185]">0{index + 1}</span><h2 className="mt-8 text-2xl font-semibold">{title}</h2><p className="mt-4 text-sm leading-6 text-[#8f968c] md:text-base md:leading-7">{copy}</p></motion.div>
          ))}
        </div>
      </section>

      <section className="section-space site-container grid gap-10 lg:grid-cols-2">
        <div><span className="eyebrow mb-5">Technology</span><h2 className="section-title">Built with a focused stack.</h2></div>
        <div className="grid gap-3 sm:grid-cols-2">{project.tech.map(item => <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] px-4 py-4 text-sm text-[#b2b8ae]"><CheckCircle2 size={15} className="text-[#a78bfa]" /> {item}</div>)}</div>
      </section>

      <section className="site-container pb-12">
        <div className="panel grid gap-8 p-7 md:grid-cols-2 md:p-10">
          <div><span className="eyebrow mb-4">Build something</span><h2 className="text-3xl font-semibold">Have a related challenge?</h2><button onClick={open} className="button-primary mt-6">Discuss your project <ArrowUpRight size={16} /></button></div>
          <Link to={`/projects/${nextProject.id}`} className="group rounded-[1.4rem] border border-white/10 bg-white/[0.025] p-6 transition hover:border-[#a78bfa]/35"><span className="text-xs uppercase tracking-[0.13em] text-[#656c63]">Next project</span><div className="mt-7 flex items-end justify-between"><div><p className="text-2xl font-semibold">{nextProject.title}</p><p className="mt-2 text-sm text-[#858c82]">{nextProject.eyebrow}</p></div><ArrowUpRight className="text-[#fb7185] transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div></Link>
        </div>
      </section>
    </main>
  );
}
