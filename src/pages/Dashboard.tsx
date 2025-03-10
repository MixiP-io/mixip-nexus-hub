
import React from 'react';
import { 
  Search, 
  Plus, 
  Upload,
  LayoutDashboard, 
  FolderOpen, 
  Store, 
  BarChart3,
  Settings, 
  LogOut,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

// Sample project data
const projects = [
  {
    id: 1,
    title: "Belize Vacation",
    assets: 32,
    updated: "2 days ago",
    image: "/lovable-uploads/20e270e7-8a94-400d-a3c5-560f432fd5ba.png"
  },
  {
    id: 2,
    title: "Brand Photoshoot",
    assets: 18,
    updated: "1 week ago",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Client Presentation",
    assets: 8,
    updated: "yesterday",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Nature Collection",
    assets: 56,
    updated: "3 days ago",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    title: "Stock Collection",
    assets: 114,
    updated: "today",
    image: "/placeholder.svg"
  }
];

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-mixip-gray-dark text-white flex">
      {/* Sidebar */}
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
              <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-mixip-blue bg-opacity-20 text-mixip-blue">
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/dashboard/content" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                <FolderOpen className="w-5 h-5" />
                <span>Content Hub</span>
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
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-[#1A1F2C] p-4 flex items-center justify-between border-b border-gray-800">
          <div className="relative w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text" 
              className="bg-gray-800 text-white w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-mixip-blue"
              placeholder="Search"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
              Quick Action
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>
        
        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="flex">
            <button className="px-6 py-4 font-medium border-b-2 border-green-600 text-white">
              Projects
            </button>
            <button className="px-6 py-4 font-medium text-gray-400 hover:text-white">
              Assets
            </button>
            <button className="px-6 py-4 font-medium text-gray-400 hover:text-white">
              Campaigns
            </button>
            <button className="px-6 py-4 font-medium text-gray-400 hover:text-white">
              Teams
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="p-6 flex justify-end space-x-4">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
            <Plus className="w-5 h-5 mr-2" />
            Create New
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center transition-colors">
            <Upload className="w-5 h-5 mr-2" />
            Upload Media
          </button>
        </div>
        
        {/* Projects Grid */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer">
              <div className="h-40 bg-gray-700 relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400">
                  {project.assets} assets • Updated {project.updated}
                </p>
              </div>
            </div>
          ))}
          
          {/* Create New Project Card */}
          <div className="bg-gray-800 rounded-xl overflow-hidden hover:ring-2 hover:ring-mixip-blue transition-all cursor-pointer">
            <div className="h-40 bg-gray-700 flex items-center justify-center">
              <Plus className="w-10 h-10 text-gray-500" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-1">Create New Project</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
