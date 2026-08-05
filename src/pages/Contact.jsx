import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Clock3, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@config/meta';
import { usePageMeta } from '@hooks/usePageMeta';

const API = import.meta.env.VITE_API_URL;
const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');
  usePageMeta('Contact — Saurabh Patel', 'Contact Saurabh Patel about software development roles, freelance work, and client projects.');

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async event => {
    event.preventDefault();
    setStatus('loading');
    setFeedback('');

    if (!API) {
      const body = `Hi Saurabh,\n\n${form.message}\n\nFrom: ${form.name} (${form.email})`;
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('email');
      setFeedback('Your email app should open with the message ready. Review it and press send.');
      return;
    }

    try {
      const response = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error('The message could not be delivered.');
      setStatus('success');
      setFeedback('Message delivered. I will reply as soon as possible.');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Something went wrong. Please email me directly.');
    }
  };

  return (
    <main className="pb-20 pt-32 md:pt-40">
      <section className="site-container">
        <span className="eyebrow mb-6">Contact</span>
        <div className="grid items-end gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="page-title text-balance">Let&apos;s discuss<br /><span className="text-[#7d857a]">the opportunity.</span></motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="max-w-lg text-base leading-7 text-[#959c91] md:text-lg">Hiring for a software role or planning a client project? Share the context, requirements, and where you would like help.</motion.p>
        </div>
      </section>

      <section className="section-space site-container">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} onSubmit={submit} className="panel p-6 md:p-9">
            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-6"><div><h2 className="text-2xl font-semibold">Role or project enquiry</h2><p className="mt-1 text-sm text-[#777e75]">All fields are required.</p></div><span className="status-dot" /></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label><span className="input-label">Your name</span><input className="input-field" name="name" value={form.name} onChange={update} required placeholder="Jane Smith" /></label>
              <label><span className="input-label">Email address</span><input className="input-field" name="email" type="email" value={form.email} onChange={update} required placeholder="jane@company.com" /></label>
              <label className="sm:col-span-2"><span className="input-label">What would you like to discuss?</span><input className="input-field" name="subject" value={form.subject} onChange={update} required placeholder="Software role, web platform, AI prototype…" /></label>
              <label className="sm:col-span-2"><span className="input-label">Context</span><textarea className="input-field min-h-40 resize-y" name="message" value={form.message} onChange={update} required placeholder="The role or problem, current stage, timeline, and what success looks like…" /></label>
            </div>
            {feedback && <div role="status" className={`mt-5 rounded-xl border px-4 py-3 text-sm ${status === 'success' ? 'border-[#34d399]/25 bg-[#34d399]/[0.07] text-[#a7f3d0]' : status === 'error' ? 'border-red-400/20 bg-red-400/[0.06] text-red-300' : 'border-white/10 bg-white/[0.03] text-[#aab1a6]'}`}>{feedback}</div>}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><button disabled={status === 'loading'} className="button-primary disabled:cursor-wait disabled:opacity-60">{status === 'loading' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={16} /></button><p className="text-xs text-[#656c63]">No spam. No mailing list. Just a reply.</p></div>
          </motion.form>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="panel p-6 md:p-7"><span className="mb-5 grid h-10 w-10 place-items-center rounded-xl bg-[#a78bfa]/10 text-[#a78bfa]"><Mail size={17} /></span><p className="text-xs font-bold uppercase tracking-[0.13em] text-[#656c63]">Email directly</p><a href={`mailto:${siteConfig.email}`} className="mt-2 block break-all text-base font-semibold transition hover:text-[#fb7185]">{siteConfig.email}</a></div>
            <div className="panel p-6 md:p-7"><div className="space-y-5"><div className="flex items-start gap-3"><MapPin size={16} className="mt-0.5 text-[#a78bfa]" /><div><p className="text-sm font-semibold">Location</p><p className="mt-1 text-xs text-[#777e75]">{siteConfig.location}</p></div></div><div className="flex items-start gap-3"><Clock3 size={16} className="mt-0.5 text-[#fb7185]" /><div><p className="text-sm font-semibold">Response time</p><p className="mt-1 text-xs text-[#777e75]">{siteConfig.responseTime}</p></div></div><div className="flex items-start gap-3"><CheckCircle2 size={16} className="mt-0.5 text-[#34d399]" /><div><p className="text-sm font-semibold">Availability</p><p className="mt-1 text-xs text-[#777e75]">{siteConfig.availability}</p></div></div></div></div>
            <div className="panel p-6 md:p-7"><p className="mb-5 text-xs font-bold uppercase tracking-[0.13em] text-[#656c63]">Elsewhere</p><div className="flex gap-3"><a href={siteConfig.github} target="_blank" rel="noreferrer" className="button-secondary flex-1 px-3 text-xs"><Github size={15} /> GitHub</a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="button-secondary flex-1 px-3 text-xs"><Linkedin size={15} /> LinkedIn</a></div></div>
          </div>
        </div>
      </section>
    </main>
  );
}
