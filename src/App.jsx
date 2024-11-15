import AdminDashboard from "./pages/Admin/AdminDashboard";
import Adminlogin from "./pages/Admin/Adminlogin";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Adminlogin />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
