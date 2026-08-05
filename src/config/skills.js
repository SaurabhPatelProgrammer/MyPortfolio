import { BrainCircuit, CodeXml, Container, Workflow, Database, Blocks, ScanEye, Wrench } from 'lucide-react';

export const capabilities = [
  { name: 'AI product engineering', icon: BrainCircuit, description: 'LLM workflows, intelligent assistants, computer vision, and practical automation.' },
  { name: 'Full-stack products', icon: CodeXml, description: 'Responsive React experiences backed by secure, maintainable APIs and databases.' },
  { name: 'Applied prototypes', icon: Container, description: 'Modular experiments combining AI behavior, voice and vision inputs, APIs, and deployable services.' },
  { name: 'Workflow automation', icon: Workflow, description: 'Custom tools, integrations, and bots that remove repetitive operational work.' },
];

export const services = [
  {
    id: 'ai',
    number: '01',
    icon: BrainCircuit,
    title: 'AI Products',
    shortTitle: 'AI',
    tagline: 'Turn a useful AI idea into a dependable product.',
    description: 'I design and engineer AI-powered experiences around real user workflows — from assistants and knowledge systems to vision pipelines and internal tools.',
    features: ['Product and workflow discovery', 'LLM and retrieval architecture', 'Computer vision integration', 'Evaluation and production handoff'],
    tags: ['LLM', 'RAG', 'Computer Vision', 'Agents'],
    accent: '#fb7185',
  },
  {
    id: 'web',
    number: '02',
    icon: Blocks,
    title: 'Full-Stack Products',
    shortTitle: 'Web',
    tagline: 'From early MVP to a polished, scalable web product.',
    description: 'I build fast, accessible interfaces and the systems behind them, with clear architecture and attention to the small details users feel.',
    features: ['Product UI and design systems', 'React application development', 'APIs, auth, and database design', 'Deployment and performance'],
    tags: ['React', 'Node.js', 'MongoDB', 'REST'],
    accent: '#a78bfa',
  },
  {
    id: 'applied-prototypes',
    number: '03',
    icon: ScanEye,
    title: 'Applied Prototypes',
    shortTitle: 'Prototype',
    tagline: 'Test technical ideas before turning them into larger products.',
    description: 'I build focused experiments around AI behavior, voice and vision modules, APIs, and deployable services to learn what is technically useful.',
    features: ['Focused proof-of-concept builds', 'Voice and vision experiments', 'Modular API services', 'Technical feasibility exploration'],
    tags: ['Python', 'C++', 'Docker', 'Vision'],
    accent: '#45d4b1',
  },
  {
    id: 'automation',
    number: '04',
    icon: Workflow,
    title: 'Automation Systems',
    shortTitle: 'Automation',
    tagline: 'Replace repetitive operations with reliable workflows.',
    description: 'I map manual processes and build focused automations, bots, integrations, and data pipelines that make teams faster without adding complexity.',
    features: ['Workflow and process mapping', 'API and webhook integrations', 'Custom bots and utilities', 'Observability and handoff'],
    tags: ['Python', 'APIs', 'Bots', 'Pipelines'],
    accent: '#ffb45e',
  },
];

export const skillGroups = [
  { title: 'Frontend', icon: CodeXml, items: ['React', 'JavaScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Vite'] },
  { title: 'Backend', icon: Database, items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'Authentication', 'WebSockets'] },
  { title: 'AI experiments', icon: BrainCircuit, items: ['Python', 'C++', 'Voice modules', 'Vision modules', 'Memory workflows', 'AI prototyping'] },
  { title: 'Tools', icon: Wrench, items: ['Git & GitHub', 'Docker', 'Vite', 'REST APIs', 'Responsive design', 'Deployment'] },
];

export const skills = skillGroups.flatMap(group => group.items.map(name => ({ name, category: group.title })));
export const skillCategories = ['All', ...skillGroups.map(group => group.title)];
