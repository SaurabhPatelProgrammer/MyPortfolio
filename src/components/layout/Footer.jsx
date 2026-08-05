import { ArrowUpRight, BrainCircuit, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { navigation, siteConfig } from '@config/meta';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060a12]">
      <div className="site-container py-10 md:py-14">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_0.6fr_0.6fr]">
          <div>
            <Link to="/" className="mb-5 inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#a78bfa] font-['Manrope'] text-sm font-extrabold text-[#090611] shadow-[0_0_28px_rgba(167,139,250,.2)]">SP</span>
              <span className="font-['Manrope'] font-bold">{siteConfig.name}</span>
            </Link>
            <p className="max-w-md text-base leading-7 text-[#8f968c]">Software developer with a BCA in Cyber Security &amp; Forensics, building full-stack products and practical AI experiences.</p>
            <a href={`mailto:${siteConfig.email}`} className="button-quiet mt-5 gap-2">{siteConfig.email} <ArrowUpRight size={14} /></a>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#5f655d]">Explore</p>
            <div className="flex flex-col gap-3">
              {navigation.map(item => <Link key={item.path} to={item.path} className="text-sm text-[#9ca297] transition hover:text-white">{item.label}</Link>)}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-[#5f655d]">Connect</p>
            <div className="flex flex-col gap-3">
              <a href={siteConfig.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#9ca297] transition hover:text-white"><Github size={14} /> GitHub</a>
              <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#9ca297] transition hover:text-white"><Linkedin size={14} /> LinkedIn</a>
              <a href={siteConfig.huggingface} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#9ca297] transition hover:text-white"><BrainCircuit size={14} /> Hugging Face</a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-sm text-[#9ca297] transition hover:text-white"><Mail size={14} /> Email</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs text-[#626861] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Saurabh Patel. Built in Uttar Pradesh, India.</p>
          <p>React · Three.js · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
