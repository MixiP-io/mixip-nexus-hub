
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import CreativeWorkspace from '@/pages/CreativeWorkspace'
import ProfileSettings from '@/pages/profile/index'
import ProfileSetup from '@/pages/ProfileSetup'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/context/AuthContext'
import AuthGuard from '@/components/auth/AuthGuard'
import AuthCallback from '@/pages/AuthCallback'
import '@/App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/dashboard" element={
          <AuthGuard>
            <Dashboard />
          </AuthGuard>
        } />
        <Route path="/dashboard/workspace" element={
          <AuthGuard>
            <CreativeWorkspace />
          </AuthGuard>
        } />
        <Route path="/profile/setup" element={
          <AuthGuard>
            <ProfileSetup />
          </AuthGuard>
        } />
        <Route path="/profile/settings" element={
          <AuthGuard>
            <ProfileSettings />
          </AuthGuard>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </AuthProvider>
  )
}

export default App
