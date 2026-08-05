import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0912]">
      <div className="flex flex-col items-center gap-5">
        <div className="font-['Manrope'] text-2xl font-bold tracking-[-0.06em]">SP<span className="text-[#fb7185]">/</span></div>
        <div className="h-px w-28 overflow-hidden bg-white/10">
          <motion.div className="h-full w-1/2 bg-gradient-to-r from-[#a78bfa] to-[#fb7185]" animate={{ x: ['-100%', '220%'] }} transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }} />
        </div>
      </div>
    </div>
  );
}
