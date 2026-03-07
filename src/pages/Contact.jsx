import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@components/ui/SectionHeading';
import { siteConfig } from '@config/meta';
import { Github, Linkedin, Twitter, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

const socials = [
  { icon: Github,   label: 'GitHub',   href: siteConfig.github,   username: 'SaurabhPatelProgrammer' },
  { icon: Linkedin, label: 'LinkedIn', href: siteConfig.linkedin,  username: 'saurabhpatel'          },
  { icon: Twitter,  label: 'Twitter',  href: siteConfig.twitter,   username: '@saurabhpatel'         },
  { icon: Mail,     label: 'Email',    href: `mailto:${siteConfig.email}`, username: siteConfig.email },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent]   = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    // TODO: POST /api/contact
    setSent(true);
  };

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          tag="Contact"
          title="Let&#39;s Talk"
          subtitle="Have a project in mind or just want to connect? I am always open to a conversation."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            {sent ? (
              <div className="card-glass flex flex-col items-center justify-center py-16 gap-4">
                <CheckCircle2 size={48} className="text-green-400" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-gray-400 text-center">I will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-ghost mt-2">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="card-glass space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">Send a Message</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handle} required placeholder="Name"
                    className="col-span-2 sm:col-span-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                  <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email"
                    className="col-span-2 sm:col-span-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <input name="subject" value={form.subject} onChange={handle} required placeholder="Subject"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors" />
                <textarea name="message" value={form.message} onChange={handle} required rows={5} placeholder="Your message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="card-glass">
              <div className="flex items-center gap-3 mb-1">
                <MapPin size={16} className="text-indigo-400" />
                <span className="text-white font-medium">Location</span>
              </div>
              <p className="text-gray-400 text-sm ml-7">{siteConfig.location}</p>
            </div>
            <div className="card-glass">
              <div className="flex items-center gap-3 mb-1">
                <Mail size={16} className="text-indigo-400" />
                <span className="text-white font-medium">Email</span>
              </div>
              <a href={`mailto:${siteConfig.email}`} className="text-indigo-300 text-sm ml-7 hover:underline">{siteConfig.email}</a>
            </div>
            <div className="card-glass">
              <p className="text-white font-medium mb-4">Availability</p>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Open to new projects</span>
              </div>
              <p className="text-gray-400 text-xs mt-2">Typical response time: within 24 hours</p>
            </div>
            <div className="card-glass">
              <p className="text-white font-medium mb-4">Socials</p>
              <div className="space-y-3">
                {socials.map(({ icon: Icon, label, href, username }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                    <Icon size={16} className="text-indigo-400" />
                    <span className="text-sm">{username}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
