import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-[#0a0a12] flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-indigo-600/30 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-t-indigo-400 border-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
          <div className="absolute inset-4 rounded-full bg-indigo-600/20 animate-pulse" />
        </div>
        <div className="flex gap-1">
          {['S', 'A', 'U', 'R', 'A', 'B', 'H'].map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="text-white font-bold text-lg tracking-widest"
            >{char}</motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
