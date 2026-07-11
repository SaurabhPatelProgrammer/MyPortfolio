import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

// Inquiry Schema
const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  budget: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'reviewing', 'accepted', 'declined'], default: 'new' }
}, { timestamps: true });

// Project Schema
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: '🚀' },
  category: { type: String, default: 'AI' }, // AI, Full-Stack, IoT, Robotics
  tags: [String],
  image: { type: String, default: '' },
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  status: { type: String, default: 'Live' }
}, { timestamps: true });

// ChatLog Schema
const chatLogSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Contact = mongoose.model('Contact', contactSchema);
export const Inquiry = mongoose.model('Inquiry', inquirySchema);
export const Project = mongoose.model('Project', projectSchema);
export const ChatLog = mongoose.model('ChatLog', chatLogSchema);
