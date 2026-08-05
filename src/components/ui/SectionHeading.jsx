import { motion } from 'framer-motion';

export default function SectionHeading({ tag, title, subtitle, center = false, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${center ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}`}
    >
      {tag && <span className={`eyebrow mb-5 ${center ? 'justify-center' : ''}`}>{tag}</span>}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title text-balance">{title}</h2>
          {subtitle && <p className={`mt-5 max-w-2xl text-base leading-7 text-[#949b90] md:text-lg ${center ? 'mx-auto' : ''}`}>{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </motion.div>
  );
}
