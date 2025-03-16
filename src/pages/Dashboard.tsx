
import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import MainContent from '@/components/dashboard/MainContent';

const Dashboard: React.FC = () => {
  console.log('Rendering dashboard component');
  
  return (
    <div className="min-h-screen bg-mixip-gray-dark text-white flex">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;
