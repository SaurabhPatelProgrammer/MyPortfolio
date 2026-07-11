import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Mail, Briefcase, FolderKanban, MessageSquare, LogOut, Menu, X, Zap, Bell, Check, Trash2, Plus, Edit3, Save } from 'lucide-react';
import AdminLogin from './AdminLogin';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const TABS = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'contacts',  label: 'Messages',   icon: Mail            },
  { id: 'inquiries', label: 'Inquiries',  icon: Briefcase       },
  { id: 'projects',  label: 'Projects',   icon: FolderKanban    },
  { id: 'chatlogs',  label: 'Chat Logs',  icon: MessageSquare   },
];

function useAdminFetch(path, token, trigger) {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${API}/api/admin/${path}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json()).then(setData).catch(console.error).finally(() => setLoading(false));
  }, [path, token, trigger]);
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
  const [trigger, setTrigger] = useState(0);
  const { data, loading } = useAdminFetch('contacts', token, trigger);
  const contacts = data?.contacts || [];

  const markRead = async (id) => {
    try {
      await fetch(`${API}/api/admin/contacts/${id}/read`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${API}/api/admin/contacts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  if (loading) return <p className="text-gray-400 font-mono">Loading telemetry logs...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Contact Messages ({contacts.length})</h2>
      <div className="space-y-4">
        {contacts.length === 0 && <p className="text-gray-400">No messages received yet.</p>}
        {contacts.map(c => (
          <div key={c._id} className={`card-glass relative flex flex-col gap-2 ${!c.read ? 'border-indigo-500/40 bg-indigo-950/10' : ''}`}>
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span className="text-white font-semibold text-lg">{c.name}</span>
                <span className="text-indigo-400 text-sm block sm:inline sm:ml-2">&lt;{c.email}&gt;</span>
                {!c.read && <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">New</span>}
              </div>
              <span className="text-gray-500 text-xs">{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-white font-medium text-sm border-t border-white/5 pt-2">Subject: <span className="text-indigo-300">{c.subject}</span></p>
            <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{c.message}</p>
            <div className="flex justify-end gap-2 mt-4">
              {!c.read && (
                <button onClick={() => markRead(c._id)} className="px-3 py-1.5 rounded-xl bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs font-semibold flex items-center gap-1">
                  <Check size={12}/> Mark Read
                </button>
              )}
              <button onClick={() => deleteContact(c._id)} className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-1">
                <Trash2 size={12}/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InquiriesPanel({ token }) {
  const [trigger, setTrigger] = useState(0);
  const { data, loading } = useAdminFetch('inquiries', token, trigger);
  const items = data?.inquiries || [];
  const statusColor = { new: 'text-green-400 bg-green-500/20', reviewing: 'text-blue-400 bg-blue-500/20', accepted: 'text-emerald-400 bg-emerald-500/20', declined: 'text-red-400 bg-red-500/20' };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/api/admin/inquiries/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  const deleteInquiry = async (id) => {
    try {
      await fetch(`${API}/api/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  if (loading) return <p className="text-gray-400 font-mono">Loading transaction metrics...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Project Inquiries ({items.length})</h2>
      <div className="space-y-4">
        {items.length === 0 && <p className="text-gray-400">No project inquiries received yet.</p>}
        {items.map(i => (
          <div key={i._id} className="card-glass">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <span className="text-white font-semibold text-lg">{i.name}</span>
                <span className="text-gray-400 text-sm block sm:inline sm:ml-2">{i.email}</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColor[i.status] || 'text-gray-400 bg-gray-500/20'}`}>{i.status}</span>
            </div>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400 border-y border-white/5 py-2 my-2">
              <span>Type: <span className="text-indigo-300 font-medium">{i.type || '—'}</span></span>
              <span>Budget: <span className="text-emerald-400 font-medium">{i.budget || '—'}</span></span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{i.message}</p>
            <div className="flex justify-between items-center gap-2 mt-4 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">Change Status:</span>
                {['reviewing', 'accepted', 'declined'].map(st => (
                  <button key={st} onClick={() => updateStatus(i._id, st)} className="text-[10px] px-2 py-1 rounded-lg glass capitalize hover:text-white">
                    {st}
                  </button>
                ))}
              </div>
              <button onClick={() => deleteInquiry(i._id)} className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-1">
                <Trash2 size={12}/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsPanel({ token }) {
  const [trigger, setTrigger] = useState(0);
  const { data, loading } = useAdminFetch('projects', token, trigger);
  const items = data?.projects || [];

  const [form, setForm] = useState({ title: '', tagline: '', description: '', icon: '🚀', category: 'AI', tags: '', liveUrl: '', githubUrl: '', featured: false, status: 'Live' });
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const saveProject = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingId) {
        await fetch(`${API}/api/admin/projects/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      } else {
        await fetch(`${API}/api/admin/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(payload)
        });
      }
      // Reset
      setForm({ title: '', tagline: '', description: '', icon: '🚀', category: 'AI', tags: '', liveUrl: '', githubUrl: '', featured: false, status: 'Live' });
      setEditingId(null);
      setIsFormOpen(false);
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  const startEdit = (p) => {
    setForm({
      title: p.title,
      tagline: p.tagline,
      description: p.description,
      icon: p.icon || '🚀',
      category: p.category || 'AI',
      tags: (p.tags || []).join(', '),
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      featured: p.featured || false,
      status: p.status || 'Live'
    });
    setEditingId(p._id);
    setIsFormOpen(true);
  };

  const deleteProject = async (id) => {
    try {
      await fetch(`${API}/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  if (loading) return <p className="text-gray-400 font-mono">Connecting neural node projects...</p>;
  return (
    <div>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Dynamic Projects Hub ({items.length})</h2>
        <button onClick={() => {
          setIsFormOpen(!isFormOpen);
          setEditingId(null);
          setForm({ title: '', tagline: '', description: '', icon: '🚀', category: 'AI', tags: '', liveUrl: '', githubUrl: '', featured: false, status: 'Live' });
        }} className="btn-primary flex items-center gap-1.5 py-2.5">
          {isFormOpen ? <X size={16}/> : <Plus size={16}/>} {isFormOpen ? 'Close Form' : 'Add New Project'}
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.form initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            onSubmit={saveProject} className="card-glass p-6 mb-8 border border-indigo-500/30 space-y-4 overflow-hidden">
            <h3 className="text-lg font-bold text-indigo-300">{editingId ? 'Edit Project' : 'Publish New Project'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="text-gray-400 text-xs mb-1 block">Project Title</label>
                <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} required
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Icon (Emoji)</label>
                <input value={form.icon} onChange={e => setForm(f => ({...f, icon: e.target.value}))} required
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Short Tagline</label>
              <input value={form.tagline} onChange={e => setForm(f => ({...f, tagline: e.target.value}))} required
                className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Detailed Description</label>
              <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} required rows={4}
                className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                  {['AI', 'Full-Stack', 'IoT', 'Robotics', 'Automation'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Project Status</label>
                <input value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} required
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Featured Project?</label>
                <select value={form.featured ? 'true' : 'false'} onChange={e => setForm(f => ({...f, featured: e.target.value === 'true'}))}
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white">
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Tags / Tech Stack (comma separated)</label>
              <input value={form.tags} onChange={e => setForm(f => ({...f, tags: e.target.value}))} placeholder="React, Node, PyTorch"
                className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-xs mb-1 block">GitHub Repository URL</label>
                <input value={form.githubUrl} onChange={e => setForm(f => ({...f, githubUrl: e.target.value}))}
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Live Demo URL</label>
                <input value={form.liveUrl} onChange={e => setForm(f => ({...f, liveUrl: e.target.value}))}
                  className="w-full bg-[#0a0a12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white" />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-1.5">
              <Save size={16}/> Save Project Settings
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.length === 0 && <p className="text-gray-400 col-span-2">No projects dynamically registered yet.</p>}
        {items.map(p => (
          <div key={p._id} className="card-glass flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{p.icon}</span>
                  <div>
                    <span className="text-white font-bold text-lg block leading-tight">{p.title}</span>
                    <span className="text-indigo-400 text-xs font-mono">{p.category}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${p.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>{p.status}</span>
                  {p.featured && <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold">Featured</span>}
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">{p.tagline}</p>
              <div className="flex flex-wrap gap-1 mt-3">
                {(p.tags || []).map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-gray-400 border border-white/5">{t}</span>)}
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6 border-t border-white/5 pt-3">
              <button onClick={() => startEdit(p)} className="px-3 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 text-xs font-semibold flex items-center gap-1">
                <Edit3 size={12}/> Edit
              </button>
              <button onClick={() => deleteProject(p._id)} className="px-3 py-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-1">
                <Trash2 size={12}/> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatLogsPanel({ token }) {
  const [trigger, setTrigger] = useState(0);
  const { data, loading } = useAdminFetch('chatlogs', token, trigger);
  const logs = data?.logs || [];

  const deleteLog = async (id) => {
    try {
      await fetch(`${API}/api/admin/chatlogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      setTrigger(t => t + 1);
    } catch (e) { console.error(e); }
  };

  if (loading) return <p className="text-gray-400 font-mono">Loading quantum dialogue nodes...</p>;
  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">AI Conversational Logs ({logs.length})</h2>
      <div className="space-y-4">
        {logs.length === 0 && <p className="text-gray-400">No AI agent interactions logged yet.</p>}
        {logs.map(l => (
          <div key={l._id} className="card-glass">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-3 pb-2 border-b border-white/5 flex-wrap gap-2">
              <span className="font-mono text-indigo-400">Session ID: {l.sessionId}</span>
              <div className="flex items-center gap-2">
                <span>{new Date(l.updatedAt).toLocaleString()}</span>
                <button onClick={() => deleteLog(l._id)} className="p-1 rounded bg-red-500/20 hover:bg-red-500/30 text-red-400">
                  <Trash2 size={12}/>
                </button>
              </div>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {(l.messages || []).map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`text-xs px-3.5 py-2 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === 'user' ? 'bg-indigo-600/30 text-indigo-100 rounded-tr-sm' : 'bg-white/5 text-gray-200 rounded-tl-sm'
                  }`}>
                    <p className="font-bold text-[10px] text-gray-400 mb-0.5 capitalize">{m.role}</p>
                    <p className="whitespace-pre-line">{m.content}</p>
                  </div>
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
            <span className="text-green-400 text-xs">Uplink Connected</span>
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
