
import React from 'react';
import { LucideIcon } from 'lucide-react';
import SidebarNavItem from './SidebarNavItem';
import { useSidebar } from '@/context/SidebarContext';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarNavSectionProps {
  items: NavItem[];
  isActive: (path: string) => boolean;
  onNavigate: (path: string) => (e: React.MouseEvent) => void;
}

const SidebarNavSection: React.FC<SidebarNavSectionProps> = ({ 
  items, 
  isActive,
  onNavigate
}) => {
  const { collapsed } = useSidebar();
  
  return (
    <ul className={`space-y-1 ${collapsed ? 'px-1' : 'px-2'}`}>
      {items.map((item) => (
        <SidebarNavItem
          key={item.path}
          icon={item.icon}
          label={item.label}
          to={item.path}
          isActive={isActive(item.path)}
          onNavigate={onNavigate}
        />
      ))}
    </ul>
  );
};

export default SidebarNavSection;
