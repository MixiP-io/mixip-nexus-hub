
import React from 'react';
import { Search, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ActionMenu from '@/components/dashboard/ActionMenu';
import { useProfile } from '@/pages/profile/context/ProfileContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const { profileData } = useProfile();

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

        <Link to="/profile/settings" className="ml-2 hidden sm:block">
          <Avatar className="h-8 w-8 border border-gray-700">
            <AvatarImage src={profileData?.avatar || ""} />
            <AvatarFallback className="bg-gray-700 text-gray-300">
              {profileData?.fullName.split(' ').map(name => name[0]).join('') || "JD"}
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
};

export default Header;
