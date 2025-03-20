
import React from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';
import { useSidebar } from '@/context/SidebarContext';
import SidebarToggle from './SidebarToggle';

const SidebarLogo: React.FC = () => {
  const { collapsed } = useSidebar();
  
  return (
    <div className="relative p-4 border-b border-gray-800">
      <div className="flex items-center space-x-2">
        <AnimatedLogo size="sm" />
        {!collapsed && (
          <span className="font-bold text-xl transition-opacity duration-200">Mix-IP</span>
        )}
      </div>
      <SidebarToggle />
    </div>
  );
};

export default SidebarLogo;
