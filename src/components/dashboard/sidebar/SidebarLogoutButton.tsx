
import React from 'react';
import { LogOut } from 'lucide-react';

interface SidebarLogoutButtonProps {
  onLogout: (e: React.MouseEvent) => void;
}

const SidebarLogoutButton: React.FC<SidebarLogoutButtonProps> = ({ onLogout }) => {
  return (
    <div className="p-4 border-t border-gray-800">
      <button 
        className="w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center space-x-2"
        onClick={onLogout}
      >
        <LogOut className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
};

export default SidebarLogoutButton;
