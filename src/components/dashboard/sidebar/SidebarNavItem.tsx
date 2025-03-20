
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

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
  return (
    <li>
      <Link 
        to={to} 
        onClick={onNavigate(to)}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
          isActive 
            ? 'bg-green-600 text-white' 
            : 'text-gray-300 hover:bg-gray-800'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </Link>
    </li>
  );
};

export default SidebarNavItem;
