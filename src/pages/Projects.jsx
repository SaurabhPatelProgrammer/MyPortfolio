import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@components/ui/SectionHeading';
import ProjectCard from '@components/ui/ProjectCard';
import { categories, projects as fallbackProjects } from '@config/projects';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Projects() {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(data => {
        if (data && data.length > 0) {
          // Map DB keys to frontend keys
          const mapped = data.map(p => ({
            id: p._id,
            title: p.title,
            tagline: p.tagline,
            description: p.description,
            tags: p.tags,
            category: p.category,
            featured: p.featured,
            status: p.status,
            year: new Date(p.createdAt).getFullYear().toString() || '2026',
            tech: p.tags,
            github: p.githubUrl || '',
            demo: p.liveUrl || '',
            color: p.category === 'AI' ? 'from-violet-600 to-indigo-600' : p.category === 'IoT' ? 'from-amber-600 to-orange-600' : 'from-emerald-600 to-teal-600',
            icon: p.icon || '🚀'
          }));
          setProjects(mapped);
        } else {
          setProjects(fallbackProjects);
        }
      })
      .catch(() => {
        setProjects(fallbackProjects);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          tag="Portfolio"
          title="Projects & Work"
          subtitle="Real-world projects across AI, web, IoT, and automation."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                active === cat
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20 text-indigo-400 font-mono">
            Scanning and fetching quantum datasets...
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProjectCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects in this category yet. Check back soon! 🚀
          </div>
        )}
      </div>
    </main>
  );
}
