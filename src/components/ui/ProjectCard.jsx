import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="card-glass group cursor-pointer relative overflow-hidden"
    >
      {/* Gradient top accent */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${project.color}`} />

      {/* Icon & Status */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{project.icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          project.status === 'Live' ? 'bg-green-500/20 text-green-400'
          : project.status === 'Active' ? 'bg-blue-500/20 text-blue-400'
          : 'bg-amber-500/20 text-amber-400'
        }`}>{project.status}</span>
      </div>

      <h3 className="text-white font-bold text-lg mb-2 group-hover:text-indigo-300 transition-colors">
        {project.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {project.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-gray-400 border border-white/8">
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto">
        <Link
          to={`/projects/${project.id}`}
          className="flex items-center gap-1 text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          View Details <ArrowUpRight size={14} />
        </Link>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="ml-auto p-2 rounded-lg glass text-gray-400 hover:text-white transition-colors">
            <Github size={15} />
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer"
            className="p-2 rounded-lg glass text-gray-400 hover:text-white transition-colors">
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
