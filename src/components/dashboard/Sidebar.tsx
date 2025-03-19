
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
    return location.pathname === path || location.pathname.startsWith(path);
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
  
  console.log('Profile data in sidebar:', profile);
  const accountType = profile?.account_type === 'ai_platform' ? 'AI Platform' : (profile?.account_type || "Creator Pro");
  
  // Check if user is AI Platform type to show specialized menu
  const isAIPlatform = profile?.account_type === 'ai_platform';
  
  return (
    <div className="w-64 bg-[#1A1F2C] flex flex-col h-screen text-white">
      <div className="p-4 flex items-center space-x-2 border-b border-gray-800">
        <AnimatedLogo size="sm" />
        <span className="font-bold text-xl">Mix-IP</span>
      </div>
      
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
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive('/dashboard') && !isActive('/dashboard/workspace')
                  ? 'bg-gray-800 text-green-400' 
                  : 'hover:bg-gray-800 transition-colors'
              }`}
              onClick={handleNavigation('/dashboard')}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          
          {isAIPlatform && (
            <>
              <li>
                <Link 
                  to="/ai-platform/datasets" 
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive('/ai-platform/datasets')
                      ? 'bg-gray-800 text-green-400' 
                      : 'hover:bg-gray-800 transition-colors'
                  }`}
                  onClick={handleNavigation('/ai-platform/datasets')}
                >
                  <Database className="w-5 h-5" />
                  <span>Datasets</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/ai-platform/models" 
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive('/ai-platform/models')
                      ? 'bg-gray-800 text-green-400' 
                      : 'hover:bg-gray-800 transition-colors'
                  }`}
                  onClick={handleNavigation('/ai-platform/models')}
                >
                  <Bot className="w-5 h-5" />
                  <span>AI Models</span>
                </Link>
              </li>
            </>
          )}
          
          {!isAIPlatform && (
            <>
              <li>
                <Link 
                  to="/dashboard/workspace" 
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    isActive('/dashboard/workspace') 
                      ? 'bg-gray-800 text-mixip-blue' 
                      : 'hover:bg-gray-800 transition-colors'
                  }`}
                  onClick={handleNavigation('/dashboard/workspace')}
                >
                  <FolderOpen className="w-5 h-5" />
                  <span>Creative Workspace</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/marketplace" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <Store className="w-5 h-5" />
                  <span>Marketplace</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/insights" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <BarChart3 className="w-5 h-5" />
                  <span>Insights & Revenue</span>
                </Link>
              </li>
            </>
          )}
          
          <li>
            <Link 
              to="/profile/settings" 
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive('/profile/settings') 
                  ? 'bg-gray-800 text-mixip-blue' 
                  : 'hover:bg-gray-800 transition-colors'
              }`}
              onClick={handleNavigation('/profile/settings')}
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <button 
          className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
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
