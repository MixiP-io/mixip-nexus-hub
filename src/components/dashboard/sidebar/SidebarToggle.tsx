
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

const SidebarToggle: React.FC = () => {
  const { collapsed, toggleSidebar } = useSidebar();
  
  return (
    <button 
      onClick={(e) => {
        e.stopPropagation(); // Prevent event bubbling
        toggleSidebar();
      }}
      className="absolute -right-3 top-4 bg-green-600 hover:bg-green-700 text-white rounded-full p-1 shadow-md transition-colors z-30"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
    </button>
  );
};

export default SidebarToggle;
