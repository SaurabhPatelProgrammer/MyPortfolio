import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from 'lucide-react';
import { projects } from '@config/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) return (
    <main className="pt-28 pb-20 text-center">
      <h2 className="text-2xl text-white">Project not found.</h2>
      <Link to="/projects" className="text-indigo-400 hover:underline mt-4 inline-block">Back to Projects</Link>
    </main>
  );

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Projects
          </Link>

          <div className={`h-1 w-full rounded-full bg-gradient-to-r ${project.color} mb-8`} />

          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-5xl mb-3 block">{project.icon}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold gradient-text-white">{project.title}</h1>
              <p className="text-gray-400 mt-2 text-lg">{project.tagline}</p>
            </div>
            <span className={`text-sm px-3 py-1.5 rounded-full font-medium self-start ${
              project.status === 'Live' ? 'bg-green-500/20 text-green-400'
              : project.status === 'Active' ? 'bg-blue-500/20 text-blue-400'
              : 'bg-amber-500/20 text-amber-400'
            }`}>{project.status}</span>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar size={14} /> {project.year}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Tag size={14} /> {project.category}
            </div>
          </div>

          <div className="card-glass mb-8">
            <h2 className="text-white font-bold text-lg mb-3">About This Project</h2>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          <div className="card-glass mb-8">
            <h2 className="text-white font-bold text-lg mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-3">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-xl glass border border-indigo-500/20 text-indigo-300 text-sm">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost flex items-center gap-2">
                <Github size={16} /> View on GitHub
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
