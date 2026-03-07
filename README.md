# Saurabh Patel — Production-Ready Portfolio v2

> AI & Full-Stack Engineer Personal Brand Website

![Stack](https://img.shields.io/badge/Stack-MERN-blue) ![React](https://img.shields.io/badge/React-18-61DAFB) ![Three.js](https://img.shields.io/badge/Three.js-0.168-black) ![GSAP](https://img.shields.io/badge/GSAP-3.12-green)

## 🚀 Tech Stack

| Layer       | Technology                                   |
|-------------|----------------------------------------------|
| Frontend    | React 18, Vite, React Router v6             |
| Styling     | Tailwind CSS (custom design system)          |
| 3D          | Three.js, @react-three/fiber, @react-three/drei |
| Animation   | GSAP + ScrollTrigger, Framer Motion          |
| Icons       | Lucide React, React Icons                    |
| Backend     | ⏳ Planned: Node.js + Express + MongoDB       |

## 📁 Folder Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer
│   ├── ui/           # Reusable components (Cards, Modal, etc)
│   └── three/        # Three.js / R3F 3D scenes
├── pages/            # Route-level pages
├── hooks/            # Custom React hooks
├── config/           # Data config files (projects, skills, meta)
├── utils/            # Helper functions
└── assets/           # Images, icons, fonts
```

## ⚡ Setup

```bash
# Install deps
npm install

# Dev server
npm run dev

# Production build
npm run build
```

## 🔗 Backend Integration (Planned)

When ready to add backend:

1. Create `/server` folder at root
2. Setup Express + MongoDB
3. Add API routes:
   - `POST /api/contact` — Contact form
   - `POST /api/inquiries` — Project inquiry modal
   - `GET /api/projects` — Dynamic project fetching
4. Update form `onSubmit` handlers in `Contact.jsx` and `InquiryModal.jsx` to call the API
5. Add `.env` with `VITE_API_URL=http://localhost:5000`

## 🌟 Features

- ✅ 3D interactive hero (Three.js + R3F)
- ✅ GSAP scroll animations
- ✅ Framer Motion micro-interactions
- ✅ Glassmorphism design system
- ✅ Dark theme with indigo glow
- ✅ Config-based project data
- ✅ Dynamic project routing
- ✅ Inquiry modal
- ✅ Mobile-first responsive
- ✅ Code splitting + lazy loading
- ✅ SEO meta tags
- ✅ Animated 404 page
