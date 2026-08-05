import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, CircleCheck, Search, Shapes, TestTube2, Rocket } from 'lucide-react';
import { services } from '@config/skills';
import { useModal } from '@hooks/useModal';
import { usePageMeta } from '@hooks/usePageMeta';

const process = [
  { number: '01', icon: Search, title: 'Discover', copy: 'Clarify the problem, the people involved, the constraints, and what success should look like.' },
  { number: '02', icon: Shapes, title: 'Shape', copy: 'Turn findings into a focused scope, product architecture, interface direction, and delivery plan.' },
  { number: '03', icon: TestTube2, title: 'Build & learn', copy: 'Develop in useful increments, share progress often, test assumptions, and adjust with evidence.' },
  { number: '04', icon: Rocket, title: 'Launch', copy: 'Harden the product, document decisions, deploy confidently, and support the next iteration.' },
];

export default function Services() {
  const [activeId, setActiveId] = useState(services[0].id);
  const { open } = useModal();
  const active = services.find(service => service.id === activeId);
  usePageMeta('Services — Saurabh Patel', 'AI product engineering, full-stack development, computer vision, IoT, and automation services.');

  return (
    <main className="pb-20 pt-32 md:pt-40">
      <section className="site-container">
        <span className="eyebrow mb-6">Services</span>
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-title text-balance">From difficult idea<br /><span className="text-[#7d857a]">to useful product.</span></motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}><p className="max-w-lg text-base leading-7 text-[#959c91] md:text-lg">Strategy, interface, engineering, and launch support without unnecessary handoffs.</p><button onClick={open} className="button-primary mt-7">Discuss your project <ArrowUpRight size={16} /></button></motion.div>
        </div>
      </section>

      <section className="section-space site-container">
        <div className="grid gap-5 lg:grid-cols-[0.38fr_0.62fr]">
          <div className="flex flex-col gap-2">
            {services.map(service => {
              const Icon = service.icon;
              return <button key={service.id} onClick={() => setActiveId(service.id)} className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition ${activeId === service.id ? 'border-[#a78bfa]/30 bg-[#a78bfa]/[0.08] text-white' : 'border-transparent text-[#747b72] hover:bg-white/[0.025] hover:text-[#c7ccc3]'}`}><span className={`grid h-10 w-10 place-items-center rounded-xl ${activeId === service.id ? 'bg-[#a78bfa] text-[#090611]' : 'border border-white/10'}`}><Icon size={17} /></span><div><span className="block text-[10px] font-bold uppercase tracking-[0.13em] opacity-60">{service.number}</span><span className="font-['Manrope'] text-sm font-semibold">{service.title}</span></div><ArrowRight size={15} className="ml-auto" /></button>;
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.28 }} className="panel relative overflow-hidden p-7 md:p-10 lg:p-12">
              <div className="absolute right-0 top-0 h-64 w-64 translate-x-1/3 -translate-y-1/3 rounded-full blur-3xl" style={{ background: `${active.accent}18` }} />
              <div className="relative">
                <span className="text-xs font-bold uppercase tracking-[0.15em]" style={{ color: active.accent }}>{active.tagline}</span>
                <h2 className="mt-5 text-4xl font-semibold md:text-6xl">{active.title}</h2>
                <p className="mt-6 max-w-2xl text-base leading-7 text-[#9aa196] md:text-lg md:leading-8">{active.description}</p>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">{active.features.map(feature => <div key={feature} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm text-[#b1b7ad]"><CircleCheck size={16} className="mt-0.5 shrink-0" style={{ color: active.accent }} /> {feature}</div>)}</div>
                <div className="mt-9 flex flex-wrap gap-2">{active.tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-[#7f867c]">{tag}</span>)}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <section className="section-space border-y border-white/10 bg-[#100e19]">
        <div className="site-container">
          <span className="eyebrow mb-5">Process</span><div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]"><h2 className="section-title text-balance">Transparent from the first question to launch.</h2><p className="max-w-xl text-base leading-7 text-[#92998f] lg:ml-auto">A simple process keeps decisions visible, feedback useful, and momentum high.</p></div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-4">{process.map(({ number, icon: Icon, title, copy }, index) => <motion.div key={number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className="bg-[#100e19] p-6 md:p-8"><div className="flex items-center justify-between"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#a78bfa]/[0.08] text-[#a78bfa]"><Icon size={17} /></span><span className="font-mono text-xs text-[#746c88]">{number}</span></div><h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#898f86]">{copy}</p></motion.div>)}</div>
        </div>
      </section>

      <section className="section-space site-container">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="panel p-7 md:p-10"><span className="eyebrow mb-6">Good fit</span><h2 className="text-3xl font-semibold md:text-4xl">We will work well together if…</h2><div className="mt-8 space-y-4">{['You care about solving the right problem, not adding features for show.', 'You value honest communication and useful feedback.', 'You want a partner who can think across product and engineering.', 'You are ready to make decisions and move the work forward.'].map(item => <div key={item} className="flex gap-3 text-sm leading-6 text-[#a0a69c]"><Check size={16} className="mt-1 shrink-0 text-[#fb7185]" /> {item}</div>)}</div></div>
          <div className="panel relative overflow-hidden p-7 md:p-10"><div className="grid-field absolute inset-0 opacity-30" /><div className="relative"><span className="eyebrow mb-6">Start here</span><h2 className="text-3xl font-semibold md:text-4xl">Not sure what service you need?</h2><p className="mt-5 max-w-md text-base leading-7 text-[#92998f]">Bring the context and the problem. We can shape the right engagement together.</p><button onClick={open} className="button-primary mt-8">Tell me what you&apos;re building <ArrowUpRight size={16} /></button></div></div>
        </div>
      </section>
    </main>
  );
}
