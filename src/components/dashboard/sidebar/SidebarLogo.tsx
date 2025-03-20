
import React from 'react';
import AnimatedLogo from '@/components/ui/AnimatedLogo';

const SidebarLogo: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="flex items-center space-x-2">
        <AnimatedLogo size="sm" />
        <span className="font-bold text-xl">Mix-IP</span>
      </div>
    </div>
  );
};

export default SidebarLogo;
