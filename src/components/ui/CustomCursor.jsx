import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="hidden md:block fixed pointer-events-none z-50 rounded-full bg-indigo-500/10 border border-indigo-400/40 mix-blend-screen shadow-[0_0_15px_rgba(99,102,241,0.4)]"
        animate={{
          x: mouse.x - (hovered ? 20 : 10),
          y: mouse.y - (hovered ? 20 : 10),
          width: hovered ? 40 : 20,
          height: hovered ? 40 : 20,
        }}
        transition={{ type: 'spring', damping: 28, stiffness: 450, mass: 0.6 }}
      />
    </AnimatePresence>
  );
}
