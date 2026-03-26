import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'

import LoginPage from './pages/public/LoginPage'
import SignupPage from './pages/public/SignupPage'
import TherapistLoginPage from './pages/public/TherapistLoginPage'
import TherapistSignupPage from './pages/public/TherapistSignupPage'
import AdminLoginPage from './pages/public/AdminLoginPage'

import UserLayout from './components/layout/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import BookSession from './pages/user/BookSession'
import OnlineSessions from './pages/user/OnlineSessions'
import WalletPage from './pages/user/WalletPage'
import AssessmentsPage from './pages/user/AssessmentsPage'
import AssessmentTest from './pages/user/AssessmentTest'
import FeedbackPage from './pages/user/FeedbackPage'
import MessagesPage from './pages/user/MessagesPage'
import ReferEarnPage from './pages/user/ReferEarnPage'
import ProfilePage from './pages/user/ProfilePage'
import PrescriptionsPage from './pages/user/PrescriptionsPage'
import RewardsPage from './pages/user/RewardsPage'
import SelfCareTools from './pages/user/SelfCareTools'
import KnowledgeCenter from './pages/user/KnowledgeCenter'

import TherapistLayout from './components/layout/TherapistLayout'
import TherapistDashboard from './pages/therapist/TherapistDashboard'
import TherapistProfilePage from './pages/therapist/TherapistProfilePage'
import TherapistSessions from './pages/therapist/TherapistSessions'
import TherapistPrescriptions from './pages/therapist/TherapistPrescriptions'

import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminTherapists from './pages/admin/AdminTherapists'
import AdminUsers from './pages/admin/AdminUsers'

function Guard({ role, children }: { role: string; children: React.ReactNode }) {
  const { role: r, token } = useAuthStore()
  if (!token || r !== role) {
    const map: Record<string, string> = { USER: '/login', THERAPIST: '/therapist/login', ADMIN: '/admin/login' }
    return <Navigate to={map[role] || '/login'} replace />
  }
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/therapist/login" element={<TherapistLoginPage />} />
      <Route path="/therapist/signup" element={<TherapistSignupPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route path="/user" element={<Guard role="USER"><UserLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="book-session" element={<BookSession />} />
        <Route path="sessions" element={<OnlineSessions />} />
        <Route path="wallet" element={<WalletPage />} />
        <Route path="assessments" element={<AssessmentsPage />} />
        <Route path="assessments/:slug" element={<AssessmentTest />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="refer-earn" element={<ReferEarnPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="prescriptions" element={<PrescriptionsPage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="self-care" element={<SelfCareTools />} />
        <Route path="knowledge-center" element={<KnowledgeCenter />} />
      </Route>

      <Route path="/therapist" element={<Guard role="THERAPIST"><TherapistLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<TherapistDashboard />} />
        <Route path="profile" element={<TherapistProfilePage />} />
        <Route path="sessions" element={<TherapistSessions />} />
        <Route path="prescriptions" element={<TherapistPrescriptions />} />
      </Route>

      <Route path="/admin" element={<Guard role="ADMIN"><AdminLayout /></Guard>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="therapists" element={<AdminTherapists />} />
        <Route path="users" element={<AdminUsers />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
