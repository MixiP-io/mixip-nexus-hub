
import React from 'react';
import { LogOut } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarLogoutButtonProps {
  onLogout: (e: React.MouseEvent) => void;
}

const SidebarLogoutButton: React.FC<SidebarLogoutButtonProps> = ({ onLogout }) => {
  const { collapsed } = useSidebar();
  
  const logoutButton = (
    <button 
      className={`w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center ${collapsed ? 'justify-center' : 'justify-center space-x-2'}`}
      onClick={onLogout}
    >
      <LogOut className="w-5 h-5" />
      {!collapsed && <span>Log Out</span>}
    </button>
  );
  
  return (
    <div className="p-4 border-t border-gray-800">
      {collapsed ? (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              {logoutButton}
            </TooltipTrigger>
            <TooltipContent side="right">
              Log Out
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        logoutButton
      )}
    </div>
  );
};

export default SidebarLogoutButton;
