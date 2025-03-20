
import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3,
  LogOut,
  User,
  Database,
  Bot
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { signOut, user, profile } = useAuth();
  const navigate = useNavigate();
  
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
    <div className="w-64 bg-[#1A1F2C] h-screen flex flex-col text-white">
      {/* Header with Logo */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <AnimatedLogo size="sm" />
          <span className="font-bold text-xl">Mix-IP</span>
        </div>
      </div>
      
      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-800">
        <Link to="/profile/settings" className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg transition-colors">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatarUrl || ""} />
            <AvatarFallback className="bg-gray-700 text-gray-300">
              {displayName.split(' ').map(name => name[0]).join('') || "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{displayName}</h3>
            <p className="text-sm text-gray-400">{accountType}</p>
          </div>
        </Link>
      </div>
      
      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          <li>
            <Link 
              to="/dashboard" 
              onClick={handleNavigation('/dashboard')}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive('/dashboard') 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          
          {isAIPlatform ? (
            // AI Platform specific menu items
            <>
              <li>
                <Link 
                  to="/dashboard/workspace?tab=datasets" 
                  onClick={handleNavigation('/dashboard/workspace?tab=datasets')}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive('/dashboard/workspace') && location.search.includes('tab=datasets')
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Database className="w-5 h-5" />
                  <span>Datasets</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/dashboard/workspace?tab=ai-models" 
                  onClick={handleNavigation('/dashboard/workspace?tab=ai-models')}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive('/dashboard/workspace') && location.search.includes('tab=ai-models')
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  <span>AI Models</span>
                </Link>
              </li>
            </>
          ) : (
            // Regular user menu items
            <>
              <li>
                <Link 
                  to="/dashboard/workspace" 
                  onClick={handleNavigation('/dashboard/workspace')}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive('/dashboard/workspace') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <FolderOpen className="w-5 h-5" />
                  <span>Creative Workspace</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/dashboard/marketplace"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive('/dashboard/marketplace') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Store className="w-5 h-5" />
                  <span>Marketplace</span>
                </Link>
              </li>
              
              <li>
                <Link 
                  to="/dashboard/insights"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive('/dashboard/insights') 
                      ? 'bg-green-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Insights & Revenue</span>
                </Link>
              </li>
            </>
          )}
          
          <li>
            <Link 
              to="/profile/settings" 
              onClick={handleNavigation('/profile/settings')}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                isActive('/profile/settings') 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Log Out Button */}
      <div className="p-4 border-t border-gray-800">
        <button 
          className="w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center space-x-2"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
