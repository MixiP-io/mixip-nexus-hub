
import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3,
  LogOut,
  User,
  Database,
  Bot,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut, user, profile } = useAuth();
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  const isActive = (path: string) => {
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
  
  // Use data from auth profile instead of profile context
  const displayName = profile?.full_name || user?.email?.split('@')[0] || "User";
  const avatarUrl = profile?.avatar || null;
  
  // Make sure we're showing the actual account type from the profile
  console.log('Profile data in sidebar:', profile);
  const accountType = profile?.account_type === 'ai_platform' ? 'AI Platform' : (profile?.account_type || "Creator Pro");
  
  // Check if user is AI Platform type to show specialized menu
  const isAIPlatform = profile?.account_type === 'ai_platform';
  
  return (
    <ShadcnSidebar data-state={state} className="bg-[#1A1F2C] text-white relative">
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 bg-[#1A1F2C] text-white rounded-full p-1 shadow-md z-10 hover:bg-gray-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <SidebarHeader className="border-b border-gray-800">
        <div className={`p-4 flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
          <AnimatedLogo size="sm" />
          {!isCollapsed && <span className="font-bold text-xl">Mix-IP</span>}
        </div>
        
        <div className={`p-4 border-b border-gray-800 ${isCollapsed ? 'flex justify-center' : ''}`}>
          <Link to="/profile/settings" className={`flex ${isCollapsed ? 'justify-center' : 'items-center space-x-3'} hover:bg-gray-800 p-2 rounded-lg transition-colors`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl || ""} />
              <AvatarFallback className="bg-gray-700 text-gray-300">
                {displayName.split(' ').map(name => name[0]).join('') || "U"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div>
                <h3 className="font-medium">{displayName}</h3>
                <p className="text-sm text-gray-400">{accountType}</p>
              </div>
            )}
          </Link>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={isActive('/dashboard')}
              tooltip={isCollapsed ? "Dashboard" : undefined}
            >
              <Link to="/dashboard" onClick={handleNavigation('/dashboard')} className={isCollapsed ? 'flex justify-center' : ''}>
                <LayoutDashboard className="w-5 h-5" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {isAIPlatform ? (
            // AI Platform specific menu items
            <>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/dashboard/workspace') && location.search.includes('tab=datasets')}
                  tooltip={isCollapsed ? "Datasets" : undefined}
                >
                  <Link 
                    to="/dashboard/workspace?tab=datasets" 
                    onClick={handleNavigation('/dashboard/workspace?tab=datasets')}
                    className={isCollapsed ? 'flex justify-center' : ''}
                  >
                    <Database className="w-5 h-5" />
                    {!isCollapsed && <span>Datasets</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/dashboard/workspace') && location.search.includes('tab=ai-models')}
                  tooltip={isCollapsed ? "AI Models" : undefined}
                >
                  <Link 
                    to="/dashboard/workspace?tab=ai-models" 
                    onClick={handleNavigation('/dashboard/workspace?tab=ai-models')}
                    className={isCollapsed ? 'flex justify-center' : ''}
                  >
                    <Bot className="w-5 h-5" />
                    {!isCollapsed && <span>AI Models</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          ) : (
            // Regular user menu items
            <>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  isActive={isActive('/dashboard/workspace')}
                  tooltip={isCollapsed ? "Creative Workspace" : undefined}
                >
                  <Link 
                    to="/dashboard/workspace" 
                    onClick={handleNavigation('/dashboard/workspace')}
                    className={isCollapsed ? 'flex justify-center' : ''}
                  >
                    <FolderOpen className="w-5 h-5" />
                    {!isCollapsed && <span>Creative Workspace</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip={isCollapsed ? "Marketplace" : undefined}
                >
                  <Link 
                    to="/dashboard/marketplace"
                    className={isCollapsed ? 'flex justify-center' : ''}
                  >
                    <Store className="w-5 h-5" />
                    {!isCollapsed && <span>Marketplace</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild 
                  tooltip={isCollapsed ? "Insights & Revenue" : undefined}
                >
                  <Link 
                    to="/dashboard/insights"
                    className={isCollapsed ? 'flex justify-center' : ''}
                  >
                    <BarChart3 className="w-5 h-5" />
                    {!isCollapsed && <span>Insights & Revenue</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </>
          )}
          
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={isActive('/profile/settings')}
              tooltip={isCollapsed ? "My Profile" : undefined}
            >
              <Link 
                to="/profile/settings" 
                onClick={handleNavigation('/profile/settings')}
                className={isCollapsed ? 'flex justify-center' : ''}
              >
                <User className="w-5 h-5" />
                {!isCollapsed && <span>My Profile</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 mt-auto">
        <button 
          className={`${isCollapsed ? 'w-10 h-10 mx-auto rounded-full flex items-center justify-center' : 'w-full p-3 rounded-lg flex items-center justify-center space-x-2'} bg-green-600 hover:bg-green-700 text-white transition-colors`}
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
