// Skills config — no percentage levels, just categories & tech badges
export const skills = [
  // Frontend
  { name: 'React',        category: 'Frontend',  icon: '⚛️',  color: 'from-cyan-500/20 to-blue-500/20',     border: 'border-cyan-500/30'    },
  { name: 'JavaScript',   category: 'Frontend',  icon: '🟨',  color: 'from-yellow-500/20 to-amber-500/20',  border: 'border-yellow-500/30'  },
  { name: 'Tailwind CSS', category: 'Frontend',  icon: '🎨',  color: 'from-teal-500/20 to-cyan-500/20',     border: 'border-teal-500/30'    },
  { name: 'Three.js',     category: 'Frontend',  icon: '🎯',  color: 'from-indigo-500/20 to-violet-500/20', border: 'border-indigo-500/30'  },
  { name: 'Vite',         category: 'Frontend',  icon: '⚡',  color: 'from-purple-500/20 to-pink-500/20',   border: 'border-purple-500/30'  },
  // Backend
  { name: 'Node.js',      category: 'Backend',   icon: '🟢',  color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30'   },
  { name: 'Express',      category: 'Backend',   icon: '🚂',  color: 'from-slate-500/20 to-gray-500/20',    border: 'border-slate-500/30'   },
  { name: 'MongoDB',      category: 'Backend',   icon: '🍃',  color: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30' },
  { name: 'REST APIs',    category: 'Backend',   icon: '🔗',  color: 'from-blue-500/20 to-indigo-500/20',   border: 'border-blue-500/30'    },
  // AI / ML
  { name: 'Python',       category: 'AI / ML',   icon: '🐍',  color: 'from-blue-600/20 to-yellow-500/20',   border: 'border-blue-500/30'    },
  { name: 'TensorFlow',   category: 'AI / ML',   icon: '🧠',  color: 'from-orange-500/20 to-red-500/20',    border: 'border-orange-500/30'  },
  { name: 'OpenCV',       category: 'AI / ML',   icon: '👁️', color: 'from-violet-500/20 to-indigo-500/20', border: 'border-violet-500/30'  },
  { name: 'LangChain',    category: 'AI / ML',   icon: '⛓️', color: 'from-lime-500/20 to-green-500/20',    border: 'border-lime-500/30'    },
  // IoT
  { name: 'Raspberry Pi', category: 'IoT',       icon: '🖥️', color: 'from-red-500/20 to-rose-500/20',      border: 'border-red-500/30'     },
  { name: 'Arduino',      category: 'IoT',       icon: '🔌',  color: 'from-cyan-500/20 to-teal-500/20',     border: 'border-cyan-500/30'    },
  { name: 'MQTT',         category: 'IoT',       icon: '📡',  color: 'from-sky-500/20 to-blue-500/20',      border: 'border-sky-500/30'     },
];

export const skillCategories = ['All', 'Frontend', 'Backend', 'AI / ML', 'IoT'];

export const services = [
  {
    icon: '🤖',
    title: 'AI Solutions',
    description: 'Custom AI assistants, computer vision pipelines, LLM integration, and intelligent automation systems tailored to your business.',
    tags: ['LLM', 'CV', 'NLP', 'Automation'],
    color: 'from-violet-500/20 to-indigo-500/20',
    border: 'border-violet-500/30',
  },
  {
    icon: '🌐',
    title: 'Full-Stack Web Apps',
    description: 'Production-ready MERN stack applications — from MVPs to scalable SaaS platforms with clean architecture.',
    tags: ['React', 'Node.js', 'MongoDB', 'REST API'],
    color: 'from-cyan-500/20 to-blue-500/20',
    border: 'border-cyan-500/30',
  },
  {
    icon: '🔌',
    title: 'IoT & Robotics',
    description: 'Smart device ecosystems, sensor integrations, robotic control systems, and edge computing solutions.',
    tags: ['Arduino', 'Raspberry Pi', 'MQTT', 'Edge AI'],
    color: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
  },
  {
    icon: '⚡',
    title: 'Automation',
    description: 'Workflow automation, process optimization, API integrations, and custom bots that save time and reduce costs.',
    tags: ['Python', 'Scripting', 'API', 'Bots'],
    color: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
  },
];
