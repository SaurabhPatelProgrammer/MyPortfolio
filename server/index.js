import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, Contact, Inquiry, Project, ChatLog } from './models.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_cyber_security_key';

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully.'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// --- Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// 1. Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Please enter all fields.' });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists.' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Please enter all fields.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token, message: 'Logged in successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Public Project Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Contact Form Submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();
    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Inquiry Submission
app.post('/api/inquiries', async (req, res) => {
  try {
    const { name, email, type, budget, message } = req.body;
    if (!name || !email || !type || !budget || !message) {
      return res.status(400).json({ error: 'Please enter all fields.' });
    }
    const newInquiry = new Inquiry({ name, email, type, budget, message });
    await newInquiry.save();
    res.status(201).json({ success: true, message: 'Inquiry saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Intelligent AI Chatbot Route with Conversational Logs
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, history } = req.body;
    if (!message || !sessionId) return res.status(400).json({ error: 'Missing message or sessionId.' });

    // Build smart AI responses
    const cleanMsg = message.toLowerCase();
    let reply = '';

    if (cleanMsg.includes('project') || cleanMsg.includes('built') || cleanMsg.includes('work')) {
      reply = "I've built several state-of-the-art systems! My flagship is SHYRA — an AI companion equipped with computer vision, voice commands, and automation capabilities. You can check detailed records under the Projects page!";
    } else if (cleanMsg.includes('service') || cleanMsg.includes('offer') || cleanMsg.includes('do you')) {
      reply = "I offer premium engineering services in AI Systems Design, Full-Stack Web Development (MERN, Python, Electron), Intelligent IoT & Robotics, and automated business workflows. Check the Services page!";
    } else if (cleanMsg.includes('hire') || cleanMsg.includes('contact') || cleanMsg.includes('work with') || cleanMsg.includes('schedule')) {
      reply = "Let's build something exceptional! Click the 'Start a Project' button at the top to configure your budget, or use the Contact form to send me an direct message. I will reach out to you within 24 hours.";
    } else if (cleanMsg.includes('shyra')) {
      reply = "SHYRA (Saurabh's Hybrid Intelligent Robot Assistant) is a customized personal voice assistant built with Python, computer vision modules, and offline storage. It acts as an ambient intelligent agent!";
    } else if (cleanMsg.includes('experience') || cleanMsg.includes('years') || cleanMsg.includes('who are you')) {
      reply = "I am Saurabh Patel, a seasoned AI & Full-Stack Engineer. I specialize in bridging the gap between intelligent deep neural networks and fully production-ready, beautiful user interfaces.";
    } else {
      reply = `Thank you for asking! Since I am configured specifically for Saurabh's AI/Full-Stack portfolio, I can tell you that Saurabh has extensive skills in React, Three.js, Node.js/Express, Python, and Machine Learning. Is there any particular project or service you'd like to hear about?`;
    }

    // Save Chat Log to DB
    let log = await ChatLog.findOne({ sessionId });
    if (!log) {
      log = new ChatLog({ sessionId, messages: [] });
    }
    log.messages.push({ role: 'user', content: message });
    log.messages.push({ role: 'assistant', content: reply });
    await log.save();

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// --- ADMIN SECURE ROUTES (JWT-PROTECTED) ---

// Get stats
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.countDocuments();
    const unreadContacts = await Contact.countDocuments({ read: false });
    const inquiries = await Inquiry.countDocuments();
    const newInquiries = await Inquiry.countDocuments({ status: 'new' });
    const projects = await Project.countDocuments();
    const chats = await ChatLog.countDocuments();

    res.json({ contacts, unreadContacts, inquiries, newInquiries, projects, chats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get contacts
app.get('/api/admin/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark contact as read
app.put('/api/admin/contacts/:id/read', authenticateToken, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete contact
app.delete('/api/admin/contacts/:id', authenticateToken, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get inquiries
app.get('/api/admin/inquiries', authenticateToken, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json({ inquiries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update inquiry status
app.put('/api/admin/inquiries/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, inquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete inquiry
app.delete('/api/admin/inquiries/:id', authenticateToken, async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get admin-level projects (allows detailed management)
app.get('/api/admin/projects', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ projects });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add dynamic projects
app.post('/api/admin/projects', authenticateToken, async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json({ success: true, project: newProject });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update dynamic projects
app.put('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, project: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete dynamic projects
app.delete('/api/admin/projects/:id', authenticateToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get chat sessions
app.get('/api/admin/chatlogs', authenticateToken, async (req, res) => {
  try {
    const logs = await ChatLog.find().sort({ updatedAt: -1 });
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear a specific chat log session
app.delete('/api/admin/chatlogs/:id', authenticateToken, async (req, res) => {
  try {
    await ChatLog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server listening elegantly on port ${PORT}...`);
});
