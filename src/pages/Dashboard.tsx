
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/dashboard/Sidebar';
import MainContent from '@/components/dashboard/MainContent';

const Dashboard: React.FC = () => {
  console.log('Rendering dashboard component');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Log that the dashboard has mounted
    console.log('Dashboard component mounted');
    
    // Add event listener for navigation clicks
    const handleWorkspaceClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const workspaceLink = target.closest('a[href="/dashboard/workspace"]');
      
      if (workspaceLink) {
        console.log('Creative Workspace link clicked');
      }
    };
    
    document.addEventListener('click', handleWorkspaceClick);
    
    return () => {
      document.removeEventListener('click', handleWorkspaceClick);
      console.log('Dashboard component unmounted');
    };
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-mixip-gray-dark text-white flex w-full">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Dashboard;
