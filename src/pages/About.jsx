import { motion } from 'framer-motion';
import { ArrowUpRight, Github, MapPin, Sparkles } from 'lucide-react';
import profileImage from '@assets/patel-optimized.jpg';
import SectionHeading from '@components/ui/SectionHeading';
import { skillGroups } from '@config/skills';
import { siteConfig } from '@config/meta';
import { useModal } from '@hooks/useModal';
import { usePageMeta } from '@hooks/usePageMeta';

const timeline = [
  { year: 'Stage 01', title: 'Programming foundations', description: 'Started with Python and learned to turn small ideas into working scripts and interfaces.' },
  { year: 'Stage 02', title: 'Full-stack development', description: 'Expanded into React and MERN-oriented applications, connecting frontend flows with APIs and data.' },
  { year: 'Stage 03', title: 'Applied systems', description: 'Explored AI-oriented software, computer vision concepts, and connected-device development.' },
  { year: 'Current', title: 'Public builds and deeper practice', description: 'Developing SHYRA as a modular AI experiment while improving this portfolio and publishing stronger project evidence.' },
];

const values = [
  ['Ownership', 'Treat the product and its outcome as my responsibility, not just the assigned ticket.'],
  ['Clarity', 'Reduce complexity until the problem, decision, and next step become obvious.'],
  ['Craft', 'Care about the details users feel and the architecture future developers inherit.'],
  ['Momentum', 'Ship in useful increments, learn quickly, and keep the work moving forward.'],
];

export default function About() {
  const { open } = useModal();
  usePageMeta('About — Saurabh Patel', 'Meet Saurabh Patel, a software developer from Ambedkar Nagar with a BCA in Cyber Security and Forensics.');

  return (
    <main className="pb-20 pt-32 md:pt-40">
      <section className="site-container">
        <span className="eyebrow mb-6">About</span>
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-title text-balance">Engineer by craft.<br /><span className="text-[#7d857a]">Builder by instinct.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="max-w-lg text-base leading-7 text-[#959c91] md:text-lg md:leading-8">I am Saurabh, a software developer from Ambedkar Nagar who enjoys connecting difficult technical pieces into products that feel simple.</motion.p>
        </div>
      </section>

      <section className="section-space site-container">
        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="panel relative min-h-[32rem] overflow-hidden">
            <img src={profileImage} alt="Saurabh Patel" className="absolute inset-0 h-full w-full object-cover object-top grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0f] via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-2 text-xs backdrop-blur-md"><MapPin size={13} className="text-[#fb7185]" /> {siteConfig.location}</div>
            </div>
          </motion.div>

          <div className="panel p-7 md:p-10 lg:p-12">
            <span className="mb-8 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a78bfa]/10 text-[#a78bfa]"><Sparkles size={19} /></span>
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">Curiosity became a habit of building.</h2>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-[#a1a79e]">
              <p>I started with Python because I wanted to understand how software could automate small pieces of life. That curiosity quickly expanded into web products, AI systems, computer vision, and connected devices.</p>
              <p>I hold a BCA focused on Cyber Security &amp; Forensics. That foundation adds a security-aware mindset to the way I design interfaces, APIs, authentication, data flows, and complete software products.</p>
              <p>Today, I work across the product stack. I can shape an interface, design an API, think through the data model, connect an AI workflow, and still care deeply about whether the final experience feels clear.</p>
              <p>SHYRA represents that direction as a public, evolving AI experiment with body, brain, server, voice, memory, and vision modules.</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3"><button onClick={open} className="button-primary">Discuss a role or project <ArrowUpRight size={16} /></button><a href={siteConfig.github} target="_blank" rel="noreferrer" className="button-secondary"><Github size={15} /> View GitHub</a></div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#100e19]">
        <div className="site-container">
          <SectionHeading tag="Principles" title="How I show up in the work." subtitle="Technical skill matters. The way a product gets built matters just as much." />
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2">
            {values.map(([title, description], index) => (
              <motion.div key={title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="bg-[#100e19] p-7 md:p-9">
                <span className="font-mono text-xs text-[#fb7185]">0{index + 1}</span><h3 className="mt-10 text-2xl font-semibold">{title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-[#8f968c]">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space site-container">
        <SectionHeading tag="Journey" title="A path shaped by curiosity." />
        <div className="border-t border-white/10">
          {timeline.map(item => (
            <motion.div key={item.year} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-4 border-b border-white/10 py-7 sm:grid-cols-[8rem_1fr] md:grid-cols-[10rem_0.8fr_1.2fr] md:items-start md:py-9">
              <span className="font-mono text-xs text-[#fb7185]">{item.year}</span><h3 className="text-xl font-semibold">{item.title}</h3><p className="max-w-xl text-sm leading-6 text-[#8f968c]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#100e19]">
        <div className="site-container">
          <SectionHeading tag="Capabilities" title="Comfortable across the stack." />
          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map(({ title, icon: Icon, items }) => <div key={title} className="panel p-6 md:p-8"><div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#a78bfa]/[0.08] text-[#a78bfa]"><Icon size={17} /></span><h3 className="text-xl font-semibold">{title}</h3></div><div className="flex flex-wrap gap-2">{items.map(item => <span key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#9ca398]">{item}</span>)}</div></div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
