import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import Verify from './pages/Verify'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentPortal from './pages/StudentPortal'
import FacultyGuide from './pages/FacultyGuide'
import FAQs from './pages/FAQs'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import AdminDashboard from './pages/AdminDashboard'
import StudentDashboard from './pages/StudentDashboard'
import ReviewerDashboard from './pages/ReviewerDashboard'
import Profile from './pages/Profile'
import IpTools from './pages/IpTools'
import News from './pages/News'
import Research from './pages/Research'
import Team from './pages/Team'
import AIAssistant from './components/AIAssistant'
import ToastContainer from './components/Toast'

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/reviews" element={<ReviewerDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<StudentDashboard />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tools" element={<IpTools />} />
        <Route path="/news" element={<News />} />
        <Route path="/research" element={<Research />} />
        <Route path="/team" element={<Team />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/faculty-guide" element={<FacultyGuide />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>
      </Routes>
      <AIAssistant />
    </>
  )
}
