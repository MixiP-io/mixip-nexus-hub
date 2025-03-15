
import React, { useState } from 'react';
import { Search, Settings, LogOut, Download, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ActionMenu from '@/components/dashboard/ActionMenu';

const Header: React.FC = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
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
        <ActionMenu />

        <Link 
          to="#" 
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Xvidia App</span>
        </Link>
        
        <div className="relative">
          <button 
            onClick={toggleProfileMenu}
            className="flex items-center"
          >
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-gray-700 hover:ring-mixip-blue transition-colors">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gray-700 text-gray-300">JD</AvatarFallback>
            </Avatar>
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  to="/profile/settings"
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                  role="menuitem"
                >
                  <User className="mr-3 h-5 w-5" />
                  Profile Settings
                </Link>
                
                <button
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-700 flex items-center"
                  role="menuitem"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
