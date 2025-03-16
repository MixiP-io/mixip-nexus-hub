
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

const Header: React.FC = () => {
  const { user, profile } = useAuth();
  
  // Use data from auth profile instead of profile context
  const displayName = profile?.full_name || user?.email?.split('@')[0] || "User";
  const avatarUrl = profile?.avatar || null;
  
  return (
    <header className="py-4 px-6 border-b border-gray-800">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search projects, campaigns, assets..." 
            className="bg-gray-800 w-full py-2 pl-10 pr-4 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-mixip-blue"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative hover:bg-gray-800 p-2 rounded-full transition-colors">
            <Bell className="text-gray-300" size={20} />
            <span className="absolute top-1 right-1 bg-red-500 w-2 h-2 rounded-full"></span>
          </button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl || ""} />
            <AvatarFallback className="bg-gray-700 text-gray-300">
              {displayName.split(' ').map(name => name[0]).join('') || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
