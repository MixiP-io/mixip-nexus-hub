
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ProfileProvider } from './pages/profile/context/ProfileContext'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </BrowserRouter>
);
