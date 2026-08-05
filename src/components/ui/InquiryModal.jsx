import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { siteConfig } from '@config/meta';
import { useModal } from '@hooks/useModal';

const API = import.meta.env.VITE_API_URL;
const emptyForm = { name: '', email: '', type: '', budget: '', message: '' };

export default function InquiryModal() {
  const { isOpen, close } = useModal();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = event => event.key === 'Escape' && close();
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [isOpen, close]);

  const update = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  const submit = async event => {
    event.preventDefault();
    setStatus('loading');
    setFeedback('');

    if (!API) {
      const subject = `${form.type || 'Project'} enquiry from ${form.name}`;
      const body = `Hi Saurabh,\n\n${form.message}\n\nProject type: ${form.type || 'Not specified'}\nProject scale: ${form.budget || 'Not specified'}\nFrom: ${form.name} (${form.email})`;
      window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('email');
      setFeedback('Your email app should open with the enquiry ready to review and send.');
      return;
    }

    try {
      const response = await fetch(`${API}/api/inquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!response.ok) throw new Error('The enquiry could not be delivered.');
      setStatus('success');
      setFeedback('Enquiry delivered. I will be in touch soon.');
      setForm(emptyForm);
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Something went wrong. Please email me directly.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-3 backdrop-blur-lg sm:p-5" onMouseDown={event => event.target === event.currentTarget && close()}>
        <motion.div role="dialog" aria-modal="true" aria-labelledby="inquiry-title" initial={{ opacity: 0, y: 25, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: 0.98 }} transition={{ duration: 0.28 }} className="my-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] border border-[#a78bfa]/20 bg-[#171321] shadow-2xl">
          <div className="flex items-start justify-between border-b border-white/10 p-6 md:p-8"><div><span className="eyebrow mb-4">New project</span><h2 id="inquiry-title" className="text-3xl font-semibold md:text-4xl">Let&apos;s build something useful.</h2><p className="mt-3 max-w-lg text-sm leading-6 text-[#8f968c]">A few details will help me understand where you are and how I can help.</p></div><button onClick={close} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-[#8f968c] transition hover:text-white" aria-label="Close enquiry"><X size={17} /></button></div>
          <form onSubmit={submit} className="p-6 md:p-8"><div className="grid gap-4 sm:grid-cols-2"><label><span className="input-label">Name</span><input className="input-field" name="name" required value={form.name} onChange={update} placeholder="Your name" /></label><label><span className="input-label">Email</span><input className="input-field" name="email" type="email" required value={form.email} onChange={update} placeholder="you@company.com" /></label><label><span className="input-label">Project type</span><select className="input-field" name="type" value={form.type} onChange={update} required><option value="" disabled>Select a service</option><option>AI product</option><option>Full-stack product</option><option>Applied prototype</option><option>Automation</option><option>Something else</option></select></label><label><span className="input-label">Project scale</span><select className="input-field" name="budget" value={form.budget} onChange={update}><option value="">Not sure yet</option><option>Small focused build</option><option>Multi-feature product</option><option>Longer-term collaboration</option><option>Discovery needed first</option></select></label><label className="sm:col-span-2"><span className="input-label">What are you trying to achieve?</span><textarea className="input-field min-h-28 resize-y" name="message" required value={form.message} onChange={update} placeholder="Context, current stage, desired outcome, and timeline…" /></label></div>
            {feedback && <div role="status" className={`mt-4 flex gap-2 rounded-xl border px-4 py-3 text-sm ${status === 'success' ? 'border-[#34d399]/20 text-[#a7f3d0]' : status === 'error' ? 'border-red-400/20 text-red-300' : 'border-white/10 text-[#aab1a6]'}`}><CheckCircle2 size={16} className="mt-0.5 shrink-0" /> {feedback}</div>}
            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-[#626860]">Your details stay private.</p><button disabled={status === 'loading'} className="button-primary disabled:opacity-60">{status === 'loading' ? 'Sending…' : 'Send enquiry'} <ArrowUpRight size={16} /></button></div>
          </form>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  );
}
