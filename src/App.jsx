import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import LoadingScreen from '@components/ui/LoadingScreen';
import InquiryModal from '@components/ui/InquiryModal';
import Chatbot from '@components/ui/Chatbot';
import ScrollProgress from '@components/ui/ScrollProgress';
import { ModalProvider } from '@hooks/useModal';

const Home = lazy(() => import('@pages/Home'));
const About = lazy(() => import('@pages/About'));
const Projects = lazy(() => import('@pages/Projects'));
const ProjectDetail = lazy(() => import('@pages/ProjectDetail'));
const Services = lazy(() => import('@pages/Services'));
const Contact = lazy(() => import('@pages/Contact'));
const NotFound = lazy(() => import('@pages/NotFound'));
const AdminDashboard = lazy(() => import('@/admin/AdminDashboard'));

function PublicSite() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#0a0912]">
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <InquiryModal />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/*" element={<PublicSite />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ModalProvider>
  );
}
