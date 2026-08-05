import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CircleDot, Code2, Globe2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroCanvas from '@components/three/HeroCanvas';
import ProjectCard from '@components/ui/ProjectCard';
import SectionHeading from '@components/ui/SectionHeading';
import { capabilities, skillGroups } from '@config/skills';
import { projects } from '@config/projects';
import { siteConfig } from '@config/meta';
import { useModal } from '@hooks/useModal';
import { usePageMeta } from '@hooks/usePageMeta';

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: index => ({ opacity: 1, y: 0, transition: { delay: 0.08 + index * 0.09, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

const principles = [
  ['01', 'Think in products', 'The goal is not more code. It is a clear, useful experience that solves the right problem.'],
  ['02', 'Build the system', 'Interfaces, APIs, data, and operations are designed as one connected product.'],
  ['03', 'Ship with intent', 'Fast feedback, measurable progress, and a strong quality bar from prototype to launch.'],
];

export default function Home() {
  const { open } = useModal();
  const featuredProjects = projects.filter(project => project.featured);
  usePageMeta('Saurabh Patel — Software Developer', 'Software developer from Ambedkar Nagar building full-stack applications, AI experiments, and practical digital products.');

  return (
    <main>
      <section className="relative min-h-[100svh] overflow-hidden pb-16 pt-28 md:pt-32">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-60" />
        <div className="orb-glow pointer-events-none absolute inset-0" />

        <div className="site-container relative grid min-h-[calc(100svh-10rem)] items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative z-10 py-10 lg:py-16">
            <motion.div custom={0} variants={reveal} initial="hidden" animate="visible" className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-[#b8beb4] backdrop-blur-md">
              <span className="status-dot" /> {siteConfig.availability}
            </motion.div>

            <div className="reveal-line">
              <motion.p custom={1} variants={reveal} initial="hidden" animate="visible" className="mb-4 font-['Manrope'] text-sm font-semibold text-[#9ba298]">Software developer · {siteConfig.degree}</motion.p>
            </div>
            <motion.h1 custom={2} variants={reveal} initial="hidden" animate="visible" className="display-title max-w-5xl text-balance">
              I build products<br />that think <span className="bg-gradient-to-r from-[#a78bfa] to-[#fb7185] bg-clip-text text-transparent">forward.</span>
            </motion.h1>
            <motion.p custom={3} variants={reveal} initial="hidden" animate="visible" className="mt-7 max-w-xl text-base leading-7 text-[#9aa196] md:text-lg md:leading-8">
              I build full-stack applications and AI-powered experiences for growing teams, client projects, and real-world problems.
            </motion.p>

            <motion.div custom={4} variants={reveal} initial="hidden" animate="visible" className="mt-9 flex flex-wrap gap-3">
              <button onClick={open} className="button-primary">Hire or collaborate <ArrowUpRight size={17} /></button>
              <Link to="/projects" className="button-secondary">Explore selected work <ArrowRight size={16} /></Link>
            </motion.div>

            <motion.div custom={5} variants={reveal} initial="hidden" animate="visible" className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-xs text-[#747b72]">
              <span className="flex items-center gap-2"><Globe2 size={14} /> {siteConfig.location}</span>
              <span className="flex items-center gap-2"><CircleDot size={14} /> Software · Web · AI · Automation</span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className="relative h-[24rem] lg:h-[38rem]">
            <HeroCanvas />
            <div className="absolute bottom-6 right-0 rounded-2xl border border-white/10 bg-[#171321]/80 p-4 backdrop-blur-xl md:right-6">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-[#877f9b]"><Sparkles size={11} className="text-[#fb7185]" /> Current focus</div>
              <p className="font-['Manrope'] text-sm font-semibold">Modular AI systems</p>
            </div>
          </motion.div>
        </div>

        <a href="#work" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#596057] md:flex">Scroll <ArrowDown size={13} /></a>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-white/[0.018] py-5" aria-label="Technology highlights">
        <div className="marquee-track flex w-max items-center">
          {[...skillGroups.flatMap(group => group.items), ...skillGroups.flatMap(group => group.items)].map((skill, index) => (
            <div key={`${skill}-${index}`} className="flex items-center whitespace-nowrap px-5 text-xs font-semibold uppercase tracking-[0.13em] text-[#777e75]">
              {skill}<span className="ml-10 h-1 w-1 rounded-full bg-[#fb7185]" />
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="section-space">
        <div className="site-container">
          <SectionHeading
            tag="Selected work"
            title="Ideas shaped into real product experiences."
            subtitle="A selection of systems and interfaces across artificial intelligence, full-stack engineering, and digital products."
            action={<Link to="/projects" className="button-secondary">All projects <ArrowUpRight size={15} /></Link>}
          />
          <div className="grid gap-5 md:grid-cols-2">
            {featuredProjects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} large={index === 0} />)}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#100e19]">
        <div className="site-container">
          <SectionHeading tag="What I do" title="One engineering partner, from idea to launch." subtitle="I combine product thinking, interface craft, and systems engineering so fewer details are lost between disciplines." />
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2">
            {capabilities.map(({ name, icon: Icon, description }, index) => (
              <motion.div key={name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="group bg-[#100e19] p-7 transition hover:bg-[#1b1728] md:p-9">
                <div className="mb-10 flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-[#a78bfa]/20 bg-[#a78bfa]/[0.08] text-[#a78bfa]"><Icon size={20} /></span>
                  <span className="font-mono text-xs text-[#51574f]">0{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold md:text-2xl">{name}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-[#8f968c]">{description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center"><Link to="/services" className="button-quiet">See how I can help <ArrowRight size={15} /></Link></div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="eyebrow mb-5">How I work</span>
            <h2 className="section-title text-balance">Clear thinking before clever technology.</h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#92998f]">Every engagement starts with the problem, the person using the product, and the outcome that matters.</p>
            <button onClick={open} className="button-primary mt-8">Discuss your idea <ArrowUpRight size={16} /></button>
          </div>
          <div className="border-t border-white/10">
            {principles.map(([number, title, description]) => (
              <motion.div key={number} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid gap-4 border-b border-white/10 py-8 sm:grid-cols-[4rem_1fr] md:py-10">
                <span className="font-mono text-xs text-[#fb7185]">{number}</span>
                <div><h3 className="text-2xl font-semibold">{title}</h3><p className="mt-3 max-w-lg text-sm leading-6 text-[#8e958b] md:text-base md:leading-7">{description}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#100e19]">
        <div className="site-container">
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="panel relative overflow-hidden p-7 md:p-10">
              <div className="grid-field absolute inset-0 opacity-40" />
              <div className="relative">
                <div className="mb-12 flex items-center justify-between"><span className="eyebrow">Toolkit</span><Code2 size={19} className="text-[#5f665c]" /></div>
                <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">The right technology for the product — not the trend.</h2>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#92998f] md:text-base">A versatile stack lets me choose architecture around constraints, speed, and long-term maintainability.</p>
              </div>
            </div>
            <div className="panel p-7 md:p-8">
              <div className="space-y-7">
                {skillGroups.map(({ title, icon: Icon, items }) => (
                  <div key={title}>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold"><Icon size={15} className="text-[#fb7185]" /> {title}</div>
                    <div className="flex flex-wrap gap-2">{items.map(item => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-[#9ba297]">{item}</span>)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="site-container">
          <div className="panel relative overflow-hidden px-6 py-14 text-center md:px-12 md:py-20">
            <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a78bfa]/15 blur-3xl" />
            <div className="relative mx-auto max-w-3xl">
              <span className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#aaa2bd]"><Check size={14} className="text-[#34d399]" /> Open to roles and client work</span>
              <h2 className="section-title text-balance">Hiring a developer or planning a product?</h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#91988d]">Share the role, project, current stage, and the outcome you need. I am open to software opportunities and direct client collaborations.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-3"><button onClick={open} className="button-primary">Start a conversation <ArrowUpRight size={17} /></button><Link to="/about" className="button-secondary">More about me</Link></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
