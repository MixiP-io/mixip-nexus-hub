
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import SidebarLogo from './sidebar/SidebarLogo';
import SidebarUserProfile from './sidebar/SidebarUserProfile';
import SidebarNavSection from './sidebar/SidebarNavSection';
import SidebarLogoutButton from './sidebar/SidebarLogoutButton';
import { standardNavItems, aiPlatformNavItems } from './sidebar/navItems';
import { SidebarProvider, useSidebar } from '@/context/SidebarContext';

const SidebarContent: React.FC = () => {
  const location = useLocation();
  const { signOut, user, profile } = useAuth();
  const navigate = useNavigate();
  const { sidebarWidth } = useSidebar();
  
  const isActive = (path: string) => {
    // Special case for workspace tabs
    if (path.includes('?tab=') && location.pathname === path.split('?')[0]) {
      return location.search.includes(path.split('?')[1]);
    }
    return location.pathname === path;
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Logout button clicked, calling signOut function');
    await signOut();
    // Navigation is now handled in the AuthContext provider's auth state change listener
  };
  
  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };
  
  // Check if user is AI Platform type to show specialized menu
  const isAIPlatform = profile?.account_type === 'ai_platform';
  const navItems = isAIPlatform ? aiPlatformNavItems : standardNavItems;
  
  return (
    <div className="bg-[#1A1F2C] h-screen flex flex-col text-white transition-all duration-300" style={{ width: sidebarWidth }}>
      {/* Header with Logo */}
      <SidebarLogo />
      
      {/* User Profile Section */}
      <SidebarUserProfile 
        profile={profile} 
        user={user} 
        onNavigate={handleNavigation} 
      />
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <SidebarNavSection 
          items={navItems} 
          isActive={isActive} 
          onNavigate={handleNavigation} 
        />
      </nav>
      
      {/* Log Out Button */}
      <SidebarLogoutButton onLogout={handleLogout} />
    </div>
  );
};

const Sidebar: React.FC = () => {
  return (
    <SidebarProvider>
      <SidebarContent />
    </SidebarProvider>
  );
};

export default Sidebar;
