import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, Code2, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCanvas from '@components/three/HeroCanvas';
import SectionHeading from '@components/ui/SectionHeading';
import ProjectCard from '@components/ui/ProjectCard';
import { projects } from '@config/projects';
import { skills, skillCategories, services } from '@config/skills';
import { useModal } from '@hooks/useModal';
import { useTypewriter } from '@hooks/useTypewriter';

const stats = [
  { value: '2+',  label: 'Years Experience' },
  { value: '10+', label: 'Projects Built'   },
  { value: '5+',  label: 'Tech Domains'     },
  { value: '∞',   label: 'Ideas Brewing'    },
];

export default function Home() {
  const { open } = useModal();
  const typed = useTypewriter(['AI Engineer', 'Full-Stack Dev', 'IoT Builder', 'Problem Solver'], 80, 2200);
  const statsRef = useRef(null);
  const [activeSkillCat, setActiveSkillCat] = useState('All');

  const filteredSkills = activeSkillCat === 'All'
    ? skills
    : skills.filter(s => s.category === activeSkillCat);

  useEffect(() => {
    let ctx;
    import('gsap').then(({ gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from('.stat-item', {
            scrollTrigger: { trigger: statsRef.current, start: 'top 80%' },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          });
          gsap.from('.service-card', {
            scrollTrigger: { trigger: '.services-grid', start: 'top 75%' },
            y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          });
        });
      });
    }).catch(() => {});
    return () => ctx && ctx.revert();
  }, []);

  return (
    <main className="pt-20">
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-gradient-radial from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-6">
              <Sparkles size={12} />
              Available for Projects
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4">
              <span className="gradient-text-white">Hi, I am</span><br />
              <span className="gradient-text">Saurabh Patel</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex items-center gap-3 mb-6">
              <Code2 size={20} className="text-indigo-400" />
              <span className="text-xl text-gray-300 font-mono">
                {typed}<span className="animate-pulse text-indigo-400">|</span>
              </span>
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
              Building intelligent digital products &mdash; from AI assistants and computer vision
              to full-stack SaaS platforms and IoT ecosystems.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
              className="flex flex-wrap gap-4">
              <button onClick={open} className="btn-primary text-base px-8 py-4 flex items-center gap-2">
                <Brain size={18} /> Start a Project
              </button>
              <Link to="/projects" className="btn-ghost text-base px-8 py-4">View My Work</Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }} className="h-[500px] lg:h-[600px] w-full">
            <HeroCanvas />
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section ref={statsRef} className="border-y border-white/6 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item text-center">
              <div className="text-4xl font-extrabold gradient-text mb-1">{value}</div>
              <div className="text-gray-400 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-padding max-w-7xl mx-auto px-6">
        <SectionHeading tag="What I Do" title="Services & Expertise"
          subtitle="From AI systems to full-stack platforms — I build end-to-end solutions that deliver real impact." />
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => (
            <div key={i} className={`service-card card-glass bg-gradient-to-br ${svc.color} border ${svc.border} flex flex-col gap-4`}>
              <span className="text-3xl">{svc.icon}</span>
              <h3 className="text-white font-bold text-lg">{svc.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">{svc.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="section-padding bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading tag="Featured Work" title="Projects That Matter"
            subtitle="A curated selection of projects across AI, robotics, and full-stack engineering." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.featured).map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
          <div className="mt-10 text-center">
            <Link to="/projects" className="btn-ghost inline-flex items-center gap-2">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* ===== SKILLS — Redesigned: No progress bars, filterable glowing tech cards ===== */}
      <section className="section-padding max-w-7xl mx-auto px-6">
        <SectionHeading tag="Tech Stack" title="Skills & Technologies"
          subtitle="Technologies I work with across frontend, backend, AI/ML, and IoT." />

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {skillCategories.map(cat => (
            <button key={cat} onClick={() => setActiveSkillCat(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeSkillCat === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'glass text-gray-400 hover:text-white'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid — Beautiful glow cards, no percentage bars */}
        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <AnimatePresence>
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                whileHover={{ scale: 1.06, y: -4 }}
                className={`group relative bg-gradient-to-br ${skill.color} border ${skill.border} rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default text-center transition-all duration-300 hover:shadow-lg`}
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/5" />

                <span className="text-3xl drop-shadow-lg">{skill.icon}</span>
                <span className="text-white font-semibold text-sm leading-tight">{skill.name}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-black/20 text-gray-400 font-mono">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-12 border border-indigo-500/20 glow-indigo relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-transparent to-cyan-900/20 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-extrabold gradient-text mb-4 relative z-10">
              Got an Idea? Let&#39;s Build It.
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto relative z-10">
              Whether it is an AI product, a SaaS platform, or an IoT system — I am ready to turn your vision into reality.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <button onClick={open} className="btn-primary px-10 py-4 text-base">Start a Project</button>
              <Link to="/contact" className="btn-ghost px-10 py-4 text-base">Schedule a Call</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
