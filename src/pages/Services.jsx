import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Clock, Shield, Star } from 'lucide-react';
import SectionHeading from '@components/ui/SectionHeading';
import { services } from '@config/skills';
import { useModal } from '@hooks/useModal';

const processSteps = [
  {
    step: '01',
    icon: '🎯',
    title: 'Discovery Call',
    desc: 'We discuss your vision, requirements, goals, and success metrics in depth.',
    duration: '1–2 days',
  },
  {
    step: '02',
    icon: '🗺️',
    title: 'Planning & Scoping',
    desc: 'I create a clear roadmap, choose the right tech stack, and define milestones.',
    duration: '2–3 days',
  },
  {
    step: '03',
    icon: '⚙️',
    title: 'Build & Iterate',
    desc: 'Rapid development with regular updates, demos, and tight feedback loops.',
    duration: 'Ongoing',
  },
  {
    step: '04',
    icon: '🚀',
    title: 'Launch & Support',
    desc: 'Production deployment, thorough testing, and post-launch support included.',
    duration: 'Ongoing',
  },
];

const perks = [
  { icon: <Zap size={18} />,    label: 'Fast Delivery',      desc: 'Agile sprints, no long waits' },
  { icon: <Shield size={18} />, label: 'Clean Code',          desc: 'Scalable, maintainable, documented' },
  { icon: <Clock size={18} />,  label: 'On-time Delivery',    desc: 'Deadlines are commitments' },
  { icon: <Star size={18} />,   label: 'Quality First',       desc: 'No shortcuts, ever' },
];

export default function Services() {
  const { open } = useModal();
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* ── HERO HEADING ───────────────────────────────────── */}
        <SectionHeading
          tag="Services"
          title="What I Build For You"
          subtitle="End-to-end development — from AI systems to full-stack products — crafted with precision and care."
        />

        {/* ── INTERACTIVE SERVICE EXPLORER ───────────────────── */}
        <div className="mb-24">
          {/* Tab selector */}
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {services.map((svc, i) => (
              <motion.button
                key={svc.id}
                onClick={() => setActiveService(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  activeService === i
                    ? `bg-gradient-to-r ${svc.gradient} text-white shadow-lg ${svc.glowColor}`
                    : 'glass text-gray-400 hover:text-white border border-white/8'
                }`}
              >
                <span className="text-lg">{svc.icon}</span>
                {svc.title}
              </motion.button>
            ))}
          </div>

          {/* Main service card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-3xl border ${active.borderColor} bg-gradient-to-br ${active.bgColor} p-0`}
            >
              {/* Decorative glow blob */}
              <div className={`absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br ${active.gradient} opacity-10 blur-3xl pointer-events-none`} />
              <div className={`absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-gradient-to-br ${active.gradient} opacity-5 blur-2xl pointer-events-none`} />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left — info */}
                <div className="p-10 lg:border-r border-white/6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center text-3xl shadow-lg ${active.glowColor}`}>
                      {active.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-white">{active.title}</h3>
                      <p className={`text-sm font-medium ${active.accent}`}>{active.tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-base mb-8">{active.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {active.tags.map(t => (
                      <span key={t} className={`text-xs px-3 py-1.5 rounded-full border ${active.borderColor} ${active.accent} bg-white/5 font-medium`}>{t}</span>
                    ))}
                  </div>

                  <motion.button
                    onClick={open}
                    whileHover={{ x: 4 }}
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r ${active.gradient} text-white font-semibold text-sm shadow-lg ${active.glowColor} transition-all`}
                  >
                    Start This Project <ArrowRight size={16} />
                  </motion.button>
                </div>

                {/* Right — features */}
                <div className="p-10">
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 opacity-60">What's Included</h4>
                  <ul className="space-y-4">
                    {active.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3"
                      >
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${active.dotColor} bg-opacity-20`}>
                          <CheckCircle2 size={16} className={active.accent} />
                        </span>
                        <span className="text-gray-200 text-sm leading-relaxed">{f}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Mini stat strip */}
                  <div className={`mt-10 pt-6 border-t ${active.borderColor} grid grid-cols-2 gap-4`}>
                    <div>
                      <p className={`text-2xl font-extrabold ${active.accent}`}>100%</p>
                      <p className="text-gray-400 text-xs mt-0.5">Client Satisfaction</p>
                    </div>
                    <div>
                      <p className={`text-2xl font-extrabold ${active.accent}`}>24h</p>
                      <p className="text-gray-400 text-xs mt-0.5">Response Time</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── WHY ME — PERKS ─────────────────────────────────── */}
        <div className="mb-24">
          <SectionHeading tag="Why Me" title="What You Can Expect" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {perks.map(({ icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="card-glass text-center p-6 group"
              >
                <div className="w-11 h-11 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-indigo-400 group-hover:bg-indigo-600/40 transition-colors">
                  {icon}
                </div>
                <p className="text-white font-semibold text-sm mb-1">{label}</p>
                <p className="text-gray-400 text-xs">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── PROCESS TIMELINE ───────────────────────────────── */}
        <div className="mb-24">
          <SectionHeading tag="How I Work" title="My Process" subtitle="Transparent, collaborative, and always on track." />

          <div className="relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map(({ step, icon, title, desc, duration }, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl glass border border-indigo-500/30 flex flex-col items-center justify-center mb-5 group-hover:border-indigo-500/60 group-hover:bg-indigo-600/10 transition-all duration-300">
                    <span className="text-2xl mb-0.5">{icon}</span>
                    <span className="text-indigo-400 text-xs font-mono font-bold">{step}</span>
                  </div>
                  <h4 className="text-white font-bold mb-2">{title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">{desc}</p>
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono">{duration}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/30 via-[#0d0d1a] to-violet-900/20 p-12 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-radial from-indigo-900/30 via-transparent to-transparent pointer-events-none" />
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="inline-block text-4xl mb-4">🚀</span>
            <h3 className="text-3xl md:text-4xl font-extrabold gradient-text mb-4">Ready to Build Something Great?</h3>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">Whether it's an AI product, a SaaS app, or an IoT system — let's turn your idea into a production-ready reality.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                onClick={open}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary px-10 py-4 text-base flex items-center gap-2"
              >
                Start a Project <ArrowRight size={18} />
              </motion.button>
              <a
                href="/contact"
                className="btn-ghost px-10 py-4 text-base"
              >
                Schedule a Call
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
