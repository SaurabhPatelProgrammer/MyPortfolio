import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@components/layout/Navbar';
import Footer from '@components/layout/Footer';
import LoadingScreen from '@components/ui/LoadingScreen';
import InquiryModal from '@components/ui/InquiryModal';
import Chatbot from '@components/ui/Chatbot';
import CustomCursor from '@components/ui/CustomCursor';
import { ModalProvider } from '@hooks/useModal';

const Home           = lazy(() => import('@pages/Home'));
const About          = lazy(() => import('@pages/About'));
const Projects       = lazy(() => import('@pages/Projects'));
const ProjectDetail  = lazy(() => import('@pages/ProjectDetail'));
const Services       = lazy(() => import('@pages/Services'));
const Contact        = lazy(() => import('@pages/Contact'));
const NotFound       = lazy(() => import('@pages/NotFound'));
// Admin — completely separate layout (no Navbar/Footer)
const AdminDashboard = lazy(() => import('@pages/admin/AdminDashboard'));

export default function App() {
  return (
    <ModalProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <CustomCursor />
          <Routes>
            {/* ── Admin (standalone, no navbar/footer) ── */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* ── Public site ── */}
            <Route path="/*" element={
              <div className="relative min-h-screen bg-[#0a0a12] noise">
                <Navbar />
                <Routes>
                  <Route path="/"             element={<Home />} />
                  <Route path="/about"        element={<About />} />
                  <Route path="/projects"     element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/services"     element={<Services />} />
                  <Route path="/contact"      element={<Contact />} />
                  <Route path="*"             element={<NotFound />} />
                </Routes>
                <Footer />
                <InquiryModal />
                <Chatbot />
              </div>
            } />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ModalProvider>
  );
}
