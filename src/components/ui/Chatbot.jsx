import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp, Bot, MessageCircle, Minus, X } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;
const SESSION_ID = `portfolio_${Date.now()}_${Math.random().toString(36).slice(2)}`;
const suggestions = ['Show me the best projects', 'What can Saurabh build?', 'What is his education?', 'How can I hire Saurabh?'];

const offlineReplies = {
  project: 'Start with the live Travel Itinerary Builder, the public SHYRA repository, and this portfolio. Together they show full-stack product development, AI integration, and frontend craft.',
  service: 'Saurabh works across AI products, full-stack platforms, computer vision and IoT, and workflow automation. The Services page explains each engagement.',
  shyra: 'SHYRA is an evolving public AI prototype. GitHub shows body, brain, and server areas, while its Hugging Face Space includes ears, mouth, memory, and vision modules.',
  education: 'Saurabh holds a BCA focused on Cyber Security & Forensics and is based in Ambedkar Nagar, Uttar Pradesh, India.',
  contact: 'Use the “Let’s talk” button or the Contact page for a software role or client project. You can also connect through LinkedIn or email saurabhprpgrammer94@gmail.com.',
  default: 'I can help you explore Saurabh’s work, capabilities, services, and project process. Try one of the questions below.',
};

function localReply(message) {
  const value = message.toLowerCase();
  if (value.includes('shyra')) return offlineReplies.shyra;
  if (value.includes('education') || value.includes('degree') || value.includes('college') || value.includes('bca')) return offlineReplies.education;
  if (value.includes('project') || value.includes('work') || value.includes('best')) return offlineReplies.project;
  if (value.includes('service') || value.includes('build') || value.includes('offer')) return offlineReplies.service;
  if (value.includes('start') || value.includes('contact') || value.includes('hire')) return offlineReplies.contact;
  return offlineReplies.default;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: 'assistant', content: 'Hi — I’m the portfolio guide. Ask me about Saurabh’s work, skills, or services.' }]);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, open]);

  const send = async value => {
    const message = (value || input).trim();
    if (!message || loading) return;
    setInput('');
    const history = [...messages, { role: 'user', content: message }];
    setMessages(history);
    setLoading(true);

    if (!API) {
      window.setTimeout(() => {
        setMessages(current => [...current, { role: 'assistant', content: localReply(message) }]);
        setLoading(false);
      }, 350);
      return;
    }

    try {
      const response = await fetch(`${API}/api/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, sessionId: SESSION_ID, history: messages }), signal: AbortSignal.timeout(8000) });
      if (!response.ok) throw new Error('Assistant unavailable');
      const data = await response.json();
      setMessages(current => [...current, { role: 'assistant', content: data.reply || localReply(message) }]);
    } catch {
      setMessages(current => [...current, { role: 'assistant', content: localReply(message) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button onClick={() => { setOpen(value => !value); setMinimized(false); }} whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }} className="fixed bottom-5 right-5 z-[55] grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-[#a78bfa]/30 bg-[#a78bfa] text-[#090611] shadow-[0_16px_45px_rgba(167,139,250,.3)]" aria-label={open ? 'Close portfolio guide' : 'Open portfolio guide'}>
        <AnimatePresence mode="wait">{open ? <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}><X size={19} /></motion.span> : <motion.span key="chat" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}><MessageCircle size={19} /></motion.span>}</AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && <motion.aside initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ duration: 0.25 }} className="fixed bottom-[5.2rem] right-3 z-[55] flex w-[calc(100vw-1.5rem)] max-w-[23rem] flex-col overflow-hidden rounded-[1.5rem] border border-[#a78bfa]/20 bg-[#171321]/95 shadow-2xl shadow-black/60 backdrop-blur-xl" style={{ maxHeight: minimized ? '4.15rem' : 'min(34rem, calc(100vh - 7rem))' }} aria-label="Portfolio guide">
          <div className="flex min-h-[4.15rem] items-center gap-3 border-b border-white/10 px-4"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#a78bfa] text-[#090611]"><Bot size={16} /></span><div><p className="text-sm font-semibold">Portfolio guide</p><p className="mt-0.5 text-[10px] text-[#777e75]">{API ? 'AI-assisted answers' : 'Quick portfolio answers'}</p></div><button onClick={() => setMinimized(value => !value)} className="ml-auto grid h-8 w-8 place-items-center rounded-full border border-white/10 text-[#7f867c]" aria-label="Minimize guide"><Minus size={14} /></button></div>
          {!minimized && <><div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${message.role === 'user' ? 'ml-auto rounded-br-md bg-[#a78bfa] text-[#090611]' : 'rounded-bl-md border border-white/10 bg-white/[0.035] text-[#b4bbb0]'}`}>{message.content}</div>)}{loading && <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.035] px-4 py-3"><span className="h-1 w-1 animate-pulse rounded-full bg-[#8e958b]" /><span className="h-1 w-1 animate-pulse rounded-full bg-[#8e958b] [animation-delay:120ms]" /><span className="h-1 w-1 animate-pulse rounded-full bg-[#8e958b] [animation-delay:240ms]" /></div>}<div ref={bottomRef} /></div>
            {messages.length === 1 && <div className="flex gap-2 overflow-x-auto px-4 pb-3">{suggestions.map(suggestion => <button key={suggestion} onClick={() => send(suggestion)} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-[#8f968c] transition hover:text-white">{suggestion}</button>)}</div>}
            <form onSubmit={event => { event.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-white/10 p-3"><input value={input} onChange={event => setInput(event.target.value)} className="min-w-0 flex-1 bg-transparent px-2 py-2 text-xs text-white outline-none placeholder:text-[#5e655c]" placeholder="Ask about the portfolio…" aria-label="Message" /><button disabled={!input.trim() || loading} className="grid h-9 w-9 place-items-center rounded-full bg-[#a78bfa] text-[#090611] disabled:opacity-30" aria-label="Send message"><ArrowUp size={15} /></button></form></>}
        </motion.aside>}
      </AnimatePresence>
    </>
  );
}
