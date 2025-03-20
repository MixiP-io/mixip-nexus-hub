
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import CreativeContent from '@/components/workspace/CreativeContent';

const CreativeWorkspace: React.FC = () => {
  return (
    <div className="min-h-screen bg-mixip-gray-dark text-white flex w-full">
      <Sidebar />
      <CreativeContent />
    </div>
  );
};

export default CreativeWorkspace;
