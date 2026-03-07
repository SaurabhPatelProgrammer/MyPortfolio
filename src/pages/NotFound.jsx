import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="text-9xl font-extrabold gradient-text mb-4"
        >
          404
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-sm mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/projects" className="btn-ghost">View Projects</Link>
          </div>
        </motion.div>

        {/* Animated glowing circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }}
              style={{ left: `${20 + i * 15}%`, top: `${30 + (i % 3) * 20}%` }}
              className="absolute w-64 h-64 rounded-full bg-indigo-600/10 -translate-x-1/2 -translate-y-1/2"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
