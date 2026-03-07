import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Minimize2 } from 'lucide-react';

const SUGGESTED = [
  'What projects have you built?',
  'What services do you offer?',
  'How can I hire you?',
  'Tell me about SHYRA',
];

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const SESSION_ID = `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;

// Fallback offline responses when backend not connected
const OFFLINE_RESPONSES = {
  default: "Hi! I'm Saurabh's AI assistant. I'm currently in offline mode. You can reach Saurabh directly via the Contact page or by sending a project inquiry!",
  project: "Saurabh has built some amazing projects! His flagship is SHYRA — an AI personal assistant with vision, voice & memory. Check the Projects page for more!",
  service: "Saurabh offers AI Solutions, Full-Stack Web Development, IoT & Robotics, and Automation services. Visit the Services page for details!",
  hire: "You can hire Saurabh by clicking 'Start a Project' in the navbar, or head to the Contact page. He typically responds within 24 hours!",
  shyra: "SHYRA is Saurabh's flagship AI project — a voice-controlled personal assistant with computer vision, memory, IoT integration, and smart home control. Truly cutting-edge stuff!",
};

function getOfflineReply(msg) {
  const m = msg.toLowerCase();
  if (m.includes('project') || m.includes('built') || m.includes('work')) return OFFLINE_RESPONSES.project;
  if (m.includes('service') || m.includes('offer') || m.includes('do you')) return OFFLINE_RESPONSES.service;
  if (m.includes('hire') || m.includes('contact') || m.includes('work with')) return OFFLINE_RESPONSES.hire;
  if (m.includes('shyra')) return OFFLINE_RESPONSES.shyra;
  return OFFLINE_RESPONSES.default;
}

export default function Chatbot() {
  const [open, setOpen]         = useState(false);
  const [minimized, setMin]     = useState(false);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "👋 Hi! I'm Saurabh's AI assistant. Ask me anything about his projects, skills, or services!" }
  ]);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, sessionId: SESSION_ID, history: messages }),
        signal: AbortSignal.timeout(8000),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || getOfflineReply(msg) }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: getOfflineReply(msg) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => { setOpen(v => !v); setMin(false); }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 flex items-center justify-center glow-indigo"
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.span key="x" initial={{rotate:-90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:90,opacity:0}}><X size={22}/></motion.span>
            : <motion.span key="chat" initial={{rotate:90,opacity:0}} animate={{rotate:0,opacity:1}} exit={{rotate:-90,opacity:0}}><MessageCircle size={22}/></motion.span>
          }
        </AnimatePresence>
        {/* Unread dot */}
        {!open && <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#0a0a12] animate-pulse" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 22 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl shadow-2xl shadow-black/50 border border-white/10 flex flex-col overflow-hidden"
            style={{ maxHeight: minimized ? '60px' : '520px', transition: 'max-height 0.3s ease' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-indigo-600/20">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <Bot size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">Saurabh's AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
              <button onClick={() => setMin(v => !v)} className="p-1.5 rounded-lg glass text-gray-400 hover:text-white transition-colors">
                <Minimize2 size={14} />
              </button>
            </div>

            {!minimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin" style={{ minHeight: 0 }}>
                  {messages.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                        m.role === 'assistant' ? 'bg-indigo-600' : 'bg-white/10'
                      }`}>
                        {m.role === 'assistant' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-gray-300" />}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        m.role === 'assistant'
                          ? 'bg-white/8 text-gray-200 rounded-tl-sm'
                          : 'bg-indigo-600 text-white rounded-tr-sm'
                      }`}>
                        {m.content}
                      </div>
                    </motion.div>
                  ))}
                  {loading && (
                    <div className="flex gap-2 items-center">
                      <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Bot size={14} className="text-white" />
                      </div>
                      <div className="bg-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                        <Loader2 size={14} className="animate-spin text-indigo-400" />
                      </div>
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>

                {/* Suggestions */}
                {messages.length <= 1 && (
                  <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                    {SUGGESTED.map(s => (
                      <button key={s} onClick={() => send(s)}
                        className="text-xs px-3 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20 transition-colors">
                        {s}
                      </button>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="p-3 border-t border-white/10 flex gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || loading}
                    className="w-9 h-9 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                  >
                    <Send size={15} className="text-white" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
