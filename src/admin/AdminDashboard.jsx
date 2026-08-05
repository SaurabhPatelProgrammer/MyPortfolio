import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Mail, Briefcase, FolderKanban, MessageSquare, LogOut, Menu, Zap } from 'lucide-react';
import AdminLogin from './AdminLogin';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TABS = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'contacts',  label: 'Messages',   icon: Mail            },
  { id: 'inquiries', label: 'Inquiries',  icon: Briefcase       },
  { id: 'projects',  label: 'Projects',   icon: FolderKanban    },
  { id: 'chatlogs',  label: 'Chat Logs',  icon: MessageSquare   },
];

function useAdminFetch(path, token) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/api/admin/${path}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setData).finally(() => setLoading(false));
  }, [path, token]);
  return { data, loading };
}

// ── Sub-panels ─────────────────────────────────────────────

function Dashboard({ token }) {
  const { data } = useAdminFetch('stats', token);
  const s = data || {};
  const cards = [
    { label: 'Total Messages',  value: s.contacts  ?? '—', sub: `${s.unreadContacts ?? 0} unread`,  color: 'from-blue-500/20 to-indigo-500/20',   border: 'border-blue-500/30'   },
    { label: 'Inquiries',       value: s.inquiries ?? '—', sub: `${s.newInquiries  ?? 0} new`,      color: 'from-violet-500/20 to-purple-500/20',  border: 'border-violet-500/30' },
    { label: 'Projects',        value: s.projects  ?? '—', sub: 'in portfolio',                     color: 'from-emerald-500/20 to-teal-500/20',   border: 'border-emerald-500/30'},
    { label: 'Chat Sessions',   value: s.chats     ?? '—', sub: 'total conversations',              color: 'from-amber-500/20 to-orange-500/20',   border: 'border-amber-500/30'  },
  ];
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(c => (
          <div key={c.label} className={`bg-gradient-to-br ${c.color} border ${c.border} rounded-2xl p-6`}>
            <div className="text-3xl font-extrabold gradient-text mb-1">{c.value}</div>
            <div className="text-white font-medium text-sm">{c.label}</div>
            <div className="text-gray-400 text-xs mt-1">{c.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactsPanel({ token }) {
  const { data, loading } = useAdminFetch('contacts', token);
  const contacts = data?.contacts || [];
  if (loading) return <p className="text-gray-400">Loading...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Contact Messages ({contacts.length})</h2>
      <div className="space-y-4">
        {contacts.length === 0 && <p className="text-gray-400">No messages yet.</p>}
        {contacts.map(c => (
          <div key={c._id} className={`card-glass ${!c.read ? 'border-indigo-500/40' : ''}`}>
            <div className="flex justify-between items-start">
              <div>
                <span className="text-white font-semibold">{c.name}</span>
                <span className="text-gray-400 text-sm ml-2">&lt;{c.email}&gt;</span>
                {!c.read && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">New</span>}
              </div>
              <span className="text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-indigo-300 font-medium text-sm mt-1">{c.subject}</p>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiriesPanel({ token }) {
  const { data, loading } = useAdminFetch('inquiries', token);
  const items = data?.inquiries || [];
  const statusColor = { new: 'text-green-400 bg-green-500/20', reviewing: 'text-blue-400 bg-blue-500/20', accepted: 'text-emerald-400 bg-emerald-500/20', declined: 'text-red-400 bg-red-500/20' };
  if (loading) return <p className="text-gray-400">Loading...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Project Inquiries ({items.length})</h2>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-gray-400">No inquiries yet.</p>}
        {items.map(i => (
          <div key={i._id} className="card-glass">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span className="text-white font-semibold">{i.name}</span>
                <span className="text-gray-400 text-sm ml-2">{i.email}</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[i.status] || 'text-gray-400 bg-gray-500/20'}`}>{i.status}</span>
            </div>
            <div className="flex gap-4 mt-2 text-xs text-gray-400">
              <span>Type: <span className="text-gray-200">{i.type || '—'}</span></span>
              <span>Budget: <span className="text-gray-200">{i.budget || '—'}</span></span>
            </div>
            <p className="text-gray-400 text-sm mt-2 line-clamp-2">{i.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPanel({ token }) {
  const { data, loading } = useAdminFetch('projects', token);
  const items = data?.projects || [];
  if (loading) return <p className="text-gray-400">Loading...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Projects ({items.length})</h2>
      <p className="text-gray-400 text-sm mb-4">Full CRUD via backend API. Connect UI here for add/edit/delete.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 && <p className="text-gray-400">No projects yet. Run npm run seed.</p>}
        {items.map(p => (
          <div key={p._id} className="card-glass">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xl mr-2">{p.icon}</span>
                <span className="text-white font-bold">{p.title}</span>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>{p.status}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">{p.tagline}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {(p.tags || []).map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatLogsPanel({ token }) {
  const { data, loading } = useAdminFetch('chatlogs', token);
  const logs = data?.logs || [];
  if (loading) return <p className="text-gray-400">Loading...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Chat Logs ({logs.length})</h2>
      <div className="space-y-4">
        {logs.length === 0 && <p className="text-gray-400">No chat sessions yet.</p>}
        {logs.map(l => (
          <div key={l._id} className="card-glass">
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span className="font-mono">{l.sessionId?.slice(0, 24)}...</span>
              <span>{new Date(l.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {(l.messages || []).slice(-4).map((m, i) => (
                <div key={i} className={`text-xs px-3 py-1.5 rounded-xl ${m.role === 'user' ? 'bg-indigo-600/20 text-indigo-200 text-right' : 'bg-white/5 text-gray-300'}`}>
                  {m.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ────────────────────────────────────

export default function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || '');
  const [tab, setTab]     = useState('dashboard');
  const [sideOpen, setSide] = useState(false);

  if (!token) return <AdminLogin onLogin={setToken} />;

  const logout = () => { localStorage.removeItem('admin_token'); setToken(''); };

  const panels = { dashboard: <Dashboard token={token}/>, contacts: <ContactsPanel token={token}/>,
    inquiries: <InquiriesPanel token={token}/>, projects: <ProjectsPanel token={token}/>,
    chatlogs: <ChatLogsPanel token={token}/> };

  return (
    <div className="min-h-screen bg-[#0a0a12] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 glass-strong border-r border-white/8 flex flex-col transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center gap-3 p-6 border-b border-white/8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center"><Zap size={16} className="text-white"/></div>
          <div><p className="text-white font-bold text-sm">Admin Panel</p><p className="text-gray-400 text-xs">Saurabh Patel</p></div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setTab(id); setSide(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                tab === id ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <Icon size={16}/>{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/8">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sideOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSide(false)} />}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="glass border-b border-white/8 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSide(v => !v)} className="lg:hidden p-2 rounded-lg glass"><Menu size={18}/></button>
          <h1 className="text-white font-semibold capitalize">{tab}</h1>
          <div className="ml-auto flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">Backend connected</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            {panels[tab]}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
