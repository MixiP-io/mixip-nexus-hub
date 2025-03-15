
import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3,
  LogOut,
  User,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="w-64 bg-[#1A1F2C] flex flex-col text-white">
      <div className="p-4 flex items-center space-x-2 border-b border-gray-800">
        <AnimatedLogo size="sm" />
        <span className="font-bold text-xl">Mix-IP</span>
      </div>
      
      <div className="p-4 border-b border-gray-800">
        <Link to="/profile/settings" className="flex items-center space-x-3 hover:bg-gray-800 p-2 rounded-lg transition-colors">
          <Avatar className="h-10 w-10">
            <AvatarImage src="" />
            <AvatarFallback className="bg-gray-700 text-gray-300">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-sm text-gray-400">Creator Pro</p>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive('/dashboard') 
                  ? 'bg-gray-800 text-mixip-blue' 
                  : 'hover:bg-gray-800 transition-colors'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/workspace" 
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive('/dashboard/workspace') 
                  ? 'bg-gray-800 text-mixip-blue' 
                  : 'hover:bg-gray-800 transition-colors'
              }`}
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
          <li>
            <Link 
              to="/profile/settings" 
              className={`flex items-center space-x-3 p-3 rounded-lg ${
                isActive('/profile/settings') 
                  ? 'bg-gray-800 text-mixip-blue' 
                  : 'hover:bg-gray-800 transition-colors'
              }`}
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
          onClick={() => {/* Log out functionality */}}
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
