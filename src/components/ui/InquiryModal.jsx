import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ChevronDown } from 'lucide-react';
import { useModal } from '@hooks/useModal';

export default function InquiryModal() {
  const { isOpen, close } = useModal();
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    // TODO: connect to backend POST /api/inquiries
    setSent(true);
    setTimeout(() => { setSent(false); close(); setForm({ name: '', email: '', type: '', budget: '', message: '' }); }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={e => e.target === e.currentTarget && close()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="w-full max-w-lg glass-strong rounded-2xl p-8 relative"
          >
            <button onClick={close} className="absolute top-4 right-4 p-2 rounded-lg glass text-gray-400 hover:text-white transition-colors">
              <X size={18} />
            </button>

            {sent ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold text-white mb-2">Inquiry Sent!</h3>
                <p className="text-gray-400">I will get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold gradient-text mb-1">Start a Project</h2>
                <p className="text-gray-400 text-sm mb-6">Tell me about your idea and let us build something great.</p>

                <form onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="name" value={form.name} onChange={handle} required placeholder="Your Name"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors col-span-2 sm:col-span-1" />
                    <input name="email" type="email" value={form.email} onChange={handle} required placeholder="Email Address"
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors col-span-2 sm:col-span-1" />
                  </div>
                  <div className="relative">
                    <select name="type" value={form.type} onChange={handle}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                      <option value="" disabled>Project Type</option>
                      {['AI Solution', 'Full-Stack Web App', 'IoT / Robotics', 'Automation', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <div className="relative">
                    <select name="budget" value={form.budget} onChange={handle}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors appearance-none">
                      <option value="" disabled>Budget Range</option>
                      {['< $500', '$500 – $2k', '$2k – $5k', '$5k – $10k', '$10k+'].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                  <textarea name="message" value={form.message} onChange={handle} required placeholder="Describe your project..." rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
                  <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                    <Send size={16} />
                    Send Inquiry
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
