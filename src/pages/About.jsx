import { motion } from 'framer-motion';
import SectionHeading from '@components/ui/SectionHeading';
import { siteConfig } from '@config/meta';
import { skills } from '@config/skills';
import { MapPin, Calendar, Coffee, Rocket } from 'lucide-react';

const timeline = [
  { year: '2022', title: 'Started Coding Journey', desc: 'Began with Python and fell in love with building things.' },
  { year: '2023', title: 'First Web Projects',    desc: 'Built MERN stack apps, freelance clients, and learned React deeply.' },
  { year: '2024', title: 'Entered AI & IoT',      desc: 'Explored computer vision, LLMs, Raspberry Pi, and robotics.' },
  { year: '2025', title: 'Portfolio & SHYRA',     desc: 'Launched personal brand website. Started building SHYRA AI assistant.' },
  { year: '2026', title: 'Going Deep on AI',      desc: 'Full focus on AI systems, LangChain agents, and startup products.' },
];

export default function About() {
  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="About Me"
          title="The Story Behind the Code"
          subtitle="I am Saurabh Patel — an AI & Full-Stack engineer from India, building the future one project at a time."
        />

        {/* Bio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 text-gray-300 leading-relaxed text-base">
              <p>
                I started coding out of pure curiosity and quickly became obsessed with building intelligent systems.
                My work spans <span className="text-indigo-300 font-medium">AI, full-stack web apps, IoT, and robotics</span> —
                fields that I believe are converging to reshape how we live and work.
              </p>
              <p>
                My flagship project, <span className="text-cyan-300 font-medium">SHYRA</span>, is an AI personal assistant
                with vision, voice, and memory capabilities. It represents everything I am passionate about —
                blending AI, hardware, and software into a cohesive intelligent system.
              </p>
              <p>
                I approach every project like a founder: with ownership, precision, and a relentless focus on
                shipping high-quality work that creates real value.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: MapPin,   text: 'India'                  },
                { icon: Calendar, text: '2+ Years Building'      },
                { icon: Coffee,   text: 'Chai-Powered Dev ☕'     },
                { icon: Rocket,   text: 'Startup Mindset'        },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} className="card-glass flex items-center gap-3">
                  <Icon size={16} className="text-indigo-400" />
                  <span className="text-sm text-gray-300">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vision Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8 border border-indigo-500/20"
          >
            <h3 className="text-xl font-bold gradient-text mb-4">Vision & Mission</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              To build AI-powered products that are not just technically impressive — but genuinely useful,
              accessible, and transformative for businesses and individuals.
            </p>
            <div className="space-y-3">
              {[
                '🤖 Making AI accessible to every business',
                '🌐 Building global-standard products from India',
                '🔌 Merging physical and digital with IoT',
                '🚀 Shipping fast, iterating faster',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <SectionHeading tag="Journey" title="My Timeline" />
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-cyan-500 to-transparent" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex ${i % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} pl-12 md:pl-0`}
              >
                <div className="absolute left-2 md:left-1/2 w-4 h-4 rounded-full bg-indigo-500 border-2 border-indigo-300 -translate-x-1/2 md:mt-2" />
                <div className={`card-glass w-full md:w-5/12 ${i % 2 !== 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <span className="text-indigo-400 text-xs font-mono">{item.year}</span>
                  <h4 className="text-white font-bold mt-1 mb-1">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
