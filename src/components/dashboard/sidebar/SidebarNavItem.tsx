
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  isActive: boolean;
  onNavigate: (path: string) => (e: React.MouseEvent) => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  icon: Icon, 
  label, 
  to, 
  isActive,
  onNavigate
}) => {
  const { collapsed } = useSidebar();
  
  const navItem = (
    <Link 
      to={to} 
      onClick={onNavigate(to)}
      className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-lg transition-all ${
        isActive 
          ? 'bg-green-600 text-white' 
          : 'text-gray-300 hover:bg-gray-800'
      }`}
    >
      <Icon className="w-5 h-5" />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
  
  if (collapsed) {
    return (
      <li>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              {navItem}
            </TooltipTrigger>
            <TooltipContent side="right">
              {label}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    );
  }
  
  return <li>{navItem}</li>;
};

export default SidebarNavItem;
