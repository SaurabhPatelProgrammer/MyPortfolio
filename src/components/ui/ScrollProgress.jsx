import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-[#a78bfa] to-[#fb7185]"
      style={{ scaleX }}
    />
  );
}
