
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/dashboard/Header';
import CollapsibleTabs from '@/components/dashboard/CollapsibleTabs';
import ProjectGrid from '@/components/dashboard/ProjectGrid';
import DatasetsDashboard from '@/pages/datasets/DatasetsDashboard';
import { useAuth } from '@/context/AuthContext';

const MainContent: React.FC = () => {
  const location = useLocation();
  const { profile } = useAuth();
  
  const isAiPlatform = profile?.account_type === 'ai_platform';
  const isDatasetRoute = location.pathname === '/ai-platform/datasets';
  
  // Render different content based on route and user type
  const renderContent = () => {
    if (isAiPlatform && isDatasetRoute) {
      return <DatasetsDashboard />;
    }
    
    return <ProjectGrid />;
  };
  
  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <CollapsibleTabs />
      {renderContent()}
    </div>
  );
};

export default MainContent;
