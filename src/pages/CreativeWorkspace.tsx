
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import CreativeContent from '@/components/workspace/CreativeContent';

const CreativeWorkspace: React.FC = () => {
  return (
    <div className="min-h-screen bg-mixip-gray-dark text-white flex">
      <Sidebar />
      <CreativeContent />
    </div>
  );
};

export default CreativeWorkspace;
