import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Zap, Mail, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@config/meta';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/8 bg-[#08080f]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg text-white">{siteConfig.name}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              AI & Full-Stack Engineer building intelligent digital products for ambitious businesses.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: Github,   href: siteConfig.github   },
                { icon: Linkedin, href: siteConfig.linkedin  },
                { icon: Twitter,  href: siteConfig.twitter   },
                { icon: Mail,     href: `mailto:${siteConfig.email}` },
              ].map(({ icon: Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-white hover:border-indigo-500/50 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1 group">
                    {label}<ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white text-sm transition-colors block">
                {siteConfig.email}
              </a>
              <p className="text-gray-400 text-sm">{siteConfig.location}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-medium">Available for projects</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Built with React + Three.js + GSAP</p>
        </div>
      </div>
    </footer>
  );
}
