import { motion } from 'framer-motion';
import SectionHeading from '@components/ui/SectionHeading';
import { services } from '@config/skills';
import { useModal } from '@hooks/useModal';
import { CheckCircle2 } from 'lucide-react';

const process = [
  { step: '01', title: 'Discovery Call',    desc: 'We discuss your vision, requirements, and success metrics.'   },
  { step: '02', title: 'Planning & Scoping', desc: 'I create a clear roadmap, tech stack, and timeline.'          },
  { step: '03', title: 'Build & Iterate',   desc: 'Rapid development with regular updates and feedback loops.'   },
  { step: '04', title: 'Launch & Support',  desc: 'Deployment, testing, and post-launch support.'               },
];

export default function Services() {
  const { open } = useModal();
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Services"
          title="What I Build For You"
          subtitle="End-to-end development services designed to take your idea from concept to production."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`card-glass bg-gradient-to-br ${svc.color} border ${svc.border} p-8`}
            >
              <span className="text-4xl mb-4 block">{svc.icon}</span>
              <h3 className="text-xl font-bold text-white mb-3">{svc.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-4">{svc.description}</p>
              <div className="flex flex-wrap gap-2">
                {svc.tags.map(t => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process */}
        <SectionHeading tag="How I Work" title="My Process" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
          {process.map(({ step, title, desc }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass relative"
            >
              <span className="text-5xl font-extrabold text-indigo-500/20 font-mono">{step}</span>
              <h4 className="text-white font-bold mt-2 mb-2">{title}</h4>
              <p className="text-gray-400 text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center glass-strong rounded-2xl p-12 border border-indigo-500/20">
          <h3 className="text-2xl font-bold gradient-text mb-3">Ready to Build Something Great?</h3>
          <p className="text-gray-400 mb-6">Let us turn your idea into a production-ready product.</p>
          <button onClick={open} className="btn-primary px-10 py-4">Start a Project</button>
        </div>
      </div>
    </main>
  );
}
