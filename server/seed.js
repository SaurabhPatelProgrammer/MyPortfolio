import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, Project } from './models.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';

const initialProjects = [
  {
    title: 'SHYRA AI Voice & Vision Companion',
    tagline: 'Ambient voice & facial detection intelligent engine',
    description: 'A futuristic hybrid intelligent robot assistant configured with custom voice recognition pipelines, face identification using OpenCV, conversational state memory, and seamless integration for IoT home devices.',
    icon: '🤖',
    category: 'AI',
    tags: ['Python', 'OpenCV', 'PyTorch', 'IoT', 'NLP'],
    image: 'saurabh.jpeg',
    liveUrl: '#',
    githubUrl: 'https://github.com/SaurabhPatelProgrammer',
    featured: true,
    status: 'Live'
  },
  {
    title: 'Cognitive Web Automation Engine',
    tagline: 'High-performance smart browser interaction pipeline',
    description: 'An AI-powered custom automation workspace built on top of Node.js and Electron, automating intricate data extraction processes and analytical dashboards for scalable multi-agent networks.',
    icon: '🕸️',
    category: 'Full-Stack',
    tags: ['Electron', 'React', 'Puppeteer', 'Tailwind', 'MongoDB'],
    image: 'fullstacktodo.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/SaurabhPatelProgrammer',
    featured: true,
    status: 'Live'
  },
  {
    title: 'Autonomous Smart Plant Ecosystem',
    tagline: 'Self-regulating embedded smart gardening framework',
    description: 'A fully closed-loop hardware setup powered by ESP32 microcontrollers, monitoring real-time soil chemistry, ambient humidity, and dynamically feeding sensory statistics to a glassmorphic React Native mobile application.',
    icon: '🌱',
    category: 'IoT',
    tags: ['ESP32', 'C++', 'React Native', 'WebSockets', 'AWS'],
    image: 'aboutday.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/SaurabhPatelProgrammer',
    featured: true,
    status: 'Beta'
  },
  {
    title: 'Distributed Multi-Agent Grid',
    tagline: 'Dynamic autonomous agents workspace',
    description: 'A professional agent-centric orchestration UI facilitating seamless communication, memory routing, and action executing capabilities for modern LLMs cooperating on software debugging protocols.',
    icon: '🧠',
    category: 'AI',
    tags: ['NextJS', 'Python', 'FastAPI', 'Redis', 'Docker'],
    image: 'socialmedia.png',
    liveUrl: '#',
    githubUrl: 'https://github.com/SaurabhPatelProgrammer',
    featured: false,
    status: 'In Progress'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Seed: Connected to MongoDB.');

    // 1. Create Default Admin User
    const adminEmail = 'admin@email.com';
    const adminPass = 'admin123';

    await User.deleteMany({ email: adminEmail });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPass, salt);

    const defaultAdmin = new User({
      email: adminEmail,
      password: hashedPassword
    });
    await defaultAdmin.save();
    console.log(`Seed: Created default admin: Email [${adminEmail}], Password [${adminPass}]`);

    // 2. Populate projects
    await Project.deleteMany({});
    await Project.insertMany(initialProjects);
    console.log(`Seed: Successfully loaded ${initialProjects.length} futuristic projects.`);

    console.log('Seed process completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed: Error seeding data:', error);
    process.exit(1);
  }
}

seed();
