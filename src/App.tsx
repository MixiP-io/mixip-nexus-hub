
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import CreativeWorkspace from '@/pages/CreativeWorkspace'
import ProfileSettings from '@/pages/profile/index'
import ProfileSetup from '@/pages/ProfileSetup'
import { Toaster } from '@/components/ui/toaster'
import '@/App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/workspace" element={<CreativeWorkspace />} />
        <Route path="/profile/setup" element={<ProfileSetup />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
