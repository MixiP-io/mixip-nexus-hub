
import React from 'react';
import { 
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3,
  Settings, 
  LogOut,
  User,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-[#1A1F2C] flex flex-col">
      <div className="p-4 flex items-center space-x-2 border-b border-gray-800">
        <AnimatedLogo size="sm" />
        <span className="font-bold text-xl">Mix-IP</span>
      </div>
      
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-6 h-6 text-gray-300" />
          </div>
          <div>
            <h3 className="font-medium">Mix-IP</h3>
            <p className="text-sm text-gray-400">Manage your assets</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/workspace" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
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
            <Link to="/dashboard/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
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
      
      <div className="p-4 border-t border-gray-800 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-sm font-medium">JD</span>
        </div>
        <span>JD</span>
      </div>
    </div>
  );
};

export default Sidebar;
