# Saurabh Patel — Portfolio v3

A product-focused personal portfolio for an AI and full-stack engineer. The experience combines editorial layouts, responsive interaction design, case-study content, an optional 3D hero, and backend-ready contact flows.

## Stack

- React 18 + Vite
- React Router
- Tailwind CSS with a custom token-based design system
- Framer Motion
- Three.js with React Three Fiber and Drei
- Lucide icons

## Local development

```bash
npm install
npm run dev
```

Quality checks:

```bash
npm run lint
npm run build
```

## Optional API

Copy `.env.example` to `.env` and set `VITE_API_URL` when a backend is available.

Expected endpoints:

- `POST /api/contact`
- `POST /api/inquiries`
- `POST /api/chat`
- `POST /api/auth/login`
- `GET /api/admin/:resource`

Without `VITE_API_URL`, contact and inquiry forms open a pre-filled email draft instead of showing a fake success state. The portfolio guide uses local answers.

## Structure

```text
src/
  components/
    layout/        Global navigation and footer
    three/         Progressive 3D hero
    ui/            Reusable interface components
  config/          Projects, services, skills, and site metadata
  hooks/           Shared interaction and metadata hooks
  pages/           Route-level experiences
```

The 3D experience is loaded progressively. Small screens and visitors who prefer reduced motion receive a lightweight static visual.
